import { ICredentials } from '../interface/profile';
interface IProps {
    region: string;
    serviceName: string;
    description?: string;
    versionId?: string;
}
export default class Version {
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
    list({ serviceName }: {
        serviceName: any;
    }, table?: any): Promise<any>;
    publish({ serviceName, description }: {
        serviceName: any;
        description: any;
    }): Promise<any>;
    delete({ serviceName, versionId }: {
        serviceName: any;
        versionId: any;
    }): Promise<void>;
    deleteAll(props: IProps): Promise<void>;
}
export {};
