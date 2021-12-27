export declare const STRESS: ({
    header: string;
    content: string;
} | {
    header: string;
    content: {
        desc: string;
        example: string;
    }[];
})[];
export declare const STRESS_START: ({
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
        typeLabel: string;
        type: StringConstructor;
        alias?: undefined;
    } | {
        name: string;
        description: string;
        type: NumberConstructor;
        typeLabel?: undefined;
        alias?: undefined;
    } | {
        name: string;
        alias: string;
        description: string;
        type: NumberConstructor;
        typeLabel?: undefined;
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
export declare const STRESS_CLEAN: ({
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
 * s stress <sub-command> <options>
 * @pre_help
 * {"header":"Stress","content":"Stress test for the serverless application"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/command/stress.md"}
 * @after_help
 * {"header": "SubCommand List", "content": [{"name":"start","summary":"Start stress test; help command [s eval start -h]"},{"name":"clean","summary":"Clean the relevant resources; help command [s eval clean -h]"}]}
 */
export interface StressInputsArgs {
}
/**
 * Stress clean/cleanup\ns stress cleanup <options>
 * @pre_help
 * {"header":"Stress clean/cleanup","content":"Clean the relevant resources, including helper resources"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/command/stress.md"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @after_help
 * {"ref":"GlobalDescribe"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s stress clean"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc stress clean --region cn-hangzhou --service-name serviceName --function-name functionName -y"]}
 */
export interface StressCleanInputsArgs {
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
     * [Optional] Assume that the answer to any question which would be asked is yes
     * @alias y
     */
    'assume-yes': boolean;
}
/**
 * s stress start <options>
 * @pre_help
 * {"header":"Stress start","content":"Start stress test"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/command/stress.md"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @after_help
 * {"ref":"GlobalDescribe"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s stress start --payload-file ./payload.file", "$ s stress start --num-user 6 --spawn-rate 10 --run-time 30 --url myUrl --method post --payload \"hello world\""]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc stress start --num-user 6 --spawn-rate 10 --run-time 30 --function-type event --service-name serviceName --function-name functionName --qualifier LATEST --payload \"hello world\" --region cn-hangzhou"]}
 */
export interface StressStartInputsArgs {
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
     * [C-Required] Type of the target function, value: http/event
     */
    'function-type': string;
    /**
     * [Optional] Target method, only for --function-type http
     */
    'method': string;
    /**
     * [Optional] Represents the event/request_body passed to the function
     */
    'payload': string;
    /**
     * [Optional] Contains the event passed to the function
     */
    'payload-file': string;
    /**
     * [Optional] Number of the simulated users
     */
    'num-user': number;
    /**
      * [Optional] Qualifier of the target function, only for event function
      * @alias q
      */
    'qualifier'?: string;
    /**
     * [Optional] Intervals for stress
     */
    'run-time': number;
    /**
     * [Optional] Increasing number of users per second
     */
    'spawn-rate': number;
    /**
     * [Optional] Target url
     * @alias u
     */
    'url': string;
    /**
     * [Optional] Invocation type: optional value "async"|"sync", default value "sync" (default: "sync")
     */
    'invocation-type'?: string;
}
