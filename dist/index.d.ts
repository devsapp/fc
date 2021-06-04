import * as core from '@serverless-devs/core';
import { IInputs } from './lib/interface/interface';
export default class FcBaseComponent {
    logger: core.ILogger;
    handlerInputs(inputs: IInputs): any;
    report(componentName: string, command: string, accountID?: string, access?: string): Promise<void>;
    handlerComponentInputs(inputs: IInputs, componentName?: string): any;
    componentMethodCaller(inputs: IInputs, componentName: string, methodName: string, props: any, args: string): Promise<any>;
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
    help(): void;
}
