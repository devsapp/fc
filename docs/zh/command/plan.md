---
title: Plan 命令
description: 'Plan 命令'
position: 4
category: '构建&部署'
---

# Plan 命令

`plan` 命令是对函数计算资源变更感知的命令。

- [命令解析](#命令解析)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [权限与策略说明](#权限与策略说明)

## 命令解析

当执行命令`plan -h`/`plan --help`时，可以获取帮助文档。

### 参数解析

| 参数全称   | 参数缩写 | Yaml模式下必填 | 参数含义                                                     |
| ---------- | -------- | -------------- | ------------------------------------------------------------ |
| plan-type | - | 必填 | 查看部署或者删除的变更，默认是查看部署 |
| sub-command | - | 选填 | 查看哪些资源的变更。如果 plan-type 是 deploy 那么可选参数有 service/function/trigger/domain；如果 plan-type 是 remove 那么可选参数有 service/function/trigger/domain/version/alias/provision/ondemand/onDemand/layer |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s plan`进行资源变更感知，效果如下：

<img src="https://img.alicdn.com/imgextra/i2/O1CN017bjBoD1WlGpbZonjX_!!6000000002828-2-tps-1700-622.png"/>

> ~: 配置被修改
> -: 删除配置
> +: 添加配置

从图可以看出执行 deploy 之后预期：
1. function 的 description 由 'This is default function description by fc-deploy component' 变更为 'test update'
2. function 的 memorySize 由 256 变更为 512
3. 删除了 function environmentVariables 的 TESSDATA_PREFIX 配置
4. function environmentVariables 新增 test_add

## 权限与策略说明

使用该命令时，推荐配置系统策略：`AliyunFCReadOnlyAccess`
