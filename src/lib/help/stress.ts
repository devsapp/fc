import {
  globalParams,
  globalDescribe,
  regionDescribe,
  serviceNameDescribe,
  functionNameDescribe,
  assumeYesDescribe,
} from './constant';

export const STRESS = [
  {
    header: 'Stress',
    content: 'Stress test for the serverless application',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/stress.md',
  },
  {
    header: 'Usage',
    content: '$ s stress <sub-command> <options>',
  },
  {
    header: 'SubCommand List',
    content: [
      {
        desc: 'start',
        example: 'Start stress test; help command [s stress start -h]',
      },
      {
        desc: 'clean',
        example: 'Clean the relevant resources; help command [s stress clean -h]',
      },
    ],
  },
];

export const STRESS_START = [
  {
    header: 'Stress start',
    content: 'Start stress test ',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/stress.md',
  },
  {
    header: 'Usage',
    content: '$ s stress start <options>',
  },
  {
    header: 'Options',
    optionList: [
      regionDescribe,
      serviceNameDescribe,
      functionNameDescribe,
      {
        name: 'function-type',
        description: '[C-Required] Type of the target function, value: http/event',
        typeLabel: '{underline [http/event]}',
        type: String,
      },
      {
        name: 'method',
        description: '[Optional] Target method, only for --function-type http',
        type: String,
      },
      {
        name: 'payload',
        description:
          '[Optional] Represents the event(Event function)/request_body(HTTP function) passed to the function',
        type: String,
      },
      {
        name: 'payload-file',
        description:
          '[Optional] Represents the the event(Event function)/request_body(HTTP function)/postman-export-json-file which be readed from file to pass to the function',
        type: String,
      },
      {
        name: 'num-user',
        description: '[Optional] Number of the simulated users',
        type: Number,
      },
      {
        name: 'qualifier',
        description: '[Optional] Qualifier of the target function, only for event function',
        type: String,
      },
      {
        name: 'run-time',
        description: '[Optional] Intervals for stress',
        type: Number,
      },
      {
        name: 'spawn-rate',
        description: '[Optional] Increasing number of users per second',
        type: Number,
      },
      {
        name: 'url',
        alias: 'u',
        description: '[Optional] Target url',
        type: Number,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s stress start --payload-file ./payload.file',
      '$ s stress start --num-user 6 --spawn-rate 10 --run-time 30 --url myUrl --method post --payload "hello world"',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s stress start --num-user 6 --spawn-rate 10 --run-time 30 --url myUrl --method post --payload "hello world"',
    ],
  },
];

export const STRESS_CLEAN = [
  {
    header: 'Stress clean',
    content: ' Clean the relevant resources, including helper resources',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/stress.md',
  },
  {
    header: 'Usage',
    content: '$ s stress clean <options>',
  },
  {
    header: 'Options',
    optionList: [regionDescribe, serviceNameDescribe, functionNameDescribe, assumeYesDescribe],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s stress clean'],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc stress clean --region cn-hangzhou --service-name serviceName --function-name functionName -y',
    ],
  },
];

/**
 * s stress <sub-command> <options>
 * @pre_help
 * {"header":"Stress","content":"Stress test for the serverless application"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/zh/command/stress.md"}
 * @after_help
 * {"header": "SubCommand List", "content": [{"name":"start","summary":"Start stress test; help command [s eval start -h]"},{"name":"clean","summary":"Clean the relevant resources; help command [s eval clean -h]"}]}
 */
export interface StressInputsArgs {}

/**
 * Stress clean/cleanup\ns stress cleanup <options>
 * @pre_help
 * {"header":"Stress clean/cleanup","content":"Clean the relevant resources, including helper resources"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/zh/command/stress.md"}
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
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/zh/command/stress.md"}
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
  method: string;
  /**
   * [Optional] Represents the event/request_body passed to the function
   */
  payload: string;
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
  qualifier?: string;
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
  url: string;
  /**
   * [Optional] Invocation type: optional value "async"|"sync", default value "sync" (default: "sync")
   */
  'invocation-type'?: string;
}
