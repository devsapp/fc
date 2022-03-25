---
title: Remove 命令
description: 'Remove 命令'
position: 3
category: '构建&部署'
---

# Remove 命令

`remove` 命令是对已经部署的资源进行移除的操作。

- [命令解析](#命令解析)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [remove service 命令](#remove-service-命令)
  - [参数解析](#参数解析-1)
  - [操作案例](#操作案例-1)
- [remove function 命令](#deploy-function-命令)
  - [参数解析](#参数解析-2)
  - [操作案例](#操作案例-2)
- [remove trigger 命令](#remove-trigger-命令)
  - [参数解析](#参数解析-3)
  - [操作案例](#操作案例-3)
- [remove domain 命令](#remove-domain-命令)
  - [参数解析](#参数解析-4)
  - [操作案例](#操作案例-4)
- [remove version 命令](#remove-version-命令)
  - [参数解析](#参数解析-5)
  - [操作案例](#操作案例-5)
- [remove alias 命令](#remove-alias-命令)
  - [参数解析](#参数解析-6)
  - [操作案例](#操作案例-6)
- [remove provision 命令](#remove-provision-命令)
  - [参数解析](#参数解析-7)
  - [操作案例](#操作案例-7)
- [remove ondemand 命令](#remove-ondemand-命令)
  - [参数解析](#参数解析-8)
  - [操作案例](#操作案例-8)
- [remove layer 命令](#remove-layer-命令)
  - [参数解析](#参数解析-9)
  - [操作案例](#操作案例-9)
- [权限与策略说明](#权限与策略说明)

>  ⚠️ 注意： **值得注意的是，资源一旦移除可能无法恢复，所以在使用移除功能时，请您慎重操作**


## 命令解析

当执行命令`remove -h`/`remove --help`时，可以获取帮助文档。


在该命令中，包括了九个子命令：

- [service：删除指定的服务](#remove-service-命令)
- [function：删除指定的函数](#remove-function-命令)
- [trigger：删除指定的触发器](#remove-trigger-命令)
- [domain：删除指定的域名](#remove-domain-命令)
- [version：删除指定的版本](#remove-version-命令)
- [alias：删除指定的别名](#remove-alias-命令)
- [provision：删除指定的预留资源](#remove-provision-命令)
- [ondemand：删除指定的按量资源](#remove-ondemand-命令)
- [layer：删除指定层的版本](#remove-layer-命令)


### 参数解析

| 参数全称   | 参数缩写 | Yaml模式下必填 | 参数含义                                                     |
| ---------- | -------- | -------------- | ------------------------------------------------------------ |
| assume-yes | y        | 选填           | 在交互时，默认选择`y`                                        |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s remove `进行资源删除，部署完成的输出示例：

```text
Service [myService] deleted successfully.
Function [myFunction] deleted successfully.
```

> ⚠️ 注意：    
> - 执行`s remove`等同于依次执行 `s remove ondemand`、`s remove provision`、`s remove alias`、`s remove version`、`s remove trigger`、`s remove function`、`s remove service`；
> - 如果使用了参数`-y`/`--assume-yes`，那么就会无交互式的**强制删除**服务下**所有的资源**，请谨慎使用此参数；     
> 案例：假如在上海地区有一个服务，服务下有两个函数，Yaml 中仅配置了服务和其中一个函数
> - 如果执行了 `s remove`，则会提示此服务下两个函数，是否删除所有的函数；
> - 如果执行 `s remove -y`，会强制删除两个函数和服务；
> - 如果只想删除当前 Yaml 声明的函数，那么可以执行 `s remove function`

## remove service 命令

`remove service` 命令，是删除指定服务的命令。

当执行命令`remove service -h`/`remove service --help`时，可以获取帮助文档。

### 参数解析

| 参数全称     | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------ | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region       | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | -        | 选填           | 必填          | 服务名                                                       |
| assume-yes   | y        | 选填           | 选填          | 在交互时，默认选择`y`                                                       |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s remove service`删除指定的服务；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，例如`s cli fc remove service --region cn-hangzhou --service-name fc-deploy-service`；

上述命令的执行结果示例：

```text
Service [fc-deploy-service] deleted successfully.
```

## remove function 命令

`remove function` 命令，是删除指定函数的命令。

当执行命令`remove function -h`/`remove function --help`时，可以获取帮助文档。

### 参数解析

| 参数全称     | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------ | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region       | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | -        | 选填           | 必填          | 服务名                                                       |
| function-name | -        | 选填           | 必填          | 函数名                                                       |
| assume-yes   | y        | 选填           | 选填          | 在交互时，默认选择`y`                                                       |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s remove function`删除指定的函数；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，例如`s cli fc remove function --region cn-hangzhou --service-name fc-deploy-service --function-name fc-deploy-function`；

上述命令的执行结果示例：

```text
Function [fc-deploy-function] deleted successfully.
```

## remove trigger 命令

`remove trigger` 命令，是删除指定触发器的命令。

当执行命令`remove trigger -h`/`remove trigger --help`时，可以获取帮助文档。

### 参数解析

| 参数全称     | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------ | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region       | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | -        | 选填           | 必填          | 服务名                                                       |
| function-name | -        | 选填           | 必填          | 函数名                                                       |
| trigger-name | -        | 选填           | 必填          | 触发器名                                                       |
| assume-yes   | y        | 选填           | 选填          | 在交互时，默认选择`y`                                                       |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s remove trigger`删除 Yaml 中声明的所有触发器，可以通过增加`--trigger-name triggerName`删除指定的触发器；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，例如`s cli fc remove trigger --region cn-hangzhou --service-name fc-deploy-service --function-name fc-deploy-function --trigger-name fc-deploy-trigger`；

上述命令的执行结果示例：

```text
Trigger [fc-deploy-trigger] deleted successfully.
```

## remove domain 命令

`remove domain` 命令，是删除指定自定义域名的命令。

当执行命令`remove domain -h`/`remove domain --help`时，可以获取帮助文档。

### 参数解析

| 参数全称     | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------ | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region       | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| domain-name | -        | 选填           | 必填          | 自定义域名                                                       |
| assume-yes   | y        | 选填           | 选填          | 在交互时，默认选择`y`                                                       |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s remove domain`删除 Yaml 中声明的所有自定义域名，可以通过增加`--domain domain`删除指定的自定义域名；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，例如`s cli fc remove domain --region cn-hangzhou --domain anycodes.cn`；

上述命令的执行结果示例：

```text
Custom domain [anycodes.cn] deleted successfully.
```

## remove version 命令

`remove version` 命令，是用户删除指定已发布的版本命令。

当执行命令`remove version -h`/`remove version --help`时，可以获取帮助文档。

### 参数解析

| 参数全称     | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------ | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region       | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | -        | 选填           | 必填          | 服务名                                                       |
| version-id   | -        | 必填           | 必填          | 版本Id                                                       |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s remove version --version-id versionId`删除指定`versionId`的版本；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，例如`s cli fc remove version --region cn-hangzhou --service-name fc-deploy-service --version-id 1`；

上述命令的执行结果示例：

```text
VersionId [1] deleted successfully.
```



## remove alias 命令

`remove alias` 命令，是删除指定服务别名的命令。

当执行命令`remove alias -h`/`remove alias --help`时，可以获取帮助文档。

### 参数解析

| 参数全称     | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------ | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region       | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | -        | 选填           | 必填          | 服务名                                                       |
| alias-name   | -        | 必填           | 必填          | 别名                                                         |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s remove alias --alias-name aliasName`删除指定别名；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，例如`s cli fc remove alias --region cn-hangzhou --service-name fc-deploy-service --alias-name pre`；

上述命令的执行结果示例：

```text
AliasName [pre] deleted successfully.
```


## remove provision 命令

`remove provision` 命令，是删除预留资源的命令。

当执行命令`remove provision -h`/`remove provision --help`时，可以获取帮助文档。

### 参数解析

| 参数全称      | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region        | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name  | -        | 选填           | 必填          | 服务名                                                       |
| function-name | -        | 选填           | 选填          | 函数名称，需配合 qualifier 一起使用 |
| qualifier     |          | 选填           | 选填          | 服务的版本或者别名，版本仅支持 LATEST。如果指定`qualifier`，则仅清除此`qualifier`下的预留资源；如果未指定，将清除此服务下所有版本的预留资源                   |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s remove provision --qualifier qualifier`删除预留实例；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，例如`s cli fc remove provision --region cn-hangzhou --service-name fc-deploy-service --qualifier release`；

上述命令的执行结果示例：

```text
Proivision qualifier [release] deleted successfully.
```


## remove ondemand 命令

`remove ondemand` 命令，是删除指定函数按量资源的命令。

当执行命令`remove ondemand -h`/`remove ondemand --help`时，可以获取帮助文档。

### 参数解析

| 参数全称      | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region        | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name  | -        | 选填           | 必填          | 服务名                                                       |
| function-name | -        | 选填           | 选填          | 函数名称，需配合 qualifier 一起使用 |
| qualifier     | -        | 选填           | 选填          | 服务的版本或者别名，版本仅支持 LATEST；如果指定`qualifier`，则仅清除此`qualifier`下的按量资源；如果未指定，将清除此服务下所有版本的按量资源 |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s remove ondemand`删除指定按量资源；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，例如`s cli fc remove ondemand`；

上述命令的执行结果示例：

```text
Ondemand [*] deleted successfully.
```


## remove layer 命令

`remove layer` 命令，是删除指定层版本的命令。

当执行命令`remove layer -h`/`remove layer --help`时，可以获取帮助文档。

### 参数解析

| 参数全称   | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ---------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region     | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| layer-name | -        | 选填           | 必填          | 层名称                                                       |
| version-id | -        | 选填           | 选填          | 指定层版本。如果指定--version-id，仅删除指定的版本；否则删除层的所有的版本 |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s remove layer --layer-name layerName`删除层的所有版本；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区，例如`s cli fc remove layer --region cn-hangzhou --layer-name demo`；

上述命令的执行结果示例：

```text
Layer [demo] deleted successfully.
```

## 权限与策略说明

- `s remove`/`s remove service`：
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
- `s remove function`：
    ````json
    {
        "Statement": [
            {
                "Action": [
                    "fc:ListTriggers",
                    "fc:DeleteTrigger",
                    "fc:DeleteFunction"
                ],
                "Effect": "Allow",
                "Resource": "*"
            }
        ],
        "Version": "1"
    }
    ````
- `s remove trigger`：
    ````json
    {
        "Statement": [
            {
                "Action": [
                    "fc:DeleteTrigger"
                ],
                "Effect": "Allow",
                "Resource": "*"
            }
        ],
        "Version": "1"
    }
    ````
- `s remove version`：
    系统策略：`AliyunFCReadOnlyAccess`   
    ```json
    {
        "Version": "1",
        "Statement": [
            {
                "Action": "fc:DeleteServiceVersion",
                "Effect": "Allow",
                "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>/versions/<version-id>"
            }
        ]
    }
    ```
- `s remove provision`：
    系统策略：`AliyunFCReadOnlyAccess`   
    ```json
    {
        "Version": "1",
        "Statement": [
            {
                "Action": "fc:PutProvisionConfig",
                "Effect": "Allow",
                "Resource": "acs:fc:<region>:<account-id>:services/services/<serviceName>.<qualifier>/functions/<functionName>"
            }
        ]
    }
    ```
- `s remove ondemand`：
    系统策略：`AliyunFCReadOnlyAccess`
    ```yaml
    {
        "Version": "1",
        "Statement": [
            {
                "Action": "fc:DeleteFunctionOnDemandConfig",
                "Effect": "Allow",
                "Resource": "acs:fc:<region>:<account-id>:services/services/<serviceName>.<qualifier>/functions/<functionName>"
            }
        ]
    }
    ```
- `s remove layer`：
    系统策略：`AliyunFCReadOnlyAccess`
    ````json
  {
      "Version": "1",
      "Statement": [
          {
              "Action": "fc:DeleteLayerVersion",
              "Effect": "Allow",
              "Resource": "acs:fc:<region>:<account-id>:layers/<layerName>/versions/*"
          }
      ]
  }
    ````
