export const DEPLOY = [
  {
    header: 'Deploy',
    content: 'The ability to deploy resources\nExecuting `s deploy` is equivalent to `s deploy all`',
  },
  {
    header: 'Usage',
    content: '$ s deploy <sub-command>',
  },
  {
    header: 'SubCommand List',
    content: [
      {
        desc: 'all',
        example: 'Deploy all resources, you can get help through [s deploy all -h]',
      },
      {
        desc: 'service',
        example: 'Only deploy service resources, you can get help through [s deploy service -h]',
      },
      {
        desc: 'function',
        example: 'Only deploy function resources, you can get help through [s deploy function -h]',
      },
      {
        desc: 'trigger',
        example: 'Only deploy trigger resources, you can get help through [s deploy trigger -h]',
      },
      {
        desc: 'domain',
        example: 'Only deploy domain resources, you can get help through [s deploy domain -h]',
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

export const DEPLOY_ALL = [
  {
    header: 'Deploy all',
    content: 'Deploy all resources',
  },
  {
    header: 'Usage',
    content: '$ s deploy all <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'type',
        description: 'Only deploy configuration or code. Value: code, config',
        type: Boolean,
      },
      {
        name: 'use-local',
        description: 'Deploy resource using local config',
        type: Boolean,
      },
      {
        name: 'assume-yes',
        description: 'Assume that the answer to any question which would be asked is yes',
        alias: 'y',
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
      '$ s deploy all',
      '$ s deploy all --use-local',
    ],
  },
];

export const DEPLOY_SERVICE = [
  {
    header: 'Deploy service',
    content: 'Only deploy service resources',
  },
  {
    header: 'Usage',
    content: '$ s deploy service <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'use-local',
        description: 'Deploy resource using local config',
        type: Boolean,
      },
      {
        name: 'assume-yes',
        description: 'Assume that the answer to any question which would be asked is yes',
        alias: 'y',
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
      '$ s deploy service',
      '$ s deploy service --use-local',
    ],
  },
];

export const DEPLOY_FUNCTION = [
  {
    header: 'Deploy function',
    content: 'Only deploy function resources',
  },
  {
    header: 'Usage',
    content: '$ s deploy function <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'type',
        description: 'Only deploy configuration or code Value: code, config',
        type: Boolean,
      },
      {
        name: 'use-local',
        description: 'Deploy resource using local config',
        type: Boolean,
      },
      {
        name: 'assume-yes',
        description: 'Assume that the answer to any question which would be asked is yes',
        alias: 'y',
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
      '$ s deploy function',
      '$ s deploy function --use-local',
    ],
  },
];

export const DEPLOY_TRIGGER = [
  {
    header: 'Deploy trigger',
    content: 'Only deploy trigger resources',
  },
  {
    header: 'Usage',
    content: '$ s deploy trigger <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'trigger-name',
        description: 'Only deploy the specified trigger',
        type: Boolean,
      },
      {
        name: 'use-local',
        description: 'Deploy resource using local config',
        type: Boolean,
      },
      {
        name: 'assume-yes',
        description: 'Assume that the answer to any question which would be asked is yes',
        alias: 'y',
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
      '$ s deploy trigger',
      '$ s deploy trigger --use-local',
    ],
  },
];

export const DEPLOY_DOMAIN = [
  {
    header: 'Deploy domain',
    content: 'Only deploy domain resources',
  },
  {
    header: 'Usage',
    content: '$ s deploy domain <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'use-local',
        description: 'Deploy resource using local config',
        type: Boolean,
      },
      {
        name: 'assume-yes',
        description: 'Assume that the answer to any question which would be asked is yes',
        alias: 'y',
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
      '$ s deploy domain',
    ],
  },
];
