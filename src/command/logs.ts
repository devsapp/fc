
/**
 * s logs <options>
 * @pre_help
 * {"header":"Logs","content":"Query the function log. You need to open SLS log service"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/zh/command/logs.md"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @after_help
 * {"ref":"GlobalDescribe"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s logs -s 2021-06-07T02:54:00+08:00 -e 2021-06-07T02:54:59+08:00","$ s logs -s 2021-06-07T02:54:00+08:00 -e 2021-06-07T02:54:59+08:00 --search error","$ s logs -t"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc logs --region cn-hangzhou --service-name serviceName --function-name functionName -t"]}
 */
export interface LogsInputsArgs {
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
  'function-name'?: string;
  /**
   * [Optional] Log type query, value: success/fail
   */
  type?: 'success' | 'fail';
  /**
   *  Query according to requestId within the time interval
   */
  'request-id'?: string;
  /**
   * [Optional] Keyword query,Document: https://help.aliyun.com/document_detail/29060.html
   */
  search?: string;
  /**
   * [Optional] Query log end time (timestamp or time format，like 1611827290000 or 2021-11-11T11:11:12+00:00)
   * @alias e
   */
  'end-time'?: string;
  /**
   * [Optional] Query log start time (timestamp or time format，like 1611827290000 or 2021-11-11T11:11:12+00:00)
   * @alias s
   */
  'start-time'?: string;
  /**
   * [Optional] Continuous log output mode
   */
  tail?: boolean;
}
