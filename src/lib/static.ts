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
    content: 'You can use the subcommand to local invoke your serverless application..',
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
