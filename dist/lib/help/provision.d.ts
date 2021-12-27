export declare const PROVISION: ({
    header: string;
    content: string;
} | {
    header: string;
    content: {
        desc: string;
        example: string;
    }[];
})[];
export declare const PROVISION_LIST: ({
    header: string;
    content: string;
    optionList?: undefined;
} | {
    header: string;
    optionList: ({
        name: string;
        description: string;
        type: StringConstructor;
    } | {
        name: string;
        description: string;
        type: BooleanConstructor;
    })[];
    content?: undefined;
} | {
    header: string;
    content: {
        desc: string;
    }[];
    optionList?: undefined;
} | {
    header: string;
    content: string[];
    optionList?: undefined;
})[];
export declare const PROVISION_PUT: ({
    header: string;
    content: string;
    optionList?: undefined;
} | {
    header: string;
    optionList: ({
        name: string;
        description: string;
        defaultOption: boolean;
        type: BooleanConstructor;
    } | {
        name: string;
        description: string;
        type: StringConstructor;
    } | {
        name: string;
        description: string;
        type: NumberConstructor;
    })[];
    content?: undefined;
} | {
    header: string;
    optionList: ({
        name: string;
        description: string;
        type: StringConstructor;
        alias?: undefined;
    } | {
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
    } | {
        name: string;
        description: string;
        alias: string;
        type: StringConstructor;
    })[];
    content?: undefined;
} | {
    header: string;
    content: {
        desc: string;
    }[];
    optionList?: undefined;
} | {
    header: string;
    content: string[];
    optionList?: undefined;
})[];
export declare const PROVISION_GET: ({
    header: string;
    content: string;
    optionList?: undefined;
} | {
    header: string;
    optionList: ({
        name: string;
        description: string;
        defaultOption: boolean;
        type: BooleanConstructor;
    } | {
        name: string;
        description: string;
        type: StringConstructor;
    })[];
    content?: undefined;
} | {
    header: string;
    optionList: ({
        name: string;
        description: string;
        type: StringConstructor;
        alias?: undefined;
    } | {
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
    } | {
        name: string;
        description: string;
        alias: string;
        type: StringConstructor;
    })[];
    content?: undefined;
} | {
    header: string;
    content: {
        desc: string;
    }[];
    optionList?: undefined;
} | {
    header: string;
    content: string[];
    optionList?: undefined;
})[];
/**
 * s provision <sub-command> <options>
 * @pre_help
 * {"header":"Provision","content":"resource reservation operation"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/command/provision.md"}
 * @after_help
 * {"header":"SubCommand List","content":[{"desc":"list","example":"View the list of resource reservation; help command [s provision list -h]"},{"desc":"put","example":"Put resource reservation; help command [s provision put -h]"},{"desc":"get","example":"Get resource reservation; help command [s provision get -h]"}]}
 */
export interface ProvisionInputsArgs {
}
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
