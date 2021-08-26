import FC from '@alicloud/fc2';
import * as core from '@serverless-devs/core';
import _ from 'lodash';
import { extract } from './utils';

FC.prototype.on_demand_list = async function (options = {}) {
  return this.get('/on-demand-configs', options);
};
FC.prototype.alias_list = async function (serviceName, options = {}, headers?) {
  return this.get(`/services/${serviceName}/aliases`, options, headers);
};
FC.prototype.version_list = async function (serviceName, options = {}, headers?) {
  return this.get(`/services/${serviceName}/versions`, options, headers);
};
FC.prototype.on_demand_get = async function (serviceName, qualifier, functionName) {
  return this.get(`/services/${serviceName}.${qualifier}/functions/${functionName}/on-demand-config`);
};
FC.prototype.on_demand_put = async function (serviceName, qualifier, functionName, options = {}) {
  return this.put(`/services/${serviceName}.${qualifier}/functions/${functionName}/on-demand-config`, options);
};
FC.prototype.on_demand_delete = async function (serviceName, qualifier, functionName) {
  return this.delete(`/services/${serviceName}.${qualifier}/functions/${functionName}/on-demand-config`);
};
FC.prototype.get_all_list_data = async function (path, dataKeyword, options: { [key: string]: any } = {}, headers?) {
  let data = [];
  do {
    const res = await this.get(path, options, headers);

    const keywordData = res.data?.[dataKeyword];
    options.nextToken = res.data?.nextToken;

    if (!_.isEmpty(keywordData)) {
      data = data.concat(keywordData);
    }
  } while (options.nextToken);

  return data;
};

export default class Client {
  static fcClient: any;

  static async setFcClient(region: string, credentials) {
    const {
      AccountID,
      AccessKeyID,
      AccessKeySecret,
      SecurityToken,
    } = credentials;
    const customFcEndpoint = await Client.getFcEndpoint();
    const uid = customFcEndpoint?.accountId || AccountID;
    const fcClient = new FC(uid, {
      accessKeyID: AccessKeyID,
      accessKeySecret: AccessKeySecret,
      securityToken: SecurityToken,
      region: customFcEndpoint?.region || region,
      endpoint: customFcEndpoint?.fcEndpoint,
      timeout: 6000000,
    });

    this.fcClient = fcClient;

    return fcClient;
  }

  static async getFcEndpoint(): Promise<any> {
    const fcDefault = await core.loadComponent('devsapp/fc-default');
    const fcEndpoint: string = await fcDefault.get({ args: 'fc-endpoint' });
    if (!fcEndpoint) { return undefined; }
    const enableFcEndpoint: any = await fcDefault.get({ args: 'enable-fc-endpoint' });
    if (!(enableFcEndpoint === true || enableFcEndpoint === 'true')) { return undefined; }
    return {
      fcEndpoint,
      accountId: Client.extractAccountId(fcEndpoint),
      region: Client.extractRegion(fcEndpoint),
      protocol: Client.extractProtocol(fcEndpoint),
    };
  }

  static extractAccountId(endpoint: string) {
    return extract(/^https?:\/\/([^.]+)\..+$/, endpoint);
  }

  static extractRegion(endpoint: string) {
    return extract(/^https?:\/\/[^.]+\.([^.]+)\..+$/, endpoint);
  }

  static extractProtocol(endpoint: string) {
    const array = endpoint.split(':', 1);
    return array.length !== 0 ? array[0] : '';
  }
}
