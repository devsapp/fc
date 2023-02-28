import { lodash as _, CatchableError } from '@serverless-devs/core';
import { IProperties } from "../lib/interface/interface";

const checkName = (name: string) => {
  if (/^[_a-zA-Z][-_a-zA-Z0-9]*$/.test(name)) {
    return;
  }
  throw new CatchableError(`Name doesn't match expected format (allowed: ^[_a-zA-Z][-_a-zA-Z0-9]*$, actual: '${name}')`);
}

export const checkProps = (props: IProperties) => {
  const serviceName = _.get(props, 'service.name');
  if (serviceName) {
    checkName(serviceName);
  }
  const functionName = _.get(props, 'function.name');
  if (functionName) {
    checkName(functionName);
  }
}