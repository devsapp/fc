---
title: 版本 version
description: '版本 version'
position: 1
category: '发布&配置'
---

# Version 命令

`version` 命令是进行函数版本操作的命令；主要包括别名的查看、发布、删除等功能。

- [命令解析](#命令解析)
- [version list 命令](#version-list-命令)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [version publish 命令](#version-publish-命令)
  - [参数解析](#参数解析-1)
  - [操作案例](#操作案例-1)
- [remove version 命令](remove.md#remove-version-命令)
- [权限与策略说明](#权限与策略说明)

## 命令解析

当执行命令`version -h`/`version --help`时，可以获取帮助文档。

在该命令中，包括了两个子命令：

- [list：查看版本列表](#version-list-命令)
- [publish：发布版本](#version-publish-命令)

## version list 命令

`version list` 命令，是查看服务已发布的版本列表的命令。

当执行命令`version list -h`/`version list --help`时，可以获取帮助文档。

### 参数解析

| 参数全称     | 参数缩写 | Yaml 模式下必填 | Cli 模式下必填 | 参数含义                                                                                                                                                                                                                                                                                                   |
| ------------ | -------- | --------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| region       | -        | 选填            | 必填           | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | -        | 选填            | 必填           | 服务名                                                                                                                                                                                                                                                                                                     |
| table        | -        | 选填            | 选填           | 是否以表格形式输出                                                                                                                                                                                                                                                                                         |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s version list`查看当前服务所发布的版本列表；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，例如`s cli fc version list --region cn-hangzhou --service-name fc-deploy-service`；

上述命令的执行结果示例：

```text
fc-deploy-test:
  -
    versionId:        1
    description:      test publish version
    createdTime:      2021-11-08T06:07:00Z
    lastModifiedTime: 2021-11-08T06:07:00Z
```

如果指定了`--table`参数，输出示例：

```text
  ┌───────────┬──────────────────────┬──────────────────────┬──────────────────────┐
  │ versionId │     description      │     createdTime      │   lastModifiedTime   │
  ├───────────┼──────────────────────┼──────────────────────┼──────────────────────┤
  │ 1         │ test publish version │ 2021-11-08T06:07:00Z │ 2021-11-08T06:07:00Z │
  └───────────┴──────────────────────┴──────────────────────┴──────────────────────┘
```

## version publish 命令

`version publish` 命令，是用于发布版本的命令。

当执行命令`version publish -h`/`version publish --help`时，可以获取帮助文档。

### 参数解析

| 参数全称              | 参数缩写 | Yaml 模式下必填 | Cli 模式下必填 | 参数含义                                                                                                                                                                                                                                                                                                   |
| --------------------- | -------- | --------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| region                | -        | 选填            | 必填           | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name          | -        | 选填            | 必填           | 服务名                                                                                                                                                                                                                                                                                                     |
| description           | -        | 选填            | 选填           | 版本描述                                                                                                                                                                                                                                                                                                   |
| ignore-no-chang-error | -        | 选填            | 选填           | 忽略发布版本 `No changes were made since last publish`异常                                                                                                                                                                                                                                                 |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s version publish`进行版本的发布；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，例如`s cli fc version publish --region cn-hangzhou --service-name fc-deploy-service --description "test publish version"`；

上述命令的执行结果示例：

```text
fc-deploy-test:
  versionId:        1
  description:      test publish version
  createdTime:      2021-11-08T06:07:00Z
  lastModifiedTime: 2021-11-08T06:07:00Z
```

## 权限与策略说明

- `version list` 命令所需要的权限策略： `AliyunFCReadOnlyAccess`

- `version publish` 命令所需要的权限策略：

  ```yaml
  {
    'Version': '1',
    'Statement':
      [
        {
          'Action': 'fc:PublishServiceVersion',
          'Effect': 'Allow',
          'Resource': 'acs:fc:<region>:<account-id>:services/<serviceName>/versions',
        },
      ],
  }
  ```
