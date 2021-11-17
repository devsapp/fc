import _ from 'lodash';
import os from 'os';
import * as path from 'path';

export const ACCESS = `s-devs-ci-${new Date().getTime()}-${Math.random().toString(36).substr(2)}`;
export const REGION = 'cn-hongkong';
export const MOCK_PROJECT_PATH: string = path.join(__dirname, 'mock-project');
export const MOCK_PROJECT_YAML_PATH: string = path.join(MOCK_PROJECT_PATH, 's.yaml');
export const DEFAULT_CLIENT_TIMEOUT = 600 * 1000;

export const FUNCTION_NAME = 'testFunction';
export const HTTP_TRIGGER_NAME = 'httpTrigger';
export const OSS_TRIGGER_NAME = 'ossTrigger';
export const MNS_TRIGGER_NAME = 'mnsTrigger';

export const SERVICE_NAME = `s-devs-ci-service-${os.platform()}-${new Date().getTime()}-${Math.random().toString(36).substr(2)}`;
export const REMOVE_SERVICE_NAME = `s-devs-ci-service-remove-${os.platform()}-${new Date().getTime()}-${Math.random().toString(36).substr(2)}`;
export const OSS_BUCKET_NAME = `s-devs-ci-bucket-${os.platform()}-${new Date().getTime()}-${Math.random().toString(36).substr(2)}`;
export const MNS_TOPIC_NAME = `s-devs-ci-${os.platform()}-${new Date().getTime()}-${Math.random().toString(36).substr(2)}`;
export const ROLE_NAME = `s-devs-ci-role-${os.platform()}-${new Date().getTime()}-${Math.random().toString(36).substr(2)}`;

export const SERVICE_CONFIG = {
  name: SERVICE_NAME,
  description: 'This is for fc test',
};
export const REMOVE_SERVICE_CONFIG = {
  name: REMOVE_SERVICE_NAME,
  description: 'This is for fc test',
};

export const FUNCTION_CONFIG = {
  name: FUNCTION_NAME,
  description: 'This is for fc-deploy test',
  memorySize: 128,
  timeout: 30,
  handler: 'index.handler',
  runtime: 'nodejs12',
  codeUri: path.join(MOCK_PROJECT_PATH, 'code'),
}

export const DOMAIN_CONFIG = _.cloneDeep([{
  domainName: 'auto',
  protocol: 'HTTP',
  routeConfigs: [{
    path: '/*',
    serviceName: SERVICE_NAME,
    functionName: FUNCTION_NAME,
  }]
}]);

export const HTTP_TRIGGER_CONFIG = {
  name: HTTP_TRIGGER_NAME,
  type: 'http',
  config: {
    authType: 'anonymous',
    methods: ['POST', 'GET']
  },
};

export const OSS_TRIGGER_CONFIG = {
  name: OSS_TRIGGER_NAME,
  type: 'oss',
  config: {
    bucketName: OSS_BUCKET_NAME,
    events: ['oss:ObjectCreated:*', 'oss:ObjectRemoved:DeleteObject'],
    filter: {
      Key: {
        Prefix: 'source/',
        Suffix: '.png',
      },
    },
  }
};

export const MNS_TRIGGER_CONFIG = {
  name: MNS_TRIGGER_NAME,
  type: 'mns_topic',
  config: {
    region: REGION,
    topicName: MNS_TOPIC_NAME,
    notifyContentFormat: 'JSON',
    notifyStrategy: 'BACKOFF_RETRY',
  },
};

export const INPUTS: any = {
  appName: 'fc-test',
  command: '',
  project: {
    access: ACCESS,
    component: process.cwd(),
    projectName: 'test',
  },
  path: {
    configPath: MOCK_PROJECT_YAML_PATH,
  },
  args: '-y --use-local',
  argsObj: undefined,
  props: {},
};
