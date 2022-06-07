---
title: 日志查询 logs
description: '日志查询 logs'
position: 2
category: '可观测性'
---
# Logs 命令

`logs` 命令是查看函数日志的命令。

- [命令解析](#命令解析)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [权限与策略说明](#权限与策略说明)

> ⚠️ 注意：在使用该功能之前，需要先开通 SLS 日志服务，并且[函数本身已经配置了相关的日志项目](../yaml/service.md#logconfig)。


## 命令解析

当执行命令`logs -h`/`logs --help`时，可以获取帮助文档。

### 参数解析

| 参数全称      | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region        | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name  | -        | 选填           | 必填          | 服务名                                                       |
| function-name | -        | 选填           | 必填          | 函数名                                                       |
| request-id     | -    | 选填      | 选填     |  某次请求的Id     |
| start-time    | s        | 选填           | 选填          | 查询的时间点起点，UTC时间或者时间戳，例如`2021-06-07T02:54:59+08:00`，`1611827290000` |
| end-time      | e        | 选填           | 选填          | 查询的时间点终点，UTC时间或者时间戳，例如`2021-06-07T02:54:59+08:00`，`1611827290000` |
| tail          | -        | 选填           | 选填          | 以`tail`模式进行日志输出                                     |
| type          | -        | 选填           | 选填          | 查询的日志类型，成功或者失败,取值范围：`success, fail`         |
| instance-id          | -        | 选填           | 选填          | 根据 instance-id 过滤         |
| qualifier          | -        | 选填           | 选填          | 查询指定版本或者别名         |
| match          | -        | 选填           | 选填          | 匹配到的字符高亮         |


> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s logs`进行线上函数的日志查询；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，函数名等，例如`s cli fc logs --region cn-hangzhou --service-name fc-deploy-service --function-name http-trigger-py36`

上述命令的执行结果示例：

```
FunctionCompute python3 runtime inited.

FC Invoke Start RequestId: 84d6ae81-02ff-4011-b3ca-45e65b210cc3
FC Invoke End RequestId: 84d6ae81-02ff-4011-b3ca-45e65b210cc3

FC Invoke Start RequestId: de4812be-9137-4a33-9869-370cb61ac427
FC Invoke End RequestId: de4812be-9137-4a33-9869-370cb61ac427
```

如果需要以`tail`模式进行日志的查询，可以增加`--tail`参数，例如`s logs --tail`；

查询指定时间段的日志，可以通过增加`--start-time`和`--end-time`参数实现，例如`s logs -s 2021-11-04T15:40:00 -e 2021-11-04T15:45:00`；

## 权限与策略说明

- 最大权限：`AliyunFCReadOnlyAccess`、`AliyunLogReadOnlyAccess`

- 最小权限：`AliyunFCReadOnlyAccess` 与相关接口权限：

  ```yaml
  {
      "Version": "1",
      "Statement": [
          {
              "Action": "log:GetLogStoreLogs",
              "Effect": "Allow",
              "Resource": "acs:log:<region>:<account-id>:project/<project>/logstore/<logstore>"
          }
      ]
  }
  ```
