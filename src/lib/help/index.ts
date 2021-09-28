export * from './build';
export * from './local';
export * from './nas';

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
      { name: 'version', summary: 'Service version operation' },
      { name: 'alias', summary: 'Service alias operation' },
      { name: 'provision', summary: 'Resource reservation operation' },
      { name: 'onDemand', summary: 'Resource OnDemand operation' },
      { name: 'layer', summary: 'Resource layer operation' },
      { name: 'remote', summary: 'Remote invoke via proxied service' },
      { name: 'proxied', summary: 'Local invoke via proxied service.' },
      { name: 'stress', summary: 'Stress test for the serverless application' },
      { name: 'eval', summary: 'Eval test for the serverless application' },
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
