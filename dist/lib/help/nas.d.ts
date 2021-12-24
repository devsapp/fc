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
        optionList: ({
            name: string;
            description: string;
            defaultOption: boolean;
            type: BooleanConstructor;
            alias?: undefined;
        } | {
            name: string;
            description: string;
            alias: string;
            defaultOption: boolean;
            type: BooleanConstructor;
        })[];
        content?: undefined;
    } | {
        header: string;
        optionList: ({
            name: string;
            description: string;
            type: StringConstructor;
            alias?: undefined;
        } | {
            name: string;
            description: string;
            alias: string;
            type: BooleanConstructor;
        } | {
            name: string;
            description: string;
            alias: string;
            type: StringConstructor;
        })[];
        content?: undefined;
    } | {
        header: string;
        content: {
            desc: string;
        }[];
        optionList?: undefined;
    } | {
        header: string;
        content: string[];
        optionList?: undefined;
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
        optionList: ({
            name: string;
            description: string;
            type: StringConstructor;
            alias?: undefined;
        } | {
            name: string;
            description: string;
            alias: string;
            type: BooleanConstructor;
        } | {
            name: string;
            description: string;
            alias: string;
            type: StringConstructor;
        })[];
        content?: undefined;
    } | {
        header: string;
        content: {
            desc: string;
        }[];
        optionList?: undefined;
    } | {
        header: string;
        content: string[];
        optionList?: undefined;
    })[];
    command: ({
        header: string;
        content: string;
    } | {
        header: string;
        content: {
            example: string;
        }[];
    } | {
        header: string;
        optionList: ({
            name: string;
            description: string;
            type: StringConstructor;
            alias?: undefined;
        } | {
            name: string;
            description: string;
            alias: string;
            type: BooleanConstructor;
        } | {
            name: string;
            description: string;
            alias: string;
            type: StringConstructor;
        })[];
        content?: undefined;
    } | {
        header: string;
        content: {
            desc: string;
        }[];
    })[];
    init: ({
        header: string;
        content: string;
    } | {
        header: string;
        content: {
            example: string;
        }[];
    } | {
        header: string;
        optionList: ({
            name: string;
            description: string;
            type: StringConstructor;
            alias?: undefined;
        } | {
            name: string;
            description: string;
            alias: string;
            type: BooleanConstructor;
        } | {
            name: string;
            description: string;
            alias: string;
            type: StringConstructor;
        })[];
        content?: undefined;
    })[];
};
