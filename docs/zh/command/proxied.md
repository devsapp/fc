# Proxied 命令

`proxied` 命令是实现函数计算端云联调的命令。

- [Proxied 命令](#proxied-命令)
  - [相关原理](#相关原理)
      - [开启端云联调](#开启端云联调)
      - [关闭端云联调](#关闭端云联调)
  - [命令解析](#命令解析)
  - [proxied setup 命令](#proxied-setup-命令)
    - [参数解析](#参数解析)
    - [操作案例](#操作案例)
  - [proxied invoke 命令](#proxied-invoke-命令)
    - [参数解析](#参数解析-1)
    - [操作案例](#操作案例-1)
  - [proxied cleanup 命令](#proxied-cleanup-命令)
    - [参数解析](#参数解析-2)
    - [操作案例](#操作案例-2)
  - [最佳实践](#最佳实践)
    - [三步完成端云联调](#三步完成端云联调)
    - [断点调试](#断点调试)
      - [VSCode 断点调试案例](#vscode-断点调试案例)
      - [Intelli 断点调试案例](#intelli-断点调试案例)
  - [权限与策略说明](#权限与策略说明)
  - [实战场景举例](#实战场景举例)

## 相关原理

在 Serverless 架构下，由于部分资源是云产品并且通过 VPC 网络与业务逻辑建立关联，这就导致在开发过程中难以进行代码的调试，通过该命令可以通过代理的模式，将线上资源映射到本地，进而实现 VPC 网络下的本地调试能力。

![](https://img.alicdn.com/imgextra/i4/O1CN01m0KYG61CJytdWxp1D_!!6000000000061-2-tps-1146-422.png)

端云联调的架构简图如上图所示，S 工具和通道服务进行的深度集成：
#### 开启端云联调

用户只要在 s.yaml 的目录下， 执行 s proxied setup,  该命令做了如下事情：

1. 根据您 s.yaml 的 vpc 配置等信息创建一个辅助的 Service/Function,  并对辅助函数预留1个实例。该辅助函数的作用是作为代理服务，本地实例所有进出流量都会通过该代理服务。

2. 启动本地环境的代理容器实例，通过通道服务， 和 1 中的 FC 网络代理容器实例建立一条双向通信 TCP 隧道。

3. 启动本地的函数容器实例，比如您是 Custom Runtime 直接跑 SpringBoot 应用， 启动 SpringBoot 的本地函数容器实例和 2 中的代理容器实例共享网络， springboot 应用已经能内网访问线上 VPC 资源。 

4. 本地函数容器实例启动成功，即可以开始调试，直接使用 `s proxied invoke` 或者 `curl` 自定义域名调用辅助的 Service/Function，流量会通过代理服务打回到本地函数容器实例， 开启本地 IDE 对实例内的应用进行断点调试。

#### 关闭端云联调

因为会有一个辅助函数预留1个实例，所以调试结束后，您可以手动清理资源，以免产生不必要的费用

1.  在开启端云联调的终端， 直接 `CTRL + C` 中断

2.  或者在另外一个终端，在相同的目录下执行 `s proxied cleanup`

使用上面 1 或者 2 其中一个方法即可， 如果您不放心， 可以多次执行 `s proxied cleanup`
> 即使您忘记清理， 如果本地开发机关机或者断网， 通道 session 会自动关闭， 预留的资源也会自动清理。

## 命令解析

当执行命令`proxied -h`/`proxied --help`时，可以获取帮助文档：

```shell script
Proxied

  Local invoke with real net traffic via proxied service

Usage

  s proxied <sub-command> <options>

Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/proxied.md

SubCommand List

  setup            Setup the preconditions; [s proxied setup -h]               
  invoke           Invoke local function; help command [s proxied invoke -h] 
  cleanup    Clean the related resource and environment; help command [s proxied cleanup -h]  
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
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/proxied.md
                               
Options

  -c, --config [vscode/intellij]           [Optional] elect which IDE to use when debugging and output related debug config tips for the IDE. value: vscode, intellij                                          
  --debug-args [string]                    [Optional] Additional parameters that will be passed to the debugger                    
  -d, --debug-port [number]                [Optional] Specify the sandboxed container starting in debug mode, and exposing this port on localhost                                                            
  --debugger-path [string]                 [Optional] The path of the debugger on the host                                 
  --tmp-dir [string]                       [Optional] The temp directory mounted to '/tmp' , default: './.s/tmp/invoke/serviceName/functionName/'   
                                 

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
| config        | c        | 选填           |指定断点调试使用的 IDE，可选：vscode, intellij|
| debug-args    | -        | 选填           |断点调试时传入的参数|
| debug-port    | d        | 选填           |断点调试器端口|
| debugger-path | -        | 选填           |自定义断点调试器路径|
| tmp-dir       | -        | 选填           |自定义函数运行环境中 `/tmp` 路径的本机挂载路径，默认为 `./.s/tmp/invoke/serviceName/functionName/`|
| access        | a        | 选填           | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug         | -        | 选填           | 打开`debug`模式，将会输出更多日志信息                        |
| help          | h        | 选填           | 查看帮助信息                                                 |

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s proxied setup `开启端云联调模式，示例输出：

```
✔ Make service SESSION-S-d1564 success.
✔ Make function SESSION-S-d1564/python-event success.
Proxied resource setup succeeded.
> Next step tips: s proxied invoke
```

在开启端云联调之后，可以进行函数的触发，例如`s proxied invoke`，在使用过后，可以考虑清理相关辅助资源，例如`s proxied cleanup`。

## proxied invoke 命令

`proxied invoke` 命令，是进行端云联调函数触发/调用的命令。

当执行命令`proxied invoke -h`/`proxied invoke --help`时，可以获取帮助文档：

```shell script
Invoke

  Invoke local function in the container, pre-action is [s proxied setup]

Usage

  s proxied invoke <options>  

Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/proxied.md
                               
Options

  -e, --event [string]                [Optional] Event data passed to the function during invocation (default: "")                                                 
  -f, --event-file [string]           [Optional] A file containing event data passed to the function during invoke             
  -s, --event-stdin [string]          [Optional] Read from standard input, to support script pipeline                    

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

Event Format
  
  Quickly obtain the data structures of different events through the command [s cli fc-event -h]

Examples with Yaml

  $ s proxied invoke 
  $ s proxied invoke --event string
```

### 参数解析

| 参数全称    | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ----------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| event       | e        | 选填           | 选填          |`event` 函数：传入的 `event` 事件数据，可以通过命令`s cli fc-event`快速获取事件，详细操作可以参考[这里](https://github.com/devsapp/fc/blob/main/docs/zh/command/invoke.md#注意事项) ;<br>http 函数：传入的请求参数，格式可以参考 [这里](https://github.com/devsapp/fc/blob/main/docs/zh/Usage/invoke.md#invoke-http-parameter)|
| event-file  | f        | 选填           | 选填          |将 `event` 参数内容以文件形式传入|
| event-stdin | s        | 选填           | 选填          |将 `event` 参数内容以标准输入流形式传入|
| access      | a        | 选填           | 选填          | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug       | -        | 选填           | 选填          | 打开`debug`模式，将会输出更多日志信息                        |
| help        | h        | 选填           | 选填          | 查看帮助信息                                                 |

### 操作案例

**有资源描述文件（Yaml）时**，可以通过`s proxied invoke `对端云联调函数进行触发，例如` s proxied invoke -e '{}'`：

```
[2021-07-13T08:55:05.260] [INFO ] [S-CLI] - Start ...
========= FC invoke Logs begin =========
Not all function logs are available, please retry
FC Invoke End RequestId: bb720e13-e57a-4040-a920-82621e275ff1
Duration: 42.66 ms, Billed Duration: 43 ms, Memory Size: 512 MB, Max Memory Used: 40.85 MB
========= FC invoke Logs end =========

FC Invoke Result:
hello world
```

> 对于事件函数，需要先明确具体的事件类型（例如 OSS 事件， CDN 事件等），然后创建临时触发器，并将函数计算侧的目标函数和服务修改成生成的辅助 service/function（ [proxied setup 命令操作过程](#操作案例)中输出的`SESSION-S-d1564/python-event`），然后进行通过触发器即可直接触发函数获得端云联调的能力，例如如果是 OSS 创建 object 的事件，可以向指定的 OSS 中上传文件即可实现线上触发器触发本地函数的能力，即端云联调的能力。测试完成之后，不要忘记将临时指向生成的辅助资源的触发器恢复到原有的服务与函数资源上。

## proxied cleanup 命令

`proxied cleanup` 命令，是对因端云联调而生成的辅助资源进行清理的命令。

当执行命令`proxied cleanup -h`/`proxied cleanup --help`时，可以获取帮助文档：

```shell script
Proxied cleanup

  Clean the helper resource and the local container

Usage

  s proxied cleanup [options]

Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/proxied.md

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

端云联调可以通过三个非常简单的步骤快速实现：

- 步骤1: 在已有的项目下，创建端云联调的辅助资源，开启端云联调模式：`s proxied setup`；
- 步骤2: 在完成端云联调模式开启动作之后，打开一个新的终端，通过`s proxied invoke`或者线上的事件进行函数的触发，调试；
- 步骤3: 完成端云联调之后，通过`s proxied cleanup`命令，对因端云联调而产生的辅助资源进行清理；

### 断点调试

通过与常见的 IDE 进行结合，可以在常见的 IDE 上实现端云联调的断点调试。

#### VSCode 断点调试案例

- 步骤1: 在已有的项目下，开启调试模式的端云联调能力：`$ s proxied setup --config vscode --debug-port 3000`，命令执行完成功后， 本地的函数计算执行环境会阻塞等待调用(执行环境本质是一个 HTTP Server)；

  此时若要进行断点调试，需要进行以下的操作在 VSCode 上进行相关的配置：Serverless Devs 开发者工具自动在工程目录下面生成 `.vscode/launch.json` 文件, 通过下图完成调试配置：

  ![](https://img.alicdn.com/imgextra/i1/O1CN01kNeLy01Omd2Ge3Q6J_!!6000000001748-2-tps-341-233.png)

  

- 步骤2:  打开一个新的终端，通过`proxied invoke`进行触发（例如`s proxied invoke`，如果是事件函数也可以通过线上触发器进行触发，此时要注意将触发器临时指向辅助函数，详情参考[proxied invoke 命令操作过程](#操作案例-1)），回到 VSCode 界面，既可以进行断点调试了：

  ![img](https://img.alicdn.com/imgextra/i4/O1CN01biJncZ1l3V9VNWOd8_!!6000000004763-2-tps-3542-2232.png)

  调试完成后返回结果。

  >  若要在调用的时候制定传入的 event 参数，可以使用 `--event`，例如`s proxied invoke -h`

- 步骤3:  完成端云联调之后，通过`s proxied cleanup`命令，对对因端云联调而产生的辅助资源进行清理；

#### Intelli 断点调试案例

- 步骤1: 例如需要在 IDEA 下进行调试，可以在已有的项目下，开启调试模式的端云联调能力：`$ s proxied setup --config intellij --debug-port 3000`，命令执行完成功后， 本地的函数计算执行环境会阻塞等待调用(执行环境本质是一个 HTTP Server)；

  此时若要进行断点调试，需要进行以下的操作在 IDEA 上进行相关的配置：

    1. 在菜单栏选择 Run… > Edit Configurations 。
       ![img](https://img.alicdn.com/imgextra/i4/O1CN01CffYNv1UbX74nFI0d_!!6000000002536-2-tps-734-432.png)
     2. 新建一个 Remote Debugging 。
        ![img](https://img.alicdn.com/imgextra/i2/O1CN014nVPkX1voLpEUKiS9_!!6000000006219-2-tps-2216-1514.png)
     3. 自定义调试器名称，并将端口配置为 3000 。
        ![img](https://img.alicdn.com/imgextra/i2/O1CN014xCgf21lnl9h2QGTA_!!6000000004864-2-tps-2142-1620.png)
     4. 上述配置完成后，在 IDEA 编辑器侧边栏为函数代码增加断点，点击"开始调试"按钮。
        ![img](https://img.alicdn.com/imgextra/i1/O1CN01PPR4V61RM0qRiP16r_!!6000000002096-2-tps-3528-2166.png)

- 步骤2:  打开一个新的终端，通过`proxied invoke`进行触发（例如`s proxied invoke`，如果是事件函数也可以通过线上触发器进行触发，此时要注意将触发器临时指向辅助函数，详情参考[proxied invoke 命令操作过程](#操作案例-1)），回到 IDEA 界面，既可以进行断点调试了：

  ![img](https://img.alicdn.com/imgextra/i2/O1CN01gZdC9B20nxYxFvLTr_!!6000000006895-2-tps-3566-2232.png)

  调试完成后返回结果。

  >  若要在调用的时候制定传入的 event 参数，可以使用 `--event`，例如`s proxied invoke -h`

- 步骤3:  完成端云联调之后，通过`s proxied cleanup`命令，对对因端云联调而产生的辅助资源进行清理；

## 权限与策略说明

- `proxied setup`命令的权限，更多是和 要被端云联调的函数 Yaml 中所配置的参数有一定的关系，所以此处可以参考 [Yaml 规范文档](../yaml.md) 中关于不同字段与权限的配置。

- 除了基础配置之外，`proxied `还需要以下策略作为支持：

  ```
  {
      "Statement": [
          {
              "Effect": "Allow",
              "Action": "tns:*",
              "Resource": "*"
          }
      ],
      "Version": "1"
  }
  ```

- 如果使用`proxied invoke`命令，还需要对应的`invoke`权限，例如：

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

- 如果涉及到函数等相关辅助资源的清理，还需要对应的`delete`权限，例如：

  - 最大权限: `AliyunFCInvocationAccess` 或者 `AliyunFCFullAccess`

  - 最小权限参考：

    ````json
    {
        "Statement": [
            {
                "Action": [
                    "fc:ListOnDemandConfigs",
                    "fc:DeleteFunctionOnDemandConfig",
                    "fc:ListProvisionConfigs",
                    "fc:PutProvisionConfig",
                    "fc:ListAliases",
                    "fc:DeleteAlias",
                    "fc:ListServiceVersions",
                    "fc:DeleteServiceVersion",
                    "fc:ListTriggers",
                    "fc:DeleteTrigger",
                    "fc:ListFunctions",
                    "fc:DeleteFunction",
                    "fc:DeleteService"
                ],
                "Effect": "Allow",
                "Resource": "*"
            }
        ],
        "Version": "1"
    }
    ````

## 实战场景举例
以阿里云函数计算一个真实的企业客户为例：小王是一个业务驱动型的公司的开发， 公司为了提高业务迭代效率， 技术架构向全面云原生化演进， 减少基本设施的管理和运维， 架构大致如下：

<img src="https://img.alicdn.com/imgextra/i1/O1CN012AtvSr1ZhYRbKqZWZ_!!6000000003226-2-tps-1508-1378.png" width="70%" height="70%">

小王将迭代最频繁的对外的前后端分离的项目都一键迁移到函数计算的 Custom Runtime，在其中 SpringBoot 的项目需要能使用各种 VPC 内网地址访问下游服务（比如注册中心或者其他微服务接口）， 这个时候Serverless Devs 提供的端云联调 就可以派上用场了， 只需要在 s.yaml (s.yaml 中定义了函数的 VPC 配置) 所在目录下执行：

`$ s proxied setup`

该命令会和云端 VPC 环境建立安全的网络通道，并在本地启动应用实例。此时本地实例可以无缝访问云端 VPC 环境内的资源，比如使用内网地址访问注册中心、RDS、 Kafka 等。这意味着您的应用配置不需要任何改变，就可以在本地和云端环境内的资源交互。

与此同时，直接使用这个SpringBoot后端项目对应在函数计算 FC 上的自定义域名，流量将被路由到本地应用实例上。比如，您的前端项目部署到 FC 的函数名字是 frontend, 对应的自定义域名是 frontend.abc.com。前端依赖的后端服务部署在 FC 上的函数名字是 backend，对应的自定义域名是 backend.abc.com。这个时候，您直接浏览器打开 fronted.abc.com，进行有后端请求的操作，流量就自动从线上路由到本地的 SpringBoot 实例，同时 SpringBoot 的日志在终端实时显示，甚至您也可以使用断点调试来自线上的流量。

假设本地启动 SpringBoot 后端项目的实例失败，可能的原因包括函数计算的 VPC 配置不对, 对应的下游服务有白名单限制等等。此时您在本地就可以重现和云端环境实例相同的启动过程，这对排查实例启动方面的问题极其有帮助。如下图所示：

![](https://img.alicdn.com/imgextra/i3/O1CN01tD1TWT1CiiHeYt7rC_!!6000000000115-2-tps-2282-688.png)

我们从本地实例的启动过程信息就可以明确定位到原因是 Nacos 访问不通，我们需要查看函数是否正确配置了 Nacos 所在的 VPC 信息，或者 Nacos 是否有白名单限制等等。
