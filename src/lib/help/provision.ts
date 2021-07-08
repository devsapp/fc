export const PROVISION = [
  {
    header: 'Provision',
    content: 'Resource reservation operation',
  },
  {
    header: 'Usage',
    content: '$ s provision <sub-command>',
  },
  {
    header: 'SubCommand',
    content: [
      {
        desc: 'list',
        example: 'View the list of resource reservation, you can get help through [s provision list -h]',
      },
      {
        desc: 'put',
        example: 'Put resource reservation, you can get help through [s provision put -h]',
      },
      {
        desc: 'get',
        example: 'Get resource reservation, you can get help through [s provision get -h]',
      },
    ],
  },
];

export const PROVISION_LIST = [
  {
    header: 'provision list',
    content: 'View the list of provision',
  },
  {
    header: 'Usage',
    content: '$ s provision list',
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
      '$ s provision list',
      '$ s exec -- provision list',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc provision list --region cn-hangzhou --service-name name',
    ],
  },
];

export const PROVISION_PUT = [
  {
    header: 'provision put',
    content: 'Set reserved configuration',
  },
  {
    header: 'Usage',
    content: '$ s provision put',
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
        name: 'target',
        description: 'Specify the provision target parameter',
        type: Number,
      },
      {
        name: 'config',
        description: 'Specify the configuration path parameter',
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
      '$ s provision put --target 1 --qualifier alias',
      '$ s provision put --config ./provision.json --qualifier alias',
      '$ s exec -- provision put --target 1 --qualifier alias',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc provision put --region cn-hangzhou --service-name name --function-name name --qualifier alias --target 1',
      '$ s cli fc provision put --region cn-hangzhou --service-name name --function-name name --qualifier alias --config ./provision.json',
    ],
  },
];

export const PROVISION_GET = [
  {
    header: 'provision get',
    content: 'Get provision configuration',
  },
  {
    header: 'Usage',
    content: '$ s provision get',
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
      '$ s provision get --qualifier alias',
      '$ s exec -- provision get --qualifier alias',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc provision get --region cn-hangzhou --service-name name --function-name name --qualifier alias',
    ],
  },
];
