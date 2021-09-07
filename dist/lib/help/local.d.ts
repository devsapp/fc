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
export declare const LOCAL_INVOKE_HELP_INFO: ({
    header: string;
    content: string;
    optionList?: undefined;
} | {
    header: string;
    optionList: ({
        name: string;
        typeLabel: string;
        description: string;
        alias: string;
        type: StringConstructor;
    } | {
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
        typeLabel?: undefined;
    } | {
        name: string;
        typeLabel: string;
        description: string;
        alias: string;
        type: NumberConstructor;
    } | {
        name: string;
        typeLabel: string;
        description: string;
        type: StringConstructor;
        alias?: undefined;
    } | {
        name: string;
        typeLabel: string;
        description: string;
        type: NumberConstructor;
        alias?: undefined;
    })[];
    content?: undefined;
} | {
    header: string;
    content: string[];
    optionList?: undefined;
})[];
export declare const LOCAL_START_HELP_INFO: ({
    header: string;
    content: string;
    optionList?: undefined;
} | {
    header: string;
    optionList: ({
        name: string;
        typeLabel: string;
        description: string;
        alias: string;
        type: StringConstructor;
    } | {
        name: string;
        typeLabel: string;
        description: string;
        alias: string;
        type: NumberConstructor;
    } | {
        name: string;
        typeLabel: string;
        description: string;
        type: StringConstructor;
        alias?: undefined;
    } | {
        name: string;
        typeLabel: string;
        description: string;
        type: NumberConstructor;
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
    content: string[];
    optionList?: undefined;
})[];
