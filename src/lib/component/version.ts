/* eslint-disable no-await-in-loop */
import * as core from '@serverless-devs/core';
import * as HELP from '../help/version';
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
  ignoreNoChangError?: boolean;
}
interface Publish {
  serviceName: string;
  description?: string;
  ignoreNoChangError?: boolean;
}
interface Remove {
  serviceName: string;
  versionId: string;
}
interface RemoveAll {
  serviceName: string;
  assumeYes?: boolean;
}

const VERSION_COMMAND: string[] = ['list', 'publish', 'remove', 'removeAll'];
const VERSION_COMMAND_HELP_KEY = {
  list: HELP.VERSION_LIST,
  publish: HELP.VERSION_PUBLISH,
};

export default class Version {
  static async handlerInputs(inputs) {
    logger.debug(`inputs.props: ${JSON.stringify(inputs.props)}`);

    const parsedArgs: { [key: string]: any } = core.commandParse(inputs, {
      boolean: ['help', 'table', 'y', 'ignore-no-chang-error'],
      string: ['region', 'service-name', 'description', 'id'],
      alias: { help: 'h', 'version-id': 'id', 'assume-yes': 'y' },
    });

    const parsedData = parsedArgs?.data || {};
    const rawData = parsedData._ || [];
    if (!rawData.length) {
      core.help(HELP.VERSION_HELP);
      return { help: true };
    }

    const subCommand = rawData[0];
    logger.debug(`version subCommand: ${subCommand}`);
    if (!VERSION_COMMAND.includes(subCommand)) {
      core.help(HELP.VERSION_HELP);
      throw new core.CatchableError(`Does not support ${subCommand} command`);
    }

    if (parsedData.help) {
      core.help(VERSION_COMMAND_HELP_KEY[subCommand]);
      return { help: true, subCommand };
    }

    const props = inputs.props || {};

    const endProps: IProps = {
      region: parsedData.region || props.region,
      serviceName: parsedData['service-name'] || props.service?.name,
      description: parsedData.description,
      versionId: parsedData.id,
      assumeYes: parsedData.y,
      ignoreNoChangError: parsedData['ignore-no-chang-error'],
    };

    if (!endProps.region) {
      throw new Error('Not found region');
    }
    if (!endProps.serviceName) {
      throw new Error('Not found service name');
    }

    const credentials: ICredentials = await getCredentials(
      inputs.credentials,
      inputs?.project?.access,
    );
    logger.debug(`handler inputs props: ${JSON.stringify(endProps)}`);
    await Client.setFcClient(endProps.region, credentials, inputs?.project?.access);

    return {
      credentials,
      subCommand,
      props: endProps,
      table: parsedData.table,
    };
  }

  async list({ serviceName }: { serviceName: string }, table?: boolean) {
    logger.info(`Getting listVersions: ${serviceName}`);
    const data = await Client.fcClient.get_all_list_data(
      `/services/${serviceName}/versions`,
      'versions',
    );
    if (table) {
      tableShow(data, ['versionId', 'description', 'createdTime', 'lastModifiedTime']);
    } else {
      return data;
    }
  }

  async publish({ serviceName, description, ignoreNoChangError }: Publish) {
    logger.info(`Creating service version: ${serviceName}`);
    const headers = ignoreNoChangError ? { 'x-fc-ignore-version-publish-error': 'true' } : {};
    const { data } = await Client.fcClient.publishVersion(serviceName, description, headers);
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
