import { globalParams, globalDescribe } from './constant';

export const ENV_HELP_INFO = [
  {
    header: 'Env',
    content: 'Environments provisioned infrastructures that can be shared between services.',
  },
  {
    header: 'Usage',
    content: '$ s env <command> <options>',
  },
  {
    header: 'Command List',
    content: [
      { name: 'init', summary: 'Create a new environment.' },
      { name: 'deploy', summary: 'Deploy an environment associated with templates.' },
      { name: 'info', summary: 'Show the information of a environment.' },
      { name: 'remove', summary: 'Destroy an environment and all the resources provisioned by templates.' },
    ],
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'name',
        alias: 'n',
        typeLabel: '{underline <name>}',
        description: 'Specify the environment name',
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s {bold env} {bold init} {underline --filename test.yaml}',
      '$ s {bold env} {bold deploy} {underline --name testing}',
      '$ s {bold env} {bold remove} {underline --name testing}',
      '$ s {bold env} {bold info} {underline --name testing}',
    ],
  },
];
