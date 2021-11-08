# Deploy 命令

`deploy` 命令是部署函数的命令，即将本地的函数资源以及 [`Yaml` 文件](../yaml.md)中声明的资源部署到线上。

- [命令解析](#命令解析)
    - [参数解析](#参数解析)
    - [操作案例](#操作案例)
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

> 关于 `deploy` 命令的常见问题和解决方法，可以参考[ FC 组件自动问答系统](http://qa.devsapp.cn/fc?type=deploy ) 。

## 命令解析

当我们执行`deploy -h`/`deploy --help`命令时，可以获取帮助文档。例如执行`s cli fc deploy -h`：

```shell script
$ s cli fc deploy -h

Deploy

  Deploy local resources online.                                                                 

Usage

  $ s deploy <options>
  $ s deploy <sub-command> <options>

Document
  
  https://github.com/devsapp/fc/blob/main/docs/command/deploy.md

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

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| type | - | 选填 | 部署类型，可以选择`code`, `config`  |
| use-local | - | 选填 | 使用本地配置进行部署 |
| use-remote | - | 选填 | 优先使用线上配置进行部署 |
| assume-yes | y | 选填 | 在交互时，默认选择`y` |
| access | a | 选填 | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug | - | 选填 | 打开`debug`模式，将会输出更多日志信息 |
| help | h | 选填 | 查看帮助信息 |


### 操作案例

如果当前 Serverless 应用，使用了函数计算（FC），此时，可以通过执行`s deploy`进行项目部署：

```text
$ s deploy

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

## deploy service 命令

`Deploy service` 命令是仅部署函数计算的服务资源。

当我们执行`deploy service -h`/`deploy service --help`命令时，可以获取帮助文档。例如执行`s cli fc deploy service -h`：

```shell script
$ s cli fc deploy service -h

Deploy service

  Only deploy service resources 

Usage

  $ s deploy service <options> 

Options

  --use-local         [Optional] Deploy resource using local config                                 
  -y, --assume-yes    [Optional] Assume that the answer to any question which would be asked is yes 

Global Options

  -h, --help                 Help for command          
  -a, --access [aliasName]   Specify key alias         
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

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| use-local | - | 选填 | 使用本地配置进行部署 |
| assume-yes | y | 选填 | 在交互时，默认选择`y` |
| access | a | 选填 | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug | - | 选填 | 打开`debug`模式，将会输出更多日志信息 |
| help | h | 选填 | 查看帮助信息 |

### 操作案例

如果当前 Serverless 应用，使用了函数计算（FC），此时，可以通过执行`s deploy service`进行项目部署：

```text
$ s deploy service

fc-deploy-test: 
  region:  cn-hangzhou
  service: 
    name: fc-deploy-service
``` 

## deploy function 命令

`Deploy function` 命令是仅部署函数计算的函数资源。

当我们执行`deploy function -h`/`deploy function --help`命令时，可以获取帮助文档。例如执行`s cli fc deploy service -h`：

```shell script
$ s cli fc deploy function -h

Deploy function

  Only deploy function resources 

Usage

  $ s deploy function <options> 

Options

  --type [code/config]    [Optional] Only deploy configuration or code, value: code/config              
  --use-local             [Optional] Deploy resource using local config                                 
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

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| type | - | 选填 | 部署类型，可以选择`code`, `config`  |
| use-local | - | 选填 | 使用本地配置进行部署 |
| assume-yes | y | 选填 | 在交互时，默认选择`y` |
| access | a | 选填 | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug | - | 选填 | 打开`debug`模式，将会输出更多日志信息 |
| help | h | 选填 | 查看帮助信息 |

### 操作案例

如果当前 Serverless 应用，使用了函数计算（FC），此时，可以通过执行`s deploy function`进行项目部署：

```text
$ s deploy function

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

## deploy trigger 命令

`Deploy trigger` 命令是仅部署函数计算的触发器资源。

当我们执行`deploy trigger -h`/`deploy trigger --help`命令时，可以获取帮助文档。例如执行`s cli fc deploy trigger -h`：

```shell script
$ s cli fc deploy trigger -h

Deploy trigger

  Only deploy trigger resources 

Usage

  $ s deploy trigger <options> 

Options

  --trigger-name [triggerName]   [Optional] Only deploy the specified trigger, multiple triggers can be specified using [--trigger-name name1 --trigger-name name2]                    
  --use-local                    [Optional] Deploy resource using local config                                            
  -y, --assume-yes               [Optional] Assume that the answer to any question which would be asked is yes            

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

  $ s deploy trigger             
  $ s deploy trigger --use-local 
  $ s deploy trigger --trigger-name name1 --trigger-name name2
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| trigger-name | - | 选填 | 触发器名称  |
| use-local | - | 选填 | 使用本地配置进行部署 |
| assume-yes | y | 选填 | 在交互时，默认选择`y` |
| access | a | 选填 | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug | - | 选填 | 打开`debug`模式，将会输出更多日志信息 |
| help | h | 选填 | 查看帮助信息 |

### 操作案例

如果当前 Serverless 应用，使用了函数计算（FC），此时，可以通过执行`s deploy trigger`进行项目部署：

```text
$ s deploy trigger

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

如果想要部署某个指定的触发器，可以通过`--trigger-name`进行指定，例如`s deploy trigger --trigger-name httpTrigger`进行项目部署：

```text
$ s deploy trigger

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

## deploy domain 命令

`Deploy domain` 命令是仅部署函数计算的自定义域名资源。

当我们执行`deploy domain -h`/`deploy domain --help`命令时，可以获取帮助文档。例如执行`s cli fc deploy domain -h`：

```shell script
$ s cli fc deploy domain -h

Deploy domain

  Only deploy domain resources 

Usage

  $ s deploy domain <options> 

Options

  --domain [domain]   [Optional] Only deploy the specified domain, multiple domains can be specified using [--domain domain1 --domain domain2]   
  --use-local         [Optional] Deploy resource using local config                                 
  -y, --assume-yes    [Optional] Assume that the answer to any question which would be asked is yes 

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

  $ s deploy domain 
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| domain | - | 选填 | 域名  |
| use-local | - | 选填 | 使用本地配置进行部署 |
| assume-yes | y | 选填 | 在交互时，默认选择`y` |
| access | a | 选填 | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug | - | 选填 | 打开`debug`模式，将会输出更多日志信息 |
| help | h | 选填 | 查看帮助信息 |

### 操作案例

如果当前 Serverless 应用，使用了函数计算（FC），此时，可以通过执行`s deploy domain`进行项目部署：

```text
$ s deploy domain

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

如果想要部署某个指定的触发器，可以通过`--domain`进行指定，例如`s deploy domain --domain http-trigger-py36.fc-deploy-service.1583208943291465.cn-hangzhou.fc.devsapp.net`进行项目部署：

```text
$ s deploy trigger

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

## 权限与策略说明

`deploy`命令的权限，更多是和 Yaml 中所配置的参数有一定的关系，所以此处可以参考 [Yaml 规范文档](../yaml.md) 中关于不同字段与权限的配置。
