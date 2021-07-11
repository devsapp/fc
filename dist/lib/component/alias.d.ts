import { ICredentials } from '../interface/profile';
interface IProps {
    region?: string;
    serviceName: string;
    description?: string;
    versionId?: string;
    aliasName?: string;
    gversion?: string;
    weight?: number;
}
export default class Alias {
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
        credentials: ICredentials;
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
    findAlias({ serviceName, aliasName }: {
        serviceName: any;
        aliasName: any;
    }): Promise<any>;
    publish({ serviceName, description, aliasName, versionId, gversion, weight }: IProps): Promise<void>;
    list({ serviceName }: {
        serviceName: any;
    }, table?: any): Promise<any>;
    get({ serviceName, aliasName }: {
        serviceName: any;
        aliasName: any;
    }): Promise<any>;
    delete({ serviceName, aliasName }: {
        serviceName: any;
        aliasName: any;
    }): Promise<any>;
    deleteAll({ serviceName }: {
        serviceName: any;
    }): Promise<void>;
    private updateAlias;
    private createAlias;
}
export {};
