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

export function instanceOfCdnTriggerConfig(data: any): data is CdnTriggerConfig {
  return 'eventName' in data && 'eventVersion' in data && 'notes' in data && 'filter' in data;
}

export interface CdnFilterConfig {
  domain: string[];
}

export interface TimerTriggerConfig {
  cronExpression: string;
  enable: boolean;
  payload: string;
}

export function instanceOfTimerTriggerConfig(data: any): data is TimerTriggerConfig {
  return 'cronExpression' in data && 'enable' in data && 'payload' in data;
}

export interface HttpTriggerConfig {
  authType: string;
  methods: string[];
}

export function instanceOfHttpTriggerConfig(data: any): data is HttpTriggerConfig {
  return 'authType' in data && 'methods' in data;
}

export interface MnsTriggerConfig {
  topicName: string;
  region?: string;
  notifyContentFormat?: 'STREAM' | 'JSON';
  notifyStrategy?: 'BACKOFF_RETRY' | 'EXPONENTIAL_DECAY_RETRY';
  filterTag?: string;
}

export function instanceOfMnsTriggerConfig(data: any): data is MnsTriggerConfig {
  return 'topicName' in data;
}

export interface LogTriggerConfig {
  jobConfig: LogTriggerJobConfig;
  logConfig: LogConfig;
  functionParameter?: {
    [key: string]: any;
  };
  sourceConfig: LogTriggerSourceConfig;
  enable: boolean;
}

export function instanceOfLogTriggerConfig(data: any): data is LogTriggerConfig {
  return 'jobConfig' in data && 'logConfig' in data && 'sourceConfig' in data && 'enable' in data;
}

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
export function instanceOfOssTriggerConfig(data: any): data is OssTriggerConfig {
  return 'bucketName' in data && 'events' in data && 'filter' in data;
}
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
