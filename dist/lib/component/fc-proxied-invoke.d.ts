import { IInputs } from '../interface/interface';
export default class FcProxiedInvoke {
    static setup(inputs: IInputs): Promise<any>;
    static invoke(inputs: IInputs): Promise<any>;
    static clean(inputs: IInputs): Promise<any>;
    static cleanup(inputs: IInputs): Promise<any>;
    private readonly userInputs;
    constructor(inputs: IInputs);
    makeInputs(methodName: string): IInputs;
}
