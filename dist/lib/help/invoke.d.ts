export declare const INVOKE: ({
    header: string;
    content: string;
} | {
    header: string;
    optionList: ({
        name: string;
        description: string;
        defaultOption: boolean;
        type: BooleanConstructor;
    } | {
        name: string;
        description: string;
        type: StringConstructor;
    } | {
        name: string;
        description: string;
        alias: string;
        type: StringConstructor;
        typeLabel?: undefined;
    } | {
        name: string;
        description: string;
        type: NumberConstructor;
        alias?: undefined;
        typeLabel?: undefined;
    } | {
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
        typeLabel?: undefined;
    } | {
        name: string;
        description: string;
        typeLabel: string;
        type: StringConstructor;
        alias?: undefined;
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
