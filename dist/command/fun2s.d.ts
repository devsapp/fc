/**
 * s cli fc fun2s <options>
 * @pre_help
 * {"header":"Fun2s","content":"Convert the Yaml specification of Funcraft to the Yaml specification of Serverless Devs."}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/zh/command/fun2s.md"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @after_help
 * {"ref":"GlobalDescribe"}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc fun2s --region cn-shenzhen --target ./s.yaml"]}
 */
export interface Fun2SInputsArgs {
    /**
     * [Optional] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1
     */
    region?: string;
    /**
     * [Optional] Specify Funcraft configuration path, default: template.yaml/template.yml
     */
    source?: string;
    /**
     * [Optional] Specify Serverless Devs configuration path, default: s.yaml
     */
    target?: string;
    /**
     * [Optional] Mandatory overwrite s file
     */
    force?: boolean;
}
