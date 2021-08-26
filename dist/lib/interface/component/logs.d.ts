import { LogConfig } from '../sls';
export interface LogsProps {
    region: string;
    logConfig: LogConfig;
    topic: string;
    query: string;
}
