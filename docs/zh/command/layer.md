---
title: 层 layer
description: '层 layer'
position: 5
category: '发布&配置'
---

# Layer 命令

`layer` 命令是进行层操作的命令。

- [命令解析](#命令解析)
- [layer publish 命令](#layer-publish-命令)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [layer list 命令](#layer-list-命令)
  - [参数解析](#参数解析-1)
  - [操作案例](#操作案例-1)
- [layer detail 命令](#layer-detail-命令)
  - [参数解析](#参数解析-2)
  - [操作案例](#操作案例-2)
- [layer versions 命令](#layer-versions-命令)
  - [参数解析](#参数解析-3)
  - [操作案例](#操作案例-3)
- [layer download 命令](#layer-download-命令)
  - [参数解析](#参数解析-4)
  - [操作案例](#操作案例-4)
- [layer acl 命令【公测】](#layer-acl-命令)
  - [参数解析](#参数解析-5)
  - [操作案例](#操作案例-5)
- [remove layer 命令](remove.md#remove-layer-命令)
- [权限与策略说明](#权限与策略说明)

## 命令解析

当执行命令`layer -h`/`layer --help`时，可以获取帮助文档。

在该命令中，包括了四个子命令：

- [publish：发布层](#layer-publish-命令)
- [list：获取层列表](#layer-list-命令)
- [detail：获取层详情](#layer-detail-命令)
- [versions：获取层版本](#layer-versions-命令)

## layer publish 命令

`layer publish` 命令，是用于层发布的命令。

当执行命令`layer publish -h`/`layer publish --help`时，可以获取帮助文档。

### 参数解析

| 参数全称           | 参数缩写 | Yaml 模式下必填 | Cli 模式下必填 | 参数含义                                                                                                                                                                                                                                                                                                   |
| ------------------ | -------- | --------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| region             | -        | 选填            | 必填           | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| code               | -        | 必填            | 必填           | 层的代码                                                                                                                                                                                                                                                                                                   |
| compatible-runtime | -        | 选填            | 选填           | 支持的`runtime`，取值范围`nodejs14,nodejs12,nodejs10,nodejs8,nodejs6,nodejs4.4,python3.9,python3,python2.7,java11,java8,go1,php7.2,dotnetcore2.1,custom7`                                                                                                                                                                                                                             |
| description        |          | 选填            | 选填           | 发布层的描述                                                                                                                                                                                                                                                                                               |
| layer-name         |          | 必填            | 必填           | 层的名字                                                                                                                                                                                                                                                                                                   |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s layer publish`进行层的发布，例如` s layer publish --layer-name demo --code ./code`；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区，例如`s cli fc layer publish --region cn-hangzhou --layer-name demo --code ./code` ；

Python 项目的依赖库需要放在`./code/python`路径下，比如`./code/python/flask`。

上述命令的执行结果示例：

```text
fc-deploy-test: 544c887879c38e5d0afcaf8b4f8f348e#demo#1
```

## layer list 命令

`layer list` 命令，是用于获取层列表的命令。

当执行命令`layer list -h`/`layer list --help`时，可以获取帮助文档。

### 参数解析

| 参数全称 | 参数缩写 | Yaml 模式下必填 | Cli 模式下必填 | 参数含义                                                                                                                                                                                                                                                                                                   |
| -------- | -------- | --------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| region   | -        | 选填            | 必填           | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| prefix   | -        | 选填            | 选填           |                                                                         层名称的前缀。限定返回的资源名称，假设Prefix为a，则返回的资源名必须以a开头。       |
| public   | -        | 选填            | 选填           |                                                                       展示个人的公共层         |
| official   | -        | 选填            | 选填           |                                                                        展示官方的公共层。设置official=true后，public自动设为true，设置为false无效。        |
| table    | -        | 选填            | 选填           |                                                                                                                                                                                                                                                                                                            |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s layer list`获取层列表；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区，例如`s cli fc layer list --region cn-hangzhou`；

上述命令的执行结果示例：

```text
fc-deploy-test:
  -
    layerName:         demo
    arn:               544c887879c38e5d0afcaf8b4f8f348e#demo#1
    version:           1
    description:
    compatibleRuntime:
      - nodejs12
      - nodejs10
      - nodejs8
      - nodejs6
      - python3
      - python2.7
```

## layer detail 命令

`layer detail` 命令，是用户获取指定层和版本详情的命令。

当执行命令`layer detail -h`/`layer detail --help`时，可以获取帮助文档。

### 参数解析

| 参数全称   | 参数缩写 | Yaml 模式下必填 | Cli 模式下必填 | 参数含义                                                                                                                                                                                                                                                                                                   |
| ---------- | -------- | --------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| region     | -        | 选填            | 必填           | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| layer-name | -        | 必填            | 必填           | 层名称                                                                                                                                                                                                                                                                                                     |
| version-id | -        | 必填            | 必填           | 层版本                                                                                                                                                                                                                                                                                                     |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s layer detail --layer-name layerName --version-id versionId`获取指定层和指定版本详情；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区，例如`s cli fc layer detail --region cn-hangzhou --layer-name demo --version-id 1`；

上述命令的执行结果示例：

```text
fc-deploy-test:
  layerName:         demo
  version:           1
  description:
  code:
    repositoryType: null
    location:       https://fc-hz-yunqi-func-code.oss-cn-hangzhou-internal.aliyuncs.com/1583208943291465%2Fdemo%2Fdecddf35-8705-4f80-9baa-2c4a9ffc512b?Expires=1636621101&OSSAccessKeyId=&Signature=cZZHNSpeewLXVoFd2%2FdFuLBe4cc%3D
  codesize:          550
  codeChecksum:      17221560529872498506
  createTime:        2021-11-11T08:46:38Z
  acl:               0
  compatibleRuntime:
    - nodejs12
    - nodejs10
    - nodejs8
    - nodejs6
    - python3
    - python2.7
  arn:               544c887879c38e5d0afcaf8b4f8f348e#demo#1
```

## layer versions 命令

`layer versions` 命令，是获取指定层版本列表的命令。

当执行命令`layer version -h`/`layer versions --help`时，可以获取帮助文档。

### 参数解析

| 参数全称   | 参数缩写 | Yaml 模式下必填 | Cli 模式下必填 | 参数含义                                                                                                                                                                                                                                                                                                   |
| ---------- | -------- | --------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| region     | -        | 选填            | 必填           | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| layer-name | -        | 必填            | 必填           | 层名称                                                                                                                                                                                                                                                                                                     |
| table      | -        | 选填            | 必填           | 是否以表格形式输出                                                                                                                                                                                                                                                                                         |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s layer versions --layer-name layerName`获取指定层中的版本列表；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区，例如`s cli fc layer versions --layer-name layerName --region cn-hangzhou`；

上述命令的执行结果示例：

```text
fc-deploy-test:
  -
    layerName:         demo
    arn:               544c887879c38e5d0afcaf8b4f8f348e#demo#1
    version:           1
    description:
    compatibleRuntime:
      - nodejs12
      - nodejs10
      - nodejs8
      - nodejs6
      - python3
      - python2.7
```

## layer download 命令

`layer download` 命令，是用户下载指定层版本的命令。

当执行命令`layer download -h`/`layer download --help`时，可以获取帮助文档。

### 参数解析

| 参数全称   | 参数缩写 | Yaml 模式下必填 | Cli 模式下必填 | 参数含义                                                                                                                                                                                                                                                                                                   |
| ---------- | -------- | --------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| region     | -        | 选填            | 必填           | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| layer-name | -        | 选填            | 选填           | 层名称，当 arn 为空时必填                                                                                                                                                                                                                                                                                                     |
| version-id | -        | 选填            | 选填           | 层版本，当 arn 为空时必填                                                                                                                                                                                                                                                                                                     |
| version-id | -        | 选填            | 选填           |  层 Arn |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s layer download --layer-name layerName --version-id versionId`下载层版本的代码包；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区，例如`s cli fc layer download --region cn-hangzhuo --layer-name demo --version-id 1`；

上述命令的执行结果示例：

```text
✔ Downloading: [/189******629/test/7d954393-c5a2-4519-94de-d1a4c9e0611f] 144073/144073 100.00% # 下载的进度条
helloworld: /Users/test/.s/cache/layers/189******629-cn-shenzhen-test/8.zip  # 代码包下载的地址
```

## layer acl 命令

`layer acl` 命令，个人层设置公开。

> 说明：如果函数配置其他账户的公共层时，需要使用 arnV2 版本。

当执行命令`layer acl -h`/`layer acl --help`时，可以获取帮助文档。

### 参数解析

| 参数全称   | 参数缩写 | Yaml 模式下必填 | Cli 模式下必填 | 参数含义                                                                                                                                                                                                                                                                                                   |
| ---------- | -------- | --------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| region     | -        | 选填            | 必填           | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| layer-name | -        | 必填            | 必填           | 层名称 |
| public | -        | 选填            | 选填           | 个人层设置公开 |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s layer acl --layer-name layerName --public`设置层公开，或者执行`s layer acl --layer-name layerName --public false` 设置层不公开；

- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区，例如`s cli fc layer acl --region cn-hangzhuo --layer-name demo`；


## 权限与策略说明

- `layer list`、`layer version`与`layer detail` 命令所需要的权限策略： `AliyunFCReadOnlyAccess`

- `layer publish` 命令所需要的权限策略：

  ```yaml
  {
    'Version': '1',
    'Statement':
      [
        {
          'Action': 'fc:CreateLayerVersion',
          'Effect': 'Allow',
          'Resource': 'acs:fc:<region>:<account-id>:layers/<layerName>/versions/*',
        },
      ],
  }
  ```
