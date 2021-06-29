export const COMPONENT_HELP_INFO = [
  {
    header: 'fc component',
    content: 'You can use the component to manager and develop your alicloud function computer resources.',
  },
  {
    header: 'Usage',
    content: '$ s <command> <options>',
  },
  {
    header: 'Command List',
    content: [
      { name: 'help', summary: 'Display help information.' },
      { name: 'deploy', summary: 'Deploy serverless application.' },
      { name: 'remove', summary: 'Remove serverless application.' },
      { name: 'local', summary: 'Local debug serverless application.' },
      { name: 'info', summary: 'Get information of alicloud function computer resources.' },
      { name: 'build', summary: 'Build artifacts for your serverless application.' },
      { name: 'sync', summary: 'Sync remote serverless application config/code to local.' },
      { name: 'logs', summary: 'Get the logs of the remote serverless application.' },
      { name: 'metrics', summary: 'Display the metrics of the remote serverless application.' },
      { name: 'nas', summary: 'Manage the file resource in the NAS file system.' },
    ],
  },
  {
    header: 'Global Options',
    optionList: [
      {
        name: 'assumeYes',
        description: 'Assume that the answer to any question which would be asked is yes.',
        alias: 'y',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Examples with Yaml',
    content: [
      '$ fc {bold deploy} --help',
      '$ fc {bold remove} --help',
      '$ fc {bold help}',
    ],
  },
];

export const LOCAL_HELP_INFO = [
  {
    header: 'Local',
    content: 'Run your serverless application locally for quick development & testing.',
  },
  {
    header: 'Usage',
    content: '$ s local <sub-command>',
  },
  {
    header: 'SubCommand List',
    content: [
      { name: 'invoke', summary: 'Local start fc event function, you can get help through [s local invoke -h]' },
      { name: 'start', summary: 'Local invoke fc http function, you can get help through [s local start -h]' },
    ],
  },
];

export const LOGS_HELP_INFO = [
  {
    header: 'Logs',
    content: 'Query the function log. You need to open SLS log service.',
  },
  {
    header: 'Usage',
    content: '$ s logs <options> ',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'tail',
        description: 'Continuous log output mode',
        alias: 't',
        defaultOption: false,
        type: Boolean,
      },
      {
        name: 'start-time',
        description: 'Query log start time (Timestamp or time format，like 1611827290000 or 2021-11-11T11:11:12+00:00)',
        alias: 's',
        defaultOption: false,
        type: String,
      },
      {
        name: 'end-time',
        description: 'Query log end time (Timestamp or time format，like 1611827290000 or 2021-11-11T11:11:12+00:00)',
        alias: 'e',
        defaultOption: false,
        type: String,
      },
      {
        name: 'keyword',
        description: 'Keyword query',
        alias: 'k',
        defaultOption: false,
        type: String,
      },
      {
        name: 'request-id',
        description: 'Query according to requestId within the time interval',
        alias: 'r',
        defaultOption: false,
        type: String,
      },
      {
        name: 'type',
        description: 'Log type query, value: failed',
        defaultOption: false,
        type: String,
      },
      {
        name: 'region',
        description: 'Specify the region parameter',
        defaultOption: false,
        type: String,
      },
      {
        name: 'service-name',
        description: 'Specify the service name parameter',
        defaultOption: false,
        type: String,
      },
      {
        name: 'function-name',
        description: 'Specify the function name parameter',
        defaultOption: false,
        type: String,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: [
      {
        name: 'access',
        description: 'Specify key alias.',
        alias: 'a',
        type: Boolean,
      },
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
      {
        desc: 'Query logs in the time interval',
        example: '$ s exec -- logs -s 2021-06-07T02:54:00+08:00 -e 2021-06-07T02:54:59+08:00',
      },
      {
        desc: 'Continuous log output mode',
        example: '$ s exec -- logs -t',
      },
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      {
        example: '$ s cli fc logs --region cn-hangzhou --service-name myService --function-name myFunction -t',
      },
    ],
  },
];

export const METRICS_HELP_INFO = [
  {
    header: 'Metrics',
    content: 'Query function metrics information',
  },
  {
    header: 'Usage',
    content: '$ s metrics <options> ',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'region',
        description: 'Specify the region parameter',
        defaultOption: false,
        type: String,
      },
      {
        name: 'service-name',
        description: 'Specify the service name parameter',
        defaultOption: false,
        type: String,
      },
      {
        name: 'function-name',
        description: 'Specify the function name parameter',
        defaultOption: false,
        type: String,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: [
      {
        name: 'access',
        description: 'Specify key alias.',
        alias: 'a',
        type: Boolean,
      },
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
      {
        example: '$ s metrics',
      },
      {
        example: '$ s <ProjectName> metrics',
      },
      {
        example: '$ s exec -- metrics --region cn-hangzhou --service-name myService --function-name myFunction',
      },
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      {
        example: '$ s cli fc metrics --region cn-hangzhou --service-name myService --function-name myFunction',
      },
    ],
  },
];

export const NAS_HELP_INFO = [
  {
    header: 'Nas',
    content: 'Upload and download files for NAS service.',
  },
  {
    header: 'Usage',
    content: '$ s exec -- nas <sub-command>',
  },
  {
    header: 'SubCommand',
    content: [
      {
        desc: 'download',
        example: 'Download resources, you can get help through [s nas download -h]',
      },
      {
        desc: 'upload',
        example: 'Upload resources, you can get help through [s nas upload -h]',
      },
      {
        desc: 'command',
        example: 'Execute relevant instructions, you can get help through [s nas command -h]',
      },
    ],
  },
];

const UPLOADHELP = [
  {
    header: 'nas Upload',
    content: 'Upload resources.',
  },
  {
    header: 'Usage',
    content: [
      { example: '$ s nas upload <options> <src_path> <fc_dir>' },
    ],
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'recursive',
        description: 'Iterate to copy folder content',
        alias: 'r',
        defaultOption: false,
        type: Boolean,
      },
      {
        name: 'no-clobber',
        description: 'Do not override existing files',
        alias: 'n',
        defaultOption: false,
        type: Boolean,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: [
      {
        name: 'help',
        description: 'Upload help for command',
        alias: 'h',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Examples with Yaml',
    content: [
      {
        example: '$ s exec -- nas upload /home/usr/demo.file nas://<fc_dir>',
      },
    ],
  },
  {
    header: 'Examples',
    content: [
      {
        example: '$ s exec -- upload /home/usr/demo.file nas://<fc_dir>',
      },
    ],
  },
];

const DOWNLOADHELP = [
  {
    header: 'Nas Download',
    content: 'Download resources.',
  },
  {
    header: 'Usage',
    content: [
      { example: '$ s nas download <options> <fc_dir> <src_path>' },
    ],
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'recursive',
        description: 'Iterate to copy folder content',
        alias: 'r',
        defaultOption: false,
        type: Boolean,
      },
      {
        name: 'no-clobber',
        description: 'Do not override existing files',
        alias: 'n',
        defaultOption: false,
        type: Boolean,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: [
      {
        name: 'help',
        description: 'Download help for command',
        alias: 'h',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Examples with Yaml',
    content: [
      {
        example: '$ s exec -- nas download nas://<fc_dir> /home/usr/demo',
      },
    ],
  },
];

const COMMANDHELP = [
  {
    header: 'nas Command',
    content: 'Operation instruction.',
  },
  {
    header: 'Usage',
    content: [
      { example: '$ s exec -- nas command <option>' },
    ],
  },
  {
    header: 'Global Options',
    optionList: [
      {
        name: 'help',
        description: 'Download help for command',
        alias: 'h',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Examples',
    content: [
      {
        example: '$ s exec -- nas command ls nas:///<nas_dir>',
      },
    ],
  },
];

export const NAS_SUB_COMMAND_HELP_INFO = {
  download: DOWNLOADHELP,
  upload: UPLOADHELP,
  command: COMMANDHELP,
  // fc 组件不推的几个指令，但是支持
  remove: [],
  deploy: [],
  ls: [],
  cp: [],
  rm: [],
};

export const INVOKE_HELP_INFO = [
  {
    header: 'Invoke',
    content: 'Invoke/trigger online functions.',
  },
  {
    header: 'Usage',
    content: '$ s invoke <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'invocation-type',
        description: 'Invocation type: optional value "async"|"sync", default value "sync" (default: "sync")',
        alias: 't',
        type: String,
      },
      {
        name: 'event',
        description: 'Event data (strings) passed to the function during invocation (default: "").Http function format refers to [https://github.com/devsapp/fc-remote-invoke#特别说明]',
        alias: 'e',
        type: String,
      },
      {
        name: 'event-file',
        description: 'Event funtion: A file containing event data passed to the function during invoke. Http function: A file containing http request options sent to http trigger. Format refers to [https://github.com/devsapp/fc-remote-invoke#特别说明]',
        alias: 'f',
        type: String,
      },
      {
        name: 'event-stdin',
        description: 'Read from standard input, to support script pipeline.Http function format refers to [https://github.com/devsapp/fc-remote-invoke#特别说明]',
        alias: 's',
        type: Boolean,
      },
      {
        name: 'region',
        description: 'Specify region in cli mode',
        type: String,
      },
      {
        name: 'service-name',
        description: 'Specify service name in cli mode',
        type: String,
      },
      {
        name: 'function-name',
        description: 'Specify function name in cli mode',
        type: String,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: [
      {
        name: 'access',
        description: 'Specify key alias.',
        alias: 'a',
        type: Boolean,
      },
      {
        name: 'help',
        description: 'fc-remote-invoke help for command.',
        alias: 'h',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s invoke',
      '$ s <ProjectName> invoke',
      '$ s exec -- invoke --invocation-type sync --event <payload>',
      '$ s exec -- invoke --event-file <file-path>',
      '$ s exec -- invoke --event-stdin',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      {
        example: '$ s cli fc invoke --region cn-hangzhou --service-name myService --function-name myFunction --event <payload>',
      },
      {
        example: '$ s cli fc invoke --region cn-hangzhou --service-name myService --function-name myFunction --event-file <file-path>',
      },
      {
        example: '$ s cli fc invoke --region cn-hangzhou --service-name myService --function-name myFunction --event-stdin',
      },
      {
        example: '\nYou also can refer to the usage of fc-api and execute [s cli fc-api -h] for help.   $ s cli fc-api invokeFunction -h',
      },
    ],
  },
];

export const LOCAL_INVOKE_HELP_INFO = [
  {
    header: 'Local Invoke',
    content: 'Local invoke fc event function',
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
        typeLabel: '{underline <event>}',
        description: 'Support Event data(strings) or a file containing event data passed to the function during invocation.',
        alias: 'e',
        type: String,
      },
      {
        name: 'event-file',
        typeLabel: '{underline <path>}',
        description: 'A file containing event data passed to the function during invoke.',
        alias: 'f',
        type: String,
      },
      {
        name: 'event-stdin',
        description: 'Read from standard input, to support script pipeline.',
        alias: 's',
        type: Boolean,
      },
      {
        name: 'mode',
        typeLabel: '{underline <mode>}',
        description: `Invoke mode, including api, server and normal:
          - api: start api server for invokeFunction api invoking.
          - server: start server container for invoking function in the other terminal repeatedly.
          - normal: default mode, invoke event function and then close the container.`,
        alias: 'm',
        type: String,
      },
      {
        name: 'config',
        typeLabel: '{underline ide/debugger}',
        description: 'Select which IDE to use when debugging and output related debug config tips for the IDE. Options：\'vscode\', \'pycharm\'.',
        alias: 'c',
        type: String,
      },
      {
        name: 'debug-port',
        typeLabel: '{underline <port>}',
        description: 'Specify the sandboxed container starting in debug mode, and exposing this port on localhos.',
        alias: 'd',
        type: Number,
      },
      {
        name: 'debug-args',
        typeLabel: '{underline <debugArgs>}',
        description: 'Additional parameters that will be passed to the debugger',
        type: String,
      },
      {
        name: 'debugger-path',
        typeLabel: '{underline <debuggerPath>}',
        description: 'The path of the debugger on the host',
        type: String,
      },
      {
        name: 'tmp-dir',
        typeLabel: '{underline <tmpDir>}',
        description: 'The temp directory mounted to /tmp , default to \'./.s/tmp/invoke/serviceName/functionName/\'',
        type: String,
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
      '$ s {bold local invoke} [{bold --debug-port} {underline 9000}] [{bold --config} {underline vscode}]',
      '$ s exec -- {bold local invoke} [{bold --debug-port} {underline 9000}] [{bold --config} {underline vscode}]',
    ],
  },
];

export const LOCAL_START_HELP_INFO = [
  {
    header: 'Local Start',
    content: 'Local invoke fc http function',
  },
  {
    header: 'Usage for',
    content: '$ s local start <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'config',
        typeLabel: '{underline ide/debugger}',
        description: 'Select which IDE to use when debugging and output related debug config tips for the IDE. Options：\'vscode\', \'pycharm\'.',
        alias: 'c',
        type: String,
      },
      {
        name: 'debug-port',
        typeLabel: '{underline <port>}',
        description: 'Specify the sandboxed container starting in debug mode, and exposing this port on localhos.',
        alias: 'd',
        type: Number,
      },
      {
        name: 'debug-args',
        typeLabel: '{underline <debugArgs>}',
        description: 'Additional parameters that will be passed to the debugger',
        type: String,
      },
      {
        name: 'debugger-path',
        typeLabel: '{underline <debuggerPath>}',
        description: 'The path of the debugger on the host',
        type: String,
      },
      {
        name: 'tmp-dir',
        typeLabel: '{underline <tmpDir>}',
        description: 'The temp directory mounted to /tmp , default to \'./.s/tmp/invoke/serviceName/functionName/\'',
        type: String,
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
      '$ s exec -- {bold local start} [{bold --debug-port} {underline 9000}] [{bold --config} {underline vscode}]',
    ],
  },
];

export const BUILD_HELP_INFO = [
  {
    header: 'Build',
    content: 'Build the dependencies.',
  },
  {
    header: 'Usage',
    content: [
      { example: '$ s exec -- build <option>' },
    ],
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'dockerfile',
        description: 'Specify the dockerfile path',
        alias: 'f',
        defaultOption: false,
        type: String,
      },
      {
        name: 'use-docker',
        description: 'Use docker container to build functions',
        alias: 'd',
        defaultOption: false,
        type: String,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: [
      {
        name: 'help',
        description: 'Build help for command',
        alias: 'h',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Examples with Yaml',
    content: [
      {
        example: '$ s build --use-docker',
      },
      {
        example: '$ s <ProjectName> build',
      },
      {
        example: '$ s build --use-docker ',
      },
      {
        example: '$ s exec -- build',
      },
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      {
        example: '$ s cli fc build --use-docker ',
      },
    ],
  },
];

export const STRESS_HTLP_INFO = [
  {
    header: 'Stress',
    content: 'Stress test for the serverless application.',
  },
  {
    header: 'Usage',
    content: '$ s stress <sub-command>',
  },
  {
    header: 'SubCommand List',
    content: [
      { name: 'start', summary: 'Start stress test, you can get help through [s stress start -h]' },
      { name: 'clean', summary: 'Clean the relevant resources , you can get help through [s stress clean -h]' },
    ],
  },
];

const STRESS_START_HELP_INFO = [
  {
    header: 'Start',
    content: 'Start stress test',
  },
  {
    header: 'Usage',
    content: '$ s stress start <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'num-user',
        typeLabel: '{underline numUser}',
        description: 'Number of the simulated users.',
        type: Number,
      },
      {
        name: 'spawn-rate',
        typeLabel: '{underline spawnRate}',
        description: 'Increasing number of users per second.',
        type: Number,
      },
      {
        name: 'run-time',
        typeLabel: '{underline time}',
        description: 'Intervals for stress.',
        type: Number,
      },
      {
        name: 'function-type',
        typeLabel: '{underline functionType}',
        description: 'Type of the target function, including event and http.',
        type: String,
      },
      {
        name: 'service-name',
        typeLabel: '{underline serviceName}',
        description: 'Target service, only for --function-type event.',
        type: String,
      },
      {
        name: 'function-name',
        typeLabel: '{underline functionName}',
        description: 'Target function, only for --function-type event.',
        type: String,
      },
      {
        name: 'qualifier',
        typeLabel: '{underline qualifier}',
        description: 'Qualifier of the target function, only for --function-type event.',
        alias: 'q',
        type: String,
      },
      {
        name: 'url',
        typeLabel: '{underline url}',
        description: 'Target url, only for --function-type http.',
        alias: 'u',
        type: String,
      },
      {
        name: 'method',
        typeLabel: '{underline method}',
        description: 'Target method, only for --function-type http.',
        alias: 'm',
        type: String,
      },
      {
        name: 'payload',
        typeLabel: '{underline payload}',
        description: 'For --function-type event, represents the event passed to the function;\nFor --function-type http, represents the request body passed to the function.',
        alias: 'p',
        type: String,
      },
      {
        name: 'payload-file',
        typeLabel: '{underline path}',
        description: 'For --function-type event, contains the event passed to the function;\nFor --function-type http, contains the request body passed to the function.',
        alias: 'f',
        type: String,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: [
      {
        name: 'region',
        typeLabel: '{underline region}',
        description: 'Target region.',
        alias: 'r',
        type: String,
      },
      {
        name: 'access',
        typeLabel: '{underline access}',
        description: 'Specify key alias.',
        alias: 'a',
        type: String,
      },
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
      '$ s stress start --payload-file ./payload.file',
      '$ s stress start --num-user 6 --spawn-rate 10 --run-time 30 --url myUrl --method POST --payload "hello world"',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc stress start --num-user 6 --spawn-rate 10 --run-time 30 --function-type event --service-name myService --function-name myFunction --qualifier myQualifier --payload "hello world" --region myRegion --access myAccess',
      '$ s cli fc stress start --num-user 6 --spawn-rate 10 --run-time 30 --function-type http --url myUrl --method POST --payload "hello world" --region myRegion --access myAccess',
    ],
  },
];

const STRESS_CLEAN_HELP_INFO = [
  {
    header: 'Clean',
    content: 'Clean the relevant resources',
  },
  {
    header: 'Usage',
    content: '$ s stress clean <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'assume-yes',
        description: 'Number of the simulated users.',
        alias: 'y',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: [
      {
        name: 'region',
        typeLabel: '{underline region}',
        description: 'Target region.',
        alias: 'r',
        type: String,
      },
      {
        name: 'access',
        typeLabel: '{underline access}',
        description: 'Specify key alias.',
        alias: 'a',
        type: String,
      },
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
      '$ s stress clean -y',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc stress clean --region myRegion --access myAccess -y',
    ],
  },
];

export const STRESS_SUB_COMMAND_HELP_INFO = {
  start: STRESS_START_HELP_INFO,
  clean: STRESS_CLEAN_HELP_INFO,
};
