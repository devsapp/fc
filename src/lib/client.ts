import * as core from '@serverless-devs/core';
import _ from 'lodash';


export default class Client {
  static fcClient: any;

  static async setFcClient(region: string, credentials, access: string) {
    const fcCommon = await core.loadComponent('devsapp/fc-common');
    const fcClient = await fcCommon.makeFcClient({
      project: { access },
      credentials,
      props: {
        region,
      },
    });
    /**
     * 获取所有的数据
     * @param path 请求的路径
     * @param dataKeyword 返回值的关键字
     * @param options 请求的参数
     * @param headers 请求头
     * @returns 列表数据
     */
    fcClient.get_all_list_data = async function (
      path: string,
      dataKeyword: string,
      options: { [key: string]: any } = {},
      headers?: any,
    ) {
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

    this.fcClient = fcClient;

    return fcClient;
  }
}
