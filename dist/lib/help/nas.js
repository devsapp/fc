"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NAS_SUB_COMMAND_HELP_INFO = exports.NAS_HELP_INFO = void 0;
exports.NAS_HELP_INFO = [
    {
        header: 'Nas',
        content: 'Upload and download files for NAS service.',
    },
    {
        header: 'Usage',
        content: '$ s exec -- nas <sub-command>',
    },
    {
        header: 'SubCommand',
        content: [
            {
                desc: 'download',
                example: 'Download resources, you can get help through [s nas download -h]',
            },
            {
                desc: 'upload',
                example: 'Upload resources, you can get help through [s nas upload -h]',
            },
            {
                desc: 'command',
                example: 'Execute relevant instructions, you can get help through [s nas command -h]',
            },
        ],
    },
];
var UPLOADHELP = [
    {
        header: 'nas Upload',
        content: 'Upload resources.',
    },
    {
        header: 'Usage',
        content: [
            { example: '$ s nas upload <options> <src_path> <fc_dir>' },
        ],
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'recursive',
                description: 'Iterate to copy folder content',
                alias: 'r',
                defaultOption: false,
                type: Boolean,
            },
            {
                name: 'no-clobber',
                description: 'Do not override existing files',
                alias: 'n',
                defaultOption: false,
                type: Boolean,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'help',
                description: 'Upload help for command',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples with Yaml',
        content: [
            {
                example: '$ s exec -- nas upload /home/usr/demo.file nas://<fc_dir>',
            },
        ],
    },
    {
        header: 'Examples',
        content: [
            {
                example: '$ s exec -- upload /home/usr/demo.file nas://<fc_dir>',
            },
        ],
    },
];
var DOWNLOADHELP = [
    {
        header: 'Nas Download',
        content: 'Download resources.',
    },
    {
        header: 'Usage',
        content: [
            { example: '$ s nas download <options> <fc_dir> <src_path>' },
        ],
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'recursive',
                description: 'Iterate to copy folder content',
                alias: 'r',
                defaultOption: false,
                type: Boolean,
            },
            {
                name: 'no-clobber',
                description: 'Do not override existing files',
                alias: 'n',
                defaultOption: false,
                type: Boolean,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'help',
                description: 'Download help for command',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples with Yaml',
        content: [
            {
                example: '$ s exec -- nas download nas://<fc_dir> /home/usr/demo',
            },
        ],
    },
];
var COMMANDHELP = [
    {
        header: 'nas Command',
        content: 'Operation instruction.',
    },
    {
        header: 'Usage',
        content: [
            { example: '$ s exec -- nas command <option>' },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'help',
                description: 'Download help for command',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples',
        content: [
            {
                example: '$ s exec -- nas command ls nas:///<nas_dir>',
            },
        ],
    },
];
exports.NAS_SUB_COMMAND_HELP_INFO = {
    download: DOWNLOADHELP,
    upload: UPLOADHELP,
    command: COMMANDHELP,
    // fc 组件不推的几个指令，但是支持
    remove: [],
    deploy: [],
    ls: [],
    cp: [],
    rm: [],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9oZWxwL25hcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLGFBQWEsR0FBRztJQUMzQjtRQUNFLE1BQU0sRUFBRSxLQUFLO1FBQ2IsT0FBTyxFQUFFLDRDQUE0QztLQUN0RDtJQUNEO1FBQ0UsTUFBTSxFQUFFLE9BQU87UUFDZixPQUFPLEVBQUUsK0JBQStCO0tBQ3pDO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsWUFBWTtRQUNwQixPQUFPLEVBQUU7WUFDUDtnQkFDRSxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsT0FBTyxFQUFFLGtFQUFrRTthQUM1RTtZQUNEO2dCQUNFLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSw4REFBOEQ7YUFDeEU7WUFDRDtnQkFDRSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsNEVBQTRFO2FBQ3RGO1NBQ0Y7S0FDRjtDQUNGLENBQUM7QUFFRixJQUFNLFVBQVUsR0FBRztJQUNqQjtRQUNFLE1BQU0sRUFBRSxZQUFZO1FBQ3BCLE9BQU8sRUFBRSxtQkFBbUI7S0FDN0I7SUFDRDtRQUNFLE1BQU0sRUFBRSxPQUFPO1FBQ2YsT0FBTyxFQUFFO1lBQ1AsRUFBRSxPQUFPLEVBQUUsOENBQThDLEVBQUU7U0FDNUQ7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLFNBQVM7UUFDakIsVUFBVSxFQUFFO1lBQ1Y7Z0JBQ0UsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLFdBQVcsRUFBRSxnQ0FBZ0M7Z0JBQzdDLEtBQUssRUFBRSxHQUFHO2dCQUNWLGFBQWEsRUFBRSxLQUFLO2dCQUNwQixJQUFJLEVBQUUsT0FBTzthQUNkO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLFdBQVcsRUFBRSxnQ0FBZ0M7Z0JBQzdDLEtBQUssRUFBRSxHQUFHO2dCQUNWLGFBQWEsRUFBRSxLQUFLO2dCQUNwQixJQUFJLEVBQUUsT0FB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