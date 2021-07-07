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
