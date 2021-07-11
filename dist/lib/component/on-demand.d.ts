interface IProps {
    region?: string;
    serviceName?: string;
    qualifier?: string;
    functionName?: string;
    maximumInstanceCount?: number;
}
export default class OnDemand {
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
    list({ serviceName }: IProps, table?: any): Promise<any>;
    get({ serviceName, qualifier, functionName }: {
        serviceName: any;
        qualifier: any;
        functionName: any;
    }): Promise<any>;
    delete({ serviceName, qualifier, functionName }: {
        serviceName: any;
        qualifier: any;
        functionName: any;
    }): Promise<any>;
    put({ serviceName, qualifier, functionName, maximumInstanceCount }: {
        serviceName: any;
        qualifier: any;
        functionName: any;
        maximumInstanceCount: any;
    }): Promise<any>;
}
export {};
