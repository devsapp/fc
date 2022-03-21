import * as core from '@serverless-devs/core';
import * as HELP from '../help/nas';
import { isAutoConfig } from '../utils';
import { VpcConfig } from '../interface/vpc';
import { NasConfig } from '../interface/nas';
import Client from '../client';
import logger from '../../common/logger';

const { lodash: _ } = core;

export default class Nas {
  static async handlerComponentInputs(inputs) {
    const { props, args, argsObj } = inputs;
    const SUPPORTED_METHOD = ['init', 'download', 'upload', 'command'];

    const apts = {
      boolean: ['all', 'long', 'help', 'recursive', 'override', 'force', 'assume-yes', 'debug'],
      string: ['template', 't', 'a', 'access'],
      alias: { force: 'f', override: 'o', recursive: 'r', help: 'h', long: 'l', 'assume-yes': 'y' },
    };
    // @ts-ignore
    const comParse: any = core.commandParse({ args, argsObj }, apts);
    const argsData: any = comParse?.data || {};

    const assumeYes: boolean = argsData.y || argsData['assume-yes'];
    const nonOptionsArgs = comParse.data?._ || [];
    logger.debug(`nonOptionsArgs is ${JSON.stringify(nonOptionsArgs)}`);
    if (!comParse?.data) {
      logger.error('Not found sub-command.');
      core.help(HELP.NAS_HELP_INFO);
      return { isHelp: true };
    }

    if (nonOptionsArgs.length === 0) {
      if (!comParse?.data?.help) {
        logger.error('Not found sub-command.');
      }
      core.help(HELP.NAS_HELP_INFO);
      return { isHelp: true };
    }

    const commandName: string = nonOptionsArgs[0];
    if (!SUPPORTED_METHOD.includes(commandName)) {
      logger.error(`Not supported sub-command: [${commandName}]`);
      core.help(HELP.NAS_HELP_INFO);
      return { isHelp: true };
    }

    // 转换 args 参数输入
    console.log();
    let transformArgs = args.replace(commandName, '');
    if (argsData.debug) {
      transformArgs = transformArgs.replace('--debug', '');
    }
    // 抛除全局参数 access
    if (argsData.access) {
      transformArgs = transformArgs.replace('--access', '').replace(argsData.access, '');
    } else if (argsData.a && transformArgs.includes('-a ')) {
      if (argsData.a.join) { // fix: s nas common ls -al /mnt/auto -a access
        argsData.a = argsData.a.join('').replace(/(^\s*)|(\s*$)/g, '');
      }
      transformArgs = transformArgs.replace('-a ', '').replace(argsData.a, '');
    }
    // 抛除全局参数 template
    if (argsData.template) {
      transformArgs = transformArgs.replace('--template', '').replace(argsData.template, '');
    } else if (argsData.t && transformArgs.includes('-t ')) {
      if (argsData.t.join) { // fix: s nas common ls -lt /mnt/auto -t s-s.yaml
        argsData.t = argsData.t.join('').replace(/(^\s*)|(\s*$)/g, '');
      }
      transformArgs = transformArgs.replace('-t ', '').replace(argsData.t, '');
    }

    // s nas command ls -lh /mnt/auto 会被解析为 --help
    if (comParse?.data?.help && !args?.includes('ls -lh')) {
      core.help(HELP.NAS_SUB_COMMAND_HELP_INFO[commandName]);
      return { isHelp: true };
    }
    nonOptionsArgs.shift();
    const { nasConfig, vpcConfig, name, role } = props?.service || {};

    const componentInputs = _.cloneDeep(inputs);
    delete componentInputs.argsObj;
    return {
      commandName,
      nasConfig,
      componentInputs,
      props,
      assumeYes,
      vpcConfig,
      name,
      role,
      transformArgs: transformArgs.replace(/(^\s*)|(\s*$)/g, ''),
    };
  }

  // 如果是 auto 使用线上配置，不在缓存中获取
  static async getServiceConfig(props, access, credentials) {
    let { name, vpcConfig, nasConfig, role } = props?.service || {};

    const fcClient = await Client.setFcClient(props?.region, credentials, access);
    let remoteData;
    try {
      remoteData = (await fcClient.getService(name)).data;
    } catch (ex) {
      logger.debug(`get service error: ${ex?.code}, ${ex?.message}`);
      remoteData = {};
    }
    logger.debug(`get service config: ${JSON.stringify(remoteData)}`);

    // role auto
    if (!_.isString(role) || isAutoConfig(role)) {
      role = remoteData.role;
    }
    // vpc auto
    if (isAutoConfig(vpcConfig) || _.isEmpty(vpcConfig)) {
      vpcConfig = remoteData.vpcConfig;
    }
    if (!_.isEmpty(vpcConfig?.vswitchIds)) {
      vpcConfig.vSwitchIds = vpcConfig.vswitchIds;
    }
    // nas auto
    if (isAutoConfig(nasConfig)) {
      nasConfig = remoteData.nasConfig;
    }
    // nas 是 auto，但是线上没有配置需要执行 s nas init 或者 s deploy 重新配置
    if (_.isEmpty(nasConfig) && isAutoConfig(props?.service?.nasConfig)) {
      throw new Error("Please run 's deploy service' first to create nas when use auto nasConfig");
    }

    if (_.isEmpty(nasConfig?.mountPoints)) {
      throw new Error(
        'NasConfig has required fields for mountPoints, but it is not found.Please refer to https://help.aliyun.com/document_detail/295899.html#h3-url-6 for nasConfig',
      );
    } else {
      nasConfig.mountPoints = nasConfig.mountPoints.map((item) => {
        if (item.mountDir) {
          const [serverAddr, nasDir] = item.serverAddr.split(':');
          return { serverAddr, nasDir, fcDir: item.mountDir };
        }
        return item;
      });
    }

    return Nas.toNasAbility(props?.region, vpcConfig, name, role, nasConfig);
  }

  static async toNasAbility(
    region: string,
    vpcConfig: VpcConfig,
    serviceName: string,
    role: string,
    nasConfig: NasConfig,
  ): Promise<any> {
    if (!nasConfig) {
      throw new Error(
        'Use this command nasConfig is necessary, but no configuration was found.Please refer to https://help.aliyun.com/document_detail/295899.html#h3-url-4 for nasConfig',
      );
    }

    if (!vpcConfig) {
      throw new Error(
        'Use this command vpcConfig is necessary, but no configuration was found.Please refer to https://help.aliyun.com/document_detail/295899.html#title-l5q-ggd-p0c for vpcConfig',
      );
    }

    return {
      payload: {
        regionId: region,
        serviceName,
        vpcConfig,
        description: `service for fc nas used for service ${serviceName}`,
        role,
        userId: nasConfig.userId,
        groupId: nasConfig.userId,
        mountPoints: nasConfig.mountPoints,
      },
    };
  }
}
