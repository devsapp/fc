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
  versionId?: string;
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
  versionId?: string;
  aliasName?: string;
}
interface IRemove {
  props: EndProps;
  subCommand?: 'layer' | 'domain' | 'onDemand' | 'provision' | 'alias' | 'version' | 'service' | 'function' | 'trigger';
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
      versionId: parsedData['version-id'] || parsedData.id,
      aliasName: parsedData['alias-name'],
    };

    if (!endProps.region) {
      throw new Error('Not found region');
    }

    const credentials: ICredentials = await getCredentials(inputs.credentials, inputs?.project?.access);
    logger.debug(`handler inputs props: ${JSON.stringify(endProps)}`);
    await Client.setFcClient(endProps.region, credentials);

    return {
      credentials,
      subCommand,
      props: endProps,
      args: props.args,
      table: parsedData.table,
    };
  }

  async removeOnDemand({ region, qualifier, serviceName, functionName, assumeYes }: RemoveOnDemandOrProvision) {
    logger.debug(`region is ${region}`);
    if (!_.isEmpty(qualifier) && _.isEmpty(functionName)) {
      throw new Error('not found functionName');
    }

    const onDemand = new OnDemand();
    if (!_.isEmpty(qualifier)) {
      return await onDemand.remove({ qualifier, serviceName, functionName });
    }

    await onDemand.removeAll({ serviceName, qualifier, assumeYes });
  }

  async removeProvision({ region, qualifier, serviceName, functionName, assumeYes }: RemoveOnDemandOrProvision) {
    logger.debug(`region is ${region}`);
    if (!_.isEmpty(qualifier) && _.isEmpty(functionName)) {
      throw new Error('not found functionName');
    }

    const provision = new Provision();
    if (!_.isEmpty(qualifier)) {
      return await provision.put({ qualifier, serviceName, functionName, target: 0 });
    }

    await provision.removeAll({ serviceName, qualifier, assumeYes });
  }

  async removeAlias({ region, serviceName, aliasName, assumeYes }: RemoveAlias) {
    logger.debug(`region is ${region}`);
    const alias = new Alias();

    if (aliasName) {
      return alias.remove({ serviceName, aliasName });
    }

    return await alias.removeAll({ serviceName, assumeYes });
  }

  async removeVersion({ region, serviceName, versionId, assumeYes }: RemoveVersion) {
    logger.debug(`region is ${region}`);
    const versionClient = new Version();
    if (versionId) {
      return versionClient.remove({ serviceName, versionId });
    }
    return await versionClient.removeAll({ serviceName, assumeYes });
  }

  async remove({ props, subCommand }: IRemove, inputs) {
    const {
      region,
      assumeYes,
      onlyLocal,
      serviceName,
      functionName,
      qualifier,
      versionId,
      aliasName,
    } = props;

    if (subCommand === 'layer') {
      const componentName = 'devsapp/fc-layer';
      const componentInputs = this.genInputs(inputs, componentName, props);
      if (versionId) {
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
      throw new Error('not found serviceName');
    }

    if (subCommand === 'onDemand') {
      return await this.removeOnDemand({ region, qualifier, serviceName, functionName, assumeYes });
    }

    if (subCommand === 'provision') {
      return await this.removeProvision({ region, qualifier, serviceName, functionName, assumeYes });
    }

    if (subCommand === 'alias') {
      return await this.removeAlias({ region, serviceName, aliasName, assumeYes });
    }

    if (subCommand === 'version') {
      return await this.removeVersion({ region, serviceName, versionId, assumeYes });
    }

    if (!onlyLocal && subCommand === 'service') {
      await this.removeOnDemand({ region, serviceName, assumeYes });
      await this.removeProvision({ region, serviceName, assumeYes });
      await this.removeAlias({ region, serviceName, assumeYes });
      await this.removeVersion({ region, serviceName, assumeYes });
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

