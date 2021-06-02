export const COMPONENT_HELP_INFO = [
  {
    header: 'fc component',
    content: 'You can use the component to manager and develop your alicloud function computer resources.',
  },
  {
    header: 'Synopsis',
    content: '$ s <command> <options>',
  },
  {
    header: 'Command List',
    content: [
      { name: 'help', summary: 'Display help information.' },
      { name: 'deploy', summary: 'Deploy alicloud function computer resources.' },
      { name: 'remove', summary: 'Remove alicloud function computer resources.' },
      { name: 'local', summary: 'Local debug alicloud function.' },
      { name: 'info', summary: 'Get information of alicloud function computer resources.' },
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
    header: 'Examples',
    content: [
      '$ fc {bold deploy} --help',
      '$ fc {bold remove} --help',
      '$ fc {bold help}',
    ],
  },
];
