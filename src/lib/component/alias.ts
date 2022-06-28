/* eslint-disable no-await-in-loop */
import * as core from '@serverless-devs/core';
import * as HELP from '../help/alias';
import { ICredentials } from '../interface/profile';
import _ from 'lodash';
import Version from './version';
import Client from '../client';
import logger from '../../common/logger';
import { tableShow, promptForConfirmOrDetails, getCredentials } from '../utils';
import inquirer from 'inquirer';

interface IProps {
  region?: string;
  serviceName: string;
  description?: string;
  versionId?: string;
  versionLatest?: boolean;
  aliasName?: string;
  gversion?: string;
  weight?: number;
  assumeYes?: boolean;
}

interface FindAlias {
  serviceName: string;
  aliasName: string;
}
interface GetAlias {
  serviceName: string;
  aliasName: string;
}
interface RemoveAlias {
  serviceName: string;
  aliasName: string;
}
interface RemoveAliasAll {
  serviceName: string;
  assumeYes?: boolean;
}

interface Publish {
  serviceName: string;
  aliasName: string;
  versionId: string;
  versionLatest?: boolean;
  description?: string;
  gversion?: string;
  weight?: number;
}

interface Rollback {
  serviceName: string;
  aliasName: string;
  versionId: string;
  description?: string;
  gversion?: string;
  weight?: number;
}

const ALIAS_COMMAND_HELP_KEY: { [key: string]: string } = {
  list: 'ALIAS_LIST',
  get: 'ALIAS_GET',
  publish: 'ALIAS_PUBLISH',
  rollback: 'ALIAS_ROLLBACK',
};

export default class Alias {
  static async handlerInputs(inputs) {
    logger.debug(`inputs.props: ${JSON.stringify(inputs.props)}`);

    const parsedArgs: { [key: string]: any } = core.commandParse(inputs, {
      boolean: ['help', 'table', 'y', 'version-latest'],
      string: ['region', 'service-name', 'description', 'alias-name', 'id', 'gversion'],
      number: ['weight'],
      alias: { help: 'h', 'version-id': 'id', 'assume-yes': 'y' },
    });
    const parsedData = parsedArgs?.data || {};
    const rawData = parsedData._ || [];
    if (!rawData.length) {
      core.help(HELP.ALIAS);
      return { help: true };
    }

    const subCommand = rawData[0];
    logger.debug(`version subCommand: ${subCommand}`);
    if (!Object.keys(ALIAS_COMMAND_HELP_KEY).includes(subCommand)) {
      core.help(HELP.ALIAS);
      throw new core.CatchableError(`Does not support ${subCommand} command`);
    }

    if (parsedData.help) {
      core.help(HELP[ALIAS_COMMAND_HELP_KEY[subCommand]]);
      return { help: true, subCommand };
    }

    const props = inputs.props || {};

    const endProps: IProps = {
      region: parsedData.region || props.region,
      serviceName: parsedData['service-name'] || props.service?.name,
      description: parsedData.description,
      versionId: parsedData.id,
      versionLatest: parsedData['version-latest'],
      assumeYes: parsedData.y,
      aliasName: parsedData['alias-name'],
      gversion: parsedData.gversion,
      weight: parsedData.weight,
    };

    if (!endProps.region) {
      throw new Error('Not found region, Please specify with --region');
    }
    if (!endProps.serviceName) {
      throw new Error('Not found service name, Please specify with --service-name');
    }

    const credentials: ICredentials = await getCredentials(
      inputs.credentials,
      inputs?.project?.access,
    );
    logger.debug(`handler inputs props: ${JSON.stringify(endProps)}`);
    await Client.setFcClient(endProps.region, inputs.credentials, inputs?.project?.access);

    return {
      credentials,
      subCommand,
      props: endProps,
      table: parsedData.table,
    };
  }
  region: string;
  credentials: ICredentials;

  async findAlias({ serviceName, aliasName }: FindAlias) {
    const aliasList = await this.list({ serviceName });
    for (const aliasItem of aliasList) {
      if (aliasItem.aliasName === aliasName) {
        return aliasItem;
      }
    }
    return false;
  }

  async publish({
    serviceName,
    description,
    aliasName,
    versionId,
    versionLatest,
    gversion,
    weight,
  }: Publish) {
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

    if (!(aliasName && /^[_a-zA-Z][-_a-zA-Z0-9]*$/.test(aliasName))) {
      throw new Error(
        `AliasName doesn't match expected format (allowed: ^[_a-zA-Z][-_a-zA-Z0-9]*$, actual: '${aliasName}')`,
      );
    }

    if (!versionId) {
      const versionClient = new Version();
      const versionList = await versionClient.list({ serviceName });
      if (versionList.length === 0) {
        throw new Error(
          'Not found version.Please use [s version publish --description xxx] to publish the version',
        );
      } else if (versionList.length === 1 || versionLatest) {
        versionId = versionList[0].versionId;
      } else {
        const answers: any = await inquirer.prompt([
          {
            type: 'list',
            name: 'versionId',
            message:
              'Please select the version pointed to by the alias, and display the latest 20 versions. If you want to see more, please execute [s version list --table]',
            choices: versionList.slice(0, 20).map((item) => item.versionId),
          },
        ]);
        versionId = answers.versionId;
      }
    }

    const aliasConfig = await this.findAlias({ serviceName, aliasName });
    if (aliasConfig) {
      return await this.updateAlias({ aliasName, serviceName, versionId, parames });
    } else {
      return await this.createAlias({ aliasName, serviceName, versionId, parames });
    }
  }

  async rollback(props: Rollback) {
    var {
      serviceName,
      aliasName,
      versionId
    } = props;
    const aliasConfig = await this.findAlias({ serviceName, aliasName });
    if (!aliasConfig) {
      throw new core.CatchableError(`${aliasName} not found.`);
    }
    if (!_.isNumber(versionId)) {
      if (!versionId.startsWith('HEAD')) {
        throw new core.CatchableError('Command format error', 'Example: s alias rollback --alias-name aliasName --version-id HEAD^ / HEAD~1 / version-id');
      }
      const subStr = versionId.substring(4);
      var rb = 0;
      if (/^\^+$/.test(subStr)) {
        rb = subStr.length;
      } else if (/^~\d$/.test(subStr)) {
        rb = Number(subStr.substring(1));
      } else {
        throw new core.CatchableError('Command format error', 'Example: s alias rollback --alias-name aliasName --version-id HEAD^ / HEAD~1 / version-id');
      }

      const versionClient = new Version();
      const versionList = await versionClient.list({ serviceName });
      const oldId = aliasConfig.versionId;
      var oldIndex = -1;
      for (var i = 0; i < versionList.length; ++i) {
        if (versionList[i].versionId === oldId){
          oldIndex = i;
          break;
        }
      }
      const newIndex = oldIndex + rb;
      if(newIndex<0||newIndex>=versionList.length){
        throw new core.CatchableError('Please check rollback number.');
      }
      versionId = versionList[newIndex].versionId;
    }

    const versionLatest = false;
    return this.publish({
      ...props,
      versionId,
      versionLatest,
    });
  }

  async list({ serviceName }: { serviceName: string }, table?: boolean) {
    logger.info(`Getting listAliases: ${serviceName}`);
    const data = await Client.fcClient.get_all_list_data(
      `/services/${serviceName}/aliases`,
      'aliases',
    );
    if (table) {
      this.showAlias(data);
    } else {
      return data;
    }
  }

  async get({ serviceName, aliasName }: GetAlias) {
    logger.info(`Getting alias: ${aliasName}`);
    return (await Client.fcClient.getAlias(serviceName, aliasName)).data;
  }

  async remove({ serviceName, aliasName }: RemoveAlias) {
    logger.info(`Removing alias: ${aliasName}`);
    return (await Client.fcClient.deleteAlias(serviceName, aliasName)).data;
  }

  async removeAll({ serviceName, assumeYes }: RemoveAliasAll) {
    const aliasList = await this.list({ serviceName });

    if (!_.isEmpty(aliasList)) {
      const meg = `Alias configuration exists under service ${serviceName}, whether to delete all alias resources.To delete only a single configuration, execute [s remove alias --alias-name xxx]`;
      if (assumeYes) {
        return await this.forDataDelete(serviceName, aliasList);
      }
      this.showAlias(aliasList);
      if (await promptForConfirmOrDetails(meg)) {
        return await this.forDataDelete(serviceName, aliasList);
      }
    }
  }

  private async forDataDelete(serviceName: string, data: Array<{ [key: string]: any }>) {
    for (const { aliasName } of data) {
      await this.remove({ serviceName, aliasName });
    }
  }

  private showAlias(data: Array<{ [key: string]: any }>) {
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
    tableShow(data, [
      'aliasName',
      'versionId',
      'description',
      'createdTime',
      'lastModifiedTime',
      showWeight,
    ]);
  }

  private async updateAlias({
    aliasName,
    serviceName,
    versionId,
    parames,
  }: {
    [key: string]: any;
  }) {
    logger.info(`Updating alias: ${aliasName}`);
    await Client.fcClient.updateAlias(serviceName, aliasName, versionId, parames);
  }

  private async createAlias({
    aliasName,
    serviceName,
    versionId,
    parames,
  }: {
    [key: string]: any;
  }) {
    logger.info(`Creating alias: ${aliasName}`);
    await Client.fcClient.createAlias(serviceName, aliasName, versionId, parames);
  }
}
