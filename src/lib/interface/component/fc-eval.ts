export interface EvalOption {
  serviceName: string;
  functionName: string;
  functionType: string;
  evalType: string;
  runCount?: number;
  memorySizeList?: string;
  qualifier?: string;
  rt?: number;
  memory?: number;
  concurrencyArgs?: string;
}
