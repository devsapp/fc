import { LogConfig } from '../sls';
export interface TriggerConfig {
    name: string;
    type: 'oss' | 'log' | 'timer' | 'http' | 'mnsTopic' | 'cdnEvents';
    role?: string;
    sourceArn?: string;
    config: OssTriggerConfig | LogTriggerConfig | TimerTriggerConfig | HttpTriggerConfig | MnsTriggerConfig | CdnTriggerConfig;
}
export interface CdnTriggerConfig {
    eventName: string;
    eventVersion: string;
    notes: string;
    filter: CdnFilterConfig;
}
export declare function instanceOfCdnTriggerConfig(data: any): data is CdnTriggerConfig;
export interface CdnFilterConfig {
    domain: string[];
}
export interface TimerTriggerConfig {
    cronExpression: string;
    enable: boolean;
    payload: string;
}
export declare function instanceOfTimerTriggerConfig(data: any): data is TimerTriggerConfig;
export interface HttpTriggerConfig {
    authType: string;
    methods: string[];
}
export declare function instanceOfHttpTriggerConfig(data: any): data is HttpTriggerConfig;
export interface MnsTriggerConfig {
    topicName: string;
    region?: string;
    notifyContentFormat?: 'STREAM' | 'JSON';
    notifyStrategy?: 'BACKOFF_RETRY' | 'EXPONENTIAL_DECAY_RETRY';
    filterTag?: string;
}
export declare function instanceOfMnsTriggerConfig(data: any): data is MnsTriggerConfig;
export interface LogTriggerConfig {
    jobConfig: LogTriggerJobConfig;
    logConfig: LogConfig;
    functionParameter?: {
        [key: string]: any;
    };
    sourceConfig: LogTriggerSourceConfig;
    enable: boolean;
}
export declare function instanceOfLogTriggerConfig(data: any): data is LogTriggerConfig;
export interface LogTriggerJobConfig {
    maxRetryTime?: string;
    triggerInterval?: string;
}
export interface LogTriggerSourceConfig {
    logstore: string;
}
export interface OssTriggerConfig {
    bucketName: string;
    events: string[];
    filter: filterConfig;
}
export declare function instanceOfOssTriggerConfig(data: any): data is OssTriggerConfig;
export interface filterConfig {
    Key: {
        Prefix: string;
        Suffix: string;
    };
}
export interface ossObjectConfig {
    discriminator?: 'ossObjectConfig';
    ossBucket?: string;
    ossKey?: string;
}
