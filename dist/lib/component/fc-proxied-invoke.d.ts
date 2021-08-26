import { IInputs } from '../interface/interface';
export default class FcProxiedInvoke {
    private readonly userInputs;
    constructor(inputs: IInputs);
    makeInputs(methodName: string): IInputs;
}
