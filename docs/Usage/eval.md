# 探测函数内存或并发度操作：Eval

- [简介](#简介)

- [快速使用](#快速使用)
  - [简单使用](#简单使用)
    - [开始探测](#开始探测)

---

阿里云函数计算（FC）组件为使用者提供了对 event 函数以及匿名 http 函数发起压测的能力。可以通过`eval`指令，快速进行压测操作。

您可以通过`s cli fc eval -h`指令，唤起帮助信息：

```
Eval

  Power tunning online functions

Usage

  s eval <sub-command>


SubCommand List

  start   Power tunning online functions, you can get help through [s cli fc eval start -h]
```

Eval 命令只有一个子命令：

- start: 开始探测流程，可以通过`s cli fc eval start -h`获取帮助文档:

```
Eval start

  Power tunning start

Usage

  s start <options>


Options

  --concurrency-args string   Concurrency args of power tunning that can convert to concurrency list,
                              only for --eval-type concurrency
  --eval-type string          Type of the power tunning, including memory and concurrency
  --function-name string      Specify the alicloud fc function name
  --function-type string      Type of the target function, including event and http
  --memory number             Function memory of power tunning, only for --eval-type concurrency
  --memory-size string        Function MemorySize List of power tunning, only for --eval-type memory
  --method string             Target method, only for --function-type http
  --path string               Target path, only for --function-type http
  --payload string            For --function-type event, represents the event passed to the function;
                              For --function-type http, represents the request body passed to the
                              function
  -f, --payload-file string   For --function-type event, contains the event passed to the function;
                              For --function-type http, contains the request body passed to the
                              function
  --query string              Target query, only for --function-type http
  -r, --region string         Specify the region of alicloud
  --rt number                 Max response time, only for --eval-type concurrency
  --run-count number          Number of Invoke Function, only for --eval-type memory
  --service-name string       Specify the alicloud fc service name

Global Options

  -a, --access string   Specify key alias
  --debug string        Output debug informations
  -h, --help string     Help for command.

Examples with CLI

  $ s cli fc eval start --region cn-hangzhou --function-name myFunctionName
  --service-name myServiceName --function-type event --eval-type memory
  --run-count 10  --payload-file ./payload.file  --memory-size 128,256,512,1024
  --access default

  $ s cli fc start --region cn-hangzhou --function-name myFunctionName
  --service-name myServiceName --function-type http  --eval-type memory
  --run-count 50  --payload 'hello world'  --memory-size 128,256,512,1024
  --method get --path '/login' --query 'a=1&b=2' --access default

  $ s cli fc start --region cn-hangzhou --function-name myFunctionName
  --service-name myServiceName --function-type event --eval-type concurrency
  --memory 1536 --concurrency-args 2,30,5 --rt 250  --payload-file
  ./payload.file  --access default

  $ s cli fc start --region cn-hangzhou --function-name myFunctionName
  --service-name myServiceName --function-type http  --eval-type concurrency
  --memory 1536 --concurrency-args 2,20,5 --rt 250 --method get --path '/login'
  --query 'a=1&b=2' --access default
```

# 快速使用

当我们下载好[Serverless Devs 开发者工具](../Getting-started/Install-tutorial.md), 并完成[阿里云密钥配置](../Getting-started/Setting-up-credentials.md)之后，我们可以根据自身的需求进行函数进行内存或者并发度探测。

## 简单使用

### 内存探测模式
如果您的函数是 cpu 密集型， 一般就是默认的单实例单并发， 比如音视频处理， 游戏中的战斗结算等函数， 这时您可以选择 `eval-type `为 `memory` 对具体的函数进行探测,  比如：

``` bash
s cli fc eval start --region=cn-hangzhou --function-name cpu-test --service-name dsp-test --function-type event  --eval-type memory  --run-count 10   --payload {"key":"val"} --memory-size 128,256,512,1024,1536,3072  --access default
```
上述命令， 表示对 Event 类型的函数 dsp-test/cpu-test 进行内存模式探测， 探测的内存列表为 `[128, 256, 512, 1024, 1536, 3072]` ,  被探测的函数在不同的内存模式下各自被调用 10 次，探测结束后， 会生成一个 url， 打开这个 url， 可以可视化展示结果， 比如：

[http://memory-tunning.devsapp.cn/#gAAAAQACAAQ=;ZMsORykTkEZcbQVGKexxRQ==;naKfOJZloTgdDZY4jhWIOA==](http://memory-tunning.devsapp.cn/#gAAAAQACAAQ=;ZMsORykTkEZcbQVGKexxRQ==;naKfOJZloTgdDZY4jhWIOA==)


### 并发度探测模式
如果您的函数是 IO 密集型， 您一般是设置[单实例多并发](https://help.aliyun.com/document_detail/144586.html), 
在函数计算中， CPU 能力跟内存大小成正比， 大约 1.5G 对应 1 核 CPU,  所以在单实例多并发模式下， 一般建议函数内存足够大些， 比如 1.5G 进行探测:

```bash
s cli fc@dev eval start --region cn-hangzhou --function-name http-hello --service-name dsp-test --function-type http   --eval-type concurrency --memory 1536 --concurrency-args 2,20,5 --rt 200 --method=get --path /login  --query 'a=1&b=2' --access default
```
上述命令， 表示对 Http 类型的函数 dsp-test/http-hello 进行并发度模式探测，探测的函数内存为1.5G，并发度范围为 2-20, 步长为5，即探测的并发度列表为 `[2, 7, 12, 17]` ，最大 RT 为 200ms(即随着并发度增大， RT增加大超过这个限制值， 则后续更大的并发度不用探测了),  探测结束后， 会生成一个 url， 打开这个 url， 可以可视化展示结果， 比如：

[http://concurrency-tunning.devsapp.cn/#AgAHAAwAEQA=;MZ3FQWCjv0FrF7xBS63kQQ==;AADAQAAAIEIAAFBCAAAwQg==](http://concurrency-tunning.devsapp.cn/#AgAHAAwAEQA=;MZ3FQWCjv0FrF7xBS63kQQ==;AADAQAAAIEIAAFBCAAAwQg==)

#### 建议
- 您第一次探测的时候， 可以稍微将步长调整大些， 根据探测后的 UI， 缩小探测范围和步长， 直至逼近符合自己需求的最优解。

- 探测的时候， 选择 1.5G， 比如探测的最优并发度是4， 当函数内存调整为 3G 的时候， 正常来说， 最优并发度一般是 8

