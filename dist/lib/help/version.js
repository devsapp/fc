"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION_DELETEALL = exports.VERSION_DELETE = exports.VERSION_PUBLISH = exports.VERSION_LIST = exports.VERSION = void 0;
exports.VERSION = [
    {
        header: 'Version',
        content: 'service version operation',
    },
    {
        header: 'Usage',
        content: '$ s version <sub-command>',
    },
    {
        header: 'SubCommand',
        content: [
            {
                desc: 'list',
                example: 'View the list of service versions, you can get help through [s version list -h]',
            },
            {
                desc: 'publish',
                example: 'Publish service version, you can get help through [s version publish -h]',
            },
            {
                desc: 'delete',
                example: 'Delete service version, you can get help through [s version delete -h]',
            },
        ],
    },
];
exports.VERSION_LIST = [
    {
        header: 'version list',
        content: 'View the list of service versions',
    },
    {
        header: 'Usage',
        content: '$ s version list',
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
            '$ s version list',
            '$ s exec -- version list',
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli fc version list --region cn-hangzhou --service-name name',
        ],
    },
];
exports.VERSION_PUBLISH = [
    {
        header: 'version publish',
        content: 'Publish service version',
    },
    {
        header: 'Usage',
        content: '$ s version publish',
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
                name: 'description',
                description: 'Specify the description parameter',
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
            '$ s version publish --description xxx',
            '$ s exec -- version publish --description xxx',
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli fc version publish --region cn-hangzhou --service-name name --description xxx',
        ],
    },
];
exports.VERSION_DELETE = [
    {
        header: 'version delete',
        content: 'Delete service version',
    },
    {
        header: 'Usage',
        content: '$ s version delete',
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
                name: 'version-id',
                description: 'Specify the version parameter',
                alias: '-id',
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
            '$ s version delete --id xxx',
            '$ s exec -- version delete --version-id xxx',
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli fc version delete --region cn-hangzhou --service-name name --version-id xxx',
        ],
    },
];
exports.VERSION_DELETEALL = [
    {
        header: 'version deleteAll',
        content: 'Delete service all version',
    },
    {
        header: 'Usage',
        content: '$ s version deleteAll',
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
            '$ s version deleteAll',
            '$ s exec -- version deleteAll',
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli fc version deleteAll --region cn-hangzhou --service-name name',
        ],
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvaGVscC92ZXJzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFhLFFBQUEsT0FBTyxHQUFHO0lBQ3JCO1FBQ0UsTUFBTSxFQUFFLFNBQVM7UUFDakIsT0FBTyxFQUFFLDJCQUEyQjtLQUNyQztJQUNEO1FBQ0UsTUFBTSxFQUFFLE9BQU87UUFDZixPQUFPLEVBQUUsMkJBQTJCO0tBQ3JDO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsWUFBWTtRQUNwQixPQUFPLEVBQUU7WUFDUDtnQkFDRSxJQUFJLEVBQUUsTUFBTTtnQkFDWixPQUFPLEVBQUUsaUZBQWlGO2FBQzNGO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLDBFQUEwRTthQUNwRjtZQUNEO2dCQUNFLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSx3RUFBd0U7YUFDbEY7U0FDRjtLQUNGO0NBQ0YsQ0FBQztBQUVXLFFBQUEsWUFBWSxHQUFHO0lBQzFCO1FBQ0UsTUFBTSxFQUFFLGNBQWM7UUFDdEIsT0FBTyxFQUFFLG1DQUFtQztLQUM3QztJQUNEO1FBQ0UsTUFBTSxFQUFFLE9BQU87UUFDZixPQUFPLEVBQUUsa0JBQWtCO0tBQzVCO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsY0FBYztRQUN0QixVQUFVLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsOEJBQThCO2dCQUMzQyxJQUFJLEVBQUUsTUFBTTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLGNBQWM7Z0JBQ3BCLFdBQVcsRUFBRSxvQ0FBb0M7Z0JBQ2pELElBQUksRUFBRSxNQUFNO2FBQ2I7U0FDRjtLQUNGO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsZ0JBQWdCO1FBQ3hCLFVBQVUsRUFBRTtZQUNWO2dCQUNFLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSxtQkFBbUI7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