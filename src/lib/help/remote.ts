import {
  globalParams,
  globalDescribe,
  eventFormat,
} from './constant';

export const REMOTE = [
  {
    header: 'Remote',
    content: 'Remote invoke with real net traffic via proxied service',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/command/remote.md',
  },
  {
    header: 'Usage',
    content: '$ s remote <sub-command> <options>',
  },
  {
    header: 'SubCommand List',
    content: [
      {
        desc: 'setup',
        example: 'Setup the real remote service for debugging; [s remote setup -h]',
      },
      {
        desc: 'invoke',
        example: 'Invoke remote function; help command [s remote invoke -h]',
      },
      {
        desc: 'cleanup',
        example: 'Clean the related resource and environment; help command [s remote cleanup -h]',
      },
    ],
  },
];

export const REMOTE_SETUP = [
  {
    header: 'Remote setup',
    content: 'Setup for remote invoke via proxied service',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/command/remote.md',
  },
  {
    header: 'Usage',
    content: '$ s remote setup [options]',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'config',
        description: '[Optional] elect which IDE to use when debugging and output related debug config tips for the IDE. value: vscode/pycharm/idea',
        alias: 'c',
        typeLabel: '{underline [vscode/pycharm/idea]}',
        type: String,
      },
      {
        name: 'debug-port',
        description: '[Optional] Specify the sandboxed container starting in debug mode, and exposing this port on localhost',
        alias: 'd',
        type: Number,
      },
      {
        name: 'tmp-dir',
        description: "[Optional] The temp directory mounted to '/tmp' , default: './.s/tmp/invoke/serviceName/functionName/' ",
        type: String,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s remote setup',
      '$ s remote setup --config vscode --debug-port 3000',
    ],
  },
];

export const REMOTE_INVOKE = [
  {
    header: 'Remote invoke',
    content: 'Invoke remote function in the container, pre-action is [s remote setup]',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/command/remote.md',
  },
  {
    header: 'Usage',
    content: '$ s remote invoke <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'event',
        description: '[Optional] Event data passed to the function during invocation (default: "")',
        alias: 'e',
        type: String,
      },
      {
        name: 'event-file',
        description: '[Optional] Event funtion: A file containing event data passed to the function during invoke',
        alias: 'f',
        type: String,
      },
      {
        name: 'event-stdin',
        description: '[Optional] Read from standard input, to support script pipeline',
        alias: 's',
        type: Boolean,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  eventFormat,
  {
    header: 'Examples with Yaml',
    content: [
      '$ s remote setup',
      '$ s remote setup --config vscode --debug-port 3000',
    ],
  },
];

export const REMOTE_CLEANUP = [
  {
    header: 'Remote cleanup',
    content: 'Clean the helper resource and the local container',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/command/remote.md',
  },
  {
    header: 'Usage',
    content: '$ s remote cleanup',
  },
  { ...globalParams },
  eventFormat,
  {
    header: 'Examples with Yaml',
    content: ['$ s remote cleanup'],
  },
];
