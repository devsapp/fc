"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALIAS_DELETEALL = exports.ALIAS_DELETE = exports.ALIAS_PUBLISH = exports.ALIAS_LIST = exports.ALIAS_GET = exports.ALIAS = void 0;
exports.ALIAS = [
    {
        header: 'Alias',
        content: 'service alias operation',
    },
    {
        header: 'Usage',
        content: '$ s alias <sub-command>',
    },
    {
        header: 'SubCommand',
        content: [
            {
                desc: 'get',
                example: 'Get alias details, you can get help through [s alias get -h]',
            },
            {
                desc: 'list',
                example: 'View the list of service alias, you can get help through [s alias list -h]',
            },
            {
                desc: 'publish',
                example: 'Publish service alias, you can get help through [s alias publish -h]',
            },
            {
                desc: 'delete',
                example: 'Delete service alias, you can get help through [s alias delete -h]',
            },
        ],
    },
];
exports.ALIAS_GET = [
    {
        header: 'alias get',
        content: 'Get alias details',
    },
    {
        header: 'Usage',
        content: '$ s alias get',
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
                name: 'alias-name',
                description: 'Specify the alias name parameter',
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
            '$ s alias get --alias-name pre',
            '$ s exec -- alias get --alias-name pre',
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli fc alias get --region cn-hangzhou --service-name name --alias-name pre',
        ],
    },
];
exports.ALIAS_LIST = [
    {
        header: 'alias list',
        content: 'View the list of service alias',
    },
    {
        header: 'Usage',
        content: '$ s alias list',
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
            '$ s alias list',
            '$ s exec -- alias list',
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli fc alias list --region cn-hangzhou --service-name name',
        ],
    },
];
exports.ALIAS_PUBLISH = [
    {
        header: 'alias publish',
        content: 'Publish service alias',
    },
    {
        header: 'Usage',
        content: '$ s alias publish',
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
                name: 'alias-name',
                description: 'Specify the alias name parameter',
                type: String,
            },
            {
                name: 'version-id',
                description: 'Specify the version id parameter',
                alias: '-id',
                type: String,
            },
            {
                name: 'description',
                description: 'Specify the description parameter',
                type: String,
            },
            {
                name: 'gversion',
                description: 'Specify the grayscale version id parameter',
                type: String,
            },
            {
                name: 'weight',
                description: 'Specify the weight parameter',
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
            '$ s alias publish --alias-name pre --version-id 2',
            '$ s exec -- alias publish --description xxx --alias-name pre --version-id 2 --gversion 3 --weight 20',
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli fc alias publish --region cn-hangzhou --service-name name --alias-name pre --version-id 2',
        ],
    },
];
exports.ALIAS_DELETE = [
    {
        header: 'alias delete',
        content: 'Delete service alias',
    },
    {
        header: 'Usage',
        content: '$ s alias delete',
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
                name: 'alias-name',
                description: 'Specify the alias parameter',
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
            '$ s alias delete --alias-name pre',
            '$ s exec -- alias delete --alias-name pre',
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli fc alias delete --region cn-hangzhou --service-name name --alias-name pre',
        ],
    },
];
exports.ALIAS_DELETEALL = [
    {
        header: 'alias deleteAll',
        content: 'Delete service all alias',
    },
    {
        header: 'Usage',
        content: '$ s alias deleteAll',
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
        ],
    },
    {
        header: 'Examples with Yaml',
        content: [
            '$ s alias deleteAll',
            '$ s exec -- alias deleteAll',
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli fc alias deleteAll --region cn-hangzhou --service-name name',
        ],
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpYXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2hlbHAvYWxpYXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxLQUFLLEdBQUc7SUFDbkI7UUFDRSxNQUFNLEVBQUUsT0FBTztRQUNmLE9BQU8sRUFBRSx5QkFBeUI7S0FDbkM7SUFDRDtRQUNFLE1BQU0sRUFBRSxPQUFPO1FBQ2YsT0FBTyxFQUFFLHlCQUF5QjtLQUNuQztJQUNEO1FBQ0UsTUFBTSxFQUFFLFlBQVk7UUFDcEIsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsT0FBTyxFQUFFLDhEQUE4RDthQUN4RTtZQUNEO2dCQUNFLElBQUksRUFBRSxNQUFNO2dCQUNaLE9BQU8sRUFBRSw0RUFBNEU7YUFDdEY7WUFDRDtnQkFDRSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsc0VBQXNFO2FBQ2hGO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLG9FQUFvRTthQUM5RTtTQUNGO0tBQ0Y7Q0FDRixDQUFDO0FBRVcsUUFBQSxTQUFTLEdBQUc7SUFDdkI7UUFDRSxNQUFNLEVBQUUsV0FBVztRQUNuQixPQUFPLEVBQUUsbUJBQW1CO0tBQzdCO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsT0FBTztRQUNmLE9BQU8sRUFBRSxlQUFlO0tBQ3pCO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsY0FBYztRQUN0QixVQUFVLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsOEJBQThCO2dCQUMzQyxJQUFJLEVBQUUsTUFBTTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLGNBQWM7Z0JBQ3BCLFdBQVcsRUFBRSxvQ0FBb0M7Z0JBQ2pELElBQUksRUFBRSxNQUFNO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsV0FBVyxFQUFFLGtDQUFrQztnQkFD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