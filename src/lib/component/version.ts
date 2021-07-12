import * as core from '@serverless-devs/core';
import { ICredentials } from '../interface/profile';
import Client from '../client';
import logger from '../../common/logger';
import * as help_constant from '../help/version';
import { promptForConfirmOrDetails, tableShow } from '../utils';
import _ from 'lodash';

interface IProps {
  region: string;
  serviceName: string;
  description?: string;
  version?: string;
  assumeYes?: boolean;
}

const VERSION_COMMAND: string[] = ['list', 'publish', 'delete', 'deleteAll'];

export default class Version {
  static async handlerInputs(inputs) {
    logger.debug(`inputs.props: ${JSON.stringify(inputs.props)}`);

    const parsedArgs: {[key: string]: any} = core.commandParse(inputs, {
      boolean: ['help', 'table', 'y'],
      string: ['region', 'service-name', 'description', 'id'],
      alias: { help: 'h', version: 'id', 'assume-yes': 'y' },
    });

    const parsedData = parsedArgs?.data || {};
    const rawData = parsedData._ || [];
    if (!rawData.length) {
      core.help(help_constant.VERSION);
      process.exit();
    }

    const subCommand = rawData[0];
    logger.debug(`version subCommand: ${subCommand}`);
    if (!VERSION_COMMAND.includes(subCommand)) {
      core.help(help_constant.VERSION);
      return { errorMessage: `Does not support ${subCommand} command` };
    }

    if (parsedData.help) {
      core.help(help_constant[`version_${subCommand}`.toLocaleUpperCase()]);
      return { help: true, subCommand };
    }

    const props = inputs.props || {};

    const endProps: IProps = {
      region: parsedData.region || props.region,
      serviceName: parsedData['service-name'] || props.service?.name,
      description: parsedData.description,
      version: parsedData.id,
      assumeYes: parsedData.y,
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

  async list({ serviceName }, table?) {
    logger.info(`Getting listVersions: ${serviceName}`);
    const data = await Client.fcClient.get_all_list_data(`/services/${serviceName}/versions`, 'versions');
    if (table) {
      tableShow(data, ['versionId', 'description', 'createdTime', 'lastModifiedTime']);
    } else {
      return data;
    }
  }

  async publish({ serviceName, description }) {
    logger.info(`Creating service version: ${serviceName}`);
    const { data } = await Client.fcClient.publishVersion(serviceName, description);
    logger.debug(`publish version: ${JSON.stringify(data)}`);
    return data;
  }

  async delete({ serviceName, version }) {
    if (!version) {
      throw new Error('Not fount version');
    }
    logger.info(`Removing service version: ${serviceName}.${version}`);
    const res = await Client.fcClient.deleteVersion(serviceName, version);
    logger.debug(`delete version: ${JSON.stringify(res)}`);
  }

  async deleteAll({ serviceName, assumeYes }) {
    const listData = await this.list({ serviceName });
    if (assumeYes) {
      return await this.forDeleteVersion(serviceName, listData);
    }

    if (!_.isEmpty(listData)) {
      tableShow(listData, ['versionId', 'description', 'createdTime', 'lastModifiedTime']);
      const meg = `Version configuration exists under service ${serviceName}, whether to delete all version resources`;
      if (await promptForConfirmOrDetails(meg)) {
        return await this.forDeleteVersion(serviceName, listData);
      }
    }
  }

  private async forDeleteVersion(serviceName, listData) {
    for (const { versionId } of listData) {
      await this.delete({ serviceName, version: versionId });
    }
  }
}
