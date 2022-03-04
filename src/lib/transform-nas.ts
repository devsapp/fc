import _ from 'lodash';
import { isAutoConfig } from './utils';
import { VpcConfig } from './interface/vpc';
import { NasConfig } from './interface/nas';
import Client from './client';
import logger from '../common/logger';

export default class GenerateNasProps {
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

    return GenerateNasProps.toNasAbility(props?.region, vpcConfig, name, role, nasConfig);
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
