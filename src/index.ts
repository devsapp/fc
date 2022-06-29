/* eslint-disable no-param-reassign */
import * as core from '@serverless-devs/core';
import * as _ from 'lodash';
import Logger from './common/logger';
import * as HELP from './lib/help';
import * as DEPLOY_HELP from './lib/help/deploy';
import * as LAYER_HELP from './lib/help/layer';
import Nas from './lib/component/nas';
import { IInputs } from './lib/interface/interface';
import { infoPropsGenerator } from './lib/component/info';
import { FcSyncProps } from './lib/interface/component/fc-sync';
import Instance from './lib/component/instance';
import { FcMetricsProps } from './lib/interface/component/fc-metrics';
import { getFcNames, isAutoConfig } from './lib/utils';
import * as tips from './lib/tips';
import FcStress from './lib/component/fc-stress';
import Version from './lib/component/version';
import Alias from './lib/component/alias';
import OnDemand from './lib/component/on-demand';
import Remove from './lib/component/remove';
import Plan from './lib/component/plan';
import Provision from './lib/component/provision';
import EntryPublicMethod from './entry-public-method';
import FcProxiedInvoke from './lib/component/fc-proxied-invoke';
import FcRemoteDebug from './lib/component/fc-remote-debug';
import FcEval from './lib/component/fc-eval';
import { FcInvokeProps } from './lib/interface/component/fc-remote-invoke';
import Log from './lib/component/logs';
import Local from './lib/component/local';

const DEPLOY_SUPPORT_CONFIG_ARGS = ['code', 'config'];

export default class FcBaseComponent extends EntryPublicMethod {
  logger = Logger;

  async instance(inputs) {
    await super.handlerPreMethod(inputs, { getSecretKey: true });
    const {
      help,
      subCommand,
      props,
    } = await Instance.handlerInputs(inputs);

    if (help) {
      return;
    }

    const instance = new Instance();
    if (subCommand === 'list') {
      return await instance.list(props);
    } else if (subCommand === 'exec') {
      return await instance.exec(props);
    }
  }

  async plan(inputs: IInputs) {
    await super.handlerPreMethod(inputs, { getSecretKey: true });
    const { isHelp, planType } = Plan.handlerInputs(inputs);
    if (isHelp) {
      return core.help(HELP.PLAN_HELP);
    }

    const palnRs = await this.componentMethodCaller(
      inputs,
      'devsapp/fc-plan',
      'plan',
      inputs.props,
      inputs.args,
    );
    return Plan.showPlan(palnRs, planType);
  }

  async deploy(inputs: IInputs): Promise<any> {
    await super.handlerPreMethod(inputs, { getSecretKey: true });
    const { props, args } = this.handlerComponentInputs(inputs);
    const parsedArgs: { [key: string]: any } = core.commandParse(inputs, this.MINIMIST_HELP_OPT);

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
      rawData[0]
        ? core.help(DEPLOY_HELP[`DEPLOY_${subCommand}`.toLocaleUpperCase()])
        : core.help(DEPLOY_HELP.DEPLOY);
      return;
    }
    if (parsedData.type && !DEPLOY_SUPPORT_CONFIG_ARGS.includes(parsedData.type)) {
      core.help(DEPLOY_HELP.DEPLOY);
      throw new Error(
        `Type does not support ${parsedData.type}, only config and code are supported`,
      );
    }

    const deployRes: any = await this.componentMethodCaller(
      inputs,
      'devsapp/fc-deploy',
      'deploy',
      props,
      args,
    );
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
    // https://github.com/devsapp/fc/issues/383
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
    await super.handlerPreMethod(inputs, { getSecretKey: true });
    const { help, props, subCommand } = await Remove.handlerInputs(inputs);

    if (help) { return; }

    await new Remove().remove(
      { props, subCommand },
      this.handlerInputs(inputs), // TODO: remove this.handlerInputs
    );
  }

  async info(inputs: IInputs): Promise<any> {
    await super.handlerPreMethod(inputs, { getSecretKey: true });
    const { props, args, argsObj } = this.handlerComponentInputs(inputs);
    if (this.isHelp(args, argsObj)) {
      core.help(HELP.INFO);
      return;
    }

    return await this.componentMethodCaller(
      inputs,
      'devsapp/fc-info',
      'info',
      infoPropsGenerator(props),
      args,
    );
  }

  async sync(inputs: IInputs): Promise<any> {
    await super.handlerPreMethod(inputs, { getSecretKey: true });
    const { props, args, argsObj } = this.handlerComponentInputs(inputs);
    if (this.isHelp(args, argsObj)) {
      core.help(HELP.SYNC);
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
    await super.handlerPreMethod(inputs);
    const { props, args } = this.handlerComponentInputs(inputs);

    if (this.isHelp(args)) {
      core.help(HELP.BUILD_HELP_INFO);
      return;
    }
    const output = await this.componentMethodCaller(inputs, 'devsapp/fc-build', 'build', props, args);
    tips.showBuildNextTips(output?.buildSaveUri);
    return output?.buildSaveUri;
  }

  async local(inputs: IInputs): Promise<any> {
    await super.handlerPreMethod(inputs);
    const { isHelp, methodName, fcLocalInvokeArgs } = await Local.handlerComponentInputs(inputs);
    if (isHelp) { return; }

    const { props, args } = inputs;
    inputs.argsObj?.shift();
    const localRes: any = await this.componentMethodCaller(
      inputs,
      'devsapp/fc-local-invoke',
      methodName,
      props,
      fcLocalInvokeArgs,
    );
    tips.showNextTip(args, tips.showLocalNextTips);

    return localRes;
  }

  async invoke(inputs: IInputs): Promise<any> {
    await super.handlerPreMethod(inputs, { getSecretKey: true });
    const { props, args, argsObj } = this.handlerComponentInputs(inputs);
    if (this.isHelp(args, argsObj)) {
      core.help(HELP.INVOKE);
      return;
    }
    const invokePayload: FcInvokeProps = {
      region: props?.region,
      serviceName: props?.service?.name,
      functionName: props?.function?.name,
      timeout: props?.function?.timeout,
      runtime: props?.function?.runtime,
    };

    await this.componentMethodCaller(
      inputs,
      'devsapp/fc-remote-invoke',
      'invoke',
      invokePayload,
      args,
    );
  }

  async logs(inputs: IInputs): Promise<any> {
    await super.handlerPreMethod(inputs, { getSecretKey: true });
    const res = await Log.handlerComponentInputs(inputs);
    const { logsPayload, args, isHelp } = res;
    if (isHelp) { return; }

    await this.componentMethodCaller(inputs, 'devsapp/sls', 'logs', logsPayload, args);
  }

  async metrics(inputs: IInputs): Promise<any> {
    await super.handlerPreMethod(inputs, { getSecretKey: true });
    const { props, args, argsObj } = this.handlerComponentInputs(inputs);
    const opts = {
      boolean: ['help'],
      string: ['region', 'service-name', 'function-name'],
      alias: { help: 'h' },
    };
    // @ts-ignore
    const comParse: any = core.commandParse({ args, argsObj }, opts)?.data;

    if (comParse?.help) {
      core.help(HELP.METRICS);
      return;
    }

    const payload: FcMetricsProps = getFcNames(comParse, props);
    await this.componentMethodCaller(inputs, 'devsapp/fc-metrics', 'metrics', payload, args);
  }

  async nas(inputs: IInputs) {
    await super.handlerPreMethod(inputs, { getSecretKey: true });
    const {
      isHelp,
      commandName,
      nasConfig,
      componentInputs,
      props,
      assumeYes,
      vpcConfig,
      name,
      role,
      transformArgs,
    } = await Nas.handlerComponentInputs(inputs);
    if (isHelp) { return; }

    if (commandName === 'init' && isAutoConfig(nasConfig)) {
      return await this.componentMethodCaller(
        componentInputs,
        'devsapp/fc-deploy',
        'deployAutoNas',
        props,
        assumeYes ? '--assume-yes' : null,
      );
    } else if (commandName === 'init') {
      this.logger.info('Ensuring nas dir');
      const payload = await Nas.toNasAbility(
        props?.region,
        vpcConfig,
        name,
        role,
        nasConfig,
      );
      await this.componentMethodCaller(
        componentInputs,
        'devsapp/nas',
        'ensureNasDir',
        payload.payload,
      );
      return;
    }

    const payload = await Nas.getServiceConfig(
      props,
      inputs.project?.access,
      inputs.credentials,
    );

    this.logger.debug(`transform nas payload: ${JSON.stringify(payload.payload)}`);
    this.logger.debug(`  args: ${transformArgs}, command: ${commandName}`);
    await this.componentMethodCaller(
      componentInputs,
      'devsapp/nas',
      commandName,
      payload.payload,
      transformArgs,
    );

    tips.showNasNextTips();
  }

  async stress(inputs: IInputs): Promise<any> {
    await super.handlerPreMethod(inputs, { getSecretKey: true });
    const {
      isHelp,
      access,
      region,
      commandName,
      stressOpts,
      httpTypeOpts,
      eventTypeOpts,
      payloadOpts,
      argsData,
    } = await FcStress.handlerComponentInputs(inputs);
    if (isHelp) { return; }

    const fcStress: FcStress = new FcStress(
      access,
      region,
      stressOpts,
      httpTypeOpts,
      eventTypeOpts,
      payloadOpts,
    );
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
    return await this.componentMethodCaller(
      inputs,
      'devsapp/fc-stress',
      commandName,
      null,
      fcStressArgs,
    );
  }

  async version(inputs: IInputs): Promise<any> {
    await super.handlerPreMethod(inputs, { getSecretKey: true });
    const { help, props, subCommand, table } = await Version.handlerInputs(inputs);
    if (help) { return; }

    const qualifier = new Version();
    return await qualifier[subCommand](props, table);
  }

  async alias(inputs: IInputs): Promise<any> {
    await super.handlerPreMethod(inputs, { getSecretKey: true });
    const { help, props, subCommand, table } = await Alias.handlerInputs(inputs);
    if (help) { return; }

    const qualifier = new Alias();
    return await qualifier[subCommand](props, table);
  }

  async provision(inputs: IInputs): Promise<any> {
    await super.handlerPreMethod(inputs, { getSecretKey: true });
    const { help, props, subCommand, table } = await Provision.handlerInputs(inputs);
    if (help) { return; }

    const provision = new Provision();
    return await provision[subCommand](props, table);
  }

  async ondemand(inputs: IInputs) {
    await super.handlerPreMethod(inputs, { getSecretKey: true });
    const { help, props, subCommand, table } = await OnDemand.handlerInputs(inputs);
    if (help) { return; }

    const ondemand = new OnDemand();
    return await ondemand[subCommand](props, table);
  }

  async onDemand(inputs: IInputs): Promise<any> {
    // warning: 2021.12.23 交互修改警告，过段时间可以删除
    this.logger.warn('The onDemand command will be removed soon, please use ondemand');
    return await this.ondemand(inputs);
  }

  async layer(inputs: IInputs): Promise<any> {
    await super.handlerPreMethod(inputs, { getSecretKey: true });
    const { props, args, argsObj } = this.handlerComponentInputs(inputs);

    const LAYER_COMMAND = {
      publish: LAYER_HELP.LAYER_PUBLISH,
      list: LAYER_HELP.LAYER_LIST,
      detail: LAYER_HELP.LAYER_DETAIL,
      versionConfig: LAYER_HELP.LAYER_DETAIL,
      versions: LAYER_HELP.LAYER_VERSIONS,
      download: LAYER_HELP.LAYER_DOWNLOAD,
    };

    // @ts-ignore
    const comParse: any = core.commandParse({ args, argsObj }, this.MINIMIST_HELP_OPT);
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

    if (argsData?.help) {
      core.help(LAYER_COMMAND[commandName]);
      return;
    }

    return await this.componentMethodCaller(
      inputs,
      'devsapp/fc-layer',
      commandName,
      { region: props?.region },
      args,
    );
  }

  async proxied(inputs: IInputs): Promise<any> {
    await super.handlerPreMethod(inputs, { getSecretKey: true });
    const { args, argsObj } = this.handlerComponentInputs(inputs);
    const SUPPORTED_METHOD = ['setup', 'invoke', 'clean', 'cleanup'];

    // @ts-ignore
    const comParse: any = core.commandParse({ args, argsObj }, this.MINIMIST_HELP_OPT);
    const argsData: any = comParse?.data || {};
    const nonOptionsArgs = argsData?._ || [];
    this.logger.debug(`nonOptionsArgs is ${JSON.stringify(nonOptionsArgs)}`);

    const showhelp = nonOptionsArgs.length === 0;
    if (showhelp || (argsData?.help && showhelp)) {
      core.help(HELP.PROXIED);
      return;
    }

    const methodName: string = nonOptionsArgs[0];
    if (!SUPPORTED_METHOD.includes(methodName)) {
      this.logger.error(`Not supported sub-command: [${methodName}]`);
      core.help(HELP.PROXIED);
      return;
    }
    const fcProxiedInvoke: FcProxiedInvoke = new FcProxiedInvoke(inputs);
    if (methodName === 'setup') {
      if (argsData?.help) {
        core.help(HELP.PROXIED_SETUP);
        return;
      }
      return await FcProxiedInvoke.setup(fcProxiedInvoke.makeInputs(methodName));
    } else if (methodName === 'invoke') {
      if (argsData?.help) {
        core.help(HELP.PROXIED_INVOKE);
        return;
      }
      return await FcProxiedInvoke.invoke(fcProxiedInvoke.makeInputs(methodName));
    } else if (methodName === 'clean') {
      // clean
      if (argsData?.help) {
        core.help(HELP.PROXIED_CLEANUP);
        return;
      }
      return await FcProxiedInvoke.clean(fcProxiedInvoke.makeInputs(methodName));
    } else {
      // cleanup
      if (argsData?.help) {
        core.help(HELP.PROXIED_CLEANUP);
        return;
      }
      return await FcProxiedInvoke.cleanup(fcProxiedInvoke.makeInputs(methodName));
    }
  }

  async fun2s(inputs: IInputs): Promise<any> {
    await super.handlerPreMethod(inputs, { getSecretKey: true });
    const { args, argsObj } = this.handlerComponentInputs(inputs);
    if (this.isHelp(args, argsObj)) {
      return core.help(HELP.FUN_TO_S);
    }
    return await this.componentMethodCaller(inputs, 'fc-transform', 'fun2fc', {}, args);
  }

  async remote(inputs: IInputs): Promise<any> {
    await super.handlerPreMethod(inputs, { getSecretKey: true });
    const { methodName, isHelp, subCommandHelp } = await FcRemoteDebug.handlerComponentInputs(inputs);
    if (isHelp) { return; }

    const fcRemoteDebug: FcRemoteDebug = new FcRemoteDebug(inputs);
    if (methodName === 'setup') {
      if (subCommandHelp) {
        core.help(HELP.REMOTE_SETUP);
        return;
      }
      return await FcRemoteDebug.setup(fcRemoteDebug.makeInputs(methodName));
    } else if (methodName === 'invoke') {
      if (subCommandHelp) {
        core.help(HELP.REMOTE_INVOKE);
        return;
      }
      return await FcRemoteDebug.invoke(fcRemoteDebug.makeInputs(methodName));
    } else if (methodName === 'cleanup') {
      if (subCommandHelp) {
        core.help(HELP.REMOTE_CLEANUP);
        return;
      }
      return await FcRemoteDebug.cleanup(fcRemoteDebug.makeInputs(methodName));
    }
  }

  async eval(inputs: IInputs): Promise<any> {
    await super.handlerPreMethod(inputs, { getSecretKey: true });

    const { isHelp, project, evalOpts, httpTypeOpts, payloadOpts, region, commandName } =
      await FcEval.handlerComponentInputs(inputs);
    if (isHelp) { return; }

    const fcEval: FcEval = new FcEval(
      project?.access,
      region,
      evalOpts,
      httpTypeOpts,
      payloadOpts,
    );
    let fcEvalArgs: string;
    if (commandName === 'start') {
      fcEvalArgs = fcEval.makeStartArgs();
    } else {
      this.logger.error(`invalid command ${commandName}`);
      return;
    }
    this.logger.debug(`Input args of fc-eval component is: ${fcEvalArgs}`);
    delete inputs.argsObj;
    return await this.componentMethodCaller(
      inputs,
      'devsapp/fc-eval',
      commandName,
      null,
      fcEvalArgs,
    );
  }

  async env(inputs: IInputs): Promise<any> {
    await super.handlerPreMethod(inputs, { getSecretKey: true });
    const { props, args } = this.handlerComponentInputs(inputs);

    const parsedArgs: { [key: string]: any } = core.commandParse(inputs, this.MINIMIST_HELP_OPT);
    const parsedData = parsedArgs?.data || {};
    const rawData = parsedData._ || [];
    const commandList = ['undefined', 'init', 'deploy', 'info', 'list', 'init-template', 'apply-template', 'describe-template', 'list-templates', 'remove-template'];

    const subCommand = rawData[0] || 'undefined';
    this.logger.debug(`env subCommand: ${subCommand}`);
    if (!commandList.includes(subCommand)) {
      this.logger.error(`env ${subCommand} is not supported now.`);
      return core.help(HELP.ENV_HELP_INFO);
    }

    if (parsedData.help) {
      switch (subCommand) {
        case 'init':
          core.help(HELP.ENV_INIT);
          return;
        case 'deploy':
          core.help(HELP.ENV_DEPLOY);
          return;
        case 'info':
          core.help(HELP.ENV_INFO);
          return;
        case 'apply-template':
          core.help(HELP.ENV_APPLY_TEMPLATE);
          return;
        case 'describe-template':
          core.help(HELP.ENV_DESCRIBE_TEMPLATE);
          return;
        case 'remove-template':
          core.help(HELP.ENV_REMOVE_TEMPLATE);
          return;
        default:
          core.help(HELP.ENV_HELP_INFO);
          return;
      }
    }

    return await this.componentMethodCaller(
      inputs,
      'devsapp/infrastructure-as-template',
      'env',
      props,
      args,
    );
  }

  async api(inputs: IInputs): Promise<any> {
    const { props, args } = this.handlerComponentInputs(inputs);
    return await this.componentMethodCaller(
      inputs,
      'fc-api-component',
      'index',
      props,
      args,
    );
  }
}
