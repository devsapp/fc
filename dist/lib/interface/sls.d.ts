export interface LogConfig {
    project: string;
    logstore: string;
}
export declare function isLogConfig(args: any): args is LogConfig;
