import * as core from '@serverless-devs/core';
import * as yaml from 'js-yaml';
import * as HELP from '../help/eval';
import { EvalOption } from '../interface/component/fc-eval';
import { HttpTypeOption, PayloadOption } from '../interface/component/fc-common';
import logger from '../../common/logger';
import { isHttpFunction } from '../utils';
import { IInputs } from '../interface/interface';

export default class FcEval {
  static async handlerComponentInputs(inputs: IInputs): Promise<any> {
    const { props, project } = inputs;
    const SUPPORTED_METHOD: string[] = ['start'];
    const DEFAULT_EVAL_TYPE = 'memory';

    const apts = {
      boolean: ['help', 'assume-yes'],
      alias: {
        help: 'h',
        region: 'r',
        access: 'a',
        'payload-file': 'f',
        'assume-yes': 'y',
      },
    };
    const args: string = (inputs?.args || '').replace(/(^\s*)|(\s*$)/g, '');
    const comParse: any = core.commandParse({ ...inputs, args }, apts);
    const argsData: any = comParse?.data || {};
    const nonOptionsArgs = argsData?._ || [];

    logger.debug(`nonOptionsArgs is ${JSON.stringify(nonOptionsArgs)}`);
    if (!argsData) {
      logger.error('Not fount sub-command.');
      core.help(HELP.EVAL);
      return { isHelp: true };
    }
    if (nonOptionsArgs.length === 0) {
      if (!argsData?.help) {
        logger.error('Not fount sub-command.');
      }
      core.help(HELP.EVAL);
      return { isHelp: true };
    }

    const commandName: string = nonOptionsArgs[0];
    if (!SUPPORTED_METHOD.includes(commandName)) {
      logger.error(`Not supported sub-command: [${commandName}]`);
      core.help(HELP.EVAL);
      return { isHelp: true };
    }

    if (argsData?.help) {
      core.help(HELP.EVAL_START);
      return { isHelp: true };
    }
    let functionType = argsData['function-type'];
    // yaml 模式
    if (props?.service?.name && props?.function?.name) {
      functionType = functionType || isHttpFunction(props) ? 'http' : 'event';
    }

    const evalOpts: EvalOption = {
      serviceName: argsData['service-name'] || props?.service?.name,
      functionName: argsData['function-name'] || props?.function?.name,
      functionType,
      evalType: argsData['eval-type'] || DEFAULT_EVAL_TYPE,
      memorySizeList: argsData['memory-size'],
      runCount: argsData['run-count'],
      rt: argsData?.rt,
      memory: argsData?.memory,
      concurrencyArgs: argsData['concurrency-args'],
    };

    const httpTypeOpts: HttpTypeOption = {
      url: argsData?.url,
      method: argsData?.method,
      path: argsData?.path,
      query: argsData?.query,
      body: argsData?.body,
      headers: argsData?.headers,
    };
    logger.debug(`Using http options: \n${yaml.dump(httpTypeOpts)}`);
    const payloadOpts: PayloadOption = {
      payloadFile: argsData['payload-file'],
      payload: argsData?.payload,
    };

    const region = props?.region || argsData?.region;
    return { project, evalOpts, httpTypeOpts, payloadOpts, region, commandName };
  }

  private readonly httpTypeOpts?: HttpTypeOption;
  private readonly evalOpts?: EvalOption;
  private readonly payloadOpts?: PayloadOption;
  private readonly region: string;
  private readonly access: string;

  constructor(
    access: string,
    region: string,
    evalOpts?: EvalOption,
    httpTypeOpts?: HttpTypeOption,
    payloadOpts?: PayloadOption,
  ) {
    this.access = access;
    this.region = region;
    this.evalOpts = evalOpts;
    this.payloadOpts = payloadOpts;
    this.httpTypeOpts = httpTypeOpts;
  }

  isJSONString(str) {
    if (typeof str === 'string') {
      try {
        const obj = JSON.parse(str);
        if (typeof obj === 'object' && obj) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
    return false;
  }

  makeStartArgs(): string {
    let args = `--region ${this.region} --access ${this.access} --eval-type ${this.evalOpts?.evalType}`;
    if (this.evalOpts?.functionType) {
      args += ` --function-type ${this.evalOpts?.functionType}`;
    }
    if (this.evalOpts.evalType === 'memory') {
      if (this.evalOpts?.memorySizeList) {
        args += ` --memory-size ${this.evalOpts?.memorySizeList}`;
      }
      if (this.evalOpts?.runCount) {
        args += ` --run-count ${this.evalOpts?.runCount}`;
      }
    } else {
      if (this.evalOpts?.concurrencyArgs) {
        args += ` --concurrency-args ${this.evalOpts?.concurrencyArgs}`;
      }
      if (this.evalOpts?.memory) {
        args += ` --memory ${this.evalOpts?.memory}`;
      }
      if (this.evalOpts?.rt) {
        args += ` --rt ${this.evalOpts?.rt}`;
      }
    }

    if (this.evalOpts?.qualifier) {
      args += ` --qualifier ${this.evalOpts?.qualifier}`;
    }
    args += ` --service-name ${this.evalOpts?.serviceName} --function-name ${this.evalOpts?.functionName}`;

    if (this.httpTypeOpts?.method) {
      args += ` --method ${this.httpTypeOpts?.method}`;
    }
    if (this.httpTypeOpts?.path) {
      args += ` --path ${this.httpTypeOpts?.path}`;
    }
    if (this.httpTypeOpts?.query) {
      args += ` --query ${this.httpTypeOpts?.query}`;
    }
    if (this.httpTypeOpts?.headers) {
      const headers = this.httpTypeOpts?.headers;
      const jsonObj = JSON.parse(headers);
      args += ` --headers ${JSON.stringify(jsonObj)}`;
    }
    if (this.payloadOpts?.payload) {
      const payload = this.payloadOpts?.payload;
      if (this.isJSONString(payload)) {
        const jsonObj = JSON.parse(payload);
        args += ` --payload ${JSON.stringify(jsonObj)}`;
      } else {
        args += ` --payload ${payload}`;
      }
    }
    if (this.payloadOpts?.payloadFile) {
      args += ` --payload-file ${this.payloadOpts?.payloadFile}`;
    }
    return args;
  }
}
