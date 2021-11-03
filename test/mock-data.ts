import * as path from 'path';

export const ACCESS = `access-${new Date().getTime()}-${Math.random().toString(36).substr(2)}`;
export const REGION = 'cn-hangzhou';
export const MOCK_PROJECT_PATH: string = path.join(__dirname, 'mock-project');
export const MOCK_PROJECT_YAML_PATH: string = path.join(MOCK_PROJECT_PATH, 's.yaml');
export const DEFAULT_CLIENT_TIMEOUT = 600 * 1000;

export const FUNCTION_NAME = 'testFunction';
export const HTTP_TRIGGER_NAME = 'httpTrigger';
export const OSS_TRIGGER_NAME = 'ossTrigger';
export const MNS_TRIGGER_NAME = 'mnsTrigger';

export const SERVICE_NAME = `test-service-${Math.random().toString(36).substr(2)}`;
export const OSS_BUCKET_NAME = `fc-integration-test-${new Date().getTime()}-${Math.random().toString(36).substr(2)}`;
export const MNS_TOPIC_NAME = `fc-integration-test-${new Date().getTime()}-${Math.random().toString(36).substr(2)}`;
// export const SERVICE_NAME = `test-service-90909jiji`;
// export const OSS_BUCKET_NAME = `fc-integration-test-90909jiji`;
// export const MNS_TOPIC_NAME = `fc-integration-test-90909jiji`;

export const SERVICE_CONFIG = {
  name: SERVICE_NAME,
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
  args: '-y',
  argsObj: undefined,
  props: {},
};
