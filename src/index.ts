import * as core from '@serverless-devs/core';
import * as _ from 'lodash';
import { COMPONENT_HELP_INFO } from './lib/static';
import { isAutoConfig, genServiceStateID } from './lib/utils';
import tarnsformNas from './lib/tarnsform-nas';
import { ICredentials } from './lib/interface/profile';
import { IInputs, IProperties } from './lib/interface/interface';
import { isLogConfig } from './lib/interface/sls';
import { FcInfoProps } from './lib/interface/component/fc-info';
import { FcSyncProps } from './lib/interface/component/fc-sync';
import { FcMetricsProps } from './lib/interface/component/fc-metrics';
import { LogsProps } from './lib/interface/component/logs';

const SUPPORTED_LOCAL_METHOD: string[] = ['invoke', 'start'];
export default class FcBaseComponent {
  @core.HLogger('FC') logger: core.ILogger;

  // 解析入参
  handlerInputs(inputs: IInputs): any {
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
  async report(componentName: string, command: string, accountID?: string, access?: string): Promise<void> {
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
  handlerComponentInputs(inputs: IInputs, componentName?: string): any {
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

  async componentMethodCaller(inputs: IInputs, componentName: string, methodName: string, props: any, args: string): Promise<any> {
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
    return await this.componentMethodCaller(inputs, 'devsapp/fc-deploy', 'deploy', props, args);
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
      }

      if (!_.isNil(props?.function?.name)) {
        property.functionName = props?.function?.name;
      }
    }

    return await this.componentMethodCaller(inputs, 'devsapp/fc-sync', 'sync', property, args);
  }

  async build(inputs: IInputs): Promise<any> {
    const { props, args } = this.handlerComponentInputs(inputs);
    await this.componentMethodCaller(inputs, 'devsapp/fc-build', 'build', props, args);
  }

  async local(inputs: IInputs): Promise<any> {
    const { props, args } = this.handlerComponentInputs(inputs);
    const parsedArgs: {[key: string]: any} = core.commandParse({ args });
    const nonOptionsArgs = parsedArgs.data?._;
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
    // 删除 methodName
    const fcInfoArgs: string = args ? args.replace(methodName, '').replace(/(^\s*)|(\s*$)/g, '') : '';

    this.logger.debug(`Args of fc-info is: ${fcInfoArgs}`);
    return await this.componentMethodCaller(inputs, 'devsapp/fc-local-invoke', methodName, props, fcInfoArgs);
  }

  async invoke(inputs: IInputs): Promise<any> {
    const { props, args } = this.handlerComponentInputs(inputs);

    const invokePayload: FcSyncProps = {
      region: props?.region,
      serviceName: props?.service?.name,
      functionName: props?.function?.name
    };
    
    await this.componentMethodCaller(inputs, 'devsapp/fc-remote-invoke', 'invoke', invokePayload, args);
  }

  async logs(inputs: IInputs): Promise<any> {
    const { props, args, project } = this.handlerComponentInputs(inputs);

    const comParse: any = core.commandParse({ args });
    if (comParse?.data?.help || comParse?.data?.h) {
      await this.componentMethodCaller(inputs, 'devsapp/logs', 'logs', props, args)
      return;
    }

    const region = props?.region;
    const serviceName = props?.service?.name;
    let logConfig = props?.service?.logConfig;
    if (!logConfig) {
      throw new Error('Not fount logConfig.');
    } else if (isAutoConfig(logConfig)) {
      const credential: ICredentials = await core.getCredential(project?.access);
      const stateId = genServiceStateID(credential.AccountID, props?.region, serviceName);
      logConfig = (await core.getState(stateId))?.resolvedConfig?.logConfig;
      
      if (!logConfig) {
        throw new Error('It is detected that logConfig is auto, but the configuration is not obtained, please execute the [deploy] first.');
      }
    }

    if (!isLogConfig(logConfig)) {
      throw new Error(`logConfig does not meet expectations, the value obtained is ${JSON.stringify(logConfig)}, and the expected value exists in project,logstore.`);
    }
    const logsPayload: LogsProps = {
      logConfig,
      region,
      topic: serviceName,
      query: props?.function?.name,
    }

    await this.componentMethodCaller(inputs, 'devsapp/logs', 'logs', logsPayload, args)
  }

  async metrics(inputs: IInputs): Promise<any> {
    const { props, args } = this.handlerComponentInputs(inputs);

    const payload: FcMetricsProps = {
      region: props?.region,
      serviceName: props?.service?.name,
      functionName: props?.function?.name,
    };
    
    await this.componentMethodCaller(inputs, 'devsapp/fc-metrics', 'metrics', payload, args);
  }

  async stress(inputs: IInputs): Promise<any> {

  }

  async nas(inputs: IInputs) {
    const { props, args, project } = this.handlerComponentInputs(inputs);
    const SUPPORTED_METHOD = ['ls', 'cp', 'rm', 'download', 'upload', 'command'];

    const apts = {
      boolean: ['all', 'long', 'help', 'recursive', 'no-clobber', 'force'],
      alias: { force: 'f', 'no-clobber': 'n', recursive: 'r', help: 'h', all: 'a', long: 'l' }
    };
    const comParse: any = core.commandParse({ args }, apts);

    const errorStr = 'Execution instruction error, example: s exec -- nas <download>/<upload>/<command> -h';
    const nonOptionsArgs = comParse.data?._ || [];
    this.logger.debug(`nonOptionsArgs is ${JSON.stringify(nonOptionsArgs)}`);
    if (!comParse?.data || nonOptionsArgs.length === 0) {
      this.logger.error(errorStr);
      return;
    }

    const commandName: string = nonOptionsArgs[0];
    if (!SUPPORTED_METHOD.includes(commandName)) {
      this.logger.error(`Unsupported subcommand ${commandName}, only download/upload/command are supported.`);
      return;
    }

    let tarnsformArgs = args.replace(commandName, '').replace(/(^\s*)|(\s*$)/g, '');

    if (nonOptionsArgs.length === 1 && comParse?.data?.help) {
      await this.componentMethodCaller(inputs, 'devsapp/nas', commandName, inputs.props, tarnsformArgs);
      return;
    }

    nonOptionsArgs.shift();
    const payload = await tarnsformNas(props, nonOptionsArgs, tarnsformArgs, project?.access);
    this.logger.debug(`tarnsform nas payload: ${JSON.stringify(payload.payload)}, args: ${payload.tarnsformArgs}, command: ${commandName}`);

    await this.componentMethodCaller(inputs, 'devsapp/nas', commandName, payload.payload, payload.tarnsformArgs);
  }

  help(): void {
    core.help(COMPONENT_HELP_INFO);
  }
}
