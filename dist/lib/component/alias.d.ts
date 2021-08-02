import { ICredentials } from '../interface/profile';
interface IProps {
    region?: string;
    serviceName: string;
    description?: string;
    versionId?: string;
    aliasName?: string;
    gversion?: string;
    weight?: number;
    assumeYes?: boolean;
}
interface FindAlias {
    serviceName: string;
    aliasName: string;
}
interface GetAlias {
    serviceName: string;
    aliasName: string;
}
interface RemoveAlias {
    serviceName: string;
    aliasName: string;
}
interface RemoveAliasAll {
    serviceName: string;
    assumeYes?: boolean;
}
interface Publish {
    serviceName: string;
    aliasName: string;
    versionId: string;
    description?: string;
    gversion?: string;
    weight?: number;
}
export default class Alias {
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
        helpKey: string;
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
    region: string;
    credentials: ICredentials;
    findAlias({ serviceName, aliasName }: FindAlias): Promise<any>;
    publish({ serviceName, description, aliasName, versionId, gversion, weight }: Publish): Promise<void>;
    list({ serviceName }: {
        serviceName: string;
    }, table?: boolean): Promise<any>;
    get({ serviceName, aliasName }: GetAlias): Promise<any>;
    remove({ serviceName, aliasName }: RemoveAlias): Promise<any>;
    removeAll({ serviceName, assumeYes }: RemoveAliasAll): Promise<void>;
    private forDataDelete;
    private showAlias;
    private updateAlias;
    private createAlias;
}
export {};
