# Eval 命令

`eval` 命令是对函数进行探测的命令；通过 `eval` 指令，可以对函数探测内存(单实例单并发)或者探测并发度(单实例多并发)。根据探测结果，可以有效的对内存等进行更为科学的配置。

- [命令解析](#命令解析)
- [eval start 命令](#eval-start-命令)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [eval clean 命令](#eval-clean-命令)
  - [参数解析](#参数解析-1)
  - [操作案例](#操作案例-1)
- [权限与策略说明](#权限与策略说明)

> 关于 `eval` 命令的常见问题和解决方法，可以参考[ FC 组件自动问答系统](http://qa.devsapp.cn/fc?type=eval ) 。

## 命令解析

当执行命令`eval -h`/`eval --help`时，可以获取帮助文档：

```shell script
Eval

  Power tuning online functions 

Usage

  s eval <sub-command> 

Document
  
  https://github.com/devsapp/fc/blob/main/docs/command/eval.md

SubCommand List

  start   Power tuning online functions; help command [s eval start -h]         
  clear   Clean the relevant resources; help command [s eval clean -h]               
```


在该命令中，包括了两个子命令：

- [start：线上函数探测](#eval-start-命令)
- [clean：清理探测时创建的资源](#eval-clean-命令)

## eval start 命令

`eval start` 命令，是开始进行函数探测的命令。

当执行命令`eval start -h`/`eval start --help`时，可以获取帮助文档：

```shell script
Eval start

  Power tuning start 

Usage

  s eval start <options>
                               
Options

  --region [string]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [string]        [C-Required] Specify the fc service name  
  --function-name [string]      [C-Required] Specify the fc function name    
  --concurrency-args [string]         [Optional] Concurrency args of power tuning that can convert to concurrency list, only for --eval-type concurrency                                                   
  --eval-type [memory/concurrency]    [Optional] Type of the power tuning, value: memory/concurrency                                                              
  --memory [number]                   [Optional] Function memory of power tuning, only for --eval-type concurrency             
  --memory-size [string]              [Optional] Function MemorySize List of power tuning, only for --eval-type memory         
  --method [string]                   [Optional] Target method, only for --function-type http                                  
  --path [string]                       [Optional] Target path, only for --function-type http                                    
  --payload [string]                  [Optional] Represents the event/request_body passed to the function    
  --payload-file [string]               [Optional] Contains the event passed to the function     --query [string]                    [Optional] arget query, only for --function-type http                                                                                
  --rt [number]                       [Optional] Max response time, only for --eval-type concurrency                           
  --run-count [number]                [Optional] Number of Invoke Function, only for --eval-type memory                        

Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [string]   [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations 

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/docs/docs/zh/yaml_and_cli.md

Examples with Yaml

  $ s eval start --eval-type memory --run-count 10  --payload-file ./payload.file  --memory-size 128,256,512,1024                                                                                                                       
  $ s eval start --eval-type memory --run-count 50 --payload 'hello world' --memory-size 128,256,512,1024  --method get --path '/login' --query 'a=1&b=2'                                                                                    

Examples with CLI
                                                                                                                              
  $ s cli fc eval start --region cn-hangzhou --function-name myFunctionName --service-name myServiceName --eval-type memory --run-count 50 --payload 'hello world' --memory-size 128,256,512,1024  --method get --path '/login' --query 'a=1&b=2'                                                                                           
  $ s cli fc eval start --region cn-hangzhou --function-name myFunctionName --service-name myServiceName --eval-type concurrency --memory 1536 --concurrency-args 2,30,5 --rt 250  --payload-file ./payload.file                                            
```

### 参数解析

| 参数全称         | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ---------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region           | -        | 选填           | 选填          | 探测的函数所处的地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name     | -        | 选填           | 选填          | 探测的函数所处的服务名                                       |
| function-name    | -        | 选填           | 选填          | 探测的函数名                                                 |
| concurrency-args | -        | 选填           | 选填          |                                                              |
| eval-type        | -        | 选填           | 选填          |                                                              |
| memory           | -        | 选填           | 选填          |                                                              |
| memory-size      | -        | 选填           | 选填          |                                                              |
| method           | -        | 选填           | 选填          |                                                              |
| path             | -        | 选填           | 选填          |                                                              |
| payload          | -        | 选填           | 选填          |                                                              |
| payload-file     | -        | 选填           | 选填          |                                                              |
| query            | -        | 选填           | 选填          |                                                              |
| rt               | -        | 选填           | 选填          |                                                              |
| run-count        | -        | 选填           | 选填          |                                                              |
| access           | a        | 选填           | 选填          | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug            | -        | 选填           | 选填          | 打开`debug`模式，将会输出更多日志信息                        |
| help             | h        | 选填           | 选填          | 查看帮助信息                                                 |

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s eval start`进行函数探测；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，函数名等，例如`s cli fc eval start --region cn-hangzhou --service-name fc-deploy-service --function-name http-trigger-py36 --eval-type memory --run-count 50 --payload 'hello world' --memory-size 128,256,512,1024  --method get --path '/login' --query 'a=1&b=2'`

上述命令的执行结果示例：

```text
fc-deploy-test: http://memory-tuning.devsapp.cn/#gAAAAQACAAQ=;KVwPQGZmBkCkcB1AcT0KQA==;N/8EM4ZeeTMjDxI0Pj+ANA==
```

此时，可以通过浏览器系统返回的地址，查看相关探测信息：

![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1636357746695_20211108074928902791.png)  

关于该结果的解析如下：

1. 图中红色的线表示执行时间与内存大小的关系；蓝色的线表示所消耗的成本与内存之间的关系；
2. 右侧四个数字分别是：
   - Best Cost：消费最少的时候，内存是128MB；
   - Best Time：执行耗时最小的时候，内存是256MB；
   - Worst Cost：消费最多的时候，内存是1024MB；
   - Worst Time：执行耗时最长的时候，内存是512MB；

此时可以根据这个数据，当前函数资源进行内存设定，可以综合曲线和实际业务需求，例如，在当前时刻，内存设置在128MB或者256MB相对是合理的，而设置512MB或者1024MB是不合理的。

## eval clean 命令

`eval clean` 命令，是清理因进行线上函数探测所创建资源的命令。

当执行命令`eval clean -h`/`eval clean --help`时，可以获取帮助文档：

```shell script
Eval clean

  Clean the relevant resources, including helper resources.                                                                    

Usage

  s eval clean <options>  
                               
Options

  --region [string]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [string]        [C-Required] Specify the fc service name  
  --function-name [string]      [C-Required] Specify the fc function name    
  -y, --assume-yes                    [Optional] Assume that the answer to any question which would be asked is yes 

Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [string]   [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations 

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/docs/docs/zh/yaml_and_cli.md

Examples with Yaml

  $ s eval clean                                                                                

Examples with CLI

  $ s cli fc eval clean --region myRegion --service-name xxx --function-name xxx -y 
```

### 参数解析

| 参数全称      | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region        | -        | 选填           | 选填          | 探测的函数所处的地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name  | -        | 选填           | 选填          | 探测的函数所处的服务名                                       |
| function-name | -        | 选填           | 选填          | 探测的函数名                                                 |
| assume-yes    | y        | 选填           | 选填          | 在交互时，默认选择`y`                                        |
| access        | a        | 选填           | 选填          | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug         | -        | 选填           | 选填          | 打开`debug`模式，将会输出更多日志信息                        |
| help          | h        | 选填           | 选填          | 查看帮助信息                                                 |

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s eval clean`对因函数探测所创建的辅助资源进行清理；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，函数名等，例如`s cli fc eval clean --region cn-hangzhou --service-name fc-deploy-service --function-name http-trigger-py36 `；

上述命令的执行结果示例：

```text
Resource cleanup succeeded.
```


## 权限与策略说明
