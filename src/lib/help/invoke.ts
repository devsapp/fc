import {
  globalParams,
  globalDescribe,
  regionDescribe,
  serviceNameDescribe,
  functionNameDescribe,
  eventFormat,
} from './constant';

export const INVOKE = [
  {
    header: 'Invoke',
    content: 'Invoke/trigger online functions',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/invoke.md',
  },
  {
    header: 'Usage',
    content: '$ s invoke <options>',
  },
  {
    header: 'Options',
    optionList: [
      regionDescribe,
      serviceNameDescribe,
      functionNameDescribe,
      {
        name: 'event',
        description: '[Optional] Event data passed to the function during invocation (default: "")',
        alias: 'e',
        type: String,
      },
      {
        name: 'timeout',
        description: '[Optional] Configure client timeout',
        type: Number,
      },
      {
        name: 'event-file',
        description:
          '[Optional] Event funtion: A file containing event data passed to the function during invoke',
        alias: 'f',
        type: String,
      },
      {
        name: 'event-stdin',
        description: '[Optional] Read from standard input, to support script pipeline',
        alias: 's',
        type: Boolean,
      },
      {
        name: 'invocation-type',
        description: '[Optional] Invocation type, value: async/sync, default: sync',
        typeLabel: '{underline [async/sync]}',
        type: String,
      },
      {
        name: 'stateful-async-invocation-id',
        description:
          '[Optional] Stateful asynchronous invocation, only takes effect when --invocation-type=async',
        type: String,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  eventFormat,
  {
    header: 'Examples with Yaml',
    content: [
      '$ s invoke',
      '$ s invoke --invocation-type async',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc invoke --region cn-hangzhou --service-name serviceName --function-name functionName --event evnetString',
    ],
  },
];
