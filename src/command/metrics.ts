
/**
 * s metrics <options>
 * @pre_help
 * {"header":"Metrics","content":"Query function metrics information"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/command/metrics.md"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @after_help
 * {"ref":"GlobalDescribe"}
 * @example
 * {"header":"Examples with Yaml","content":[{"example":"$ s metrics"}]}
 * @example
 * {"header":"Examples with CLI","content":[{"example":"$ s cli fc metrics --region cn-hangzhou --service-name myService --function-name myFunction"}]}
 */
export interface MetricsInputsArgs {
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
}
