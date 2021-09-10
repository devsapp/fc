import { IInputs } from '../lib/interface/interface';
import { componentMethodCaller } from '../lib/utils';

export async function start(inputs: IInputs): Promise<any> {
  return await componentMethodCaller(inputs, 'devsapp/fc-eval', 'start');
}

export async function clean(inputs: IInputs): Promise<any> {
  return await componentMethodCaller(inputs, 'devsapp/fc-eval', 'clean');
}

/**
  * s eval <sub-command>\n
  * @pre_help
  * {"header":"Eval","content":"Power tunning online functions"}
  * @after_help
  * {"header": "SubCommand List", "content": [{"name":"start","summary":"Power tunning online functions, you can get help through [s eval start -h]"},{"name":"clean","summary":"Clean the relevant resources , you can get help through [s eval clean -h]"}]}
  */
export interface EvalInputsArgs {}

/**
  * s start <options>\n
  * @pre_help
  * {"header":"Eval start","content":"Power tunning start"}
  * @after_help
  * {"ref":"GlobalParams"}
  * @example
  * {"header": "Examples with CLI","content": ["$ s cli fc eval start --region=cn-hangzhou --function-name=myFunctionName --service-name=myServiceName --function-type=http --run-count=50  --payload='hello world'  --eval-type=memory --memory-size=128,256,512,1024 --method=get --path=/login --access=default","$ s cli fc eval start --region=cn-hangzhou --function-name=myFunctionName --service-name=myServiceName --function-type=event --run-count=10  --payload-file=./payload.file  --eval-type=memory --memory-size=128,256,512,1024 --access=default"]}
  */
export interface EvalStartInputsArgs {
  /**
  *  Specify the region of alicloud
  *  @alias r
  */
  region: string;
  /**
  *  Specify the alicloud fc service name
  */
  'service-name': string;
  /**
   *  Specify the alicloud fc function name
   */
  'function-name'?: string;
  /**
   *  Qualifier of the target function, only for --function-type event
   * @alias q
   */
  'qualifier'?: string;
  /**
  *  Type of the power tunning, including memory and concurrency
  */
  'eval-type': string;
  /**
  *  Number of Invoke Function, only for --eval-type memory
  */
  'runCount': number;
  /**
  *  Type of the target function, including event and http
  */
  'function-type': string;
  /**
  * Target method, only for --function-type http
  */
  'method': string;
  /**
  *  Target path, only for --function-type http
  */
  'path': string;
  /**
  *  Target query, only for --function-type http
  */
  'query': string;
  /**
  *  For --function-type event, represents the event passed to the function;\nFor --function-type http, represents the request body passed to the function
  */
  'payload': string;
  /**
  *  For --function-type event, contains the event passed to the function;\nFor --function-type http, contains the request body passed to the function
  * @alias f
  */
  'payload-file': string;
}

/**
 * s eval clean <options>\n
 * @pre_help
 * {"header":"Eval clean","content":"Clean the relevant resources"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc eval clean --region myRegion --access myAccess -y"]}
 */
export interface EvalCleanInputsArgs {
  /**
  *  Specify the region of alicloud
  */
  region: string;
  /**
  *  Assume that the answer to any question which would be asked is yes
  * @alias y
  */
  'assume-yes': boolean;
}
