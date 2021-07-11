import Logger from './common/logger';
import { IInputs } from './lib/interface/interface';
export default class FcBaseComponent {
    logger: typeof Logger;
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
    version(inputs: IInputs): Promise<any>;
    alias(inputs: IInputs): Promise<any>;
    provision(inputs: IInputs): Promise<any>;
    onDemand(inputs: IInputs): Promise<any>;
    layer(inputs: IInputs): Promise<any>;
    help(inputs: IInputs): Promise<void>;
    private handlerInputs;
    private report;
    private handlerComponentInputs;
    private componentMethodCaller;
}
