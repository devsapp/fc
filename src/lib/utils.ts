export function isAutoConfig(config: any): boolean {
  return config === 'auto' || config === 'Auto';
}

export function genServiceStateID(accountID, region, serviceName): string {
  return `${accountID}-${region}-${serviceName}`;
}

export function getFcNames(argsParse, inputsProps) {
  if (argsParse?.region) {
    return {
      region: argsParse.region,
      serviceName: argsParse['service-name'],
      functionName: argsParse['function-name'],
    };
  }

  return {
    region: inputsProps?.region,
    serviceName: inputsProps?.service?.name,
    functionName: inputsProps?.function?.name,
  };
}
