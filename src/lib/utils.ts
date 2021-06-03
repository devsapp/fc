export function isAutoConfig(config: any): boolean {
  return config === 'auto' || config === 'Auto';
}

export function genServiceStateID(accountID, region, serviceName): string {
  return `${accountID}-${region}-${serviceName}`;
}
