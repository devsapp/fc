export interface EvalOption {
  serviceName: string;
  functionName: string;
  evalType: string;
  functionType?: string;
  runCount?: number;
  memorySizeList?: string;
  qualifier?: string;
  rt?: number;
  memory?: number;
  concurrencyArgs?: string;
}
