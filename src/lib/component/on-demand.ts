import * as core from '@serverless-devs/core';
import logger from '../../common/logger';
import * as help_constant from '../help/on-demand';
import Client from '../client';
import { tableShow } from '../utils';

interface IProps {
  region?: string;
  serviceName?: string;
  qualifier?: string;
  functionName?: string;
  maximumInstanceCount?: number;
}
const ONDEMAND_COMMADN = ['list', 'get', 'put', 'delete'];

export default class OnDemand {
  static async handlerInputs(inputs) {
    logger.debug(`inputs.props: ${JSON.stringify(inputs.props)}`);

    const parsedArgs: {[key: string]: any} = core.commandParse(inputs, {
      boolean: ['help', 'table'],
      string: ['region', 'service-name', 'qualifier', 'function-name'],
      number: ['maximum-instance-count'],
      alias: { help: 'h', 'maximum-instance-count': 'max' },
    });

    const parsedData = parsedArgs?.data || {};
    const rawData = parsedData._ || [];
    if (!rawData.length) {
      core.help(help_constant.ONDEMAND);
      process.exit();
    }

    const subCommand = rawData[0];
    logger.debug(`onDemand subCommand: ${subCommand}`);
    if (!ONDEMAND_COMMADN.includes(subCommand)) {
      core.help(help_constant.ONDEMAND);
      return { errorMessage: `Does not support ${subCommand} command` };
    }
    if (parsedData.help) {
      core.help(help_constant[`onDemand_${subCommand}`.toLocaleUpperCase()]);
      return { help: true, subCommand };
    }

    const props = inputs.props || {};
    const region = parsedData.region || props.region;
    if (!region) {
      throw new Error('Not fount region');
    }
    const endProps: IProps = {
      region,
      serviceName: parsedData['service-name'] || props.service?.name,
      qualifier: parsedData.qualifier || props.qualifier,
      functionName: parsedData['function-name'] || props.function?.name,
      maximumInstanceCount: parsedData['maximum-instance-count'],
    };

    const credentials = inputs.credentials || await core.getCredential(inputs.project.access);
    logger.debug(`handler inputs props: ${JSON.stringify(endProps)}`);

    return {
      credentials,
      subCommand,
      props: endProps,
      table: parsedData.table,
    };
  }

  constructor({ region, credentials }) {
    Client.setFcClient(region, credentials);
  }

  async list({ serviceName }: IProps, table?) {
    logger.info(`Getting list on-demand: ${serviceName}`);
    const data = await Client.fcClient.get_all_list_data('/on-demand-configs', 'configs', {
      prefix: serviceName ? `services/${serviceName}` : '',
    });
    if (table) {
      tableShow(data.map((item) => {
        const [, service, , functionName] = item.resource.split('/');
        const serviceArr = service.split('.');
        return {
          serviceName: serviceArr[0],
          qualifier: serviceArr[1],
          functionName,
          ...item,
        };
      }), [
        'serviceName',
        'qualifier',
        'functionName',
        'maximumInstanceCount',
      ]);
    } else {
      return data;
    }
  }

  async get({ serviceName, qualifier, functionName }) {
    if (!functionName) {
      throw new Error('Not fount functionName');
    }
    if (!qualifier) {
      throw new Error('Not fount qualifier');
    }
    if (!serviceName) {
      throw new Error('Not fount serviceName');
    }
    logger.info(`Getting on-demand: ${serviceName}.${qualifier}/${functionName}`);
    const { data } = await Client.fcClient.on_demand_get(serviceName, qualifier, functionName);
    if (data) {
      return {
        serviceName,
        functionName,
        qualifier,
        ...data,
      };
    }
  }

  async delete({ serviceName, qualifier, functionName }) {
    if (!functionName) {
      throw new Error('Not fount functionName');
    }
    if (!qualifier) {
      throw new Error('Not fount qualifier');
    }
    if (!serviceName) {
      throw new Error('Not fount serviceName');
    }
    logger.info(`Removing on-demand: ${serviceName}.${qualifier}/${functionName}`);
    const { data } = await Client.fcClient.on_demand_delete(serviceName, qualifier, functionName);
    return data;
  }

  async put({ serviceName, qualifier, functionName, maximumInstanceCount }) {
    if (!functionName) {
      throw new Error('Not fount functionName parameter');
    }
    if (!qualifier) {
      throw new Error('Not fount qualifier parameter');
    }
    if (!serviceName) {
      throw new Error('Not fount serviceName parameter');
    }
    if (typeof maximumInstanceCount !== 'number') {
      throw new Error('Not fount maximumInstanceCount parameter');
    }

    const options: any = {
      maximumInstanceCount,
      resource: `services/${serviceName}.${qualifier}/functions/${functionName}`,
    };

    logger.info(`Updating on-demand: ${serviceName}.${qualifier}/${functionName}`);
    const { data } = await Client.fcClient.on_demand_put(serviceName, qualifier, functionName, options);
    return data;
  }
}
