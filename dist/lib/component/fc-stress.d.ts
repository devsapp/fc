import { HttpTypeOption, EventTypeOption, StressOption, PayloadOption } from '../interface/component/fs-stress';
export default class FcStress {
    private readonly httpTypeOpts?;
    private readonly eventTypeOpts?;
    private readonly stressOpts?;
    private readonly payloadOpts?;
    private readonly region;
    private readonly access;
    constructor(access: string, region: string, stressOpts?: StressOption, httpTypeOpts?: HttpTypeOption, eventTypeOpts?: EventTypeOption, payloadOpts?: PayloadOption);
    makeStartArgs(): string;
    makeCleanArgs(assumeYes?: boolean): string;
    private isEventFunctionType;
    private isHttpFunctionType;
}
