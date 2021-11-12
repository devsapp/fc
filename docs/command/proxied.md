# Proxied 命令

`proxied` 命令是实现函数计算端云联调的命令。

- [命令解析](#命令解析)
- [proxied setup 命令](#proxied-setup-命令)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [proxied invoke 命令](#proxied-invoke-命令)
  - [参数解析](#参数解析-1)
  - [操作案例](#操作案例-1)
- [proxied clean/cleanup 命令](#proxied-clean-cleanup-命令)
  - [参数解析](#参数解析-2)
  - [操作案例](#操作案例-2)
- [最佳实践](#最佳实践)
  - [三步完成端云联调](#三步完成端云联调)
  - [断点调试](#断点调试)
    - [VSCode 断点调试案例](#vscode-断点调试案例)
    - [Intelli 断点调试案例](#intelli-断点调试案例)
- [权限与策略说明](#权限与策略说明)

> 关于 `proxied` 命令的常见问题和解决方法，可以参考[ FC 组件自动问答系统](http://qa.devsapp.cn/fc?type=proxied ) 。



## 相关原理

在 Serverless 架构下，由于部分资源是云产品并且通过 VPC 网络与业务逻辑建立关联，这就导致在开发过程中难以进行代码的调试，通过该命令可以通过代理的模式，将线上资源映射到本地，进而实现 VPC 网络下的本地调试能力。

端云联调的架构简图如下：

![](https://img.alicdn.com/imgextra/i1/O1CN012jVmnP1mMZGWLZ1Wv_!!6000000004940-2-tps-1127-670.png)

1. Serverless Devs 开发者工具会根据 Yaml  配置配置文件的内容, 创建一个辅助服务和辅助函数（这个辅助服务和 Yaml 中所声明的业务服务配置是一致的）；
2. 通过对函数的触发器（包括通过 SDK/API，`s proxied invoke`命令，或者其他触发器）触发辅助函数（图中函数计算 C ），请求流量会回到本地的调试实例（图中本地环境 A ）， 这个时候本地实例(本地函数执行环境容器)收到 `event` 和 `context` 是真实来自线上的；
3. 本地调试的实例(图中本地环境 A)运行函数逻辑，可以直接访问:
   - VPC 内网资源, 比如 RDS 、 Kafka 内网地址等；
   - 一些云服务的内网地址，如 OSS 的 internal endpoint 等；
   - 可以直接使用硬盘挂载服务（直接访问 NAS）；

> 💡 尽管上面的原理简图相对复杂，需要实现的内容也是非常多的，但是实际上A, B , C 均是工具层面已经封装好， 对使用者来说， 只需要在 Serverless Devs 的项目下使用 `proxied` 命令，就可以一步开始端云联调：
>
>
> - Serverless Devs 开发者工具会利用资源描述文件 `s.yaml` 中 `service` 配置 ( 例如  `vpcConfig`, `nasConfig` 等) 创建辅助资源（包括辅助服务和辅助函数）， 从而实现辅助函数(图中函数计算 C )和被调试函数一样的网络访问能力；
> - 代码被挂载到 A 本地函数执行环境容器中；
> - 集成开发环境和本地函数执行环境容器之间的端口映射可以通过`--debug-port `参数指定；
> - 端云联调能力还可以非常便利的在 VSCode，Pycharm 以及 IDEA 等常用的 IDE 中使用；

## 命令解析

当执行命令`proxied -h`/`proxied --help`时，可以获取帮助文档：

```shell script
Proxied

  Local invoke with real net traffic via proxied service

Document
  
  https://github.com/devsapp/fc/blob/main/docs/command/proxied.md

SubCommand List

  setup            Setup the preconditions; [s proxied setup -h]               
  invoke           Invoke local function; help command [s proxied invoke -h] 
  clean/cleanup    Clean the related resource and environment; help command [s proxied cleanup -h]  
```


在该命令中，包括了三个子命令：

- [setup：初始化/配置端云联调](#proxied-setup-命令)
- [invoke：触发/调用本地函数](#proxied-invoke-命令)
- [cleanup：清理辅助资源/清理环境](#proxied-cleanup-命令)

## proxied setup 命令

`proxied setup` 命令，是初始化/配置端云联调的命令。

当执行命令`proxied setup -h`/`proxied setup --help`时，可以获取帮助文档：

```shell script
Proxied setup

  Setup for local invoke via proxied service

Usage

  s proxied setup <options>  

Document
  
  https://github.com/devsapp/fc/blob/main/docs/command/proxied.md
                               
Options

  -c, --config [string]       [Optional] elect which IDE to use when debugging and output related debug config tips for the IDE. value: vscode/pycharm/idea                                            
  --debug-args [string]       [Optional] Additional parameters that will be passed to the debugger                    
  -d, --debug-port [number]   [Optional] Specify the sandboxed container starting in debug mode, and exposing this port on localhost                                                            
  --debugger-path [string]    [Optional] The path of the debugger on the host                                 
  --tmp-dir [string]          [Optional] The temp directory mounted to /tmp , default: './.s/tmp/invoke/serviceName/functionName/'   
                                 

Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [string]		 [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations 

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/yaml_and_cli.md

Examples with Yaml

  $ s proxied setup
  $ s proxied setup --config vscode --debug-port 3000
```

### 参数解析

| 参数全称      | 参数缩写 | Yaml模式下必填 | 参数含义                                                     |
| ------------- | -------- | -------------- | ------------------------------------------------------------ |
| config        | c        | 选填           |                                                              |
| debug-args    | -        | 选填           |                                                              |
| debug-port    | d        | 选填           |                                                              |
| debugger-path | -        | 选填           |                                                              |
| tmp-dir       | -        | 选填           |                                                              |
| access        | a        | 选填           | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug         | -        | 选填           | 打开`debug`模式，将会输出更多日志信息                        |
| help          | h        | 选填           | 查看帮助信息                                                 |

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s ondemand get --qualifier qualifier`进行指定的版本按量资源详情获取；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，例如`s cli fc ondemand get --region cn-hangzhou --service-name fc-deploy-service --qualifier qualifier`；

上述命令的执行结果示例：

```text
fc-deploy-test: 
  serviceName:          fc-deploy-service
  functionName:         http-trigger-py36
  qualifier:            LATEST
  resource:             services/fc-deploy-service.http-trigger-py36/functions/LATEST
  maximumInstanceCount: 1
```

## proxied invoke 命令

`ondemand list` 命令，是进列举按量资源列表的命令。

当执行命令`ondemand list -h`/`ondemand list --help`时，可以获取帮助文档：

```shell script
OnDemand list

  View the list of on-demand 

Usage

  s ondemand list <options>

Document
  
  https://github.com/devsapp/fc/blob/main/docs/command/ondemand.md
                               
Options

  --region [string]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [string]       	  [C-Required] Specify the fc service name  
  --table                             [Optional] Table format output     

Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [string]      [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations 

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/yaml_and_cli.md

Examples with Yaml

  $ s ondemand list 

Examples with CLI

  $ s cli fc ondemand list --region cn-hangzhou --service-name serviceName
```

### 参数解析

| 参数全称     | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------ | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region       | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | -        | 选填           | 必填          | 服务名                                                       |
| table        | -        | 选填           | 选填          | 是否以表格形式输出                                           |
| access       | a        | 选填           | 选填          | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug        | -        | 选填           | 选填          | 打开`debug`模式，将会输出更多日志信息                        |
| help         | h        | 选填           | 选填          | 查看帮助信息                                                 |

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s ondemand list`获取按量资源列表；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，例如`s cli fc ondemand list --region cn-hangzhou --service-name fc-deploy-service`

上述命令的执行结果示例：

```text
fc-deploy-test: 
  - 
    serviceName:          fc-deploy-service
    qualifier:            http-trigger-py36
    functionName:         LATEST
    resource:             services/fc-deploy-service.http-trigger-py36/functions/LATEST
    maximumInstanceCount: 1
```

如果指定了`--table`参数，输出示例：

```text
  ┌───────────────────┬───────────────────┬──────────────┬──────────────────────┐
  │    serviceName    │     qualifier     │ functionName │ maximumInstanceCount │
  ├───────────────────┼───────────────────┼──────────────┼──────────────────────┤
  │ fc-deploy-service │ http-trigger-py36 │ LATEST       │ 1                    │
  └───────────────────┴───────────────────┴──────────────┴──────────────────────┘
```

## proxied clean/cleanup 命令

`proxied clean/cleanup` 命令，是对因端云联调而生成的辅助资源进行清理的命令。

当执行命令`proxied cleanup -h`/`proxied cleanup --help`时，可以获取帮助文档：

```shell script
Proxied clean/cleanup

  Clean the helper resource and the local container

Usage

  s proxied cleanup <options>
  s proxied clean <options>

Document
  
  https://github.com/devsapp/fc/blob/main/docs/command/proxied.md

Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [string]      [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations 

Examples with Yaml

  $ s proxied cleanup                                                     
```

### 参数解析

| 参数全称 | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| :------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| access   | a        | 选填           | 选填          | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug    | -        | 选填           | 选填          | 打开`debug`模式，将会输出更多日志信息                        |
| help     | h        | 选填           | 选填          | 查看帮助信息                                                 |

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s proxied clean `/`s proxied cleanup`对因端云联调而产生的辅助资源进行清理，示例输出：

```
Resource cleanup succeeded.
```

## 最佳实践

### 三步完成端云联调



### 断点调试

#### VSCode 断点调试案例

#### Intelli 断点调试案例

## 权限与策略说明

