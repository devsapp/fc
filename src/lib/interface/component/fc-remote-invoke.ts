
export interface FcInvokeProps {
  region: string;
  serviceName: string;
  functionName: string;
  qualifier?: string;
  timeout?: number;
  runtime?: string;
}
