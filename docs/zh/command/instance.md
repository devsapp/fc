# instance 命令

`instance` 命令可以快速支持登陆用户已经存在的实例；包括查看实例的列表和操作 

- [命令解析](#命令解析)
- [instance list 命令](#instance-list-命令)
  - [参数解析](#参数解析-1)
  - [操作案例](#操作案例-1)
- [instance exec 命令](#instance-publish-命令)
  - [参数解析](#参数解析-2)
  - [操作案例](#操作案例-2)

## 命令解析

当执行命令`instance -h`/`instance --help`时，可以获取帮助文档：

```shell script
Instance

  Function instance operation 

Usage

  s instance <sub-command>  

Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/instance.md                            

SubCommand List

  list   View the list of function instance; help command [s instance list -h]
  exec   Execute instructions in the container; help command [s instance exec -h]
```

## instance list 命令

`instance list` 命令，获取函数目前所有的函数实例列表。

当执行命令`instance list -h`/`instance list --help`时，可以获取帮助文档：

````

````

### 参数解析
| 参数全称     | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------ | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region       | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | -        | 选填           | 必填          | 服务名 |
| function-name | -        | 选填           | 必填          | 函数名 |
| qualifier | -        | 选填           | 选填          | 版本或别名，默认为 `LATEST` |
| access       | a        | 选填           | 选填          | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug        | -        | 选填           | 选填          | 打开`debug`模式，将会输出更多日志信息                        |
| help         | h        | 选填           | 选填          | 查看帮助信息 |

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s instance list`获取别名列表；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，例如`s cli fc instance list --region cn-hangzhou --service-name fc-deploy-service --function-name test-instance`

上述命令的执行结果示例：
```text

```


## instance exec 命令

`instance exec` 命令，登陆操作用户选择的实例。

当执行命令`instance exec -h`/`instance exec --help`时，可以获取帮助文档：

````

````

### 参数解析
| 参数全称     | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------ | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region       | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | -        | 选填           | 必填          | 服务名 |
| function-name | -        | 选填           | 必填          | 函数名 |
| qualifier | -        | 选填           | 选填          | 版本或别名，默认为 `LATEST` |
| instance-id | -        | 必填           | 必填          | 指定实例 ID  |
| stdin | i        | 选填           | 选填 | 打开标准输入  |
| tty | t       | 选填           | 选填 | 分配一个终端设备  |
| access       | a        | 选填           | 选填          | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug        | -        | 选填           | 选填          | 打开`debug`模式，将会输出更多日志信息                        |
| help         | h        | 选填           | 选填          | 查看帮助信息 |

### 操作案例

- **有资源描述文件（Yaml）时**
1. 先执行 `s instance list` 获取函数的实例列表，从中选择需要操作的实例ID
2. 执行命令
````
$ s instance exec --instance-id instance-id ls

$ s instance exec --instance-id instanceId -it "/bin/bash ls"
````

如果是使用终端模式可以输入 `exit` 服务端端开链接退出（推荐），或者执行 `control + ]` 强制客户端推出。