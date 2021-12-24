import {
  globalParams,
  globalDescribe,
  regionDescribe,
  serviceNameDescribe,
} from './constant';

export const SYNC = [
  {
    header: 'Sync',
    content: 'Synchronize online resources to offline resources',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/command/sync.md',
  },
  {
    header: 'Usage',
    content: '$ s sync <options> ',
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
        description: '[Optional] Specify the fc trigger name, multiple triggers can be specified using [--trigger-name name1 --trigger-name',
        type: String,
      },
      {
        name: 'target-dir',
        description: '[Optional] Specify storage directory, default: current dir',
        type: String,
      },
      {
        name: 'type',
        description: '[Optional] Operation type, value: code/config',
        typeLabel: '{underline [code/config]}',
        type: String,
      },
      {
        name: 'force',
        description: '[Optional] Mandatory overwrite code file',
        alias: 'f',
        type: Boolean,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s sync'],
  },
  {
    header: 'Examples with CLI',
    content: ['$ s cli fc sync --region cn-shanghai --service-name serviceName --type config'],
  },
];
