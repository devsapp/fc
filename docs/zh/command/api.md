---
title: API调用 api
description: 'API调用 api'
position: 6
category: '其他功能'
---
# Api 命令

`api` 命令是直接操作函数计算 API 的命令。

- [命令解析](#命令解析)
  - [操作案例](#操作案例)
- [权限与策略说明](#权限与策略说明)


## 命令解析

当执行命令`api -h`/`api --help`时，可以获取帮助文档。


### 操作案例

以 `ListService` 接口为例（对应的文档是：https://help.aliyun.com/document_detail/175559.html）。

只需要在命令行，按照`api`指令的固定格式，进行功能拼接即可：

```shell script
s cli fc api ListService
```

在 `ListService` 的接口文档中，还有部分参数可以传入：

```
Options

  --region string       [Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-           
                        beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-    
                        shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-   
                        3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-     
                        1/ap-south-1                                                                  
                        * Set default region: [s cli fc-default set api-default-region <region>]      
  -a, --access string   [Optional] Specify key alias                                                  
  --apiVersion string   [Optional] API version, value: 20210416, 20160815                             
                        * Set default version: [s cli fc-default set api-default-version <version>]   
  --query string        Parameter details refer to [Detail: --query], format is JSON String           

Detail: --query

  limit       <Integer> [Optional] The maximum number of services to be returned. Default value: 20. Maximum value: 100.The     
              number of returned services is less than or equal to the specified number.                                        
  nextToken   <String> [Optional] The token used to obtain more results. If the number of services exceeds the limit,the        
              nextToken parameter is returned. You can include the parameter in subsequent invocationsto obtain more results.   
              You do not need to provide this parameter in the first invocation.                                                
  prefix      <String> [Optional] The prefix that the names of returned services must contain. For example, if you setthe       
              parameter to a, the names of all the returned services start with a.                                              
  startKey    <String> [Optional] The position from which the list begins. Results are sorted in alphabetical orderand those    
              results following startKey (inclusive) are listed.    
```

此时可以根据`Detail: --***`的提醒，将参数以对应格式传入，例如在上面的描述中可以看到：

```
--query string        Parameter details refer to [Detail: --query], format is JSON String 
```

所以，`--query`参数可以是JSON String类型：

```shell script
s cli fc api ListService --query '{"limit": **, "nextToken": "**", "prefix": "**", "startKey": "**"}'
```

## 权限与策略说明

根据使用的接口不同，可能会有不同的权限策略，可以根据接口名定义权限策略。
