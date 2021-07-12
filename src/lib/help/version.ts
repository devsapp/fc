export const VERSION = [
  {
    header: 'Version',
    content: 'service version operation',
  },
  {
    header: 'Usage',
    content: '$ s version <sub-command>',
  },
  {
    header: 'SubCommand',
    content: [
      {
        desc: 'list',
        example: 'View the list of service versions, you can get help through [s version list -h]',
      },
      {
        desc: 'publish',
        example: 'Publish service version, you can get help through [s version publish -h]',
      },
      {
        desc: 'delete',
        example: 'Delete service version, you can get help through [s version delete -h]',
      },
    ],
  },
];

export const VERSION_LIST = [
  {
    header: 'version list',
    content: 'View the list of service versions',
  },
  {
    header: 'Usage',
    content: '$ s version list',
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
      '$ s version list',
      '$ s exec -- version list',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc version list --region cn-hangzhou --service-name name',
    ],
  },
];

export const VERSION_PUBLISH = [
  {
    header: 'version publish',
    content: 'Publish service version',
  },
  {
    header: 'Usage',
    content: '$ s version publish',
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
        name: 'description',
        description: 'Specify the description parameter',
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
      '$ s version publish --description xxx',
      '$ s exec -- version publish --description xxx',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc version publish --region cn-hangzhou --service-name name --description xxx',
    ],
  },
];

export const VERSION_DELETE = [
  {
    header: 'version delete',
    content: 'Delete service version',
  },
  {
    header: 'Usage',
    content: '$ s version delete',
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
        name: 'version',
        description: 'Specify the version parameter',
        alias: '-id',
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
      '$ s version delete --id xxx',
      '$ s exec -- version delete --version xxx',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc version delete --region cn-hangzhou --service-name name --version xxx',
    ],
  },
];

export const VERSION_DELETEALL = [
  {
    header: 'version deleteAll',
    content: 'Delete service all version',
  },
  {
    header: 'Usage',
    content: '$ s version deleteAll',
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
    ],
  },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s version deleteAll',
      '$ s exec -- version deleteAll',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc version deleteAll --region cn-hangzhou --service-name name',
    ],
  },
];
