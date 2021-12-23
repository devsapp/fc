
/**
 * s invoke <options>
 * @pre_help
 * {"header":"Invoke","content":"Invoke/trigger online functions"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/command/invoke.md"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @after_help
 * {"ref":"GlobalDescribe"}
 * @after_help
 * {"header":"Event Format", "content": "Quickly obtain the data structures of different events through the command [s cli fc-event -h]"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s invoke"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc invoke --region cn-hangzhou --service-name serviceName --function-name functionName --event evnetString"]}
 */
export interface InvokeInputsArgs {
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
   * [Optional] Event data passed to the function during invocation (default: "")
   * @alias e
   */
  'event'?: string;
  /**
   * [Optional] Event funtion: A file containing event data passed to the function during invoke
   * @alias f
   */
  'event-file'?: string;
  /**
   * [Optional] Read from standard input, to support script pipeline
   * @alias s
   */
  'event-stdin'?: string;
  /**
   * [Optional] Invocation type, value: async/sync, default: sync
   * @typeLabel [async/sync]
   */
  'invocation-type'?: string;
  /**
   * [Optional] Stateful asynchronous invocation, only takes effect when --invocation-type=async
   */
  'stateful-async-invocation-id'?: string;
}
