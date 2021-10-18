import * as core from '@serverless-devs/core';
import _, { isEmpty } from 'lodash';
import { isAutoConfig, genServiceStateID, getCredentials } from './utils';
import { VpcConfig } from './interface/vpc';
import { NasConfig } from './interface/nas';

export default class GenerateNasProps {
  static async generateNasProps(props, access, credentials) {
    const {
      vpcConfig,
      nasConfig,
      role,
      name,
    } = await getServiceConfig(props, access, credentials);

    if (_.isEmpty(nasConfig) && isAutoConfig(props?.service?.nasConfig)) {
      throw new Error('Please run \'s nas init\' first to create nas when use auto nasConfig.');
    }

    if (isEmpty(nasConfig.mountPoints)) {
      throw new Error('NasConfig has required fields for mountPoints, but it is not found.Please refer to https://help.aliyun.com/document_detail/295899.html#h3-url-4 for nasConfig');
    } else {
      nasConfig.mountPoints = nasConfig.mountPoints.map(item => {
        if (item.mountDir) {
          const [serverAddr, nasDir] = item.serverAddr.split(':');
          return { serverAddr, nasDir, fcDir: item.mountDir };
        }
        return item;
      });
    }

    return GenerateNasProps.toNasAbility(props?.region, vpcConfig, name, role, nasConfig);
  }

  static async toNasAbility(region: string, vpcConfig: VpcConfig, serviceName: string, role: string, nasConfig: NasConfig): Promise<any> {
    if (!nasConfig) {
      throw new Error('Use this command nasConfig is necessary, but no configuration was found.Please refer to https://help.aliyun.com/document_detail/295899.html#h3-url-4 for nasConfig');
    }

    if (!vpcConfig) {
      throw new Error('Use this command vpcConfig is necessary, but no configuration was found.Please refer to https://help.aliyun.com/document_detail/295899.html#title-l5q-ggd-p0c for vpcConfig');
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

async function getServiceConfig(props, access, credentials) {
  const { name, vpcConfig, nasConfig, role } = props?.service || {};
  const config = {
    name, vpcConfig, nasConfig, role,
  };

  credentials = await getCredentials(credentials, access);
  const stateId = genServiceStateID(credentials.AccountID, props?.region, name);
  const cacheData = (await core.getState(stateId)) || {};

  if (isAutoConfig(vpcConfig) || _.isEmpty(vpcConfig)) {
    config.vpcConfig = cacheData?.statefulAutoConfig?.vpcConfig || cacheData?.statefulConfig?.vpcConfig;
  }

  if (!_.isEmpty(vpcConfig?.vswitchIds)) {
    vpcConfig.vSwitchIds = vpcConfig.vswitchIds;
  }

  if (isAutoConfig(nasConfig)) {
    config.nasConfig = cacheData?.statefulAutoConfig?.nasConfig || cacheData?.statefulConfig?.nasConfig;
  }

  if (!_.isString(role)) {
    config.role = cacheData?.statefulAutoConfig?.role || cacheData?.statefulConfig?.role;
  }

  return config;
}
