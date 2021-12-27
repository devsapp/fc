import { ICredentials } from '../interface/profile';
interface IProps {
    region?: string;
    serviceName?: string;
    qualifier?: string;
    functionName?: string;
    config?: string;
    target?: number;
}
interface GetProvision {
    serviceName: string;
    qualifier: string;
    functionName: string;
}
interface ListProvision {
    serviceName?: string;
    qualifier?: string;
}
interface RemoveAllProvision {
    serviceName: string;
    qualifier?: string;
    assumeYes?: boolean;
}
interface PutProvision {
    serviceName: string;
    qualifier: string;
    functionName: string;
    target?: number;
    config?: string;
}
export default class Provision {
    static handlerInputs(inputs: any): Promise<{
        help: boolean;
        errorMessage?: undefined;
        subCommand?: undefined;
        credentials?: undefined;
        props?: undefined;
        table?: undefined;
    } | {
        help: boolean;
        errorMessage: string;
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
        help?: undefined;
        errorMessage?: undefined;
    }>;
    get({ serviceName, qualifier, functionName }: GetProvision): Promise<any>;
    put({ serviceName, qualifier, functionName, config, target }: PutProvision): Promise<any>;
    list({ serviceName, qualifier }: ListProvision, table?: any): Promise<any>;
    removeAll({ serviceName, qualifier, assumeYes }: RemoveAllProvision): Promise<void>;
    private forDelete;
}
export {};
