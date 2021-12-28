# Sync 命令

`sync` 命令是将线上的资源同步到本地的命令。

- [命令解析](#命令解析)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [权限与策略说明](#权限与策略说明)

## 命令解析

当执行命令`sync -h`/`sync --help`时，可以获取帮助文档：

```shell script
Sync

  Synchronize online resources to offline resources 

Usage

  s sync <options>  

Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/sync.md                  

Options
 
  --region [string]               [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1  
  --service-name [string]         [C-Required] Specify the fc service name  
  --function-name [string]        [Optional] Specify the fc function name   
  --trigger-name [string]         [Optional] Specify the fc trigger name, multiple triggers can be specified using [--trigger-name name1 --trigger-name name2]                                                        
  --target-dir [string]           [Optional] Specify storage directory, default: current dir                                
  --type [code/config]            [Optional] Operation type, value: code/config
  -f, --force                     [Optional] Mandatory overwrite code file                                  

Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [string]   [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations            

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/docs/docs/zh/yaml_and_cli.md

Examples with Yaml

  $ s sync                                                                                  

Examples with CLI

  $ s cli fc sync --region cn-shanghai --service-name serviceName --type config 
```

### 参数解析

| 参数全称      | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region        | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name  | -        | 选填           | 必填          | 服务名                                                       |
| function-name | -        | 选填           | 选填          | 函数名                                                       |
| trigger-name  | -        | 选填           | 选填          | 触发器名                                                     |
| target-dir    | -        | 选填           | 选填          | 目标路径                                                     |
| type          | -        | 选填           | 选填          | 类型，包括同步代码和配置，默认是全部同步，可选`code`/`config` |
| access        | a        | 选填           | 选填          | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug         | -        | 选填           | 选填          | 打开`debug`模式，将会输出更多日志信息                        |
| help          | h        | 选填           | 选填          | 查看帮助信息                                                 |

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
