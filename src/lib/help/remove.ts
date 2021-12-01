import { globalParams, globalDescribe } from '../../common/entity';

export const REMOVE = [
  {
    header: 'Remove',
    content: 'The ability to delete resources',
  },
  {
    header: 'Document',
    content: '$  https://github.com/devsapp/fc/blob/main/docs/command/remove.md',
  },
  {
    header: 'Usage',
    content: [
      '$ s remove <options>',
      '$ s remove <sub-command> <options>',
    ],
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'assume-yes',
        description: '[Optional] Assume that the answer to any question which would be asked is yes',
        alias: 'y',
        defaultOption: false,
        type: Boolean,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'SubCommand List',
    content: [
      {
        desc: 'service',
        example: 'Remove service resources; help command [s remove service -h]',
      },
      {
        desc: 'function',
        example: 'Remove function resources; help command [s remove function -h]',
      },
      {
        desc: 'trigger',
        example: 'Only remove trigger resources; help command [s remove trigger -h]',
      },
      {
        desc: 'domain',
        example: 'Only remove domain resources; help command [s remove domain -h]',
      },
      {
        desc: 'version',
        example: 'Only remove version resources; help command [s remove version -h]',
      },
      {
        desc: 'alias',
        example: 'Only remove alias resources; help command [s remove alias -h]',
      },
      {
        desc: 'provision',
        example: 'Only remove provision resources; help command [s remove provision -h]',
      },
      {
        desc: 'ondemand',
        example: 'Only remove ondemand resources; help command [s remove ondemand -h]',
      },
      {
        desc: 'layer',
        example: 'Only remove layer resources; help command [s remove layer -h]',
      },
    ],
  },
  {
    header: 'Examples with Yaml',
    content: ['$ s remove'],
  },
];

export const REMOVE_SERVICE = [
  {
    header: 'Remove service',
    content: 'Delete service',
  },
  {
    header: 'Document',
    content: '$ https://github.com/devsapp/fc/blob/main/docs/command/remove.md',
  },
  {
    header: 'Usage',
    content: '$ s remove service <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'region',
        description: '[C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1',
        type: String,
      },
      {
        name: 'service-name',
        description: '[C-Required] Specify the fc service name',
        type: String,
      },
      {
        name: 'assume-yes',
        alias: 'y',
        description: '[Optional] Assume that the answer to any question which would be asked is yes',
        type: Boolean,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s remove service'],
  },
  {
    header: 'Examples with CLI',
    content: ['$ s cli fc remove service --region cn-hangzhou --service-name serviceName'],
  },
];

export const REMOVE_FUNCTION = [
  {
    header: 'Remove function',
    content: 'Delete function',
  },
  {
    header: 'Document',
    content: '$  https://github.com/devsapp/fc/blob/main/docs/command/remove.md',
  },
  {
    header: 'Usage',
    content: '$ s remove function <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'region',
        description: '[C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1',
        type: String,
      },
      {
        name: 'service-name',
        description: '[C-Required] Specify the fc service name',
        type: String,
      },
      {
        name: 'function-name',
        description: '[C-Required] Specify the fc function name',
        type: String,
      },
      {
        name: 'assume-yes',
        alias: 'y',
        description: '[Optional] Assume that the answer to any question which would be asked is yes',
        type: Boolean,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s remove function'],
  },
  {
    header: 'Examples with CLI',
    content: ['$ s cli fc remove function --region cn-hangzhou --service-name serviceName --function-name functionName'],
  },
];

export const REMOVE_TRIGGER = [
  {
    header: 'Remove trigger',
    content: 'Delete trigger',
  },
  {
    header: 'Document',
    content: '$ https://github.com/devsapp/fc/blob/main/docs/command/remove.md',
  },
  {
    header: 'Usage',
    content: '$ s remove trigger <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'region',
        description: '[C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1',
        type: String,
      },
      {
        name: 'service-name',
        description: '[C-Required] Specify the fc service name',
        type: String,
      },
      {
        name: 'function-name',
        description: '[C-Required] Specify the fc function name',
        type: String,
      },
      {
        name: 'trigger-name',
        description: '[C-Required] Specify the fc trigger name',
        type: String,
      },
      {
        name: 'assume-yes',
        alias: 'y',
        description: '[Optional] Assume that the answer to any question which would be asked is yes',
        type: Boolean,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s remove trigger'],
  },
  {
    header: 'Examples with Yaml',
    content: ['$ s cli fc remove trigger --region cn-hangzhou --service-name serviceName --function-name functionName --trigger-name triggerName'],
  },
];

export const REMOVE_DOMAIN = [
  {
    header: 'Remove domain',
    content: 'Delete domain',
  },
  {
    header: 'Document',
    content: '$ https://github.com/devsapp/fc/blob/main/docs/command/remove.md',
  },
  {
    header: 'Usage',
    content: '$ s remove domain <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'region',
        description: '[C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1',
        type: String,
      },
      {
        name: 'domain',
        description: '[C-Required] Specify the fc custom domain',
        type: String,
      },
      {
        name: 'assume-yes',
        alias: 'y',
        description: '[Optional] Assume that the answer to any question which would be asked is yes',
        type: Boolean,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s remove domain'],
  },
  {
    header: 'Examples with Yaml',
    content: ['$ s cli fc remove domain --region cn-hangzhou --domain anycodes.cn'],
  },
];

export const REMOVE_VERSION = [
  {
    header: 'Remove version',
    content: 'Delete service version',
  },
  {
    header: 'Document',
    content: '$ https://github.com/devsapp/fc/blob/main/docs/command/remove.md',
  },
  {
    header: 'Usage',
    content: '$ s remove version <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'region',
        description: '[C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1',
        type: String,
      },
      {
        name: 'service-name',
        description: '[C-Required] Specify the fc service name',
        type: String,
      },
      {
        name: 'version-id',
        description: '[Required] The version Id',
        type: String,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s remove version --version-id 1'],
  },
  {
    header: 'Examples with CLI',
    content: ['$ s cli fc remove version --region cn-hangzhou --service-name serviceName --version-id 1'],
  },
];

export const REMOVE_ALIAS = [
  {
    header: 'Remove alias',
    content: 'Delete service alias',
  },
  {
    header: 'Document',
    content: '$ https://github.com/devsapp/fc/blob/main/docs/command/remove.md',
  },
  {
    header: 'Usage',
    content: '$ s remove alias <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'region',
        description: '[C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1',
        type: String,
      },
      {
        name: 'service-name',
        description: '[C-Required] Specify the fc service name',
        type: String,
      },
      {
        name: 'alias-name',
        description: '[Required] Specify the fc alias name',
        type: String,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s remove alias --alias-name aliasName'],
  },
  {
    header: 'Examples with CLI',
    content: ['$ s cli fc remove alias --region cn-hangzhou --service-name serviceName --alias-name aliasName'],
  },
];

export const REMOVE_PROVISION = [
  {
    header: 'Remove provision',
    content: 'Delete provision',
  },
  {
    header: 'Document',
    content: '$ https://github.com/devsapp/fc/blob/main/docs/command/remove.md',
  },
  {
    header: 'Usage',
    content: '$ s remove provision <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'region',
        description: '[C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1',
        type: String,
      },
      {
        name: 'service-name',
        description: '[C-Required] Specify the fc service name',
        type: String,
      },
      {
        name: 'qualifier',
        description: '[Required] Specify the qualifier parameter. Only supports LATEST and alias',
        type: String,
      },
      {
        name: 'function-name',
        description: '[C-Required] Specify the fc function name',
        type: String,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s remove provision --qualifier alias'],
  },
  {
    header: 'Examples with CLI',
    content: ['$ s cli fc remove provision --region cn-hangzhou --service-name serviceName --function-name functionName --qualifier alias'],
  },
];

export const REMOVE_ONDEMAND = [
  {
    header: 'Remove ondemand',
    content: 'Delete ondemand resouece',
  },
  {
    header: 'Document',
    content: '$ https://github.com/devsapp/fc/blob/main/docs/command/remove.md',
  },
  {
    header: 'Usage',
    content: '$ s remove ondemand <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'region',
        description: '[C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1',
        type: String,
      },
      {
        name: 'service-name',
        description: '[C-Required] Specify the fc service name',
        type: String,
      },
      {
        name: 'function-name',
        description: '[C-Required] Specify the fc function name',
        type: String,
      },
      {
        name: 'qualifier',
        description: '[Required] If qualifier is specified, only all onDemand resources under this alias will be cleared; if not specified, all versions of onDemand resources under this service will be cleared',
        type: String,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s remove ondemand'],
  },
  {
    header: 'Examples with CLI',
    content: ['$ s cli fc remove ondemand --region cn-hangzhou --service-name serviceName'],
  },
];

export const REMOVE_LAYER = [
  {
    header: 'Remove layer',
    content: 'Delete layer',
  },
  {
    header: 'Document',
    content: '$ https://github.com/devsapp/fc/blob/main/docs/command/remove.md',
  },
  {
    header: 'Usage',
    content: '$ s remove layer <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'region',
        description: '[C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1',
        type: String,
      },
      {
        name: 'layer-name',
        description: '[Required] Delete all versions of the specified layer',
        type: String,
      },
      {
        name: 'version-id',
        description: '[Optional] Only delete the version of the specified layer',
        type: String,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s layer delete --layer-name layerName'],
  },
  {
    header: 'Examples with CLI',
    content: ['$ s cli fc layer delete --region cn-hangzhou --layer-name layerName'],
  },
];
