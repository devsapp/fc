# Metrics 命令

`metrics` 命令是查看函数指标信息的命令。

- [命令解析](#命令解析)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [权限与策略说明](#权限与策略说明)

## 命令解析

当执行命令`metrics -h`/`metrics --help`时，可以获取帮助文档：

```shell script
Metrics

  Query function metrics information 

Usage

  s metrics <options>  
                       
Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/metrics.md                

Options
               
  --region [string]              [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1  
  --service-name [string]        [C-Required] Specify the fc service name  
  --function-name [string]       [C-Required] Specify the fc function name                                          

Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [string]      [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations       

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/docs/docs/zh/yaml_and_cli.md

Examples with Yaml

  $ s metrics                                                          

Examples with CLI

  $ s cli fc metrics --region cn-hangzhou --service-name myService --function-name myFunction 
```

### 参数解析

| 参数全称      | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region        | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name  | -        | 选填           | 必填          | 服务名                                                       |
| function-name | -        | 选填           | 必填          | 函数名                                                       |
| access        | a        | 选填           | 选填          | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug         | -        | 选填           | 选填          | 打开`debug`模式，将会输出更多日志信息                        |
| help          | h        | 选填           | 选填          | 查看帮助信息                                                 |

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s metrics`查看函数的指标信息；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，函数名等，例如`s cli fc metrics --region ch-hangzhou --service-name myService --function-name myFunction`；

上述命令的执行结果示例：

```text
[2021-06-07T12:20:06.661] [INFO ] [FC-METRICS] - Please open with browser: http://localhost:3000
```

 此时，通过浏览器打开地址，可以看到函数指标信息：

![image](https://user-images.githubusercontent.com/21079031/120958920-419b2400-c78b-11eb-9f3c-8b49c1354a37.png)

**需要开启请求级别指标，才能查看函数指标信息，否则图表不展示数据**
**如何开通请求级别指标:** 
**1.https://fcnext.console.aliyun.com/**
**2.服务及函数中-找到自己region-对应的服务名称-在操作栏点击配置开启请求级别指标**

## 权限与策略说明

所需权限：`AliyunLogFullAccess`、`AliyunCloudMonitorReadOnlyAccess`、`AliyunFCReadOnlyAccess`
