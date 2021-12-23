/**
 * Global Options
 */
export interface GlobalParams {
    /**
     * [Optional] Output debug informations
     */
    debug: string;
    /**
     * [Optional] Help for command
     * @alias h
     */
    help: boolean;
    /**
     * [Optional] Specify the template file
     * @alias t
     */
    template: string;
    /**
     * [Optional] Specify key alias
     * @alias a
     */
    access: string;
}
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
/**
 * @pre_help
 * {"header":"Options Help","content":[{"desc":"Required: Required parameters in YAML mode and CLI mode","example":""},{"desc":"C-Required: Required parameters in CLI mode","example":""},{"desc":"Optional: Non mandatory parameter","example":""},{"desc":"✋ The difference between Yaml mode and CLI mode: http://ej6.net/yc","example":""}]}
 */
export interface GlobalDescribe {
}
export declare const globalDescribe: {
    header: string;
    content: {
        desc: string;
    }[];
};
