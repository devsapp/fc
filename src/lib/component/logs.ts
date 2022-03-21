import * as core from '@serverless-devs/core';
import logger from '../../common/logger';
import { LOGS } from '../help';
import { isLogConfig, LogsProps } from '../interface/sls';
import { getFcNames } from '../utils';

export default class Log {
  static async handlerComponentInputs(inputs, info) {
    const { props, args, argsObj } = inputs;  
    const minimistOpts = {
      boolean: ['help'],
      string: ['region', 'service-name', 'function-name'],
      alias: { help: 'h' },
    };
    const comParse: any = core.commandParse(
      // @ts-ignore
      { args, argsObj },
      minimistOpts,
    )?.data;
    if (comParse?.help) {
      core.help(LOGS);
      return { isHelp: true };
    }

    const { region, serviceName, functionName } = getFcNames(comParse, props);
    logger.debug(
      `[logs] region: ${region}, serviceName: ${serviceName}, functionName: ${functionName}`,
    );

    let logsPayload: LogsProps;
    try {
      const { logConfig } =
        (
          await info({
            ...inputs,
            props: {
              region,
              service: { name: serviceName },
              // @ts-ignore
              function: { name: functionName },
            },
            args: '',
          })
        ).service || {};

      if (!isLogConfig(logConfig)) {
        throw new Error(
          'The service logConfig is not found online, please confirm whether logConfig is configured first, and then execute [s deploy].',
        );
      }

      logsPayload = {
        project: logConfig?.project,
        logstore: logConfig?.logstore,
        regionId: region,
        topic: serviceName,
        query: functionName,
      };
    } catch (ex) {
      if (ex.code?.endsWith('NotFound')) {
        throw new Error(
          `Online search failed, error message: ${ex.message}. Please execute [s deploy]`,
        );
      }
      throw ex;
    }

    return { logsPayload, args };
  }
}