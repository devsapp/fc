import { HttpTypeOption, EventTypeOption, PayloadOption } from '../interface/component/fc-common';
import { StressOption } from '../interface/component/fc-stress';


export default class FcStress {
  private readonly httpTypeOpts?: HttpTypeOption;
  private readonly eventTypeOpts?: EventTypeOption;
  private readonly stressOpts?: StressOption;
  private readonly payloadOpts?: PayloadOption;
  private readonly region: string;
  private readonly access: string;

  constructor(access: string, region: string, stressOpts?: StressOption, httpTypeOpts?: HttpTypeOption, eventTypeOpts?: EventTypeOption, payloadOpts?: PayloadOption) {
    this.access = access;
    this.region = region;
    this.stressOpts = stressOpts;
    this.payloadOpts = payloadOpts;
    this.eventTypeOpts = eventTypeOpts;
    this.httpTypeOpts = httpTypeOpts;
  }

  makeStartArgs(): string {
    let args = `--region ${this.region} --access ${this.access} --function-type ${this.stressOpts?.functionType}`;
    if (this.stressOpts?.numUser) {
      args += ` --num-user ${this.stressOpts?.numUser}`;
    }
    if (this.stressOpts?.spawnRate) {
      args += ` --spawn-rate ${this.stressOpts?.spawnRate}`;
    }
    if (this.stressOpts?.runningTime) {
      args += ` --run-time ${this.stressOpts?.runningTime}`;
    }
    if (this.isEventFunctionType()) {
      args += ` --service-name ${this.eventTypeOpts?.serviceName} --function-name ${this.eventTypeOpts?.functionName}`;
      if (this.eventTypeOpts?.qualifier) {
        args += ` --qualifier ${this.eventTypeOpts?.qualifier}`;
      }
    } else if (this.isHttpFunctionType()) {
      args += ` --url ${this.httpTypeOpts?.url} --method ${this.httpTypeOpts?.method}`;
    }

    if (this.payloadOpts?.payload) {
      args += ` --payload ${JSON.stringify(this.payloadOpts?.payload)}`;
    }
    if (this.payloadOpts?.payloadFile) {
      args += ` --payload-file ${this.payloadOpts?.payloadFile}`;
    }
    return args;
  }

  makeCleanArgs(assumeYes?: boolean): string {
    let args = `--region ${this.region} --access ${this.access}`;
    if (assumeYes) {
      args += ' -y';
    }
    return args;
  }

  private isEventFunctionType() {
    return this.stressOpts?.functionType === 'event';
  }
  private isHttpFunctionType() {
    return this.stressOpts?.functionType === 'http';
  }
}
