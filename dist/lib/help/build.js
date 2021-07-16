"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BUILD_HELP_INFO = void 0;
exports.BUILD_HELP_INFO = [
    {
        header: 'Build',
        content: 'Build the dependencies.',
    },
    {
        header: 'Usage',
        content: [
            { example: '$ s exec -- build <option>' },
        ],
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'dockerfile',
                description: 'Specify the dockerfile path',
                alias: 'f',
                defaultOption: false,
                type: String,
            },
            {
                name: 'use-docker',
                description: 'Use docker container to build functions',
                alias: 'd',
                defaultOption: false,
                type: String,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'help',
                description: 'Build help for command',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples with Yaml',
        content: [
            {
                example: '$ s build --use-docker',
            },
            {
                example: '$ s <ProjectName> build',
            },
            {
                example: '$ s build --use-docker ',
            },
            {
                example: '$ s exec -- build',
            },
        ],
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2hlbHAvYnVpbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxlQUFlLEdBQUc7SUFDN0I7UUFDRSxNQUFNLEVBQUUsT0FBTztRQUNmLE9BQU8sRUFBRSx5QkFBeUI7S0FDbkM7SUFDRDtRQUNFLE1BQU0sRUFBRSxPQUFPO1FBQ2YsT0FBTyxFQUFFO1lBQ1AsRUFBRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUU7U0FDMUM7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLFNBQVM7UUFDakIsVUFBVSxFQUFFO1lBQ1Y7Z0JBQ0UsSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLFdBQVcsRUFBRSw2QkFBNkI7Z0JBQzFDLEtBQUssRUFBRSxHQUFHO2dCQUNWLGFBQWEsRUFBRSxLQUFLO2dCQUNwQixJQUFJLEVBQUUsTUFBTTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLFdBQVcsRUFBRSx5Q0FBeUM7Z0JBQ3RELEtBQUssRUFBRSxHQUFHO2dCQUNWLGFBQWEsRUFBRSxLQUFLO2dCQUNwQixJQUFJLEVBQUUsTUFBTTthQUNiO1NBQ0Y7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLGdCQUFnQjtRQUN4QixVQUFVLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsTUFBTTtnQkFDWixXQUFXLEVBQUUsd0JBQXdCO2dCQUNyQyxLQUFLLEVBQUUsR0FBRztnQkFDVixJQUFJLEVBQUUsT0FBTzthQUNkO1NBQ0Y7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLG9CQUFvQjtRQUM1QixPQUFPLEVBQUU7WUFDUDtnQkFDRSxPQUFPLEVBQUUsd0JBQXdCO2FBQ2xDO1lBQ0Q7Z0JBQ0UsT0FBTyxFQUFFLHlCQUF5QjthQUNuQztZQUNEO2dCQUNFLE9BQU8sRUFBRSx5QkFBeUI7YUFDbkM7WUFDRDtnQkFDRSxPQUFPLEVBQUUsbUJBQW1CO2FBQzdCO1NBQ0Y7S0FDRjtDQUNGLENBQUMifQ==