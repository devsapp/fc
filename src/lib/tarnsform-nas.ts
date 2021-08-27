import * as core from '@serverless-devs/core';
import _, { isEmpty } from 'lodash';
import { isAutoConfig, genServiceStateID, getCredentials } from './utils';
import { VpcConfig } from "./interface/vpc";

const HANDlER_NAS_COMMANDS = ['ls', 'cp', 'rm', 'download', 'upload', 'command'];

export async function toNasAbility(region: string, vpcConfig: VpcConfig, serviceName: string, role: string, { userId, groupId, mountPointDomain, nasDir }, args?: string): Promise<any> {
  const res = {
    payload: {
      regionId: region,
      serviceName: `_FC_NAS_${serviceName}`,
      description: `service for fc nas used for service ${serviceName}`,
      vpcId: vpcConfig.vpcId,
      vSwitchId: vpcConfig.vswitchIds,
      securityGroupId: vpcConfig.securityGroupId,
      role,
      userId,
      groupId,
      mountPointDomain,
      nasDir,
    },
  };
  if (args) {
    Object.assign(res, {
      tarnsformArgs: args,
    });
  }
  return res;
}

export default async function toNas(props, nonOptionsArgs, args, access, commandName, credentials) {
  const {
    vpcConfig,
    nasConfig,
    role,
    name,
  } = await getServiceConfig(props, access, credentials);

  if (!nasConfig) {
    if (isAutoConfig(props?.service?.nasConfig)) {
      throw new Error('Please run \'s nas init\' first to create nas when use auto nasConfig.');
    }
    throw new Error('Not fount nasConfig.');
  }

  if (!vpcConfig) {
    throw new Error('Not fount vpcConfig.');
  }

  const { vpcId } = vpcConfig;

  if (!vpcId) {
    throw new Error(`Service ${name} is configured for query to vpc`);
  }

  const { userId, groupId, mountPoints } = nasConfig;
  if (isEmpty(mountPoints)) {
    throw new Error(`Service ${name} is configured for query to nas`);
  }

  const { fcDirInput, needAppendNas } = getFcDirPath(nonOptionsArgs, commandName);
  if (HANDlER_NAS_COMMANDS.includes(commandName) && !fcDirInput) {
    throwError(args, commandName, nonOptionsArgs);
  }
  const { serverAddr, nasDir, transformInputDir } = getMount(mountPoints, fcDirInput);
  if (!serverAddr) {
    throw new Error(`There is no nas configuration matching the path [${fcDirInput}]`);
  }

  let tarnsformArgs = args;
  if (!_.isNil(transformInputDir)) {
    tarnsformArgs = transfromArgsFunction(args, fcDirInput, needAppendNas ? `nas://${transformInputDir}` : transformInputDir);
  }
  core.Logger.debug('FC', `tarnsformArgs: ${tarnsformArgs}`);

  return toNasAbility(props?.region, vpcConfig, name, role, { userId, groupId, mountPointDomain: serverAddr, nasDir }, tarnsformArgs);
}

function transfromArgsFunction(tarnsformArgs, fcDirInput, transformInputDir) {
  return tarnsformArgs.replace(new RegExp(fcDirInput, 'g'), transformInputDir);
}

function throwError(args, commandName, nonOptionsArgs) {
  const example = `\n     Example: \n\t  s nas upload -r -n ./local-path /mnt/nas-path
\t  s nas download -r /mnt/nas-path ./local-path`;

  if (['upload', 'download'].includes(commandName)) {
    if (nonOptionsArgs.length < 2) {
      throw new Error(`It is expected that there needs to be a local path and a remote path, only one path is obtained in [${args}]${example}`);
    }
    if (nonOptionsArgs.length > 2) {
      throw new Error(`It is expected that there needs to be a local path and a remote path, and multiple paths are obtained in [${args}]${example}`);
    }

    if (nonOptionsArgs.length === 2) {
      throw new Error(`The nas remote path was not started with /mnt/ or /home/ in [${args}]${example}`);
    }
  }

  throw new Error(`The path of nas was not found in [${args}]${example}`);
}

function getMount(mountPoints, fcDirInput = '') {
  for (const mountPointItem of mountPoints) {
    const { mountDir: fcDir } = mountPointItem;
    if (_.isNil(mountPointItem.serverAddr) || _.isNil(fcDir)) {
      throw new Error(`Handling mountPoints exception，mountPoint is ${JSON.stringify(mountPoints)}`);
    }
    const [serverAddr, nasDir] = mountPointItem.serverAddr.split(':');
    const suffix = fcDirInput.slice(fcDir.length);
    if (fcDirInput.startsWith(fcDir) && (!suffix || suffix.startsWith('/'))) {
      const transformInputDir = fcDirInput.replace(fcDir, nasDir);
      return { serverAddr, nasDir, transformInputDir };
    }
  }

  return {};
}

function getFcDirPath(inputPaths: string[], commandName) {
  for (const inputPath of inputPaths) {
    if (inputPath.indexOf('nas://') === 0) {
      const fcDirInput = inputPath.slice(6);
      core.Logger.debug('FC', `inputNasPath: ${inputPath}, fcDirInput: ${fcDirInput}`);
      return { fcDirInput, needAppendNas: false };
    }
  }

  // 支持非 nas:// 写法
  if (commandName === 'upload' && isFcDirStart(inputPaths[1])) {
    return { fcDirInput: inputPaths[1], needAppendNas: true };
  } else if (commandName === 'download' && isFcDirStart(inputPaths[0])) {
    return { fcDirInput: inputPaths[0], needAppendNas: true };
  } else if (commandName === 'command') {
    for (const inputPath of inputPaths) {
      if (isFcDirStart(inputPath)) {
        return { fcDirInput: inputPath, needAppendNas: false };
      }
    }
  }

  return {};
}

function isFcDirStart(dirInput: string): boolean {
  return dirInput?.startsWith('/mnt/') || dirInput?.startsWith('/home/');
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
  } else if (!_.isEmpty(nasConfig?.mountPoints)) {
    // 兼容首次手动指定 nas 配置
    config.nasConfig.mountPoints = nasConfig?.mountPoints?.map((item) => ({
      serverAddr: `${item.serverAddr}:${item.nasDir}`,
      mountDir: item.fcDir,
    }));
  }

  if (!_.isString(role)) {
    config.role = cacheData?.statefulAutoConfig?.role || cacheData?.statefulConfig?.role;
  }

  return config;
}
