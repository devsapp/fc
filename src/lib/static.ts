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
    header: 'local',
    content: 'You can use the subcommand to local invoke your serverless application.',
  },
  {
    header: 'Usage',
    content: '$ s local <command> <options>',
  },
  {
    header: 'Command List',
    content: [
      { name: 'invoke', summary: 'Invoke alicloud fc event function locally.' },
      { name: 'start', summary: 'Invoke alicloud fc http function locally.' },
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
      '$ s local {bold invoke} {bold --help}',
      '$ s local {bold start} {bold --help}',
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
        description: 'Specify region in cli mode',
        defaultOption: false,
        type: String,
      },
      {
        name: 'service-name',
        description: 'Specify service name in cli mode',
        defaultOption: false,
        type: String,
      },
      {
        name: 'function-name',
        description: 'Specify function name in cli mode',
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
}