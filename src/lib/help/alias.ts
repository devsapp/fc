import {
  globalParams,
  globalDescribe,
  regionDescribe,
  serviceNameDescribe,
  showTableDescribe,
} from './constant';

const aliasNameDescribe = {
  name: 'alias-name',
  description: '[Required] Specify the fc alias name',
  type: String,
};

export const ALIAS = [
  {
    header: 'Alias',
    content: 'Service alias operation',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/alias.md',
  },
  {
    header: 'Usage',
    content: '$ s alias <sub-command>',
  },
  {
    header: 'SubCommand List',
    content: [
      { desc: 'get', example: 'Get alias details; help command [s alias get -h]' },
      { desc: 'list', example: 'View the list of alias; help command [s alias list -h]' },
      { desc: 'publish', example: 'Publish alias; help command [s alias publish -h]' },
      { desc: 'rollback', example: 'Rollback alias versionId; help command [s alias rollback -h]' },
    ],
  },
];

export const ALIAS_GET = [
  {
    header: 'Alias get',
    content: 'Get alias details',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/alias.md',
  },
  {
    header: 'Usage',
    content: '$ s alias get <options>',
  },
  {
    header: 'Options',
    optionList: [regionDescribe, serviceNameDescribe, aliasNameDescribe],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s alias get --alias-name aliasName'],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc alias get --region cn-hangzhou --service-name serviceName --alias-name aliasName',
    ],
  },
];

export const ALIAS_LIST = [
  {
    header: 'Alias list',
    content: 'View the list of service alias',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/alias.md',
  },
  {
    header: 'Usage',
    content: '$ s alias list <options>',
  },
  {
    header: 'Options',
    optionList: [regionDescribe, serviceNameDescribe, showTableDescribe],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s alias list'],
  },
  {
    header: 'Examples with CLI',
    content: ['$ s cli fc alias list --region cn-hangzhou --service-name serviceName'],
  },
];

export const ALIAS_PUBLISH = [
  {
    header: 'Alias publish',
    content: 'Publish service alias',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/alias.md',
  },
  {
    header: 'Usage',
    content: '$ s alias publish <options>',
  },
  {
    header: 'Options',
    optionList: [
      regionDescribe,
      serviceNameDescribe,
      aliasNameDescribe,
      {
        name: 'version-id',
        description: '[Required] The version Id',
        type: String,
      },
      {
        name: 'version-latest',
        description: '[Optional] Binding the latest service version',
        type: Boolean,
      },
      {
        name: 'description',
        description: '[Optional] Specify the alias description',
        type: String,
      },
      {
        name: 'gversion',
        description: '[Optional] The grayscale version id',
        type: String,
      },
      {
        name: 'weight',
        description: '[Optional] The weight for grayscale version',
        type: String,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s alias publish --alias-name aliasName --version-id 2',
      '$ s alias publish --alias-name aliasName --version-latest',
      '$ s alias publish --description description --alias-name aliasName --version-id 2 --gversion 3 --weight 20',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc alias publish --region cn-hangzhou --service-name serviceName --alias-name aliasName --version-id 2',
    ],
  },
];

export const ALIAS_ROLLBACK = [
  {
    header: 'Alias rollback',
    content: 'Rollback service alias',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/alias.md',
  },
  {
    header: 'Usage',
    content: '$ s alias rollback <options>',
  },
  {
    header: 'Options',
    optionList: [
      regionDescribe,
      serviceNameDescribe,
      aliasNameDescribe,
      {
        name: 'version-id',
        description: "[Required] The version Id. You can also use the keyword 'HEAD'",
        type: String,
      },
      {
        name: 'description',
        description: '[Optional] Specify the alias description',
        type: String,
      },
      {
        name: 'gversion',
        description: '[Optional] The grayscale version id',
        type: String,
      },
      {
        name: 'weight',
        description: '[Optional] The weight for grayscale version',
        type: String,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s alias rollback --alias-name aliasName --version-id 2',
      '$ s alias rollback --alias-name aliasName --version-id HEAD^^',
      '$ s alias rollback --alias-name aliasName --version-id HEAD~2',
      '$ s alias rollback --description description --alias-name aliasName --version-id 2 --gversion 3 --weight 20',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc alias rollback --region cn-hangzhou --service-name serviceName --alias-name aliasName --version-id HEAD^',
    ],
  },
];