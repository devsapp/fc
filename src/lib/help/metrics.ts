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
