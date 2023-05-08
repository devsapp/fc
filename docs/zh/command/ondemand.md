---
title: 	按量资源 onDemand
description: '按量资源 onDemand'
position: 4
category: '发布&配置'
---

# Ondemand 命令

`ondemand` 命令是对函数计算按量资源操作的命令。

- [命令解析](#命令解析)
- [ondemand get 命令](#ondemand-get-命令)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [ondemand list 命令](#ondemand-list-命令)
  - [参数解析](#参数解析-1)
  - [操作案例](#操作案例-1)
- [ondemand put 命令](#ondemand-put-命令)
  - [参数解析](#参数解析-2)
  - [操作案例](#操作案例-2)
- [remove ondemand 命令](remove.md#remove-ondemand-命令)
- [权限与策略说明](#权限与策略说明)

## 命令解析

当执行命令`ondemand -h`/`ondemand --help`时，可以获取帮助文档。


在该命令中，包括了三个子命令：

- [get：查看按量资源详情](#ondemand-get-命令)
- [list：获取按量资源列表](#ondemand-list-命令)
- [put：发布/更新按量资源](#ondemand-put-命令)

## ondemand get 命令

`ondemand get` 命令，是获取服务指定按量资源详情的命令。

当执行命令`ondemand get -h`/`ondemand get --help`时，可以获取帮助文档。

### 参数解析

| 参数全称      | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region        | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name  | -        | 选填           | 必填          | 服务名                                                       |
| function-name | -        | 选填           | 必填          | 函数名                                                       |
| qualifier     | -        | 必填           | 必填          | 版本，支持LATEST和别名                                       |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s ondemand get --qualifier qualifier`进行指定的版本按量资源详情获取；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，例如`s cli fc ondemand get --region cn-hangzhou --service-name fc-deploy-service --qualifier qualifier`；

上述命令的执行结果示例：

```text
fc-deploy-test: 
  serviceName:          fc-deploy-service
  functionName:         http-trigger-py36
  qualifier:            LATEST
  resource:             services/fc-deploy-service.http-trigger-py36/functions/LATEST
  maximumInstanceCount: 1
```

## ondemand list 命令

`ondemand list` 命令，是列举按量资源列表的命令。

当执行命令`ondemand list -h`/`ondemand list --help`时，可以获取帮助文档。

### 参数解析

| 参数全称     | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------ | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region       | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | -        | 选填           | 必填          | 服务名                                                       |
| table        | -        | 选填           | 选填          | 是否以表格形式输出                                           |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s ondemand list`获取按量资源列表；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，例如`s cli fc ondemand list --region cn-hangzhou --service-name fc-deploy-service`

上述命令的执行结果示例：

```text
fc-deploy-test: 
  - 
    serviceName:          fc-deploy-service
    qualifier:            http-trigger-py36
    functionName:         LATEST
    resource:             services/fc-deploy-service.http-trigger-py36/functions/LATEST
    maximumInstanceCount: 1
```

如果指定了`--table`参数，输出示例：

```text
  ┌───────────────────┬───────────────────┬──────────────┬──────────────────────┐
  │    serviceName    │     qualifier     │ functionName │ maximumInstanceCount │
  ├───────────────────┼───────────────────┼──────────────┼──────────────────────┤
  │ fc-deploy-service │ http-trigger-py36 │ LATEST       │ 1                    │
  └───────────────────┴───────────────────┴──────────────┴──────────────────────┘
```

## ondemand put 命令

`ondemand put` 命令，是对别名进行发布和更新的命令。

当执行命令`ondemand put -h`/`ondemand put --help`时，可以获取帮助文档。

### 参数解析

| 参数全称      | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region        | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name  | -        | 选填           | 必填          | 服务名                                                       |
| function-name | -        | 选填           | 选填          | 函数名                                                       |
| qualifier     | -        | 必填           | 必填          | 版本，支持LATEST和别名                                       |
| max           | -        | 必填           | 必填          | 最大实例数量                                                 |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)                                    |

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s ondemand put --qualifier qualifier` 进行按量资源配置；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称、函数名，例如` s cli fc ondemand put --qualifier LATEST --service-name fc-deploy-service --function-name fc-deploy-function --max 1`；

上述命令的执行结果示例：

```text
fc-deploy-test: 
  resource:             services/fc-deploy-service.http-trigger-py36/functions/LATEST
  maximumInstanceCount: 1
```

## 权限与策略说明

- `ondemand list` 与 `ondemand get` 命令所需要的权限策略： `AliyunFCReadOnlyAccess`

- `ondemand put` 命令所需要的权限策略：

  ```yaml
  {
      "Version": "1",
      "Statement": [
          {
              "Action": "fc:PutFunctionOnDemandConfig",
              "Effect": "Allow",
              "Resource": "acs:fc:<region>:<account-id>:services/services/<serviceName>.<qualifier>/functions/<functionName>"
          }
      ]
  }
  ```
