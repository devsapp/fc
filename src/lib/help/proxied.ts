
import {
  globalParams,
  globalDescribe,
  eventFormat,
} from './constant';

export const PROXIED = [
  {
    header: 'Proxied',
    content: 'Local invoke with real net traffic via proxied service',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/proxied.md',
  },
  {
    header: 'Usage',
    content: '$ s proxied <sub-command> <options>',
  },
  {
    header: 'SubCommand List',
    content: [
      {
        desc: 'setup',
        example: 'Setup the preconditions; [s proxied setup -h] ',
      },
      {
        desc: 'invoke',
        example: 'Invoke local function; help command [s proxied invoke -h]',
      },
      {
        desc: 'cleanup',
        example: 'Clean the related resource and environment; help command [s proxied cleanup -h]',
      },
    ],
  },
];

export const PROXIED_SETUP = [
  {
    header: 'Proxied setup',
    content: 'Setup for local invoke via proxied service',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/proxied.md',
  },
  {
    header: 'Usage',
    content: '$ s proxied setup [options]',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'config',
        description: '[Optional] elect which IDE to use when debugging and output related debug config tips for the IDE. value: vscode, intellij',
        alias: 'c',
        typeLabel: '{underline [vscode/intellij]}',
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
      {
        name: 'debugger-path',
        description: '[Optional] The path of the debugger on the host',
        type: String,
      },
      {
        name: 'debug-args',
        description: '[Optional] Additional parameters that will be passed to the debugger',
        type: String,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s proxied setup',
      '$ s proxied setup --config vscode --debug-port 3000',
    ],
  },
];

export const PROXIED_INVOKE = [
  {
    header: 'Proxied invoke',
    content: 'Invoke local function in the container, pre-action is [s proxied setup]',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/proxied.md',
  },
  {
    header: 'Usage',
    content: '$ s proxied invoke <options>',
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
      '$ s proxied setup',
      '$ s proxied invoke --event string',
    ],
  },
];

export const PROXIED_CLEANUP = [
  {
    header: 'Proxied cleanup',
    content: 'Clean the helper resource and the local container',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/proxied.md',
  },
  {
    header: 'Usage',
    content: '$ s proxied cleanup',
  },
  { ...globalParams },
  eventFormat,
  {
    header: 'Examples with Yaml',
    content: ['$ s proxied cleanup'],
  },
];
