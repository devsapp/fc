import { IProperties } from './interface/interface';
export declare function isAutoConfig(config: any): boolean;
export declare function genServiceStateID(accountID: any, region: any, serviceName: any): string;
export declare function getFcNames(argsParse: any, inputsProps: any): {
    region: any;
    serviceName: any;
    functionName: any;
};
export declare function isHttpFunction(props: IProperties): boolean;
export declare const tableShow: (data: any, showKey: any) => void;
