import {
  globalParams,
  globalDescribe,
  regionDescribe,
} from './constant';

export const FUN_TO_S = [
  {
    header: 'Fun2s',
    content: 'Convert the Yaml specification of Funcraft to the Yaml specification of Serverless Devs',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/command/fun2s.md',
  },
  {
    header: 'Usage',
    content: '$ s cli fc fun2s <options>',
  },
  {
    header: 'Options',
    optionList: [
      regionDescribe,
      {
        name: 'source',
        description: '[Optional] Specify Funcraft configuration path, default: template.yaml/template.yml',
        type: String,
      },
      {
        name: 'target',
        description: '[Optional] Specify Serverless Devs configuration path, default: s.yaml',
        type: String,
      },
      {
        name: 'force',
        description: '[Optional] Mandatory overwrite s file',
        type: Boolean,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with CLI',
    content: ['$ s cli fc fun2s --region cn-shenzhen --target ./s.yaml '],
  },
];
