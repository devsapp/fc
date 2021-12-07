import { IInputs } from '../lib/interface/interface';
import { componentMethodCaller } from '../lib/utils';

export async function start(inputs: IInputs): Promise<any> {
  return await componentMethodCaller(inputs, 'devsapp/fc-eval', 'start');
}

/**
  * s eval <sub-command>\n
  * @pre_help
  * {"header":"Eval","content":"Power tuning online functions"}
  * @after_help
  * {"header": "SubCommand List", "content": [{"name":"start","summary":"Power tuning online functions, you can get help through [s cli fc eval start -h]"}]}
  */
export interface EvalInputsArgs {}

/**
  * s start <options>\n
  * @pre_help
  * {"header":"Eval start","content":"Power tuning start"}
  * @after_help
  * {"ref":"GlobalParams"}
  * @example
  * {"header": "Examples with CLI","content": ["$ s cli fc eval start --region cn-hangzhou --function-name myFunctionName --service-name myServiceName --eval-type memory --run-count 10  --payload-file ./payload.file  --memory-size 128,256,512,1024 --access default","\n$ s cli fc eval start --region cn-hangzhou --function-name myFunctionName --service-name myServiceName  --eval-type memory --run-count 50  --payload 'hello world'  --memory-size 128,256,512,1024 --method get --path '/login' --query 'a=1&b=2' --access default", "\n$ s cli fc eval start --region cn-hangzhou --function-name myFunctionName --service-name myServiceName --eval-type concurrency --memory 1536 --concurrency-args 2,30,5 --rt 250  --payload-file ./payload.file  --access default","\n$ s cli fc eval start --region cn-hangzhou --function-name myFunctionName --service-name myServiceName  --eval-type concurrency --memory 1536 --concurrency-args 2,20,5 --rt 250 --method get --path '/login' --query 'a=1&b=2' --access default","\n$ s cli fc eval start --region cn-hangzhou --function-name myFunctionName --service-name myServiceName  --eval-type concurrencyPostman --memory 1536 --concurrency-args 2,20,4 --rt 300 --payload-file ./postman.json --access default"]}
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
  *  Type of the power tuning, including memory and concurrency
  */
  'eval-type': string;
  /**
  *  Number of Invoke Function, only for --eval-type memory
  */
  'run-count': number;
  /**
  *  Function MemorySize List of power tuning, only for --eval-type memory
  */
  'memory-size': string;
  /**
  *  Concurrency args of power tuning that can convert to concurrency list, only for --eval-type concurrency
  */
  'concurrency-args': string;
  /**
  *  Function memory of power tuning, only for --eval-type concurrency
  */
  'memory': number;
  /**
  *  Max response time, only for --eval-type concurrency
  */
  'rt': number;
  /**
  * Target method, only for http function
  */
  'method': string;
  /**
  *  Target path, only for http function
  */
  'path': string;
  /**
  *  Target query, only for http function
  */
  'query': string;
  /**
  *  For event function, represents the event passed to the function;\nFor http function, represents the request body passed to the function
  */
  'payload': string;
  /**
  *  For event function, contains the event passed to the function;\nFor http function, contains the request body passed to the function
  * @alias f
  */
  'payload-file': string;
}
