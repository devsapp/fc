import { ICredentials } from '../interface/profile';
interface IProps {
    region: string;
    serviceName: string;
    description?: string;
    versionId?: string;
    assumeYes?: boolean;
}
interface Publish {
    serviceName: string;
    description?: string;
}
interface Remove {
    serviceName: string;
    versionId: string;
}
interface RemoveAll {
    serviceName: string;
    assumeYes?: boolean;
}
export default class Version {
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
        helpKey: any;
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
        helpKey?: undefined;
        errorMessage?: undefined;
    }>;
    list({ serviceName }: {
        serviceName: string;
    }, table?: boolean): Promise<any>;
    publish({ serviceName, description }: Publish): Promise<any>;
    remove({ serviceName, versionId }: Remove): Promise<void>;
    removeAll({ serviceName, assumeYes }: RemoveAll): Promise<void>;
    private forDeleteVersion;
}
export {};
