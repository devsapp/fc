"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROVISION_GET = exports.PROVISION_PUT = exports.PROVISION_LIST = exports.PROVISION = void 0;
exports.PROVISION = [
    {
        header: 'Provision',
        content: 'Resource reservation operation',
    },
    {
        header: 'Usage',
        content: '$ s provision <sub-command>',
    },
    {
        header: 'SubCommand',
        content: [
            {
                desc: 'list',
                example: 'View the list of resource reservation, you can get help through [s provision list -h]',
            },
            {
                desc: 'put',
                example: 'Put resource reservation, you can get help through [s provision put -h]',
            },
            {
                desc: 'get',
                example: 'Get resource reservation, you can get help through [s provision get -h]',
            },
        ],
    },
];
exports.PROVISION_LIST = [
    {
        header: 'provision list',
        content: 'View the list of provision',
    },
    {
        header: 'Usage',
        content: '$ s provision list',
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
            '$ s provision list',
            '$ s exec -- provision list',
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli fc provision list --region cn-hangzhou --service-name name',
        ],
    },
];
exports.PROVISION_PUT = [
    {
        header: 'provision put',
        content: 'Set reserved configuration',
    },
    {
        header: 'Usage',
        content: '$ s provision put',
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
                name: 'target',
                description: 'Specify the provision target parameter',
                type: Number,
            },
            {
                name: 'config',
                description: 'Specify the configuration path parameter',
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
            '$ s provision put --target 1 --qualifier alias',
            '$ s provision put --config ./provision.json --qualifier alias',
            '$ s exec -- provision put --target 1 --qualifier alias',
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli fc provision put --region cn-hangzhou --service-name name --function-name name --qualifier alias --target 1',
            '$ s cli fc provision put --region cn-hangzhou --service-name name --function-name name --qualifier alias --config ./provision.json',
        ],
    },
];
exports.PROVISION_GET = [
    {
        header: 'provision get',
        content: 'Get provision configuration',
    },
    {
        header: 'Usage',
        content: '$ s provision get',
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
            '$ s provision get --qualifier alias',
            '$ s exec -- provision get --qualifier alias',
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli fc provision get --region cn-hangzhou --service-name name --function-name name --qualifier alias',
        ],
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9oZWxwL3Byb3Zpc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLFNBQVMsR0FBRztJQUN2QjtRQUNFLE1BQU0sRUFBRSxXQUFXO1FBQ25CLE9BQU8sRUFBRSxnQ0FBZ0M7S0FDMUM7SUFDRDtRQUNFLE1BQU0sRUFBRSxPQUFPO1FBQ2YsT0FBTyxFQUFFLDZCQUE2QjtLQUN2QztJQUNEO1FBQ0UsTUFBTSxFQUFFLFlBQVk7UUFDcEIsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsSUFBSSxFQUFFLE1BQU07Z0JBQ1osT0FBTyxFQUFFLHVGQUF1RjthQUNqRztZQUNEO2dCQUNFLElBQUksRUFBRSxLQUFLO2dCQUNYLE9BQU8sRUFBRSx5RUFBeUU7YUFDbkY7WUFDRDtnQkFDRSxJQUFJLEVBQUUsS0FBSztnQkFDWCxPQUFPLEVBQUUseUVBQXlFO2FBQ25GO1NBQ0Y7S0FDRjtDQUNGLENBQUM7QUFFVyxRQUFBLGNBQWMsR0FBRztJQUM1QjtRQUNFLE1BQU0sRUFBRSxnQkFBZ0I7UUFDeEIsT0FBTyxFQUFFLDRCQUE0QjtLQUN0QztJQUNEO1FBQ0UsTUFBTSxFQUFFLE9BQU87UUFDZixPQUFPLEVBQUUsb0JBQW9CO0tBQzlCO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsY0FBYztRQUN0QixVQUFVLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsOEJBQThCO2dCQUMzQyxJQUFJLEVBQUUsTUFBTTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLGNBQWM7Z0JBQ3BCLFdBQVcsRUFBRSxvQ0FBb0M7Z0JBQ2pELElBQUksRUFBRSxNQUFNO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsV0FBVztnQkFDakIsV0FBVyxFQUFFLGlFQUFpRTtnQkFDOUUsSUFBSSxFQUFFLE1BQU07YUFDYjtTQUNGO0tBQ0Y7SUFDRDtRQUNF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