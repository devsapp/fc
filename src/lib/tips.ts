import { Logger, commandParse } from '@serverless-devs/core';

export function showBuildNextTips() {
  const eventInvokeTip = 's local invoke';
  const httpInvokeTip = 's local start';
  const deployTip = 's deploy';

  Logger.log(`\nTips for next step
======================
* Invoke Event Function: ${eventInvokeTip}
* Invoke Http Function: ${httpInvokeTip}
* Deploy Resources: ${deployTip}`, 'yellow');
}

export function showLocalNextTips() {
  const deployTip = 's deploy';
  Logger.log(`\nTips for next step
======================
* Deploy Resources: ${deployTip}`, 'yellow');
}

export function showDeployNextTips() {
  const invokeTip = 's invoke';
  const infoTip = 's info';
  const removeServiceTip = 's remove service';
  const removeFunctionTip = 's remove function';
  const removeTriggerTip = 's remove trigger';
  const removeDomainTip = 's remove domain';
  const metrics = 's metrics';
  const logs = 's logs';

  Logger.log(`\nTips for next step
======================
* Display information of the deployed resource: ${infoTip}
* Display metrics: ${metrics}
* Display logs: ${logs}
* Invoke remote function: ${invokeTip}
* Remove Service: ${removeServiceTip}
* Remove Function: ${removeFunctionTip}
* Remove Trigger: ${removeTriggerTip}
* Remove CustomDomain: ${removeDomainTip}`, 'yellow');
}

export function showNasNextTips() {
  const invokeTip = 's invoke';

  Logger.log(`\nTips for next step
======================
* Invoke remote function: ${invokeTip}`, 'yellow');
}

export function showNextTip(args: string, showMethod: Function): void {
  const parsedArgs: {[key: string]: any} = commandParse({ args }, {
    boolean: ['help'],
    alias: { help: 'h' } });
  const argsData: any = parsedArgs?.data || {};
  if (!argsData?.help) {
    showMethod();
  }
}
