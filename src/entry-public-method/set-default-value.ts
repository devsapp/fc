import { lodash as _, CatchableError } from '@serverless-devs/core';

const SERVICE_CONF_DEFAULT = {
  description: '',
};
const FUNCTION_CONF_DEFAULT = {
  description: 'This is default function description by fc-deploy component',
  runtime: 'nodejs10',
  handler: 'index.handler',
  memorySize: 128,
  timeout: 3,
  instanceConcurrency: 1,
  instanceType: 'e1',
};

const EVENTBRIDGE_TRIGGER__CONF_DEFAULT = {
  triggerEnable: true,
  asyncInvocationType: false,
  eventRuleFilterPattern: '{}',
  eventSourceConfig: {
    eventSourceType: 'Default',
  },
};

export function setDefaultValue(inputs) {
  if (_.get(inputs, 'props.service.name')) {
    _.defaults(inputs.props.service, SERVICE_CONF_DEFAULT);
  }
  if (_.get(inputs, 'props.function.name')) {
    _.defaults(inputs.props.function, FUNCTION_CONF_DEFAULT);
  }

  const triggers = _.get(inputs, 'props.triggers');
  if (!_.isEmpty(triggers)) {
    if (!_.isArray(triggers)) {
      throw new CatchableError('triggers expected is array.');
    }
    for (let len = 0; len < triggers.length; len += 1) {
      const trigger = triggers[len];
      if (trigger.type?.toLowerCase() === 'eventbridge') {
        _.defaults(triggers[len].config, EVENTBRIDGE_TRIGGER__CONF_DEFAULT);
      }
    }
  }
}
