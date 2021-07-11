"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LAYER_COMMAND = exports.LAYER = void 0;
var PUBLISH = [
    {
        header: 'layer publish',
        content: 'New layer version',
    },
    {
        header: 'Usage',
        content: '$ s layer publish <options>',
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
                name: 'layer-name',
                description: 'Specify the layer name parameter',
                type: String,
            },
            {
                name: 'code',
                description: 'Specify the code parameter',
                type: String,
            },
            {
                name: 'description',
                description: 'Specify the description parameter',
                type: String,
            },
            {
                name: 'compatible-runtime',
                // alias: 'rt',
                description: 'Specify the compatibleRuntime parameter',
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
            '$ s layer publish --layer-name testName --code ./src',
            '$ s exec -- layer publish --layer-name testName --code ./src',
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli fc layer publish --region cn-hangzhou --layer-name testName --code ./src --compatible-runtime nodejs12,nodejs10,python3',
        ],
    },
];
var LIST = [
    {
        header: 'layer list',
        content: 'Get layer list',
    },
    {
        header: 'Usage',
        content: '$ s layer list <options>',
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
                name: 'prefix',
                description: 'Specify the prefix parameter',
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
            '$ s layer list',
            '$ s exec -- layer list',
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli fc layer list --region cn-hangzhou --prefix test',
        ],
    },
];
var VERSION_CONFIG = [
    {
        header: 'layer versionConfig',
        content: 'Get layer versionConfig',
    },
    {
        header: 'Usage',
        content: '$ s versionConfig <options>',
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
                name: 'layer-name',
                description: 'Specify the layer name parameter',
                type: String,
            },
            {
                name: 'version',
                description: 'Specify the version parameter',
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
            '$ s layer versionConfig --layer-name name --version 1',
            '$ s exec -- layer versionConfig --layer-name name --version 1',
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli fc layer versionConfig --region cn-hangzhou --layer-name name --version 1',
        ],
    },
];
var DELETE_VERSION = [
    {
        header: 'layer deleteVersion',
        content: 'Delete layer version',
    },
    {
        header: 'Usage',
        content: '$ s layer deleteVersion <options>',
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
                name: 'layer-name',
                description: 'Specify the layer name parameter',
                type: String,
            },
            {
                name: 'version',
                description: 'Specify the version parameter',
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
            '$ s layer deleteVersion --layer-name name --version 1',
            '$ s exec -- layer deleteVersion --layer-name name --version 1',
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli fc layer deleteVersion --region cn-hangzhou --layer-name name --version 1',
        ],
    },
];
var DELETE_LAYER = [
    {
        header: 'layer deleteLayer',
        content: 'Delete layer all version',
    },
    {
        header: 'Usage',
        content: '$ s layer deleteLayer <options>',
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
                name: 'layer-name',
                description: 'Specify the layer name parameter',
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
            '$ s layer deleteLayer --layer-name name',
            '$ s exec -- layer deleteLayer --layer-name name',
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli fc layer deleteLayer --region cn-hangzhou --layer-name name',
        ],
    },
];
var VERSIONS = [
    {
        header: 'layer versions',
        content: 'Get layer versions',
    },
    {
        header: 'Usage',
        content: '$ s layer versions <options>',
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
                name: 'layer-name',
                description: 'Specify the layer name parameter',
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
            '$ s layer versions --layer-name name',
            '$ s exec -- layer versions --layer-name name',
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli fc layer versions --region cn-hangzhou --layer-name name',
        ],
    },
];
exports.LAYER = [
    {
        header: 'Layer',
        content: 'Resource layer operation',
    },
    {
        header: 'Usage',
        content: '$ s layer <sub-command>',
    },
    {
        header: 'SubCommand',
        content: [
            {
                desc: 'publish',
                example: 'New layer version, you can get help through [s layer publish -h]',
            },
            {
                desc: 'list',
                example: 'Get layer list, you can get help through [s layer list -h]',
            },
            {
                desc: 'versionConfig',
                example: 'Get layer versionConfig, you can get help through [s layer versionConfig -h]',
            },
            {
                desc: 'versions',
                example: 'Get layer versions, you can get help through [s layer versions -h]',
            },
            {
                desc: 'deleteVersion',
                example: 'Delete layer version, you can get help through [s layer deleteVersion -h]',
            },
            {
                desc: 'deleteLayer',
                example: 'Delete layer all version, you can get help through [s layer deleteLayer -h]',
            },
        ],
    },
];
exports.LAYER_COMMAND = {
    publish: PUBLISH,
    list: LIST,
    versionConfig: VERSION_CONFIG,
    versions: VERSIONS,
    deleteVersion: DELETE_VERSION,
    deleteLayer: DELETE_LAYER,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2hlbHAvbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsSUFBTSxPQUFPLEdBQUc7SUFDZDtRQUNFLE1BQU0sRUFBRSxlQUFlO1FBQ3ZCLE9BQU8sRUFBRSxtQkFBbUI7S0FDN0I7SUFDRDtRQUNFLE1BQU0sRUFBRSxPQUFPO1FBQ2YsT0FBTyxFQUFFLDZCQUE2QjtLQUN2QztJQUNEO1FBQ0UsTUFBTSxFQUFFLGNBQWM7UUFDdEIsVUFBVSxFQUFFO1lBQ1Y7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLDhCQUE4QjtnQkFDM0MsSUFBSSxFQUFFLE1BQU07YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxZQUFZO2dCQUNsQixXQUFXLEVBQUUsa0NBQWtDO2dCQUMvQyxJQUFJLEVBQUUsTUFBTTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLE1BQU07Z0JBQ1osV0FBVyxFQUFFLDRCQUE0QjtnQkFDekMsSUFBSSxFQUFFLE1BQU07YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxhQUFhO2dCQUNuQixXQUFXLEVBQUUsbUNBQW1DO2dCQUNoRCxJQUFJLEVBQUUsTUFBTTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLG9CQUFvQjtnQkFDMUIsZUFBZTtnQkFDZixXQUFXLEVBQUUseUNBQXlDO2dCQUN0RCxJQUFJLEVBQUUsTUFBTTthQUNiO1NBQ0Y7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLGdCQUFnQjtRQUN4QixVQUFVLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsbUJBQW1CO2dCQUNoQyxLQUFLLEVBQUUsR0FBRztnQkFDVixJQUFJLEVBQUUsT0FBTzthQUNkO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLE1BQU07Z0JBQ1osV0FBVyxFQUFFLDBCQUEwQjtnQkFDdkMsS0FBSyxFQUFFLEdB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