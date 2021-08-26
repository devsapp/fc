import { ICredentials } from '../interface/profile';
interface GetOnDemand {
    serviceName: string;
    qualifier: string;
    functionName: string;
}
interface ListOnDemand {
    serviceName: string;
}
interface RemoveOnDemand {
    serviceName: string;
    qualifier: string;
    functionName: string;
}
interface RemoveAllOnDemand {
    serviceName: string;
    qualifier?: string;
    assumeYes?: boolean;
}
interface PutOnDemand {
    serviceName: string;
    qualifier: string;
    functionName: string;
    maximumInstanceCount: number;
}
interface IProps {
    region?: string;
    serviceName?: string;
    qualifier?: string;
    functionName?: string;
    maximumInstanceCount?: number;
}
export default class OnDemand {
    static handlerInputs(inputs: any): Promise<{
        help: boolean;
        helpKey: string;
        errorMessage?: undefined;
        subCommand?: undefined;
        credentials?: undefined;
        props?: undefined;
        table?: undefined;
    } | {
        help: boolean;
        helpKey: string;
        errorMessage: string;
        subCommand?: undefined;
        credentials?: undefined;
        props?: undefined;
        table?: undefined;
    } | {
        help: boolean;
        subCommand: any;
        helpKey: any;
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
        helpKey?: undefined;
        errorMessage?: undefined;
    }>;
    list({ serviceName }: ListOnDemand, table?: any): Promise<any>;
    get({ serviceName, qualifier, functionName }: GetOnDemand): Promise<any>;
    remove({ serviceName, qualifier, functionName }: RemoveOnDemand): Promise<any>;
    put({ serviceName, qualifier, functionName, maximumInstanceCount }: PutOnDemand): Promise<any>;
    removeAll({ serviceName, qualifier, assumeYes }: RemoveAllOnDemand): Promise<void>;
    private forDelete;
}
export {};
