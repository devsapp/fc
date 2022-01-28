# Stress 命令

`stress` 命令是对函数进行压测的命令。

- [命令解析](#命令解析)
- [相关原理](#相关原理)
- [stress start 命令](#stress-start-命令)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [stress clean 命令](#stress-clean-命令)
  - [参数解析](#参数解析-1)
  - [操作案例](#操作案例-1)
- [权限与策略说明](#权限与策略说明)


## 相关原理

`stress `命令的原理是通过创建辅助函数，对目标函数进行压测，架构简图如下所示：

![](https://img.alicdn.com/imgextra/i1/O1CN017QO1In1lNearCqdo1_!!6000000004807-2-tps-669-460.png)

1. `stress start` 指令会根据 FC 组件内置配置，创建辅助函数（辅助函数的服务名和函数名均为： `_DEFAULT_FC_STRESS_COMPONENT_SERVICE`）

2. 辅助函数创建完成后，辅助函数被调用后就会基于 [Python Locust](https://docs.locust.io/en/stable/) 对目标函数发起压测试
>  Locust 需要的压测参数通过调用辅助函数时的 Payload  传递

3. 完成测试之后，将压测结果返回给本地客户端

4. 本地客户端收到结果后，会展示压测结果， 并生成 html 报告文件


## 命令解析

当执行命令`stress -h`/`stress --help`时，可以获取帮助文档：

```shell script
Stress

  Stress test for the serverless application 

Usage

  s stress <sub-command> <options>

Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/stress.md

SubCommand List

  start   Start stress test; help command [s stress start -h]         
  clean   Clean the relevant resources; help command [s stress clean -h]               
```


在该命令中，包括了两个子命令：

- [start：开始进行一键压测](#stress-start-命令)
- [clean：清理压测时创建的资源](#stress-clean-命令)

## stress start 命令

`stress start`: 对部署在函数计算上的函数进行压测的命令。

当执行命令`stress start -h`/`stress start --help`时，可以获取帮助文档：

```shell script
Stress start

  Start stress test 

Usage

  s stress start <options>
                               
Options

  --region [string]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [string]             [C-Required] Specify the fc service name  
  --function-name [string]            [C-Required] Specify the fc function name
  --function-type [http/event]        [C-Required] Type of the target function, value: http/event              
  --method [string]                   [Optional] Target method, only for --function-type http                                  
  --payload [string]                  [Optional] Represents the event/request_body passed to the function    
  --payload-file [string]             [Optional] Contains the event passed to the function    
  --num-user [number]                 [Optional] Number of the simulated users                                                 
  -q, --qualifier [string]            [Optional] Qualifier of the target function, only for event function                                                 
  --run-time [number]                 [Optional] Intervals for stress                                                                                                  
  --spawn-rate [number]               [Optional] Increasing number of users per second                                         
  -u, --url [string]                  [Optional] Target url

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

  $ s stress start --payload-file ./payload.file                                                                                                       
  $ s stress start --num-user 6 --spawn-rate 10 --run-time 30 --url myUrl --method post --payload "hello world"                                                                                   

Examples with CLI

  $ s cli fc stress start --num-user 6 --spawn-rate 10 --run-time 30 --function-type event --service-name serviceName --function-name functionName --qualifier LATEST --payload "hello world" --region cn-hangzhou                                                                    
```

### 参数解析

| 参数全称      | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region        | -        | 选填           | 必填          | 被压测的函数所处的地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name  | -        | 选填           | 必填          |被压测的目标服务名|
| function-name | -        | 选填           | 必填          |被压测的目标函数名|
| function-type    | -        | 选填           | 选填          | 被压测的函数类型，取值范围：`event, http`，默认通过线上函数配置进行判断，如果判断失败可以手动指定                                              |
| method        | -        | 选填           | 选填          |表示压测请求的方法，例如 GET、POST 等，仅对 function-type 为 http 的函数压测时有效|
| payload       | -        | 选填           | 选填          |压测 event 函数：调用目标函数时传入的 event 事件数据;<br>压测 http 函数：调用目标函数时传入的请求体数据|
| payload-file  | -        | 选填           | 选填          |将 payload 参数内容以文件形式传入|
| num-user      | -        | 选填           | 选填          |压测时模拟并发用户的目标数量|
| qualifier     | q        | 选填           | 选填          |表示目标函数的版本信息，仅对 event 函数压测有效|
| run-time      | -        | 选填           | 选填          |压测时长|
| spawn-rate    | -        | 选填           | 选填          |每秒新增模拟用户数|
| url           | u        | 选填           | 选填          |被压测目标函数的 url，仅对 function-type 为 http 的函数压测有效|
| invocation-type | -      | 选填         | 选填        | 调用类型：可选值 async、sync |
| access        | a        | 选填           | 选填          | 本次请求使用的密钥，可以使用通过 [config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug         | -        | 选填           | 选填          | 打开`debug`模式，将会输出更多日志信息                        |
| help          | h        | 选填           | 选填          | 查看帮助信息                                                 |

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s stress start`开始对目标函数进行压测；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定被压测目标函数的具体信息: 服务所在地区、服务名称以及函数名等，例如`s cli fc stress start --region cn-hangzhou --access myAccess --service-name fc-deploy-service --function-name http-trigger-py36 --function-type event`

上述命令的执行结果示例：

```text
Html report flie: /Users/jiangyu/.s/cache/fc-stress/html/url#2021-11-10T15-48-10.html
Execute 'open /Users/jiangyu/.s/cache/fc-stress/html/url#2021-11-10T15-48-10.html' on macos for html report with browser.
fc-deploy-test: 
  Average:     8
  Error:       HTTPConnectionPool(host='undefined', port=80): Max retries exceeded with url: / (Caused by NewConnectionError(': Failed to establish a new connection: [Errno -2] Name or service not known',))
  Fails:       20699
  Failures/s:  690
  Max:         55
  Method:      undefined
  Min:         1
  Name:        /
  Occurrences: 20699
  RPS:         690
  Requests:    20699
  p50:         8
  p60:         8
  p70:         9
  p90:         10
  p95:         11
  p99:         18
```

根据返回信息（例如：` Execute 'open /Users/jiangyu/.s/cache/fc-stress/html/url#2021-11-10T15-48-10.html' on macos for html report with browser.`）可打开相对应的压测报告：

![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1636530616197_20211110075023373607.png)
![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1636530626182_20211110075035336150.png)


## stress clean 命令

`stress clean` 命令，用来清理发起压测的辅助资源(即一个辅助的service/function)以及本地的 html 压测报告。

当执行命令`stress clean -h`时，可以获取帮助文档：

```shell script
Stress clean

  Clean the relevant resources, including helper resources.                                                                    

Usage

  s stress clean <options>
                               
Options

  --region [string]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [string]             [C-Required] Specify the fc service name  
  --function-name [string]            [C-Required] Specify the fc function name    
  -y, --assume-yes                    [Optional] Assume that the answer to any question which would be asked is yes 

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

  $ s stress clean                                                                                

Examples with CLI

  $ s cli fc stress clean --region cn-hangzhou --service-name serviceName --function-name functionName -y 
```

### 参数解析

| 参数全称      | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region        | -        | 选填           | 选填          | 被压测的函数所处的地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name  | -        | 选填           | 选填          |                                                              |
| function-name | -        | 选填           | 选填          |                                                              |
| assume-yes    | y        | 选填           | 选填          | 在交互时，默认选择`y`                                        |
| access        | a        | 选填           | 选填          | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug         | -        | 选填           | 选填          | 打开`debug`模式，将会输出更多日志信息                        |
| help          | h        | 选填           | 选填          | 查看帮助信息                                                 |

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s stress clean`对压测创建的辅助资源进行清理；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定被压测目标函数的具体信息: 服务所在地区、服务名称以及函数名等，例如`s cli fc stress clean --region cn-hangzhou --service-name fc-deploy-service --function-name http-trigger-py36 `；

上述命令的执行结果示例：

```text
Resource cleanup succeeded.
```


## 权限与策略说明

- `stress start` 命令需要部署并调用辅助函数，因此需要如下权限：
  - 最大权限：`AliyunFCFullAccess`
  - 最小权限：
  ```shell
  {
    "Version": "1",
    "Statement": [
      {
        "Action": [
          "fc:UpdateService",
          "fc:CreateService",
          "fc:GetService"
        ],
        "Resource": "acs:fc:<region>:<account-id>:services/_DEFAULT_FC_STRESS_COMPONENT_SERVICE",
        "Effect": "Allow"
      },
      {
        "Action": [
            "fc:InvokeFunction",
            "fc:UpdateFunction",
            "fc:CreateFunction",
            "fc:GetFunction"
        ],
        "Effect": "Allow",
        "Resource": "acs:fc:<region>:<account-id>:services/_DEFAULT_FC_STRESS_COMPONENT_SERVICE.*/functions/*"
      },
      {
            "Action": "ram:PassRole",
            "Effect": "Allow",
            "Resource": "*"
      }
    ]
  }
  ```
- `stress clean` 命令需要删除辅助函数，因此需要如下权限：
  - 最大权限：`AliyunFCFullAccess`
  - 最小权限：
  ```shell
  {
    "Version": "1",
    "Statement": [
      {
        "Action": "fc:DeleteService",
        "Resource": "acs:fc:<region>:<account-id>:services/_DEFAULT_FC_STRESS_COMPONENT_SERVICE",
        "Effect": "Allow"
      },
      {
        "Action": "fc:DeleteFunction",
        "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>/functions/*",
        "Effect": "Allow"
      }
    ]
  }
  ```
