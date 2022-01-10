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
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/instance.md',
  },
  {
    header: 'Usage',
    content: '$ s instance <sub-command>',
  },
  {
    header: 'SubCommand List',
    content: [
      { desc: 'list', example: 'View the list of function instance; help command [s instance list -h]' },
      { desc: 'exec', example: 'Execute instructions in the container; help command [s instance exec -h]' },
    ],
  },
];

export const INSTANCE_LIST = [
  {
    header: 'Instance list',
    content: 'View the list of function instance',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/instance.md',
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
    content: 'Execute instructions in the container',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/instance.md',
  },
  {
    header: 'Usage',
    content: '$ s instance exec <options>',
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
        name: 'instance-id',
        description: '[Required] Specifies the function instanceId',
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
    header: 'Examples with Yaml',
    content: [
      '$ s instance exec --instance-id instanceId ls',
      '$ s instance exec --instance-id instanceId -it "/bin/bash ls"',
    ],
  },
  {
    header: 'Examples with CLI',
    content: ['$ s cli fc instance exec --region cn-hangzhou --service-name serviceName --function-name functionName --instance-id instanceId ls'],
  },
];
