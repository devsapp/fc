---
title: 本地调用 local
description: '本地调用 local'
position: 1
category: '调用&调试'
---

# Local 命令

`local` 命令是在本地对函数调试的命令。

- [Local 命令](#local-命令)
  - [命令解析](#命令解析)
  - [local invoke 命令](#local-invoke-命令)
    - [参数解析](#参数解析)
    - [操作案例](#操作案例)
  - [local start 命令](#local-start-命令)
    - [参数解析](#参数解析-1)
    - [操作案例](#操作案例-1)
    - [注意事项](#注意事项)
  - [调用时模拟 NAS 目录](#调用时模拟-nas-目录)
  - [断点调试](#断点调试)
    - [VSCode](#vscode)
      - [调试 Event 函数](#调试-event-函数)
        - [step1：打开终端，进入目标项目下，输入启动指令](#step1打开终端进入目标项目下输入启动指令)
        - [step2：启动断点调试器](#step2启动断点调试器)
        - [断点调试实操视频](#断点调试实操视频)
      - [调试 HTTP 函数](#调试-http-函数)
        - [step1：打开终端，进入目标项目下，输入启动指令](#step1打开终端进入目标项目下输入启动指令-1)
        - [step2：启动断点调试器](#step2启动断点调试器-1)
        - [step3：开始断点调试](#step3开始断点调试)
        - [step4：结束断点调试](#step4结束断点调试)
        - [断点调试实操视频](#断点调试实操视频-1)
    - [Intellij](#intellij)
      - [step1：打开终端，进入目标项目下，输入启动指令](#step1打开终端进入目标项目下输入启动指令-2)
      - [step2：启动断点调试器](#step2启动断点调试器-2)
      - [断点调试实操视频](#断点调试实操视频-2)
    - [Pycharm](#pycharm)
      - [step1：打开终端，进入目标项目下，输入启动指令](#step1打开终端进入目标项目下输入启动指令-3)
      - [step2：启动断点调试器](#step2启动断点调试器-3)
      - [step3：开始断点调试](#step3开始断点调试-1)
      - [step4：结束断点调试](#step4结束断点调试-1)
      - [断点调试实操视频](#断点调试实操视频-3)
  - [附录](#附录)
    - [默认断点调试参数](#默认断点调试参数)

> ⚠️ 注意：该命令对 Docker 有所依赖，所以在使用该命令时，需要先进行 [Docker 安装](https://docs.docker.com/get-started/#download-and-install-docker) 。

## 命令解析

当执行命令`local -h`/`local --help`时，可以获取帮助文档。

在该命令中，包括了两个个子命令：

- [invoke：本地调试事件函数](#local-invoke-命令)
- [start：本地调试 HTTP 函数](#local-start-命令)

> 未支持**非webserver模式**

## local invoke 命令

`local invoke` 命令，是进行本地事件函数调试的命令。

> 💡 事件函数指的是非 HTTP 触发器的函数，包括不限于 OSS 触发器函数、CDN 触发器函数、Tablestore 触发器函数等。

当执行命令`local invoke -h`/`local invoke --help`时，可以获取帮助文档。

### 参数解析

| 参数全称      | 参数缩写 | Yaml 模式下必填 | 参数含义|
| ------------- | -------- | --------------- | --------- |
| event         | e        | 选填            | 传入 `event` 函数的 `event` 事件数据，可以通过 `s cli fc-event` 指令快速获取事件数据示例，详细操作参考[这里](https://github.com/devsapp/fc/blob/main/docs/zh/command/invoke.md#注意事项)                    |
| event-file    | f        | 选填            | 以文件形式传入 `event` 事件数据                                                                                                                                                                             |
| event-stdin   | s        | 选填            | 以标准输入形式传入 `event` 事件数据                                                                                                                                                                         |
| mode          | m        | 选填            | 调试模式选择，包括：<br> - `normal`: 默认模式，本地函数运行容器在函数执行完成后立刻退出<br>`server`: 本地函数运行容器一直存在，用户在其他终端发起的本地调用（注意两次命令要使用同一个 s.yaml）会复用该容器 <br>`api`: 启动服务供本地 InvokeFunction API 或者 SDK 进行调用，详情请参见 [invokeFunction](https://help.aliyun.com/document_detail/191156.htm#doc-api-58601-InvokeFunction) 和 [SDK 列表](https://help.aliyun.com/document_detail/53277.htm#concept-2260089)。 |
| config        | c        | 选填            | 指定断点调试时使用的 IDE，取值范围：`vscode, pycharm, intellij`                                                                                                                                             |
| debug-port    | d        | 选填            | 指定断点调试端口                                                                                                                                                                                            |
| debug-args    | -        | 选填            | 断点调试时传入的参数, 详情见附录中的默认断点调试参数                                                                                                                                                        |
| debugger-path | q        | 选填            | 自定义断点调试器路径，会将本地指定路径挂载到程序运行环境的 /tmp/debugger_file 之中                                                                                                                          |
| tmp-dir       | -        | 选填            | 自定义函数运行环境中 `/tmp` 路径的本机挂载路径，默认为 `./.s/tmp/invoke/serviceName/functionName`/                                                                                                          |
| server-port   | -        | 选填            | 自定义本地监听 `server` 的端口，默认是在 7000 到 8000 间的随机端口                                                                                                                                          |
| sdk-version   | -        | 选填            | 选填                                                                                                                                                                                                        | 使用旧版的路径调用函数。取值范围：`2016-08-15` |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`, `--help`等），详情可参考 [Serverless Devs 全局参数文档](https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/command/readme.md#%E5%85%A8%E5%B1%80%E5%8F%82%E6%95%B0)

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s local invoke `进行本地调试，完成的输出示例：

```
FC Invoke Start RequestId: 0ba8ac3f-abf8-46d4-b61f-8e0f9f265d6a
2021-11-11T05:45:58.027Z 0ba8ac3f-abf8-46d4-b61f-8e0f9f265d6a [INFO] hello world
FC Invoke End RequestId: 0ba8ac3f-abf8-46d4-b61f-8e0f9f265d6a
hello world

RequestId: 0ba8ac3f-abf8-46d4-b61f-8e0f9f265d6a 	 Billed Duration: 146 ms 	 Memory Size: 128 MB 	 Max Memory Used: 23 MB
```

## local start 命令

`local start` 命令，是进行本地 HTTP 函数调试的命令。

当执行命令`local start -h`/`local start --help`时，可以获取帮助文档。

### 参数解析

| 参数全称      | 参数缩写 | Yaml 模式下必填 | 参数含义                                                                                           |
| ------------- | -------- | --------------- | -------------------------------------------------------------------------------------------------- |
| config        | c        | 选填            | 指定断点调试时使用的 IDE，可选：`vscode, pycharm, intellij`                                        |
| debug-port    | d        | 选填            | 指定断点调试端口                                                                                   |
| custom-domain | -        | 选填            | 以自定义域名作为 HTTP Server 的访问 url                                                            |
| debug-args    | -        | 选填            | 断点调试时传入的参数，详情见附录中的默认断点调试参数                                               |
| debugger-path | -        | 选填            | 自定义断点调试器路径，会将本地指定路径挂载到程序运行环境的 /tmp/debugger_file 之中                 |
| tmp-dir       | -        | 选填            | 自定义函数运行环境中 `/tmp` 路径的本机挂载路径，默认为 `./.s/tmp/invoke/serviceName/functionName/` |
| server-port   | -        | 选填            | 自定义本地监听 HTTP Server 的端口，默认是在 7000 到 8000 间的随机端口                              |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`, `--help`等），详情可参考 [Serverless Devs 全局参数文档](https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/command/readme.md#%E5%85%A8%E5%B1%80%E5%8F%82%E6%95%B0)

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s local start `进行资源部署，部署完成的输出示例：

```text
 	url: http://localhost:7665/2016-08-15/proxy/fc-deploy-service/http-trigger-py36/
	methods: GET
	authType: anonymous

    Tips for more action:
        Start with customDomain method: [s local start auto]
        Debug with customDomain method: [s local start -d 3000 auto]
```

此时，可以根据命令行提示的`url`信息，在浏览器中查看 HTTP 函数本地调试的具体内容。

如果需要通过自定义域名的方式调试 HTTP 函数，则可以在调试时增加`--custom`参数，输出示例：

```
  url: http://localhost:7308/
	methods: GET
	authType: anonymous
```

> 关于自定义域名调试模式以及默认的调试模式区别：在使用函数计算的 HTTP 函数时，是有两个域名组成：
>
> - 系统域名地址，例如`http://localhost:7665/2016-08-15/proxy/fc-deploy-service/http-trigger-py36/`
> - 自定义域名地址，例如`http://abc.com`/
>
> 这两个地址在非 custom runtime 函数中是没有区别的，而对于 custom-runtime/custom-container 函数，这两个地址的核心区别是其`path`不同，例如以传统的 Web 框架为例：
>
> - 系统域名地址的基础路径匹配是：`/2016-08-15/proxy/fc-deploy-service/http-trigger-py36/`
> - 自定义域名地址的基础路径匹配可以是任何形式，包括`/`
>
> 由于路径的不同，所以在代码开发和处理的时候，都会有所不同，如果使用某个 Web 框架（例如 Express、Django 等），匹配的首页地址为`/`，那么使用系统域名地址则可能会出现`404`，这个时候较为推荐使用自定义域名，获得更原生的体验。所以为了满足开发者在系统域名与自定义域名不同模式下的调试需要，本组件支持`--custom-domain`参数进行自定义域名模式调试。
> 如果既要使用 custom-runtime/custom-container 函数，又要使用系统域名，还要不处理系统基础路径，那么可以在发给函数的 HTTP 请求中增加 header: `x-fc-invocation-target: 2016-08-15/proxy/$ServiceName/$functionName` 即可


执行 `s local invoke --mode api` 使用 Node SDK 调用示例：

1. 执行 `s local invoke --mode api --server-port 7000`
2. 进入一个测试文件, 执行 `npm install @alicloud/fc2`，编写测试脚本 `index.js`
```
const FC = require('@alicloud/fc2');

const client = new FC('AccountId', {
  accessKeyID: 'accessKeyID',
  accessKeySecret: 'accessKeySecret',
  endpoint: 'http://localhost:7000',
  region: 'region',
});

(async function () {
  const res = await client.invokeFunction('servcieName', 'functionName', 'parames');
  console.log(res.headers);
  console.log(res.data);
})()
```
3. 调用脚本 `node index`

示意图如下:
![示例](https://img.alicdn.com/imgextra/i4/O1CN01jglKmG1HIftYGMspX_!!6000000000735-2-tps-2880-1800.png)

### 注意事项

针对 s local start 本地调用交互设计：

- 如果不存在 customDomains 配置，一定使用系统域名路径：`/2016-08-15/proxy/serviceName/functionName/`
- 存在 customDomains 配置
  1. 指定 --custom-domain 参数, 使用指定域名配置的路径
  2. 未指定 --custom-domain
     2.1 如果 customDomains 仅有一个，直接使用此域名配置的路径
     2.2 如果存在多个则产生`交互`，选择配置的域名路径
     > 如果使用系统域名路径，使用 --custom-domain system 或者选择时候选择 system

## 调用时模拟 NAS 目录

当 yaml 中配置了 nasConfig 时，local 可以模拟 nas 的目录结构，例如：

`s.yaml` 配置如下

```yaml
services:
  helloworld:
    component: fc
    props:
      region: cn-hangzhou
      service:
        name: hello-world-service
        description: 'hello world by serverless devs'
        vpcConfig: auto
        nasConfig:
          userId: 10003
          groupId: 10003
          mountPoints:
            - serverAddr: xxx.cn-hangzhou.nas.aliyuncs.com
              nasDir: /hello-world-service
              fcDir: /mnt/auto
      function:
        name: event-py3
        description: 'hello world by serverless devs'
        runtime: python3
        codeUri: ./code
        handler: index.handler
        memorySize: 128
        timeout: 60
```

`code/index.py` 内容如下

```python
# coding=utf-8
import logging
import os

def handler(event, context):
  logger = logging.getLogger()
  logger.info('============')
  os.system("ls /mnt/auto")
  logger.info('============')
  return 'hello world\n'
```

`s.yaml` 同目录级别 `.s/nas/auto-default/hello-world-service` 的目录下存在一个文件为 `test.ts` 的文件，目录结构及执行结果如下：
<img src="https://img.alicdn.com/imgextra/i4/O1CN01NqMcAX1h6vhheEDlz_!!6000000004229-2-tps-2494-1536.png"/>

## 断点调试

### VSCode

使用 VSCode 进行断点调试时，流程十分简单。

#### 调试 Event 函数

##### step1：打开终端，进入目标项目下，输入启动指令

```
$ s local invoke --config vscode --debug-port 3000
```

启动指令执行后，本地的函数计算执行容器会有一定阻塞，我们需要等待调用；与此同时当前项目会自动生成 .vscode/launch.json 文件，该文件是基于 VSCode 进行调试的配置文件，若该文件已经存在，那么启动指令会打印相应配置文本，如下图所示，需要利用这部分内容覆盖已有 .vscode/launch.json 中的内容。
![](https://img.alicdn.com/imgextra/i3/O1CN01DcU4ca1VBiSYwrFh4_!!6000000002615-2-tps-1142-387.png)

##### step2：启动断点调试器

打开 VSCode 界面，然后打开 s.yml 中 codeUri 所存放的源代码，为其打上断点，接着点击开始调试按钮，具体执行如下图所示。
![](https://img.alicdn.com/imgextra/i3/O1CN01yycXnv1vzLO4cB9pv_!!6000000006243-2-tps-750-410.png)

启动调试器后，程序便已经启动，此时就可以开始进行我们的断点调试工作了。

##### 断点调试实操视频

- Event 函数

  [![Watch the video](https://img.alicdn.com/imgextra/i4/O1CN01ejBHk91EveiZyOm7j_!!6000000000414-2-tps-661-369.png)](https://images.devsapp.cn/s-tool/zh/debug/VScode-%E6%9C%AC%E5%9C%B0%E8%B0%83%E8%AF%95Event%E5%87%BD%E6%95%B0.mp4)

- php7.2 event 函数
  php7.2 runtime 的本地调试 IDE 建议使用 VSCode，其断点调试步骤与其他语言有一定差异性，因此单独进行介绍

  [![Watch the video](https://img.alicdn.com/imgextra/i3/O1CN010wEPmM1rFlVc9UIb6_!!6000000005602-2-tps-673-376.png)](https://images.devsapp.cn/s-tool/zh/debug/VSCode-%E6%9C%AC%E5%9C%B0%E8%B0%83%E8%AF%95php7.2event%E5%87%BD%E6%95%B0.mp4)

#### 调试 HTTP 函数

##### step1：打开终端，进入目标项目下，输入启动指令

```
$ s local start --config vscode --debug-port 3000
```

启动指令执行后，本地的函数计算执行容器会阻塞等待调用，并打印访问 http 函数的 url 字段。

##### step2：启动断点调试器

打开 VSCode 界面，然后打开 s.yml 中 codeUri 存放的源代码，为其打上断点，接着点击开始调试按钮，如图所示。此时在启动指令终端页面，会出现 "Debugger attached." 字段，说明调试器启动成功，等待被调用。
![](https://img.alicdn.com/imgextra/i1/O1CN01qE10mn1T09Dv5aCO3_!!6000000002319-2-tps-793-453.png)

##### step3：开始断点调试

可以通过 curl 指令、浏览器等方式访问 Http 函数的 URL，此时程序启动，断点调试开始。

##### step4：结束断点调试

调试完成后，主动关闭断点调试器，然后在启动指令终端页面，执行 Ctrl+C 即可退出调试进程。

##### 断点调试实操视频

- Http 函数

  [![Watch the video](https://img.alicdn.com/imgextra/i2/O1CN01MpMnk31IJQ7I1uh9D_!!6000000000872-2-tps-671-375.png)](https://images.devsapp.cn/s-tool/zh/debug/VSCode%E6%9C%AC%E5%9C%B0%E8%B0%83%E8%AF%95HTTP%E5%87%BD%E6%95%B0.mp4)

- php7.2 Http 函数

  [![Watch the video](https://img.alicdn.com/imgextra/i3/O1CN01JIBhfd1kuLHglnrlj_!!6000000004743-2-tps-674-375.png)](https://images.devsapp.cn/s-tool/zh/debug/VSCode%E6%9C%AC%E5%9C%B0%E8%B0%83%E8%AF%95php7.2http%E5%87%BD%E6%95%B0.mp4)

### Intellij

基于 Intellij 进行断点调试时，针对不同语言需要手动在 IDE 中配置相应地断点调试器，由于使用 Intellij 开发最多的语言是 Java，同时更换 IDE 后，唯一不同的步骤只有“启动断点调试器”，因此接下来我们将以本地调试 Java Event 函数为例，对“启动断点调试器”步骤进行详细说明。

##### step1：打开终端，进入目标项目下，输入启动指令

由于 Java 是编译型语言，因此在开始前需要对程序进行打包，本文示例会使用 mvn package 对函数打包

```
$ mvn package
$ s local invoke --config intellij --debug-port 3000
```

##### step2：启动断点调试器

- 打开 `Intellij` 界面，在菜单栏依次选择 `Run -> Edit Configurations`, 随后如下图所示，新建一个 `Remote JVM Debug`。
  ![](https://img.alicdn.com/imgextra/i3/O1CN01rauocH1lv5Y3crJOB_!!6000000004880-2-tps-1080-389.png)

- 接着，自定义调试器名称，并将端口设置为 3000，如下图所示。
  ![](https://img.alicdn.com/imgextra/i4/O1CN01FRAQlP1cXQXeReL4z_!!6000000003610-2-tps-1080-817.png)

- 最后，打开 s.yml 中 codeUri 存放的源代码，为其打上断点，接着点击开始调试按钮，如图所示。
  ![](https://img.alicdn.com/imgextra/i1/O1CN01uaa9LY1kBSTUS6hdp_!!6000000004645-2-tps-1080-663.png)

##### 断点调试实操视频

[![Watch the video](https://img.alicdn.com/imgextra/i3/O1CN0189GDWP23hxH8tsgdB_!!6000000007288-2-tps-670-375.png)](https://images.devsapp.cn/s-tool/zh/debug/Intellij-%E6%9C%AC%E5%9C%B0%E8%B0%83%E8%AF%95event%E5%87%BD%E6%95%B0.mp4)

### Pycharm

Pycharm 支持的运行时有 python2.7 和 python3 两个版本。在 Pycharm 中进行断点调试时，不仅需要在 IDE 中配置断点调试器，还需要对使用者的源码进行侵入式修改，由于操作步骤内容与常规内容有所不同，接下来我们详解一下这部分的调试步骤。

##### step1：打开终端，进入目标项目下，输入启动指令

```
# event 函数
$ s local invoke --config pycharm --debug-port 3000

# http 函数
$ s local start --config pycharm --debug-port 3000
```

与之前不同的是，Event 函数启动指令执行完成后，并不会出现阻塞的情况，而是会直接执行成功。此时就需要记录 "Tips for PyCharm remote debug" 内容，具体内容示例如图所示，记录完成后，如果是 Http 函数，则输入 `Ctrl+C` 退出启动程序。

![](https://img.alicdn.com/imgextra/i4/O1CN01vxayMj1IjWh4a5i2L_!!6000000000929-2-tps-1080-264.png)

##### step2：启动断点调试器

启动断点调试器主要包含 IDE 断点调试器配置和源码更新两部分。

- 打开 pycharm 界面，在菜单栏依次选择 `Run -> Edit Configurations`。
- 如图中所示，新建一个 `Python Debug Server`。
  ![](https://img.alicdn.com/imgextra/i1/O1CN01QlrjAe1pVg2MNLEPp_!!6000000005366-2-tps-1080-391.png)

- 设置自定义调试器名称，并基于图五中获取的内容配置 IDE host name、Port 以及 Path mappings 这三个调试器配置的详情，如图中所示。
  ![](https://img.alicdn.com/imgextra/i2/O1CN010qBsQo22AgtMCu8NL_!!6000000007080-2-tps-1080-625.png)

- 打开 s.yml 中 codeUri 存放的源代码，将例图中（Tips for PyCharm remote debug 内容示例）的代码内容粘贴到代码开头，然后按需在源码指定位置打上断点，接着点击开始调试按钮，具体操作如图 （pycharm 启动断点调试器）所示。
  ![](https://img.alicdn.com/imgextra/i4/O1CN01ENud231UW2PkcpN8x_!!6000000002524-2-tps-1080-264.png)
  ![](https://img.alicdn.com/imgextra/i2/O1CN01zRnzCw1LJpJcXBFZN_!!6000000001279-2-tps-1080-676.png)

##### step3：开始断点调试

打开终端，并进入目标项目，执行启动指令

> 此时可以不用带上断点调试的相关参数。

```
# event 函数
$ s local invoke

# http 函数
$ s local start
```

- Event 函数启动指令执行后会直接进入断点调试阶段

- Http 函数启动指令执行后，可以先通过 curl 指令、浏览器等方式访问 Http 函数的 URL，此时程序会启动，断点调试就开始了。

##### step4：结束断点调试

调试完成后，主动关闭断点调试器，对于 Http 函数而言，在启动指令终端页面，需执行 `Ctrl+C` 方可退出调试进程。

##### 断点调试实操视频

- Event 函数

  [![Watch the video](https://img.alicdn.com/imgextra/i4/O1CN01DSJxlj28W775uuLns_!!6000000007939-2-tps-671-376.png)](https://images.devsapp.cn/s-tool/zh/debug/Pycharm-%E6%9C%AC%E5%9C%B0%E8%B0%83%E8%AF%95event%E5%87%BD%E6%95%B0.mp4)

- Http 函数

  [![Watch the video](https://img.alicdn.com/imgextra/i2/O1CN011WyGpC1Kyl66oQlkv_!!6000000001233-2-tps-670-375.png)](https://images.devsapp.cn/s-tool/zh/debug/Pycharm-%E6%9C%AC%E5%9C%B0%E8%B0%83%E8%AF%95HTTP%E5%87%BD%E6%95%B0.mp4)

## 附录

### 默认断点调试参数

| **Runtime**       | **Default Debug Args**                                                                    |
| ----------------- | ----------------------------------------------------------------------------------------- |
| nodejs 6          | `--debug-brk=${debugPort}`                                                                |
| nodejs 8/10/12/14 | `--inspect-brk=0.0.0.0:${debugPort}`                                                      |
| python 2.7/3/3.9  | `-m ptvsd --host 0.0.0.0 --port ${debugPort} --wait`                                      |
| java 8            | `-agentlib:jdwp=transport=dt_socket,server=y,suspend=y,quiet=y,address=${debugPort}`      |
| java 11           | `-agentlib:jdwp=transport=dt_socket,server=y,suspend=y,quiet=y,address=*:${debugPort}`    |
| php7.2            | `remote_enable=1 remote_autostart=1 remote_port=${debugPort} remote_host=${ip.address()}` |
