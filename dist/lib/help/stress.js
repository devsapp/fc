"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STRESS_SUB_COMMAND_HELP_INFO = exports.STRESS_HTLP_INFO = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9oZWxwL3N0cmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLGdCQUFnQixHQUFHO0lBQzlCO1FBQ0UsTUFBTSxFQUFFLFFBQVE7UUFDaEIsT0FBTyxFQUFFLDZDQUE2QztLQUN2RDtJQUNEO1FBQ0UsTUFBTSxFQUFFLE9BQU87UUFDZixPQUFPLEVBQUUsMEJBQTBCO0tBQ3BDO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLE9BQU8sRUFBRTtZQUNQLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsaUVBQWlFLEVBQUU7WUFDN0YsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSw2RUFBNkUsRUFBRTtTQUMxRztLQUNGO0NBQ0YsQ0FBQztBQUVGLElBQU0sc0JBQXNCLEdBQUc7SUFDN0I7UUFDRSxNQUFNLEVBQUUsT0FBTztRQUNmLE9BQU8sRUFBRSxtQkFBbUI7S0FDN0I7SUFDRDtRQUNFLE1BQU0sRUFBRSxPQUFPO1FBQ2YsT0FBTyxFQUFFLDRCQUE0QjtLQUN0QztJQUNEO1FBQ0UsTUFBTSxFQUFFLFNBQVM7UUFDakIsVUFBVSxFQUFFO1lBQ1Y7Z0JBQ0UsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLFNBQVMsRUFBRSxxQkFBcUI7Z0JBQ2hDLFdBQVcsRUFBRSxnQ0FBZ0M7Z0JBQzdDLElBQUksRUFBRSxNQUFNO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsU0FBUyxFQUFFLHVCQUF1QjtnQkFDbEMsV0FBVyxFQUFFLHdDQUF3QztnQkFDckQsSUFBSSxFQUFFLE1BQU07YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxVQUFVO2dCQUNoQixTQUFTLEVBQUUsa0JBQWtCO2dCQUM3QixXQUFXLEVBQUUsdUJBQXVCO2dCQUNwQyxJQUFJLEVBQUUsTUFBTTthQUNiO1lBQ0Q7Z0JB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