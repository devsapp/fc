# Info 命令

`info` 命令是查看函数线上资源详情的命令。

- [命令解析](#命令解析)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [权限与策略说明](#权限与策略说明)

## 命令解析

当执行命令`info -h`/`info --help`命令时，可以获取帮助文档：

```shell script
Info

  Query online resource details 

Usage

  s info <options>  
                    
Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/info.md

Options

  --region [string]               [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [string]         [C-Required] Specify the fc service name  
  --function-name [string]        [Optional] Specify the fc function name   
  --trigger-name [string]         [Optional] Specify the fc trigger name   

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

  $ s info               

Examples with CLI

  $ s cli fc info --region region --service-name serviceName --access accessName                                                                    
  $ s cli fc info --region region --service-name serviceName --function-name functionName --trigger-name triggerName  
```

### 参数解析

| 参数全称      | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region        | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name  | -        | 选填           | 必填          | 服务名                                                       |
| function-name | -        | 选填           | 选填          | 函数名                                                       |
| trigger-name | -        | 选填           | 选填          | 触发器名                                                       |
| access        | a        | 选填           | 选填          | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug         | -        | 选填           | 选填          | 打开`debug`模式，将会输出更多日志信息                        |
| help          | h        | 选填           | 选填          | 查看帮助信息                                                 |

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
