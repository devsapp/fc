import { globalParams, globalDescribe } from './constant';

export const ENV_HELP_INFO = [
  {
    header: 'Env',
    content: 'Environments provisioned infrastructures that can be shared between services.',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/env.md',
  },
  {
    header: 'Usage',
    content: '$ s env <sub-command> <options>',
  },
  {
    header: 'SubCommand List',
    content: [
      { name: 'init', summary: 'Create a new environment.' },
      { name: 'deploy', summary: 'Deploy an environment associated with templates.' },
      { name: 'info', summary: 'Show the information of a environment.' },
      { name: 'list', summary: 'List all environments associated with specified aliyun account.' },
      // { name: 'remove', summary: 'Destroy an environment and all the resources provisioned by templates.' },
    ],
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'name',
        alias: 'n',
        typeLabel: '{underline <name>}',
        description: 'Specify the environment name.',
      },
      {
        name: 'filename',
        alias: 'f',
        typeLabel: '{underline <filename>}',
        description: 'Specify an environment manifest when using `s env init`.',
      },
      {
        name: 'overwrite',
        alias: 'o',
        type: Boolean,
        description: 'Overwrite the environment manifest in local when using `s env init`.',
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
      '$ s {bold env} {bold info} {underline --name testing}',
      '$ s {bold env} {bold list}',
    ],
  },
];
