# Remote 命令

`remote` 命令是实现函数计算云端调试的命令。

- [命令解析](#命令解析)
- [remote setup 命令](#remote-setup-命令)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [remote invoke 命令](#remote-invoke-命令)
  - [参数解析](#参数解析-1)
  - [操作案例](#操作案例-1)
- [remote clean/cleanup 命令](#remote-clean-cleanup-命令)
  - [参数解析](#参数解析-2)
  - [操作案例](#操作案例-2)
- [权限与策略说明](#权限与策略说明)

> [端云联调](proxied.md)能力与[云端调试](remote.md)能力的区别：
>
> - 端云联调：本地除了一个通道服务容器，仍有一个函数计算容器，用来执行本地函数，远程的辅助函数只是单纯将远程流量发送到本地；
> - 远程调试：本地只有一个通道服务容器，执行过程全部依赖于线上，远程函数将执行结果返回；

> ⚠️ 注意： 
>   - `setup` 之后记得及时 `cleanup`，以免因远程函数预留造成不必要的计费;
>   - 建议在配置文件中，将被调试函数的 `timeout` 属性调高（比如900），避免因函数调用超时引发调试中断;

> 关于 `remote` 命令的常见问题和解决方法，可以参考[ FC 组件自动问答系统](http://qa.devsapp.cn/ ) 。



## 相关原理

与 [端云联调](proxied.md) 类似的是，远程调试同样希望可以通过工具降低 Serverless 架构的调试难度；相对比端云联调的优势，远程调试致力于解决用户调试过程中**本地流量与真实线上流量不一致**的问题。远程调试的架构简图如下：

![远程调试原理](https://img.alicdn.com/imgextra/i1/O1CN014tTtzF1K4sjIU4CoM_!!6000000001111-2-tps-1219-590.png)



在远程调试中，用户通过 `remote setup` 指令搭建本地与远程的容器通道，并在远程新建一个与本地配置完全相同的函数。之后，通过通道服务，用户可以直接获取线上的 VPC 内网资源，比如 NAS，OSS 等等。用户还可以通过容器直接进入远程的函数计算环境，进行更加细致地调试。

使用远程调试组件启动单步调试，用户只需在 `remote setup` 后，启动 IDE 的调试模式（当前仅支持 VSCode，Intellij）。使用 `remote invoke` 启动函数，此时即可发现程序运行到断点处。

## 命令解析

当执行命令`remote -h`/`remote --help`时，可以获取帮助文档：

```shell script
Remote

  Remote invoke with real net traffic via proxied service

Usage

  s remote <sub-command> <options>

Document
  
  https://github.com/devsapp/fc/blob/main/docs/command/remote.md

SubCommand List

  setup            Setup the real remote service for debugging; [s remote setup -h]               
  invoke           Invoke remote function; help command [s remote invoke -h] 
  clean/cleanup    Clean the related resource and environment; help command [s remote remote -h]  
```


在该命令中，包括了三个子命令：

- [setup：初始化/配置远程调试](#remote-setup-命令)
- [invoke：触发/调用线上函数](#remote-invoke-命令)
- [cleanup：清理辅助资源/清理环境](#remote-cleanup-命令)

## remote setup 命令

`remote setup` 命令，是初始化/配置远程调试的命令。

当执行命令`remote setup -h`/`remote setup --help`时，可以获取帮助文档：

```shell script
Remote setup

  Setup for remote invoke via proxied service

Usage

  s remote setup <options>  

Document
  
  https://github.com/devsapp/fc/blob/main/docs/command/remote.md
                               
Options

  -c, --config [vscode/pycharm/idea]       [Optional] elect which IDE to use when debugging and output related debug config tips for the IDE. value: vscode/pycharm/idea                                                             
  -d, --debug-port [number]                [Optional] Specify the sandboxed container starting in debug mode, and exposing this port on localhost                                                                                           
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

  $ s remote setup
  $ s remote setup --config vscode --debug-port 3000
```

### 参数解析

| 参数全称   | 参数缩写 | Yaml模式下必填 | 参数含义                                                     |
| ---------- | -------- | -------------- | ------------------------------------------------------------ |
| config     | c        | 选填           |                                                              |
| debug-port | d        | 选填           |                                                              |
| tmp-dir    | -        | 选填           |                                                              |
| access     | a        | 选填           | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug      | -        | 选填           | 打开`debug`模式，将会输出更多日志信息                        |
| help       | h        | 选填           | 查看帮助信息                                                 |

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s remote setup `开启远程调试模式，示例输出：

```
Remote resource setup succeeded.
> Next step tips: s remote invoke
```

在开启远程调试之后，可以进行函数的触发，例如`s remote invoke`，在使用过后，可以考虑清理相关辅助资源，例如`s remote clean`。

## remote invoke 命令

`remote invoke` 命令，是进行远程调试函数触发/调用的命令。

当执行命令`remote invoke -h`/`remote invoke --help`时，可以获取帮助文档：

```shell script
Remote

  Invoke remote function in the container, pre-action is [s remote setup]

Usage

  s remote invoke <options>  

Document
  
  https://github.com/devsapp/fc/blob/main/docs/command/remote.md
                               
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

  $ s remote invoke 
  $ s remote invoke --event string
```

### 参数解析

| 参数全称    | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ----------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| event         | e        | 选填      | 选填          |传入 `event` 函数的 `event` 事件数据，可以通过 `s cli fc-event` 指令快速获取事件数据示例，详细操作参考[这里](https://github.com/devsapp/fc/blob/main/docs/command/invoke.md#注意事项)|
| event-file    | f        | 选填      | 选填          |以文件形式传入 `event` 事件数据|
| event-stdin   | s        | 选填      | 选填          |以标准输入形式传入 `event` 事件数据|
| access      | a        | 选填           | 选填          | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug       | -        | 选填           | 选填          | 打开`debug`模式，将会输出更多日志信息                        |
| help        | h        | 选填           | 选填          | 查看帮助信息                                                 |

### 操作案例

**有资源描述文件（Yaml）时**，可以通过`s remote invoke `对远程调试函数进行触发，例如` s remote invoke -e '{}'`：

```
[2021-07-13T08:55:05.260] [INFO ] [S-CLI] - Start ...
========= FC invoke Logs begin =========
Not all function logs are available, please retry
FC Invoke End RequestId: bb720e13-e57a-4040-a920-82621e275ff1
Duration: 42.66 ms, Billed Duration: 43 ms, Memory Size: 512 MB, Max Memory Used: 40.85 MB
========= FC invoke Logs end =========

FC remote Result:
hello world
```

## remote clean/cleanup 命令

`remote clean/cleanup` 命令，是对因远程调试而生成的辅助资源进行清理的命令。

当执行命令`remote cleanup -h`/`remote cleanup --help`时，可以获取帮助文档：

```shell script
Remote clean/cleanup

  Clean the helper resource and the local container

Usage

  s remote cleanup <options>
  s remote clean <options>

Document
  
  https://github.com/devsapp/fc/blob/main/docs/command/remote.md

Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [string]      [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations 

Examples with Yaml

  $ s remote cleanup                                                     
```

### 参数解析

| 参数全称 | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| :------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| access   | a        | 选填           | 选填          | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug    | -        | 选填           | 选填          | 打开`debug`模式，将会输出更多日志信息                        |
| help     | h        | 选填           | 选填          | 查看帮助信息                                                 |

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s remote clean `/`s remote cleanup`对因远程调试而产生的辅助资源进行清理，示例输出：

```
Resource cleanup succeeded.
```

## 最佳实践

### 三步完成远程调试

远程调试可以通过三个非常简单的步骤快速实现：

- 步骤1: 在已有的项目下，创建远程调试的辅助资源，开启远程调试模式：`s remote setup`；
- 步骤2: 在完成远程调试模式开启动作之后，通过`s remote invoke`或者线上的事件进行函数的触发，调试；
- 步骤3: 完成远程调试之后，通过`s remote clean`命令，对对因远程调试而产生的辅助资源进行清理；

### 断点调试

通过与常见的 IDE 进行结合，可以在常见的 IDE 上实现远程调试的断点调试。

#### VSCode 断点调试案例

- 步骤1: 在已有的项目下，开启调试模式的远程调试能力：`$ s remote setup --config vscode --debug-port 3000`，命令执行完成功后， 本地的函数计算执行环境会阻塞等待调用(执行环境本质是一个 HTTP Server)；

  此时若要进行断点调试，需要进行以下的操作在 VSCode 上进行相关的配置：Serverless Devs 开发者工具自动在工程目录下面生成 `.vscode/launch.json` 文件, 通过下图完成调试配置：

  ![](https://img.alicdn.com/imgextra/i1/O1CN01kNeLy01Omd2Ge3Q6J_!!6000000001748-2-tps-341-233.png)

  

- 步骤2:  打开一个新的终端，通过`remote invoke`进行触发（例如`s remote invoke`），回到 VSCode 界面，既可以进行断点调试了：

  ![img](https://img.alicdn.com/imgextra/i4/O1CN01biJncZ1l3V9VNWOd8_!!6000000004763-2-tps-3542-2232.png)

  调试完成后返回结果。

  >  若要在调用的时候制定传入的 event 参数，可以使用 `--event`，例如`s remote invoke -h`

- 步骤3:  完成远程调试之后，通过`s remote clean`命令，对对因远程调试而产生的辅助资源进行清理；

#### Intelli 断点调试案例

- 步骤1: 例如需要在 IDEA 下进行调试，可以在已有的项目下，开启调试模式的远程调试能力：`$ s remote setup --config idea --debug-port 3000`，命令执行完成功后， 本地的函数计算执行环境会阻塞等待调用(执行环境本质是一个 HTTP Server)；

  此时若要进行断点调试，需要进行以下的操作在 IDEA 上进行相关的配置：

    1. 在菜单栏选择 Run… > Edit Configurations 。
       ![img](https://img.alicdn.com/imgextra/i4/O1CN01CffYNv1UbX74nFI0d_!!6000000002536-2-tps-734-432.png)
     2. 新建一个 Remote Debugging 。
        ![img](https://img.alicdn.com/imgextra/i2/O1CN014nVPkX1voLpEUKiS9_!!6000000006219-2-tps-2216-1514.png)
     3. 自定义调试器名称，并将端口配置为 3000 。
        ![img](https://img.alicdn.com/imgextra/i2/O1CN014xCgf21lnl9h2QGTA_!!6000000004864-2-tps-2142-1620.png)
     4. 上述配置完成后，在 IDEA 编辑器侧边栏为函数代码增加断点，点击"开始调试"按钮。
        ![img](https://img.alicdn.com/imgextra/i1/O1CN01PPR4V61RM0qRiP16r_!!6000000002096-2-tps-3528-2166.png)

- 步骤2:  打开一个新的终端，通过`remote invoke`进行触发（例如`s remote invoke`），回到 IDEA 界面，既可以进行断点调试了：

  ![img](https://img.alicdn.com/imgextra/i2/O1CN01gZdC9B20nxYxFvLTr_!!6000000006895-2-tps-3566-2232.png)

  调试完成后返回结果。

  >  若要在调用的时候制定传入的 event 参数，可以使用 `--event`，例如`s remote invoke -h`

- 步骤3:  完成远程调试之后，通过`s remote clean`命令，对对因远程调试而产生的辅助资源进行清理；

### 远程登录

远程调试提供了登陆功能。在完成`s remote setup`后，可以通过代理容器远程登录到函数计算实例。详细步骤如下：

1. 查看当前代理容器的ID，镜像为 `ts-online-local`

   ```bash
   docker ps
   ```

2. 进入代理容器

   ```bash
   docker exec -it ${CONTAINER_ID} bash
   ```

3. 登陆远程计算实例

   ```bash
   ssh root@${IP} -p ${PORT}
   ```

![通过代理容器远程登陆](https://img.alicdn.com/imgextra/i1/O1CN01oEN0F91LACx5qm70z_!!6000000001258-2-tps-1838-570.png)

## 

## 权限与策略说明

- `remote setup`命令的权限，更多是和要被远程调试的函数 Yaml 中所配置的参数有一定的关系，所以此处可以参考 [Yaml 规范文档](../yaml.md) 中关于不同字段与权限的配置。

- 除了基础配置之外，`remote `还需要以下策略作为支持：

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

- 如果使用`remote invoke`命令，还需要对应的`invoke`权限，例如：

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

