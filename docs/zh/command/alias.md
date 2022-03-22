---
title: 别名 alias
description: '别名 alias'
position: 2
category: '发布&配置'
---

# Alias 命令

`alias` 命令是对函数别名操作的命令；主要包括别名的查看、发布、修改、删除等功能。

- [命令解析](#命令解析)
- [alias get 命令](#alias-get-命令)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [alias list 命令](#alias-list-命令)
  - [参数解析](#参数解析-1)
  - [操作案例](#操作案例-1)
- [alias publish 命令](#alias-publish-命令)
  - [参数解析](#参数解析-2)
  - [操作案例](#操作案例-2)
  - [Publish 主版本获取逻辑](#Publish-主版本获取逻辑)
- [remove alias 命令](remove.md#remove-alias-命令)
- [权限与策略说明](#权限与策略说明)

## 命令解析

当执行命令`alias -h`/`alias --help`时，可以获取帮助文档。

在该命令中，包括了三个子命令：

- [get：查看指定别名详情](#alias-get-命令)
- [list：获取别名列表](#alias-list-命令)
- [publish：发布/更新别名](#alias-publish-命令)

## alias get 命令

`alias get` 命令，是获取服务指定别名详情的命令。

当执行命令`alias get -h`/`alias get --help`时，可以获取帮助文档。

### 参数解析

| 参数全称     | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------ | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region       | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | -        | 选填           | 必填          | 服务名                                                       |
| alias-name   | -        | 必填           | 必填          | 别名                                                         |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s alias get --alias-name aliasName`进行指定的别名详情获取；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，例如`s cli fc alias get --region cn-hangzhou --service-name fc-deploy-service --alias-name pre`；

上述命令的执行结果示例：

```text
fc-deploy-test: 
  aliasName:               pre
  versionId:               1
  description:             test publish version
  additionalVersionWeight: 
  createdTime:             2021-11-08T06:51:36Z
  lastModifiedTime:        2021-11-08T06:54:02Z
```

## alias list 命令

`alias list` 命令，是进列举别名列表的命令。

当执行命令`alias list -h`/`alias list --help`时，可以获取帮助文档。

### 参数解析

| 参数全称     | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------ | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region       | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | -        | 选填           | 必填          | 服务名                                                       |
| table        | -        | 选填           | 选填          | 是否以表格形式输出                                           |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s alias list`获取别名列表；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，例如`s cli fc alias list --region cn-hangzhou --service-name fc-deploy-service`

上述命令的执行结果示例：

```text
fc-deploy-test: 
  - 
    aliasName:               pre
    versionId:               1
    description:             test publish version
    additionalVersionWeight: 
    createdTime:             2021-11-08T06:51:36Z
    lastModifiedTime:        2021-11-08T06:54:02Z
```

如果指定了`--table`参数，输出示例：

```text
  ┌───────────┬───────────┬──────────────────────┬──────────────────────┬──────────────────────┬─────────────────────────┐
  │ aliasName │ versionId │     description      │     createdTime      │   lastModifiedTime   │ additionalVersionWeight │
  ├───────────┼───────────┼──────────────────────┼──────────────────────┼──────────────────────┼─────────────────────────┤
  │ pre       │ 1         │ test publish version │ 2021-11-08T06:51:36Z │ 2021-11-08T06:54:02Z │                         │
  └───────────┴───────────┴──────────────────────┴──────────────────────┴──────────────────────┴─────────────────────────┘
```

## alias publish 命令

`alias publish` 命令，是对别名进行发布和更新的命令。

当执行命令`alias publish -h`/`alias publish --help`时，可以获取帮助文档。

### 参数解析

| 参数全称     | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------ | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region       | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | -        | 选填           | 必填          | 服务名                                                       |
| description  | -        | 选填           | 选填          | 别名描述                                                     |
| alias-name   | -        | 必填           | 必填          | 别名                                                         |
| gversion     | -        | 选填           | 选填          | 灰度版本Id。灰度版本权重填写时必填|
| version-id   | -        | 选填           | 选填          | 版本Id。如果指定 version-id 和 version-latest，则会出现交互选择指定哪个版本 |
| version-latest | -      | 选填           | 选填          | 绑定当前服务最新的版本，优先级低于 version-id |
| weight       | -        | 选填           | 选填          | 灰度版本权重。灰度版本Id填写时必填 |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s alias publish`进行版本的发布或者更新；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，例如` s cli fc alias publish --region cn-hangzhou --service-name fc-deploy-service --alias-name pre --version-id 1`；

上述命令的执行结果示例：

```text
fc-deploy-test: 
  aliasName:               pre
  versionId:               1
  description:             
  additionalVersionWeight: 
  createdTime:             2021-11-08T06:51:36Z
  lastModifiedTime:        2021-11-08T06:51:36Z
```

如果需要对别名进行升级，只需要指定别名之后，进行相对应的参数更新，例如针对上述的`pre`别名，指定`--description`参数后再次执行上述命令，执行示例：

```text
fc-deploy-test: 
  aliasName:               pre
  versionId:               1
  description:             test publish version
  additionalVersionWeight: 
  createdTime:             2021-11-08T06:51:36Z
  lastModifiedTime:        2021-11-08T06:54:02Z
```

### Publish 主版本获取逻辑

- 指定 version-id：直接使用指定的 version-id
- 未指定 version-id，但是指定了 version-latest：获取版本列表，取下标0的版本号（版本列表默认倒序，下标0就是最大的版本号）
- 未指定 version-id 和 version-latest：获取版本列表，如果仅有一个版本直接使用此版本号；如果是多个版本，那么会产生交互让用户选择

## 权限与策略说明

- `alias list` 与 `alias get` 命令所需要的权限策略： `AliyunFCReadOnlyAccess`

- `alias publish` 命令所需要的权限策略：

  ```yaml
  {
      "Version": "1",
      "Statement": [
          {
              "Action": [
                  "fc:CreateAlias",
                  "fc:UpdateAlias"
              ],
              "Effect": "Allow",
              "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>/aliases/*"
          }
      ]
  }
  ```
