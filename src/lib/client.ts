import FC from '@alicloud/fc2';
import * as core from '@serverless-devs/core';
import _ from 'lodash';

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

    const fcClient = new FC(AccountID, {
      accessKeyID: AccessKeyID,
      accessKeySecret: AccessKeySecret,
      securityToken: SecurityToken,
      region,
      endpoint: await this.getFcEndpoint(),
      timeout: 6000000,
    });

    this.fcClient = fcClient;

    return fcClient;
  }

  static async getFcEndpoint(): Promise<string | undefined> {
    const fcDefault = await core.loadComponent('devsapp/fc-default');
    const fcEndpoint: string = await fcDefault.get({ args: 'fc-endpoint' });
    if (!fcEndpoint) { return undefined; }
    const enableFcEndpoint: any = await fcDefault.get({ args: 'enable-fc-endpoint' });
    // @ts-ignore: .
    return (enableFcEndpoint === true || enableFcEndpoint === 'true') ? fcEndpoint : undefined;
  }
}
