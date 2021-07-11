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
__exportStar(require("./invoke"), exports);
__exportStar(require("./local"), exports);
__exportStar(require("./logs"), exports);
__exportStar(require("./metrics"), exports);
__exportStar(require("./nas"), exports);
__exportStar(require("./stress"), exports);
__exportStar(require("./version"), exports);
__exportStar(require("./provision"), exports);
__exportStar(require("./on-demand"), exports);
__exportStar(require("./layer"), exports);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2hlbHAvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUF3QjtBQUN4QiwyQ0FBeUI7QUFDekIsMENBQXdCO0FBQ3hCLHlDQUF1QjtBQUN2Qiw0Q0FBMEI7QUFDMUIsd0NBQXNCO0FBQ3RCLDJDQUF5QjtBQUN6Qiw0Q0FBMEI7QUFDMUIsOENBQTRCO0FBQzVCLDhDQUE0QjtBQUM1QiwwQ0FBd0I7QUFFWCxRQUFBLG1CQUFtQixHQUFHO0lBQ2pDO1FBQ0UsTUFBTSxFQUFFLGNBQWM7UUFDdEIsT0FBTyxFQUFFLDZGQUE2RjtLQUN2RztJQUNEO1FBQ0UsTUFBTSxFQUFFLE9BQU87UUFDZixPQUFPLEVBQUUseUJBQXlCO0tBQ25DO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsY0FBYztRQUN0QixPQUFPLEVBQUU7WUFDUCxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLDJCQUEyQixFQUFFO1lBQ3RELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUU7WUFDN0QsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRTtZQUM3RCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLHFDQUFxQyxFQUFFO1lBQ2pFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsMERBQTBELEVBQUU7WUFDckYsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxrREFBa0QsRUFBRTtZQUM5RSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLDBEQUEwRCxFQUFFO1lBQ3JGLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsb0RBQW9ELEVBQUU7WUFDL0UsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSwyREFBMkQsRUFBRTtZQUN6RixFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLGtEQUFrRCxFQUFFO1lBQzVFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUU7WUFDekQsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRTtZQUNyRCxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLGdDQUFnQyxFQUFFO1lBQ2hFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUU7WUFDNUQsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRTtTQUN2RDtLQUNGO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsZ0JBQWdCO1FBQ3hCLFVBQVUsRUFBRTtZQUNWO2dCQUNFLElBQUksRUFBRSxXQUFXO2dCQUNqQixXQUFXLEVBQUUscUVBQXFFO2dCQUNsRixLQUFLLEVBQUUsR0FBRztnQkFDVixJQUFJLEVBQUUsT0FBTzthQUNkO1NBQ0Y7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLG9CQUFvQjtRQUM1QixPQUFPLEVBQUU7WUFDUCwyQkFBMkI7WUFDM0IsMkJBQTJCO1lBQzNCLGtCQUFrQjtTQUNuQjtLQUNGO0NBQ0YsQ0FBQyJ9