import { globalParams, globalDescribe } from './constant';

export const ENV_HELP_INFO = [
  {
    header: 'Env',
    content: 'Environment templates claimed the infrastructure schemas and capabilities. Environments provisioned infrastructures that can be shared between services.',
  },
  {
    header: 'Document',
    content: 'https://serverless.help/t/env',
  },
  {
    header: 'Usage',
    content: '$ s env <sub-command> <options>',
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'SubCommand List',
    content: [
      { name: 'init-template', summary: 'Prepare environment template before applying.' },
      { name: 'apply-template', summary: 'Apply an environment template. Help command [s env apply-template -h]' },
      { name: 'describe-template', summary: 'Show info about an existing environment template. Help command [s env describe-template -h]' },
      { name: 'remove-template', summary: 'Remove an existing environment template, but not destroy cloud resources. Help command [s env remove-template -h]' },
      { name: 'list-templates', summary: 'List all environment templates.' },
      { name: 'init', summary: 'Create a new environment interactive. Help command [s env init -h]' },
      { name: 'deploy', summary: 'Deploy an environment associated with templates. Help command [s env deploy -h]' },
      { name: 'remove', summary: 'Destroy an environment. Help command [s env deploy -h].' },
      { name: 'info', summary: 'Show the information of a environment. Help command [s env info -h]' },
      { name: 'list', summary: 'List all environments associated with specified aliyun account.' },
    ],
  },
];

export const ENV_APPLY_TEMPLATE = [
  {
    header: 'Apply environment template',
    content: 'Create or update an environment template',
  },
  {
    header: 'Document',
    content: 'https://serverless.help/t/env',
  },
  {
    header: 'Usage',
    content: '$ s env apply-template <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'name',
        typeLabel: '{underline <name>}',
        description: '[Required] Specify the environment template name.',
      },
      {
        name: 'description',
        typeLabel: '{underline <description>}',
        description: '[Optional] Specify the environment template description.',
      },
      {
        name: 'engine',
        typeLabel: '{underline <engine>}',
        description: '[Optional] Specify the IaC prvoider, only terraform supported.',
      },
      {
        name: 'code',
        typeLabel: '{underline <engine>}',
        description: '[Required] Specify the IaC local dir, both absolute path or relative path is supported',
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s env apply-template {underline --name dummy-template} {underline --code /tmp/iac}'],
  },
  {
    header: 'Examples with Cli',
    content: ['$ s cli fc env apply-template {underline --name dummy-template} {underline --code /tmp/iac}'],
  },
];

export const ENV_DESCRIBE_TEMPLATE = [
  {
    header: 'Describe environment template',
    content: 'Show info about an existing environment template',
  },
  {
    header: 'Document',
    content: 'env-describe',
  },
  {
    header: 'Usage',
    content: '$ s env describe-template <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'name',
        typeLabel: '{underline <name>}',
        description: '[Required] Specify the environment template name.',
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s env describe-template {underline --name dummy-template}'],
  },
  {
    header: 'Examples with Cli',
    content: ['$ s cli fc env describe-template {underline --name dummy-template}'],
  },
];

export const ENV_REMOVE_TEMPLATE = [
  {
    header: 'Remove environment template',
    content: 'Remove an existing environment template, but not destroy cloud resources.',
  },
  {
    header: 'Document',
    content: 'https://serverless.help/t/env',
  },
  {
    header: 'Usage',
    content: '$ s env remove-template <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'name',
        typeLabel: '{underline <name>}',
        description: '[Required] Specify the environment template name.',
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s env remove-template {underline --name dummy-template}'],
  },
  {
    header: 'Examples with Cli',
    content: ['$ s cli fc env remove-template {underline --name dummy-template}'],
  },
];

export const ENV_INIT = [
  {
    header: 'Init environment',
    content: 'Create a new environment interactive.',
  },
  {
    header: 'Document',
    content: 'https://serverless.help/t/env',
  },
  {
    header: 'Usage',
    content: '$ s env init <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'name',
        typeLabel: '{underline <name>}',
        description: '[Optional] Specify the environment name.',
      },
      {
        name: 'filename',
        typeLabel: '{underline <filename>}',
        description: '[Optional] Specify an environment manifest when using `s env init`.',
      },
      {
        name: 'overwrite',
        type: Boolean,
        description: '[Optional] Overwrite the environment manifest in local when using `s env init`.',
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s {bold env} {bold init} {underline --filename test.yaml}'],
  },
];

export const ENV_DEPLOY = [
  {
    header: 'Deploy environment',
    content: 'Deploy an environment associated with templates.',
  },
  {
    header: 'Document',
    content: 'https://serverless.help/t/env',
  },
  {
    header: 'Usage',
    content: '$ s env deploy <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'name',
        typeLabel: '{underline <name>}',
        description: '[Required] Specify the environment name.',
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s {bold env} {bold deploy} {underline --name testing}'],
  },
];

export const ENV_REMOVE = [
  {
    header: 'Remove environment',
    content: 'Remove an environment ',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/env.md',
  },
  {
    header: 'Usage',
    content: '$ s env Remove <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'name',
        typeLabel: '{underline <name>}',
        description: '[Required] Specify the environment name.',
      },
      {
        name: 'remove-resource',
        typeLabel: '{underline <remove-resource>}',
        description: '[Optional] Delete env and resource with --remove-resource; without --remove-resource, the system will only delete env`.',
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s {bold env} {bold remove} {underline --name testing}'],
  },
];

export const ENV_INFO = [
  {
    header: 'Describe environment',
    content: 'Show the information of a environment.',
  },
  {
    header: 'Document',
    content: 'https://serverless.help/t/env',
  },
  {
    header: 'Usage',
    content: '$ s env info <options>',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'name',
        typeLabel: '{underline <name>}',
        description: '[Required] Specify the environment name.',
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s {bold env} {bold info} {underline --name testing}'],
  },
];
