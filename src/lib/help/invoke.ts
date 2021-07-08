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
