export declare const ONDEMAND: ({
    header: string;
    content: string;
} | {
    header: string;
    content: {
        desc: string;
        example: string;
    }[];
})[];
export declare const ONDEMAND_LIST: ({
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
export declare const ONDEMAND_PUT: ({
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
        type: NumberConstructor;
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
export declare const ONDEMAND_GET: ({
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
export declare const ONDEMAND_DELETE: ({
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
