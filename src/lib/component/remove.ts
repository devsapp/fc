/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */

import * as core from '@serverless-devs/core';
import { ICredentials } from '../interface/profile';
import Client from '../client';
import logger from '../../common/logger';
import OnDemand from './on-demand';
import Provision from './provision';
import Alias from './alias';
import Version from './version';
import _ from 'lodash';

const COMMAND: string[] = [
  'service',
  'function',
  'trigger',
  'domain',
  'version',
  'alias',
  'provision',
  'onDemand',
  'layer',
];

interface RemoveOnDemandOrProvision {
  region: string;
  serviceName: string;
  qualifier?: string;
  functionName?: string;
  assumeYes?: boolean;
}

interface RemoveAlias {
  region: string;
  serviceName: string;
  aliasName?: string;
  assumeYes?: boolean;
}

interface RemoveVersion {
  region: string;
  serviceName: string;
  version?: string;
  assumeYes?: boolean;
}

export default class Remvoe {
  static async handlerInputs(inputs) {
    logger.debug(`inputs.props: ${JSON.stringify(inputs.props)}`);

    const parsedArgs: {[key: string]: any} = core.commandParse(inputs, {
      boolean: ['help'],
      alias: { help: 'h' },
    });

    const parsedData = parsedArgs?.data || {};
    const rawData = parsedData._ || [];

    const subCommand = rawData[0] || 'service';
    logger.debug(`remove subCommand: ${subCommand}`);
    if (!COMMAND.includes(subCommand)) {
      core.help('');
      return { errorMessage: `Does not support ${subCommand} command` };
    }

    if (parsedData.help) {
      core.help('');
      return { help: true, subCommand };
    }

    const props = inputs.props || {};

    const endProps = {
      region: parsedData.region || props.region,
      assumeYes: parsedData['assume-yes'] || parsedData.y,
      onlyLocal: parsedData['only-local'],
      serviceName: parsedData['service-name'] || props.service?.name,
      functionName: parsedData['function-name'] || props.function?.name,
      qualifier: parsedData.qualifier,
      layerName: parsedData['layer-name'],
      version: parsedData.version,
      aliasName: parsedData['alias-name'],
    };

    if (!endProps.region) {
      throw new Error('Not fount region');
    }

    const credentials: ICredentials = inputs.credentials || await core.getCredential(inputs?.project?.access);
    logger.debug(`handler inputs props: ${JSON.stringify(endProps)}`);

    return {
      credentials,
      subCommand,
      props: endProps,
      args: props.args,
      table: parsedData.table,
    };
  }

  constructor({ region, credentials }) {
    Client.setFcClient(region, credentials);
  }

  async removeOnDemand(credentials, { region, qualifier, serviceName, functionName, assumeYes }: RemoveOnDemandOrProvision) {
    if (!_.isEmpty(qualifier) && _.isEmpty(functionName)) {
      throw new Error('not fount functionName');
    }

    const onDemand = new OnDemand({ region, credentials });
    if (!_.isEmpty(qualifier)) {
      return await onDemand.delete({ qualifier, serviceName, functionName });
    }

    await onDemand.deleteAll({ serviceName, assumeYes });
  }

  async removeProvision(credentials, { region, qualifier, serviceName, functionName, assumeYes }: RemoveOnDemandOrProvision) {
    if (!_.isEmpty(qualifier) && _.isEmpty(functionName)) {
      throw new Error('not fount functionName');
    }

    const provision = new Provision({ region, credentials });
    if (!_.isEmpty(qualifier)) {
      return await provision.put({ qualifier, serviceName, functionName, target: 0 });
    }

    await provision.deleteAll({ serviceName, assumeYes });
  }

  async removeAlias(credentials, { region, serviceName, aliasName, assumeYes }: RemoveAlias) {
    const alias = new Alias({ region, credentials });

    if (aliasName) {
      return alias.delete({ serviceName, aliasName });
    }

    return await alias.deleteAll({ serviceName, assumeYes });
  }

  async removeVersion(credentials, { region, serviceName, version, assumeYes }: RemoveVersion) {
    const versionClient = new Version({ region, credentials });
    if (version) {
      return versionClient.delete({ serviceName, version });
    }
    return await versionClient.deleteAll({ serviceName, assumeYes });
  }

  async remove({ props, subCommand, credentials }, inputs) {
    const {
      region,
      assumeYes,
      onlyLocal,
      serviceName,
      functionName,
      qualifier,
      version,
      aliasName,
    } = props;

    if (subCommand === 'layer') {
      const commandName = 'devsapp/fc-layer';
      const getInputs = this.genInputs(inputs, commandName, props);
      if (version) {
        return (await core.loadComponent(commandName)).deleteVersion(getInputs);
      }
      return (await core.loadComponent(commandName)).deleteLayer(getInputs);
    }

    if (subCommand === 'domain') {
      const commandName = 'devsapp/fc-deploy';
      const getInputs = this.genInputs(inputs, commandName, inputs.props);
      return (await core.loadComponent(commandName)).remove(getInputs);
    }

    if (_.isEmpty(serviceName)) {
      throw new Error('not fount serviceName');
    }

    if (subCommand === 'onDemand') {
      return await this.removeOnDemand(credentials, { region, qualifier, serviceName, functionName, assumeYes });
    }

    if (subCommand === 'provision') {
      return await this.removeProvision(credentials, { region, qualifier, serviceName, functionName, assumeYes });
    }

    if (subCommand === 'alias') {
      return await this.removeAlias(credentials, { region, serviceName, aliasName, assumeYes });
    }

    if (subCommand === 'version') {
      return await this.removeVersion(credentials, { region, serviceName, version, assumeYes });
    }

    if (!onlyLocal && subCommand === 'service') {
      await this.removeOnDemand(credentials, { region, serviceName, assumeYes });
      await this.removeProvision(credentials, { region, serviceName, assumeYes });
      await this.removeAlias(credentials, { region, serviceName, assumeYes });
      await this.removeVersion(credentials, { region, serviceName, assumeYes });
    }

    const commandName = 'devsapp/fc-deploy';
    const getInputs = this.genInputs(inputs, commandName, inputs.props);
    return (await core.loadComponent('/Users/wb447188/Desktop/new-repo/fc-deploy')).remove(getInputs);
  }

  private genInputs({
    appName,
    projectName,
    access,
    args,
    curPath,
  }, componentName, props) {
    return {
      project: {
        component: componentName,
        projectName: `${projectName}-${componentName}-project`,
        access,
      },
      appName,
      props,
      args,
      path: curPath,
    };
  }
}

