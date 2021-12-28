export function get() {}
export function list() {}
export function publish() {}
// export function _delete() {}

/**
 * s alias <sub-command> <options>
 * @pre_help
 * {"header":"Alias","content":"Service alias operation"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/zh/command/alias.md"}
 * @after_help
 * {"header": "SubCommand List", "content": [{"desc":"get","example":"Get alias details; help command [s alias get -h]"},{"desc":"list","example":"View the list of alias; help command [s alias list -h]"},{"desc":"publish","example":"Publish alias; help command [s alias publish -h]"}]}
 */
export interface AliasInputsArgs {}


/**
 * s alias get <options>
 * @pre_help
 * {"header":"Alias get","content":"Get alias details"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/zh/command/alias.md"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @after_help
 * {"ref":"GlobalDescribe"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s alias get --alias-name aliasName"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc alias get --region cn-hangzhou --service-name serviceName --alias-name aliasName"]}
 */
export interface AliasGetInputsArgs {
  /**
   * [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1
   */
  region: string;
  /**
   * [C-Required] Specify the fc service name
   */
  'service-name': string;
  /**
   *  [Required] Specify the fc alias name
   */
  'alias-name': string;
}

/**
 * s alias list <options>
 * @pre_help
 * {"header":"Alias list","content":"View the list of service alias"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/zh/command/alias.md"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @after_help
 * {"ref":"GlobalDescribe"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s alias list"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc alias list --region cn-hangzhou --service-name serviceName"]}
 */
export interface AliasListInputsArgs {
  /**
   * [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1
   */
  region: string;
  /**
    * [C-Required] Specify the fc service name
    */
  'service-name': string;
  /**
    * [Optional] Table format output
    */
  'table': boolean;
}

/**
 * s alias publish <options>
 * @pre_help
 * {"header":"Alias publish","content":"Publish service alias"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/zh/command/alias.md"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @after_help
 * {"ref":"GlobalDescribe"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s alias publish --alias-name aliasName --version-id 2","$ s alias publish --description description --alias-name aliasName --version-id 2 --gversion 3 --weight 20"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc alias publish --region cn-hangzhou --service-name serviceName --alias-name aliasName --version-id 2"]}
 */
export interface AliasPublishInputsArgs {
  /**
   * [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1
   */
  region: string;
  /**
    * [C-Required] Specify the fc service name
    */
  'service-name': string;
  /**
    * [Required] Specify the fc alias name
    */
  'alias-name': string;
  /**
    * [Required] The version Id
    */
  'version-id': string;
  /**
    * [Optional] Specify the alias description
    */
  'description': string;
  /**
    * [Optional] The grayscale version id
    */
  'gversion': string;
  /**
    * [Optional] The weight for grayscale version
    */
  'weight': string;
}

/**
 * s alias remove <options>\n
 * @pre_help
 * {"header":"Alias remove","content":"Delete service alias"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @after_help
 * {"ref":"GlobalDescribe"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s alias remove --alias-name xxx"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc alias remove --region cn-hangzhou --service-name name --alias-name xxx"]}
 */
export interface AliasDeleteInputsArgs {
  /**
   * [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1
   */
  region: string;
  /**
   * [C-Required] Specify the fc service name
   */
  'service-name': string;
  /**
   * [Required] Specify the fc alias name
   */
  'alias-name': string;
}

/**
 * s alias removeAll <options>\n
 * @pre_help
 * {"header":"Alias removeAll","content":"Delete service all alias"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @after_help
 * {"ref":"GlobalDescribe"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s alias removeAll"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc alias removeAll --region cn-hangzhou --service-name name"]}
 */
export interface AliasDeleteAllInputsArgs {
  /**
   * [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1
   */
  region: string;
  /**
  * [C-Required] Specify the fc service name
  */
  'service-name': string;
}
