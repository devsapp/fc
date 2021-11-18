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

> [端云联调](proxied.md)能力与[云端调试](remote.md)能力的区别：
>
> - 端云联调：函数在本地环境运行，函数流量经过线上环境；
> - 远程调试：函数在线上环境运行，本地接收线上的运行结果；

> 关于 `proxied` 命令的常见问题和解决方法，可以参考[ FC 组件自动问答系统](http://qa.devsapp.cn/ ) 。



## 相关原理

在 Serverless 架构下，由于部分资源是云产品并且通过 VPC 网络与业务逻辑建立关联，这就导致在开发过程中难以进行代码的调试，通过该命令可以通过代理的模式，将线上资源映射到本地，进而实现 VPC 网络下的本地调试能力。

端云联调的架构简图如下：

![](https://img.alicdn.com/imgextra/i1/O1CN012jVmnP1mMZGWLZ1Wv_!!6000000004940-2-tps-1127-670.png)

1. Serverless Devs 开发者工具会根据 Yaml  配置文件的内容, 创建一个辅助服务和辅助函数（这个辅助服务和 Yaml 中所声明的业务服务配置是一致的）；
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
> - 端云联调的断点调试能力还可以在 vscode 以及 intellij 这些常用的 IDE 中使用；

## 命令解析

当执行命令`proxied -h`/`proxied --help`时，可以获取帮助文档：

```shell script
Proxied

  Local invoke with real net traffic via proxied service

Usage

  s proxied <sub-command> <options>

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

在开启端云联调之后，可以进行函数的触发，例如`s proxied invoke`，在使用过后，可以考虑清理相关辅助资源，例如`s proxied clean`。

## proxied invoke 命令

`proxied invoke` 命令，是进行端云联调函数触发/调用的命令。

当执行命令`proxied invoke -h`/`proxied invoke --help`时，可以获取帮助文档：

```shell script
Invoke

  Invoke local function in the container, pre-action is [s proxied setup]

Usage

  s proxied invoke <options>  

Document
  
  https://github.com/devsapp/fc/blob/main/docs/command/proxied.md
                               
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

Examples with Yaml

  $ s proxied invoke 
  $ s proxied invoke --event string
```

### 参数解析

| 参数全称    | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ----------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| event       | e        | 选填           | 选填          |`event` 函数：传入的 `event` 事件数据，可以通过命令`s cli fc-event`快速获取事件，详细操作可以参考[这里](https://github.com/devsapp/fc/blob/main/docs/command/invoke.md#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9);<br>http 函数：传入的请求参数，格式可以参考 [这里](https://github.com/devsapp/fc/blob/main/docs/Usage/invoke.md#invoke-http-parameter)|
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

端云联调可以通过三个非常简单的步骤快速实现：

- 步骤1: 在已有的项目下，创建端云联调的辅助资源，开启端云联调模式：`s proxied setup`；
- 步骤2: 在完成端云联调模式开启动作之后，通过`s proxied invoke`或者线上的事件进行函数的触发，调试；
- 步骤3: 完成端云联调之后，通过`s proxied clean`命令，对对因端云联调而产生的辅助资源进行清理；

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

- 步骤3:  完成端云联调之后，通过`s proxied clean`命令，对对因端云联调而产生的辅助资源进行清理；

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

- 步骤3:  完成端云联调之后，通过`s proxied clean`命令，对对因端云联调而产生的辅助资源进行清理；

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
