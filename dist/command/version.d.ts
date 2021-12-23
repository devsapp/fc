export declare function list(): void;
export declare function publish(): void;
/**
 * s version <sub-command>
 * @pre_help
 * {"header":"Version","content":"Service version operation"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/command/version.md"}
 * @after_help
 * {"header": "SubCommand List", "content": [{"desc":"list","example":"View the list of service versions; help command [s version list -h]"},{"desc":"publish","example":"Publish service version; help command [s version publish -h]"}]}
 */
export interface VersionInputsArgs {
}
/**
 * s version list <options>
 * @pre_help
 * {"header":"Version list","content":"View the list of service versions"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/command/version.md"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @after_help
 * {"ref":"GlobalDescribe"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s version list"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc version list --region cn-hangzhou --service-name serviceName"]}
 */
export interface VersionListInputsArgs {
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
 * s version publish <options>
 * @pre_help
 * {"header":"Version publish","content":"Publish service version"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/command/version.md"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @after_help
 * {"ref":"GlobalDescribe"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s version publish --description xxx"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc version publish --region cn-hangzhou --service-name name --description xxx"]}
 */
export interface VersionPublishInputsArgs {
    /**
     * [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1
     */
    region: string;
    /**
      * [C-Required] Specify the fc service name
      */
    'service-name': string;
    /**
      * [Optional] Specify the description
      */
    'description': string;
}
/**
 * s version remove <options>\n
 * @pre_help
 * {"header":"Version remove","content":"Delete service version"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s version remove --version-id xxx"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc version remove --region cn-hangzhou --service-name name --version-id xxx"]}
 */
export interface VersionDeleteInputsArgs {
    /**
     *  Specify the region of alicloud
     */
    region: string;
    /**
      *  Specify the alicloud fc service name
      */
    'service-name': string;
    /**
      *  Specify the version parameter
      */
    'version-id': string;
}
/**
 * s version removeAll <options>\n
 * @pre_help
 * {"header":"Version removeAll","content":"Delete service all version"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s version removeAll"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc version removeAll --region cn-hangzhou --service-name name"]}
 */
export interface VersionDeleteAllInputsArgs {
    /**
     *  Specify the region of alicloud
     */
    region: string;
    /**
      *  Specify the alicloud fc service name
      */
    'service-name': string;
}
