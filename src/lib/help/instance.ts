import {
  globalParams,
  globalDescribe,
  regionDescribe,
  serviceNameDescribe,
  functionNameDescribe,
} from './constant';


export const INSTANCE = [
  {
    header: 'Instance',
    content: 'Function instance operation',
  },
  {
    header: 'Document',
    content: 'https://serverless.help/t/instance',
  },
  {
    header: 'Usage',
    content: '$ s instance <sub-command>',
  },
  {
    header: 'SubCommand List',
    content: [
      { desc: 'list', example: 'View the list of active function instance; help command [s instance list -h]' },
      { desc: 'exec', example: 'Execute a command in a instance; help command [s instance exec -h]' },
    ],
  },
];

export const INSTANCE_LIST = [
  {
    header: 'Instance list',
    content: 'View the list of active function instance',
  },
  {
    header: 'Document',
    content: 'https://serverless.help/t/instance-list',
  },
  {
    header: 'Usage',
    content: '$ s instance list <options>',
  },
  {
    header: 'Options',
    optionList: [
      regionDescribe,
      serviceNameDescribe,
      functionNameDescribe,
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s instance list'],
  },
  {
    header: 'Examples with CLI',
    content: ['$ s cli fc instance list --region cn-hangzhou --service-name serviceName --function-name functionName'],
  },
];

export const INSTANCE_EXEC = [
  {
    header: 'Instance exec',
    content: 'Execute a command in a instance',
  },
  {
    header: 'Document',
    content: 'https://serverless.help/t/instance-exec',
  },
  {
    header: 'Usage',
    content: '$ s instance exec <instanceId> <options>',
  },
  {
    header: 'Options',
    optionList: [
      regionDescribe,
      serviceNameDescribe,
      functionNameDescribe,
      {
        name: 'qualifier',
        description: '[Optional] Specify the qualifier parameter. Only supports LATEST and alias',
        type: String,
      },
      {
        name: 'stdin',
        description: '[Optional] Open standard input',
        alias: 'i',
        type: Boolean,
      },
      {
        name: 'tty',
        description: '[Required] Allocate a terminal device',
        alias: 't',
        type: Boolean,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Notice',
    content: 'The abbreviation for --tty -t cannot be used alone, because -t is a system parameter of serverless-devs',
  },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s instance exec c-*******-*******b4644b0ee ls',
      '$ s instance exec -it c-*******-*******b4644b0ee /bin/bash',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc instance exec --region cn-hangzhou --service-name serviceName --function-name functionName c-*******-*******b4644b0ee ls',
      '$ s cli fc instance exec --region cn-hangzhou --service-name serviceName --function-name functionName -i --tty c-*******-*******b4644b0ee /bin/bash',
    ],
  },
];
