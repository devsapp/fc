---
title: 资源同步 sync
description: '资源同步 sync'
position: 4
category: '其他功能'
---

# Sync 命令

`sync` 命令是将线上的资源同步到本地的命令。

- [命令解析](#命令解析)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [权限与策略说明](#权限与策略说明)

## 命令解析

当执行命令`sync -h`/`sync --help`时，可以获取帮助文档。

### 参数解析

| 参数全称      | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region        | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name  | -        | 选填           | 必填          | 服务名                                                       |
| function-name | -        | 选填           | 选填          | 函数名                                                       |
| trigger-name  | -        | 选填           | 选填          | 触发器名                                                     |
| target-dir    | -        | 选填           | 选填          | 目标路径                                                     |
| qualifier    | -        | 选填           | 选填          | 版本或者别名                                                   |
| type          | -        | 选填           | 选填          | 类型，包括同步代码和配置，默认是全部同步，可选`code`/`config` |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s sync`将线上资源同步到本地；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要按需指定服务名、函数名等，例如`s cli fc sync --region cn-hanghzou --service-name fc-deploy-service --function-name http-trigger-py36`；

上述命令的执行结果示例：

```text
fc-deploy-test: 
  codeFiles:  
  	http-trigger-py36: /Users/jiangyu/demo/test/start-fc-http-python3/1583208943291465_cn-hangzhou_fc-deploy_service_http-trigger-py36
  configYmlPath: /Users/jiangyu/demo/test/start-fc-http-python3/s.cn-hangzhou-fc-deploy-service.sync.yaml
```

## 权限与策略说明

使用该命令时，推荐配置系统策略：`AliyunFCReadOnlyAccess`
