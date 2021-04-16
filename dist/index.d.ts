import * as core from '@serverless-devs/core';
import { IInputs } from './lib/interface/interface';
export default class FcBaseComponent {
    logger: core.ILogger;
    handlerInputs(inputs: IInputs): any;
    report(componentName: string, command: string, accountID?: string, access?: string): Promise<void>;
    handlerComponentInputs(inputs: IInputs, componentName: string): any;
    deploy(inputs: IInputs): Promise<void>;
    remove(inputs: IInputs): Promise<void>;
}
