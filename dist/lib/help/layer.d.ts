export declare const LAYER: ({
    header: string;
    content: string;
} | {
    header: string;
    content: {
        desc: string;
        example: string;
    }[];
})[];
export declare const LAYER_COMMAND: {
    publish: ({
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
    list: ({
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
    versionConfig: ({
        header: string;
        content: string;
        optionList?: undefined;
    } | {
        header: string;
        optionList: ({
            name: string;
            description: string;
            type: StringConstructor;
        } | {
            name: string;
            description: string;
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
    versions: ({
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
    deleteVersion: ({
        header: string;
        content: string;
        optionList?: undefined;
    } | {
        header: string;
        optionList: ({
            name: string;
            description: string;
            type: StringConstructor;
        } | {
            name: string;
            description: string;
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
    deleteLayer: ({
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
};
