/* eslint-disable no-await-in-loop */
import * as core from '@serverless-devs/core';
import { ICredentials } from '../interface/profile';
import Client from '../client';
import logger from '../../common/logger';
import { getCredentials, promptForConfirmOrDetails, tableShow } from '../utils';
import _ from 'lodash';

interface IProps {
  region: string;
  serviceName: string;
  description?: string;
  versionId?: string;
  assumeYes?: boolean;
}
interface Publish { serviceName: string; description?: string }
interface Remove { serviceName: string; versionId: string }
interface RemoveAll { serviceName: string; assumeYes?: boolean }

const VERSION_COMMAND: string[] = ['list', 'publish', 'remove', 'removeAll'];
const VERSION_COMMAND_HELP_KEY = {
  list: 'VersionListInputsArgs',
  publish: 'VersionPublishInputsArgs',
  remove: 'VersionDeleteInputsArgs',
  removeAll: 'VersionDeleteAllInputsArgs',
};

export default class Version {
  static async handlerInputs(inputs) {
    logger.debug(`inputs.props: ${JSON.stringify(inputs.props)}`);

    const parsedArgs: {[key: string]: any} = core.commandParse(inputs, {
      boolean: ['help', 'table', 'y'],
      string: ['region', 'service-name', 'description', 'id'],
      alias: { help: 'h', 'version-id': 'id', 'assume-yes': 'y' },
    });

    const parsedData = parsedArgs?.data || {};
    const rawData = parsedData._ || [];
    if (!rawData.length) {
      return { help: true, helpKey: 'VersionInputsArgs' };
    }

    const subCommand = rawData[0];
    logger.debug(`version subCommand: ${subCommand}`);
    if (!VERSION_COMMAND.includes(subCommand)) {
      return {
        help: true,
        helpKey: 'VersionInputsArgs',
        errorMessage: `Does not support ${subCommand} command`,
      };
    }

    if (parsedData.help) {
      return { help: true, helpKey: VERSION_COMMAND_HELP_KEY[subCommand], subCommand };
    }

    const props = inputs.props || {};

    const endProps: IProps = {
      region: parsedData.region || props.region,
      serviceName: parsedData['service-name'] || props.service?.name,
      description: parsedData.description,
      versionId: parsedData.id,
      assumeYes: parsedData.y,
    };

    if (!endProps.region) {
      throw new Error('Not found region');
    }
    if (!endProps.serviceName) {
      throw new Error('Not found service name');
    }

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

  async list({ serviceName }: { serviceName: string }, table?: boolean) {
    logger.info(`Getting listVersions: ${serviceName}`);
    const data = await Client.fcClient.get_all_list_data(`/services/${serviceName}/versions`, 'versions');
    if (table) {
      tableShow(data, ['versionId', 'description', 'createdTime', 'lastModifiedTime']);
    } else {
      return data;
    }
  }

  async publish({ serviceName, description }: Publish) {
    logger.info(`Creating service version: ${serviceName}`);
    const { data } = await Client.fcClient.publishVersion(serviceName, description);
    logger.debug(`publish version: ${JSON.stringify(data)}`);
    return data;
  }

  async remove({ serviceName, versionId }: Remove) {
    if (!versionId) {
      throw new Error('Not found version');
    }
    logger.info(`Removing service version: ${serviceName}.${versionId}`);
    const res = await Client.fcClient.deleteVersion(serviceName, versionId);
    logger.debug(`delete version: ${JSON.stringify(res)}`);
  }

  async removeAll({ serviceName, assumeYes }: RemoveAll) {
    const listData = await this.list({ serviceName });
    if (assumeYes) {
      return await this.forDeleteVersion(serviceName, listData);
    }

    if (!_.isEmpty(listData)) {
      tableShow(listData, ['versionId', 'description', 'createdTime', 'lastModifiedTime']);
      const meg = `Version configuration exists under service ${serviceName}, whether to delete all version resources.To delete only a single configuration, execute [s remove version --version-id xxx]`;
      if (await promptForConfirmOrDetails(meg)) {
        return await this.forDeleteVersion(serviceName, listData);
      }
    }
  }

  private async forDeleteVersion(serviceName: string, listData: any[]) {
    for (const { versionId } of listData) {
      await this.remove({ serviceName, versionId });
    }
  }
}
