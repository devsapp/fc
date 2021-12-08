# Eval 命令

在 Serverless 领域内，通常会出现以下两种使用场景：

- CPU 密集型场景
  对于 CPU 密集型场景，例如音视频处理、AI 推理或图片处理等，您一般会选择使用单实例单并发。由于该类场景的函数内存大小和 CPU 能力成正比，因此您需要根据函数是成本敏感型还是延迟敏感型选择合适的内存规格。

- I/O 密集型场景
  对于 I/O 密集型场景，您一般会选择使用单实例多并发。该类场景下由于函数内存和 CPU 能力成正比，建议您将函数内存规格设置足够大，但可能会出现浪费资源的现象，很难选择合适的单实例并发值。

针对在以上两种使用场景无法设置合适的参数规格的情况，Serverless Devs 为您提供了探测功能，可以实现内存探测和并发度探测，获取满足您需求的参数配置信息。`eval` 命令是对函数进行探测的命令；通过 `eval` 指令，可以对函数探测内存(单实例单并发)或者探测并发度(单实例多并发)。例如给 CPU 密集型场景的函数设置合适的内存，给 I/O 密集型场景的函数设置合适的并发值，根据探测结果，获取满足需求的最佳内存大小或最佳并发度值。

> 注意: 这个命令只是针对开发上线前阶段的函数， 不要对生产函数执行探测操作

- [命令解析](#命令解析)
- [eval start 命令](#eval-start-命令)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [权限与策略说明](#权限与策略说明)

> 关于 `eval` 命令的常见问题和解决方法，可以参考[ FC 组件自动问答系统](http://qa.devsapp.cn/) 。

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

Document

  https://github.com/devsapp/fc/blob/main/docs/command/eval.md

Usage

  s eval start <options>

Options

  --concurrency-args string   [Optional] Concurrency args of power tuning that can convert to concurrency
                              list, for --eval-type concurrency or concurrencyPostman
  --eval-type string          [Optional] Type of the power tuning, value:
                              memory/concurrency/concurrencyPostman
  --function-name string      [C-Required] Specify the fc function name
  --headers string            [Optional] arget headers, only for HTTP function
  --memory number             [Optional] Function memory of power tuning, only for --eval-type
                              concurrency/concurrencyPostman
  --memory-size string        [Optional] Function MemorySize List of power tuning, only for --eval-type
                              memory
  --method string             [Optional] Target method, only for HTTP function
  --path string               [Optional] Target path, only for HTTP function
  --payload string            [Optional] Represents the event(Event function)/request_body(HTTP function)
                              passed to the function
  --payload-file string       [Optional] Represents the the event(Event function)/request_body(HTTP
                              function)/postman-export-json-file which be readed from file to pass to the
                              function
  --query string              [Optional] arget query, only for HTTP function
  --region string             [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-
                              beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-
                              shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-
                              3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-
                              1/ap-south-1
  --rt number                 [Optional] Max response time, only for --eval-type
                              concurrency/concurrencyPostman
  --run-count number          [Optional] Number of Invoke Function, only for --eval-type memory
  --service-name string       [C-Required] Specify the fc service name

Global Options

  -a, --access string     [Optional] Specify key alias
  --debug string          [Optional] Output debug informations
  -h, --help boolean      [Optional] Help for command
  -t, --template string   [Optional] Specify the template file

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/docs/docs/zh/yaml_and_cli.md

Examples with Yaml

  $ s eval start --eval-type memory --run-count 10 --payload-file
  ./payload.file  --memory-size 128,256,512,1024
  $ s eval start --eval-type concurrency --memory 1536 --concurrency-args
  2,20,5 --rt 250 --method get --path '/login' --query 'a=1&b=2'
  $ s eval start --eval-type concurrencyPostman --memory 1536
  --concurrency-args 2,20,5 --rt 250 --payload-file ./postman.json

Examples with CLI

  s cli fc eval start --region cn-hangzhou --function-name functionName
  --service-name serviceName --eval-type memory --run-count 10 --payload 'hello
  world' --memory-size 128,256,512,1024 --access default
  $ s cli fc eval start --region cn-hangzhou --function-name functionName
  --service-name serviceName --eval-type concurrency --memory 1536
  --concurrency-args 2,30,5 --rt 250  --method get --path '/login' --query
  'a=1&b=2' --access default
  $ s cli fc eval start --region cn-hangzhou --function-name functionName
  --service-name serviceName --eval-type concurrencyPostman --memory 1536
  --concurrency-args 2,20,5 --rt 250 --payload-file ./postman.json --access
  default
```

### 参数解析

| 参数全称         | 参数缩写 | Yaml 模式下必填 | Cli 模式下必填 | 参数含义                                                                                                                                                                                                                                                                                                                   |
| ---------------- | -------- | --------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| region           | -        | 选填            | 必填           | 探测的函数所处的地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name     | -        | 选填            | 必填           | 探测的函数所处的服务名                                                                                                                                                                                                                                                                                                     |
| function-name    | -        | 选填            | 必填           | 探测的函数名                                                                                                                                                                                                                                                                                                               |     |
| eval-type        | -        | 选填            | 选填           | 探测类型， 取值范围：`memory, concurrency`，默认是 memory                                                                                                                                                                                                                                                                  |
| memory-size      | -        | 选填            | 选填           | 探测类型为 memory 需要的参数，示例 `128,256,512,1024`                                                                                                                                                                                                                                                                      |
| run-count        | -        | 选填            | 选填           | 探测类型为 memory 需要的参数， 指定目标函数在不同内存规格下被分别调用的次数                                                                                                                                                                                                                                                |
| memory           | -        | 选填            | 选填           | 探测类型为 concurrency 或者 concurrencyPostman 需要的参数, 建议设置的较大内存， 比如 弹性实例 1.5G(约 1vCPU) 或者 3G(约 2vCPU), 或者使用性能型实例                                                                                                                                                                         |
| concurrency-args | -        | 选填            | 选填           | 探测类型为 concurrency 或者 concurrencyPostman 需要的参数, 指定目标函数被探测时的并发度参数范围和步长，例如该参数的配置信息为--concurrency-args 2,20,5，表示并发范围[2,20]，步长为 5，即被探测的目标函数分别在 2、7、12 和 17 不同并发值下实现探测。                                                                       |
| rt               | -        | 选填            | 选填           | 探测类型为 concurrency 或者 concurrencyPostman 需要的参数，期望最大响应时间                                                                                                                                                                                                                                                |
| method           | -        | 选填            | 选填           | 针对被探测的函数是 HTTP 函数，取值番位：`GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD`。                                                                                                                                                                                                                                   |
| path             | -        | 选填            | 选填           | 针对被探测的函数是 HTTP 函数， HTTP 请求的 `path`                                                                                                                                                                                                                                                                          |
| payload          | -        | 选填            | 选填           | 如果被探测函数是 HTTP 函数时，是 HTTP 请求的 `body`; 如果被探测函数是 `event` 函数时，是函数入参 `event`                                                                                                                                                                                                                   |
| payload-file     | -        | 选填            | 选填           | 1. 探测类型是 memory 或者 concurrency：如果被探测函数是 HTTP 函数时，文件内容是 HTTP 请求的 `body`; 如果被探测函数是 `event` 函数时，文件内容是函数入参 `event`<br> 2. 探测类型是 concurrencyPostman: 此参数是必需，对应 Postman 导出 json 文件， 格式有一定的要求，详情见本文最后的补充说明                               |
| query            | -        | 选填            | 选填           | 针对被探测的函数是 HTTP 函数， HTTP 请求的 `query`                                                                                                                                                                                                                                                                         |
| headers          | -        | 选填            | 选填           | 针对被探测的函数是 HTTP 函数， HTTP 请求头, 示例值 `'{"header_a":"val"}'`                                                                                                                                                                                                                                                  |
| access           | a        | 选填            | 必填           | 本次请求使用的密钥，可以使用通过[config 命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息)  |
| debug            | -        | 选填            | 选填           | 打开`debug`模式，将会输出更多日志信息                                                                                                                                                                                                                                                                                      |
| help             | h        | 选填            | 选填           | 查看帮助信息                                                                                                                                                                                                                                                                                                               |

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s eval start`进行函数探测；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，函数名等，例如`s cli fc eval start --region cn-hangzhou --function-name cpu-test --function-name test --service-name Service --eval-type memory --run-count 10 --payload '{"key":"val"}' --memory-size 128,256,512,1024 --access default`

#### 内存探测模式

本示例以探测 CPU 密集型场景事件函数为例，介绍如何实现内存模式的探测。请执行以下命令，获取最佳的内存规格：

```bash
s cli fc eval start --region cn-hangzhou --function-name cpu-test --service-name Service  --eval-type memory  --run-count 10   --payload '{"key":"val"}' --memory-size 128,256,512,1024  --access default
```

本示例表示被探测的目标函数在 128 MB、256 MB、512 MB 和 1024 MB 四个不同的内存模式下分别被调用十次后取平均值，例如目标函数在 128 MB 内存格式下被调用十次后取平均值，最终对目标函数在这四个不同内存模式下分别被调用十次后的平均值进行对比，获取探测信息。

输出示例：

```text
...
>-
http://memory-tuning.devsapp.cn/#gAAAAQACAAQ=;AIAARwBYgEYAoPdFAHiBRQ==;37w+OH+BPjiqxzc4/SxAOA==
```

此时，可以通过浏览器打开返回的地址，查看相关探测信息：

![图片alt](https://img.alicdn.com/imgextra/i3/O1CN01nZNiZX1dQO2nqqWVf_!!6000000003730-2-tps-1533-649.png)

关于该结果的解析如下：

1. 图中红色的线表示执行时间与内存大小的关系；蓝色的线表示所消耗的成本与内存之间的关系；
2. 右侧四个数字分别是：
   - Best Cost：消费最少的时候，内存是 512MB；
   - Best Time：执行耗时最短的时候，内存是 1024MB；
   - Worst Cost：消费最多的时候，内存是 1024MB；
   - Worst Time：执行耗时最长的时候，内存是 128MB；

此时可以根据这个数据，当前函数资源进行内存设定，可以综合曲线和实际业务需求，例如，在当前时刻，延迟要求在 20000ms 以内，256M 是成本最佳， 如果要求延迟在 5000ms 以内， 这个时候 1024M 是最佳选择。

#### 并发度探测模式

本示例以 I/O 密集型场景的 HTTP 函数为例，介绍如何对函数实现并发度的探测。请执行以下命令，获取最佳的并发度规格：

```bash
s cli fc eval start --region cn-hangzhou --function-name demo --service-name Service --eval-type concurrency --memory 1536 --concurrency-args 2,20,5 --rt 200 --method=get --path /login  --query 'a=1&b=2'  --headers='{"header_a":"v"}' --access default
```

本示例表示将被探测的目标函数的内存规格设置为 1.5 GB，并发度范围[2,20]，步长为 5，即被探测的目标函数分别在 2，7，12 和 17 不同并发值模式下实现探测，获取探测信息。

输出示例：

```text
...
>-
http://concurrency-tuning.devsapp.cn/#AgAHAAwAEQA=;Ilj3QCL+QEFCR5tBGFO4QQ==;AAC2QgAA1kIAADtDAABCQw==
```

此时，可以通过浏览器打开返回的地址，查看相关探测信息：

![](https://img.alicdn.com/imgextra/i1/O1CN01xtyYXp2935bmE0dKs_!!6000000008011-2-tps-1662-774.png)

关于该结果的解析如下：

1. 图中红色的线表示执行时间与单实例并发度的关系；蓝色的线表示有效的 QPS 与单实例并发度之间的关系；
2. 右侧四个数字分别是：
   - Best QPS：有效 QPS 最高的时候，单实例并发度是 17；
   - Best Time：执行耗时最短的时候，单实例并发度是 2；
   - Worst QPS：有效 QPS 最低的时候，单实例并发度是 2；
   - Worst Time：执行耗时最短的时候，单实例并发度是 17；

此时可以根据这个数据，可以对这个函数的单实例多并发的并发度值进行设置， 如果需要函数的每次执行时间都小于 20ms, 那么设置并发度 12 是一个好的选择。

## 权限与策略说明

不需要特殊权限， 一般 s 使用的 access 有 FCFullAccess 即可

## 补充

对于探测类型为 concurrencyPostman，仅支持 HTTP 函数的探测，payload-file 参数指定 postman 导出的 json 文件， 但是这个文件格式需要满足如下要求：

- 有 variable 并且有 key 为 baseUrl，value 是对应探测函数的自定义域名

- 对于每个 item, url 中的值是 baseUrl 参与拼接的

> 原理：探测函数会针对被探测的函数， 根据并发度列表生成不同的版本别名， 同时探测每个并发度的时候，需要将自定义域名 baseUrl 指向不同的别名

#### 示例

```json
{
  "item": [
    {
      "name": "path1",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}/a/path1",
          "protocol": "http",
          "host": ["{{baseUrl}}"],
          "path": ["a", "path1"]
        }
      },
      "response": []
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http-hello.dsp-test.123456789.cn-shenzhen.fc.devsapp.net",
      "type": "string"
    }
  ]
}
```