# Alias 命令

`alias` 命令是用户进行函数别名操作的命令，主要包括别名的查看、发布以及修改功能。

- [命令解析](#命令解析)
- [version get 命令](#version-get-命令)
    - [参数解析](#参数解析)
    - [操作案例](#操作案例)
- [version list 命令](#version-list-命令)
    - [参数解析](#参数解析-1)
    - [操作案例](#操作案例-1)
- [version publish 命令](#version-publish-命令)
    - [参数解析](#参数解析-2)
    - [操作案例](#操作案例-2)
- [权限与策略说明](#权限与策略说明)

> 关于 `alias` 命令的常见问题和解决方法，可以参考[ FC 组件自动问答系统](http://qa.devsapp.cn/fc?type=alias ) 。

## 命令解析

当我们执行`alias -h`/`alias --help`命令时，可以获取帮助文档。例如执行`s cli fc alias -h`：

```shell script
$ s cli fc version -h

Alias

  Service alias operation 

Usage

  s alias <sub-command> <options>

Document
  
  https://github.com/devsapp/fc/blob/main/docs/command/alias.md

SubCommand List

  get       Get alias details; help command [s alias get -h]               
  list      View the list of service alias; help command [s alias list -h] 
  publish   Publish service alias; help command [s alias publish -h]  
```


在该命令中，包括了三个子命令：
- [get：查看别名详情](#alias-get-命令)
- [list：查看别名列表](#alias-list-命令)
- [publish：发布/更新别名](#alias-publish-命令)

## alias get 命令

`alias get` 命令是用户进行函数计算服务版本发布的命令。

当我们执行`alias get -h`/`alias get --help`命令时，可以获取帮助文档。例如执行`s cli fc alias get -h`：

```shell script
$ s cli fc alias get -h

Alias get

  Get alias details 

Usage

  s alias get <options> 
                               
Options

  --region [region]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [serviceName]        [C-Required] Specify the fc service name  
  --alias-name [aliasName]            [Required] Specify the fc alias name 

Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [aliasName]   [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations 

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/yaml_and_cli.md

Examples with Yaml

  $ s version list 

Examples with CLI

  $ s cli fc version list --region cn-hangzhou --service-name name 
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| region | - | 选填 | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | - | 选填 | 服务名 |
| alias-name | - | 必填 | 别名 |
| access | a | 选填 | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug | - | 选填 | 打开`debug`模式，将会输出更多日志信息 |
| help | h | 选填 | 查看帮助信息 |

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s <ProjectName> alias get --alias-name aliasName`或者`s alias --alias-name aliasName`：
    ```text
    $ s alias get --alias-name pre
    
    fc-deploy-test: 
      aliasName:               pre
      versionId:               1
      description:             test publish version
      additionalVersionWeight: 
      createdTime:             2021-11-08T06:51:36Z
      lastModifiedTime:        2021-11-08T06:54:02Z
    ``` 
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，例如：
    ```text
    $ s cli fc alias get --region cn-hangzhou --service-name fc-deploy-service --alias-name pre
    
    fc-deploy-test: 
      aliasName:               pre
      versionId:               1
      description:             test publish version
      additionalVersionWeight: 
      createdTime:             2021-11-08T06:51:36Z
      lastModifiedTime:        2021-11-08T06:54:02Z
    ```
  
## alias list 命令

`alias list` 命令是用户进行函数计算服务别名列表查询的命令。

当我们执行`alias list -h`/`alias list --help`命令时，可以获取帮助文档。例如执行`s cli fc alias list -h`：

```shell script
$ s cli fc version alias -h

Alias list

  View the list of service alias 

Usage

  s alias list <options>   
                               
Options

  --region [region]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [serviceName]        [C-Required] Specify the fc service name  
  --table                             [Optional] Table format output     

Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [aliasName]   [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations 

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/yaml_and_cli.md

Examples with Yaml

  $ s alias list 

Examples with CLI

  $ s cli fc alias list --region cn-hangzhou --service-name name
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| region | - | 选填 |地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | - | 选填 |服务名 |
| table | - | 选填 | 是否以表格形式输出 |
| access | a | 选填 | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug | - | 选填 | 打开`debug`模式，将会输出更多日志信息 |
| help | h | 选填 | 查看帮助信息 |

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s <ProjectName> alias list`或者`s alias list`：
    ```text
    $ s alias list
    
    fc-deploy-test: 
      - 
        aliasName:               pre
        versionId:               1
        description:             test publish version
        additionalVersionWeight: 
        createdTime:             2021-11-08T06:51:36Z
        lastModifiedTime:        2021-11-08T06:54:02Z
    ``` 
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，例如：
    ```text
    $ s cli fc alias list --region cn-hangzhou --service-name fc-deploy-service --table
    
      ┌───────────┬───────────┬──────────────────────┬──────────────────────┬──────────────────────┬─────────────────────────┐
      │ aliasName │ versionId │     description      │     createdTime      │   lastModifiedTime   │ additionalVersionWeight │
      ├───────────┼───────────┼──────────────────────┼──────────────────────┼──────────────────────┼─────────────────────────┤
      │ pre       │ 1         │ test publish version │ 2021-11-08T06:51:36Z │ 2021-11-08T06:54:02Z │                         │
      └───────────┴───────────┴──────────────────────┴──────────────────────┴──────────────────────┴─────────────────────────┘
    ```

## alias publish 命令

`alias publish` 命令是用户进行函数计算服务版本发布的命令。

当我们执行`alias publish -h`/`alias publish --help`命令时，可以获取帮助文档。例如执行`s cli fc version alias -h`：

```shell script
$ s cli fc alias publish -h

Alias publish

  Publish service alias 

Usage

  s alias publish <options>  
                               
Options

  --region [region]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [serviceName]        [C-Required] Specify the fc service name  
  --description [descriptionContent]  [Optional] Specify the description     
  --alias-name [aliasName]            [C-Required] Specify the fc alias name                   
  --gversion [gversionString]         [Optional] The grayscale version id parameter  
  --version-id [versionId]            [C-Required] The version parameter               
  --weight [weightNumber]             [Optional] The weight parameter 

Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [aliasName]   [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations 

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/yaml_and_cli.md

Examples with Yaml

  $ s alias publish --alias-name pre --version-id 2                             
  $ s alias publish --description xxx --alias-name pre --version-id 2 --gversion 3 --weight 20                                                      

Examples with CLI

  $ s cli fc alias publish --region cn-hangzhou --service-name name --alias-name pre --version-id 2 
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| region | - | 选填 |地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | - | 选填 |服务名 |
| description | - | 选填 | 别名描述 |
| alias-name | - | 必填 | 别名 |
| gversion | - | 选填 | 灰度版本Id |
| version-id | - | 必填 | 版本Id |
| weight | - | 选填 | 权重 |
| access | a | 选填 | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug | - | 选填 | 打开`debug`模式，将会输出更多日志信息 |
| help | h | 选填 | 查看帮助信息 |

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s <ProjectName> alias publish`或者`s alias publish`：
    ```text
    $ s alias publish --alias-name pre --version-id 1
    
    fc-deploy-test: 
      aliasName:               pre
      versionId:               1
      description:             
      additionalVersionWeight: 
      createdTime:             2021-11-08T06:51:36Z
      lastModifiedTime:        2021-11-08T06:51:36Z
    ``` 
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，例如：
    ```text
    $  s cli fc alias publish --region cn-hangzhou --service-name fc-deploy-service --description "test publish version" --alias-name pre --version-id 1
    
    fc-deploy-test: 
      aliasName:               pre
      versionId:               1
      description:             test publish version
      additionalVersionWeight: 
      createdTime:             2021-11-08T06:51:36Z
      lastModifiedTime:        2021-11-08T06:54:02Z
    ``` 

  
## 权限与策略说明

- `alias list` 与 `alias get` 命令所需要的权限策略： `AliyunFCReadOnlyAccess`
- `alias publish` 命令所需要的权限策略：
    ```yaml
    {
        "Version": "1",
        "Statement": [
            {
                "Action": [
                    "fc:CreateAlias",
                    "fc:UpdateAlias"
                ],
                "Effect": "Allow",
                "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>/aliases/*"
            }
        ]
    }
    ```
