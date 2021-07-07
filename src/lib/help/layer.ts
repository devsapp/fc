const PUBLISH = [
  {
    header: 'layer publish',
    content: 'New layer version',
  },
  {
    header: 'Usage',
    content: '$ s layer publish <options>',
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
        name: 'layer-name',
        description: 'Specify the layer name parameter',
        type: String,
      },
      {
        name: 'code',
        description: 'Specify the code parameter',
        type: String,
      },
      {
        name: 'description',
        description: 'Specify the description parameter',
        type: String,
      },
      {
        name: 'compatible-runtime',
        // alias: 'rt',
        description: 'Specify the compatibleRuntime parameter',
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
      '$ s layer publish --layer-name testName --code ./src',
      '$ s exec -- layer publish --layer-name testName --code ./src',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc layer publish --region cn-hangzhou --layer-name testName --code ./src --compatible-runtime nodejs12,nodejs10,python3',
    ],
  },
];

const LIST = [
  {
    header: 'layer list',
    content: 'Get layer list',
  },
  {
    header: 'Usage',
    content: '$ s layer list <options>',
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
        name: 'prefix',
        description: 'Specify the prefix parameter',
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
      '$ s layer list',
      '$ s exec -- layer list',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc layer list --region cn-hangzhou --prefix test',
    ],
  },
];

const VERSION_CONFIG = [
  {
    header: 'layer versionConfig',
    content: 'Get layer versionConfig',
  },
  {
    header: 'Usage',
    content: '$ s versionConfig <options>',
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
        name: 'layer-name',
        description: 'Specify the layer name parameter',
        type: String,
      },
      {
        name: 'version',
        description: 'Specify the version parameter',
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
      '$ s layer versionConfig --layer-name name --version 1',
      '$ s exec -- layer versionConfig --layer-name name --version 1',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc layer versionConfig --region cn-hangzhou --layer-name name --version 1',
    ],
  },
];

const DELETE_VERSION = [
  {
    header: 'layer deleteVersion',
    content: 'Delete layer version',
  },
  {
    header: 'Usage',
    content: '$ s layer deleteVersion <options>',
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
        name: 'layer-name',
        description: 'Specify the layer name parameter',
        type: String,
      },
      {
        name: 'version',
        description: 'Specify the version parameter',
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
      '$ s layer deleteVersion --layer-name name --version 1',
      '$ s exec -- layer deleteVersion --layer-name name --version 1',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc layer deleteVersion --region cn-hangzhou --layer-name name --version 1',
    ],
  },
];

const DELETE_LAYER = [
  {
    header: 'layer deleteLayer',
    content: 'Delete layer all version',
  },
  {
    header: 'Usage',
    content: '$ s layer deleteLayer <options>',
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
        name: 'layer-name',
        description: 'Specify the layer name parameter',
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
      '$ s layer deleteLayer --layer-name name',
      '$ s exec -- layer deleteLayer --layer-name name',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc layer deleteLayer --region cn-hangzhou --layer-name name',
    ],
  },
];

const VERSIONS = [
  {
    header: 'layer versions',
    content: 'Get layer versions',
  },
  {
    header: 'Usage',
    content: '$ s layer versions <options>',
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
        name: 'layer-name',
        description: 'Specify the layer name parameter',
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
      '$ s layer versions --layer-name name',
      '$ s exec -- layer versions --layer-name name',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc layer versions --region cn-hangzhou --layer-name name',
    ],
  },
];


export const LAYER = [
  {
    header: 'Layer',
    content: 'Resource layer operation',
  },
  {
    header: 'Usage',
    content: '$ s layer <sub-command>',
  },
  {
    header: 'SubCommand',
    content: [
      {
        desc: 'publish',
        example: 'New layer version, you can get help through [s layer publish -h]',
      },
      {
        desc: 'list',
        example: 'Get layer list, you can get help through [s layer list -h]',
      },
      {
        desc: 'versionConfig',
        example: 'Get layer versionConfig, you can get help through [s layer versionConfig -h]',
      },
      {
        desc: 'versions',
        example: 'Get layer versions, you can get help through [s layer versions -h]',
      },
      {
        desc: 'deleteVersion',
        example: 'Delete layer version, you can get help through [s layer deleteVersion -h]',
      },
      {
        desc: 'deleteLayer',
        example: 'Delete layer all version, you can get help through [s layer deleteLayer -h]',
      },
    ],
  },
];

export const LAYER_COMMAND = {
  publish: PUBLISH,
  list: LIST,
  versionConfig: VERSION_CONFIG,
  versions: VERSIONS,
  deleteVersion: DELETE_VERSION,
  deleteLayer: DELETE_LAYER,
};
