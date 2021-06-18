import { IProperties } from './interface/interface';
import { TriggerConfig } from './interface/fc/trigger';
import _ from 'lodash';

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

export function isHttpFunction(props: IProperties): boolean {
  const triggers: TriggerConfig[] = props?.triggers;
  if (_.isEmpty(triggers)) { return false; }
  for (const trigger of triggers) {
    if (trigger.type === 'http') { return true; }
  }
  return false;
}
