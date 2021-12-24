import {
  globalParams,
  globalDescribe,
  regionDescribe,
  serviceNameDescribe,
  functionNameDescribe,
} from './constant';


export const LOGS = [
  {
    header: 'Logs',
    content: 'Query the function log. You need to open SLS log service',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/command/logs.md',
  },
  {
    header: 'Usage',
    content: '$ s logs <options>',
  },
  {
    header: 'Options',
    optionList: [
      regionDescribe,
      serviceNameDescribe,
      functionNameDescribe,
      {
        name: 'type',
        description: '[Optional] Log type query, value: success/fail',
        typeLabel: '{underline [success/fail]}',
        type: String,
      },
      {
        name: 'request-id',
        description: '[Optional] Query according to requestId within the time interval',
        type: String,
      },
      {
        name: 'search',
        description: '[Optional] Keyword query,Document: https://help.aliyun.com/document_detail/29060.html',
        type: String,
      },
      {
        name: 'end-time',
        description: '[Optional] Query log end time (timestamp or time format，like 1611827290000 or 2021-11-11T11:11:12+00:00)',
        alias: 'e',
        type: String,
      },
      {
        name: 'start-time',
        description: '[Optional] Query log start time (timestamp or time format，like 1611827290000 or 2021-11-11T11:11:12+00:00)',
        alias: 's',
        type: String,
      },
      {
        name: 'tail',
        description: '[Optional] Continuous log output mode',
        alias: 's',
        type: Boolean,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s logs -s 2021-06-07T02:54:00+08:00 -e 2021-06-07T02:54:59+08:00 ',
      '$ s logs -s 2021-06-07T02:54:00+08:00 -e 2021-06-07T02:54:59+08:00 --search error',
      '$ s logs -t',
    ],
  },
  {
    header: 'Examples with CLI',
    content: ['$ s cli fc logs --region cn-hangzhou --service-name serviceName --function-name functionName -t'],
  },
];
