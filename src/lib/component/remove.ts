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
import * as HELP from '../help/remove';
import _ from 'lodash';
import { getCredentials } from '../utils';

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

interface EndProps {
  region: string;
  assumeYes?: boolean;
  onlyLocal?: boolean;
  serviceName?: string;
  functionName?: string;
  qualifier?: string;
  layerName?: string;
  version?: string;
  aliasName?: string;
}
interface IRemove {
  props: EndProps;
  subCommand?: 'layer' | 'domain' | 'onDemand' | 'provision' | 'alias' | 'version' | 'service' | 'function' | 'trigger';
  credentials: ICredentials;
}

export default class Remove {
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
      core.help(HELP.REMOVE);
      return { errorMessage: `Does not support ${subCommand} command` };
    }

    if (parsedData.help) {
      rawData[0] ? core.help(HELP[`remove_${subCommand}`.toLocaleUpperCase()]) : core.help(HELP.REMOVE);
      return { help: true, subCommand };
    }

    const props = inputs.props || {};

    const endProps: EndProps = {
      region: parsedData.region || props.region,
      assumeYes: parsedData['assume-yes'] || parsedData.y,
      onlyLocal: parsedData['use-local'],
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

    const credentials: ICredentials = await getCredentials(inputs.credentials, inputs?.project?.access);
    logger.debug(`handler inputs props: ${JSON.stringify(endProps)}`);

    return {
      credentials,
      subCommand,
      props: endProps,
      args: props.args,
      table: parsedData.table,
    };
  }

  constructor({ region, credentials }: { region: string; credentials: ICredentials }) {
    Client.setFcClient(region, credentials);
  }

  async removeOnDemand(credentials: ICredentials, { region, qualifier, serviceName, functionName, assumeYes }: RemoveOnDemandOrProvision) {
    if (!_.isEmpty(qualifier) && _.isEmpty(functionName)) {
      throw new Error('not fount functionName');
    }

    const onDemand = new OnDemand({ region, credentials });
    if (!_.isEmpty(qualifier)) {
      return await onDemand.remove({ qualifier, serviceName, functionName });
    }

    await onDemand.removeAll({ serviceName, qualifier, assumeYes });
  }

  async removeProvision(credentials: ICredentials, { region, qualifier, serviceName, functionName, assumeYes }: RemoveOnDemandOrProvision) {
    if (!_.isEmpty(qualifier) && _.isEmpty(functionName)) {
      throw new Error('not fount functionName');
    }

    const provision = new Provision({ region, credentials });
    if (!_.isEmpty(qualifier)) {
      return await provision.put({ qualifier, serviceName, functionName, target: 0 });
    }

    await provision.removeAll({ serviceName, qualifier, assumeYes });
  }

  async removeAlias(credentials: ICredentials, { region, serviceName, aliasName, assumeYes }: RemoveAlias) {
    const alias = new Alias({ region, credentials });

    if (aliasName) {
      return alias.remove({ serviceName, aliasName });
    }

    return await alias.removeAll({ serviceName, assumeYes });
  }

  async removeVersion(credentials: ICredentials, { region, serviceName, version, assumeYes }: RemoveVersion) {
    const versionClient = new Version({ region, credentials });
    if (version) {
      return versionClient.remove({ serviceName, version });
    }
    return await versionClient.removeAll({ serviceName, assumeYes });
  }

  async remove({ props, subCommand, credentials }: IRemove, inputs) {
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
      const componentName = 'devsapp/fc-layer';
      const componentInputs = this.genInputs(inputs, componentName, props);
      if (version) {
        return (await core.loadComponent(componentName)).deleteVersion(componentInputs);
      }
      return (await core.loadComponent(componentName)).deleteLayer(componentInputs);
    }

    if (subCommand === 'domain') {
      const componentName = 'devsapp/fc-deploy';
      const componentInputs = this.genInputs(inputs, componentName, inputs.props);
      return (await core.loadComponent(componentName)).remove(componentInputs);
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

    const componentName = 'devsapp/fc-deploy';
    const componentInputs = this.genInputs(inputs, componentName, inputs.props);
    return (await core.loadComponent(componentName)).remove(componentInputs);
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

