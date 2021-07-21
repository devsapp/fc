import * as core from '@serverless-devs/core';
import _, { isEmpty } from 'lodash';
import { isAutoConfig, genServiceStateID } from './utils';

const HANDlER_NAS_COMMANDS = ['ls', 'cp', 'rm', 'download', 'upload', 'command'];

export default async function toNas(props, nonOptionsArgs, args, access, commandName, credentials) {
  const {
    vpcConfig,
    nasConfig,
    role,
    name,
  } = await getServiceConfig(props, access, credentials);

  if (!nasConfig) {
    throw new Error('Not fount nasConfig.');
  }

  if (!vpcConfig) {
    throw new Error('Not fount vpcConfig.');
  }

  const { vpcId, vSwitchIds, securityGroupId } = vpcConfig;

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

  return {
    tarnsformArgs,
    payload: {
      regionId: props?.region,
      serviceName: `_FC_NAS_${name}`,
      description: `service for fc nas used for service ${name}`,
      vpcId,
      vSwitchId: vSwitchIds[0],
      securityGroupId,
      role,
      userId,
      groupId,
      mountPointDomain: serverAddr,
      nasDir,
      // excludes,
    },
  };
}

function transfromArgsFunction(tarnsformArgs, fcDirInput, transformInputDir) {
  tarnsformArgs = tarnsformArgs.replace(fcDirInput, transformInputDir);
  if (tarnsformArgs.includes(fcDirInput)) {
    return transfromArgsFunction(tarnsformArgs, fcDirInput, transformInputDir);
  }
  return tarnsformArgs;
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

  if (_.isEmpty(credentials)) {
    credentials = await core.getCredential(access);
  }
  const stateId = genServiceStateID(credentials.AccountID, props?.region, name);
  const cacheData = (await core.getState(stateId)) || {};

  if (isAutoConfig(vpcConfig) || _.isEmpty(vpcConfig)) {
    config.vpcConfig = cacheData?.statefulAutoConfig?.vpcConfig || cacheData?.statefulConfig?.vpcConfig;
  }
  if (isAutoConfig(nasConfig)) {
    config.nasConfig = cacheData?.statefulAutoConfig?.nasConfig || cacheData?.statefulConfig?.nasConfig;
  }
  if (!_.isString(role)) {
    config.role = cacheData?.statefulAutoConfig?.role || cacheData?.statefulConfig?.role;
  }
  return config;
}
