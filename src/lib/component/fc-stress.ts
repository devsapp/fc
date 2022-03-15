import * as core from '@serverless-devs/core';
import * as yaml from 'js-yaml';
import { HttpTypeOption, EventTypeOption, PayloadOption } from '../interface/component/fc-common';
import { StressOption } from '../interface/component/fc-stress';
import * as HELP from '../help/stress';
import { IInputs } from '../interface/interface';
import logger from '../../common/logger';
import { isHttpFunction } from '../utils';

export default class FcStress {
  static async handlerComponentInputs(inputs: IInputs) {
    const { props, project } = inputs;
    const SUPPORTED_METHOD: string[] = ['start', 'clean'];
    const STRESS_SUB_COMMAND_HELP_KEY = {
      start: HELP.STRESS_START,
      clean: HELP.STRESS_CLEAN,
    };

    const apts = {
      boolean: ['help', 'assume-yes'],
      alias: {
        help: 'h',
        region: 'r',
        access: 'a',
        qualifier: 'q',
        url: 'u',
        method: 'm',
        payload: 'p',
        'payload-file': 'f',
        'assume-yes': 'y',
      },
    };
    const comParse: any = core.commandParse(inputs, apts);
    const argsData: any = comParse?.data || {};
    const nonOptionsArgs = argsData?._ || [];

    logger.debug(`nonOptionsArgs is ${JSON.stringify(nonOptionsArgs)}`);
    if (!argsData) {
      logger.error('Not found sub-command.');
      core.help(HELP.STRESS);
      return { isHelp: true };
    }
    if (nonOptionsArgs.length === 0) {
      if (!argsData?.help) {
        logger.error('Not found sub-command.');
      }
      core.help(HELP.STRESS);
      return { isHelp: true };
    }

    const commandName: string = nonOptionsArgs[0];
    if (!SUPPORTED_METHOD.includes(commandName)) {
      logger.error(`Not supported sub-command: [${commandName}]`);
      core.help(HELP.STRESS);
      return { isHelp: true };
    }

    if (argsData?.help) {
      core.help(STRESS_SUB_COMMAND_HELP_KEY[commandName]);
      return { isHelp: true };
    }
    const stressOpts: StressOption = {
      functionType: argsData['function-type'] || (isHttpFunction(props) ? 'http' : 'event'),
      numUser: argsData['num-user'],
      spawnRate: argsData['spawn-rate'],
      runningTime: argsData['run-time'],
      invocationType: argsData['invocation-type'],
    };

    let eventTypeOpts: EventTypeOption = null;
    let httpTypeOpts: HttpTypeOption = null;
    if (stressOpts?.functionType === 'event') {
      eventTypeOpts = {
        serviceName: argsData['service-name'] || props?.service?.name,
        functionName: argsData['function-name'] || props?.function?.name,
        qualifier: argsData?.qualifier,
      };
      logger.debug(`Using event options: \n${yaml.dump(eventTypeOpts)}`);
    } else if (stressOpts?.functionType === 'http') {
      httpTypeOpts = {
        url: argsData?.url,
        method: argsData?.method,
      };
      logger.debug(`Using http options: \n${yaml.dump(httpTypeOpts)}`);
    }
    const payloadOpts: PayloadOption = {
      payloadFile: argsData['payload-file'],
      payload: argsData?.payload,
    };

    return {
      access: project?.access,
      region: props?.region || argsData?.region,
      commandName,
      stressOpts,
      httpTypeOpts,
      eventTypeOpts,
      payloadOpts,
      argsData,
    };
  }

  private readonly httpTypeOpts?: HttpTypeOption;
  private readonly eventTypeOpts?: EventTypeOption;
  private readonly stressOpts?: StressOption;
  private readonly payloadOpts?: PayloadOption;
  private readonly region: string;
  private readonly access: string;

  constructor(
    access: string,
    region: string,
    stressOpts?: StressOption,
    httpTypeOpts?: HttpTypeOption,
    eventTypeOpts?: EventTypeOption,
    payloadOpts?: PayloadOption,
  ) {
    this.access = access;
    this.region = region;
    this.stressOpts = stressOpts;
    this.payloadOpts = payloadOpts;
    this.eventTypeOpts = eventTypeOpts;
    this.httpTypeOpts = httpTypeOpts;
  }

  makeStartArgs(): string {
    let args = `--region ${this.region} --access ${this.access} --function-type ${this.stressOpts?.functionType}`;
    if (this.stressOpts?.numUser) {
      args += ` --num-user ${this.stressOpts?.numUser}`;
    }
    if (this.stressOpts?.spawnRate) {
      args += ` --spawn-rate ${this.stressOpts?.spawnRate}`;
    }
    if (this.stressOpts?.runningTime) {
      args += ` --run-time ${this.stressOpts?.runningTime}`;
    }
    if (this.stressOpts?.invocationType) {
      args += ` --invocation-type ${this.stressOpts?.invocationType}`;
    }
    if (this.isEventFunctionType()) {
      args += ` --service-name ${this.eventTypeOpts?.serviceName} --function-name ${this.eventTypeOpts?.functionName}`;
      if (this.eventTypeOpts?.qualifier) {
        args += ` --qualifier ${this.eventTypeOpts?.qualifier}`;
      }
    } else if (this.isHttpFunctionType()) {
      args += ` --url ${this.httpTypeOpts?.url} --method ${this.httpTypeOpts?.method}`;
    }

    if (this.payloadOpts?.payload) {
      args += ` --payload ${JSON.stringify(this.payloadOpts?.payload)}`;
    }
    if (this.payloadOpts?.payloadFile) {
      args += ` --payload-file ${this.payloadOpts?.payloadFile}`;
    }
    return args;
  }

  makeCleanArgs(assumeYes?: boolean): string {
    let args = `--region ${this.region} --access ${this.access}`;
    if (assumeYes) {
      args += ' -y';
    }
    return args;
  }

  private isEventFunctionType() {
    return this.stressOpts?.functionType === 'event';
  }
  private isHttpFunctionType() {
    return this.stressOpts?.functionType === 'http';
  }
}
