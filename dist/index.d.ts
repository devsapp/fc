import * as core from '@serverless-devs/core';
import { IInputs } from './lib/interface/interface';
export default class FcBaseComponent {
    logger: core.ILogger;
    private handlerInputs;
    private report;
    private handlerComponentInputs;
    private componentMethodCaller;
    deploy(inputs: IInputs): Promise<any>;
    remove(inputs: IInputs): Promise<any>;
    info(inputs: IInputs): Promise<any>;
    sync(inputs: IInputs): Promise<any>;
    build(inputs: IInputs): Promise<any>;
    local(inputs: IInputs): Promise<any>;
    invoke(inputs: IInputs): Promise<any>;
    logs(inputs: IInputs): Promise<any>;
    metrics(inputs: IInputs): Promise<any>;
    nas(inputs: IInputs): Promise<void>;
    stress(inputs: IInputs): Promise<any>;
    help(inputs: IInputs): Promise<void>;
}
