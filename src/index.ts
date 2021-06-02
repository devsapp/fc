import * as core from '@serverless-devs/core';
import { ICredentials } from './lib/interface/profile';
import { IInputs, IProperties } from './lib/interface/interface';
import * as _ from 'lodash';
import { COMPONENT_HELP_INFO } from './lib/static';
import { FcInfoProps } from './lib/interface/component/fc-info';

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
    return await this.componentMethodCaller(inputs, '/Users/zqf/Documents/git_proj/devsapp/component/fc-deploy-alibaba-component', 'deploy', props, args);
  }

  async remove(inputs: IInputs): Promise<any> {
    const { props, args } = this.handlerComponentInputs(inputs);
    return await this.componentMethodCaller(inputs, '/Users/zqf/Documents/git_proj/devsapp/component/fc-deploy-alibaba-component', 'remove', props, args);
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
    return await this.componentMethodCaller(inputs, 'fc-info', 'info', propsGenerator(props), args);
  }

  async sync(inputs: IInputs): Promise<any> {

  }

  async build(inputs: IInputs): Promise<any> {

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
    return await this.componentMethodCaller(inputs, 'fc-local-invoke', methodName, props, fcInfoArgs);
  }

  async invoke(inputs: IInputs): Promise<any> {

  }

  async logs(inputs: IInputs): Promise<any> {

  }

  async metrics(inputs: IInputs): Promise<any> {

  }

  async stress(inputs: IInputs): Promise<any> {

  }

  help(): void {
    core.help(COMPONENT_HELP_INFO);
  }
}
