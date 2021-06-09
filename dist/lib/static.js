"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NAS_SUB_COMMAND_HELP_INFO = exports.NAS_HELP_INFO = exports.LOGS_HELP_INFO = exports.LOCAL_HELP_INFO = exports.COMPONENT_HELP_INFO = void 0;
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
            { example: '$ s exec -- nas upload <option>' },
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
            { example: '$ s exec -- nas download <option>' },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9zdGF0aWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxtQkFBbUIsR0FBRztJQUNqQztRQUNFLE1BQU0sRUFBRSxjQUFjO1FBQ3RCLE9BQU8sRUFBRSw2RkFBNkY7S0FDdkc7SUFDRDtRQUNFLE1BQU0sRUFBRSxPQUFPO1FBQ2YsT0FBTyxFQUFFLHlCQUF5QjtLQUNuQztJQUNEO1FBQ0UsTUFBTSxFQUFFLGNBQWM7UUFDdEIsT0FBTyxFQUFFO1lBQ1AsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRTtZQUN0RCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLGdDQUFnQyxFQUFFO1lBQzdELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUU7WUFDN0QsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxxQ0FBcUMsRUFBRTtZQUNqRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLDBEQUEwRCxFQUFFO1lBQ3JGLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsa0RBQWtELEVBQUU7WUFDOUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSwwREFBMEQsRUFBRTtZQUNyRixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLG9EQUFvRCxFQUFFO1lBQy9FLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsMkRBQTJELEVBQUU7WUFDekYsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxrREFBa0QsRUFBRTtTQUM3RTtLQUNGO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsZ0JBQWdCO1FBQ3hCLFVBQVUsRUFBRTtZQUNWO2dCQUNFLElBQUksRUFBRSxXQUFXO2dCQUNqQixX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