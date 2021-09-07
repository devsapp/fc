import { IInputs } from '../interface/interface';
export default class FcRemoteDebug {
    private readonly userInputs;
    constructor(inputs: IInputs);
    makeInputs(methodName: string): IInputs;
}
