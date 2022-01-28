# instance 命令【公测中】

`instance` 命令支持登陆进入活跃实例；包括查看活跃实例列表和对指定实例进行命令行操作

- [命令解析](#命令解析)
- [instance list 命令](#instance-list-命令)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [instance exec 命令](#instance-exec-命令)
  - [参数解析](#参数解析-1)
  - [操作案例](#操作案例-1)
- [场景案例](#场景案例)

## 命令解析

当执行命令`instance -h`/`instance --help`时，可以获取帮助文档：

```shell script
Instance

  Function instance operation 

Document

  https://github.com/devsapp/fc/blob/main/docs/zh/command/instance.md 

Usage

  $ s instance <sub-command> 

SubCommand List

  list   View the list of active function instance; help command [s instance list -h] 
  exec   Execute a command in a instance; help command [s instance exec -h] 
```

## instance list 命令

`instance list` 命令，获取函数目前所有的活跃实例列表。

当执行命令`instance list -h`/`instance list --help`时，可以获取帮助文档：

````
Instance list

  View the list of active function instance 

Document

  https://github.com/devsapp/fc/blob/main/docs/zh/command/instance.md 

Usage

  $ s instance list <options> 

Options

  --region                 [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1   
  --service-name string    [C-Required] Specify the fc service name                                      
  --function-name string   [C-Required] Specify the fc function name                                     

Global Options

  --debug string          [Optional] Output debug informations   
  -h, --help              [Optional] Help for command            
  -t, --template string   [Optional] Specify the template file   
  -a, --access string     [Optional] Specify key alias           

Options Help

  Required: Required parameters in YAML mode and CLI mode            
  C-Required: Required parameters in CLI mode                        
  Y-Required: Required parameters in Yaml mode                       
  Optional: Non mandatory parameter                                  
  ✋ The difference between Yaml mode and CLI mode: http://ej6.net/yc 

Examples with Yaml

  $ s instance list 

Examples with CLI

  $ s cli fc instance list --region cn-hangzhou --service-name serviceName --function-name functionName 
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
fc-event-test: 
  instances: 
    - 
      instanceId: c-****-1658cb3903eb4644b0ee
      versionId:  0
```


## instance exec 命令

`instance exec` 命令，登陆进入指定实例。

当执行命令`instance exec -h`/`instance exec --help`时，可以获取帮助文档：

````
Instance exec

  Execute a command in a instance 

Document

  https://github.com/devsapp/fc/blob/main/docs/zh/command/instance.md 

Usage

  $ s instance exec <instanceId> <options> 

Options

  --region                 [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1                     
  --service-name string    [C-Required] Specify the fc service name                                      
  --function-name string   [C-Required] Specify the fc function name                                     
  --qualifier string       [Optional] Specify the qualifier parameter. Only supports LATEST and alias    
  -i, --stdin              [Optional] Open standard input                                                
  -t, --tty                [Required] Allocate a terminal device                                         

Global Options

  --debug string          [Optional] Output debug informations   
  -h, --help              [Optional] Help for command            
  -t, --template string   [Optional] Specify the template file   
  -a, --access string     [Optional] Specify key alias           

Options Help

  Required: Required parameters in YAML mode and CLI mode            
  C-Required: Required parameters in CLI mode                        
  Y-Required: Required parameters in Yaml mode                       
  Optional: Non mandatory parameter                                  
  ✋ The difference between Yaml mode and CLI mode: http://ej6.net/yc 

Notice

  The abbreviation for --tty -t cannot be used alone, because -t is a system parameter of serverless-devs                                                  

Examples with Yaml

  $ s instance exec c-*******-*******b4644b0ee ls            
  $ s instance exec -it c-*******-*******b4644b0ee /bin/bash 

Examples with CLI

  $ s cli fc instance exec --region cn-hangzhou --service-name serviceName --function-name functionName c-*******-*******b4644b0ee ls                    
  $ s cli fc instance exec --region cn-hangzhou --service-name serviceName --function-name functionName -i --tty c-*******-*******b4644b0ee /bin/bash 
````

### 参数解析

| 参数全称     | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------ | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region       | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | -        | 选填           | 必填          | 服务名 |
| function-name | -        | 选填           | 必填          | 函数名 |
| qualifier | -        | 选填           | 选填          | 版本或别名，默认为 `LATEST` |
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
$ s instance exec --instance-id instanceId ls

$ s instance exec --instance-id instanceId -it /bin/bash
````

如果是使用终端模式可以输入 `exit` 服务端端开链接退出（推荐），或者执行 `control + ]` 强制客户端推出。

## 场景案例

### 排查线上问题

在一些日常的场景下，实例命令行操作会带来更符合用户习惯、更高效便捷的排查问题方式。

用户小王是 Serverless 小白用户，写完一个程序部署到函数计算后，发现函数中设置的环境变量不生效，如果进一步排查，则需要修改代码，打印日志，重新部署，查看日志，使用这样繁琐的排查方式。现在借助实例命令行操作，小张可以直接一个命令：s instance exec {instance_id} ENV 便可以一步定位问题。

实例命令行操作提供了便捷的登录体验，能帮助用户解决复杂场景下的应用问题。一些情况下，用户已经无法通过函数日志、监控指标来具体定位问题，需要借助比如 coredump 、tcpdump、jmap 等工具进行深入排查。

比如，用户小李发现自己的线上程序最近会出现一些函数错误，报错内容都是连接远程某服务超时。小李怀疑是函数实例与远端服务的网络链接不稳定，想进入实例内部，调查分析下实例与远端服务的网络情况。他可以按照这样的步骤进行：

1. 登录进实例内部后，先安装 tcpdump 工具，需要执行 apt-get update 和 apt-get install tcpdump 两条命令：
<img src="https://img.alicdn.com/imgextra/i2/O1CN011qHFxA1hMxYdmzFs4_!!6000000004264-2-tps-1500-674.png" />

2. 安装完毕后，执行 tcpdump 命令，对远端服务 IP 的请求进行抓包，并将抓包结果保存在 tcpdump.cap 文件中：
<img src="https://img.alicdn.com/imgextra/i4/O1CN01iaWbjE1w82tvxkrne_!!6000000006262-2-tps-1500-504.png" />

3. 抓包完毕，借助 OSS 命令行工具 ossutil64 ，将 tcpdump.cap 文件上传到自己的 OSS ，然后下载到本地借助分析工具 wireshark 可以进行分析。
<img src="https://img.alicdn.com/imgextra/i2/O1CN01eSFr0v21D9OTCTdhE_!!6000000006950-2-tps-1500-372.png" />
<img src="https://img.alicdn.com/imgextra/i3/O1CN01ycfLsb1CXGNkMcZ4z_!!6000000000090-2-tps-1500-519.png" />
