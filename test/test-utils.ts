import * as core from '@serverless-devs/core';
import MNSClient from '@alicloud/mns';
import FC from '@alicloud/fc2';
import Log from '@alicloud/log';
import OSS from 'ali-oss';
import fse from 'fs-extra';
import yaml from 'js-yaml';
import path from 'path';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { isEmpty } from 'lodash';
import os from 'os';

export function handlerCredentials() {
  dotenv.config({path: path.join(__dirname, '.env')});

  const accountId: string = process.env.AccountID;
  const accessKeyId: string = process.env.AccessKeyID;
  const accessKeySecret: string =  process.env.AccessKeySecret;

  return { accountId, accessKeyId, accessKeySecret };
}

export function getFcClient(region: string, timeout: number) {
  const { accountId, accessKeyId, accessKeySecret } = handlerCredentials();
  return new FC(accountId, {
    accessKeyID: accessKeyId,
    accessKeySecret: accessKeySecret,
    region,
    timeout,
  });
}

export async function deleteFcResource(msg: string, fcClient, { serviceName, functionName, triggerNames }: any) {
  console.log('Start remove resource: ', msg);
  if (!isEmpty(triggerNames)) {
    for (const triggerName of triggerNames) {
      console.log('Start remove trigger: ', triggerName);
      try {
        await fcClient.deleteTrigger(serviceName, functionName, triggerName);
        console.log('Remove trigger successed');
      } catch (e) {
        console.error('Remove trigger faild: ', e);
      }
    }
  }

  if (functionName) {
    console.log('Start remove function: ', functionName);
    try {
      await fcClient.deleteFunction(serviceName, functionName);
      console.log('Remove function successed');
    } catch (e) {
      console.error('Remove function faild: ', e);
    }
  }

  try {
    console.log('Start remove service: ', serviceName);
    await fcClient.deleteService(serviceName);
    console.log('Remove service successed');
  } catch (e) {
    console.error('Remove service faild: ', e);
  }
  console.log('end.');
}

export async function setupIntegrationTestEnv(access: string, accoundId: string, accessKeyId: string, accessKetSecret: string, cwd: string, templateFile: string) {
  await core.setKnownCredential({
    AccountID: accoundId,
    AccessKeyID: accessKeyId,
    AccessKeySecret: accessKetSecret,
  }, access);
  process.chdir(cwd);
  process.env.templateFile = templateFile;
}

export async function cleanupIntegrationTestEnv(access: string, cwd: string) {
  const accessFile = path.join(os.homedir(), '.s', 'access.yaml');
  const accessFileInfo = yaml.load(fse.readFileSync(accessFile, 'utf8') || '{}');
  if (accessFileInfo[access]) {
    delete accessFileInfo[access];
    fse.writeFileSync(accessFile, Object.keys(accessFileInfo).length > 0 ? yaml.dump(accessFileInfo) : '');
  }
  await fse.remove(path.join(cwd, '.s'));
}

export function genStateIdOfService(serviceName: string, region: string): string {
  return `${process.env.AccountID}-${region}-${serviceName}`;
}

export function generateResourceName(serviceName: string, region: string, accountID: string) {
  const prefix = serviceName.slice(0, 6);

  const md5Uid = crypto.createHmac('md5', accountID).update(serviceName).digest('hex');
  return `${prefix}-${md5Uid.slice(0, 7)}-${region}`;
}

export const generateProjectName = (accountID, region: string) => {
  return `${accountID}-${region}-logproject`;
};

export const generateLogstoreName = (serviceName: string, region: string, accountID: string) => {
  // -20 是因为要抛去生成名称的前缀（fc-service-）和后缀（-logstore）
  if (serviceName.length > (64 - 20)) {
    return generateResourceName(serviceName, region, accountID);
  }

  const defaultLogstore = `fc-service-${serviceName}-logstore`.toLocaleLowerCase();

  return defaultLogstore;
};

export const transformMountpointFromRemoteToLocal = ({ serverAddr, mountDir }) => {
  const subscript: number = serverAddr.indexOf(':/');
  return {
    serverAddr: serverAddr.substr(0, subscript),
    nasDir: serverAddr.substr(subscript + 1),
    fcDir: mountDir,
  };
}

export async function removeNas(access: string, yamlPath: string, region: string, serviceName: string, nasConfig) {
  function extractFileSystemIdFromMountTargetDomain(mountTargetDomain: string): string {
    let fileSystemId: string = mountTargetDomain.split('-')[0];
    if (mountTargetDomain.includes('extreme')) {
      fileSystemId = `extreme-${fileSystemId}`;
    }
    return fileSystemId;
  }
  
  const fileSystemId: string = extractFileSystemIdFromMountTargetDomain(nasConfig.mountPoints[0].serverAddr);
  const inputs: any = {
    appName: 'app-nas',
    project: {
      access,
      component: 'devsapp/nas',
      projectName: 'nas-project',
    },
    command: 'remove',
    path: {
      configPath: yamlPath,
    },
    args: '-y',
    props: {
      regionId: region,
      serviceName,
      fileSystemId,
    },
  };
  const nasComponent = await core.load('devsapp/nas');
  await nasComponent.remove(inputs);
}

export async function removeVpc(access: string, yamlPath: string, region: string, vpcConfig) {
  const props = {
    regionId: region,
    vpcId: vpcConfig.vpcId,
    vSwitchId: vpcConfig.vSwitchIds[0],
    securityGroupId: vpcConfig.securityGroupId,
  };
  const inputs: any = {
    appName: 'app-vpc',
    project: {
      access,
      component: 'devsapp/vpc',
      projectName: 'vpc-project',
    },
    command: 'delete',
    path: {
      configPath: yamlPath,
    },
    args: '-y',
    Properties: props,
    props,
  };
  const vpcComponent = await core.load('devsapp/vpc');
  await vpcComponent.delete(inputs);
}

export async function removeSls(region: string, logConfig) {
  const { accessKeyId, accessKeySecret } = handlerCredentials();
  const logClient = new Log({
    region: region,
    accessKeyId: accessKeyId,
    accessKeySecret: accessKeySecret,
  });

  await logClient.deleteLogStore(logConfig.project, logConfig.logstore);
  // await logClient.deleteProject(logConfig.project);
}

export async function removeRam(access, yamlPath, props) {
  const inputs: any = {
    appName: 'app-ram',
    project: {
      access,
      component: 'devsapp/ram',
      projectName: 'ram-project',
    },
    command: 'delete',
    path: {
      configPath: yamlPath,
    },
    args: '-y',
    Properties: props,
    props,
  };
  const ramComponent = await core.load('devsapp/ram');
  await ramComponent.remove(inputs);
}

export async function createOssBucket(region, bucketName) {
  try {
    console.log('createOssBucket:: ', bucketName);
    const { accessKeyId, accessKeySecret } = handlerCredentials();
    const ossClient: any = new OSS({
      region: `oss-${region}`,
      accessKeyId,
      accessKeySecret,
    });
    const options = {
      storageClass: 'Standard',
      acl: 'private',
      dataRedundancyType: 'LRS',
    }
    await ossClient.putBucket(bucketName, options);
  } catch (err) {
    console.log(err);
  }
}

export async function removeBucket(region, bucketName) {
  try {
    console.log('removeBucket:: ', bucketName);
    const { accessKeyId, accessKeySecret } = handlerCredentials();
    const ossClient: any = new OSS({
      region: `oss-${region}`,
      accessKeyId,
      accessKeySecret,
    });
    await ossClient.deleteBucket(bucketName);
  } catch (err) {
    console.log(err);
  }
}

export async function createMnsTopic(region, mnsName) {
  console.log('createMnsTopic:: ', mnsName);
  try {
    const { accountId, accessKeyId, accessKeySecret } = handlerCredentials();
    const mnsClient: any = new MNSClient(accountId, {
      region,
      accessKeyId,
      accessKeySecret,
      secure: false,
      internal: false,
      vpc: false,
    });
    await mnsClient.createTopic(mnsName);
  } catch(e) {
    console.log(e);
  }
}

export async function deleteMnsTopic(region, mnsName) {
  console.log('deleteMnsTopic:: ', mnsName);
  try {
    const { accountId, accessKeyId, accessKeySecret } = handlerCredentials();
    const mnsClient: any = new MNSClient(accountId, {
      region,
      accessKeyId,
      accessKeySecret,
      secure: false,
      internal: false,
      vpc: false,
    });
    await mnsClient.delete(`/topics/${mnsName}`, 'Topic', '');
  } catch(e) {
    console.log(e);
  }
}
