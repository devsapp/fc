import {
  globalParams,
  globalDescribe,
  regionDescribe,
  serviceNameDescribe,
  functionNameDescribe,
  showTableDescribe,
} from './constant';

const qualifier = {
  name: 'qualifier',
  description: '[Required] Specify the qualifier parameter. Only supports LATEST and alias',
  type: String,
};

export const PROVISION = [
  {
    header: 'Provision',
    content: 'resource reservation operation',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/command/provision.md',
  },
  {
    header: 'Usage',
    content: '$ s provision <sub-command> <options>',
  },
  {
    header: 'SubCommand List',
    content: [
      { desc: 'list', example: 'View the list of resource reservation; help command [s provision list -h]' },
      { desc: 'put', example: 'Put resource reservation; help command [s provision put -h]' },
      { desc: 'get', example: 'Get resource reservation; help command [s provision get -h]' },
    ],
  },
];

export const PROVISION_LIST = [
  {
    header: 'Provision list',
    content: 'View the list of provision',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/command/provision.md',
  },
  {
    header: 'Usage',
    content: '$ s provision list <options>',
  },
  {
    header: 'Options',
    optionList: [
      regionDescribe,
      serviceNameDescribe,
      qualifier,
      showTableDescribe,
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s provision list'],
  },
  {
    header: 'Examples with CLI',
    content: ['$ s cli fc version list --region cn-hangzhou --service-name serviceName'],
  },
];

export const PROVISION_PUT = [
  {
    header: 'Provision put',
    content: 'Set reserved configuration',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/command/provision.md',
  },
  {
    header: 'Usage',
    content: '$ s provision put <options>',
  },
  {
    header: 'Options',
    optionList: [
      regionDescribe,
      serviceNameDescribe,
      functionNameDescribe,
      {
        name: 'target',
        description: '[Optional] Specify the provision target parameter',
        type: Number,
      },
      {
        name: 'config',
        description: '[Optional] Specify the configuration path parameter,Config format refers to [https://github.com/devsapp/fc/blob/jiangyu-docs/docs/zh/command/provision.md#provision-config]',
        type: String,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s provision put --target 1 --qualifier alias',
      '$ s provision put --config ./provision.json --qualifier alias',
    ],
  },
  {
    header: 'Examples with CLI',
    content: ['$ s cli fc provision put --region cn-hangzhou --service-name serviceName --function-name functionName --qualifier alias --target 1'],
  },
];

export const PROVISION_GET = [
  {
    header: 'Provision get',
    content: 'Get provision configuration',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/command/provision.md',
  },
  {
    header: 'Usage',
    content: '$ s provision get <options>',
  },
  {
    header: 'Options',
    optionList: [
      regionDescribe,
      serviceNameDescribe,
      functionNameDescribe,
      qualifier,
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s provision get --qualifier alias'],
  },
  {
    header: 'Examples with CLI',
    content: ['$ s cli fc provision get --region cn-hangzhou --service-name serviceName --function-name functionName --qualifier alias'],
  },
];

/**
 * s provision <sub-command> <options>
 * @pre_help
 * {"header":"Provision","content":"resource reservation operation"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/command/provision.md"}
 * @after_help
 * {"header":"SubCommand List","content":[{"desc":"list","example":"View the list of resource reservation; help command [s provision list -h]"},{"desc":"put","example":"Put resource reservation; help command [s provision put -h]"},{"desc":"get","example":"Get resource reservation; help command [s provision get -h]"}]}
 */
export interface ProvisionInputsArgs {}


/**
 * s provision get <options>
 * @pre_help
 * {"header":"Provision get","content":"Get provision configuration"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/command/provision.md"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @after_help
 * {"ref":"GlobalDescribe"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s provision get --qualifier alias"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc provision get --region cn-hangzhou --service-name serviceName --function-name functionName --qualifier alias"]}
 */
export interface ProvisionGetInputsArgs {
  /**
   * [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1
   */
  region: string;
  /**
    * [C-Required] Specify the fc service name
    */
  'service-name': string;
  /**
    * [C-Required] Specify the fc function name
    */
  'function-name': string;
  /**
    * [Required] Specify the qualifier parameter. Only supports LATEST and alias
    */
  'qualifier': string;
}

/**
 * s provision put <options>
 * @pre_help
 * {"header":"Provision put","content":"Set reserved configuration"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/command/provision.md"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @after_help
 * {"ref":"GlobalDescribe"}
 * @example
 * {"header":"Examples with Yaml","content":["$ s provision put --target 1 --qualifier alias","$ s provision put --config ./provision.json --qualifier alias"]}
 * @example
 * {"header":"Examples with CLI","content":["$ s cli fc provision put --region cn-hangzhou --service-name serviceName --function-name functionName --qualifier alias --target 1"]}
 */
export interface ProvisionPutInputsArgs {
  /**
   * [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1
   */
  region: string;
  /**
    * [C-Required] Specify the fc service name
    */
  'service-name': string;
  /**
   * [C-Required] Specify the fc function name
   */
  'function-name': string;
  /**
    * [Required] Specify the qualifier parameter. Only supports LATEST and alias
    */
  'qualifier': string;
  /**
    * [Optional] Specify the provision target parameter
    */
  'target': number;
  /**
    * [Optional] Specify the configuration path parameter,Config format refers to [https://github.com/devsapp/fc/blob/jiangyu-docs/docs/zh/command/provision.md#provision-config]
    */
  'config': string;
}

/**
 * s provision list <options>
 * @pre_help
 * {"header":"Provision list","content":"View the list of provision"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/command/provision.md"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @after_help
 * {"ref":"GlobalDescribe"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s provision list"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc version list --region cn-hangzhou --service-name serviceName"]}
 */
export interface ProvisionListInputsArgs {
  /**
   * [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1
   */
  region: string;
  /**
    * [C-Required] Specify the fc service name
    */
  'service-name': string;
  /**
    * [C-Required] Specify the qualifier parameter. Only supports LATEST and alias
    */
  'qualifier': string;
  /**
   * [Optional] Table format output
   */
  table: boolean;
}
