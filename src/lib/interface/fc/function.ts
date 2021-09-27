export interface FunctionConfig {
  name: string;
  description?: string;
  codeUri?: string;
  ossBucket?: string;
  ossKey?: string; // conflict with codeUri
  caPort?: number;
  customContainerConfig?: CustomContainerConfig;
  handler: string;
  memorySize?: number;
  gpuMemorySize?: number;
  runtime: string;
  timeout?: number;
  environmentVariables?: {
    [key: string]: any;
  };
  initializationTimeout?: number;
  initializer?: string;
  instanceConcurrency?: number;
  instanceType?: string;
}

export interface CustomContainerConfig {
  image: string;
  command?: string;
  args?: string;
}
