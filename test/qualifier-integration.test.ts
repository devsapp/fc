import _ from 'lodash';
import { exec } from 'child_process';
import path from 'path';
import fse from 'fs-extra';
import FcComponent from '../src/index';
import {
  handlerCredentials,
  setupIntegrationTestEnv,
  cleanupIntegrationTestEnv,
  getFcClient,
} from './test-utils';
import {
  MOCK_PROJECT_YAML_PATH,
  MOCK_PROJECT_PATH,
  DEFAULT_CLIENT_TIMEOUT,
  INPUTS,
  REGION,
  ACCESS,
  SERVICE_NAME,
} from './mock-data';

describe('Integration::qualifier', () => {
  let fcClient: any;
  let versionId: string;
  const ALIAS_NAME = `${SERVICE_NAME}-qualifier`;
  INPUTS.props = {
    region: REGION,
    service: {
      name: ALIAS_NAME,
      description: 'This is for fc test',
    },
  };

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
    await fcClient.createService(ALIAS_NAME);
  });

  afterAll(async () => {
    await exec(`s cli fc remove --service-name ${ALIAS_NAME} -a ${ACCESS} -y`);
    await cleanupIntegrationTestEnv(ACCESS, MOCK_PROJECT_PATH);
  });

  afterEach(async () => {
    await fse.remove(path.join(MOCK_PROJECT_PATH, '.s'));
  });

  it('version publish', async () => {
    INPUTS.args = 'publish --description xxx';
    const versionRs = await new FcComponent(_.cloneDeep(INPUTS)).version(_.cloneDeep(INPUTS));
    versionId = versionRs.versionId;
    expect(_.isEmpty(versionId)).toBe(false);
  });

  it('version list', async () => {
    INPUTS.args = 'list';
    const versionRs = await new FcComponent(_.cloneDeep(INPUTS)).version(_.cloneDeep(INPUTS));
    expect(versionRs.map(({ versionId: vId }) => vId).includes(versionId)).toBe(true);
  });

  it('alias', async () => {
    INPUTS.args = `publish --alias-name ${ALIAS_NAME} --version-id ${versionId}`;
    await new FcComponent(_.cloneDeep(INPUTS)).alias(_.cloneDeep(INPUTS));

    INPUTS.args = `get --alias-name ${ALIAS_NAME}`;
    const aliasGetRs = await new FcComponent(_.cloneDeep(INPUTS)).alias(_.cloneDeep(INPUTS));
    expect(aliasGetRs.aliasName).toBe(ALIAS_NAME);

    INPUTS.args = `list`;
    const aliasListRs = await new FcComponent(_.cloneDeep(INPUTS)).alias(_.cloneDeep(INPUTS));
    expect(aliasListRs.map(({ aliasName }) => aliasName).includes(ALIAS_NAME)).toBe(true);
  });
});
