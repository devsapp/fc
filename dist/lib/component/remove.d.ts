import { ICredentials } from '../interface/profile';
interface RemoveOnDemandOrProvision {
    region: string;
    serviceName: string;
    qualifier?: string;
    functionName?: string;
    assumeYes?: boolean;
}
interface RemoveAlias {
    region: string;
    serviceName: string;
    aliasName?: string;
    assumeYes?: boolean;
}
interface RemoveVersion {
    region: string;
    serviceName: string;
    versionId?: string;
    assumeYes?: boolean;
}
interface EndProps {
    region: string;
    assumeYes?: boolean;
    onlyLocal?: boolean;
    serviceName?: string;
    functionName?: string;
    qualifier?: string;
    layerName?: string;
    versionId?: string;
    aliasName?: string;
}
interface IRemove {
    props: EndProps;
    subCommand?: 'layer' | 'domain' | 'onDemand' | 'provision' | 'alias' | 'version' | 'service' | 'function' | 'trigger';
}
export default class Remove {
    static handlerInputs(inputs: any): Promise<{
        errorMessage: string;
        help?: undefined;
        subCommand?: undefined;
        credentials?: undefined;
        props?: undefined;
        args?: undefined;
        table?: undefined;
    } | {
        help: boolean;
        subCommand: any;
        errorMessage?: undefined;
        credentials?: undefined;
        props?: undefined;
        args?: undefined;
        table?: undefined;
    } | {
        credentials: ICredentials;
        subCommand: any;
        props: EndProps;
        args: any;
        table: any;
        errorMessage?: undefined;
        help?: undefined;
    }>;
    removeOnDemand({ region, qualifier, serviceName, functionName, assumeYes }: RemoveOnDemandOrProvision): Promise<any>;
    removeProvision({ region, qualifier, serviceName, functionName, assumeYes }: RemoveOnDemandOrProvision): Promise<any>;
    removeAlias({ region, serviceName, aliasName, assumeYes }: RemoveAlias): Promise<any>;
    removeVersion({ region, serviceName, versionId, assumeYes }: RemoveVersion): Promise<void>;
    remove({ props, subCommand }: IRemove, inputs: any): Promise<any>;
    private genInputs;
}
export {};
