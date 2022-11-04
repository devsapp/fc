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

export const ON_DEMAND = [
  {
    header: 'Ondemand',
    content: 'Resource on-demand operation',
  },
  {
    header: 'Document',
    content: 'https://serverless.help/t/ondemand',
  },
  {
    header: 'Usage',
    content: '$ s ondemand <sub-command> <options>',
  },
  {
    header: 'SubCommand List',
    content: [
      {
        desc: 'list',
        example: 'View the list of resource on-demand; help command [s ondemand list -h]',
      },
      { desc: 'put', example: 'Put resource on-demand; help command [s ondemand put -h]' },
      { desc: 'get', example: 'Get resource on-demand; help command [s ondemand get -h]' },
    ],
  },
];

export const ON_DEMAND_LIST = [
  {
    header: 'Ondemand list',
    content: 'View the list of on-demand',
  },
  {
    header: 'Document',
    content: 'https://serverless.help/t/ondemand-list',
  },
  {
    header: 'Usage',
    content: '$ s ondemand list <options>',
  },
  {
    header: 'Options',
    optionList: [regionDescribe, serviceNameDescribe, showTableDescribe],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s ondemand list'],
  },
  {
    header: 'Examples with CLI',
    content: ['$ s cli fc ondemand list --region cn-hangzhou --service-name serviceName'],
  },
];

export const ON_DEMAND_PUT = [
  {
    header: 'Ondemand put',
    content: 'Set reserved configuration',
  },
  {
    header: 'Document',
    content: 'https://serverless.help/t/ondemand-put',
  },
  {
    header: 'Usage',
    content: '$ s ondemand put <options>',
  },
  {
    header: 'Options',
    optionList: [
      regionDescribe,
      serviceNameDescribe,
      functionNameDescribe,
      {
        name: 'max',
        description: '[Required] Specify the maximumInstanceCount parameter',
        type: Number,
      },
      qualifier,
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s ondemand put --qualifier pre --max 1'],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc ondemand put --region cn-hangzhou --service-name serviceName --function-name functionName --qualifier alias --max 1',
    ],
  },
];

export const ON_DEMAND_GET = [
  {
    header: 'Ondemand get',
    content: 'Get on-demand configuration',
  },
  {
    header: 'Document',
    content: 'https://serverless.help/t/ondemand-get',
  },
  {
    header: 'Usage',
    content: '$ s ondemand get <options>',
  },
  {
    header: 'Options',
    optionList: [regionDescribe, serviceNameDescribe, functionNameDescribe, qualifier],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s ondemand get --qualifier qualifier'],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc ondemand get --region cn-hangzhou --service-name serviceName --function-name functionName --qualifier qualifier',
    ],
  },
];
