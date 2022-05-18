export interface FunctionConfig {
  name: string;
  description?: string;
  caPort?: number;
  customContainerConfig?: CustomContainerConfig;
  customRuntimeConfig?: CustomRuntimeConfig;
  handler: string;
  memorySize?: number;
  runtime: string;
  timeout?: number;
  environmentVariables?: {
    [key: string]: any;
  };
  instanceConcurrency?: number;
  instanceType?: string
  codeUri?: string;
  ossBucket?: string;
  ossKey?: string; // conflict with codeUri
  gpuMemorySize?: number;
  asyncConfiguration?: {
    statefulInvocation?: boolean;
    maxAsyncRetryAttempts?: number;
    maxAsyncEventAgeInSeconds?: number;
    destination?: {
      onSuccess?: string;
      onFailure?: string;
    };
  };
  initializationTimeout?: number; // 优先级低于 instanceLifecycleConfig.initializer.timeout 
  initializer?: string;  // 优先级低于 instanceLifecycleConfig.initializer.handler
  instanceLifecycleConfig?: {
    initializer?: {
      handler?: string;
      timeout?: number;
    }
    preFreeze?: {
      handler?: string;
      timeout?: number;
    };
    preStop?: {
      handler?: string;
      timeout?: number;
    };
  };
  customDNS?: {
    nameServers?: string[] | null;
    searches?: string[] | null;
    dnsOptions?: Array<{
      name: string;
      value: string;
    }> | null;
  };
}

interface CustomRuntimeConfig {
  command: string[];
  args?: string[];
}

interface CustomContainerConfig {
  image: string;
  command?: string;
  args?: string;
  instanceID?: string;
  accelerationType?: 'Default' | 'None';
}