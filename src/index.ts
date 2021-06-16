import * as core from '@serverless-devs/core';
import * as _ from 'lodash';
import { COMPONENT_HELP_INFO, LOCAL_HELP_INFO, LOGS_HELP_INFO, NAS_HELP_INFO, METRICS_HELP_INFO,
  NAS_SUB_COMMAND_HELP_INFO, INVOKE_HELP_INFO, LOCAL_INVOKE_HELP_INFO, LOCAL_START_HELP_INFO, BUILD_HELP_INFO } from './lib/static';
import tarnsformNas from './lib/tarnsform-nas';
import { ICredentials } from './lib/interface/profile';
import { IInputs, IProperties } from './lib/interface/interface';
import { isLogConfig } from './lib/interface/sls';
import { FcInfoProps } from './lib/interface/component/fc-info';
import { FcSyncProps } from './lib/interface/component/fc-sync';
import { FcMetricsProps } from './lib/interface/component/fc-metrics';
import { LogsProps } from './lib/interface/component/logs';
import { getFcNames } from './lib/utils';
import * as tips from './lib/tips';

const SUPPORTED_LOCAL_METHOD: string[] = ['invoke', 'start'];
export default class FcBaseComponent {
  @core.HLogger('FC') logger: core.ILogger;

  // 解析入参
  private handlerInputs(inputs: IInputs): any {
    const project = inputs?.project;
    const props: IProperties = inputs?.props;
    const access: string = project?.access;
    const args: string = inputs?.args;
    const curPath: string = inputs?.path;
    const projectName: string = project?.projectName;
    const appName: string = inputs?.appName;

    return {
      appName,
      projectName,
      access,
      props,
      args,
      curPath,
    };
  }
  private async report(componentName: string, command: string, accountID?: string, access?: string): Promise<void> {
    let uid: string = accountID;
    if (_.isEmpty(accountID)) {
      const credentials: ICredentials = await core.getCredential(access);
      uid = credentials.AccountID;
    }

    core.reportComponent(componentName, {
      command,
      uid,
    });
  }
  private handlerComponentInputs(inputs: IInputs, componentName?: string): any {
    const {
      appName,
      projectName,
      access,
      props,
      args,
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
      path: curPath,
    };
  }

  private async componentMethodCaller(inputs: IInputs, componentName: string, methodName: string, props: any, args: string): Promise<any> {
    const componentInputs: any = this.handlerComponentInputs(inputs, componentName);
    await this.report(componentName, methodName, undefined, inputs?.project?.access);
    componentInputs.props = props;
    componentInputs.args = args;

    // const componentIns: any = await core.load(`devsapp/${componentName}`);
    const componentIns: any = await core.load(`${componentName}`);
    this.logger.debug(`Inputs of component: ${componentName} is: ${JSON.stringify(componentInputs, null, '  ')}`);
    return await componentIns[methodName](componentInputs);
  }

  async deploy(inputs: IInputs): Promise<any> {
    const { props, args } = this.handlerComponentInputs(inputs);
    const deployRes: any = await this.componentMethodCaller(inputs, 'devsapp/fc-deploy', 'deploy', props, args);
    tips.showNextTip(args, tips.showDeployNextTips);

    return deployRes;
  }

  async remove(inputs: IInputs): Promise<any> {
    const { props, args } = this.handlerComponentInputs(inputs);
    return await this.componentMethodCaller(inputs, 'devsapp/fc-deploy', 'remove', props, args);
  }

  async info(inputs: IInputs): Promise<any> {
    const { props, args } = this.handlerComponentInputs(inputs);
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
      return res;
    };
    return await this.componentMethodCaller(inputs, 'devsapp/fc-info', 'info', propsGenerator(props), args);
  }

  async sync(inputs: IInputs): Promise<any> {
    const { props, args } = this.handlerComponentInputs(inputs);

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
    const { props, args } = this.handlerComponentInputs(inputs);
    const parsedArgs: {[key: string]: any} = core.commandParse({ args }, {
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
    const { props, args } = this.handlerComponentInputs(inputs);
    const parsedArgs: {[key: string]: any} = core.commandParse({ args }, {
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
    const fcInfoArgs: string = args ? args.replace(methodName, '').replace(/(^\s*)|(\s*$)/g, '') : '';

    this.logger.debug(`Args of fc-info is: ${fcInfoArgs}`);
    const localRes: any = await this.componentMethodCaller(inputs, 'devsapp/fc-local-invoke', methodName, props, fcInfoArgs);
    tips.showNextTip(args, tips.showLocalNextTips);

    return localRes;
  }

  async invoke(inputs: IInputs): Promise<any> {
    const { props, args } = this.handlerComponentInputs(inputs);
    const parsedArgs: {[key: string]: any} = core.commandParse({ args }, {
      boolean: ['help'],
      alias: { help: 'h' } });
    const argsData: any = parsedArgs?.data || {};
    if (argsData?.help) {
      core.help(INVOKE_HELP_INFO);
      return;
    }
    const invokePayload: FcSyncProps = {
      region: props?.region,
      serviceName: props?.service?.name,
      functionName: props?.function?.name,
    };

    await this.componentMethodCaller(inputs, 'devsapp/fc-remote-invoke', 'invoke', invokePayload, args);
  }

  async logs(inputs: IInputs): Promise<any> {
    const { props, args } = this.handlerComponentInputs(inputs);

    const comParse: any = core.commandParse({ args }, {
      boolean: ['help'],
      string: ['region', 'service-name', 'function-name'],
      alias: { help: 'h' },
    })?.data;
    if (comParse?.help) {
      core.help(LOGS_HELP_INFO);
      return;
    }

    const { region, serviceName, functionName } = getFcNames(comParse, props);
    this.logger.debug(`[logs] region: ${region}, serviceName: ${serviceName}, functionName: ${functionName}`);

    let logsPayload: LogsProps;
    try {
      const { logConfig } = (await this.info(inputs)).service || {};

      if (!isLogConfig(logConfig)) {
        throw new Error('The service logConfig is not found online, please confirm whether logConfig is configured first, and then execute [s exec - deploy].');
      }

      logsPayload = {
        logConfig,
        region,
        topic: serviceName,
        query: props?.function?.name,
      };
    } catch (ex) {
      if (ex.code?.endsWith('NotFound')) {
        throw new Error(`Online search failed, error message: ${ex.message}. Please execute [s exec -- deploy]`);
      }
      throw ex;
    }

    await this.componentMethodCaller(inputs, 'devsapp/logs', 'logs', logsPayload, args);
  }

  async metrics(inputs: IInputs): Promise<any> {
    const { props, args } = this.handlerComponentInputs(inputs);

    const comParse: any = core.commandParse({ args }, {
      boolean: ['help'],
      string: ['region', 'service-name', 'function-name'],
      alias: { help: 'h' },
    })?.data;

    if (comParse?.help) {
      core.help(METRICS_HELP_INFO);
      return;
    }

    const payload: FcMetricsProps = getFcNames(comParse, props);

    await this.componentMethodCaller(inputs, 'devsapp/fc-metrics', 'metrics', payload, args);
  }

  async nas(inputs: IInputs) {
    const { props, args, project } = this.handlerComponentInputs(inputs);
    const SUPPORTED_METHOD = ['remove', 'deploy', 'ls', 'cp', 'rm', 'download', 'upload', 'command'];

    const apts = {
      boolean: ['all', 'long', 'help', 'recursive', 'no-clobber', 'force'],
      alias: { force: 'f', 'no-clobber': 'n', recursive: 'r', help: 'h', all: 'a', long: 'l' },
    };
    const comParse: any = core.commandParse({ args }, apts);

    const nonOptionsArgs = comParse.data?._ || [];
    this.logger.debug(`nonOptionsArgs is ${JSON.stringify(nonOptionsArgs)}`);
    if (!comParse?.data) {
      this.logger.error('Not fount sub-command.');
      core.help(NAS_HELP_INFO);
      return;
    }

    if (nonOptionsArgs.length === 0) {
      if (!comParse?.data?.help) {
        this.logger.error('Not fount sub-command.');
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

    const tarnsformArgs = args.replace(commandName, '').replace(/(^\s*)|(\s*$)/g, '');

    if (comParse?.data?.help) {
      core.help(NAS_SUB_COMMAND_HELP_INFO[commandName]);
      return;
    }
    nonOptionsArgs.shift();
    const payload = await tarnsformNas(props, nonOptionsArgs, tarnsformArgs, project?.access);
    this.logger.debug(`tarnsform nas payload: ${JSON.stringify(payload.payload)}, args: ${payload.tarnsformArgs}, command: ${commandName}`);

    await this.componentMethodCaller(inputs, 'devsapp/nas', commandName, payload.payload, payload.tarnsformArgs);

    tips.showNasNextTips();
  }

  async help(inputs: IInputs): Promise<void> {
    await this.report('fc', 'help', null, inputs?.project?.access);
    core.help(COMPONENT_HELP_INFO);
  }
}
