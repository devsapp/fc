# Layer 命令

`layer` 命令是进行层操作的命令。

- [命令解析](#命令解析)
- [layer publish 命令](#layer-publish-命令)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [layer list 命令](#layer-list-命令)
  - [参数解析](#参数解析-1)
  - [操作案例](#操作案例-1)
- [layer detail 命令](#layer-detail-命令)
  - [参数解析](#参数解析-2)
  - [操作案例](#操作案例-2)
- [layer versions 命令](#layer-versions-命令)
  - [参数解析](#参数解析-3)
  - [操作案例](#操作案例-3)
- [remove layer 命令](remove.md#remove-layer-命令)
- [权限与策略说明](#权限与策略说明)


## 命令解析

当执行命令`layer -h`/`layer --help`时，可以获取帮助文档：

```shell script
Layer

  Resource layer operation 

Usage

  s layer <sub-command> <options>

Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/layer.md

SubCommand List

  publish        New layer version; help command [s layer publish -h] 
  list           Get layer list; help command [s layer list -h] 
  detail         Get layer versionConfig; help command [s layer detail -h] 
  versions       Get layer versions; help command [s layer verisons -h] 
```

在该命令中，包括了四个子命令：

- [publish：发布层](#layer-publish-命令)
- [list：获取层列表](#layer-list-命令)
- [detail：获取层详情](#layer-detail-命令)
- [versions：获取层版本](#layer-versions-命令)

## layer publish 命令

`layer publish` 命令，是用于层发布的命令。

当执行命令`layer publish -h`/`layer publish --help`时，可以获取帮助文档：

```shell script
Layer publish

  New layer version 

Usage

  s layer publish <options>  

Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/layer.md
                               
Options

  --region [string]             [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1       
  --code string                 [Required] Specify the code parameter               
  --compatible-runtime string   [Optional] Specify the compatibleRuntime parameter  
  --description string          [Optional] Specify the description parameter        
  --layer-name string           [Optional] Specify the layer name parameter         


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

  $ s layer publish --layer-name testName --code ./src 

Examples with CLI

  $ s cli fc layer publish --region cn-hangzhou --layer-name testName --code ./src --compatible-runtime nodejs12,nodejs10,python3 
```

### 参数解析

| 参数全称           | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------------ | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region             | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| code               | -        | 必填           | 必填          | 层的代码                                                     |
| compatible-runtime | -        | 选填           | 选填          | 支持的`runtime`，默认值为`nodejs12,nodejs10,nodejs8,nodejs6,python3,python2.7` |
| description        |          | 选填           | 选填          | 发布层的描述                                                 |
| layer-name         |          | 必填           | 必填          | 层的名字                                                     |
| access             | a        | 选填           | 选填          | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug              | -        | 选填           | 选填          | 打开`debug`模式，将会输出更多日志信息                        |
| help               | h        | 选填           | 选填          | 查看帮助信息                                                 |

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s layer publish`进行层的发布，例如` s layer publish --layer-name demo --code ./code`；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区，例如`s cli fc layer publish --region cn-hangzhou --layer-name demo --code ./code` ；

上述命令的执行结果示例：

```text
fc-deploy-test: 544c887879c38e5d0afcaf8b4f8f348e#demo#1
```


## layer list 命令

`layer list` 命令，是用于获取层列表的命令。

当执行命令`layer list -h`/`layer list --help`时，可以获取帮助文档：

```shell script
Layer list

  Get layer list 

Usage

  s layer list <options>

Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/layer.md
                           
Options

  --region [string]        [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --prefix [string]        [Optional] Specify the prefix parameter    
  --table                  [Optional] Table format output       

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

  $ s layer list          

Examples with CLI

  $ s cli fc layer list --region cn-hangzhou       
```

### 参数解析

| 参数全称 | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| -------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region   | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| prefix   | -        | 选填           | 选填          |                                                              |
| table    | -        | 选填           | 选填          |                                                              |
| access   | a        | 选填           | 选填          | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug    | -        | 选填           | 选填          | 打开`debug`模式，将会输出更多日志信息                        |
| help     | h        | 选填           | 选填          | 查看帮助信息                                                 |

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s layer list`获取层列表；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区，例如`s cli fc layer list --region cn-hangzhou`；

上述命令的执行结果示例：

```text
fc-deploy-test: 
  - 
    layerName:         demo
    arn:               544c887879c38e5d0afcaf8b4f8f348e#demo#1
    version:           1
    description:       
    compatibleRuntime: 
      - nodejs12
      - nodejs10
      - nodejs8
      - nodejs6
      - python3
      - python2.7
```

## layer detail 命令

`layer detail` 命令，是用户获取指定层和版本详情的命令。

当执行命令`layer detail -h`/`layer detail --help`时，可以获取帮助文档：

```shell script
Layer detail

  Get layer version config 

Usage

  s layer detail <options> 
                
Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/layer.md
                           
Options
    
  --region [string]           [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --layer-name [string]       [C-Required] Specify the layer name parameter    
  --version-id [number]       [C-Required] Specify the version parameter                             

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

  $ s layer detail --layer-name layerName --version-id 1 

Examples with CLI

  $ s cli fc layer detail --region cn-hangzhou --layer-name layerName --version-id 1 
```

### 参数解析

| 参数全称   | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ---------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region     | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| layer-name | -        | 必填           | 必填          | 层名称                                                       |
| version-id | -        | 必填           | 必填          | 层版本                                                       |
| access     | a        | 选填           | 选填          | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug      | -        | 选填           | 选填          | 打开`debug`模式，将会输出更多日志信息                        |
| help       | h        | 选填           | 选填          | 查看帮助信息                                                 |

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s layer detail --layer-name layerName --version-id versionId`获取指定层和指定版本详情；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区，例如`s layer detail --layer-name demo --version-id 1 -h`；

上述命令的执行结果示例：

```text
fc-deploy-test: 
  layerName:         demo
  version:           1
  description:       
  code: 
    repositoryType: null
    location:       https://fc-hz-yunqi-func-code.oss-cn-hangzhou-internal.aliyuncs.com/1583208943291465%2Fdemo%2Fdecddf35-8705-4f80-9baa-2c4a9ffc512b?Expires=1636621101&OSSAccessKeyId=&Signature=cZZHNSpeewLXVoFd2%2FdFuLBe4cc%3D
  codesize:          550
  codeChecksum:      17221560529872498506
  createTime:        2021-11-11T08:46:38Z
  acl:               0
  compatibleRuntime: 
    - nodejs12
    - nodejs10
    - nodejs8
    - nodejs6
    - python3
    - python2.7
  arn:               544c887879c38e5d0afcaf8b4f8f348e#demo#1
```

## layer versions 命令

`layer versions` 命令，是获取指定层版本列表的命令。

当执行命令`layer version -h`/`layer versions --help`时，可以获取帮助文档：

```shell script
Layer versions

  Get layer versions 

Usage

  s layer versions <options>
                
Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/layer.md
                           
Options
    
  --region [string]          [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --layer-name [string]      [Required] Specify the layer name parameter   
  --table                    [Optional] Table format output                           

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

  $ s layer versions --layer-name layerName

Examples with CLI

  $ s cli fc layer versions --region cn-hangzhou --layer-name layerName
```

### 参数解析

| 参数全称   | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ---------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region     | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| layer-name | -        | 必填           | 必填          | 层名称                                                       |
| table      | -        | 选填           | 必填          | 是否以表格形式输出                                           |
| access     | a        | 选填           | 选填          | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug      | -        | 选填           | 选填          | 打开`debug`模式，将会输出更多日志信息                        |
| help       | h        | 选填           | 选填          | 查看帮助信息                                                 |

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s layer versions --layer-name layerName`获取指定层中的版本列表；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区，例如`s cli fc layer versions --layer-name layerName --region cn-hangzhou`；

上述命令的执行结果示例：

```text
fc-deploy-test: 
  - 
    layerName:         demo
    arn:               544c887879c38e5d0afcaf8b4f8f348e#demo#1
    version:           1
    description:       
    compatibleRuntime: 
      - nodejs12
      - nodejs10
      - nodejs8
      - nodejs6
      - python3
      - python2.7
```

## 权限与策略说明

- `layer list`、`layer version`与`layer detail` 命令所需要的权限策略： `AliyunFCReadOnlyAccess`

- `layer publish` 命令所需要的权限策略：

  ```yaml
  {
      "Version": "1",
      "Statement": [
          {
              "Action": "fc:CreateLayerVersion",
              "Effect": "Allow",
              "Resource": "acs:fc:<region>:<account-id>:layers/<layerName>/versions/*"
          }
      ]
  }
  ```
