"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REMOVE_LAYER = exports.REMOVE_ONDEMAND = exports.REMOVE_PROVISION = exports.REMOVE_ALIAS = exports.REMOVE_VERSION = exports.REMOVE_DOMAIN = exports.REMOVE_TRIGGER = exports.REMOVE_FUNCTION = exports.REMOVE_SERVICE = exports.REMOVE = void 0;
exports.REMOVE = [
    {
        header: 'Remove',
        content: 'The ability to delete resources.\nIf executing s remove is equivalent to s remove service',
    },
    {
        header: 'Usage',
        content: '$ s remove <sub-command>',
    },
    {
        header: 'SubCommand List',
        content: [
            {
                desc: 'service',
                example: 'Ability to delete services, you can get help through [s remove service -h]',
            },
            {
                desc: 'function',
                example: 'Ability to delete function, you can get help through [s remove function -h]',
            },
            {
                desc: 'trigger',
                example: 'Ability to delete trigger, you can get help through [s remove trigger -h]',
            },
            {
                desc: 'domain',
                example: 'Ability to delete domain, you can get help through [s remove domain -h]',
            },
            {
                desc: 'version',
                example: 'Ability to delete version, you can get help through [s remove version -h]',
            },
            {
                desc: 'alias',
                example: 'Ability to delete alias, you can get help through [s remove alias -h]',
            },
            {
                desc: 'provision',
                example: 'Ability to delete provision, you can get help through [s remove provision -h]',
            },
            {
                desc: 'onDemand',
                example: 'Ability to delete onDemand, you can get help through [s remove onDemand -h]',
            },
            {
                desc: 'layer',
                example: 'Ability to delete layer, you can get help through [s remove layer -h]',
            },
        ],
    },
];
var GLOBAL_OPTIONS = [
    {
        name: 'help',
        description: 'Help for command',
        alias: 'h',
        type: Boolean,
    },
    {
        name: 'access',
        description: 'Specify key alias',
        alias: 'a',
        type: String,
    },
    {
        name: 'debug',
        description: 'Output debug informations',
        type: Boolean,
    },
];
exports.REMOVE_SERVICE = [
    {
        header: 'Remove service',
        content: 'Remove the specified service resource',
    },
    {
        header: 'Usage',
        content: '$ s remove service <options>',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'region',
                description: 'Specify the region of alicloud',
                type: String,
            },
            {
                name: 'service-name',
                description: 'Specify the service name of alicloud',
                type: String,
            },
            {
                name: 'use-local',
                description: 'Only delete the incoming service, function, and trigger configuration. Priority is greater than --assume-yes',
                type: Boolean,
            },
            {
                name: 'assume-yes',
                alias: 'y',
                description: 'Forcibly delete all resources under the service, including on-demand resources, provision resources, alias, version, trigger and function. please use with caution',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: GLOBAL_OPTIONS,
    },
    {
        header: 'Examples with Yaml',
        content: [
            '$ s remove service',
            '$ s remove service --use-local',
        ],
    },
];
exports.REMOVE_FUNCTION = [
    {
        header: 'Remove function',
        content: 'Remove the specified function resource',
    },
    {
        header: 'Usage',
        content: '$ s remove function <options>',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'region',
                description: 'Specify the region of alicloud',
                type: String,
            },
            {
                name: 'service-name',
                description: 'Specify the service name of alicloud',
                type: String,
            },
            {
                name: 'function-name',
                description: 'Specify the function name of alicloud',
                type: String,
            },
            {
                name: 'use-local',
                description: 'Only delete the incoming function and trigger configuration. Priority is greater than --assume-yes',
                type: Boolean,
            },
            {
                name: 'assume-yes',
                alias: 'y',
                description: 'Assume that the answer to any question which would be asked is yes',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: GLOBAL_OPTIONS,
    },
    {
        header: 'Examples with Yaml',
        content: [
            '$ s remove function',
            '$ s remove function --use-local',
        ],
    },
];
exports.REMOVE_TRIGGER = [
    {
        header: 'Remove trigger',
        content: 'Remove the specified trigger resource',
    },
    {
        header: 'Usage',
        content: '$ s remove trigger <options>',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'region',
                description: 'Specify the region of alicloud',
                type: String,
            },
            {
                name: 'service-name',
                description: 'Specify the service name of alicloud',
                type: String,
            },
            {
                name: 'function-name',
                description: 'Specify the function name of alicloud',
                type: String,
            },
            {
                name: 'trigger-name',
                description: 'Only delete the specified trigger, if not specified, delete all incoming triggers',
                type: String,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: GLOBAL_OPTIONS,
    },
    {
        header: 'Examples with Yaml',
        content: [
            '$ s remove trigger',
            '$ s remove trigger --trigger-name triggerName',
        ],
    },
];
exports.REMOVE_DOMAIN = [
    {
        header: 'Remove domain',
        content: 'Remove the specified domain resource',
    },
    {
        header: 'Usage',
        content: '$ s remove domain',
    },
    {
        header: 'Global Options',
        optionList: GLOBAL_OPTIONS,
    },
    {
        header: 'Examples with Yaml',
        content: [
            '$ s remove domain',
        ],
    },
];
exports.REMOVE_VERSION = [
    {
        header: 'Remove version',
        content: 'Remove the specified version resource',
    },
    {
        header: 'Usage',
        content: '$ s remove version <options>',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'region',
                description: 'Specify the region of alicloud',
                type: String,
            },
            {
                name: 'service-name',
                description: 'Specify the service name of alicloud',
                type: String,
            },
            {
                name: 'version',
                description: 'If you specify a version, only delete the specified version; if you don’t specify it, try to delete all versions',
                type: String,
            },
            {
                name: 'assume-yes',
                alias: 'y',
                description: 'Assume that the answer to any question which would be asked is yes',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: GLOBAL_OPTIONS,
    },
    {
        header: 'Examples with Yaml',
        content: [
            '$ s remove version',
            '$ s remove version --version-id xxx',
        ],
    },
];
exports.REMOVE_ALIAS = [
    {
        header: 'Remove alias',
        content: 'Remove the specified alias resource',
    },
    {
        header: 'Usage',
        content: '$ s remove alias <options>',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'region',
                description: 'Specify the region of alicloud',
                type: String,
            },
            {
                name: 'service-name',
                description: 'Specify the service name of alicloud',
                type: String,
            },
            {
                name: 'alias-name',
                description: 'If you specify a aliasName, only delete the specified alias; if you don’t specify it, try to delete all alias',
                type: String,
            },
            {
                name: 'assume-yes',
                alias: 'y',
                description: 'Assume that the answer to any question which would be asked is yes',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: GLOBAL_OPTIONS,
    },
    {
        header: 'Examples with Yaml',
        content: [
            '$ s remove alias',
            '$ s remove alias --alias-name xxx',
        ],
    },
];
exports.REMOVE_PROVISION = [
    {
        header: 'Remove provision',
        content: 'Remove the specified provision resource',
    },
    {
        header: 'Usage',
        content: '$ s remove provision <options>',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'region',
                description: 'Specify the region of alicloud',
                type: String,
            },
            {
                name: 'service-name',
                description: 'Specify the service name of alicloud',
                type: String,
            },
            {
                name: 'qualifier',
                description: 'If qualifier is specified, only all provision resources under this alias will be cleared; if not specified, all versions of provision resources under this service will be cleared',
                type: String,
            },
            {
                name: 'function-name',
                description: 'Clear the provision configuration of the specified qualifier function',
                type: String,
            },
            {
                name: 'assume-yes',
                alias: 'y',
                description: 'Assume that the answer to any question which would be asked is yes',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: GLOBAL_OPTIONS,
    },
    {
        header: 'Examples with Yaml',
        content: [
            '$ s remove provision',
            '$ s remove provision --qualifier xxx',
            '$ s remove provision --qualifier xxx --function-name xxx',
        ],
    },
];
exports.REMOVE_ONDEMAND = [
    {
        header: 'Remove onDemand',
        content: 'Remove the specified onDemand resource',
    },
    {
        header: 'Usage',
        content: '$ s remove onDemand <options>',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'region',
                description: 'Specify the region of alicloud',
                type: String,
            },
            {
                name: 'service-name',
                description: 'Specify the service name of alicloud',
                type: String,
            },
            {
                name: 'qualifier',
                description: 'If qualifier is specified, only all onDemand resources under this alias will be cleared; if not specified, all versions of onDemand resources under this service will be cleared',
                type: String,
            },
            {
                name: 'function-name',
                description: 'Clear the onDemand configuration of the specified qualifier function',
                type: String,
            },
            {
                name: 'assume-yes',
                alias: 'y',
                description: 'Assume that the answer to any question which would be asked is yes',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: GLOBAL_OPTIONS,
    },
    {
        header: 'Examples with Yaml',
        content: [
            '$ s remove onDemand',
            '$ s remove onDemand --qualifier xxx',
            '$ s remove onDemand --qualifier xxx --function-name xxx',
        ],
    },
];
exports.REMOVE_LAYER = [
    {
        header: 'Remove layer',
        content: 'Remove the specified layer resource',
    },
    {
        header: 'Usage',
        content: '$ s remove layer',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'region',
                description: 'Specify the region of alicloud',
                type: String,
            },
            {
                name: 'layer-name',
                description: 'Delete all versions of the specified layer',
                type: String,
            },
            {
                name: 'version',
                description: 'Only delete the version of the specified layer',
                type: String,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: GLOBAL_OPTIONS,
    },
    {
        header: 'Examples with Yaml',
        content: [
            '$ s remove layer --layer-name xxx',
            '$ s remove layer --layer-name xxx --version-id xxx',
        ],
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9oZWxwL3JlbW92ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLE1BQU0sR0FBRztJQUNwQjtRQUNFLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLE9BQU8sRUFBRSwyRkFBMkY7S0FDckc7SUFDRDtRQUNFLE1BQU0sRUFBRSxPQUFPO1FBQ2YsT0FBTyxFQUFFLDBCQUEwQjtLQUNwQztJQUNEO1FBQ0UsTUFBTSxFQUFFLGlCQUFpQjtRQUN6QixPQUFPLEVBQUU7WUFDUDtnQkFDRSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsNEVBQTRFO2FBQ3RGO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE9BQU8sRUFBRSw2RUFBNkU7YUFDdkY7WUFDRDtnQkFDRSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsMkVBQTJFO2FBQ3JGO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHlFQUF5RTthQUNuRjtZQUNEO2dCQUNFLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSwyRUFBMkU7YUFDckY7WUFDRDtnQkFDRSxJQUFJLEVBQUUsT0FBTztnQkFDYixPQUFPLEVBQUUsdUVBQXVFO2FBQ2pGO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLE9BQU8sRUFBRSwrRUFBK0U7YUFDekY7WUFDRDtnQkFDRSxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsT0FBTyxFQUFFLDZFQUE2RTthQUN2RjtZQUNEO2dCQUNFLElBQUksRUFBRSxPQUFPO2dCQUNiLE9BQU8sRUFBRSx1RUFBdUU7YUFDakY7U0FDRjtLQUNGO0NBQ0YsQ0FBQztBQUVGLElBQU0sY0FBYyxHQUFHO0lBQ3JCO1FBQ0UsSUFBSSxFQUFFLE1BQU07UUFDWixXQUFXLEVBQUUsa0JBQWtCO1FBQy9CLEtBQUssRUFBRSxHQUFHO1FBQ1YsSUFBSSxFQUFFLE9BQU87S0FDZDtJQUNEO1FBQ0UsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsbUJBQW1CO1FBQ2hDLEtBQUssRUFBRSxHQUFHO1FBQ1YsSUFBSSxFQUFFLE1BQU07S0FDYjtJQUNEO1FBQ0UsSUFBSSxFQUFFLE9BQU87UUFDYixXQUFXLEVBQUUsMkJBQTJCO1FBQ3hDLElBQUksRUFBRSxPQUFPO0tBQ2Q7Q0FDRixDQUFDO0FBRVcsUUFBQSxjQUFjLEdBQUc7SUFDNUI7UUFDRSxNQUFNLEVBQUUsZ0JBQWdCO1FBQ3hCLE9BQU8sRUFBRSx1Q0FBdUM7S0FDakQ7SUFDRDtRQUNFLE1BQU0sRUFBRSxPQUFPO1FBQ2YsT0FBTyxFQUFFLDhCQUE4QjtLQUN4QztJQUNEO1FBQ0UsTUFBTSxFQUFFLFNBQVM7UUFDakIsVUFBVSxFQUFFO1lBQ1Y7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLGdDQUFnQztnQkFDN0MsSUFBSSxFQUFFLE1BQU07YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxjQUFjO2dCQUNwQixXQUFXLEVBQUUsc0NBQXNDO2dCQUNuRCxJQUFJLEVBQUUsTUFBTTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLFdBQVcsRUFBRSw4R0FBOEc7Z0JBQzNILElBQUksRUFBRSxPQUFPO2FBQ2Q7WUFDRDtnQkFDRSxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsV0FBVyxFQUFFLG9LQUFvSztnQkFDakwsSUFBSSxFQUFFLE9BQU87YUFDZDtTQUNGO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxnQkFBZ0I7UUFDeEIsVUFBVSxFQUFFLGNBQWM7S0FDM0I7SUFDRDtRQUNFLE1BQU0sRUFBRSxvQkFBb0I7UUFDNUIsT0FBTyxFQUFFO1lBQ1Asb0JBQW9CO1lBQ3BCLGdDQUFnQztTQUNqQztLQUNGO0NBQ0YsQ0FBQztBQUVXLFFBQUEsZUFBZSxHQUFHO0lBQzdCO1FBQ0UsTUFBTSxFQUFFLGlCQUFpQjtRQUN6QixPQUFPLEVBQUUsd0NBQXdDO0tBQ2xEO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsT0FBTztRQUNmLE9BQU8sRUFBRSwrQkFBK0I7S0FDekM7SUFDRDtRQUNFLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLFVBQVUsRUFBRTtZQUNWO2dCQUNFLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSxnQ0FBZ0M7Z0JBQzdDLElBQUksRUFBRSxNQUFNO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsY0FBYztnQkFDcEIsV0FBVyxFQUFFLHNDQUFzQztnQkFDbkQsSUFBSSxFQUFFLE1BQU07YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxlQUFlO2dCQUNyQixXQUFXLEVBQUUsdUNBQXVDO2dCQUNwRCxJQUFJLEVBQUUsTUFBTTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLFdBQVcsRUFBRSxvR0FBb0c7Z0JBQ2pILElBQUksRUFBRSxPQUFPO2FBQ2Q7WUFDRDtnQkFDRSxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsV0FBVyxFQUFFLG9FQUFvRTtnQkFDakYsSUFBSSxFQUFFLE9BQU87YUFDZDtTQUNGO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxnQkFBZ0I7UUFDeEIsVUFBVSxFQUFFLGNBQWM7S0FDM0I7SUFDRDtRQUNFLE1BQU0sRUFBRSxvQkFBb0I7UUFDNUIsT0FBTyxFQUFFO1lBQ1AscUJBQXFCO1lBQ3JCLGlDQUFpQztTQUNsQztLQUNGO0NBQ0YsQ0FBQztBQUVXLFFBQUEsY0FBYyxHQUFHO0lBQzVCO1FBQ0UsTUFBTSxFQUFFLGdCQUFnQjtRQUN4QixPQUFPLEVBQUUsdUNBQXVDO0tBQ2pEO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsT0FBTztRQUNmLE9BQU8sRUFBRSw4QkFBOEI7S0FDeEM7SUFDRDtRQUNFLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLFVBQVUsRUFBRTtZQUNWO2dCQUNFLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSxnQ0FBZ0M7Z0JBQzdDLElBQUksRUFBRSxNQUFNO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsY0FBYztnQkFDcEIsV0FBVyxFQUFFLHNDQUFzQztnQkFDbkQsSUFBSSxFQUFFLE1BQU07YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxlQUFlO2dCQUNyQixXQUFXLEVBQUUsdUNBQXVDO2dCQUNwRCxJQUFJLEVBQUUsTUFBTTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLGNBQWM7Z0JBQ3BCLFdBQVcsRUFBRSxtRkFBbUY7Z0JBQ2hHLElBQUksRUFBRSxNQUFNO2FBQ2I7U0FDRjtLQUNGO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsZ0JBQWdCO1FBQ3hCLFVBQVUsRUFBRSxjQUFjO0tBQzNCO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsb0JBQW9CO1FBQzVCLE9BQU8sRUFBRTtZQUNQLG9CQUFvQjtZQUNwQiwrQ0FBK0M7U0FDaEQ7S0FDRjtDQUNGLENBQUM7QUFFVyxRQUFBLGFBQWEsR0FBRztJQUMzQjtRQUNFLE1BQU0sRUFBRSxlQUFlO1FBQ3ZCLE9BQU8sRUFBRSxzQ0FBc0M7S0FDaEQ7SUFDRDtRQUNFLE1BQU0sRUFBRSxPQUFPO1FBQ2YsT0FBTyxFQUFFLG1CQUFtQjtLQUM3QjtJQUNEO1FBQ0UsTUFBTSxFQUFFLGdCQUFnQjtRQUN4QixVQUFVLEVBQUUsY0FBYztLQUMzQjtJQUNEO1FBQ0UsTUFBTSxFQUFFLG9CQUFvQjtRQUM1QixPQUFPLEVBQUU7WUFDUCxtQkFBbUI7U0FDcEI7S0FDRjtDQUNGLENBQUM7QUFFVyxRQUFBLGNBQWMsR0FBRztJQUM1QjtRQUNFLE1BQU0sRUFBRSxnQkFBZ0I7UUFDeEIsT0FBTyxFQUFFLHVDQUF1QztLQUNqRDtJQUNEO1FBQ0UsTUFBTSxFQUFFLE9BQU87UUFDZixPQUFPLEVBQUUsOEJBQThCO0tBQ3hDO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsU0FBUztRQUNqQixVQUFVLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsZ0NBQWdDO2dCQUM3QyxJQUFJLEVBQUUsTUFBTTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLGNBQWM7Z0JBQ3BCLFdBQVcsRUFBRSxzQ0FBc0M7Z0JBQ25ELElBQUksRUFBRSxNQUFNO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQUUsa0hBQWtIO2dCQUMvSCxJQUFJLEVBQUUsTUFBTTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLEtBQUssRUFBRSxHQUFHO2dCQUNWLFdBQVcsRUFBRSxvRUFBb0U7Z0JBQ2pGLElBQUksRUFBRSxPQUFPO2FBQ2Q7U0FDRjtLQUNGO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsZ0JBQWdCO1FBQ3hCLFVBQVUsRUFBRSxjQUFjO0tBQzNCO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsb0JBQW9CO1FBQzVCLE9BQU8sRUFBRTtZQUNQLG9CQUFvQjtZQUNwQixxQ0FBcUM7U0FDdEM7S0FDRjtDQUNGLENBQUM7QUFFVyxRQUFBLFlBQVksR0FBRztJQUMxQjtRQUNFLE1BQU0sRUFBRSxjQUFjO1FBQ3RCLE9BQU8sRUFBRSxxQ0FBcUM7S0FDL0M7SUFDRDtRQUNFLE1BQU0sRUFBRSxPQUFPO1FBQ2YsT0FBTyxFQUFFLDRCQUE0QjtLQUN0QztJQUNEO1FBQ0UsTUFBTSxFQUFFLFNBQVM7UUFDakIsVUFBVSxFQUFFO1lBQ1Y7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLGdDQUFnQztnQkFDN0MsSUFBSSxFQUFFLE1BQU07YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxjQUFjO2dCQUNwQixXQUFXLEVBQUUsc0NBQXNDO2dCQUNuRCxJQUFJLEVBQUUsTUFBTTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLFdBQVcsRUFBRSwrR0FBK0c7Z0JBQzVILElBQUksRUFBRSxNQUFNO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsV0FBVyxFQUFFLG9FQUFvRTtnQkFDakYsSUFBSSxFQUFFLE9BQU87YUFDZDtTQUNGO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxnQkFBZ0I7UUFDeEIsVUFBVSxFQUFFLGNBQWM7S0FDM0I7SUFDRDtRQUNFLE1BQU0sRUFBRSxvQkFBb0I7UUFDNUIsT0FBTyxFQUFFO1lBQ1Asa0JBQWtCO1lBQ2xCLG1DQUFtQztTQUNwQztLQUNGO0NBQ0YsQ0FBQztBQUVXLFFBQUEsZ0JBQWdCLEdBQUc7SUFDOUI7UUFDRSxNQUFNLEVBQUUsa0JBQWtCO1FBQzFCLE9BQU8sRUFBRSx5Q0FBeUM7S0FDbkQ7SUFDRDtRQUNFLE1BQU0sRUFBRSxPQUFPO1FBQ2YsT0FBTyxFQUFFLGdDQUFnQztLQUMxQztJQUNEO1FBQ0UsTUFBTSxFQUFFLFNBQVM7UUFDakIsVUFBVSxFQUFFO1lBQ1Y7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLGdDQUFnQztnQkFDN0MsSUFBSSxFQUFFLE1BQU07YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxjQUFjO2dCQUNwQixXQUFXLEVBQUUsc0NBQXNDO2dCQUNuRCxJQUFJLEVBQUUsTUFBTTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLFdBQVcsRUFBRSxvTEFBb0w7Z0JBQ2pNLElBQUksRUFBRSxNQUFNO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsZUFBZTtnQkFDckIsV0FBVyxFQUFFLHVFQUF1RTtnQkFDcEYsSUFBSSxFQUFFLE1BQU07YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxZQUFZO2dCQUNsQixLQUFLLEVBQUUsR0FBRztnQkFDVixXQUFXLEVBQUUsb0VBQW9FO2dCQUNqRixJQUFJLEVBQUUsT0FBTzthQUNkO1NBQ0Y7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLGdCQUFnQjtRQUN4QixVQUFVLEVBQUUsY0FBYztLQUMzQjtJQUNEO1FBQ0UsTUFBTSxFQUFFLG9CQUFvQjtRQUM1QixPQUFPLEVBQUU7WUFDUCxzQkFBc0I7WUFDdEIsc0NBQXNDO1lBQ3RDLDBEQUEwRDtTQUMzRDtLQUNGO0NBQ0YsQ0FBQztBQUVXLFFBQUEsZUFBZSxHQUFHO0lBQzdCO1FBQ0UsTUFBTSxFQUFFLGlCQUFpQjtRQUN6QixPQUFPLEVBQUUsd0NBQXdDO0tBQ2xEO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsT0FBTztRQUNmLE9BQU8sRUFBRSwrQkFBK0I7S0FDekM7SUFDRDtRQUNFLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLFVBQVUsRUFBRTtZQUNWO2dCQUNFLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSxnQ0FBZ0M7Z0JBQzdDLElBQUksRUFBRSxNQUFNO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsY0FBYztnQkFDcEIsV0FBVyxFQUFFLHNDQUFzQztnQkFDbkQsSUFBSSxFQUFFLE1BQU07YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxXQUFXO2dCQUNqQixXQUFXLEVBQUUsa0xBQWtMO2dCQUMvTCxJQUFJLEVBQUUsTUFBTTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFdBQVcsRUFBRSxzRUFBc0U7Z0JBQ25GLElBQUksRUFBRSxNQUFNO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsV0FBVyxFQUFFLG9FQUFvRTtnQkFDakYsSUFBSSxFQUFFLE9BQU87YUFDZDtTQUNGO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxnQkFBZ0I7UUFDeEIsVUFBVSxFQUFFLGNBQWM7S0FDM0I7SUFDRDtRQUNFLE1BQU0sRUFBRSxvQkFBb0I7UUFDNUIsT0FBTyxFQUFFO1lBQ1AscUJBQXFCO1lBQ3JCLHFDQUFxQztZQUNyQyx5REFBeUQ7U0FDMUQ7S0FDRjtDQUNGLENBQUM7QUFFVyxRQUFBLFlBQVksR0FBRztJQUMxQjtRQUNFLE1BQU0sRUFBRSxjQUFjO1FBQ3RCLE9BQU8sRUFBRSxxQ0FBcUM7S0FDL0M7SUFDRDtRQUNFLE1BQU0sRUFBRSxPQUFPO1FBQ2YsT0FBTyxFQUFFLGtCQUFrQjtLQUM1QjtJQUNEO1FBQ0UsTUFBTSxFQUFFLFNBQVM7UUFDakIsVUFBVSxFQUFFO1lBQ1Y7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLGdDQUFnQztnQkFDN0MsSUFBSSxFQUFFLE1BQU07YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxZQUFZO2dCQUNsQixXQUFXLEVBQUUsNENBQTRDO2dCQUN6RCxJQUFJLEVBQUUsTUFBTTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUFFLGdEQUFnRDtnQkFDN0QsSUFBSSxFQUFFLE1BQU07YUFDYjtTQUNGO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxnQkFBZ0I7UUFDeEIsVUFBVSxFQUFFLGNBQWM7S0FDM0I7SUFDRDtRQUNFLE1BQU0sRUFBRSxvQkFBb0I7UUFDNUIsT0FBTyxFQUFFO1lBQ1AsbUNBQW1DO1lBQ25DLG9EQUFvRDtTQUNyRDtLQUNGO0NBQ0YsQ0FBQyJ9