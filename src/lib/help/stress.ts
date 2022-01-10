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
