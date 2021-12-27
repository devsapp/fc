import { IInputs } from '../interface/interface';
import _ from 'lodash';
import { componentMethodCaller } from '../utils';

export default class FcRemoteDebug {
  static async setup(inputs: IInputs): Promise<any> {
    return await componentMethodCaller(inputs, 'devsapp/fc-remote-debug', 'setup');
  }

  static async invoke(inputs: IInputs): Promise<any> {
    return await componentMethodCaller(inputs, 'devsapp/fc-remote-debug', 'invoke');
  }

  static async cleanup(inputs: IInputs): Promise<any> {
    return await componentMethodCaller(inputs, 'devsapp/fc-remote-debug', 'cleanup');
  }

  private readonly userInputs: IInputs;

  constructor(inputs: IInputs) {
    this.userInputs = inputs;
  }

  makeInputs(methodName: string): IInputs {
    const inputs: IInputs = _.cloneDeep(this.userInputs);
    inputs.command = methodName;
    return inputs;
  }
}
