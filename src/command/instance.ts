export function list() {}
export function exec() {}

/**
 * s instance <sub-command>\n
 * @pre_help
 * {"header":"Instance","content":"Function instance operation"}
 * @after_help
 * {"header": "SubCommand List", "content": [{"desc":"list","example":"View the list of function instance, you can get help through [s instance list -h]"},{"desc":"exec","example":"Execute instructions in the container, you can get help through [s instance exec -h]"}]}
 */
export interface InstanceInputsArgs {
}

/**
 * s instance list <options>\n
 * @pre_help
 * {"header":"Instance list","content":"View the list of function instance"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s instance list"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc instance list --region cn-hangzhou --service-name serviceName --function-name functionName"]}
 */
export interface InstanceListInputsArgs {
  /**
   *  Specify the region of alicloud
   */
  region?: string;
  /**
    *  Specify the alicloud fc service name
    */
  'service-name'?: string;
  /**
    *  Specify the alicloud fc function name
    */
  'function-name'?: string;
  /**
    *  Version or alias, default is LATEST
    */
  qualifier?: string;
}

/**
 * s instance exec <options>\n
 * @pre_help
 * {"header":"Instance exec","content":"Execute instructions in the container"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s instance exec --instance-id instanceId ls","$ s instance exec --instance-id instanceId -it \"/bin/bash ls\""]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc instance exec --region cn-hangzhou --service-name name --function-name functionName --instance-id instanceId ls", "$ s cli fc instance exec --region cn-hangzhou --service-name name --function-name functionName --instance-id instanceId -it"]}
 */
export interface InstanceExecInputsArgs {
  /**
   *  Specify the region of alicloud
   */
  region?: string;
  /**
    *  Specify the alicloud fc service name
    */
  'service-name'?: string;
  /**
    *  Specify the alicloud fc function name
    */
  'function-name'?: string;
  /**
    *  Specify the instance parameter
    */
  'instance-id': string;
  /**
    *  version or alias, default is LATEST
    */
  qualifier?: string;
  /**
    *  open stdin
    *  @alias i
    */
  stdin?: boolean;
  /**
    *  assign a terminal device
    *  @alias t
    */
  tty?: boolean;
}
