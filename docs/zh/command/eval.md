# Eval 命令

`eval` 命令是对函数进行探测的命令；通过 `eval` 指令，可以对函数探测内存(单实例单并发)或者探测并发度(单实例多并发)。例如给CPU密集型场景的函数设置合适的内存，给I/O密集型场景的函数设置合适的并发值，根据探测结果，获取满足需求的最佳内存大小或最佳并发度值。

> 注意:  这个命令只是针对开发上线前阶段的函数， 不要对生产函数执行探测操作

- [命令解析](#命令解析)
- [eval start 命令](#eval-start-命令)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [权限与策略说明](#权限与策略说明)

> 关于 `eval` 命令的常见问题和解决方法，可以参考[ FC 组件自动问答系统](http://qa.devsapp.cn/ ) 。

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
```


在该命令中，包括了一个子命令：

- [start：线上函数探测](#eval-start-命令)

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
  --service-name [string]             [C-Required] Specify the fc service name  
  --function-name [string]            [C-Required] Specify the fc function name    
  --function-type [http/event]        [C-Required] Type of the target function, value: http/event
  --concurrency-args [string]         [Optional] Concurrency args of power tuning that can convert to concurrency list, only for --eval-type concurrency                                                   
  --eval-type [memory/concurrency]    [Optional] Type of the power tuning, value: memory/concurrency                                                              
  --memory [number]                   [Optional] Function memory of power tuning, only for --eval-type concurrency             
  --memory-size [string]              [Optional] Function MemorySize List of power tuning, only for --eval-type memory         
  --method [string]                   [Optional] Target method, only for HTTP function                                 
  --path [string]                     [Optional] Target path, only for HTTP function                                       
  --payload [string]                  [Optional] Represents the event/request_body passed to the function    
  --payload-file [string]             [Optional] Contains the event passed to the function 
  --query [string]                    [Optional] arget query, only for HTTP function                                                                                  
  --rt [number]                       [Optional] Max response time, only for --eval-type concurrency                           
  --run-count [number]                [Optional] Number of Invoke Function, only for --eval-type memory                        

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

  $ s eval start --eval-type memory --run-count 10 --payload-file ./payload.file  --memory-size 128,256,512,1024                                                     
  $ s eval start --eval-type memory --run-count 50 --payload 'hello world' --memory-size 128,256,512,1024  --method get --path '/login' --query 'a=1&b=2'                                                                                    

Examples with CLI
                                                                                                                              
  $ s cli fc eval start --region cn-hangzhou --function-name functionName --service-name serviceName --eval-type memory --run-count 50 --payload 'hello world' --memory-size 128,256,512,1024  --method get --path '/login' --query 'a=1&b=2'                                                                                     
  $ s cli fc eval start --region cn-hangzhou --function-name functionName --service-name serviceName --eval-type concurrency --memory 1536 --concurrency-args 2,30,5 --rt 250  --payload-file ./payload.file                                            
```

### 参数解析

| 参数全称         | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ---------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region           | -        | 选填           | 必填         | 探测的函数所处的地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name     | -        | 选填           | 必填          | 探测的函数所处的服务名                                       |
| function-name    | -        | 选填           | 必填          | 探测的函数名                                                 |
| function-type    | -        | 选填           | 选填          | 函数类型，取值范围：`event, http`，默认通过线上函数配置进行判断，如果判断失败可以手动指定                                              |
| eval-type        | -        | 选填            | 选填         | 探测类型， 取值范围：`memory, concurrency`，默认是memory    |                                               
| memory-size      | -        | 选填           | 选填          | 探测类型为 memory 需要的参数，示例 `128,256,512,1024` |
| run-count        | -        | 选填           | 选填          | 探测类型为 memory 需要的参数， 指定目标函数在不同内存规格下被分别调用的次数                                                          |
| memory           | -        | 选填           | 选填          | 探测类型为 concurrency 需要的参数,  建议设置的较大内存， 比如 1.5G(约 1vCPU) 或者 3G(约 2vCPU)                                                        |
| concurrency-args | -        | 选填           | 选填          | 探测类型为 concurrency 需要的参数, 指定目标函数被探测时的并发度参数范围和步长，例如该参数的配置信息为--concurrency-args 2,20,5，表示并发范围[2,20]，步长为5，即被探测的目标函数分别在2、7、12和17不同并发值下实现探测。                                                         |
| rt               | -        | 选填           | 选填          | 探测类型为 concurrency 需要的参数，期望最大响应时间|
| method           | -        | 选填           | 选填          | 针对被探测的函数是 HTTP 函数，取值番位：`GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD`。                                                         |
| path             | -        | 选填           | 选填          | 针对被探测的函数是 HTTP 函数， HTTP 请求的 `path`                                           |
| payload          | -        | 选填           | 选填          | 如果被探测函数是 HTTP 函数时，是 HTTP 请求的 `body`; 如果被探测函数是 `event` 函数时，是函数入参 `event` |
| payload-file     | -        | 选填           | 选填          | 如果被探测函数是 HTTP 函数时，文件内容是 HTTP 请求的 `body`; 如果被探测函数是 `event` 函数时，文件内容是函数入参 `event` |
| query            | -        | 选填           | 选填          | 针对被探测的函数是 HTTP 函数， HTTP 请求的 `query`                                                            |
| access           | a        | 选填           | 必填          | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug            | -        | 选填           | 选填          | 打开`debug`模式，将会输出更多日志信息                        |
| help             | h        | 选填           | 选填          | 查看帮助信息                                                 |

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s eval start`进行函数探测；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，函数名等，例如`s cli fc eval start --region cn-hangzhou --function-name cpu-test --function-name test --service-name Service  --eval-type memory  --run-count 10   --payload '{"key":"val"}' --memory-size 128,256,512,1024  --access default`

上述命令的执行结果示例：

```text
http://memory-tuning.devsapp.cn/#gAAAAQACAAQ=;AIAARwBYgEYAoPdFAHiBRQ==;37w+OH+BPjiqxzc4/SxAOA==
```

此时，可以通过浏览器系统返回的地址，查看相关探测信息：

![图片alt](https://img.alicdn.com/imgextra/i3/O1CN01nZNiZX1dQO2nqqWVf_!!6000000003730-2-tps-1533-649.png)  

关于该结果的解析如下：

1. 图中红色的线表示执行时间与内存大小的关系；蓝色的线表示所消耗的成本与内存之间的关系；
2. 右侧四个数字分别是：
   - Best Cost：消费最少的时候，内存是512MB；
   - Best Time：执行耗时最小的时候，内存是1024MB；
   - Worst Cost：消费最多的时候，内存是1024MB；
   - Worst Time：执行耗时最长的时候，内存是128MB；

此时可以根据这个数据，当前函数资源进行内存设定，可以综合曲线和实际业务需求，例如，在当前时刻，延迟要求在 20000ms 以内，256M 是成本最佳， 如果要求延迟在 5000ms 以内， 这个时候 1024M 是最佳选择。

## 权限与策略说明

不需要特殊权限， 一般 s 使用的  access 有 FCFullAccess 即可
