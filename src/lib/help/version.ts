import {
  globalParams,
  globalDescribe,
  regionDescribe,
  serviceNameDescribe,
  showTableDescribe,
} from './constant';

export const VERSION_HELP = [
  {
    header: 'Version',
    content: 'Service version operation',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/command/version.md',
  },
  {
    header: 'Usage',
    content: '$ s version <sub-command>',
  },
  {
    header: 'SubCommand List',
    content: [
      { desc: 'list', example: 'View the list of service versions; help command [s version list -h]' },
      { desc: 'publish', example: 'Publish service version; help command [s version publish -h]' },
    ],
  },
];

export const VERSION_LIST = [
  {
    header: 'Version list',
    content: 'View the list of service versions',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/command/version.md',
  },
  {
    header: 'Usage',
    content: '$ s version list <options>',
  },
  {
    header: 'Options',
    optionList: [
      regionDescribe,
      serviceNameDescribe,
      showTableDescribe,
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s version list'],
  },
  {
    header: 'Examples with CLI',
    content: ['$ s cli fc version list --region cn-hangzhou --service-name serviceName'],
  },
];

export const VERSION_PUBLISH = [
  {
    header: 'Version publish',
    content: 'Publish service version',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/command/version.md',
  },
  {
    header: 'Usage',
    content: '$ s version publish <options>',
  },
  {
    header: 'Options',
    optionList: [
      regionDescribe,
      serviceNameDescribe,
      {
        name: 'description',
        description: '[Optional] Specify the alias description',
        type: String,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s version publish --description xxx'],
  },
  {
    header: 'Examples with CLI',
    content: ['$ s cli fc version publish --region cn-hangzhou --service-name name --description xxx'],
  },
];
