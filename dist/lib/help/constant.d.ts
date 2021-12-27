export declare const globalParams: {
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
};
export declare const globalDescribe: {
    header: string;
    content: {
        desc: string;
    }[];
};
export declare const showTableDescribe: {
    name: string;
    description: string;
    type: BooleanConstructor;
};
export declare const assumeYesDescribe: {
    name: string;
    description: string;
    alias: string;
    defaultOption: boolean;
    type: BooleanConstructor;
};
export declare const regionDescribe: {
    name: string;
    description: string;
    defaultOption: boolean;
    type: BooleanConstructor;
};
export declare const serviceNameDescribe: {
    name: string;
    description: string;
    type: StringConstructor;
};
export declare const functionNameDescribe: {
    name: string;
    description: string;
    type: StringConstructor;
};
export declare const eventFormat: {
    header: string;
    content: string;
};
