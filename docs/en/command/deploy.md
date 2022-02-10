# Deploy 命令

`deploy` 命令是对函数资源进行部署的命令，即将本地在  [`Yaml` 文件](../yaml.md) 中声明的资源部署到线上。

  - [命令解析](#命令解析)
    - [参数解析](#参数解析)
    - [操作案例](#操作案例)
    - [注意事项](#注意事项)
  - [deploy service 命令](#deploy-service-命令)
    - [参数解析](#参数解析-1)
    - [操作案例](#操作案例-1)
  - [deploy function 命令](#deploy-function-命令)
    - [参数解析](#参数解析-2)
    - [操作案例](#操作案例-2)
  - [deploy trigger 命令](#deploy-trigger-命令)
    - [参数解析](#参数解析-3)
    - [操作案例](#操作案例-3)
  - [deploy domain 命令](#deploy-domain-命令)
    - [参数解析](#参数解析-4)
    - [操作案例](#操作案例-4)
  - [权限与策略说明](#权限与策略说明)

> 关于 [如何部署多个函数](../tips.md#如何部署多个函数) 等问题，请参考 [Tips 文档](../tips.md) 。

## 命令解析

当执行命令`deploy -h`/`deploy --help`时，可以获取帮助文档：

```shell script
Deploy

  Deploy local resources online                                                                

Usage

  $ s deploy <options>
  $ s deploy <sub-command> <options>

Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/deploy.md

Options

  --type [code/config]    [Optional] Only deploy configuration or code, value: code/config                   
  --use-local             [Optional] Deploy resource using local config               
  --use-remote            [Optional] Deploy resource using remote config                                 
  -y, --assume-yes        [Optional] Assume that the answer to any question which would be asked is yes 

Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [string]   	 [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations 

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/docs/docs/zh/yaml_and_cli.md

SubCommand 
  service    Only deploy service resources; help command [s deploy service -h]                                                        
  function   Only deploy function resources; help command [s deploy function -h]                                                       
  trigger    Only deploy trigger resources; help command [s deploy trigger -h]                                                        
  domain     Only deploy domain resources; help command [s deploy domain -h]  

Examples with Yaml

  $ s deploy              
  $ s deploy --use-local 
  $ s deploy --type code

```


在该命令中，包括了四个子命令：

- [service：只部署服务部分](#deploy-service-命令)
- [function：只部署函数部分](#deploy-function-命令)
- [trigger：只部署触发器部分](#deploy-trigger-命令)
- [domain：只部署域名部分](#deploy-domain-命令)


### 参数解析

| 参数全称   | 参数缩写 | Yaml模式下必填 | 参数含义                                                     |
| ---------- | -------- | -------------- | ------------------------------------------------------------ |
| type       | -        | 选填           | 部署类型，可以选择`code, config`                           |
| use-local  | -        | 选填           | 优先使用本地配置进行部署                                     |
| use-remote | -        | 选填           | 优先使用线上配置进行部署                                     |
| assume-yes | y        | 选填           | 在交互时，默认选择`y`                                        |
| access     | a        | 选填           | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug      | -        | 选填           | 打开`debug`模式，将会输出更多日志信息                        |
| help       | h        | 选填           | 查看帮助信息                                                 |

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s deploy `进行资源部署，部署完成的输出示例：


```text
fc-deploy-test: 
  region:   cn-hangzhou
  service: 
    name: fc-deploy-service
  function: 
    name:       http-trigger-py36
    runtime:    python3
    handler:    index.handler
    memorySize: 128
    timeout:    60
  url: 
    system_url:    https://1583208943291465.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/fc-deploy-service/http-trigger-py36/
    custom_domain: 
      - 
        domain: http://http-trigger-py36.fc-deploy-service.1583208943291465.cn-hangzhou.fc.devsapp.net
  triggers: 
    - 
      type: http
      name: httpTrigger
```

### 注意事项

在进行资源部署时，会涉及到一定的特殊情况，可以参考以下描述：

- **只需要部署/更新代码**，可以增加`--type code`参数；只需要部署/更新配置，可以增加`--type config`参数；

- **在部署时可能会涉及到交互式操作**：

  - 当检测到线上的资源与本地所记录的上次部署的资源不一致时，会提醒是否使用线上资源还是使用线下资源；如果不想出现该交互式操作，可以在执行命令时增加`--use-local`/`--use-remote`参数，此时会优先使用本地配置/线上配置，例如：

    | 线上服务 | 线上函数 | 本地记录的服务 | 本地记录的函数 | 本地要部署服务 | 本地要部署函数 | 直接部署 | `use-local`              | `use-remote`                     |
    | -------- | -------- | -------------- | -------------- | -------- |  -------- |  -------- | ------------------------ | ------------------------------------ |
    | 存在     | 存在     | 与线上一致     | 与线上一致     |     -     |      -     | 无交互   | 线上服务与函数将会被更新 | 线上服务与函数不做任何操作           |
    | 存在     | 不存在   | 与线上一致     | -              |     -     |    -     | 无交互   | 线上服务与函数将会被更新 | 线上服务不做任何操作，函数将会被创建 |
    | 不存在   | 不存在   | -              | -              |  -              |  -              | 无交互   | 线上服务与函数将会被更新 | 线上服务与函数将会被创建             |
    | 存在   | 存在   | 与线上不一致   | 与线上不一致   | 与线上一致   | 与线上一致   | 无交互   | 线上服务与函数将会被更新 | 线上服务与函数不做任何操作 |
    | 存在   | 存在   | 与线上不一致   | 与线上不一致   | 与线上不一致   | 与线上不一致   | 有交互   | 线上服务与函数将会被更新 | 线上服务与函数不做任何操作 |


    > 线上服务&线上函数：指的是已经部署过的服务和函数；
    >
    > 本地记录的服务&本地记录的函数：指的是上次在本地执行部署时，所记录的状态，如果是第一次执行，则无状态被记录；

    **功能设计初衷**：由于某些业务在部署/更新时，涉及到团队多人操作，如果默认本地配置强制覆盖线上配置，可能导致通过其他途径/客户端进行更新的内容失效，为了更加安全、规范的更新函数资源，所以引入了线上配置异常感知的能力。

    > 在进行部署时，交互的形式示例如下：
    >
    > ```
    > Local Last Deploy status => Online status
    > 
    > description: "this is a test" => "this is a test console"
    > 
    > ? Remote function: http-trigger-py36 is inconsistent with the config you deployed last time, deploy it with local config or remote
    > config? (Use arrow keys)
    > ❯ use local 
    > use remote 
    > ```
    >
    > 此时表示，本地上次部署之后，到本地部署之间，线上的函数资源被通过其他的途径修改过，修改的内容是`description`，上次部署时的内容是`this is a test`，现在线上的配置是`this is a test console`，如果选择：
    >
    > - `use local`：将会默认使用本地最新的配置，进行覆盖线上的配置的；
    > - `use remote`：将不会对这一部分做更新操作；

  - 当部署时，检测到一些额外的配置需要添加到流程中时，会提醒是否要添加配置等；例如，Python语言的项目，在部署之前进行了`s build`操作，在部署的时候涉及到将部分依赖路径放入环境变量中，以助于依赖的生效；如果此时不想出现交互式操作，可以增加`-y`/`--assume-yes`参数；

  > 在CI/CD工具/平台进行项目部署时，为了避免交互式操作带来的影响，可以按需考虑使用`--use-local`/`use-remote`和`-y`/`--assume-yes`参数组合，例如在明确优先使用本地配置，且默认同意所有额外操作时，可以通过`s deploy --use-local -y`进行资源部署。

  > ⚠️ 注意：在进行函数部署时，如果域名配置为`auto`，系统会默认分配测试域名，该域名仅供测试使用，不对其稳定性等做保证，Serverless Devs FC 组件在日后有权对该域名进行回收等处理，如是线上业务，生产需求业务，强烈建议绑定自己的自定义域名。

## deploy service 命令

`deploy service` 命令，是部署服务资源的命令。

当执行命令`deploy service -h`/`deploy service --help`时，可以获取帮助文档：

```shell script
Deploy service

  Only deploy service resources 

Usage

  $ s deploy service <options> 

Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/deploy.md

Options

  --use-local         [Optional] Deploy resource using local config
  --use-remote        [Optional] Deploy resource using remote config     
  -y, --assume-yes    [Optional] Assume that the answer to any question which would be asked is yes 

Global Options

  -h, --help                 Help for command          
  -a, --access [string]      Specify key alias         
  --debug                    Output debug informations 

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/docs/docs/zh/yaml_and_cli.md

Examples with Yaml

  $ s deploy service             
  $ s deploy service --use-local 

```

### 参数解析

| 参数全称    | 参数缩写 | Yaml模式下必填 | 参数含义                                                     |
| ----------- | -------- | -------------- | ------------------------------------------------------------ |
| use-local   | -        | 选填           | 优先使用本地配置进行部署                                     |
| user-remote | -        | 选填           | 优先使用线上配置进行部署                                     |
| assume-yes  | y        | 选填           | 在交互时，默认选择`y`                                        |
| access      | a        | 选填           | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug       | -        | 选填           | 打开`debug`模式，将会输出更多日志信息                        |
| help        | h        | 选填           | 查看帮助信息                                                 |

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s deploy service `进行服务的部署，部署完成的输出示例：

```text
fc-deploy-test: 
  region:  cn-hangzhou
  service: 
    name: fc-deploy-service
```

> 在进行服务资源部署时，可能会涉及到交互式操作，相关的描述参考[ deploy 命令 注意事项](#注意事项) 中的`在部署时可能会涉及到交互式操作`。

## deploy function 命令

`deploy function` 命令，是部署函数的命令。

当执行命令`deploy function -h`/`deploy function --help`时，可以获取帮助文档：

```shell script
$ s cli fc deploy function -h

Deploy function

  Only deploy function resources 

Usage

  $ s deploy function <options> 

Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/deploy.md

Options

  --type [code/config]    [Optional] Only deploy configuration or code, value: code/config              
  --use-local             [Optional] Deploy resource using local config    
  --use-remote            [Optional] Deploy resource using remote config                              
  -y, --assume-yes        [Optional] Assume that the answer to any question which would be asked is yes 

Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [aliasName]   [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations 

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/docs/docs/zh/yaml_and_cli.md

Examples with Yaml

  $ s deploy function             
  $ s deploy function --use-local 

```

### 参数解析

| 参数全称    | 参数缩写 | Yaml模式下必填 | 参数含义                                                     |
| ----------- | -------- | -------------- | ------------------------------------------------------------ |
| type        | -        | 选填           | 部署类型，可以选择`code, config`                           |
| use-local   | -        | 选填           | 使用本地配置进行部署                                         |
| user-remote | -        | 选填           |                                                              |
| skip-push | -        | 选填           |  跳过自动推送镜像   |
| assume-yes  | y        | 选填           | 在交互时，默认选择`y`                                        |
| access      | a        | 选填           | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug       | -        | 选填           | 打开`debug`模式，将会输出更多日志信息                        |
| help        | h        | 选填           | 查看帮助信息                                                 |

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s deploy function `进行函数的部署，部署完成的输出示例：

```text
fc-deploy-test: 
  region:   cn-hangzhou
  service: 
    name: fc-deploy-service
  function: 
    name:       http-trigger-py36
    runtime:    python3
    handler:    index.handler
    memorySize: 128
    timeout:    60
```

> 在进行函数资源部署时，可能会涉及到交互式操作，相关的描述参考[ deploy 命令 注意事项](#注意事项) 。


## deploy trigger 命令

`deploy trigger` 命令，是部署函数触发器的命令。

当执行命令`deploy trigger -h`/`deploy trigger --help`时，可以获取帮助文档：

```shell script
$ s cli fc deploy trigger -h

Deploy trigger

  Only deploy trigger resources 

Usage

  $ s deploy trigger <options> 

Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/deploy.md

Options

  --trigger-name [string]        [Optional] Only deploy the specified trigger, multiple triggers can be specified using [--trigger-name name1 --trigger-name name2]                    
  --use-local                    [Optional] Deploy resource using local config            
  --use-remote                   [Optional] Deploy resource using remote config                                 
  -y, --assume-yes               [Optional] Assume that the answer to any question which would be asked is yes            

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

  $ s deploy trigger             
  $ s deploy trigger --use-local 
  $ s deploy trigger --trigger-name name1 --trigger-name name2
```

### 参数解析

| 参数全称     | 参数缩写 | Yaml模式下必填 | 参数含义                                                     |
| ------------ | -------- | -------------- | ------------------------------------------------------------ |
| trigger-name | -        | 选填           | 仅部署指定的触发器名称 |
| use-local    | -        | 选填           | 使用本地配置进行部署                                         |
| user-remote  | -        | 选填           |                                                              |
| assume-yes   | y        | 选填           | 在交互时，默认选择`y`                                        |
| access       | a        | 选填           | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug        | -        | 选填           | 打开`debug`模式，将会输出更多日志信息                        |
| help         | h        | 选填           | 查看帮助信息                                                 |

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s deploy trigger `进行触发器的部署，部署完成的输出示例：

```text
fc-deploy-test: 
  region:   cn-hangzhou
  service: 
    name: fc-deploy-service
  function: 
    name:       http-trigger-py36
  url: 
    system_url: https://1583208943291465.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/fc-deploy-service/http-trigger-py36/
  triggers: 
    - 
      type: http
      name: httpTrigger
```

> 在进行服务资源部署时，可能会涉及到交互式操作，相关的描述参考[ deploy 命令 注意事项](#注意事项) 中的`在部署时可能会涉及到交互式操作`。

单独部署某个指定的触发器，可以通过增加`--trigger-name`参数实现，参考命令：

```
$ s deploy trigger --trigger-name httpTrigger
```

## deploy domain 命令

`deploy domain` 命令，是部署自定义域名的命令。

当执行命令`deploy domain -h`/`deploy domain --help`时，可以获取帮助文档：

```shell script
$ s cli fc deploy domain -h

Deploy domain

  Only deploy domain resources 

Usage

  $ s deploy domain <options> 

Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/deploy.md

Options

  --domain [string]   [Optional] Only deploy the specified domain, multiple domains can be specified using [--domain domain1 --domain domain2]   
  --use-local         [Optional] Deploy resource using local config    
  --use-remote        [Optional] Deploy resource using remote config                              
  -y, --assume-yes    [Optional] Assume that the answer to any question which would be asked is yes 

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

  $ s deploy domain 
```

### 参数解析

| 参数全称    | 参数缩写 | Yaml模式下必填 | 参数含义                                                     |
| ----------- | -------- | -------------- | ------------------------------------------------------------ |
| domain      | -        | 选填           | 仅操作指定域名 |
| use-local   | -        | 选填           | 使用本地配置进行部署 |
| user-remote | -        | 选填           | 使用线上配置 |
| assume-yes  | y        | 选填           | 在交互时，默认选择`y`                                        |
| access      | a        | 选填           | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug       | -        | 选填           | 打开`debug`模式，将会输出更多日志信息                        |
| help        | h        | 选填           | 查看帮助信息                                                 |

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s deploy domain `进行自定义域名的部署，部署完成的输出示例：

```text
fc-deploy-test: 
  region:   cn-hangzhou
  service: 
    name: fc-deploy-service
  function: 
    name:       http-trigger-py36
  url: 
    custom_domain: 
      - 
        domain: http://http-trigger-py36.fc-deploy-service.1583208943291465.cn-hangzhou.fc.devsapp.net
```

> 在进行服务资源部署时，可能会涉及到交互式操作，相关的描述参考[ deploy 命令 注意事项](#注意事项) 中的`在部署时可能会涉及到交互式操作`。

单独部署某个指定的自定义域名，可以通过增加`--domain`参数实现，参考命令：

```
$ s deploy domain --domain http-trigger-py36.fc-deploy-service.1583208943291465.cn-hangzhou.fc.devsapp.net
```

## 权限与策略说明

`deploy`命令的权限，更多是和 Yaml 中所配置的参数有一定的关系，所以此处可以参考 [Yaml 规范文档](../yaml.md) 中关于不同字段与权限的配置。
