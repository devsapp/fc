import * as core from '@serverless-devs/core';
import { ICredentials } from '../interface/profile';
import Client from '../client';
import logger from '../../common/logger';
import * as help_constant from '../help/alias';
import { tableShow } from '../utils';

interface IProps {
  region?: string;
  serviceName: string;
  description?: string;
  versionId?: string;
  aliasName?: string;
  gversion?: string;
  weight?: number;
}

const ALIAS_COMMAND: string[] = ['list', 'get', 'publish', 'delete', 'deleteAll'];

export default class Alias {
  static async handlerInputs(inputs) {
    logger.debug(`inputs.props: ${JSON.stringify(inputs.props)}`);

    const parsedArgs: {[key: string]: any} = core.commandParse(inputs, {
      boolean: ['help', 'table'],
      string: ['region', 'service-name', 'description', 'alias-name', 'id', 'gversion'],
      number: ['weight'],
      alias: { help: 'h', 'version-id': 'id' },
    });

    const parsedData = parsedArgs?.data || {};
    const rawData = parsedData._ || [];
    if (!rawData.length) {
      core.help(help_constant.ALIAS);
      process.exit();
    }

    const subCommand = rawData[0];
    logger.debug(`version subCommand: ${subCommand}`);
    if (!ALIAS_COMMAND.includes(subCommand)) {
      core.help(help_constant.ALIAS);
      return { errorMessage: `Does not support ${subCommand} command` };
    }

    if (parsedData.help) {
      core.help(help_constant[`alias_${subCommand}`.toLocaleUpperCase()]);
      return { help: true, subCommand };
    }

    const props = inputs.props || {};

    const endProps: IProps = {
      region: parsedData.region || props.region,
      serviceName: parsedData['service-name'] || props.service?.name,
      description: parsedData.description,
      versionId: parsedData.id,
      aliasName: parsedData['alias-name'],
      gversion: parsedData.gversion,
      weight: parsedData.weight,
    };

    if (!endProps.region) {
      throw new Error('Not fount region');
    }
    if (!endProps.serviceName) {
      throw new Error('Not fount serviceName');
    }

    const credentials: ICredentials = inputs.credentials || await core.getCredential(inputs?.project?.access);
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

  async findAlias({ serviceName, aliasName }) {
    const aliasList = await this.list({ serviceName });
    for (const aliasItem of aliasList) {
      if (aliasItem.aliasName === aliasName) {
        return aliasItem;
      }
    }
    return false;
  }

  async publish({ serviceName, description, aliasName, versionId, gversion, weight }: IProps) {
    if (!versionId) {
      throw new Error('Not fount versionId');
    }
    const hasWeight = typeof weight === 'number';
    if (hasWeight && !gversion) {
      throw new Error('weight exists, gversion is required');
    }
    if (gversion && !hasWeight) {
      throw new Error('gversion exists,weight is required');
    }
    const parames = {
      description,
      additionalVersionWeight: {},
    };
    if (hasWeight) {
      parames.additionalVersionWeight = { [gversion]: weight / 100 };
    }

    const aliasConfig = await this.findAlias({ serviceName, aliasName });
    if (aliasConfig) {
      return await this.updateAlias({ aliasName, serviceName, versionId, parames });
    } else {
      return await this.createAlias({ aliasName, serviceName, versionId, parames });
    }
  }

  async list({ serviceName }, table?) {
    logger.info(`Getting listAliases: ${serviceName}`);
    const data = await Client.fcClient.get_all_list_data(`/services/${serviceName}/aliases`, 'aliases');
    if (table) {
      const showWeight = {
        value: 'additionalVersionWeight',
        formatter: (value) => {
          const gversion = Object.keys(value)[0];
          if (gversion) {
            return `additionalVersion: ${gversion}\nWeight: ${value[gversion] * 100}%`;
          }
          return '';
        },
      };
      tableShow(data, ['aliasName', 'versionId', 'description', 'createdTime', 'lastModifiedTime', showWeight]);
    } else {
      return data;
    }
  }

  async get({ serviceName, aliasName }) {
    logger.info(`Getting alias: ${aliasName}`);
    return (await Client.fcClient.getAlias(serviceName, aliasName)).data;
  }

  async delete({ serviceName, aliasName }) {
    logger.info(`Removing alias: ${aliasName}`);
    return (await Client.fcClient.deleteAlias(serviceName, aliasName)).data;
  }

  async deleteAll({ serviceName }) {
    const aliasList = await this.list({ serviceName });
    for (const { aliasName } of aliasList) {
      await this.delete({ serviceName, aliasName });
    }
  }

  private async updateAlias({ aliasName, serviceName, versionId, parames }) {
    logger.info(`Updating alias: ${aliasName}`);
    await Client.fcClient.updateAlias(serviceName, aliasName, versionId, parames);
  }

  private async createAlias({ aliasName, serviceName, versionId, parames }) {
    logger.info(`Creating alias: ${aliasName}`);
    await Client.fcClient.createAlias(serviceName, aliasName, versionId, parames);
  }
}
