import * as core from '@serverless-devs/core';
import promiseRetry from 'promise-retry';
import _ from 'lodash';
import path from 'path';
import fse from 'fs-extra';
import {
  MOCK_PROJECT_YAML_PATH,
  MOCK_PROJECT_PATH,
  DEFAULT_CLIENT_TIMEOUT,
  INPUTS,
  REGION,
  ACCESS,
  SERVICE_CONFIG,
  SERVICE_NAME,
  FUNCTION_NAME,
  FUNCTION_CONFIG,
  OSS_TRIGGER_CONFIG,
  OSS_BUCKET_NAME,
  OSS_TRIGGER_NAME,
  MNS_TRIGGER_NAME,
  MNS_TOPIC_NAME,
  MNS_TRIGGER_CONFIG,
  HTTP_TRIGGER_NAME,
  HTTP_TRIGGER_CONFIG,
  ROLE_NAME,
} from './mock-data';
import FcComponent from '../src/index';
import {
  handlerCredentials,
  setupIntegrationTestEnv,
  cleanupIntegrationTestEnv,
  getFcClient,
  deleteFcResource,
  createOssBucket,
  removeBucket,
  genStateIdOfService,
  generateProjectName,
  generateLogstoreName,
  transformMountpointFromRemoteToLocal,
  removeNas,
  removeSls,
  // removeVpc,
  removeRam,
  createMnsTopic,
  deleteMnsTopic,
} from './test-utils';
import { NasConfig } from '../src/lib/interface/nas';
import { LogConfig } from '../src/lib/interface/sls';

const retryOptions = {
  retries: 2,
  factor: 2,
  minTimeout: 1 * 1000,
  randomize: true,
};

describe('Integration::deploy', () => {
  let fcClient: any;

  beforeAll(async () => {
    const { accountId, accessKeyId, accessKeySecret } = handlerCredentials();
    await setupIntegrationTestEnv(ACCESS, accountId, accessKeyId, accessKeySecret, MOCK_PROJECT_PATH, MOCK_PROJECT_YAML_PATH);
    fcClient = getFcClient(REGION, DEFAULT_CLIENT_TIMEOUT);
  });

  afterAll(async () => {
    await cleanupIntegrationTestEnv(ACCESS, MOCK_PROJECT_PATH);
  });

  afterEach(async () => {
    await fse.remove(path.join(MOCK_PROJECT_PATH, '.s'));
  });

  it('deploy service role', async () => {
    const roleConfig = {
      name: ROLE_NAME,
      policies: [
        'AliyunOSSFullAccess',
        {
          name: ROLE_NAME,
          description: 'fc integration test',
          statement: [{
            Effect: 'Allow',
            Action: 'log:ListProject',
            Resource: '*',
          }]
        }
      ]
    };
    try {
      const inputs = _.cloneDeep(INPUTS);
      inputs.props = {
        region: REGION,
        service: {
          ...SERVICE_CONFIG,
          role: roleConfig,
        },
      };
      await new FcComponent(inputs).deploy(inputs);

      const { role } = (await fcClient.getService(SERVICE_NAME)).data;
      expect(role).toMatch(new RegExp(`role/${ROLE_NAME}`));
    } finally {
      await deleteFcResource('Integration::deploy/deploy service with http trigger', fcClient, { serviceName: SERVICE_NAME });
      try {
        await removeRam(ACCESS, MOCK_PROJECT_YAML_PATH, roleConfig);
      } catch(e) {
        console.log('remove ram error');
      }
    }
  });
  
  it('deploy service with mns/oss trigger', async () => {
    try {
      await createOssBucket(REGION, OSS_BUCKET_NAME);
      await createMnsTopic(REGION, MNS_TOPIC_NAME);
      const inputs = _.cloneDeep(INPUTS);
      inputs.props = {
        region: REGION,
        service: SERVICE_CONFIG,
        function: FUNCTION_CONFIG,
        triggers: [OSS_TRIGGER_CONFIG, MNS_TRIGGER_CONFIG],
      };
      const res = await new FcComponent(inputs).deploy(inputs);
      expect(res).toMatchObject({
        region: REGION,
        service: { name: SERVICE_NAME },
        function: {
          name: FUNCTION_NAME,
          runtime: 'nodejs12',
          handler: 'index.handler',
          memorySize: 128,
          timeout: 30,
        },
        triggers: [
          { type: 'oss', name: OSS_TRIGGER_NAME },
          { type: 'mns_topic', name: MNS_TRIGGER_NAME },
        ],
      });
    } finally {
      const resourceName = {
        serviceName: SERVICE_NAME,
        functionName: FUNCTION_NAME,
        triggerNames: [OSS_TRIGGER_NAME, MNS_TRIGGER_NAME],
      };
      await deleteFcResource('Integration::deploy/deploy service with trigger', fcClient, resourceName);
      await removeBucket(REGION, OSS_BUCKET_NAME);
      await deleteMnsTopic(REGION, MNS_TOPIC_NAME);
    }
  });

  it('deploy service with http trigger', async () => {
    try {
      const inputs = _.cloneDeep(INPUTS);
      inputs.props = {
        region: REGION,
        service: SERVICE_CONFIG,
        function: FUNCTION_CONFIG,
        triggers: [HTTP_TRIGGER_CONFIG],
      };
      const res = await new FcComponent(inputs).deploy(inputs);
      expect(res).toMatchObject({
        region: REGION,
        service: { name: SERVICE_NAME },
        function: {
          name: FUNCTION_NAME,
          runtime: 'nodejs12',
          handler: 'index.handler',
          memorySize: 128,
          timeout: 30,
        },
        triggers: [{ type: 'http', name: HTTP_TRIGGER_NAME }],
      });
    } finally {
      const resourceName = {
        serviceName: SERVICE_NAME,
        functionName: FUNCTION_NAME,
        triggerNames: [HTTP_TRIGGER_NAME],
      };
      await deleteFcResource('Integration::deploy/deploy service with http trigger', fcClient, resourceName);
    }
  });

  it('deploy service with auto,and update service', async() => {
    let nasConfig: any;
    let vpcConfig: any;
    let resolvedNasConfig: NasConfig;
    let logConfig: LogConfig;

    try {
      const inputs = _.cloneDeep(INPUTS);
      inputs.props = {
        region: REGION,
        service: {
          ...SERVICE_CONFIG,
          tracingConfig: 'Enable',
          logConfig: 'auto',
          nasConfig: 'auto',
          vpcConfig: 'auto',
        },
      };

      const fcComponent = await new FcComponent(inputs);
      await promiseRetry(async (retry: any, times: number) => {
        try {
          await fcComponent.deploy(inputs);
        } catch (ex) {
          console.log('deploy service with auto, retry ', times);
          retry(ex);
        }
      }, retryOptions);

      const serviceConfig = (await fcClient.getService(SERVICE_NAME)).data;

      const state = await core.getState(genStateIdOfService(SERVICE_NAME, REGION));
      expect(state).toHaveProperty('statefulConfig');
      expect(state).toHaveProperty('statefulAutoConfig');

      const statefulAutoConfig = state?.statefulAutoConfig;
      expect(statefulAutoConfig).toHaveProperty('role');
      expect(statefulAutoConfig).toHaveProperty('vpcConfig');
      expect(statefulAutoConfig).toHaveProperty('logConfig');
      expect(statefulAutoConfig).toHaveProperty('nasConfig');

      const role: string = statefulAutoConfig.role;
      expect(role).toEqual(`acs:ram::${fcClient.accountid}:role/aliyunfcdefaultrole`);

      logConfig = statefulAutoConfig.logConfig;
      expect(logConfig).toMatchObject({
        project: generateProjectName(fcClient.accountid, REGION),
        logstore: generateLogstoreName(SERVICE_NAME, REGION, fcClient.accountid),
        enableRequestMetrics: true,
        enableInstanceMetrics: true,
      });


      nasConfig = statefulAutoConfig.nasConfig;
      resolvedNasConfig = {
        userId: nasConfig.userId,
        groupId: nasConfig.groupId,
        mountPoints: nasConfig.mountPoints.map((item) => transformMountpointFromRemoteToLocal(item)),
      };


      vpcConfig = statefulAutoConfig.vpcConfig;
      delete vpcConfig.role;

      expect(serviceConfig).toMatchObject({
        serviceName: SERVICE_NAME,
        vpcConfig,
        nasConfig,
        role,
        logConfig,
      });

      const inputs2 = _.cloneDeep(INPUTS);
      inputs2.props = {
        region: REGION,
        service: {
          ...SERVICE_CONFIG,
          vpcConfig,
          nasConfig: resolvedNasConfig,
          logConfig: {
            project: logConfig.project,
            logstore: logConfig.logstore,
          },
        },
      };

      await promiseRetry(async (retry: any, times: number) => {
        try {
          await new FcComponent(inputs2).deploy(inputs2);
        } catch (ex) {
          console.log('update service, retry ', times);
          retry(ex);
        }
      }, retryOptions);

      const serviceConfig2 = (await fcClient.getService(SERVICE_NAME)).data;
      expect(serviceConfig2).toMatchObject({
        serviceName: SERVICE_NAME,
        vpcConfig,
        nasConfig,
        role,
        logConfig: {
          project: logConfig.project,
          logstore: logConfig.logstore,
          enableRequestMetrics: false,
          enableInstanceMetrics: false,
        },
      });

      const inputs3 = _.cloneDeep(INPUTS);
      inputs3.props = {
        region: REGION,
        service: {
          ...SERVICE_CONFIG,
        },
      };
      await promiseRetry(async (retry: any, times: number) => {
        try {
          await new FcComponent(inputs3).deploy(inputs3);
        } catch (ex) {
          console.log('update service2, retry ', times);
          retry(ex);
        }
      }, retryOptions);
      const serviceConfig3 = (await fcClient.getService(SERVICE_NAME)).data;

      expect(serviceConfig3.role).toBe('');
      expect(serviceConfig3.tracingConfig.type).toBeNull();
      expect(serviceConfig3.logConfig).toMatchObject({
        project: '',
        logstore: '',
        enableRequestMetrics: false,
        enableInstanceMetrics: false,
        // logBeginRule: null,
      });
      expect(serviceConfig3.vpcConfig).toStrictEqual({
        vpcId: '',
        vSwitchIds: [],
        securityGroupId: '',
        role: '',
      });
      expect(serviceConfig3.nasConfig).toStrictEqual({
        userId: -1,
        groupId: -1,
        mountPoints: [],
      });
    } finally {
      try {
        await removeNas(ACCESS, MOCK_PROJECT_YAML_PATH, REGION, SERVICE_NAME, resolvedNasConfig);
      } catch (e) {
        console.log(e);
      }
      // try {
      //   await removeVpc(ACCESS, MOCK_PROJECT_YAML_PATH, REGION, vpcConfig);
      // } catch (e) {
      //   console.log(e);
      // }
      try {
        await removeSls(REGION, logConfig);
      } catch (e) {
        console.log(e);
      }
      await deleteFcResource('Integration::deploy/deploy service with auto', fcClient, { serviceName: SERVICE_NAME });
    }
  });
});
