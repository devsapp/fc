/**
 * s info <options>
 * @pre_help
 * {"header":"Info","content":"Query online resource details"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/command/info.md"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @after_help
 * {"ref":"GlobalDescribe"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s info"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc info --region region --service-name serviceName --access accessName","$ s cli fc info --region region --service-name serviceName --function-name functionName --trigger-name triggerName"]}
 */
export interface InfoInputsArgs {
    /**
     * [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1
     */
    region: string;
    /**
    * [C-Required] Specify the fc service name
    */
    'service-name': string;
    /**
    * [Optional] Specify the fc function name
    */
    'function-name': string;
    /**
    * [Optional] Specify the fc trigger name, multiple triggers can be specified using [--trigger-name name1 --trigger-name
    */
    'trigger-name'?: string;
}
