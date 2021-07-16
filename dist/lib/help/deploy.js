"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEPLOY_DOMAIN = exports.DEPLOY_TRIGGER = exports.DEPLOY_FUNCTION = exports.DEPLOY_SERVICE = exports.DEPLOY_ALL = exports.DEPLOY = void 0;
exports.DEPLOY = [
    {
        header: 'Deploy',
        content: 'The ability to deploy resources\nIf executing s deploy is equivalent to s deploy all',
    },
    {
        header: 'Usage',
        content: '$ s deploy <sub-command>',
    },
    {
        header: 'SubCommand List',
        content: [
            {
                desc: 'all',
                example: 'Deploy all resources, you can get help through [s deploy all -h]',
            },
            {
                desc: 'service',
                example: 'Only deploy service resources, you can get help through [s deploy service -h]',
            },
            {
                desc: 'function',
                example: 'Only deploy function resources, you can get help through [s deploy function -h]',
            },
            {
                desc: 'trigger',
                example: 'Only deploy trigger resources, you can get help through [s deploy trigger -h]',
            },
            {
                desc: 'domain',
                example: 'Only deploy domain resources, you can get help through [s deploy domain -h]',
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
exports.DEPLOY_ALL = [
    {
        header: 'Deploy all',
        content: 'Deploy all resources',
    },
    {
        header: 'Usage',
        content: '$ s deploy all <options>',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'type',
                description: 'Only deploy configuration or code. Value: code, config',
                type: Boolean,
            },
            {
                name: 'use-local',
                description: 'Deploy resource using local config',
                type: Boolean,
            },
            {
                name: 'assume-yes',
                description: 'Assume that the answer to any question which would be asked is yes',
                alias: 'y',
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
            '$ s deploy all',
            '$ s deploy all --use-local',
        ],
    },
];
exports.DEPLOY_SERVICE = [
    {
        header: 'Deploy service',
        content: 'Only deploy service resources',
    },
    {
        header: 'Usage',
        content: '$ s deploy service <options>',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'use-local',
                description: 'Deploy resource using local config',
                type: Boolean,
            },
            {
                name: 'assume-yes',
                description: 'Assume that the answer to any question which would be asked is yes',
                alias: 'y',
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
            '$ s deploy service',
            '$ s deploy service --use-local',
        ],
    },
];
exports.DEPLOY_FUNCTION = [
    {
        header: 'Deploy function',
        content: 'Only deploy function resources',
    },
    {
        header: 'Usage',
        content: '$ s deploy function <options>',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'type',
                description: 'Only deploy configuration or code Value: code, config',
                type: Boolean,
            },
            {
                name: 'use-local',
                description: 'Deploy resource using local config',
                type: Boolean,
            },
            {
                name: 'assume-yes',
                description: 'Assume that the answer to any question which would be asked is yes',
                alias: 'y',
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
            '$ s deploy function',
            '$ s deploy function --use-local',
        ],
    },
];
exports.DEPLOY_TRIGGER = [
    {
        header: 'Deploy trigger',
        content: 'Only deploy trigger resources',
    },
    {
        header: 'Usage',
        content: '$ s deploy trigger <options>',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'trigger-name',
                description: 'Only deploy the specified trigger',
                type: Boolean,
            },
            {
                name: 'use-local',
                description: 'Deploy resource using local config',
                type: Boolean,
            },
            {
                name: 'assume-yes',
                description: 'Assume that the answer to any question which would be asked is yes',
                alias: 'y',
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
            '$ s deploy trigger',
            '$ s deploy trigger --use-local',
        ],
    },
];
exports.DEPLOY_DOMAIN = [
    {
        header: 'Deploy domain',
        content: 'Only deploy domain resources',
    },
    {
        header: 'Usage',
        content: '$ s deploy domain <options>',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'use-local',
                description: 'Deploy resource using local config',
                type: Boolean,
            },
            {
                name: 'assume-yes',
                description: 'Assume that the answer to any question which would be asked is yes',
                alias: 'y',
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
            '$ s deploy domain',
        ],
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9oZWxwL2RlcGxveS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLE1BQU0sR0FBRztJQUNwQjtRQUNFLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLE9BQU8sRUFBRSxzRkFBc0Y7S0FDaEc7SUFDRDtRQUNFLE1BQU0sRUFBRSxPQUFPO1FBQ2YsT0FBTyxFQUFFLDBCQUEwQjtLQUNwQztJQUNEO1FBQ0UsTUFBTSxFQUFFLGlCQUFpQjtRQUN6QixPQUFPLEVBQUU7WUFDUDtnQkFDRSxJQUFJLEVBQUUsS0FBSztnQkFDWCxPQUFPLEVBQUUsa0VBQWtFO2FBQzVFO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLCtFQUErRTthQUN6RjtZQUNEO2dCQUNFLElBQUksRUFBRSxVQUFVO2dCQUNoQixPQUFPLEVBQUUsaUZBQWlGO2FBQzNGO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLCtFQUErRTthQUN6RjtZQUNEO2dCQUNFLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSw2RUFBNkU7YUFDdkY7U0FDRjtLQUNGO0NBQ0YsQ0FBQztBQUVGLElBQU0sY0FBYyxHQUFHO0lBQ3JCO1FBQ0UsSUFBSSxFQUFFLE1BQU07UUFDWixXQUFXLEVBQUUsa0JBQWtCO1FBQy9CLEtBQUssRUFBRSxHQUFHO1FBQ1YsSUFBSSxFQUFFLE9BQU87S0FDZDtJQUNEO1FBQ0UsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsbUJBQW1CO1FBQ2hDLEtBQUssRUFBRSxHQUFHO1FBQ1YsSUFBSSxFQUFFLE1BQU07S0FDYjtJQUNEO1FBQ0UsSUFBSSxFQUFFLE9BQU87UUFDYixXQUFXLEVBQUUsMkJBQTJCO1FBQ3hDLElBQUksRUFBRSxPQUFPO0tBQ2Q7Q0FDRixDQUFDO0FBRVcsUUFBQSxVQUFVLEdBQUc7SUFD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