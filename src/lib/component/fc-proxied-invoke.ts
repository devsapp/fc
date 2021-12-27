import { IInputs } from '../interface/interface';
import { componentMethodCaller } from '../utils';
import _ from 'lodash';

export default class FcProxiedInvoke {
  static async setup(inputs: IInputs): Promise<any> {
    return await componentMethodCaller(inputs, 'devsapp/fc-proxied-invoke', 'setup');
  }

  static async invoke(inputs: IInputs): Promise<any> {
    return await componentMethodCaller(inputs, 'devsapp/fc-proxied-invoke', 'invoke');
  }

  static async clean(inputs: IInputs): Promise<any> {
    return await componentMethodCaller(inputs, 'devsapp/fc-proxied-invoke', 'clean');
  }

  static async cleanup(inputs: IInputs): Promise<any> {
    return await componentMethodCaller(inputs, 'devsapp/fc-proxied-invoke', 'cleanup');
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
