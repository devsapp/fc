# Local 命令

`local` 命令是在本地对函数调试的命令。

- [命令解析](#命令解析)
- [相关原理](#相关原理)
- [local invoke 命令](#local-invoke-命令)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [local start 命令](#local-start-命令)
  - [参数解析](#参数解析-1)
  - [操作案例](#操作案例-1)

> ⚠️ 注意：该命令对 Docker 有所依赖，所以在使用该命令时，需要先进行 [Docker 安装](https://docs.docker.com/get-started/#download-and-install-docker) 。


## 命令解析

当执行命令`local -h`/`local --help`时，可以获取帮助文档：

```shell script
Local

  Run your serverless application locally for quick development & testing. 

Usage

  $ s local <sub-command> <options>

Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/local.md

SubCommand List

  invoke   Local start fc event function; help command [s local invoke -h]         
  start    Local invoke fc http function; help command [s local start -h]               
```


在该命令中，包括了两个个子命令：

- [invoke：本地调试事件函数](#local-invoke-命令)
- [start：本地调试HTTP函数](#local-start-命令)

## local invoke 命令

`local invoke` 命令，是进行本地事件函数调试的命令。

> 💡 事件函数指的是非 HTTP 触发器的函数，包括不限于 OSS 触发器函数、CDN 触发器函数、Tablestore 触发器函数等。

当执行命令`local invoke -h`/`local invoke --help`时，可以获取帮助文档：

```shell script
Local Invoke

  Local invoke fc event function 

Usage

  $ s local invoke <options> 

Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/local.md
                               
Options
  -e, --event [string]                [Optional] Event data passed to the function during invocation (default: "")                                                 
  -f, --event-file [string]           [Optional] A file containing event data passed to the function during invoke             
  -s, --event-stdin [string]          [Optional] Read from standard input, to support script pipeline                        
  -m, --mode [api/server/normal]      [Optional] Invoke mode, including api, server and normal:                                
                                       - api: start api server for invokeFunction api invoking                      
                                       - server: start server container for invoking function in the other terminal repeatedly                                                                   
                                       - normal: default mode, invoke event function and then close the container
  -c, --config [vscode/pycharm/idea]  [Optional] Select which IDE to use when debugging and output related debug config tips for the IDE. value: vscode/pycharm/idea                                   
  -d, --debug-port [number]           [Optional] Specify the local function container starting in debug mode, and exposing this port on localhost                                                   
  --debug-args [string]               [Optional] Additional parameters that will be passed to the debugger                     
  --debugger-path [string]            [Optional] The path of the debugger on the host                                          
  --tmp-dir [string]                  [Optional] The temp directory mounted to '/tmp' , default: './.s/tmp/invoke/serviceName/functionName/'                                                            
  --server-port [number]              [Optional] The exposed port of http server, default value is the random port between 7000 and 8000

Global Options

  -h, --help                 [Optional] Help for command             
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

  $ s local invoke --event "hello world!"                                                                                          
```

### 参数解析

| 参数全称      | 参数缩写 | Yaml模式下必填 | 参数含义                                                     |
| ------------- | -------- | -------------- | ------------------------------------------------------------ |
| event         | e        | 选填           |传入 `event` 函数的 `event` 事件数据，可以通过 `s cli fc-event` 指令快速获取事件数据示例，详细操作参考[这里](https://github.com/devsapp/fc/blob/main/docs/zh/command/invoke.md#注意事项)|
| event-file    | f        | 选填           |以文件形式传入 `event` 事件数据|
| event-stdin   | s        | 选填           |以标准输入形式传入 `event` 事件数据|
| mode          | m        | 选填           |调试模式选择，包括：<br> - `normal`: 默认模式，本地函数运行容器在函数执行完成后立刻退出<br>`server`: 本地函数运行容器一直存在，用户在其他终端发起的本地调用会复用该容器<br>`api`: 支持通过 sdk 调用本地函数|
| config        | c        | 选填           |指定断点调试时使用的 IDE，取值范围：`vscode, pycharm, intellij`|
| debug-port    | d        | 选填           |指定断点调试端口|
| debug-args    | -        | 选填           |断点调试时传入的参数|
| debugger-path | q        | 选填           |自定义断点调试器路径|
| tmp-dir       | -        | 选填           |自定义函数运行环境中 `/tmp` 路径的本机挂载路径，默认为 `./.s/tmp/invoke/serviceName/functionName`/|
| server-port   | -        | 选填           |自定义本地监听 `server` 的端口，默认是在 7000 到 8000 间的随机端口|
| debug         | -        | 选填           | 打开`debug`模式，将会输出更多日志信息                        |
| help          | h        | 选填           | 查看帮助信息                                                 |

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s local invoke `进行本地调试，完成的输出示例：

```
FC Invoke Start RequestId: 0ba8ac3f-abf8-46d4-b61f-8e0f9f265d6a
2021-11-11T05:45:58.027Z 0ba8ac3f-abf8-46d4-b61f-8e0f9f265d6a [INFO] hello world
FC Invoke End RequestId: 0ba8ac3f-abf8-46d4-b61f-8e0f9f265d6a
hello world

RequestId: 0ba8ac3f-abf8-46d4-b61f-8e0f9f265d6a 	 Billed Duration: 146 ms 	 Memory Size: 128 MB 	 Max Memory Used: 23 MB
```


## local start 命令

`local start` 命令，是进行本地 HTTP 函数调试的命令。

当执行命令`local start -h`/`local start --help`时，可以获取帮助文档：

```shell script
Local Start

  Local invoke fc http function 

Usage

  $ s local start <options> 

Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/local.md
                               
Options

  -c, --config [vscode/pycharm/idea]      [Optional] Select which IDE to use when debugging and output related debug config tips for the IDE. value: vscode/pycharm/idea
  -d, --debug-port [number]               [Optional] Specify the sandboxed container starting in debug mode, and exposing this port on localhost 
  --custom-domain                         [Optional] Access in the form of custom domain    
  --debug-args [string]                   [Optional] Additional parameters that will be passed to the debugger    
  --debug-path [string]                   [Optional] The path of the debugger on the host   
  --tmp-dir [string]                      [Optional] The temp directory mounted to '/tmp' , default: './.s/tmp/invoke/serviceName/functionName/'                                                            
  --server-port [number]                  [Optional] The exposed port of http server, default value is the random port between 7000 and 8000
Global Options

  -h, --help                 [Optional] Help for command          
  --debug                    [Optional] Output debug informations 

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/docs/docs/zh/yaml_and_cli.md

Examples with Yaml

  $ s local start --debug-port 9000 --config vscode                                                                 
```

### 参数解析

| 参数全称      | 参数缩写 | Yaml模式下必填 | 参数含义                                                     |
| ------------- | -------- | -------------- | ------------------------------------------------------------ |
| config        | c        | 选填           | 指定断点调试时使用的 IDE，可选：`vscode, pycharm, intellij` |
| debug-port    | d        | 选填           | 指定断点调试端口 |
| custom-domain | -        | 选填           | 以自定义域名作为 HTTP Server 的访问 url |
| debug-args    | -        | 选填           | 断点调试时传入的参数 |
| debugger-path | -        | 选填           | 自定义断点调试器路径 |
| tmp-dir       | -        | 选填           | 自定义函数运行环境中 `/tmp` 路径的本机挂载路径，默认为 `./.s/tmp/invoke/serviceName/functionName/` |
| server-port   | -        | 选填           | 自定义本地监听 HTTP Server 的端口，默认是在 7000 到 8000 间的随机端口 |
| debug         | -        | 选填           | 打开`debug`模式，将会输出更多日志信息                        |
| help          | h        | 选填           | 查看帮助信息                                                 |

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s local start `进行资源部署，部署完成的输出示例：

```text
 	url: http://localhost:7665/2016-08-15/proxy/fc-deploy-service/http-trigger-py36/
	methods: GET
	authType: anonymous

    Tips for more action:
        Start with customDomain method: [s local start auto]
        Debug with customDomain method: [s local start -d 3000 auto]
```

此时，可以根据命令行提示的`url`信息，在浏览器中查看 HTTP 函数本地调试的具体内容。

如果需要通过自定义域名的方式调试 HTTP 函数，则可以在调试时增加`--custom`参数，输出示例：

```
  url: http://localhost:7308/
	methods: GET
	authType: anonymous
```

> 关于自定义域名调试模式以及默认的调试模式区别：在使用函数计算的 HTTP 函数时，是有两个域名组成：
>
> - 系统域名地址，例如`http://localhost:7665/2016-08-15/proxy/fc-deploy-service/http-trigger-py36/`
> - 自定义域名地址，例如`http://abc.com`/
>
> 这两个地址在非 custom runtime 函数中是没有区别的，而对于 custom-runtime/custom-container 函数，这两个地址的核心区别是其`path`不同，例如以传统的 Web 框架为例：
>
> - 系统域名地址的基础路径匹配是：`/2016-08-15/proxy/fc-deploy-service/http-trigger-py36/`
> - 自定义域名地址的基础路径匹配可以是任何形式，包括`/`
>
> 由于路径的不同，所以在代码开发和处理的时候，都会有所不同，如果使用某个 Web 框架（例如 Express、Django 等），匹配的首页地址为`/`，那么使用系统域名地址则可能会出现`404`，这个时候较为推荐使用自定义域名，获得更原生的体验。所以为了满足开发者在系统域名与自定义域名不同模式下的调试需要，本组件支持`--custom`参数进行自定义域名模式调试。
> 如果既要使用 custom-runtime/custom-container 函数，又要使用系统域名，还要不处理系统基础路径，那么可以在发给函数的 HTTP 请求中增加 header: `x-fc-invocation-target: 2016-08-15/proxy/$ServiceName/$functionName` 即可

