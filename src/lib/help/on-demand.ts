export const ONDEMAND = [
  {
    header: 'OnDemand',
    content: 'Resource OnDemand operation',
  },
  {
    header: 'Usage',
    content: '$ s onDemand <sub-command>',
  },
  {
    header: 'SubCommand',
    content: [
      {
        desc: 'list',
        example: 'View the list of resource on-demand, you can get help through [s onDemand list -h]',
      },
      {
        desc: 'put',
        example: 'Put resource on-demand, you can get help through [s onDemand get -h]',
      },
      {
        desc: 'get',
        example: 'Get resource on-demand, you can get help through [s onDemand get -h]',
      },
      {
        desc: 'delete',
        example: 'Delete resource on-demand, you can get help through [s onDemand get -h]',
      },
    ],
  },
];

export const ONDEMAND_LIST = [
  {
    header: 'onDemand list',
    content: 'View the list of onDemand',
  },
  {
    header: 'Usage',
    content: '$ s onDemand list',
  },
  {
    header: 'Command List',
    optionList: [
      {
        name: 'region',
        description: 'Specify the region parameter',
        type: String,
      },
      {
        name: 'service-name',
        description: 'Specify the service name parameter',
        type: String,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: [
      {
        name: 'access',
        description: 'Specify key alias',
        alias: 'a',
        type: Boolean,
      },
      {
        name: 'help',
        description: 'Display help for command',
        alias: 'h',
        type: Boolean,
      },
      {
        name: 'table',
        description: 'Table format output',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s onDemand list',
      '$ s exec -- onDemand list',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc onDemand list --region cn-hangzhou --service-name name',
    ],
  },
];

export const ONDEMAND_PUT = [
  {
    header: 'onDemand put',
    content: 'Set reserved configuration',
  },
  {
    header: 'Usage',
    content: '$ s onDemand put',
  },
  {
    header: 'Command List',
    optionList: [
      {
        name: 'region',
        description: 'Specify the region parameter',
        type: String,
      },
      {
        name: 'service-name',
        description: 'Specify the service name parameter',
        type: String,
      },
      {
        name: 'qualifier',
        description: 'Specify the qualifier parameter. Only supports LATEST and alias',
        type: String,
      },
      {
        name: 'maximum-instance-count',
        description: 'Specify the maximumInstanceCount parameter',
        alias: '-max',
        type: Number,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: [
      {
        name: 'access',
        description: 'Specify key alias',
        alias: 'a',
        type: Boolean,
      },
      {
        name: 'help',
        description: 'Display help for command',
        alias: 'h',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s onDemand put --qualifier pre --max 1',
      '$ s onDemand put --qualifier pre --maximum-instance-count 1',
      '$ s exec -- onDemand put --qualifier pre --max 1',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc onDemand put --region cn-hangzhou --service-name name --function-name name --qualifier pre --max 1',
    ],
  },
];

export const ONDEMAND_GET = [
  {
    header: 'onDemand get',
    content: 'Get onDemand configuration',
  },
  {
    header: 'Usage',
    content: '$ s onDemand get',
  },
  {
    header: 'Command List',
    optionList: [
      {
        name: 'region',
        description: 'Specify the region parameter',
        type: String,
      },
      {
        name: 'service-name',
        description: 'Specify the service name parameter',
        type: String,
      },
      {
        name: 'qualifier',
        description: 'Specify the qualifier parameter. Only supports LATEST and alias',
        type: String,
      },
      {
        name: 'function-name',
        description: 'Specify the function name parameter',
        type: String,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: [
      {
        name: 'access',
        description: 'Specify key alias',
        alias: 'a',
        type: Boolean,
      },
      {
        name: 'help',
        description: 'Display help for command',
        alias: 'h',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s onDemand get --qualifier pre',
      '$ s exec -- onDemand get --qualifier pre',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc onDemand get --region cn-hangzhou --service-name name --function-name name --qualifier pre',
    ],
  },
];

export const ONDEMAND_DELETE = [
  {
    header: 'onDemand delete',
    content: 'Delete onDemand configuration',
  },
  {
    header: 'Usage',
    content: '$ s onDemand delete',
  },
  {
    header: 'Command List',
    optionList: [
      {
        name: 'region',
        description: 'Specify the region parameter',
        type: String,
      },
      {
        name: 'service-name',
        description: 'Specify the service name parameter',
        type: String,
      },
      {
        name: 'qualifier',
        description: 'Specify the qualifier parameter. Only supports LATEST and alias',
        type: String,
      },
      {
        name: 'function-name',
        description: 'Specify the function name parameter',
        type: String,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: [
      {
        name: 'access',
        description: 'Specify key alias',
        alias: 'a',
        type: Boolean,
      },
      {
        name: 'help',
        description: 'Display help for command',
        alias: 'h',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s onDemand delete --qualifier pre',
      '$ s exec -- onDemand delete --qualifier pre',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc onDemand delete --region cn-hangzhou --service-name name --function-name name --qualifier pre',
    ],
  },
];
