import { IInputs } from '../interface/interface';
import _ from 'lodash';

export default class FcRemoteDebug {
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
