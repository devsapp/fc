import {
  globalParams,
  globalDescribe,
  regionDescribe,
  serviceNameDescribe,
  functionNameDescribe,
} from './constant';

export const METRICS = [

  {
    header: 'Metrics',
    content: 'Query function metrics information ',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/command/metrics.md',
  },
  {
    header: 'Usage',
    content: '$ s metrics <options> ',
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
    content: ['$ s metrics'],
  },
  {
    header: 'Examples with CLI',
    content: ['$ s cli fc metrics --region cn-hangzhou --service-name serviceName --function-name functionName'],
  },
];
