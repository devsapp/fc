import { globalParams, globalDescribe, assumeYesDescribe } from './constant';

const useLocal = {
  name: 'use-local',
  description: '[Optional] Deploy resource using local config',
  defaultOption: false,
  type: Boolean,
};
const useRemote = {
  name: 'use-remote',
  description: '[Optional] Deploy resource using remote config',
  defaultOption: false,
  type: Boolean,
};
const skipPush = {
  name: 'skip-push',
  description: '[Optional] Skip automatically pushing docker container images',
  defaultOption: false,
  type: Boolean,
};
const deployType = {
  name: 'type',
  description: '[Optional] Only deploy configuration or code, value: code/config ',
  defaultOption: false,
  type: String,
};

const env = {
  name: 'env',
  type: String,
  description: '[Optional] Specify an environment name and deploy on the environment ',
};

const options = [useLocal, useRemote, assumeYesDescribe];

export const DEPLOY = [
  {
    header: 'Deploy',
    content: 'Deploy local resources online',
  },
  {
    header: 'Document',
    content: 'https://serverless.help/t/fc-deploy',
  },
  {
    header: 'Usage',
    content: ['$ s deploy <options>', '$ s deploy <sub-command> <options>'],
  },
  {
    header: 'Options',
    optionList: [
      deployType,
      useLocal,
      useRemote,
      assumeYesDescribe,
      skipPush,
      env,
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'SubCommand List',
    content: [
      {
        desc: 'service',
        example: 'Only deploy service resources; help command [s deploy service -h]',
      },
      {
        desc: 'function',
        example: 'Only deploy function resources; help command [s deploy function -h]',
      },
      {
        desc: 'trigger',
        example: 'Only deploy trigger resources; help command [s deploy trigger -h]',
      },
      {
        desc: 'domain',
        example: 'Only deploy domain resources; help command [s deploy domain -h]',
      },
    ],
  },
];

export const DEPLOY_ALL = DEPLOY;

export const DEPLOY_SERVICE = [
  {
    header: 'Deploy Service',
    content: 'Only deploy service resources',
  },
  {
    header: 'Document',
    content: 'https://serverless.help/t/fc-deploy-service',
  },
  {
    header: 'Usage',
    content: '$ s deploy service <options>',
  },
  {
    header: 'Options',
    optionList: options,
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s deploy service', '$ s deploy service --use-local'],
  },
];

export const DEPLOY_FUNCTION = [
  {
    header: 'Deploy function',
    content: 'Only deploy function resources',
  },
  {
    header: 'Document',
    content: 'https://serverless.help/t/fc-deploy-function',
  },
  {
    header: 'Usage',
    content: '$ s deploy function <options>',
  },
  {
    header: 'Options',
    optionList: [
      deployType,
      ...options,
      skipPush,
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s deploy function', '$ s deploy function --use-local'],
  },
];

export const DEPLOY_TRIGGER = [
  {
    header: 'Deploy trigger',
    content: 'Only deploy trigger resources',
  },
  {
    header: 'Document',
    content: 'https://serverless.help/t/fc-deploy-trigger',
  },
  {
    header: 'Usage',
    content: '$ s deploy trigger <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'trigger-name',
        description:
          '[Optional] Only deploy the specified trigger, multiple triggers can be specified using [--trigger-name name1 --trigger-name name2]',
        type: String,
      },
      ...options,
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s deploy trigger',
      '$ s deploy trigger --use-local',
      '$ s deploy trigger --trigger-name name1 --trigger-name name2',
    ],
  },
];

export const DEPLOY_DOMAIN = [
  {
    header: 'Deploy domain',
    content: 'Only deploy domain resources',
  },
  {
    header: 'Document',
    content: 'https://serverless.help/t/fc-deploy-domain',
  },
  {
    header: 'Usage',
    content: '$ s deploy domain <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'domain-name',
        description:
          '[Optional] Only deploy the specified domain, multiple domains can be specified using [--domain-name domain1 --domain-name domain2]',
        type: String,
      },
      ...options,
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s deploy domain'],
  },
];
