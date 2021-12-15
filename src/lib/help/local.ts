import { globalParams, globalDescribe } from '../../common/entity';

export const LOCAL_HELP_INFO = [
  {
    header: 'Local',
    content: 'Run your serverless application locally for quick development & testing',
  },
  {
    header: 'Document',
    content: '$ https://github.com/devsapp/fc/blob/main/docs/command/local.md',
  },
  {
    header: 'Usage',
    content: '$ s local <sub-command> <options>',
  },
  {
    header: 'SubCommand List',
    content: [
      { name: 'invoke', summary: 'Local start fc event function; help command [s local invoke -h]' },
      { name: 'start', summary: 'Local invoke fc http function; help command [s local start -h]' },
    ],
  },
];

export const LOCAL_INVOKE_HELP_INFO = [
  {
    header: 'Local Invoke',
    content: 'Local invoke fc event function',
  },
  {
    header: 'Document',
    content: '$ https://github.com/devsapp/fc/blob/main/docs/command/local.md',
  },
  {
    header: 'Usage',
    content: '$ s local invoke <options>',
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
        description: '[Optional] A file containing event data passed to the function during invoke',
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
        name: 'mode',
        typeLabel: '{underline [api/server/normal]}',
        description: `[Optional] Invoke mode, including api, server and normal:
          - api: start api server for invokeFunction api invoking
          - server: start server container for invoking function in the other terminal repeatedly
          - normal: default mode, invoke event function and then close the container`,
        alias: 'm',
        type: String,
      },
      {
        name: 'config',
        typeLabel: '{underline [vscode/pycharm/idea]}',
        description: '[Optional] Select which IDE to use when debugging and output related debug config tips for the IDE. value: vscode/pycharm/idea',
        alias: 'c',
        type: String,
      },
      {
        name: 'debug-port',
        description: '[Optional] Specify the local function container starting in debug mode, and exposing this port on localhost',
        alias: 'd',
        type: Number,
      },
      {
        name: 'debug-args',
        description: '[Optional] Additional parameters that will be passed to the debugger',
        type: String,
      },
      {
        name: 'debugger-path',
        description: '[Optional] The path of the debugger on the host',
        type: String,
      },
      {
        name: 'tmp-dir',
        description: "[Optional] The temp directory mounted to '/tmp' , default: './.s/tmp/invoke/serviceName/functionName/'",
        type: String,
      },
      {
        name: 'server-port',
        description: '[Optional] The exposed port of http server, default value is the random port between 7000 and 8000',
        type: Number,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Event Format',
    content: ['Quickly obtain the data structures of different events through the command [s cli fc-event -h]'],
  },
  {
    header: 'Examples with Yaml',
    content: ['$ s local invoke --event "hello world!"'],
  },
];

export const LOCAL_START_HELP_INFO = [
  {
    header: 'Local Start',
    content: 'Local invoke fc http function',
  },
  {
    header: 'Document',
    content: '$ https://github.com/devsapp/fc/blob/main/docs/command/local.md',
  },
  {
    header: 'Usage',
    content: '$ s local start <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'config',
        description: '[Optional] Select which IDE to use when debugging and output related debug config tips for the IDE. value: vscode/pycharm/idea',
        alias: 'c',
        type: String,
      },
      {
        name: 'debug-port',
        description: '[Optional] Specify the sandboxed container starting in debug mode, and exposing this port on localhost',
        alias: 'd',
        type: Number,
      },
      {
        name: 'custom',
        description: '[Optional] Access in the form of custom domain',
        type: String,
      },
      {
        name: 'debug-args',
        description: '[Optional] Additional parameters that will be passed to the debugger',
        type: String,
      },
      {
        name: 'debugger-path',
        description: '[Optional] The path of the debugger on the host',
        type: String,
      },
      {
        name: 'custom-domain',
        description: '[Optional] Access in the form of custom domain',
        type: String,
      },
      {
        name: 'tmp-dir',
        description: "[Optional] The temp directory mounted to '/tmp' , default: './.s/tmp/invoke/serviceName/functionName/'",
        type: String,
      },
      {
        name: 'server-port',
        description: '[Optional] The exposed port of http server, default value is the random port between 7000 and 8000',
        type: Number,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: [
      {
        name: 'help',
        description: 'Display help for command.',
        alias: 'h',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s {bold local start} [{bold --debug-port} {underline 9000}] [{bold --config} {underline vscode}]',
    ],
  },
];

