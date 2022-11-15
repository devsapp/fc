import { IInputs, IProperties } from './interface/interface';
import { ICredentials } from './interface/profile';
import { TriggerConfig } from './interface/fc/trigger';
import Table from 'tty-table';
import _ from 'lodash';
import * as core from '@serverless-devs/core';
import logger from '../common/logger';
import inquirer from 'inquirer';

export const useFcBackend = process.env.BUILD_IMAGE_ENV === 'fc-backend';

export async function getCredentials(credentials: ICredentials, access: string) {
  if (_.isEmpty(credentials)) {
    return await core.getCredential(access);
  }
  return credentials;
}

export async function promptForConfirmOrDetails(message: string): Promise<boolean> {
  const answers: any = await inquirer.prompt([
    {
      type: 'list',
      name: 'prompt',
      message,
      choices: ['yes', 'no'],
    },
  ]);

  return answers.prompt === 'yes';
}

export function isAutoConfig(config: any): boolean {
  return config === 'auto' || config === 'Auto';
}

export function getFcNames(argsParse, inputsProps) {
  return {
    region: argsParse.region || inputsProps?.region,
    serviceName: argsParse['service-name'] || inputsProps?.service?.name,
    functionName: argsParse['function-name'] || inputsProps?.function?.name,
  };
}

export function isHttpFunction(props: IProperties): boolean {
  const triggers: TriggerConfig[] = props?.triggers;
  if (_.isEmpty(triggers)) {
    return false;
  }
  for (const trigger of triggers) {
    if (trigger.type === 'http') {
      return true;
    }
  }
  return false;
}

export const tableShow = (data, showKey) => {
  const options = {
    borderStyle: 'solid',
    borderColor: 'white',
    headerAlign: 'center',
    align: 'left',
    color: 'white',
    width: '100%',
  };
  const header_option = {
    headerColor: 'white',
    color: 'white',
    align: 'left',
    width: 'auto',
    formatter: (value) => value,
  };
  const header = showKey.map((value) =>
    (_.isString(value)
      ? {
        ...header_option,
        value,
      }
      : { ...header_option, ...value }));

  console.log(Table(header, data, options).render());
};

export async function componentMethodCaller(
  inputs: IInputs,
  componentName: string,
  methodName: string,
  props?: any,
  args?: string,
  argsObj?: any,
): Promise<any> {
  inputs.props = props || inputs?.props;
  inputs.args = args || inputs?.args;
  inputs.argsObj = argsObj || inputs?.argsObj;
  const componentIns: any = await core.load(`${componentName}`);
  logger.debug(`Inputs of component: ${componentName} is: ${JSON.stringify(inputs, null, '  ')}`);
  return await componentIns[methodName](inputs);
}
