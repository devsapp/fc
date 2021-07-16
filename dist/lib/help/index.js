"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMPONENT_HELP_INFO = void 0;
__exportStar(require("./build"), exports);
__exportStar(require("./local"), exports);
__exportStar(require("./nas"), exports);
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
            { name: 'version', summary: 'Service version operation' },
            { name: 'alias', summary: 'Service alias operation' },
            { name: 'provision', summary: 'Resource reservation operation' },
            { name: 'onDemand', summary: 'Resource OnDemand operation' },
            { name: 'layer', summary: 'Resource layer operation' },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2hlbHAvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUF3QjtBQUN4QiwwQ0FBd0I7QUFDeEIsd0NBQXNCO0FBRVQsUUFBQSxtQkFBbUIsR0FBRztJQUNqQztRQUNFLE1BQU0sRUFBRSxjQUFjO1FBQ3RCLE9BQU8sRUFBRSw2RkFBNkY7S0FDdkc7SUFDRDtRQUNFLE1BQU0sRUFBRSxPQUFPO1FBQ2YsT0FBTyxFQUFFLHlCQUF5QjtLQUNuQztJQUNEO1FBQ0UsTUFBTSxFQUFFLGNBQWM7UUFDdEIsT0FBTyxFQUFFO1lBQ1AsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRTtZQUN0RCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLGdDQUFnQyxFQUFFO1lBQzdELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUU7WUFDN0QsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxxQ0FBcUMsRUFBRTtZQUNqRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLDBEQUEwRCxFQUFFO1lBQ3JGLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsa0RBQWtELEVBQUU7WUFDOUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSwwREFBMEQsRUFBRTtZQUNyRixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLG9EQUFvRCxFQUFFO1lBQy9FLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsMkRBQTJELEVBQUU7WUFDekYsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxrREFBa0QsRUFBRTtZQUM1RSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLDJCQUEyQixFQUFFO1lBQ3pELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUseUJBQXlCLEVBQUU7WUFDckQsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRTtZQUNoRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLDZCQUE2QixFQUFFO1lBQzVELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUU7U0FDdkQ7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLGdCQUFnQjtRQUN4QixVQUFVLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsV0FBVztnQkFDakIsV0FBVyxFQUFFLHFFQUFxRTtnQkFDbEYsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLE9BQU87YUFDZDtTQUNGO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxvQkFBb0I7UUFDNUIsT0FBTyxFQUFFO1lBQ1AsMkJBQTJCO1lBQzNCLDJCQUEyQjtZQUMzQixrQkFBa0I7U0FDbkI7S0FDRjtDQUNGLENBQUMifQ==