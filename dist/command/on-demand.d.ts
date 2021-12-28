export declare function get(): void;
export declare function put(): void;
export declare function list(): void;
/**
 * s ondemand <sub-command> <options>
 * @pre_help
 * {"header":"Ondemand","content":"Resource on-demand operation"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/zh/command/ondemand.md"}
 * @after_help
 * {"header":"SubCommand List","content":[{"desc":"list","example":"View the list of resource on-demand; help command [s ondemand list -h] "},{"desc":"put","example":"Put resource on-demand; help command [s ondemand put -h]"},{"desc":"get","example":"Get resource on-demand; help command [s ondemand get -h]"}]}
 */
export interface OnDemandInputsArgs {
}
/**
 * s ondemand get <options>
 * @pre_help
 * {"header":"Ondemand get","content":"Get on-demand configuration"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/zh/command/ondemand.md"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @after_help
 * {"ref":"GlobalDescribe"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s ondemand get --qualifier qualifier"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc ondemand get --region cn-hangzhou --service-name serviceName --function-name functionName --qualifier qualifier"]}
 */
export interface OnDemandGetInputsArgs {
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
      * [Optional] Specify the qualifier parameter. Only supports LATEST and alias
      */
    'qualifier': string;
}
/**
 * s ondemand list <options>
 * @pre_help
 * {"header":"Ondemand list","content":"View the list of on-demand"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/zh/command/ondemand.md"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @after_help
 * {"ref":"GlobalDescribe"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s ondemand list"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc ondemand list --region cn-hangzhou --service-name serviceName"]}
 */
export interface OnDemandListInputsArgs {
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
    table: boolean;
}
/**
 * s ondemand put <options>
 * @pre_help
 * {"header":"Ondemand put","content":"Set reserved configuration"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/zh/command/ondemand.md"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @after_help
 * {"ref":"GlobalDescribe"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s ondemand put --qualifier pre --max 1"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc ondemand put --region cn-hangzhou --service-name serviceName --function-name functionName --qualifier alias --max 1"]}
 */
export interface OnDemandPutInputsArgs {
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
      * [Required] Specify the maximumInstanceCount parameter
      */
    'max': string;
}
