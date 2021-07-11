interface IProps {
    region?: string;
    serviceName?: string;
    qualifier?: string;
    functionName?: string;
    config?: string;
    target?: number;
}
export default class Provision {
    static handlerInputs(inputs: any): Promise<{
        errorMessage: string;
        help?: undefined;
        subCommand?: undefined;
        credentials?: undefined;
        props?: undefined;
        table?: undefined;
    } | {
        help: boolean;
        subCommand: any;
        errorMessage?: undefined;
        credentials?: undefined;
        props?: undefined;
        table?: undefined;
    } | {
        credentials: any;
        subCommand: any;
        props: IProps;
        table: any;
        errorMessage?: undefined;
        help?: undefined;
    }>;
    constructor({ region, credentials }: {
        region: any;
        credentials: any;
    });
    get({ serviceName, qualifier, functionName }: {
        serviceName: any;
        qualifier: any;
        functionName: any;
    }): Promise<any>;
    put({ serviceName, qualifier, functionName, config, target }: {
        serviceName: any;
        qualifier: any;
        functionName: any;
        config: any;
        target: any;
    }): Promise<any>;
    list({ serviceName, qualifier }: IProps, table?: any): Promise<any>;
}
export {};
