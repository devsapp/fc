export interface LogConfig {
  project: string;
  logstore: string;
}

export function isLogConfig(args: any): args is LogConfig {
  return args && args.project && args.logstore;
}
