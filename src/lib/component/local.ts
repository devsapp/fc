import * as core from '@serverless-devs/core';
import logger from '../../common/logger';
import * as HELP from '../help/local';

const SUPPORTED_LOCAL_METHOD: string[] = ['invoke', 'start'];

export default class Local {
  static async handlerComponentInputs(inputs) {
    const { args, argsObj } = inputs;
    const parsedArgs: { [key: string]: any } = core.commandParse(
      // @ts-ignore
      { args, argsObj },
      { boolean: ['help'], alias: { help: 'h' }},
    );
    const argsData: any = parsedArgs?.data || {};
    const nonOptionsArgs = parsedArgs.data?._;
    if (argsData?.help && nonOptionsArgs.length === 0) {
      core.help(HELP.LOCAL_HELP_INFO);
      return;
    }

    if (!nonOptionsArgs || nonOptionsArgs.length === 0) {
      logger.error(' Error: expects argument invoke/start.');
      // help info
      return;
    }
    const methodName: string = nonOptionsArgs[0];
    if (!SUPPORTED_LOCAL_METHOD.includes(methodName)) {
      throw new core.CatchableError(`Unsupported subcommand ${methodName} for local method, only start and invoke are supported.`);
    }
    if (argsData?.help && methodName === 'start') {
      core.help(HELP.LOCAL_START_HELP_INFO);
      return { isHelp: true };
    }
    if (argsData?.help && methodName === 'invoke') {
      core.help(HELP.LOCAL_INVOKE_HELP_INFO);
      return { isHelp: true };
    }
    // 删除 methodName
    const fcLocalInvokeArgs: string = args
      ? args.replace(methodName, '').replace(/(^\s*)|(\s*$)/g, '')
      : '';
    logger.debug(`Args of local method is: ${fcLocalInvokeArgs}`);

    return { methodName, fcLocalInvokeArgs };
  }
}