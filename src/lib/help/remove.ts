export const REMOVE = [
  {
    header: 'Remove',
    content: 'The ability to delete resources.\nIf executing s remove is equivalent to s remove service',
  },
  {
    header: 'Usage',
    content: '$ s remove <sub-command>',
  },
  {
    header: 'SubCommand List',
    content: [
      {
        desc: 'service',
        example: 'Ability to delete services, you can get help through [s remove service -h]',
      },
      {
        desc: 'function',
        example: 'Ability to delete function, you can get help through [s remove function -h]',
      },
      {
        desc: 'trigger',
        example: 'Ability to delete trigger, you can get help through [s remove trigger -h]',
      },
      {
        desc: 'domain',
        example: 'Ability to delete domain, you can get help through [s remove domain -h]',
      },
      {
        desc: 'version',
        example: 'Ability to delete version, you can get help through [s remove version -h]',
      },
      {
        desc: 'alias',
        example: 'Ability to delete alias, you can get help through [s remove alias -h]',
      },
      {
        desc: 'provision',
        example: 'Ability to delete provision, you can get help through [s remove provision -h]',
      },
      {
        desc: 'ondemand',
        example: 'Ability to delete ondemand, you can get help through [s remove ondemand -h]',
      },
      {
        desc: 'layer',
        example: 'Ability to delete layer, you can get help through [s remove layer -h]',
      },
    ],
  },
];

const GLOBAL_OPTIONS = [
  {
    name: 'help',
    description: 'Help for command',
    alias: 'h',
    type: Boolean,
  },
  {
    name: 'access',
    description: 'Specify key alias',
    alias: 'a',
    type: String,
  },
  {
    name: 'debug',
    description: 'Output debug informations',
    type: Boolean,
  },
];

export const REMOVE_SERVICE = [
  {
    header: 'Remove service',
    content: 'Remove the specified service resource',
  },
  {
    header: 'Usage',
    content: '$ s remove service <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'region',
        description: 'Specify the region of alicloud',
        type: String,
      },
      {
        name: 'service-name',
        description: 'Specify the service name of alicloud',
        type: String,
      },
      {
        name: 'use-local',
        description: 'Only delete the incoming service, function, and trigger configuration. Priority is greater than --assume-yes',
        type: Boolean,
      },
      {
        name: 'assume-yes',
        alias: 'y',
        description: 'Forcibly delete all resources under the service, including on-demand resources, provision resources, alias, version, trigger and function. please use with caution',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: GLOBAL_OPTIONS,
  },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s remove service',
      '$ s remove service --use-local',
    ],
  },
];

export const REMOVE_FUNCTION = [
  {
    header: 'Remove function',
    content: 'Remove the specified function resource',
  },
  {
    header: 'Usage',
    content: '$ s remove function <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'region',
        description: 'Specify the region of alicloud',
        type: String,
      },
      {
        name: 'service-name',
        description: 'Specify the service name of alicloud',
        type: String,
      },
      {
        name: 'function-name',
        description: 'Specify the function name of alicloud',
        type: String,
      },
      {
        name: 'use-local',
        description: 'Only delete the incoming function and trigger configuration. Priority is greater than --assume-yes',
        type: Boolean,
      },
      {
        name: 'assume-yes',
        alias: 'y',
        description: 'Assume that the answer to any question which would be asked is yes',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: GLOBAL_OPTIONS,
  },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s remove function',
      '$ s remove function --use-local',
    ],
  },
];

export const REMOVE_TRIGGER = [
  {
    header: 'Remove trigger',
    content: 'Remove the specified trigger resource',
  },
  {
    header: 'Usage',
    content: '$ s remove trigger <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'region',
        description: 'Specify the region of alicloud',
        type: String,
      },
      {
        name: 'service-name',
        description: 'Specify the service name of alicloud',
        type: String,
      },
      {
        name: 'function-name',
        description: 'Specify the function name of alicloud',
        type: String,
      },
      {
        name: 'trigger-name',
        description: 'Only delete the specified trigger, if not specified, delete all incoming triggers',
        type: String,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: GLOBAL_OPTIONS,
  },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s remove trigger',
      '$ s remove trigger --trigger-name triggerName',
    ],
  },
];

export const REMOVE_DOMAIN = [
  {
    header: 'Remove domain',
    content: 'Remove the specified domain resource',
  },
  {
    header: 'Usage',
    content: '$ s remove domain',
  },
  {
    header: 'Global Options',
    optionList: GLOBAL_OPTIONS,
  },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s remove domain',
    ],
  },
];

export const REMOVE_VERSION = [
  {
    header: 'Remove version',
    content: 'Remove the specified version resource',
  },
  {
    header: 'Usage',
    content: '$ s remove version <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'region',
        description: 'Specify the region of alicloud',
        type: String,
      },
      {
        name: 'service-name',
        description: 'Specify the service name of alicloud',
        type: String,
      },
      {
        name: 'version',
        description: 'If you specify a version, only delete the specified version; if you don’t specify it, try to delete all versions',
        type: String,
      },
      {
        name: 'assume-yes',
        alias: 'y',
        description: 'Assume that the answer to any question which would be asked is yes',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: GLOBAL_OPTIONS,
  },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s remove version',
      '$ s remove version --version-id xxx',
    ],
  },
];

export const REMOVE_ALIAS = [
  {
    header: 'Remove alias',
    content: 'Remove the specified alias resource',
  },
  {
    header: 'Usage',
    content: '$ s remove alias <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'region',
        description: 'Specify the region of alicloud',
        type: String,
      },
      {
        name: 'service-name',
        description: 'Specify the service name of alicloud',
        type: String,
      },
      {
        name: 'alias-name',
        description: 'If you specify a aliasName, only delete the specified alias; if you don’t specify it, try to delete all alias',
        type: String,
      },
      {
        name: 'assume-yes',
        alias: 'y',
        description: 'Assume that the answer to any question which would be asked is yes',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: GLOBAL_OPTIONS,
  },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s remove alias',
      '$ s remove alias --alias-name xxx',
    ],
  },
];

export const REMOVE_PROVISION = [
  {
    header: 'Remove provision',
    content: 'Remove the specified provision resource',
  },
  {
    header: 'Usage',
    content: '$ s remove provision <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'region',
        description: 'Specify the region of alicloud',
        type: String,
      },
      {
        name: 'service-name',
        description: 'Specify the service name of alicloud',
        type: String,
      },
      {
        name: 'qualifier',
        description: 'If qualifier is specified, only all provision resources under this alias will be cleared; if not specified, all versions of provision resources under this service will be cleared',
        type: String,
      },
      {
        name: 'function-name',
        description: 'Clear the provision configuration of the specified qualifier function',
        type: String,
      },
      {
        name: 'assume-yes',
        alias: 'y',
        description: 'Assume that the answer to any question which would be asked is yes',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: GLOBAL_OPTIONS,
  },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s remove provision',
      '$ s remove provision --qualifier xxx',
      '$ s remove provision --qualifier xxx --function-name xxx',
    ],
  },
];

export const REMOVE_ONDEMAND = [
  {
    header: 'Remove ondemand',
    content: 'Remove the specified ondemand resource',
  },
  {
    header: 'Usage',
    content: '$ s remove ondemand <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'region',
        description: 'Specify the region of alicloud',
        type: String,
      },
      {
        name: 'service-name',
        description: 'Specify the service name of alicloud',
        type: String,
      },
      {
        name: 'qualifier',
        description: 'If qualifier is specified, only all ondemand resources under this alias will be cleared; if not specified, all versions of ondemand resources under this service will be cleared',
        type: String,
      },
      {
        name: 'function-name',
        description: 'Clear the ondemand configuration of the specified qualifier function',
        type: String,
      },
      {
        name: 'assume-yes',
        alias: 'y',
        description: 'Assume that the answer to any question which would be asked is yes',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: GLOBAL_OPTIONS,
  },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s remove ondemand',
      '$ s remove ondemand --qualifier xxx',
      '$ s remove ondemand --qualifier xxx --function-name xxx',
    ],
  },
];

export const REMOVE_LAYER = [
  {
    header: 'Remove layer',
    content: 'Remove the specified layer resource',
  },
  {
    header: 'Usage',
    content: '$ s remove layer',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'region',
        description: 'Specify the region of alicloud',
        type: String,
      },
      {
        name: 'layer-name',
        description: 'Delete all versions of the specified layer',
        type: String,
      },
      {
        name: 'version-id',
        description: 'Only delete the version of the specified layer',
        type: String,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: GLOBAL_OPTIONS,
  },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s remove layer --layer-name xxx',
      '$ s remove layer --layer-name xxx --version-id xxx',
    ],
  },
];
