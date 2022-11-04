import { globalParams, globalDescribe, regionDescribe, serviceNameDescribe } from './constant';

export const INFO = [
  {
    header: 'Info',
    content: 'Query online resource details',
  },
  {
    header: 'Document',
    content: 'https://serverless.help/t/info',
  },
  {
    header: 'Usage',
    content: '$ s info <options> ',
  },
  {
    header: 'Options',
    optionList: [
      regionDescribe,
      serviceNameDescribe,
      {
        name: 'function-name',
        description: '[Optional] Specify the fc function name',
        type: String,
      },
      {
        name: 'trigger-name',
        description:
          '[Optional] Specify the fc trigger name, multiple triggers can be specified using [--trigger-name name1 --trigger-name',
        type: String,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s info'],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc info --region region --service-name serviceName --access accessName',
      '$ s cli fc info --region region --service-name serviceName --function-name functionName --trigger-name triggerName',
    ],
  },
];
