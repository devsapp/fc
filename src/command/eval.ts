import { IInputs } from '../lib/interface/interface';
import { componentMethodCaller } from '../lib/utils';

export async function start(inputs: IInputs): Promise<any> {
  return await componentMethodCaller(inputs, 'devsapp/fc-eval', 'start');
}

/**
  * s eval <sub-command>
  * @pre_help
  * {"header":"Eval","content":"Power tuning online functions"}
  * @pre_help
  * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/command/eval.md"}
  * @after_help
  * {"header": "SubCommand List", "content": [{"name":"start","summary":"Power tuning online functions; help command [s eval start -h]"}]}
  */
export interface EvalInputsArgs {}

/**
  * s eval start <options>
  * @pre_help
  * {"header":"Eval start","content":"Power tuning start"}
  * @pre_help
  * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/command/eval.md"}
  * @after_help
  * {"ref":"GlobalParams"}
  * @after_help
  * {"ref":"GlobalDescribe"}
  * @example
  * {"header": "Examples with Yaml","content": ["$ s eval start --eval-type memory --run-count 10 --payload-file ./payload.file  --memory-size 128,256,512,1024 ","$ s eval start --eval-type concurrency --memory 1536 --concurrency-args 2,20,5 --rt 250 --method get --path '/login' --query 'a=1&b=2'", "$ s eval start --eval-type concurrencyPostman --memory 1536 --concurrency-args 2,20,5 --rt 250 --payload-file ./postman.json"]}
  * @example
  * {"header": "Examples with CLI","content": ["$ s cli fc eval start --region cn-hangzhou --function-name functionName --service-name serviceName --eval-type memory --run-count 10 --payload 'hello world' --memory-size 128,256,512,1024 --access default", "$ s cli fc eval start --region cn-hangzhou --function-name functionName --service-name serviceName --eval-type concurrency --memory 1536 --concurrency-args 2,30,5 --rt 250  --method get --path '/login' --query 'a=1&b=2' --access default", "$ s cli fc eval start --region cn-hangzhou --function-name functionName --service-name serviceName --eval-type concurrencyPostman --memory 1536 --concurrency-args 2,20,5 --rt 250 --payload-file ./postman.json --access default"]}
  */
export interface EvalStartInputsArgs {
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
   * [Optional] Concurrency args of power tuning that can convert to concurrency list, for --eval-type concurrency or concurrencyPostman
   */
  'concurrency-args': string;
  /**
   * [Optional] Type of the power tuning, value: memory/concurrency/concurrencyPostman
   */
  'eval-type': string;
  /**
   * [Optional] Function MemorySize List of power tuning, only for --eval-type memory
   */
  'memory-size': string;
  /**
   * [Optional] Target method, only for HTTP function
   */
  'method': string;
  /**
   * [Optional] Target path, only for HTTP function
   */
  'path': string;
  /**
   * [Optional] Target query, only for HTTP function
   */
  'query': string;
  /**
   * [Optional] Target headers, only for HTTP function
   */
  'headers': string;
  /**
   * [Optional] Represents the event(Event function)/request_body(HTTP function) passed to the function
   */
  'payload': string;
  /**
   * [Optional] Represents the the event(Event function)/request_body(HTTP function)/postman-export-json-file which be readed from file to pass to the function
   */
  'payload-file': string;
  /**
   * [Optional] Max response time, only for --eval-type concurrency/concurrencyPostman
   */
  'rt': number;
  /**
   * [Optional] Number of Invoke Function, only for --eval-type memory
   */
  'run-count': number;
  /**
   * [Optional] Function memory of power tuning, only for --eval-type concurrency/concurrencyPostman
   */
  'memory': number;
}
