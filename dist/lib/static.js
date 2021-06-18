"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STRESS_SUB_COMMAND_HELP_INFO = exports.STRESS_HTLP_INFO = exports.BUILD_HELP_INFO = exports.LOCAL_START_HELP_INFO = exports.LOCAL_INVOKE_HELP_INFO = exports.INVOKE_HELP_INFO = exports.NAS_SUB_COMMAND_HELP_INFO = exports.NAS_HELP_INFO = exports.METRICS_HELP_INFO = exports.LOGS_HELP_INFO = exports.LOCAL_HELP_INFO = exports.COMPONENT_HELP_INFO = void 0;
exports.COMPONENT_HELP_INFO = [
    {
        header: 'fc component',
        content: 'You can use the component to manager and develop your alicloud function computer resources.',
    },
    {
        header: 'Usage',
        content: '$ s <command> <options>',
    },
    {
        header: 'Command List',
        content: [
            { name: 'help', summary: 'Display help information.' },
            { name: 'deploy', summary: 'Deploy serverless application.' },
            { name: 'remove', summary: 'Remove serverless application.' },
            { name: 'local', summary: 'Local debug serverless application.' },
            { name: 'info', summary: 'Get information of alicloud function computer resources.' },
            { name: 'build', summary: 'Build artifacts for your serverless application.' },
            { name: 'sync', summary: 'Sync remote serverless application config/code to local.' },
            { name: 'logs', summary: 'Get the logs of the remote serverless application.' },
            { name: 'metrics', summary: 'Display the metrics of the remote serverless application.' },
            { name: 'nas', summary: 'Manage the file resource in the NAS file system.' },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'assumeYes',
                description: 'Assume that the answer to any question which would be asked is yes.',
                alias: 'y',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples with Yaml',
        content: [
            '$ fc {bold deploy} --help',
            '$ fc {bold remove} --help',
            '$ fc {bold help}',
        ],
    },
];
exports.LOCAL_HELP_INFO = [
    {
        header: 'Local',
        content: 'Run your serverless application locally for quick development & testing.',
    },
    {
        header: 'Usage',
        content: '$ s local <sub-command>',
    },
    {
        header: 'SubCommand List',
        content: [
            { name: 'invoke', summary: 'Local start fc event function, you can get help through [s local invoke -h]' },
            { name: 'start', summary: 'Local invoke fc http function, you can get help through [s local start -h]' },
        ],
    },
];
exports.LOGS_HELP_INFO = [
    {
        header: 'Logs',
        content: 'Query the function log. You need to open SLS log service.',
    },
    {
        header: 'Usage',
        content: '$ s logs <options> ',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'tail',
                description: 'Continuous log output mode',
                alias: 't',
                defaultOption: false,
                type: Boolean,
            },
            {
                name: 'start-time',
                description: 'Query log start time (Timestamp or time format，like 1611827290000 or 2021-11-11T11:11:12+00:00)',
                alias: 's',
                defaultOption: false,
                type: String,
            },
            {
                name: 'end-time',
                description: 'Query log end time (Timestamp or time format，like 1611827290000 or 2021-11-11T11:11:12+00:00)',
                alias: 'e',
                defaultOption: false,
                type: String,
            },
            {
                name: 'keyword',
                description: 'Keyword query',
                alias: 'k',
                defaultOption: false,
                type: String,
            },
            {
                name: 'request-id',
                description: 'Query according to requestId within the time interval',
                alias: 'r',
                defaultOption: false,
                type: String,
            },
            {
                name: 'type',
                description: 'Log type query, value: failed',
                defaultOption: false,
                type: String,
            },
            {
                name: 'region',
                description: 'Specify the region parameter',
                defaultOption: false,
                type: String,
            },
            {
                name: 'service-name',
                description: 'Specify the service name parameter',
                defaultOption: false,
                type: String,
            },
            {
                name: 'function-name',
                description: 'Specify the function name parameter',
                defaultOption: false,
                type: String,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'access',
                description: 'Specify key alias.',
                alias: 'a',
                type: Boolean,
            },
            {
                name: 'help',
                description: 'Display help for command.',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples with Yaml',
        content: [
            {
                desc: 'Query logs in the time interval',
                example: '$ s exec -- logs -s 2021-06-07T02:54:00+08:00 -e 2021-06-07T02:54:59+08:00',
            },
            {
                desc: 'Continuous log output mode',
                example: '$ s exec -- logs -t',
            },
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            {
                example: '$ s cli fc logs --region cn-hangzhou --service-name myService --function-name myFunction -t',
            },
        ],
    },
];
exports.METRICS_HELP_INFO = [
    {
        header: 'Metrics',
        content: 'Query function metrics information',
    },
    {
        header: 'Usage',
        content: '$ s metrcis <options> ',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'region',
                description: 'Specify the region parameter',
                defaultOption: false,
                type: String,
            },
            {
                name: 'service-name',
                description: 'Specify the service name parameter',
                defaultOption: false,
                type: String,
            },
            {
                name: 'function-name',
                description: 'Specify the function name parameter',
                defaultOption: false,
                type: String,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'access',
                description: 'Specify key alias.',
                alias: 'a',
                type: Boolean,
            },
            {
                name: 'help',
                description: 'Display help for command.',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples with Yaml',
        content: [
            {
                example: '$ s metrcis',
            },
            {
                example: '$ s <ProjectName> metrcis',
            },
            {
                example: '$ s exec -- metrcis --region ch-hangzhou --service-name myService --function-name myFunction',
            },
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            {
                example: '$ s cli fc metrcis --region ch-hangzhou --service-name myService --function-name myFunction',
            },
        ],
    },
];
exports.NAS_HELP_INFO = [
    {
        header: 'Nas',
        content: 'Upload and download files for NAS service.',
    },
    {
        header: 'Usage',
        content: '$ s exec -- nas <sub-command>',
    },
    {
        header: 'SubCommand',
        content: [
            {
                desc: 'download',
                example: 'Download resources, you can get help through [s nas download -h]',
            },
            {
                desc: 'upload',
                example: 'Upload resources, you can get help through [s nas upload -h]',
            },
            {
                desc: 'command',
                example: 'Execute relevant instructions, you can get help through [s nas command -h]',
            },
        ],
    },
];
var UPLOADHELP = [
    {
        header: 'nas Upload',
        content: 'Upload resources.',
    },
    {
        header: 'Usage',
        content: [
            { example: '$ s nas upload <options> <src_path> <fc_dir>' },
        ],
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'recursive',
                description: 'Iterate to copy folder content',
                alias: 'r',
                defaultOption: false,
                type: Boolean,
            },
            {
                name: 'no-clobber',
                description: 'Do not override existing files',
                alias: 'n',
                defaultOption: false,
                type: Boolean,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'help',
                description: 'Upload help for command',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples with Yaml',
        content: [
            {
                example: '$ s exec -- nas upload /home/usr/demo.file nas://<fc_dir>',
            },
        ],
    },
    {
        header: 'Examples',
        content: [
            {
                example: '$ s exec -- upload /home/usr/demo.file nas://<fc_dir>',
            },
        ],
    },
];
var DOWNLOADHELP = [
    {
        header: 'Nas Download',
        content: 'Download resources.',
    },
    {
        header: 'Usage',
        content: [
            { example: '$ s nas download <options> <fc_dir> <src_path>' },
        ],
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'recursive',
                description: 'Iterate to copy folder content',
                alias: 'r',
                defaultOption: false,
                type: Boolean,
            },
            {
                name: 'no-clobber',
                description: 'Do not override existing files',
                alias: 'n',
                defaultOption: false,
                type: Boolean,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'help',
                description: 'Download help for command',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples with Yaml',
        content: [
            {
                example: '$ s exec -- nas download nas://<fc_dir> /home/usr/demo',
            },
        ],
    },
];
var COMMANDHELP = [
    {
        header: 'nas Command',
        content: 'Operation instruction.',
    },
    {
        header: 'Usage',
        content: [
            { example: '$ s exec -- nas command <option>' },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'help',
                description: 'Download help for command',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples',
        content: [
            {
                example: '$ s exec -- nas command ls nas:///<nas_dir>',
            },
        ],
    },
];
exports.NAS_SUB_COMMAND_HELP_INFO = {
    download: DOWNLOADHELP,
    upload: UPLOADHELP,
    command: COMMANDHELP,
    // fc 组件不推的几个指令，但是支持
    remove: [],
    deploy: [],
    ls: [],
    cp: [],
    rm: [],
};
exports.INVOKE_HELP_INFO = [
    {
        header: 'Invoke',
        content: 'Invoke/trigger online functions.',
    },
    {
        header: 'Usage',
        content: '$ s invoke <options>',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'invocation-type',
                description: 'Invocation type: optional value "async"|"sync", default value "sync" (default: "sync")',
                alias: 't',
                type: String,
            },
            {
                name: 'event',
                description: 'Event data (strings) passed to the function during invocation (default: "").Http function format refers to [https://github.com/devsapp/fc-remote-invoke#特别说明]',
                alias: 'e',
                type: String,
            },
            {
                name: 'event-file',
                description: 'Event funtion: A file containing event data passed to the function during invoke. Http function: A file containing http request options sent to http trigger. Format refers to [https://github.com/devsapp/fc-remote-invoke#特别说明]',
                alias: 'f',
                type: String,
            },
            {
                name: 'event-stdin',
                description: 'Read from standard input, to support script pipeline.Http function format refers to [https://github.com/devsapp/fc-remote-invoke#特别说明]',
                alias: 's',
                type: Boolean,
            },
            {
                name: 'region',
                description: 'Specify region in cli mode',
                type: String,
            },
            {
                name: 'service-name',
                description: 'Specify service name in cli mode',
                type: String,
            },
            {
                name: 'function-name',
                description: 'Specify function name in cli mode',
                type: String,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'access',
                description: 'Specify key alias.',
                alias: 'a',
                type: Boolean,
            },
            {
                name: 'help',
                description: 'fc-remote-invoke help for command.',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples with Yaml',
        content: [
            '$ s invoke',
            '$ s <ProjectName> invoke',
            '$ s exec -- invoke --invocation-type sync --event <payload>',
            '$ s exec -- invoke --event-file <file-path>',
            '$ s exec -- invoke --event-stdin',
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            {
                example: '$ s cli fc invoke --region cn-hangzhou --service-name myService --function-name myFunction --event <payload>',
            },
            {
                example: '$ s cli fc invoke --region cn-hangzhou --service-name myService --function-name myFunction --event-file <file-path>',
            },
            {
                example: '$ s cli fc invoke --region cn-hangzhou --service-name myService --function-name myFunction --event-stdin',
            },
            {
                example: '\nYou also can refer to the usage of fc-api and execute [s cli fc-api -h] for help.   $ s cli fc-api invokeFunction -h',
            },
        ],
    },
];
exports.LOCAL_INVOKE_HELP_INFO = [
    {
        header: 'Local Invoke',
        content: 'Local invoke fc event function',
    },
    {
        header: 'Usage',
        content: '$ s local invoke <options>',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'event',
                typeLabel: '{underline <event>}',
                description: 'Support Event data(strings) or a file containing event data passed to the function during invocation.',
                alias: 'e',
                type: String,
            },
            {
                name: 'event-file',
                typeLabel: '{underline <path>}',
                description: 'A file containing event data passed to the function during invoke.',
                alias: 'f',
                type: String,
            },
            {
                name: 'event-stdin',
                description: 'Read from standard input, to support script pipeline.',
                alias: 's',
                type: Boolean,
            },
            {
                name: 'mode',
                typeLabel: '{underline <mode>}',
                description: "Invoke mode, including api, server and normal:\n          - api: start api server for invokeFunction api invoking.\n          - server: start server container for invoking function in the other terminal repeatedly.\n          - normal: default mode, invoke event function and then close the container.",
                alias: 'm',
                type: String,
            },
            {
                name: 'config',
                typeLabel: '{underline ide/debugger}',
                description: 'Select which IDE to use when debugging and output related debug config tips for the IDE. Options：\'vscode\', \'pycharm\'.',
                alias: 'c',
                type: String,
            },
            {
                name: 'debug-port',
                typeLabel: '{underline <port>}',
                description: 'Specify the sandboxed container starting in debug mode, and exposing this port on localhos.',
                alias: 'd',
                type: Number,
            },
            {
                name: 'debug-args',
                typeLabel: '{underline <debugArgs>}',
                description: 'Additional parameters that will be passed to the debugger',
                type: String,
            },
            {
                name: 'debugger-path',
                typeLabel: '{underline <debuggerPath>}',
                description: 'The path of the debugger on the host',
                type: String,
            },
            {
                name: 'tmp-dir',
                typeLabel: '{underline <tmpDir>}',
                description: 'The temp directory mounted to /tmp , default to \'./.s/tmp/invoke/serviceName/functionName/\'',
                type: String,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'help',
                description: 'Display help for command.',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples with Yaml',
        content: [
            '$ s {bold local invoke} [{bold --debug-port} {underline 9000}] [{bold --config} {underline vscode}]',
            '$ s exec -- {bold local invoke} [{bold --debug-port} {underline 9000}] [{bold --config} {underline vscode}]',
        ],
    },
];
exports.LOCAL_START_HELP_INFO = [
    {
        header: 'Local Start',
        content: 'Local invoke fc http function',
    },
    {
        header: 'Usage for',
        content: '$ s local start <options>',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'config',
                typeLabel: '{underline ide/debugger}',
                description: 'Select which IDE to use when debugging and output related debug config tips for the IDE. Options：\'vscode\', \'pycharm\'.',
                alias: 'c',
                type: String,
            },
            {
                name: 'debug-port',
                typeLabel: '{underline <port>}',
                description: 'Specify the sandboxed container starting in debug mode, and exposing this port on localhos.',
                alias: 'd',
                type: Number,
            },
            {
                name: 'debug-args',
                typeLabel: '{underline <debugArgs>}',
                description: 'Additional parameters that will be passed to the debugger',
                type: String,
            },
            {
                name: 'debugger-path',
                typeLabel: '{underline <debuggerPath>}',
                description: 'The path of the debugger on the host',
                type: String,
            },
            {
                name: 'tmp-dir',
                typeLabel: '{underline <tmpDir>}',
                description: 'The temp directory mounted to /tmp , default to \'./.s/tmp/invoke/serviceName/functionName/\'',
                type: String,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'help',
                description: 'Display help for command.',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples with Yaml',
        content: [
            '$ s {bold local start} [{bold --debug-port} {underline 9000}] [{bold --config} {underline vscode}]',
            '$ s exec -- {bold local start} [{bold --debug-port} {underline 9000}] [{bold --config} {underline vscode}]',
        ],
    },
];
exports.BUILD_HELP_INFO = [
    {
        header: 'Build',
        content: 'Build the dependencies.',
    },
    {
        header: 'Usage',
        content: [
            { example: '$ s exec -- build <option>' },
        ],
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'dockerfile',
                description: 'Specify the dockerfile path',
                alias: 'f',
                defaultOption: false,
                type: String,
            },
            {
                name: 'use-docker',
                description: 'Use docker container to build functions',
                alias: 'd',
                defaultOption: false,
                type: String,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'help',
                description: 'Build help for command',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples with Yaml',
        content: [
            {
                example: '$ s build --use-docker',
            },
            {
                example: '$ s <ProjectName> build',
            },
            {
                example: '$ s build --use-docker ',
            },
            {
                example: '$ s exec -- build',
            },
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            {
                example: '$ s cli fc build --use-docker ',
            },
        ],
    },
];
exports.STRESS_HTLP_INFO = [
    {
        header: 'Stress',
        content: 'Stress test for the serverless application.',
    },
    {
        header: 'Usage',
        content: '$ s stress <sub-command>',
    },
    {
        header: 'SubCommand List',
        content: [
            { name: 'start', summary: 'Start stress test, you can get help through [s stress start -h]' },
            { name: 'clean', summary: 'Clean the relevant resources , you can get help through [s stress clean -h]' },
        ],
    },
];
var STRESS_START_HELP_INFO = [
    {
        header: 'Start',
        content: 'Start stress test',
    },
    {
        header: 'Usage',
        content: '$ s stress start <options>',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'num-user',
                typeLabel: '{underline numUser}',
                description: 'Number of the simulated users.',
                type: Number,
            },
            {
                name: 'spawn-rate',
                typeLabel: '{underline spawnRate}',
                description: 'Increasing number of users per second.',
                type: Number,
            },
            {
                name: 'run-time',
                typeLabel: '{underline time}',
                description: 'Intervals for stress.',
                type: Number,
            },
            {
                name: 'function-type',
                typeLabel: '{underline functionType}',
                description: 'Type of the target function, including event and http.',
                type: String,
            },
            {
                name: 'service-name',
                typeLabel: '{underline serviceName}',
                description: 'Target service, only for --function-type event.',
                type: String,
            },
            {
                name: 'function-name',
                typeLabel: '{underline functionName}',
                description: 'Target function, only for --function-type event.',
                type: String,
            },
            {
                name: 'qualifier',
                typeLabel: '{underline qualifier}',
                description: 'Qualifier of the target function, only for --function-type event.',
                alias: 'q',
                type: String,
            },
            {
                name: 'url',
                typeLabel: '{underline url}',
                description: 'Target url, only for --function-type http.',
                alias: 'u',
                type: String,
            },
            {
                name: 'method',
                typeLabel: '{underline method}',
                description: 'Target method, only for --function-type http.',
                alias: 'm',
                type: String,
            },
            {
                name: 'payload',
                typeLabel: '{underline payload}',
                description: 'For --function-type event, represents the event passed to the function;\nFor --function-type http, represents the request body passed to the function.',
                alias: 'p',
                type: String,
            },
            {
                name: 'payload-file',
                typeLabel: '{underline path}',
                description: 'For --function-type event, contains the event passed to the function;\nFor --function-type http, contains the request body passed to the function.',
                alias: 'f',
                type: String,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'region',
                typeLabel: '{underline region}',
                description: 'Target region.',
                alias: 'r',
                type: String,
            },
            {
                name: 'access',
                typeLabel: '{underline access}',
                description: 'Specify key alias.',
                alias: 'a',
                type: String,
            },
            {
                name: 'help',
                description: 'Display help for command.',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples with Yaml',
        content: [
            '$ s stress start --payload-file ./payload.file',
            '$ s stress start --num-user 6 --spawn-rate 10 --run-time 30 --url myUrl --method POST --payload "hello world"',
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli fc stress start --num-user 6 --spawn-rate 10 --run-time 30 --function-type event --service-name myService --function-name myFunction --qualifier myQualifier --payload "hello world" --region myRegion --access myAccess',
            '$ s cli fc stress start --num-user 6 --spawn-rate 10 --run-time 30 --function-type http --url myUrl --method POST --payload "hello world" --region myRegion --access myAccess',
        ],
    },
];
var STRESS_CLEAN_HELP_INFO = [
    {
        header: 'Clean',
        content: 'Clean the relevant resources',
    },
    {
        header: 'Usage',
        content: '$ s stress clean <options>',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'assume-yes',
                description: 'Number of the simulated users.',
                alias: 'y',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'region',
                typeLabel: '{underline region}',
                description: 'Target region.',
                alias: 'r',
                type: String,
            },
            {
                name: 'access',
                typeLabel: '{underline access}',
                description: 'Specify key alias.',
                alias: 'a',
                type: String,
            },
            {
                name: 'help',
                description: 'Display help for command.',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples with Yaml',
        content: [
            '$ s stress clean -y',
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli fc stress clean --region myRegion --access myAccess -y',
        ],
    },
];
exports.STRESS_SUB_COMMAND_HELP_INFO = {
    start: STRESS_START_HELP_INFO,
    clean: STRESS_CLEAN_HELP_INFO,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9zdGF0aWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxtQkFBbUIsR0FBRztJQUNqQztRQUNFLE1BQU0sRUFBRSxjQUFjO1FBQ3RCLE9BQU8sRUFBRSw2RkFBNkY7S0FDdkc7SUFDRDtRQUNFLE1BQU0sRUFBRSxPQUFPO1FBQ2YsT0FBTyxFQUFFLHlCQUF5QjtLQUNuQztJQUNEO1FBQ0UsTUFBTSxFQUFFLGNBQWM7UUFDdEIsT0FBTyxFQUFFO1lBQ1AsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRTtZQUN0RCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLGdDQUFnQyxFQUFFO1lBQzdELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUU7WUFDN0QsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxxQ0FBcUMsRUFBRTtZQUNqRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLDBEQUEwRCxFQUFFO1lBQ3JGLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsa0RBQWtELEVBQUU7WUFDOUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSwwREFBMEQsRUFBRTtZQUNyRixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLG9EQUFvRCxFQUFFO1lBQy9FLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsMkRBQTJELEVBQUU7WUFDekYsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxrREFBa0QsRUFBRTtTQUM3RTtLQUNGO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsZ0JBQWdCO1FBQ3hCLFVBQVUsRUFBRTtZQUNWO2dCQUNFLElBQUksRUFBRSxXQUFXO2dCQUNqQixX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