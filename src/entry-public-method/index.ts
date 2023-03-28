import * as core from '@serverless-devs/core';
import path from 'path';
import os from 'os';
import https from 'https';
import fs from 'fs';
import logger from '../common/logger';
import InfraAsTemplate from '../lib/infra-as-template';
import { IInputs, IProperties } from '../lib/interface/interface';
import { getCredentials } from '../lib/utils';
import { setDefaultValue } from './set-default-value';
import { tipLayerArn } from './tip-layer-arn';

const { lodash: _ } = core;

export default class EntryPublicMethod {
  readonly MINIMIST_HELP_OPT = {
    boolean: ['help'],
    alias: { help: 'h' },
  };

  checkName(value: string, name?: String): void {
    if (!/^[_a-zA-Z][-_a-zA-Z0-9]*$/.test(value)) {
      logger.warn(`${name || 'Name'} doesn't match expected format (allowed: ^[_a-zA-Z][-_a-zA-Z0-9]*$, actual: '${value}')`);
    }
  }

  /**
   * 所有方法处理之前执行
   * @param inputs
   * @param options
   * @returns
   */
  async handlerPreMethod(inputs: IInputs, options?: { getSecretKey?: boolean }) {
    const { getSecretKey } = options || {};

    // 判断是否是 help，如果是则退出不处理
    if (this.isHelp(inputs.args, inputs.argsObj)) {
      return inputs;
    }

    await this.updateCore(); // 更新到最新版本的 core

    // 处理密钥
    if (getSecretKey) {
      inputs.credentials = await getCredentials(inputs.credentials, inputs.project?.access);
    }

    setDefaultValue(inputs);

    // 提示使用 layerArnV2 版本
    if (!_.isEmpty(inputs.props?.function?.layers)) {
      tipLayerArn(inputs.props?.region, inputs.props?.function?.layers, inputs.project?.access);
    }

    // Fix: https://github.com/devsapp/fc/issues/876
    if (!_.isEmpty(inputs.props?.customDomains)) {
      inputs.props.customDomains = _.map(inputs.props.customDomains, (item) => ({
        ...(item || {}),
        routeConfigs: _.map(item.routeConfigs || [], (i) => ({
          ...(i || {}),
          qualifier: _.isNumber(i?.qualifier) ? i.qualifier.toString() : i?.qualifier,
        })),
      }));
    }

    await InfraAsTemplate.modifyInputs(inputs); // 多环境处理

    try {
      const { getEndpointFromFcDefault } = await core.load('devsapp/fc-core');
      const endpoint = await getEndpointFromFcDefault();
      if (endpoint) {
        logger.warn(`Use custom endpoint: ${endpoint}`);
      }
    } catch (ex) {
      /** */
    }

    return inputs;
  }

  handlerInputs(inputs: IInputs): any {
    const project = inputs?.project;
    const props: IProperties = inputs?.props;
    const access: string = project?.access;
    const args: string = inputs?.args;
    const argsObj: any = inputs?.argsObj;
    const curPath: any = inputs?.path;
    const projectName: string = project?.projectName;
    const appName: string = inputs?.appName;
    const credentials = inputs?.credentials;

    return {
      credentials,
      appName,
      projectName,
      access,
      props,
      args,
      argsObj,
      curPath,
    };
  }

  handlerComponentInputs(inputs: IInputs, componentName?: string): any {
    const { access, projectName = '' } = inputs?.project || {};

    const cloneInputs = _.cloneDeep(inputs);
    cloneInputs.project = {
      component: componentName,
      projectName: componentName ? `${projectName}-${componentName}-project` : projectName,
      access,
    };

    return cloneInputs;
  }

  isHelp(args: string, argsObj?: any) {
    // @ts-ignore
    const comParse: any = core.commandParse({ args, argsObj }, this.MINIMIST_HELP_OPT);
    return comParse?.data?.help;
  }

  async componentMethodCaller(
    inputs: IInputs,
    componentName: string,
    methodName: string,
    props?: any,
    args?: string,
  ): Promise<any> {
    const componentInputs: any = this.handlerComponentInputs(inputs, componentName);
    componentInputs.props = props;
    componentInputs.args = args;
    const componentIns: any = await core.load(`${componentName}`);
    logger.debug(
      `Inputs of component: ${componentName} is: ${JSON.stringify({ props, args }, null, '  ')}`,
    );
    return await componentIns[methodName](componentInputs);
  }

  private async updateCore() {
    if (!_.isFunction(core.getAvailablePort)) {
      try {
        const homePath = _.isFunction(core.getRootHome) ? core.getRootHome() : os.homedir();
        const corePath = path.join(homePath, 'cache', 'core');
        const lockPath = path.resolve(corePath, '.s.lock');
        const result: any = await new Promise((resolve, reject) => {
          https.get('https://registry.devsapp.cn/simple/devsapp/core/releases/latest', (response) => {
            let data = '';
            // eslint-disable-next-line no-return-assign
            response.on('data', (chunk) => data += chunk);
            response.on('end', () => resolve(JSON.parse(data).Response));
          }).on('error', (err) => reject(err));
        });
        const version = result.tag_name;
        const url = `https://registry.devsapp.cn/simple/devsapp/core/zipball/${version}`;
        const filename = `core@${version}.zip`;
        // @ts-ignore
        await core.downloadRequest(url, corePath, { filename, extract: true, strip: 1 });
        fs.writeFileSync(lockPath, JSON.stringify({ version }, null, 2));
      } catch (error) {
        logger.log(
          "\nWARNING\n======================\n* Exception happened! Please execute 's clean --cache' and try again",
          'yellow',
        );
        process.exit(1);
      }
    }
  }
}
