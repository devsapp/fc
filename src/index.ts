import * as core from '@serverless-devs/core';
import { ICredentials } from './lib/interface/profile';
import { IInputs, IProperties } from './lib/interface/interface';
import * as _ from 'lodash';

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
  handlerComponentInputs(inputs: IInputs, componentName: string): any {
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
        projectName,
        access,
      },
      appName,
      props,
      args,
      path: curPath,
    };
  }

  async deploy(inputs: IInputs): Promise<void> {
    const componentName = 'fc-deploy';
    const fcDeployComponentInputs = this.handlerComponentInputs(inputs, componentName);
    await this.report('fc', 'deploy', undefined, inputs?.project?.access);
    const fcDployComponentIns = await core.load(componentName);
    await fcDployComponentIns.deploy(fcDeployComponentInputs);
  }

  async remove(inputs: IInputs): Promise<void> {
    const componentName = 'fc-deploy';
    const fcDeployComponentInputs = this.handlerComponentInputs(inputs, componentName);
    await this.report('fc', 'remove', undefined, inputs?.project?.access);
    const fcDployComponentIns = await core.load(componentName);
    await fcDployComponentIns.remove(fcDeployComponentInputs);
  }
}
