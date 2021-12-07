import { EvalOption } from '../interface/component/fc-eval';
import { HttpTypeOption, PayloadOption } from '../interface/component/fc-common';


export default class FcEval {
  private readonly httpTypeOpts?: HttpTypeOption;
  private readonly evalOpts?: EvalOption;
  private readonly payloadOpts?: PayloadOption;
  private readonly region: string;
  private readonly access: string;

  constructor(access: string, region: string, evalOpts?: EvalOption, httpTypeOpts?: HttpTypeOption, payloadOpts?: PayloadOption) {
    this.access = access;
    this.region = region;
    this.evalOpts = evalOpts;
    this.payloadOpts = payloadOpts;
    this.httpTypeOpts = httpTypeOpts;
  }

  isJSONString(str) {
    if (typeof str === 'string') {
      try {
        const obj = JSON.parse(str);
        if (typeof obj === 'object' && obj) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
    return false;
  }

  makeStartArgs(): string {
    let args = `--region ${this.region} --access ${this.access} --eval-type ${this.evalOpts?.evalType}`;
    if (this.evalOpts.evalType === 'memory') {
      if (this.evalOpts?.memorySizeList) {
        args += ` --memory-size ${this.evalOpts?.memorySizeList}`;
      }
      if (this.evalOpts?.runCount) {
        args += ` --run-count ${this.evalOpts?.runCount}`;
      }
    } else {
      if (this.evalOpts?.concurrencyArgs) {
        args += ` --concurrency-args ${this.evalOpts?.concurrencyArgs}`;
      }
      if (this.evalOpts?.memory) {
        args += ` --memory ${this.evalOpts?.memory}`;
      }
      if (this.evalOpts?.rt) {
        args += ` --rt ${this.evalOpts?.rt}`;
      }
    }
    if (this.evalOpts?.functionType) {
      args += ` --function-type ${this.evalOpts?.functionType}`;
    }

    if (this.evalOpts?.qualifier) {
      args += ` --qualifier ${this.evalOpts?.qualifier}`;
    }
    args += ` --service-name ${this.evalOpts?.serviceName} --function-name ${this.evalOpts?.functionName}`;

    if (this.isHttpFunctionType()) {
      args += ` --method ${this.httpTypeOpts?.method} --path ${this.httpTypeOpts?.path} --query ${this.httpTypeOpts?.query}`;
    }

    if (this.payloadOpts?.payload) {
      const payload = this.payloadOpts?.payload;
      if (this.isJSONString(payload)) {
        const jsonObj = JSON.parse(payload);
        args += ` --payload ${JSON.stringify(jsonObj)}`;
      } else {
        args += ` --payload ${payload}`;
      }
    }
    if (this.payloadOpts?.payloadFile) {
      args += ` --payload-file ${this.payloadOpts?.payloadFile}`;
    }
    return args;
  }

  private isHttpFunctionType() {
    return this.evalOpts?.functionType === 'http';
  }
}
