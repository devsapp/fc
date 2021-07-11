export declare const STRESS_HTLP_INFO: ({
    header: string;
    content: string;
} | {
    header: string;
    content: {
        name: string;
        summary: string;
    }[];
})[];
export declare const STRESS_SUB_COMMAND_HELP_INFO: {
    start: ({
        header: string;
        content: string;
        optionList?: undefined;
    } | {
        header: string;
        optionList: ({
            name: string;
            typeLabel: string;
            description: string;
            type: NumberConstructor;
            alias?: undefined;
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
            alias: string;
            type: StringConstructor;
        })[];
        content?: undefined;
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
        })[];
        content?: undefined;
    } | {
        header: string;
        content: string[];
        optionList?: undefined;
    })[];
    clean: ({
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
        })[];
        content?: undefined;
    } | {
        header: string;
        content: string[];
        optionList?: undefined;
    })[];
};
