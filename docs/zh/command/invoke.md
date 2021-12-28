# Invoke 命令

`invoke` 命令是对线上函数进行调用/触发的命令。

- [命令解析](#命令解析)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
  - [注意事项](#注意事项)
- [权限与策略说明](#权限与策略说明)

## 命令解析

当执行命令`invoke -h`/`invoke --help`命令时，可以获取帮助文档：

```shell script
Invoke

  Invoke/trigger online functions 

Usage

  s invoke <options>  
                                          
Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/invoke.md

Options

  --region [string]               [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [string]         [C-Required] Specify the fc service name  
  --function-name [string]        [Optional] Specify the fc function name   
  --timeout [number]              [Optional] Configure client timeout
  -e, --event [string]            [Optional] Event data passed to the function during invocation (default: "")                                                         
  -f, --event-file [string]       [Optional] Event funtion: A file containing event data passed to the function during invoke                                                                 
  -s, --event-stdin [string]      [Optional] Read from standard input, to support script pipeline                                                      
  --invocation-type [async/sync]  [Optional] Invocation type, value: async/sync, default: sync                                                                                                
  --stateful-async-invocation-id  [Optional] Stateful asynchronous invocation, only takes effect when --invocation-type=async                           

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

Event Format
  
  Quickly obtain the data structures of different events through the command [s cli fc-event -h]

Examples with Yaml

  $ s invoke               

Examples with CLI

  $ s cli fc invoke --region cn-hangzhou --service-name serviceName --function-name functionName --event evnetString                              
```

### 参数解析

| 参数全称        | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| --------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region          | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name    | -        | 选填           | 必填          | 服务名                                                       |
| function-name   | -        | 选填           | 必填          | 函数名                                                       |
| timeout           | -      | 选填           | 选填          | 客户端调用时间 [时间设置原理](https://github.com/devsapp/fc/issues/480) |
| event           | e        | 选填           | 选填          | 事件                                                         |
| event-file      | f        | 选填           | 选填          | 事件文件                                                     |
| event-stdin     | s        | 选填           | 选填          | 事件输入                                                     |
| invocation-type | -        | 选填           | 选填          | 调用类型，取值范围：`async, sync`，默认：`sync`              |
| stateful-async-invocation-id | -        | 选填           | 选填          | 有状态的异步调用     |
| access          | a        | 选填           | 选填          | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug           | -        | 选填           | 选填          | 打开`debug`模式，将会输出更多日志信息                        |
| help            | h        | 选填           | 选填          | 查看帮助信息                                                 |

### 操作案例


- **有资源描述文件（Yaml）时**，可以直接执行`s invoke`进行线上函数的调用；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，函数名等，例如`s invoke --region cn-hangzhou --service-name fc-deploy-service --function-name http-trigger-py36`

上述命令的执行结果示例：

```text
Request url: https://1583208943291465.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/fc-deploy-service/http-trigger-py36/
========= FC invoke Logs begin =========
FC Invoke Start RequestId: 68f15da2-a453-4f7e-90d3-91198b76afbf
FC Invoke End RequestId: 68f15da2-a453-4f7e-90d3-91198b76afbf

Duration: 2.96 ms, Billed Duration: 3 ms, Memory Size: 128 MB, Max Memory Used: 10.83 MB
========= FC invoke Logs end =========

FC Invoke Result[code: ${resp.code}]:
Hello world!
```

### 注意事项

在进行调用时，如果需要指定相对应的事件，例如oss的事件，cdn的事件......这些事件的格式，可以通过命令`s cli fc-event`获取：

| 方法 | 方法说明 | 入参示例 | 命令行调用示例 |
| ---- | -------- | ------- |------ |
| http | HTTP 触发器事件  |  | s cli fc-event http  |
| cdn | CDN 触发器事件  |  | s cli fc-event cdn     |
| mns | MNS 触发器事件  |  | s cli fc-event mns     |
| oss | OSS 触发器事件  |  | s cli fc-event oss     |
| sls | SLS 触发器事件  |  | s cli fc-event sls     |
| tablestore | TableStore 触发器事件  |  | s cli fc-event tablestore     |

例如：如果使用oss的事件，进行测试，此时可以执行：`s cli fc-event oss`，完成之后，可以看到系统提醒的相对路径信息：

```
OSS event template created successfully.

👓 Event Template Path: event-template/oss-event.json

You could user fc/fc-api component invoke method and specify the event.
E.g: [s projectName invoke --event-file  event-template/oss-event.json]

More information about OSS Trigger: 
📝 https://help.aliyun.com/document_detail/74763.htm
```

此时，可以利用该路径的模板（可以额外进行修改）触发函数，例如：`s invoke --event-file event-template/oss-event.json`


## 权限与策略说明

- 最大权限: `AliyunFCInvocationAccess` 或者 `AliyunFCFullAccess`

- 最小权限: 

  ```yaml
  {
      "Version": "1",
      "Statement": [
          {
              "Action": "fc:InvokeFunction",
              "Effect": "Allow",
              "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>.<qualifier>/functions/<functionName>"
          }
      ]
  }
  ```
