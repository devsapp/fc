/* eslint-disable no-param-reassign */
import * as core from '@serverless-devs/core';
import * as _ from 'lodash';
import Logger from './common/logger';
import { LOCAL_HELP_INFO, NAS_HELP_INFO,
  NAS_SUB_COMMAND_HELP_INFO, LOCAL_INVOKE_HELP_INFO, LOCAL_START_HELP_INFO, BUILD_HELP_INFO,
  PLAN_HELP, EVAL, EVAL_START, FUN_TO_S, INFO, INVOKE, LOGS, METRICS, SYNC, REMOTE, REMOTE_SETUP,
  REMOTE_INVOKE, REMOTE_CLEANUP, PROXIED, PROXIED_SETUP, PROXIED_INVOKE, PROXIED_CLEANUP,
  STRESS, STRESS_START, STRESS_CLEAN,
} from './lib/help';
import * as DEPLOY_HELP from './lib/help/deploy';
import * as LAYER_HELP from './lib/help/layer';
import GenerateNasProps from './lib/transform-nas';
import { IInputs, IProperties } from './lib/interface/interface';
import { isLogConfig, LogsProps } from './lib/interface/sls';
import { FcInfoProps } from './lib/interface/component/fc-info';
import { FcSyncProps } from './lib/interface/component/fc-sync';
import { FcMetricsProps } from './lib/interface/component/fc-metrics';
import { getFcNames, isAutoConfig, isHttpFunction } from './lib/utils';
import * as tips from './lib/tips';
import FcStress from './lib/component/fc-stress';
import Version from './lib/component/version';
import Alias from './lib/component/alias';
import OnDemand from './lib/component/on-demand';
import Remove from './lib/component/remove';
import Plan from './lib/component/plan';
import Provision from './lib/component/provision';
import { PayloadOption, EventTypeOption, HttpTypeOption } from './lib/interface/component/fc-common';
import { StressOption } from './lib/interface/component/fc-stress';
import * as yaml from 'js-yaml';
import FcProxiedInvoke from './lib/component/fc-proxied-invoke';
import FcRemoteDebug from './lib/component/fc-remote-debug';
import FcEval from './lib/component/fc-eval';
import { EvalOption } from './lib/interface/component/fc-eval';
import { FcInvokeProps } from './lib/interface/component/fc-remote-invoke';
import path from 'path';
import os from 'os';
import fs from 'fs';

const SUPPORTED_LOCAL_METHOD: string[] = ['invoke', 'start'];
const DEPLOY_SUPPORT_CONFIG_ARGS = ['code', 'config'];

export default class FcBaseComponent {
  logger = Logger;
  async plan(inputs: IInputs) {
    const { isHelp, errorMessage, planType } = Plan.handlerInputs(inputs);
    if (errorMessage) {
      throw new Error(errorMessage);
    }
    if (isHelp) {
      return core.help(PLAN_HELP);
    }
    const palnRs = await this.componentMethodCaller(inputs, 'devsapp/fc-plan', 'plan', inputs.props, inputs.args);
    return Plan.showPlan(palnRs, planType);
  }

  async deploy(inputs: IInputs): Promise<any> {
    const { props, args } = this.handlerComponentInputs(inputs);
    const parsedArgs: {[key: string]: any} = core.commandParse(inputs, {
      boolean: ['help'],
      alias: { help: 'h' },
    });

    const parsedData = parsedArgs?.data || {};
    const rawData = parsedData._ || [];
    const commandList = ['all', 'service', 'function', 'trigger', 'domain'];

    const subCommand = rawData[0] || 'all';
    this.logger.debug(`deploy subCommand: ${subCommand}`);
    if (!commandList.includes(subCommand)) {
      this.logger.error(`Deploy ${subCommand} is not supported now.`);
      return core.help(DEPLOY_HELP.DEPLOY);
    }

    if (parsedData.help) {
      rawData[0] ? core.help(DEPLOY_HELP[`DEPLOY_${subCommand}`.toLocaleUpperCase()]) : core.help(DEPLOY_HELP.DEPLOY);
      return;
    }
    if (parsedData.type && !DEPLOY_SUPPORT_CONFIG_ARGS.includes(parsedData.type)) {
      core.help(DEPLOY_HELP.DEPLOY);
      throw new Error(`Type does not support ${parsedData.type}, only config and code are supported`);
    }

    const deployRes: any = await this.componentMethodCaller(inputs, 'devsapp/fc-deploy', 'deploy', props, args);
    tips.showNextTip(args, tips.showDeployNextTips);

    console.log('\n\n');
    const result: any = {};
    if (deployRes.region) {
      result.region = deployRes.region;
    }
    if (deployRes.service) {
      result.service = {};
      if (deployRes.service.name) {
        result.service.name = deployRes.service.name;
      }
    }
    if (deployRes.function) {
      result.function = {};
      if (deployRes.function.name) {
        result.function.name = deployRes.function.name;
      }
      if (deployRes.function.runtime) {
        result.function.runtime = deployRes.function.runtime;
      }
      if (deployRes.function.handler) {
        result.function.handler = deployRes.function.handler;
      }
      if (deployRes.function.memorySize) {
        result.function.memorySize = deployRes.function.memorySize;
      }
      if (!_.isEmpty(deployRes.function.gpuMemorySize)) {
        result.function.gpuMemorySize = deployRes.function.gpuMemorySize;
      }
      if (deployRes.function.timeout) {
        result.function.timeout = deployRes.function.timeout;
      }
    }
    if (deployRes.systemDomain) {
      result.url = {
        system_url: deployRes.systemDomain,
      };
    }
    if (deployRes.customDomains) {
      result.url = result.url || {};
      const temp_url = [];
      for (let i = 0; i < deployRes.customDomains.length; i++) {
        temp_url.push({
          domain: deployRes.customDomains[i].domainName,
          path: deployRes.customDomains[i].path,
        });
      }
      result.url.custom_domain = temp_url;
    }
    if (deployRes.triggers) {
      result.triggers = [];
      for (let i = 0; i < deployRes.triggers.length; i++) {
        result.triggers.push({
          type: deployRes.triggers[i].type,
          name: deployRes.triggers[i].name,
        });
      }
    }

    return result;
  }

  async remove(inputs: IInputs): Promise<any> {
    const {
      credentials,
      help,
      props,
      subCommand,
      errorMessage,
    } = await Remove.handlerInputs(inputs);

    await this.report('fc', subCommand ? `remove ${subCommand}` : 'remove', credentials?.AccountID);
    if (errorMessage) {
      throw new Error(errorMessage);
    }
    if (help) {
      return;
    }

    await new Remove().remove({
      props,
      subCommand,
    }, this.handlerInputs(inputs));
  }

  async info(inputs: IInputs): Promise<any> {
    const { props, args } = this.handlerComponentInputs(inputs);
    if (this.isHelp(args)) {
      core.help(INFO);
      return;
    }
    const propsGenerator = (property: any) => {
      if (_.isEmpty(property)) { return null; }
      const res: FcInfoProps = {
        region: property?.region,
        serviceName: property?.service?.name,
      };
      if (!_.isNil(property?.function?.name)) {
        Object.assign(res, {
          functionName: property?.function?.name,
        });
      }
      if (!_.isEmpty(property?.triggers)) {
        Object.assign(res, {
          triggerNames: property?.triggers.map((t) => t.name),
        });
      }
      if (!_.isEmpty(property?.customDomains)) {
        Object.assign(res, {
          customDomains: property?.customDomains.map((t) => t.domainName),
        });
      }
      return res;
    };
    return await this.componentMethodCaller(inputs, 'devsapp/fc-info', 'info', propsGenerator(props), args);
  }

  async sync(inputs: IInputs): Promise<any> {
    const { props, args } = this.handlerComponentInputs(inputs);
    if (this.isHelp(args)) {
      core.help(SYNC);
      return;
    }

    let property: undefined | FcSyncProps;

    if (!_.isEmpty(props)) {
      property = {
        region: props?.region,
        serviceName: props?.service?.name,
      };

      if (!_.isNil(props?.function?.name)) {
        property.functionName = props?.function?.name;
      }
    }

    return await this.componentMethodCaller(inputs, 'devsapp/fc-sync', 'sync', property, args);
  }

  async build(inputs: IInputs): Promise<any> {
    const { props, args, argsObj } = this.handlerComponentInputs(inputs);
    const parsedArgs: {[key: string]: any} = core.commandParse({ args, argsObj }, {
      boolean: ['help'],
      alias: { help: 'h' } });

    if (parsedArgs?.data?.help) {
      core.help(BUILD_HELP_INFO);
      return;
    }
    await this.componentMethodCaller(inputs, 'devsapp/fc-build', 'build', props, args);
    tips.showNextTip(args, tips.showBuildNextTips);
  }

  async local(inputs: IInputs): Promise<any> {
    const { props, args, argsObj } = this.handlerComponentInputs(inputs);
    const parsedArgs: {[key: string]: any} = core.commandParse({ args, argsObj }, {
      boolean: ['help'],
      alias: { help: 'h' } });
    const argsData: any = parsedArgs?.data || {};
    const nonOptionsArgs = parsedArgs.data?._;
    if (argsData?.help && nonOptionsArgs.length === 0) {
      core.help(LOCAL_HELP_INFO);
      return;
    }

    if (!nonOptionsArgs || nonOptionsArgs.length === 0) {
      this.logger.error(' Error: expects argument invoke/start.');
      // help info
      return;
    }
    const methodName: string = nonOptionsArgs[0];
    if (!SUPPORTED_LOCAL_METHOD.includes(methodName)) {
      this.logger.error(`Unsupported subcommand ${methodName} for local method, only start and invoke are supported.`);
      return;
    }
    if (argsData?.help && methodName === 'start') {
      core.help(LOCAL_START_HELP_INFO);
      return;
    }
    if (argsData?.help && methodName === 'invoke') {
      core.help(LOCAL_INVOKE_HELP_INFO);
      return;
    }
    // 删除 methodName
    const fcLocalInvokeArgs: string = args ? args.replace(methodName, '').replace(/(^\s*)|(\s*$)/g, '') : '';
    this.logger.debug(`Args of local method is: ${fcLocalInvokeArgs}`);

    inputs.argsObj.shift();
    const localRes: any = await this.componentMethodCaller(inputs, 'devsapp/fc-local-invoke', methodName, props, fcLocalInvokeArgs);
    tips.showNextTip(args, tips.showLocalNextTips);

    return localRes;
  }

  async invoke(inputs: IInputs): Promise<any> {
    const { props, args } = this.handlerComponentInputs(inputs);
    if (this.isHelp(args)) {
      core.help(INVOKE);
      return;
    }
    const invokePayload: FcInvokeProps = {
      region: props?.region,
      serviceName: props?.service?.name,
      functionName: props?.function?.name,
      timeout: props?.function?.timeout,
      runtime: props?.function?.runtime,
    };

    await this.componentMethodCaller(inputs, 'devsapp/fc-remote-invoke', 'invoke', invokePayload, args);
  }

  async logs(inputs: IInputs): Promise<any> {
    const { props, args, argsObj } = this.handlerComponentInputs(inputs);

    const comParse: any = core.commandParse({ args, argsObj }, {
      boolean: ['help'],
      string: ['region', 'service-name', 'function-name'],
      alias: { help: 'h' },
    })?.data;
    if (comParse?.help) {
      core.help(LOGS);
      return;
    }

    const { region, serviceName, functionName } = getFcNames(comParse, props);
    this.logger.debug(`[logs] region: ${region}, serviceName: ${serviceName}, functionName: ${functionName}`);

    let logsPayload: LogsProps;
    try {
      const { logConfig } = (await this.info({
        ...inputs,
        props: {
          region,
          service: { name: serviceName },
          // @ts-ignore
          function: { name: functionName },
        },
        args: '',
      })).service || {};

      if (!isLogConfig(logConfig)) {
        throw new Error('The service logConfig is not found online, please confirm whether logConfig is configured first, and then execute [s deploy].');
      }

      logsPayload = {
        project: logConfig?.project,
        logstore: logConfig?.logstore,
        regionId: region,
        topic: serviceName,
        query: props?.function?.name,
      };
    } catch (ex) {
      if (ex.code?.endsWith('NotFound')) {
        throw new Error(`Online search failed, error message: ${ex.message}. Please execute [s deploy]`);
      }
      throw ex;
    }

    await this.componentMethodCaller(inputs, 'devsapp/sls', 'logs', logsPayload, args);
  }

  async metrics(inputs: IInputs): Promise<any> {
    const { props, args, argsObj } = this.handlerComponentInputs(inputs);

    const comParse: any = core.commandParse({ args, argsObj }, {
      boolean: ['help'],
      string: ['region', 'service-name', 'function-name'],
      alias: { help: 'h' },
    })?.data;

    if (comParse?.help) {
      core.help(METRICS);
      return;
    }

    const payload: FcMetricsProps = getFcNames(comParse, props);

    await this.componentMethodCaller(inputs, 'devsapp/fc-metrics', 'metrics', payload, args);
  }

  async nas(inputs: IInputs) {
    const { props, args, project, argsObj } = this.handlerComponentInputs(inputs);
    const SUPPORTED_METHOD = ['init', 'download', 'upload', 'command'];

    const apts = {
      boolean: ['all', 'long', 'help', 'recursive', 'override', 'force', 'assume-yes'],
      alias: { force: 'f', override: 'o', recursive: 'r', help: 'h', long: 'l', 'assume-yes': 'y' },
    };
    const comParse: any = core.commandParse({ args, argsObj }, apts);
    const argsData: any = comParse?.data || {};

    const assumeYes: boolean = argsData.y || argsData['assume-yes'];
    const nonOptionsArgs = comParse.data?._ || [];
    this.logger.debug(`nonOptionsArgs is ${JSON.stringify(nonOptionsArgs)}`);
    if (!comParse?.data) {
      this.logger.error('Not found sub-command.');
      core.help(NAS_HELP_INFO);
      return;
    }

    if (nonOptionsArgs.length === 0) {
      if (!comParse?.data?.help) {
        this.logger.error('Not found sub-command.');
      }
      core.help(NAS_HELP_INFO);
      return;
    }

    const commandName: string = nonOptionsArgs[0];
    if (!SUPPORTED_METHOD.includes(commandName)) {
      this.logger.error(`Not supported sub-command: [${commandName}]`);
      core.help(NAS_HELP_INFO);
      return;
    }
    const transformArgs = args.replace(commandName, '').replace(/(^\s*)|(\s*$)/g, '');

    // warning: 2021.12.24 交互修改警告，过段时间可以删除
    if (commandName === 'upload') {
      this.logger.warn(`The nas upload interaction has changed. For specific information, please refer to:
https://github.com/devsapp/fc/blob/main/docs/zh/zh/command/nas.md#nas-upload-命令
https://gitee.com/devsapp/fc/blob/main/docs/zh/command/nas.md#nas-upload-命令\n`);
    }
    // s nas command ls -lh /mnt/auto 会被解析为 --help
    if (comParse?.data?.help && !args?.includes('ls -lh')) {
      core.help(NAS_SUB_COMMAND_HELP_INFO[commandName]);
      return;
    }
    nonOptionsArgs.shift();
    const { nasConfig, vpcConfig, name, role } = props?.service || {};

    const componentInputs = _.cloneDeep(inputs);
    delete componentInputs.argsObj;

    if (commandName === 'init' && isAutoConfig(nasConfig)) {
      return await this.componentMethodCaller(componentInputs, 'devsapp/fc-deploy', 'deployAutoNas', props, assumeYes ? '--assume-yes' : null);
    } else if (commandName === 'init') {
      this.logger.info('Ensuring nas dir');
      const payload = await GenerateNasProps.toNasAbility(props?.region, vpcConfig, name, role, nasConfig);
      await this.componentMethodCaller(componentInputs, 'devsapp/nas', 'ensureNasDir', payload.payload);
      return;
    }

    const payload = await GenerateNasProps.generateNasProps(props, project?.access, inputs.credentials);

    this.logger.debug(`transform nas payload: ${JSON.stringify(payload.payload)}, args: ${transformArgs}, command: ${commandName}`);
    await this.componentMethodCaller(componentInputs, 'devsapp/nas', commandName, payload.payload, transformArgs);

    tips.showNasNextTips();
  }

  async stress(inputs: IInputs): Promise<any> {
    const { props, project } = this.handlerComponentInputs(inputs);
    const SUPPORTED_METHOD: string[] = ['start', 'clean'];
    const STRESS_SUB_COMMAND_HELP_KEY = {
      start: STRESS_START,
      clean: STRESS_CLEAN,
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

    this.logger.debug(`nonOptionsArgs is ${JSON.stringify(nonOptionsArgs)}`);
    if (!argsData) {
      this.logger.error('Not found sub-command.');
      core.help(STRESS);
      return;
    }
    if (nonOptionsArgs.length === 0) {
      if (!argsData?.help) {
        this.logger.error('Not found sub-command.');
      }
      core.help(STRESS);
      return;
    }

    const commandName: string = nonOptionsArgs[0];
    if (!SUPPORTED_METHOD.includes(commandName)) {
      this.logger.error(`Not supported sub-command: [${commandName}]`);
      core.help(STRESS);
      return;
    }

    if (argsData?.help) {
      core.help(STRESS_SUB_COMMAND_HELP_KEY[commandName]);
      return;
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
      this.logger.debug(`Using event options: \n${yaml.dump(eventTypeOpts)}`);
    } else if (stressOpts?.functionType === 'http') {
      httpTypeOpts = {
        url: argsData?.url,
        method: argsData?.method,
      };
      this.logger.debug(`Using http options: \n${yaml.dump(httpTypeOpts)}`);
    }
    const payloadOpts: PayloadOption = {
      payloadFile: argsData['payload-file'],
      payload: argsData?.payload,
    };
    const fcStress: FcStress = new FcStress(project?.access, props?.region || argsData?.region, stressOpts, httpTypeOpts, eventTypeOpts, payloadOpts);
    let fcStressArgs: string;
    if (commandName === 'start') {
      if (stressOpts?.functionType === 'http' && !argsData?.url) {
        this.logger.error('Function type is http, please specify --url');
      }
      fcStressArgs = fcStress.makeStartArgs();
    } else if (commandName === 'clean') {
      fcStressArgs = fcStress.makeCleanArgs(argsData['assume-yes']);
    }
    this.logger.debug(`Input args of fc-stress component is: ${fcStressArgs}`);
    delete inputs.argsObj;
    return await this.componentMethodCaller(inputs, 'devsapp/fc-stress', commandName, null, fcStressArgs);
  }

  async version(inputs: IInputs): Promise<any> {
    const {
      credentials,
      help,
      props,
      subCommand,
      table,
      errorMessage,
    } = await Version.handlerInputs(inputs);

    await this.report('fc', subCommand ? `version ${subCommand}` : 'version', credentials?.AccountID);
    if (help) {
      if (errorMessage) throw new Error(errorMessage);
      return;
    }

    const qualifier = new Version();
    return await qualifier[subCommand](props, table);
  }

  async alias(inputs: IInputs): Promise<any> {
    const {
      credentials,
      help,
      props,
      subCommand,
      table,
      errorMessage,
    } = await Alias.handlerInputs(inputs);

    await this.report('fc', subCommand ? `alias ${subCommand}` : 'alias', credentials?.AccountID);
    if (help) {
      if (errorMessage) throw new Error(errorMessage);
      return;
    }

    const qualifier = new Alias();
    return await qualifier[subCommand](props, table);
  }

  async provision(inputs: IInputs): Promise<any> {
    const {
      credentials,
      help,
      props,
      subCommand,
      table,
      errorMessage,
    } = await Provision.handlerInputs(inputs);

    await this.report('fc', subCommand ? `provision ${subCommand}` : 'provision', credentials?.AccountID);
    if (help) {
      if (errorMessage) throw new Error(errorMessage);
      return;
    }

    const provision = new Provision();
    return await provision[subCommand](props, table);
  }

  async ondemand(inputs: IInputs) {
    const {
      credentials,
      help,
      props,
      subCommand,
      table,
      errorMessage,
    } = await OnDemand.handlerInputs(inputs);

    await this.report('fc', subCommand ? `ondemand ${subCommand}` : 'ondemand', credentials?.AccountID);
    if (help) {
      if (errorMessage) throw new Error(errorMessage);
      return;
    }

    const ondemand = new OnDemand();
    return await ondemand[subCommand](props, table);
  }

  async onDemand(inputs: IInputs): Promise<any> {
    // warning: 2021.12.23 交互修改警告，过段时间可以删除
    this.logger.warn('The onDemand command will be removed soon, please use ondemand');
    return await this.ondemand(inputs);
  }

  async layer(inputs: IInputs): Promise<any> {
    const { props, args, argsObj } = this.handlerComponentInputs(inputs);

    const LAYER_COMMAND = {
      publish: LAYER_HELP.LAYER_PUBLISH,
      list: LAYER_HELP.LAYER_LIST,
      detail: LAYER_HELP.LAYER_DETAIL,
      versionConfig: LAYER_HELP.LAYER_DETAIL,
      versions: LAYER_HELP.LAYER_VERSIONS,
    };

    const comParse: any = core.commandParse({ args, argsObj }, {
      boolean: ['help'],
      alias: { help: 'h' },
    });
    const argsData: any = comParse?.data || {};
    const nonOptionsArgs = argsData?._ || [];
    this.logger.debug(`nonOptionsArgs is ${JSON.stringify(nonOptionsArgs)}`);
    if (nonOptionsArgs.length === 0) {
      core.help(LAYER_HELP.LAYER);
      return;
    }

    const commandName: string = nonOptionsArgs[0];
    if (!LAYER_COMMAND[commandName]) {
      this.logger.error(`Not supported sub-command: [${commandName}]`);
      core.help(LAYER_HELP.LAYER);
      return;
    }

    // warning: 2021.12.23 交互修改警告，过段时间可以删除
    if (commandName === 'versionConfig') {
      this.logger.warn('The versionConfig command will be removed soon, please use detail');
    }
    if (argsData?.help) {
      core.help(LAYER_COMMAND[commandName]);
      return;
    }

    return await this.componentMethodCaller(inputs, 'devsapp/fc-layer', commandName, { region: props?.region }, args);
  }

  async proxied(inputs: IInputs): Promise<any> {
    const { args, argsObj } = this.handlerComponentInputs(inputs);
    const SUPPORTED_METHOD = ['setup', 'invoke', 'clean', 'cleanup'];

    const apts = {
      boolean: ['help'],
      alias: { help: 'h' },
    };
    const comParse: any = core.commandParse({ args, argsObj }, apts);
    const argsData: any = comParse?.data || {};
    const nonOptionsArgs = argsData?._ || [];
    this.logger.debug(`nonOptionsArgs is ${JSON.stringify(nonOptionsArgs)}`);
    if (argsData?.help && nonOptionsArgs.length === 0) {
      core.help(PROXIED);
      return;
    }
    if (nonOptionsArgs.length === 0) {
      core.help(PROXIED);
      return;
    }
    const methodName: string = nonOptionsArgs[0];
    if (!SUPPORTED_METHOD.includes(methodName)) {
      this.logger.error(`Not supported sub-command: [${methodName}]`);
      core.help(PROXIED);
      return;
    }
    const { AccountID: accountID } = inputs?.credentials || {};
    const fcProxiedInvoke: FcProxiedInvoke = new FcProxiedInvoke(inputs);
    if (methodName === 'setup') {
      await this.report('fc', 'proxied_setup', accountID);
      if (argsData?.help) {
        core.help(PROXIED_SETUP);
        return;
      }
      return await FcProxiedInvoke.setup(fcProxiedInvoke.makeInputs(methodName));
    } else if (methodName === 'invoke') {
      await this.report('fc', 'proxied_invoke', accountID);
      if (argsData?.help) {
        core.help(PROXIED_INVOKE);
        return;
      }
      return await FcProxiedInvoke.invoke(fcProxiedInvoke.makeInputs(methodName));
    } else if (methodName === 'clean') {
      // clean
      await this.report('fc', 'proxied_clean', accountID);
      if (argsData?.help) {
        core.help(PROXIED_CLEANUP);
        return;
      }
      return await FcProxiedInvoke.clean(fcProxiedInvoke.makeInputs(methodName));
    } else {
      // cleanup
      await this.report('fc', 'proxied_cleanup', accountID);
      if (argsData?.help) {
        core.help(PROXIED_CLEANUP);
        return;
      }
      return await FcProxiedInvoke.cleanup(fcProxiedInvoke.makeInputs(methodName));
    }
  }

  async fun2s(inputs: IInputs): Promise<any> {
    const { args } = this.handlerComponentInputs(inputs);
    const isHelp = this.isHelp(args);
    if (isHelp) {
      return core.help(FUN_TO_S);
    }
    return await this.componentMethodCaller(inputs, 'fc-transform', 'fun2fc', {}, args);
  }

  async remote(inputs: IInputs): Promise<any> {
    const { args, argsObj } = this.handlerComponentInputs(inputs);
    const SUPPORTED_METHOD = ['setup', 'invoke', 'cleanup'];

    const apts = {
      boolean: ['help'],
      alias: { help: 'h' },
    };
    const comParse: any = core.commandParse({ args, argsObj }, apts);
    const argsData: any = comParse?.data || {};
    const nonOptionsArgs = argsData?._ || [];
    this.logger.debug(`nonOptionsArgs is ${JSON.stringify(nonOptionsArgs)}`);
    if (argsData?.help && nonOptionsArgs.length === 0) {
      core.help(REMOTE);
      return;
    }
    if (nonOptionsArgs.length === 0) {
      core.help(REMOTE);
      return;
    }
    const methodName: string = nonOptionsArgs[0];
    if (!SUPPORTED_METHOD.includes(methodName)) {
      this.logger.error(`Not supported sub-command: [${methodName}]`);
      core.help(REMOTE);
      return;
    }
    const { AccountID: accountID } = inputs?.credentials || {};
    const fcRemoteDebug: FcRemoteDebug = new FcRemoteDebug(inputs);
    if (methodName === 'setup') {
      await this.report('fc', 'remote_setup', accountID);
      if (argsData?.help) {
        core.help(REMOTE_SETUP);
        return;
      }
      return await FcRemoteDebug.setup(fcRemoteDebug.makeInputs(methodName));
    } else if (methodName === 'invoke') {
      await this.report('fc', 'remote_invoke', accountID);
      if (argsData?.help) {
        core.help(REMOTE_INVOKE);
        return;
      }
      return await FcRemoteDebug.invoke(fcRemoteDebug.makeInputs(methodName));
    } else if (methodName === 'cleanup') {
      await this.report('fc', 'remote_cleanup', accountID);
      if (argsData?.help) {
        core.help(REMOTE_CLEANUP);
        return;
      }
      return await FcRemoteDebug.cleanup(fcRemoteDebug.makeInputs(methodName));
    }
  }

  async eval(inputs: IInputs): Promise<any> {
    const { props, project } = this.handlerComponentInputs(inputs);
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

    this.logger.debug(`nonOptionsArgs is ${JSON.stringify(nonOptionsArgs)}`);
    if (!argsData) {
      this.logger.error('Not fount sub-command.');
      core.help(EVAL);
      return;
    }
    if (nonOptionsArgs.length === 0) {
      if (!argsData?.help) {
        this.logger.error('Not fount sub-command.');
      }
      core.help(EVAL);
      return;
    }

    const commandName: string = nonOptionsArgs[0];
    if (!SUPPORTED_METHOD.includes(commandName)) {
      this.logger.error(`Not supported sub-command: [${commandName}]`);
      core.help(EVAL);
      return;
    }

    if (argsData?.help) {
      core.help(EVAL_START);
      return;
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
    this.logger.debug(`Using http options: \n${yaml.dump(httpTypeOpts)}`);
    const payloadOpts: PayloadOption = {
      payloadFile: argsData['payload-file'],
      payload: argsData?.payload,
    };
    const fcEval: FcEval = new FcEval(project?.access, props?.region || argsData?.region,
      evalOpts, httpTypeOpts, payloadOpts);
    let fcEvalArgs: string;
    if (commandName === 'start') {
      fcEvalArgs = fcEval.makeStartArgs();
    } else {
      this.logger.error(`invalid command ${commandName}`);
      return;
    }
    this.logger.debug(`Input args of fc-eval component is: ${fcEvalArgs}`);
    delete inputs.argsObj;
    return await this.componentMethodCaller(inputs, 'devsapp/fc-eval', commandName, null, fcEvalArgs);
  }

  // 解析入参
  private isHelp(args: string) {
    const comParse: any = core.commandParse({ args }, {
      boolean: ['help'],
      alias: { help: 'h' },
    });
    return comParse?.data?.help;
  }
  private handlerInputs(inputs: IInputs): any {
    const project = inputs?.project;
    const props: IProperties = inputs?.props;
    const access: string = project?.access;
    const args: string = inputs?.args;
    const argsObj: any = inputs?.argsObj;
    const curPath: any = inputs?.path;
    const projectName: string = project?.projectName;
    const appName: string = inputs?.appName;

    return {
      appName,
      projectName,
      access,
      props,
      args,
      argsObj,
      curPath,
    };
  }
  private async report(componentName: string, command: string, accountID?: string): Promise<void> {
    core.reportComponent(componentName, {
      command,
      uid: accountID,
    });
  }
  private handlerComponentInputs(inputs: IInputs, componentName?: string): any {
    const {
      appName,
      projectName,
      access,
      props,
      args,
      argsObj,
      curPath,
    } = this.handlerInputs(inputs);
    return {
      project: {
        component: componentName,
        projectName: componentName ? `${projectName}-${componentName}-project` : projectName,
        access,
      },
      appName,
      props,
      args,
      argsObj,
      path: curPath,
    };
  }

  private async componentMethodCaller(inputs: IInputs, componentName: string, methodName: string, props?: any, args?: string): Promise<any> {
    const componentInputs: any = this.handlerComponentInputs(inputs, componentName);
    await this.report(componentName, methodName, inputs?.credentials?.AccountID);
    componentInputs.props = props;
    componentInputs.args = args;
    await this.updateCore();
    // const componentIns: any = await core.load(`devsapp/${componentName}`);
    const componentIns: any = await core.load(`${componentName}`);
    this.logger.debug(`Inputs of component: ${componentName} is: ${JSON.stringify(componentInputs, null, '  ')}`);
    return await componentIns[methodName](componentInputs);
  }

  private async updateCore() {
    if (!_.isFunction(core.popCore)) {
      try {
        const homePath = _.isFunction(core.getRootHome) ? core.getRootHome() : os.homedir();
        const corePath = path.join(homePath, 'cache', 'core');
        const lockPath = path.resolve(corePath, '.s.lock');
        const result = await core.request('https://registry.devsapp.cn/simple/devsapp/core/releases/latest');
        const version = result.tag_name;
        const url = `https://registry.devsapp.cn/simple/devsapp/core/zipball/${version}`;
        const filename = `core@${version}.zip`;
        await core.downloadRequest(url, corePath, { filename, extract: true, strip: 1 });
        fs.writeFileSync(lockPath, JSON.stringify({ version }, null, 2));
      } catch (error) {
        this.logger.log("\nWARNING\n======================\n* Exception happened! Please execute 's clean --cache' and try again", 'yellow');
        process.exit(1);
      }
    }
  }
}
