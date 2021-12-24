import {
  globalParams,
  globalDescribe,
  regionDescribe,
  serviceNameDescribe,
  functionNameDescribe,
} from './constant';

export const EVAL = [
  {
    header: 'Eval',
    content: 'Power tuning online functions',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/command/eval.md',
  },
  {
    header: 'Usage',
    content: '$ s eval <sub-command>',
  },
  {
    header: 'SubCommand List',
    content: [
      { desc: 'start', example: 'Power tuning online functions; help command [s eval start -h]' },
    ],
  },
];

export const EVAL_START = [
  {
    header: 'Eval start',
    content: 'Power tuning start',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/command/eval.md',
  },
  {
    header: 'Usage',
    content: '$ s eval start <options>',
  },
  {
    header: 'Options',
    optionList: [
      regionDescribe,
      serviceNameDescribe,
      functionNameDescribe,
      {
        name: 'concurrency-args',
        description: '[Optional] Concurrency args of power tuning that can convert to concurrency list, for --eval-type concurrency or concurrencyPostman',
        type: String,
      },
      {
        name: 'eval-type',
        description: '[Optional] Type of the power tuning, value: memory/concurrency/concurrencyPostman',
        type: String,
      },
      {
        name: 'memory-size',
        description: '[Optional] Function MemorySize List of power tuning, only for --eval-type memory',
        type: String,
      },
      {
        name: 'method',
        description: '[Optional] Target method, only for HTTP function',
        type: String,
      },
      {
        name: 'path',
        description: '[Optional] Target path, only for HTTP function',
        type: String,
      },
      {
        name: 'query',
        description: '[Optional] Target query, only for HTTP function',
        type: String,
      },
      {
        name: 'headers',
        description: '[Optional] Target headers, only for HTTP function',
        type: String,
      },
      {
        name: 'payload',
        description: '[Optional] Represents the event(Event function)/request_body(HTTP function) passed to the function',
        type: String,
      },
      {
        name: 'payload-file',
        description: '[Optional] Represents the the event(Event function)/request_body(HTTP function)/postman-export-json-file which be readed from file to pass to the function',
        type: String,
      },
      {
        name: 'rt',
        description: '[Optional] Max response time, only for --eval-type concurrency/concurrencyPostman',
        type: Number,
      },
      {
        name: 'run-count',
        description: '[Optional] Number of Invoke Function, only for --eval-type memory',
        type: Number,
      },
      {
        name: 'memory',
        description: '[Optional] Function memory of power tuning, only for --eval-type concurrency/concurrencyPostman',
        type: Number,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s eval start --eval-type memory --run-count 10 --payload-file ./payload.file  --memory-size 128,256,512,1024',
      "$ s eval start --eval-type concurrency --memory 1536 --concurrency-args 2,20,5 --rt 250 --method get --path '/login' --query 'a=1&b=2'",
      '$ s eval start --eval-type concurrencyPostman --memory 1536 --concurrency-args 2,20,5 --rt 250 --payload-file ./postman.json ',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      "$ s cli fc eval start --region cn-hangzhou --function-name functionName --service-name serviceName --eval-type memory --run-count 10 --payload 'hello world' --memory-size 128,256,512,1024 --access default",
      "$ s cli fc eval start --region cn-hangzhou --function-name functionName --service-name serviceName --eval-type concurrency --memory 1536 --concurrency-args 2,30,5 --rt 250  --method get --path '/login' --query 'a=1&b=2' --access default",
      '$ s cli fc eval start --region cn-hangzhou --function-name functionName --service-name serviceName --eval-type concurrencyPostman --memory 1536 --concurrency-args 2,20,5 --rt 250 --payload-file ./postman.json --access default',
    ],
  },
];
