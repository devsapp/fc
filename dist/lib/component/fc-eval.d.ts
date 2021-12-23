import { EvalOption } from '../interface/component/fc-eval';
import { HttpTypeOption, PayloadOption } from '../interface/component/fc-common';
export default class FcEval {
    private readonly httpTypeOpts?;
    private readonly evalOpts?;
    private readonly payloadOpts?;
    private readonly region;
    private readonly access;
    constructor(access: string, region: string, evalOpts?: EvalOption, httpTypeOpts?: HttpTypeOption, payloadOpts?: PayloadOption);
    isJSONString(str: any): boolean;
    makeStartArgs(): string;
}
