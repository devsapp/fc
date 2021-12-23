import * as core from '@serverless-devs/core';
import Table from 'tty-table';
import _ from 'lodash';
import logger from '../../common/logger';


export default class Remove {
  static handlerInputs(inputs) {
    logger.debug(`inputs.props: ${JSON.stringify(inputs.props)}`);

    const parsedArgs: {[key: string]: any} = core.commandParse(inputs, {
      boolean: ['help'],
      string: ['plan-type', 'sub-command'],
      alias: { help: 'h' },
    });
    const {
      'plan-type': planType = 'deploy',
      'sub-command': subCommand = 'service',
      help,
    } = parsedArgs?.data || {};
    if (help) {
      return { isHelp: true, subCommand };
    }
    if (planType === 'deploy') {
      const deployCommandList = ['service', 'function', 'trigger', 'domain'];
      if (!_.isEmpty(subCommand) && !deployCommandList.includes(subCommand)) {
        return { errorMessage: `Does not support ${subCommand} command.When plan-type is ${planType}, --sub-command supports not specified or ${deployCommandList.toString()}` };
      }
    } else if (planType === 'remove') {
      const removeCommandList = [
        'service',
        'function',
        'trigger',
        'domain',
        'version',
        'alias',
        'provision',
        'ondemand',
        'onDemand',
        'layer',
      ];
      if (!removeCommandList.includes(subCommand)) {
        return { errorMessage: `Does not support ${subCommand} command.When plan-type is ${planType}, --sub-command supports not specified or ${removeCommandList.toString()}` };
      }
    } else {
      return { errorMessage: `--plan-type only supports deploy and remove, not ${planType}` };
    }

    return { planType, subCommand };
  }

  static showPlan(planRs: any, planType) {
    logger.debug(`planRs:: ${JSON.stringify(planRs)}`);
    if (planType === 'deploy') {
      const { region } = planRs;
      delete planRs.region;
      logger.log(`\n\nregion: ${region}`);
      for (const key of Object.keys(planRs)) {
        const value = planRs[key];
        if (_.isEmpty(value)) {
          continue;
        }
        if (_.isArray(value)) {
          value.map((itemValue) => this.showDeployItem(key, itemValue));
        } else {
          this.showDeployItem(key, value);
        }
      }
    } else if (planType === 'remove') {
      for (const planItem of planRs) {
        logger.debug(JSON.stringify(planItem));
        if (_.isEmpty(planItem.data)) {
          continue;
        }
        logger.log(`${_.upperFirst(planItem.resources)}:`);
        console.log(Table(planItem.header, planItem.data).render());
      }
    }

    logger.log('\n\n');
  }


  private static showDeployItem(key, value) {
    if (_.isEmpty(value.remote) || value.remote === 'remoteNull') {
      logger.log(`${key}:`);
      logger.debug(`Resources(${key}) to create:`);
      logger.output(value.local, 2);
    } else if (value.plan) {
      logger.log(`${key}:`);
      logger.debug(`Resources(${key}) to change (release => new):`);
      logger.log(value.plan);
    } else if (value.diff) {
      logger.log(`${key}:`);
      logger.debug(`Resources(${key}) to change (release => new):`);
      logger.log(value.diff);
    }
  }
}
