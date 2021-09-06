import * as core from '@serverless-devs/core';
import logger from '../../common/logger';
import Client from '../client';
import { getCredentials, promptForConfirmOrDetails, tableShow } from '../utils';
import _ from 'lodash';
import { ICredentials } from '../interface/profile';

interface GetOnDemand { serviceName: string; qualifier: string; functionName: string }
interface ListOnDemand { serviceName: string }
interface RemoveOnDemand { serviceName: string; qualifier: string; functionName: string }
interface RemoveAllOnDemand { serviceName: string; qualifier?: string; assumeYes?: boolean }
interface PutOnDemand { serviceName: string; qualifier: string; functionName: string; maximumInstanceCount: number }
interface IProps {
  region?: string;
  serviceName?: string;
  qualifier?: string;
  functionName?: string;
  maximumInstanceCount?: number;
}
const ONDEMAND_COMMADN = ['list', 'get', 'put', 'remove'];
const ONDEMAND_COMMADN_HELP_KEY = {
  list: 'OnDemandListInputsArgs',
  get: 'OnDemandGetInputsArgs',
  put: 'OnDemandPutInputsArgs',
  remove: 'OnDemandDeleteInputsArgs',
};
const TABLE = [
  'serviceName',
  'qualifier',
  'functionName',
  'maximumInstanceCount',
];

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
      return { help: true, helpKey: 'OnDemandInputsArgs' };
    }

    const subCommand = rawData[0];
    logger.debug(`onDemand subCommand: ${subCommand}`);
    if (!ONDEMAND_COMMADN.includes(subCommand)) {
      return { help: true, helpKey: 'OnDemandInputsArgs', errorMessage: `Does not support ${subCommand} command` };
    }
    if (parsedData.help) {
      return { help: true, subCommand, helpKey: ONDEMAND_COMMADN_HELP_KEY[subCommand] };
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
      maximumInstanceCount: parsedData['maximum-instance-count'],
    };

    const credentials: ICredentials = await getCredentials(inputs.credentials, inputs?.project?.access);
    logger.debug(`handler inputs props: ${JSON.stringify(endProps)}`);
    await Client.setFcClient(endProps.region, credentials);

    return {
      credentials,
      subCommand,
      props: endProps,
      table: parsedData.table,
    };
  }

  async list({ serviceName }: ListOnDemand, table?) {
    logger.info(`Getting list on-demand: ${serviceName}`);

    const onDemandConfigs = (await Client.fcClient.get_all_list_data('/on-demand-configs', 'configs', {
      prefix: serviceName ? `services/${serviceName}` : '',
    }));

    const data = onDemandConfigs?.map((item) => {
      const [, service, , functionName] = item.resource.split('/');
      const serviceArr = service.split('.');
      return {
        serviceName: serviceArr[0],
        qualifier: serviceArr[1],
        functionName,
        ...item,
      };
    });
    if (table) {
      tableShow(data, TABLE);
    } else {
      return data;
    }
  }

  async get({ serviceName, qualifier, functionName }: GetOnDemand) {
    if (!functionName) {
      throw new Error('Not found functio name');
    }
    if (!qualifier) {
      throw new Error('Not found qualifier');
    }
    if (!serviceName) {
      throw new Error('Not found service name');
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

  async remove({ serviceName, qualifier, functionName }: RemoveOnDemand) {
    if (!functionName) {
      throw new Error('Not found function name');
    }
    if (!qualifier) {
      throw new Error('Not found qualifier');
    }
    if (!serviceName) {
      throw new Error('Not found service name');
    }
    logger.info(`Removing on-demand: ${serviceName}.${qualifier}/${functionName}`);
    const { data } = await Client.fcClient.on_demand_delete(serviceName, qualifier, functionName);
    return data;
  }

  async put({ serviceName, qualifier, functionName, maximumInstanceCount }: PutOnDemand) {
    if (!functionName) {
      throw new Error('Not found function name parameter');
    }
    if (!qualifier) {
      throw new Error('Not found qualifier parameter');
    }
    if (!serviceName) {
      throw new Error('Not found service name parameter');
    }
    if (typeof maximumInstanceCount !== 'number') {
      throw new Error('Not found maximumInstanceCount parameter');
    }

    const options: any = {
      maximumInstanceCount,
      resource: `services/${serviceName}.${qualifier}/functions/${functionName}`,
    };

    logger.info(`Updating on-demand: ${serviceName}.${qualifier}/${functionName}`);
    const { data } = await Client.fcClient.on_demand_put(serviceName, qualifier, functionName, options);
    return data;
  }

  async removeAll({ serviceName, qualifier, assumeYes }: RemoveAllOnDemand) {
    const onDemandAllList = await this.list({ serviceName });
    const onDemandList = onDemandAllList?.filter((item) => item.qualifier === qualifier);
    if (!_.isEmpty(onDemandList)) {
      if (assumeYes) {
        return await this.forDelete(onDemandList);
      }

      tableShow(onDemandList, TABLE);
      const meg = `On-demand configuration exists under service ${serviceName}, whether to delete all On-demand resources.To delete only a single configuration, execute [s remove onDemand --qualifier xxx --function-name xxx]`;
      if (await promptForConfirmOrDetails(meg)) {
        return await this.forDelete(onDemandList);
      }
    }
  }

  private async forDelete(data: any[]) {
    for (const item of data) {
      await this.remove(item);
    }
  }
}
