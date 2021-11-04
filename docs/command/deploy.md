# Deploy 命令

`Deploy` 命令是部署函数的命令，即将本地的函数资源以及 `Yaml` 中声明的资源部署到线上。

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
    - [Yaml 配置相关](#yaml-配置相关)
    - [命令使用相关](#命令使用相关)
- [注意事项](#注意事项)
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

  --type string       Only deploy configuration or code. Value: code, config             
  --use-local         Deploy resource using local config               
  --use-remote        Deploy resource using remote config                                 
  -y, --assume-yes    Assume that the answer to any question which would be asked is yes 

Global Options

  -h, --help            Help for command          
  -a, --access          Specify key alias         
  --debug               Output debug informations 

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
| assume-yes | y | 选填 | 在交互时m，默认选择`y` |
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

  --use-local         Deploy resource using local config                                 
  -y, --assume-yes    Assume that the answer to any question which would be asked is yes 

Global Options

  -h, --help            Help for command          
  -a, --access string   Specify key alias         
  --debug               Output debug informations 

Examples with Yaml

  $ s deploy service             
  $ s deploy service --use-local 

```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| use-local | - | 选填 | 使用本地配置进行部署 |
| assume-yes | y | 选填 | 在交互时m，默认选择`y` |
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

`Deploy service` 命令是仅部署函数计算的服务资源。

当我们执行`deploy service -h`/`deploy service --help`命令时，可以获取帮助文档。例如执行`s cli fc deploy service -h`：

```shell script
$ s cli fc deploy service -h

Deploy service

  Only deploy service resources 

Usage

  $ s deploy service <options> 

Options

  --use-local         Deploy resource using local config                                 
  -y, --assume-yes    Assume that the answer to any question which would be asked is yes 

Global Options

  -h, --help            Help for command          
  -a, --access string   Specify key alias         
  --debug               Output debug informations 

Examples with Yaml

  $ s deploy service             
  $ s deploy service --use-local 

```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| use-local | - | 选填 | 使用本地配置进行部署 |
| assume-yes | y | 选填 | 在交互时m，默认选择`y` |
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

## deploy trigger 命令


## deploy domain 命令


## 权限与策略说明

使用该命令时，推荐配置系统策略：`AliyunFCReadOnlyAccess`

## 注意事项

在进行项目部署时，可能会涉及到几个特殊的点：

- **Q:** 如何只更新函数代码？   
  **A:** 在进行业务更新时，如果只更新代码，可以通过增加`type`参数进行，例如`s deploy --type code`；

- **Q:** 如何进行安全更新？    
  **A:** 当业务在其他平台有过更新，或者通过 Serverless Devs 进行首次托管使用，可能会触发安全更新能力，即在更新时会提醒用户使用线上的配置还是使用本地的配置：
    - **use-local**：选择该选项，将会将本地配置强行覆盖线上配置；
    - **use-remote**：将会使用线上配置（即不做任何操作）；

- **Q:** 如果在CI/CD平台/工具上使用？     
  **A:** 在CI/CD平台使用时，可能会涉及到触发一些安全更新提醒，或者其他交互式提醒，此时可以通过`-y`/`--assume-yes`参数来进行配置，例如在某CI/CI平台/工具中，可以执行`s deploy --use-local -y`进行项目部署，以避免交互式对流程的阻塞；
  
- **Q:** 部署时，提醒我代码超过100M，我应该如何处理？
  **A:** 在
