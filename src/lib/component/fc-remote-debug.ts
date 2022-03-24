import * as core from '@serverless-devs/core';
import { IInputs } from '../interface/interface';
import * as HELP from '../help/remote';
import { componentMethodCaller } from '../utils';
import logger from '../../common/logger';

const { lodash: _ } = core;

export default class FcRemoteDebug {
  static async handlerComponentInputs(inputs: IInputs) {
    const { args, argsObj } = inputs;
    const SUPPORTED_METHOD = ['setup', 'invoke', 'cleanup'];

    const apts = {
      boolean: ['help'],
      alias: { help: 'h' },
    };
    // @ts-ignore
    const comParse: any = core.commandParse({ args, argsObj }, apts);
    const argsData: any = comParse?.data || {};
    const nonOptionsArgs = argsData?._ || [];
    logger.debug(`nonOptionsArgs is ${JSON.stringify(nonOptionsArgs)}`);
    const showHelp = nonOptionsArgs.length === 0;
    if (showHelp || (argsData?.help && showHelp)) {
      core.help(HELP.REMOTE);
      return { isHelp: true };
    }

    const methodName: string = nonOptionsArgs[0];
    if (!SUPPORTED_METHOD.includes(methodName)) {
      logger.error(`Not supported sub-command: [${methodName}]`);
      core.help(HELP.REMOTE);
      return { isHelp: true };
    }

    return { methodName, subCommandHelp: argsData?.help };
  }

  static async setup(inputs: IInputs): Promise<any> {
    return await componentMethodCaller(inputs, 'devsapp/fc-remote-debug', 'setup');
  }

  static async invoke(inputs: IInputs): Promise<any> {
    return await componentMethodCaller(inputs, 'devsapp/fc-remote-debug', 'invoke');
  }

  static async cleanup(inputs: IInputs): Promise<any> {
    return await componentMethodCaller(inputs, 'devsapp/fc-remote-debug', 'cleanup');
  }

  private readonly userInputs: IInputs;

  constructor(inputs: IInputs) {
    this.userInputs = inputs;
  }

  makeInputs(methodName: string): IInputs {
    const inputs: IInputs = _.cloneDeep(this.userInputs);
    inputs.command = methodName;
    return inputs;
  }
}
