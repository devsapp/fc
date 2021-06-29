import * as core from '@serverless-devs/core';
import { isEmpty, isString } from 'lodash';
import { isAutoConfig, genServiceStateID } from './utils';
import { ICredentials } from './interface/profile';

const HANDlER_NAS_COMMANDS = ['ls', 'cp', 'rm', 'download', 'upload', 'command'];

export default async function toNas(props, nonOptionsArgs, args, access, commandName) {
  const {
    vpcConfig,
    nasConfig,
    role,
    name,
  } = await getServiceConfig(props, access);

  if (!nasConfig) {
    throw new Error('Not fount nasConfig.');
  }

  if (!vpcConfig) {
    throw new Error('Not fount vpcConfig.');
  }

  const { vpcId, vswitchIds, securityGroupId } = vpcConfig;

  if (!vpcId) {
    throw new Error(`Service ${name} is configured for query to vpc`);
  }

  const { userId, groupId, mountPoints } = nasConfig;
  if (isEmpty(mountPoints)) {
    throw new Error(`Service ${name} is configured for query to nas`);
  }

  const fcDirInput = getFcDirPath(nonOptionsArgs);
  if (HANDlER_NAS_COMMANDS.includes(commandName) && !fcDirInput) {
    throw new Error(`The path of nas was not found in [${args}]`);
  }
  const { serverAddr, nasDir, tarnsforInputDir } = getMount(mountPoints, fcDirInput);
  if (!serverAddr) {
    core.Logger.warn('FC', 'Not fount serverAddr/nasDir');
  }

  return {
    tarnsformArgs: args.replace(fcDirInput, tarnsforInputDir),
    payload: {
      regionId: props?.region,
      serviceName: `_FC_NAS_${name}`,
      description: `service for fc nas used for service ${name}`,
      vpcId,
      vSwitchId: vswitchIds[0],
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

function getMount(mountPoints, fcDirInput = '') {
  for (const { serverAddr, nasDir, fcDir } of mountPoints) {
    const suffix = fcDirInput.slice(fcDir.length);
    if (fcDirInput.startsWith(fcDir) && (!suffix || suffix.startsWith('/'))) {
      const tarnsforInputDir = fcDirInput.replace(fcDir, nasDir);
      return { serverAddr, nasDir, tarnsforInputDir };
    }
  }

  return {};
}

function getFcDirPath(inputPaths: string[]) {
  for (const inputPath of inputPaths) {
    if (inputPath.indexOf('nas://') === 0) {
      const fcDirInput = inputPath.slice(6);
      core.Logger.debug('FC', `inputNasPath: ${inputPath}, fcDirInput: ${fcDirInput}`);
      return fcDirInput;
    }
  }
}

async function getServiceConfig(props, access) {
  const { name, vpcConfig, nasConfig, role } = props?.service || {};

  if (isAutoConfig(nasConfig) || isAutoConfig(vpcConfig) || !isString(role)) {
    const credential: ICredentials = await core.getCredential(access);
    const stateId = genServiceStateID(credential.AccountID, props?.region, name);
    const data = (await core.getState(stateId))?.resolvedConfig || {};

    if (isEmpty(data)) {
      throw new Error('Configuration is not obtained, please execute the [s exec -- deploy] first.');
    }

    return data;
  }

  return {
    vpcConfig,
    nasConfig,
    name,
    role: props?.service?.role,
  };
}
