export declare const COMPONENT_HELP_INFO: ({
    header: string;
    content: string;
    optionList?: undefined;
} | {
    header: string;
    content: {
        name: string;
        summary: string;
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
} | {
    header: string;
    content: string[];
    optionList?: undefined;
})[];
export declare const LOCAL_HELP_INFO: ({
    header: string;
    content: string;
} | {
    header: string;
    content: {
        name: string;
        summary: string;
    }[];
})[];
export declare const LOGS_HELP_INFO: ({
    header: string;
    content: string;
    optionList?: undefined;
} | {
    header: string;
    optionList: ({
        name: string;
        description: string;
        alias: string;
        defaultOption: boolean;
        type: BooleanConstructor;
    } | {
        name: string;
        description: string;
        alias: string;
        defaultOption: boolean;
        type: StringConstructor;
    } | {
        name: string;
        description: string;
        defaultOption: boolean;
        type: StringConstructor;
        alias?: undefined;
    })[];
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
} | {
    header: string;
    content: {
        desc: string;
        example: string;
    }[];
    optionList?: undefined;
} | {
    header: string;
    content: {
        example: string;
    }[];
    optionList?: undefined;
})[];
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
    deploy: any[];
    ls: any[];
    cp: any[];
    rm: any[];
};
