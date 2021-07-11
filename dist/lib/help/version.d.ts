export declare const VERSION: ({
    header: string;
    content: string;
} | {
    header: string;
    content: {
        desc: string;
        example: string;
    }[];
})[];
export declare const VERSION_LIST: ({
    header: string;
    content: string;
    optionList?: undefined;
} | {
    header: string;
    optionList: {
        name: string;
        description: string;
        type: StringConstructor;
    }[];
    content?: undefined;
} | {
    header: string;
    optionList: ({
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
    } | {
        name: string;
        description: string;
        type: BooleanConstructor;
        alias?: undefined;
    })[];
    content?: undefined;
} | {
    header: string;
    content: string[];
    optionList?: undefined;
})[];
export declare const VERSION_PUBLISH: ({
    header: string;
    content: string;
    optionList?: undefined;
} | {
    header: string;
    optionList: {
        name: string;
        description: string;
        type: StringConstructor;
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
} | {
    header: string;
    content: string[];
    optionList?: undefined;
})[];
export declare const VERSION_DELETE: ({
    header: string;
    content: string;
    optionList?: undefined;
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
        type: StringConstructor;
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
export declare const VERSION_DELETEALL: ({
    header: string;
    content: string;
    optionList?: undefined;
} | {
    header: string;
    optionList: {
        name: string;
        description: string;
        type: StringConstructor;
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
} | {
    header: string;
    content: string[];
    optionList?: undefined;
})[];
