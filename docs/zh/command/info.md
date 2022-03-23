---
title: 查看函数 info
description: '查看函数 info'
position: 3
category: '其他功能'
---

# Info 命令

`info` 命令是查看函数线上资源详情的命令。

- [命令解析](#命令解析)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [权限与策略说明](#权限与策略说明)

## 命令解析

当执行命令`info -h`/`info --help`命令时，可以获取帮助文档。

### 参数解析

| 参数全称      | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region        | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name  | -        | 选填           | 必填          | 服务名                                                       |
| function-name | -        | 选填           | 选填          | 函数名                                                       |
| trigger-name | -        | 选填           | 选填          | 触发器名                                                       |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s info`获取函数详情；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要根据需求，指定服务名，函数名等信息，例如`s cli fc info --region cn-hangzhou --service-name fc-deploy-service --function-name http-trigger-py36`；

上述命令的执行结果示例：

```text
fc-deploy-test:
    region: cn-hangzhou
    service:
      name: fc-deploy-service
      internetAccess: true
      role: acs:ram::1583208943291465:role/aliyunfcdefaultrole
      description: demo for fc-deploy component
      logConfig:
        logstore: fc-service-fc-deploy-service-logstore
        project: 1583208943291465-cn-hangzhou-logproject
    function:
      name: http-trigger-py36
      runtime: python3
      handler: index.handler
      timeout: 60
      instanceType: e1
      memorySize: 128
      description: this is a test
      initializationTimeout: 3
      instanceConcurrency: 1
      environmentVariables: {}
    triggers:
      - name: httpTrigger
        type: http
        config:
          qualifier: null
          authType: anonymous
          methods:
            - GET
```

如果需要只查询服务详情，只需要指定`--service-name`即可，例如执行命令`s cli fc info --region cn-hangzhou --service-name fc-deploy-service`的示例输出为：

```
region: cn-hangzhou
service:
  name: fc-deploy-service
  internetAccess: true
  role: acs:ram::1583208943291465:role/aliyunfcdefaultrole
  description: demo for fc-deploy component
  logConfig:
    logstore: fc-service-fc-deploy-service-logstore
    project: 1583208943291465-cn-hangzhou-logproject
```

## 权限与策略说明

使用该命令时，推荐配置系统策略：`AliyunFCReadOnlyAccess`
