import * as core from '@serverless-devs/core';
import fs from 'fs';
import logger from '../../common/logger';
import Client from '../client';
import * as HELP from '../help/provision';
import { getCredentials, promptForConfirmOrDetails, tableShow } from '../utils';
import _ from 'lodash';
import { ICredentials } from '../interface/profile';

const sleep = (time = 1000) => new Promise((r) => setTimeout(r, time));
interface IProps {
  region?: string;
  serviceName?: string;
  qualifier?: string;
  functionName?: string;
  config?: string;
  target?: number;
}
interface GetProvision { serviceName: string; qualifier: string; functionName: string }
interface ListProvision { serviceName?: string; qualifier?: string }
interface RemoveAllProvision { serviceName: string; qualifier?: string; assumeYes?: boolean }
interface PutProvision { serviceName: string; qualifier: string; functionName: string; target?: number; config?: string }

const PROVISION_COMMADN_HELP_KEY = {
  list: HELP.PROVISION_LIST,
  get: HELP.PROVISION_GET,
  put: HELP.PROVISION_PUT,
};
const TABLE = [
  { value: 'serviceName', width: '10%' },
  { value: 'qualifier', width: '10%' },
  { value: 'functionName', width: '10%' },
  { value: 'target', width: '10%', alias: 'target', formatter: (value) => value || '0' },
  { value: 'current', width: '10%', alias: 'current', formatter: (value) => value || '0' },
  {
    value: 'scheduledActions',
    width: '25%',
    formatter: (value) => (value && value.length ? JSON.stringify(value, null, 2) : value),
  },
  {
    value: 'targetTrackingPolicies',
    width: '25%',
    formatter: (value) => (value && value.length ? JSON.stringify(value, null, 2) : value),
  },
];

export default class Provision {
  static async handlerInputs(inputs) {
    logger.debug(`inputs.props: ${JSON.stringify(inputs.props)}`);

    const parsedArgs: {[key: string]: any} = core.commandParse(inputs, {
      boolean: ['help', 'table'],
      string: ['region', 'service-name', 'qualifier', 'function-name', 'config'],
      number: ['target'],
      alias: { help: 'h' },
    });

    const parsedData = parsedArgs?.data || {};
    const rawData = parsedData._ || [];
    if (!rawData.length) {
      core.help(HELP.PROVISION);
      return { help: true };
    }

    const subCommand = rawData[0];
    logger.debug(`provision subCommand: ${subCommand}`);
    if (!Object.keys(PROVISION_COMMADN_HELP_KEY).includes(subCommand)) {
      core.help(HELP.PROVISION);
      return { help: true, errorMessage: `Does not support ${subCommand} command` };
    }
    if (parsedData.help) {
      core.help(PROVISION_COMMADN_HELP_KEY[subCommand]);
      return { help: true, subCommand };
    }

    const props = inputs.props || {};
    const region = parsedData.region || props.region;
    if (!region) {
      throw new Error('Not found region');
    }
    const endProps: IProps = {
      region,
      serviceName: parsedData['service-name'] || props.service?.name,
      qualifier: parsedData.qualifier || props.qualifier,
      functionName: parsedData['function-name'] || props.function?.name,
      config: parsedData.config,
      target: parsedData.target,
    };

    const credentials: ICredentials = await getCredentials(inputs.credentials, inputs?.project?.access);
    logger.debug(`handler inputs props: ${JSON.stringify(endProps)}`);
    await Client.setFcClient(endProps.region, credentials, inputs?.project?.access);

    return {
      credentials,
      subCommand,
      props: endProps,
      table: parsedData.table,
    };
  }

  async get({ serviceName, qualifier, functionName }: GetProvision) {
    if (!functionName) {
      throw new Error('Not found function name');
    }
    if (!qualifier) {
      throw new Error('Not found qualifier');
    }
    if (!serviceName) {
      throw new Error('Not found service name');
    }
    logger.info(`Getting provision: ${serviceName}.${qualifier}/${functionName}`);
    const { data } = await Client.fcClient.getProvisionConfig(serviceName, functionName, qualifier);
    if (data) {
      return {
        serviceName,
        functionName,
        qualifier,
        ...data,
      };
    }
  }

  async put({ serviceName, qualifier, functionName, config, target }: PutProvision) {
    if (!functionName) {
      throw new Error('Not found function name parameter');
    }
    if (!qualifier) {
      throw new Error('Not found qualifier parameter');
    }
    if (!serviceName) {
      throw new Error('Not found service name parameter');
    }
    if (!config && typeof target !== 'number') {
      throw new Error('config and target must fill in one');
    }

    let options: any = {
      target: 0,
      scheduledActions: [],
      targetTrackingPolicies: [],
    };
    if (config) {
      try {
        const fileStr = fs.readFileSync(config, 'utf8');
        options = JSON.parse(fileStr);
      } catch (ex) {
        logger.debug(`Read ${config} error: ${ex.message}`);
        throw new Error(`Reading ${config} file failed, please check whether this file exists and is a standard JSON`);
      }
    }
    if (typeof target === 'number') {
      options.target = target;
    }

    logger.info(`Updating provision: ${serviceName}.${qualifier}/${functionName}`);
    const { data } = await Client.fcClient.putProvisionConfig(serviceName, functionName, qualifier, options);
    if (options.target === 0) {
      let retryBout = 0;
      let notEffective = true;
      try {
        do {
          await sleep();
          retryBout += 1;
          const provisionData = await this.get({ serviceName, qualifier, functionName });
          notEffective = provisionData !== 0;
        } while (retryBout < 20 && notEffective);
      } catch (_ex) { /** */ }
    }
    return data;
  }

  async list({ serviceName, qualifier }: ListProvision, table?) {
    logger.info(`Getting list provision: ${serviceName}`);

    const provisionConfigs = (await Client.fcClient.get_all_list_data('/provision-configs', 'provisionConfigs', {
      serviceName,
      qualifier,
    }));

    const data = provisionConfigs?.filter((item) => item.target || item.current)
      .map((item) => ({
        serviceName: item.resource.split('#')[1],
        qualifier: item.resource.split('#')[2],
        functionName: item.resource.split('#')[3],
        ...item,
      }));
    if (table) {
      tableShow(data, TABLE);
    } else {
      return data;
    }
  }

  async removeAll({ serviceName, qualifier, assumeYes }: RemoveAllProvision) {
    const provisionList = await this.list({ serviceName, qualifier });
    if (!_.isEmpty(provisionList)) {
      if (assumeYes) {
        return await this.forDelete(provisionList);
      }

      tableShow(provisionList, TABLE);
      const meg = `Provision configuration exists under service ${serviceName}, whether to delete all provision resources. To delete only a single configuration, execute [s remove provision --qualifier xxx --function-name xxx]`;
      if (await promptForConfirmOrDetails(meg)) {
        return await this.forDelete(provisionList);
      }
    }
  }

  private async forDelete(data: any[]) {
    for (const { serviceName, qualifier, functionName } of data) {
      await this.put({ serviceName, qualifier, functionName, target: 0 });
    }
  }
}
