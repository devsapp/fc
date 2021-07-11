"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.METRICS_HELP_INFO = void 0;
exports.METRICS_HELP_INFO = [
    {
        header: 'Metrics',
        content: 'Query function metrics information',
    },
    {
        header: 'Usage',
        content: '$ s metrics <options> ',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'region',
                description: 'Specify the region parameter',
                defaultOption: false,
                type: String,
            },
            {
                name: 'service-name',
                description: 'Specify the service name parameter',
                defaultOption: false,
                type: String,
            },
            {
                name: 'function-name',
                description: 'Specify the function name parameter',
                defaultOption: false,
                type: String,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'access',
                description: 'Specify key alias.',
                alias: 'a',
                type: Boolean,
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
            {
                example: '$ s metrics',
            },
            {
                example: '$ s <ProjectName> metrics',
            },
            {
                example: '$ s exec -- metrics --region cn-hangzhou --service-name myService --function-name myFunction',
            },
        ],
    },
    {
        header: 'Examples with CLI',
        content: [
            {
                example: '$ s cli fc metrics --region cn-hangzhou --service-name myService --function-name myFunction',
            },
        ],
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0cmljcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvaGVscC9tZXRyaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFhLFFBQUEsaUJBQWlCLEdBQUc7SUFDL0I7UUFDRSxNQUFNLEVBQUUsU0FBUztRQUNqQixPQUFPLEVBQUUsb0NBQW9DO0tBQzlDO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsT0FBTztRQUNmLE9BQU8sRUFBRSx3QkFBd0I7S0FDbEM7SUFDRDtRQUNFLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLFVBQVUsRUFBRTtZQUNWO2dCQUNFLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSw4QkFBOEI7Z0JBQzNDLGFBQWEsRUFBRSxLQUFLO2dCQUNwQixJQUFJLEVBQUUsTUFBTTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLGNBQWM7Z0JBQ3BCLFdBQVcsRUFBRSxvQ0FBb0M7Z0JBQ2pELGFBQWEsRUFBRSxLQUFLO2dCQUNwQixJQUFJLEVBQUUsTUFBTTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFdBQVcsRUFBRSxxQ0FBcUM7Z0JBQ2xELGFBQWEsRUFBRSxLQUFLO2dCQUNwQixJQUFJLEVBQUUsTUFBTTthQUNiO1NBQ0Y7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLGdCQUFnQjtRQUN4QixVQUFVLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsb0JBQW9CO2dCQUNqQyxLQUFLLEVBQUUsR0FBRztnQkFDVixJQUFJLEVBQUUsT0FBTzthQUNkO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLE1BQU07Z0JBQ1osV0FBVyxFQUFFLDJCQUEyQjtnQkFDeEMsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLE9BQU87YUFDZDtTQUNGO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxvQkFBb0I7UUFDNUIsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsT0FBTyxFQUFFLGFBQWE7YUFDdkI7WUFDRDtnQkFDRSxPQUFPLEVBQUUsMkJBQTJCO2FBQ3JDO1lBQ0Q7Z0JBQ0UsT0FBTyxFQUFFLDhGQUE4RjthQUN4RztTQUNGO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxtQkFBbUI7UUFDM0IsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsT0FBTyxFQUFFLDZGQUE2RjthQUN2RztTQUNGO0tBQ0Y7Q0FDRixDQUFDIn0=