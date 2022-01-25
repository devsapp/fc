import {
  globalParams,
  globalDescribe,
  regionDescribe,
  serviceNameDescribe,
  functionNameDescribe,
  showTableDescribe,
} from './constant';

const qualifier = {
  name: 'qualifier',
  description: '[Required] Specify the qualifier parameter. Only supports LATEST and alias',
  type: String,
};

export const PROVISION = [
  {
    header: 'Provision',
    content: 'resource reservation operation',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/provision.md',
  },
  {
    header: 'Usage',
    content: '$ s provision <sub-command> <options>',
  },
  {
    header: 'SubCommand List',
    content: [
      {
        desc: 'list',
        example: 'View the list of resource reservation; help command [s provision list -h]',
      },
      { desc: 'put', example: 'Put resource reservation; help command [s provision put -h]' },
      { desc: 'get', example: 'Get resource reservation; help command [s provision get -h]' },
    ],
  },
];

export const PROVISION_LIST = [
  {
    header: 'Provision list',
    content: 'View the list of provision',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/provision.md',
  },
  {
    header: 'Usage',
    content: '$ s provision list <options>',
  },
  {
    header: 'Options',
    optionList: [regionDescribe, serviceNameDescribe, qualifier, showTableDescribe],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s provision list'],
  },
  {
    header: 'Examples with CLI',
    content: ['$ s cli fc version list --region cn-hangzhou --service-name serviceName'],
  },
];

export const PROVISION_PUT = [
  {
    header: 'Provision put',
    content: 'Set reserved configuration',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/provision.md',
  },
  {
    header: 'Usage',
    content: '$ s provision put <options>',
  },
  {
    header: 'Options',
    optionList: [
      regionDescribe,
      serviceNameDescribe,
      functionNameDescribe,
      {
        name: 'target',
        description: '[Optional] Specify the provision target parameter',
        type: Number,
      },
      {
        name: 'config',
        description:
          '[Optional] Specify the configuration path parameter,Config format refers to [https://github.com/devsapp/fc/blob/jiangyu-docs/docs/zh/command/provision.md#provision-config]',
        type: String,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s provision put --target 1 --qualifier alias',
      '$ s provision put --config ./provision.json --qualifier alias',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc provision put --region cn-hangzhou --service-name serviceName --function-name functionName --qualifier alias --target 1',
    ],
  },
];

export const PROVISION_GET = [
  {
    header: 'Provision get',
    content: 'Get provision configuration',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/provision.md',
  },
  {
    header: 'Usage',
    content: '$ s provision get <options>',
  },
  {
    header: 'Options',
    optionList: [regionDescribe, serviceNameDescribe, functionNameDescribe, qualifier],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s provision get --qualifier alias'],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc provision get --region cn-hangzhou --service-name serviceName --function-name functionName --qualifier alias',
    ],
  },
];
