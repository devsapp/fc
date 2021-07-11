"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOCAL_START_HELP_INFO = exports.LOCAL_INVOKE_HELP_INFO = exports.LOCAL_HELP_INFO = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2hlbHAvbG9jYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxlQUFlLEdBQUc7SUFDN0I7UUFDRSxNQUFNLEVBQUUsT0FBTztRQUNmLE9BQU8sRUFBRSwwRUFBMEU7S0FDcEY7SUFDRDtRQUNFLE1BQU0sRUFBRSxPQUFPO1FBQ2YsT0FBTyxFQUFFLHlCQUF5QjtLQUNuQztJQUNEO1FBQ0UsTUFBTSxFQUFFLGlCQUFpQjtRQUN6QixPQUFPLEVBQUU7WUFDUCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLDZFQUE2RSxFQUFFO1lBQzFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsNEVBQTRFLEVBQUU7U0FDekc7S0FDRjtDQUNGLENBQUM7QUFFVyxRQUFBLHNCQUFzQixHQUFHO0lBQ3BDO1FBQ0UsTUFBTSxFQUFFLGNBQWM7UUFDdEIsT0FBTyxFQUFFLGdDQUFnQztLQUMxQztJQUNEO1FBQ0UsTUFBTSxFQUFFLE9BQU87UUFDZixPQUFPLEVBQUUsNEJBQTRCO0tBQ3RDO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsU0FBUztRQUNqQixVQUFVLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsT0FBTztnQkFDYixTQUFTLEVBQUUscUJBQXFCO2dCQUNoQyxXQUFXLEVBQUUsdUdBQXVHO2dCQUNwSCxLQUFLLEVBQUUsR0FBRztnQkFDVixJQUFJLEVBQUUsTUFBTTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLFNBQVMsRUFBRSxvQkFBb0I7Z0JBQy9CLFdBQVcsRUFBRSxvRUFBb0U7Z0JBQ2pGLEtBQUssRUFBRSxHQUFHO2dCQUNWLElBQUksRUFBRSxNQUFNO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsYUFBYTtnQkFDbkIsV0FBVyxFQUFFLHVEQUF1RDtnQkFDcEUsS0FBSyxFQUFFLEdBQUc7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