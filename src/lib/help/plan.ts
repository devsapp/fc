import { globalParams, globalDescribe } from './constant';

export const PLAN_HELP = [
  {
    header: 'Plan',
    content: 'Perceived resource change',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/plan.md',
  },
  {
    header: 'Usage',
    content: [{ example: '$ s plan <option>' }],
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'plan-type',
        typeLabel: '{underline [remove/deploy]}',
        description: '[Required] Expected instruction,value: remove/deploy(default: "deploy")',
        type: String,
      },
      {
        name: 'sub-command',
        description: `[Optional] Expected subcommand.
          If plan-type is deploy, optional value:service/function/trigger/domain
          If plan-type is remove, optional value:service/function/trigger/domain/version/alias/provision/ondemand/onDemand/layer`,
        type: String,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s plan --plan-type deploy', '$ s plan --plan-type remove'],
  },
];
