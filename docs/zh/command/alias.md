---
title: 别名 alias
description: '别名 alias'
position: 2
category: '发布&配置'
---

# Alias 命令

`alias` 命令是对函数别名操作的命令；主要包括别名的查看、发布、修改、删除等功能。

- [Alias 命令](#alias-命令)
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
    - [Publish 主版本获取逻辑](#publish-主版本获取逻辑)
  - [alias rollback 命令](#alias-rollback-命令)
    - [参数解析](#参数解析-3)
    - [操作案例](#操作案例-3)
  - [remove alias 命令](remove.md#remove-alias-命令)
  - [权限与策略说明](#权限与策略说明)

## 命令解析

当执行命令`alias -h`/`alias --help`时，可以获取帮助文档。

在该命令中，包括了四个子命令：

- [get：查看指定别名详情](#alias-get-命令)
- [list：获取别名列表](#alias-list-命令)
- [publish：发布/更新别名](#alias-publish-命令)
- [rollback：回滚别名的版本](#alias-rollback-命令)

## alias get 命令

`alias get` 命令，是获取服务指定别名详情的命令。

当执行命令`alias get -h`/`alias get --help`时，可以获取帮助文档。

### 参数解析

| 参数全称     | 参数缩写 | Yaml 模式下必填 | Cli 模式下必填 | 参数含义                                                                                                                                                                                                                                                                                                   |
| ------------ | -------- | --------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| region       | -        | 选填            | 必填           | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | -        | 选填            | 必填           | 服务名                                                                                                                                                                                                                                                                                                     |
| alias-name   | -        | 必填            | 必填           | 别名                                                                                                                                                                                                                                                                                                       |

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

| 参数全称     | 参数缩写 | Yaml 模式下必填 | Cli 模式下必填 | 参数含义                                                                                                                                                                                                                                                                                                   |
| ------------ | -------- | --------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| region       | -        | 选填            | 必填           | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | -        | 选填            | 必填           | 服务名                                                                                                                                                                                                                                                                                                     |
| table        | -        | 选填            | 选填           | 是否以表格形式输出                                                                                                                                                                                                                                                                                         |

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

| 参数全称       | 参数缩写 | Yaml 模式下必填 | Cli 模式下必填 | 参数含义                                                                                                                                                                                                                                                                                                   |
| -------------- | -------- | --------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| region         | -        | 选填            | 必填           | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name   | -        | 选填            | 必填           | 服务名                                                                                                                                                                                                                                                                                                     |
| description    | -        | 选填            | 选填           | 别名描述                                                                                                                                                                                                                                                                                                   |
| alias-name     | -        | 必填            | 必填           | 别名                                                                                                                                                                                                                                                                                                       |
| gversion       | -        | 选填            | 选填           | 灰度版本 Id。灰度版本权重填写时必填                                                                                                                                                                                                                                                                        |
| version-id     | -        | 选填            | 选填           | 版本 Id。如果指定 version-id 和 version-latest，则会出现交互选择指定哪个版本                                                                                                                                                                                                                               |
| version-latest | -        | 选填            | 选填           | 绑定当前服务最新的版本，优先级低于 version-id                                                                                                                                                                                                                                                              |
| weight         | -        | 选填            | 选填           | 灰度版本权重。灰度版本 Id 填写时必填                                                                                                                                                                                                                                                                       |
| resolve-policy | -        | 选填            | 选填           | 灰度方式。取值如下：`Random`：随机灰度，为默认值。`Content`：规则灰度。                                                                                                                                                                                                                                    |
| route-policy   | -        | 选填            | 选填           | 灰度规则。满足灰度规则条件的流量，会被路由至灰度实例。[查看更多](https://help.aliyun.com/document_detail/450937.htm)                                                                                                                                                                                       |

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

如果指定规则灰度，执行命令 `s alias publish --alias-name pre --version-id 1 --gversion 2 --route-policy '{"policyItems":[{"type":"Param","value":"2","Key":"test","operator":"="}],"condition":"AND"}'`；可以[跳转](https://www.bilibili.com/video/BV1eY4y1T7C7/?zw&vd_source=107cf8308563a4983b1feec14ab75075)更详细的学习视屏

### Publish 主版本获取逻辑

- 指定 version-id：直接使用指定的 version-id
- 未指定 version-id，但是指定了 version-latest：获取版本列表，取下标 0 的版本号（版本列表默认倒序，下标 0 就是最大的版本号）
- 未指定 version-id 和 version-latest：获取版本列表，如果仅有一个版本直接使用此版本号；如果是多个版本，那么会产生交互让用户选择

## alias rollback 命令

`alias rollback` 命令，是对指定别名的版本进行回退的命令。

当执行命令`alias rollback -h`/`alias rollback --help`时，可以获取帮助文档。

### 参数解析

| 参数全称     | 参数缩写 | Yaml 模式下必填 | Cli 模式下必填 | 参数含义                                                                                                                                                                                                                                                                                                   |
| ------------ | -------- | --------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| region       | -        | 选填            | 必填           | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | -        | 选填            | 必填           | 服务名                                                                                                                                                                                                                                                                                                     |
| description  | -        | 选填            | 选填           | 别名描述                                                                                                                                                                                                                                                                                                   |
| alias-name   | -        | 必填            | 必填           | 别名。需要是已发布的别名。                                                                                                                                                                                                                                                                                 |
| version-id   | -        | 选填            | 选填           | 版本 Id。三种形式：1. 指定 version-id; 2. 使用`HEAD^^`形式，如：`HEAD^`表示回退到上一个版本，`HEAD^^`表示回退到上上一个版本，以此类推；3. 使用`HEAD~数字`形式，如：`HEAD~1`表示回退到上一个版本，`HEAD~2`表示回退到上上一个版本                                                                            |
| gversion     | -        | 选填            | 选填           | 灰度版本 Id。灰度版本权重填写时必填                                                                                                                                                                                                                                                                        |
| weight       | -        | 选填            | 选填           | 灰度版本权重。灰度版本 Id 填写时必填                                                                                                                                                                                                                                                                       |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s alias rollback`进行指定别名的版本回退；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，例如` s cli fc alias rollback --region cn-hangzhou --service-name fc-deploy-service --alias-name pre --version-id 1`；

1. 执行`s version list`查看版本列表：

```text
  -
    versionId:        6
    description:
    createdTime:      2022-07-02T01:53:02Z
    lastModifiedTime: 2022-07-02T01:53:02Z
  -
    versionId:        4
    description:
    createdTime:      2022-06-27T12:30:35Z
    lastModifiedTime: 2022-06-27T12:30:35Z
  -
    versionId:        3
    description:
    createdTime:      2022-06-27T11:41:50Z
    lastModifiedTime: 2022-06-27T11:41:50Z
  -
    versionId:        1
    description:
    createdTime:      2022-06-25T04:09:04Z
    lastModifiedTime: 2022-06-25T04:09:04Z
```

2. 执行`s alias list`查看别名列表：

```text
  -
    aliasName:               test1
    versionId:               6
    description:
    additionalVersionWeight:
    createdTime:             2022-06-25T04:10:26Z
    lastModifiedTime:        2022-07-02T08:38:22Z
```

3. 执行`s alias rollback --alias-name test1 --version-id HEAD^^`，将 test1 回退到上上个版本，查看别名 test1 的详情：

```text
  aliasName:               test1
  versionId:               3
  description:
  additionalVersionWeight:
  createdTime:             2022-06-25T04:10:26Z
  lastModifiedTime:        2022-07-02T08:47:46Z
```

## 权限与策略说明

- `alias list` 与 `alias get` 命令所需要的权限策略： `AliyunFCReadOnlyAccess`

- `alias publish` 命令所需要的权限策略：

  ```yaml
  {
    'Version': '1',
    'Statement':
      [
        {
          'Action': ['fc:CreateAlias', 'fc:UpdateAlias'],
          'Effect': 'Allow',
          'Resource': 'acs:fc:<region>:<account-id>:services/<serviceName>/aliases/*',
        },
      ],
  }
  ```
