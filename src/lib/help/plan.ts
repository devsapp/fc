import { globalParams, globalDescribe } from './constant';

export const PLAN_HELP = [
  {
    header: 'Plan',
    content: 'Perceived resource change',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/command/plan.md',
  },
  {
    header: 'Usage',
    content: [
      { example: '$ s plan <option>' },
    ],
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'type-plan',
        typeLabel: '{underline [remove/deploy]}',
        description: '[Required] Expected instruction,value: remove/deploy(default: "deploy")',
        type: String,
      },
      {
        name: 'sub-command',
        description: `[Optional] Expected subcommand.
          If type-plan is deploy, optional value:service/function/trigger/domain
          If type-plan is remove, optional value:service/function/trigger/domain/version/alias/provision/ondemand/onDemand/layer`,
        type: String,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s plan --type-plan deploy', '$ s plan --type-plan remove'],
  },
];
