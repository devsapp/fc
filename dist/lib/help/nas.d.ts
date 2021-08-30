export declare const NAS_HELP_INFO: ({
    header: string;
    content: string;
} | {
    header: string;
    content: {
        desc: string;
        example: string;
    }[];
})[];
export declare const NAS_SUB_COMMAND_HELP_INFO: {
    download: ({
        header: string;
        content: string;
        optionList?: undefined;
    } | {
        header: string;
        content: {
            example: string;
        }[];
        optionList?: undefined;
    } | {
        header: string;
        optionList: {
            name: string;
            description: string;
            alias: string;
            defaultOption: boolean;
            type: BooleanConstructor;
        }[];
        content?: undefined;
    } | {
        header: string;
        optionList: {
            name: string;
            description: string;
            alias: string;
            type: BooleanConstructor;
        }[];
        content?: undefined;
    })[];
    upload: ({
        header: string;
        content: string;
        optionList?: undefined;
    } | {
        header: string;
        content: {
            example: string;
        }[];
        optionList?: undefined;
    } | {
        header: string;
        optionList: {
            name: string;
            description: string;
            alias: string;
            defaultOption: boolean;
            type: BooleanConstructor;
        }[];
        content?: undefined;
    } | {
        header: string;
        optionList: {
            name: string;
            description: string;
            alias: string;
            type: BooleanConstructor;
        }[];
        content?: undefined;
    })[];
    command: ({
        header: string;
        content: string;
        optionList?: undefined;
    } | {
        header: string;
        content: {
            example: string;
        }[];
        optionList?: undefined;
    } | {
        header: string;
        optionList: {
            name: string;
            description: string;
            alias: string;
            type: BooleanConstructor;
        }[];
        content?: undefined;
    })[];
    remove: any[];
    init: ({
        header: string;
        content: string;
        optionList?: undefined;
    } | {
        header: string;
        content: {
            example: string;
        }[];
        optionList?: undefined;
    } | {
        header: string;
        optionList: {
            name: string;
            description: string;
            alias: string;
            type: BooleanConstructor;
        }[];
        content?: undefined;
    })[];
    ls: any[];
    cp: any[];
    rm: any[];
};
