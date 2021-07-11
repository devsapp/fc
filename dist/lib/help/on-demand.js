"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ONDEMAND_DELETE = exports.ONDEMAND_GET = exports.ONDEMAND_PUT = exports.ONDEMAND_LIST = exports.ONDEMAND = void 0;
exports.ONDEMAND = [
    {
        header: 'OnDemand',
        content: 'Resource OnDemand operation',
    },
    {
        header: 'Usage',
        content: '$ s onDemand <sub-command>',
    },
    {
        header: 'SubCommand',
        content: [
            {
                desc: 'list',
                example: 'View the list of resource on-demand, you can get help through [s onDemand list -h]',
            },
            {
                desc: 'put',
                example: 'Put resource on-demand, you can get help through [s onDemand get -h]',
            },
            {
                desc: 'get',
                example: 'Get resource on-demand, you can get help through [s onDemand get -h]',
            },
            {
                desc: 'delete',
                example: 'Delete resource on-demand, you can get help through [s onDemand get -h]',
            },
        ],
    },
];
exports.ONDEMAND_LIST = [
    {
        header: 'onDemand list',
        content: 'View the list of onDemand',
    },
    {
        header: 'Usage',
        content: '$ s onDemand list',
    },
    {
        header: 'Command List',
        optionList: [
            {
                name: 'region',
                description: 'Specify the region parameter',
                type: String,
            },
            {
                name: 'service-name',
                description: 'Specify the service name parameter',
                type: String,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'access',
                description: 'Specify key alias',
                alias: 'a',
                type: Boolean,
            },
            {
                name: 'help',
                description: 'Display help for command',
                alias: 'h',
                type: Boolean,
            },
            {
                name: 'table',
                description: 'Table format output',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples with Yaml',
        content: [
            '$ s onDemand list',
            '$ s exec -- onDemand list',
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli fc onDemand list --region cn-hangzhou --service-name name',
        ],
    },
];
exports.ONDEMAND_PUT = [
    {
        header: 'onDemand put',
        content: 'Set reserved configuration',
    },
    {
        header: 'Usage',
        content: '$ s onDemand put',
    },
    {
        header: 'Command List',
        optionList: [
            {
                name: 'region',
                description: 'Specify the region parameter',
                type: String,
            },
            {
                name: 'service-name',
                description: 'Specify the service name parameter',
                type: String,
            },
            {
                name: 'qualifier',
                description: 'Specify the qualifier parameter. Only supports LATEST and alias',
                type: String,
            },
            {
                name: 'maximum-instance-count',
                description: 'Specify the maximumInstanceCount parameter',
                alias: '-max',
                type: Number,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'access',
                description: 'Specify key alias',
                alias: 'a',
                type: Boolean,
            },
            {
                name: 'help',
                description: 'Display help for command',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples with Yaml',
        content: [
            '$ s onDemand put --qualifier pre --max 1',
            '$ s onDemand put --qualifier pre --maximum-instance-count 1',
            '$ s exec -- onDemand put --qualifier pre --max 1',
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli fc onDemand put --region cn-hangzhou --service-name name --function-name name --qualifier pre --max 1',
        ],
    },
];
exports.ONDEMAND_GET = [
    {
        header: 'onDemand get',
        content: 'Get onDemand configuration',
    },
    {
        header: 'Usage',
        content: '$ s onDemand get',
    },
    {
        header: 'Command List',
        optionList: [
            {
                name: 'region',
                description: 'Specify the region parameter',
                type: String,
            },
            {
                name: 'service-name',
                description: 'Specify the service name parameter',
                type: String,
            },
            {
                name: 'qualifier',
                description: 'Specify the qualifier parameter. Only supports LATEST and alias',
                type: String,
            },
            {
                name: 'function-name',
                description: 'Specify the function name parameter',
                type: String,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'access',
                description: 'Specify key alias',
                alias: 'a',
                type: Boolean,
            },
            {
                name: 'help',
                description: 'Display help for command',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples with Yaml',
        content: [
            '$ s onDemand get --qualifier pre',
            '$ s exec -- onDemand get --qualifier pre',
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli fc onDemand get --region cn-hangzhou --service-name name --function-name name --qualifier pre',
        ],
    },
];
exports.ONDEMAND_DELETE = [
    {
        header: 'onDemand delete',
        content: 'Delete onDemand configuration',
    },
    {
        header: 'Usage',
        content: '$ s onDemand delete',
    },
    {
        header: 'Command List',
        optionList: [
            {
                name: 'region',
                description: 'Specify the region parameter',
                type: String,
            },
            {
                name: 'service-name',
                description: 'Specify the service name parameter',
                type: String,
            },
            {
                name: 'qualifier',
                description: 'Specify the qualifier parameter. Only supports LATEST and alias',
                type: String,
            },
            {
                name: 'function-name',
                description: 'Specify the function name parameter',
                type: String,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'access',
                description: 'Specify key alias',
                alias: 'a',
                type: Boolean,
            },
            {
                name: 'help',
                description: 'Display help for command',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples with Yaml',
        content: [
            '$ s onDemand delete --qualifier pre',
            '$ s exec -- onDemand delete --qualifier pre',
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli fc onDemand delete --region cn-hangzhou --service-name name --function-name name --qualifier pre',
        ],
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib24tZGVtYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9oZWxwL29uLWRlbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLFFBQVEsR0FBRztJQUN0QjtRQUNFLE1BQU0sRUFBRSxVQUFVO1FBQ2xCLE9BQU8sRUFBRSw2QkFBNkI7S0FDdkM7SUFDRDtRQUNFLE1BQU0sRUFBRSxPQUFPO1FBQ2YsT0FBTyxFQUFFLDRCQUE0QjtLQUN0QztJQUNEO1FBQ0UsTUFBTSxFQUFFLFlBQVk7UUFDcEIsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsSUFBSSxFQUFFLE1BQU07Z0JBQ1osT0FBTyxFQUFFLG9GQUFvRjthQUM5RjtZQUNEO2dCQUNFLElBQUksRUFBRSxLQUFLO2dCQUNYLE9BQU8sRUFBRSxzRUFBc0U7YUFDaEY7WUFDRDtnQkFDRSxJQUFJLEVBQUUsS0FBSztnQkFDWCxPQUFPLEVBQUUsc0VBQXNFO2FBQ2hGO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHlFQUF5RTthQUNuRjtTQUNGO0tBQ0Y7Q0FDRixDQUFDO0FBRVcsUUFBQSxhQUFhLEdBQUc7SUFDM0I7UUFDRSxNQUFNLEVBQUUsZUFBZTtRQUN2QixPQUFPLEVBQUUsMkJBQTJCO0tBQ3JDO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsT0FBTztRQUNmLE9BQU8sRUFBRSxtQkFBbUI7S0FDN0I7SUFDRDtRQUNFLE1BQU0sRUFBRSxjQUFjO1FBQ3RCLFVBQVUsRUFBRTtZQUNWO2dCQUNFLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSw4QkFBOEI7Z0JBQzNDLElBQUksRUFBRSxNQUFNO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsY0FBYztnQkFDcEIsV0FBVyxFQUFFLG9DQUFvQztnQkFDakQsSUFBSSxFQUFFLE1BQU07YUFDYjtTQUNGO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxnQkFBZ0I7UUFDeEIs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