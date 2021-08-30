import { IInputs, IProperties } from './interface/interface';
import { ICredentials } from './interface/profile';
export declare function getCredentials(credentials: ICredentials, access: string): Promise<any>;
export declare function promptForConfirmOrDetails(message: string): Promise<boolean>;
export declare function isAutoConfig(config: any): boolean;
export declare function genServiceStateID(accountID: any, region: any, serviceName: any): string;
export declare function getFcNames(argsParse: any, inputsProps: any): {
    region: any;
    serviceName: any;
    functionName: any;
};
export declare function isHttpFunction(props: IProperties): boolean;
export declare const tableShow: (data: any, showKey: any) => void;
export declare function componentMethodCaller(inputs: IInputs, componentName: string, methodName: string, props?: any, args?: string, argsObj?: any): Promise<any>;
export declare function extract(regex: RegExp, endpoint: string): string;
