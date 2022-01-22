// import * as core from '@serverless-devs/core';
import _ from 'lodash';
import path from 'path';
import fse from 'fs-extra';
import FcComponent from '../src/index';
import {
  handlerCredentials,
  setupIntegrationTestEnv,
  cleanupIntegrationTestEnv,
  getFcClient,
  deleteFcResource,
} from './test-utils';
import {
  MOCK_PROJECT_YAML_PATH,
  MOCK_PROJECT_PATH,
  DEFAULT_CLIENT_TIMEOUT,
  INPUTS,
  REGION,
  ACCESS,
  REMOVE_SERVICE_CONFIG as SERVICE_CONFIG,
  FUNCTION_CONFIG,
  HTTP_TRIGGER_CONFIG,
  DOMAIN_CONFIG,
  REMOVE_SERVICE_NAME as SERVICE_NAME,
  FUNCTION_NAME,
  HTTP_TRIGGER_NAME,
} from './mock-data';

describe('Integration::remove', () => {
  let fcClient: any;

  beforeAll(async () => {
    const { accountId, accessKeyId, accessKeySecret } = handlerCredentials();
    await setupIntegrationTestEnv(
      ACCESS,
      accountId,
      accessKeyId,
      accessKeySecret,
      MOCK_PROJECT_PATH,
      MOCK_PROJECT_YAML_PATH,
    );
    fcClient = getFcClient(REGION, DEFAULT_CLIENT_TIMEOUT);
  });

  afterAll(async () => {
    await cleanupIntegrationTestEnv(ACCESS, MOCK_PROJECT_PATH);
  });

  afterEach(async () => {
    await fse.remove(path.join(MOCK_PROJECT_PATH, '.s'));
  });

  it('remove', async () => {
    const inputs = _.cloneDeep(INPUTS);
    inputs.props = {
      region: REGION,
      service: SERVICE_CONFIG,
      function: FUNCTION_CONFIG,
      triggers: [HTTP_TRIGGER_CONFIG],
      customDomains: DOMAIN_CONFIG,
    };
    let domainName = '';
    try {
      const deployRs = await new FcComponent(_.cloneDeep(inputs)).deploy(_.cloneDeep(inputs));
      domainName = deployRs?.url?.custom_domain?.[0]?.domain?.slice(7);

      inputs.args = '-y';
      await new FcComponent(_.cloneDeep(inputs)).remove(_.cloneDeep(inputs));
      inputs.args = 'domain -y';
      await new FcComponent(_.cloneDeep(inputs)).remove(_.cloneDeep(inputs));

      const regex = new RegExp(
        '^' + 'GET /services/' + SERVICE_NAME + ' failed with 404.' + '.*',
        'g',
      );
      await expect(fcClient.getService(SERVICE_NAME)).rejects.toThrowError(regex);

      const { data: domainlistRs = {} } = await fcClient.listCustomDomains();
      const { customDomains = [] } = domainlistRs;
      expect(customDomains.map(({ domainName }) => domainName)).not.toMatchObject([domainName]);
    } finally {
      const resourceName = {
        domainName,
        serviceName: SERVICE_NAME,
        functionName: FUNCTION_NAME,
        triggerNames: [HTTP_TRIGGER_NAME],
      };
      await deleteFcResource('Integration::remove/remove', fcClient, resourceName);
    }
  });
});
