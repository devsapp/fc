# Stress 命令

`stress` 命令是对 Event 函数以及 HTTP 发起压测的能力。

- [命令解析](#命令解析)
- [stress start 命令](#stress-start-命令)
    - [参数解析](#参数解析)
    - [操作案例](#操作案例)
- [stress clean 命令](#stress-clean-命令)
    - [参数解析](#参数解析-1)
    - [操作案例](#操作案例-1)
- [权限与策略说明](#权限与策略说明)

> 关于 `stress` 命令的常见问题和解决方法，可以参考[ FC 组件自动问答系统](http://qa.devsapp.cn/fc?type=stress ) 。

## 命令解析

当我们执行`stress -h`/`stress --help`命令时，可以获取帮助文档。例如执行`s cli fc stress -h`：

```shell script
$ s cli fc stress -h

Stress

  Stress test for the serverless application 

Usage

  s stress <sub-command>  

Document
  
  https://github.com/devsapp/fc/blob/main/docs/command/stress.md

SubCommand List

  start   Start stress test; help command [s eval start -h]         
  clear   Clean the relevant resources; help command [s eval clean -h]               
```


在该命令中，包括了一个子命令：
- [start：开始进行一键压测](#stress-start-命令)
- [clean：清理压测时创建的资源](#stress-clean-命令)

## stress start 命令

`stress start` 命令是用户开始进行线上函数探测的命令。

当我们执行`stress start -h`/`stress start --help`命令时，可以获取帮助文档。例如执行`s cli fc stress start -h`：

```shell script
$ s cli fc stress start -h

Stress start

  Start stress test 

Usage

  s stress start <options>
                               
Options

  --region [region]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [serviceName]        [C-Required] Specify the fc service name  
  --function-name [functionName]      [C-Required] Specify the fc function name    
  --function-type [event/http]        [C-Required] Type of the target function, value: event/http               
  --method [requestMethod]            [Optional] Target method, only for --function-type http                                  
  --payload [requestPayload]          [Optional] For --function-type event, represents the event passed to the function    
                                      For --function-type http, represents the request body passed to the function  
  --payload-file [requestPayload]     [Optional] For --function-type event, contains the event passed to the function        
                                      For --function-type http, contains the request body passed to the function    
  --num-user [number]                 [Optional] Number of the simulated users                                                 
  -q, --qualifier [qualifier]         [Optional] Qualifier of the target function, only for --function-type event                                                  
  --run-time [time]                   [Optional] Intervals for stress                                                                                                  
  --spawn-rate [rate]                 [Optional] Increasing number of users per second                                         
  -u, --url [url]                     [Optional] Target url

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

  $ s stress start --payload-file ./payload.file                                                                                                       
  $ s stress start --num-user 6 --spawn-rate 10 --run-time 30 --url myUrl --method post --payload "hello world"                                                                                   

Examples with CLI

  $ s cli fc stress start --num-user 6 --spawn-rate 10 --run-time 30 --function-type event --service-name myService --function-name myFunction --qualifier myQualifier --payload "hello world" --region cn-hangzhou                                                                                                                                         
  $ s cli fc stress start --num-user 6 --spawn-rate 10 --run-time 30 --function-type http --url myUrl --method POST --payload "hello world" --region cn-hangzhou                                                                                               
 ```

### 参数解析

| 参数全称 | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义 |
|-----|-----|-----|-----|-----|
| region | - | 选填 | 选填 | 探测的函数所处的地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | - | 选填 | 选填 | 探测的函数所处的服务名 |
| function-name | - | 选填 | 选填 | 探测的函数名 |
| function-type | - | 选填 | 选填 | 函数类型，取值：event/http  |
| method | - | 选填 |选填 |  |
| payload | - | 选填 |选填 |  |
| payload-file | - | 选填 |选填 |  |
| num-user | - | 选填 |选填 |  |
| qualifier | q | 选填 |选填 |  |
| run-time | - | 选填 |选填 |   |
| spawn-rate | - | 选填 |选填 |   |
| url | u | 选填 |选填 |   |
| access | a | 选填 | 选填 | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug | - | 选填 | 选填 | 打开`debug`模式，将会输出更多日志信息 |
| help | h | 选填 | 选填 | 查看帮助信息 |

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s <ProjectName> stress start`或者`s stress start`：
    ```text
    $ s stress start --payload 'hello'
    
    fc-deploy-test: http://memory-tuning.devsapp.cn/#gAAAAQACAAQ=;KVwPQGZmBkCkcB1AcT0KQA==;N/8EM4ZeeTMjDxI0Pj+ANA==
    ``` 
  
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，函数名等，例如：
    ```text
    $ s cli fc eval start --region cn-hangzhou --service-name fc-deploy-service --function-name http-trigger-py36 --eval-type memory --run-count 50 --payload 'hello world' --memory-size 128,256,512,1024  --method get --path '/login' --query 'a=1&b=2'
    
    fc-deploy-test: http://memory-tuning.devsapp.cn/#gAAAAQACAAQ=;KVwPQGZmBkCkcB1AcT0KQA==;N/8EM4ZeeTMjDxI0Pj+ANA==
    ```

通过浏览器打开地址，可以看到相关探测信息：

![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1636357746695_20211108074928902791.png)  

关于该结果的解析如下：
  
## stress clean 命令

`stress clean` 命令是清理因进行线上函数压测所创建资源的命令。

当我们执行`stress clean -h`/`stress clean --help`命令时，可以获取帮助文档。例如执行`s cli fc stress clean -h`：

```shell script
$ s cli fc stress cleam -h

Stress clean

  Clean the relevant resources, including helper resources.                                                                    

Usage

  s stress clean <options>  
                               
Options

  --region [region]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [serviceName]        [C-Required] Specify the fc service name  
  --function-name [functionName]      [C-Required] Specify the fc function name    
  -y, --assume-yes                    [Optional] Assume that the answer to any question which would be asked is yes 

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

  $ s stress clean                                                                                

Examples with CLI

  $ s cli fc stress clean --region myRegion --service-name xxx --function-name xxx -y 
```

### 参数解析

| 参数全称 | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义 |
|-----|-----|-----|-----|-----|
| region | - | 选填 | 选填 | 探测的函数所处的地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | - | 选填 | 选填 | 探测的函数所处的服务名 |
| function-name | - | 选填 | 选填 | 探测的函数名 |
| assume-yes | y | 选填 | 选填 | 在交互时，默认选择`y` |
| access | a | 选填 | 选填 | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug | - | 选填 | 选填 | 打开`debug`模式，将会输出更多日志信息 |
| help | h | 选填 | 选填 | 查看帮助信息 |

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s <ProjectName> stress clean`或者`s stress clean`：
    ```text
    $ s stress clean
    
    Resource cleanup succeeded.
    ``` 
  
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，函数名等，例如：
    ```text
    $ s cli fc stress clean --region cn-hangzhou --service-name fc-deploy-service --function-name http-trigger-py36 
    
    Resource cleanup succeeded.
    ```

  
## 权限与策略说明

