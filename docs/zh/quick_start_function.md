# 快速体验功能

- [快速体验功能](#快速体验功能)
  - [工具安装](#工具安装)
  - [密钥配置](#密钥配置)
  - [测试项目创建](#测试项目创建)
  - [功能体验](#功能体验)
    - [部署 deploy](#部署-deploy)
    - [调用相关](#调用相关)
      - [本地调用](#本地调用)
      - [远程调用](#远程调用)
    - [可观测性](#可观测性)
      - [日志查看](#日志查看)
      - [指标查看](#指标查看)
    - [其他](#其他)

## 工具安装
- 第一步：安装 Node.js(>=10.8.0) 与 NPM 包管理工具；  
- 第二步：安装 Serverless Devs 开发者工具；   
    ```shell script
    $ npm install @serverless-devs/s -g
    ```
- 第三步：可以通过`s -v`判断工具是否安装成功，如果安装成功可以看到相对应的版本信息，例如：
    ```shell script
    @serverless-devs/s: 2.0.89, @serverless-devs/core: 0.1.7, darwin-x64, node-v12.15.0
    ```

## 密钥配置

> 由于本快速上手文档，将会以 [阿里云函数计算](https://www.aliyun.com/product/fc) 为例，所以此处的密钥配置也是以阿里云密钥配置为例： 
> - AccountId获取页面：https://account.console.aliyun.com/#/secure  
> - 获取密钥页面：https://usercenter.console.aliyun.com/#/manage/ak

- 打开 [AccountId获取页面](https://account.console.aliyun.com/#/secure) 获取AccountId ：
  ![AccountId获取页面](https://images.devsapp.cn/access/aliyun-accountid.jpg)

- 打开 [获取密钥页面](https://usercenter.console.aliyun.com/#/manage/ak) 获取密钥信息 ：
  ![获取密钥页面](https://images.devsapp.cn/access/aliyun-access.jpg)
 
- 执行`s config add`，并选择`Alibaba Cloud (alibaba)`：
    ```shell script
    $ s config add 
    ? Please select a template: Alibaba Cloud (alibaba)
    🧭 Refer to the document for alibaba key:  http://config.devsapp.net/account/alibaba
    ? AccountID () 
    ```
- 此时，可以按照引导，进行密钥的配置：
    ```shell script
    ? Please select a template: Alibaba Cloud (alibaba)
    🧭 Refer to the document for alibaba key:  http://config.devsapp.net/account/alibaba
    ? AccountID 此处填写AccountID
    ? AccessKeyID 此处填写AccessKeyID
    ? AccessKeySecret 此处填写AccessKeySecret
    ? Please create alias for key pair. If not, please enter to skip alibaba-access
    
        Alias: alibaba-access
        AccountID: 此处填写AccountID
        AccessKeyID: 此处填写AccessKeyID
        AccessKeySecret: 此处填写AccessKeySecret
    
    Configuration successful
    ```
- 为了验证密钥是否正确配置，可以通过`s config get -a alibaba-access`进行指定密钥的查看：
    ```shell script
    $ s config get -a alibaba-access
    [2021-10-27T17:39:39.881] [INFO ] [S-CLI] - 
    
    alibaba-access:
      AccountID: 此处填*******tID
      AccessKeyID: 此处填*********yID
      AccessKeySecret: 此处填*************ret
    ```
  
  
> 云账号 AccessKey 是您访问阿里云 API 的密钥，具有该账户完全的权限，请您务必妥善保管！不要通过任何方式（e.g. Github）将 AccessKey 公开到外部渠道，以避免被他人利用而造成 [安全威胁](https://help.aliyun.com/knowledge_detail/54059.html?spm=5176.2020520153.0.0.57f1336a8PQ1KR) 。    
> 强烈建议您遵循 [阿里云安全最佳实践](https://help.aliyun.com/document_detail/102600.html?spm=5176.2020520153.0.0.57f1336a8PQ1KR) ，使用 RAM 子用户 AccessKey 来进行 API 调用。


## 测试项目创建

通过`s init`命令创建一个 Python 语言的 Hello World 项目，在引导的过程中，可能会出现填写项目名称以及选择密钥的过程：
- 项目名称可以是：`start-fc-http-python3`
- 密钥可以选择我们上文中创建过的：`alibaba-access`    
例如：
```shell script
$ s init devsapp/start-fc-http-python3

? 🚀 Serverless Awesome: https://github.com/Serverless-Devs/package-awesome

? Please input your project name (init dir) start-fc-http-python3
✔ file decompression completed
? please select credential alias alibaba-access

...

🏄‍ Thanks for using Serverless-Devs
👉 You could [cd /Users/jiangyu/demo/test/start-fc-http-python3] and enjoy your serverless journey!
🧭️ If you need help for this example, you can use [s -h] after you enter folder.
💞 Document ❤ Star：https://github.com/Serverless-Devs/Serverless-Devs

? 是否立即部署该项目？ (Y/n) 
```  
此时，可以先不进行项目的部署，即选择`n`即可。接下来，可以通过`cd`等命令进入项目（例如：`cd start-fc-http-python3`）。

## 功能体验

### 部署 deploy

为了便于后续的体验，可以对默认的`s.yaml`文件进行修改，增加自动化日志配置的能力：`logConfig: auto`，完整的项目 Yaml 如下：

```yaml
edition: 1.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: fcDeployApp       #  项目名称
access: "default"       #  秘钥别名

services:
  fc-deploy-test:           #  服务名称
    component: devsapp/fc   #  组件名称
    props:                  #  组件的属性值
      region: cn-hangzhou
      service:
        name: fc-deploy-service
        description: 'demo for fc-deploy component'
        logConfig: auto
      function:
        name: http-trigger-py36
        description: this is a test
        runtime: python3
        codeUri: ./code
        handler: index.handler
        memorySize: 128
        timeout: 60
      triggers:
        - name: httpTrigger
          type: http
          config:
            authType: anonymous
            methods:
              - GET
      customDomains:
        - domainName: auto
          protocol: HTTP
          routeConfigs:
            - path: /*
              methods:
                - GET
```

保存并退出编辑之后，可以执行`s deploy`直接进行项目的部署，稍等片刻，即可看到部署结果：

```shell script
fc-deploy-test: 
  region:   cn-hangzhou
  service: 
    name: fc-deploy-service
  function: 
    name:       http-trigger-py36
    runtime:    python3
    handler:    index.handler
    memorySize: 128
    timeout:    60
  url: 
    system_url:    https://1583208943291465.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/fc-deploy-service/http-trigger-py36/
    custom_domain: 
      - 
        domain: http://http-trigger-py36.fc-deploy-service.1583208943291465.cn-hangzhou.fc.devsapp.net
  triggers: 
    - 
      type: http
      name: httpTrigger
```

### 调用相关

#### 本地调用

由于该项目是一个 HTTP 函数，所以可以使用`s local start`进行本地调用的测试（如果是其他 Event 函数，可以考虑用 `s local invoke`）。

```shell script
 	url: http://localhost:7665/2016-08-15/proxy/fc-deploy-service/http-trigger-py36/
	methods: GET
	authType: anonymous

    Tips for more action:
        Start with customDomain method: [s local start auto]
        Debug with customDomain method: [s local start -d 3000 auto]
```

此时，可以根据系统返回的`url`参数，在浏览器中打开`http://localhost:7665/2016-08-15/proxy/fc-deploy-service/http-trigger-py36/`，进行 HTTP 函数的本地测试。


#### 远程调用

在当前项目下，直接使用 `s invoke` 即可实现线上函数的调用/触发：

```shell script
Request url: https://1583208943291465.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/fc-deploy-service/http-trigger-py36/

========= FC invoke Logs begin =========
FC Invoke Start RequestId: eb9cf022-297e-4a27-b3bf-ad304f6e04c9
FC Invoke End RequestId: eb9cf022-297e-4a27-b3bf-ad304f6e04c9

Duration: 2.64 ms, Billed Duration: 3 ms, Memory Size: 128 MB, Max Memory Used: 10.77 MB
========= FC invoke Logs end =========

FC Invoke Result[code: ${resp.code}]:
Hello world!
```

### 可观测性

#### 日志查看

在当前项目下，直接使用 `s logs` 命令，可以进行日志查看，也可以通过 `s logs -t` 进入到 `tail` 模式：


```shell script

FunctionCompute python3 runtime inited.


FC Invoke Start RequestId: eb9cf022-297e-4a27-b3bf-ad304f6e04c9
FC Invoke End RequestId: eb9cf022-297e-4a27-b3bf-ad304f6e04c9
```

#### 指标查看

在当前项目，直接执行 `s metrics` 命令，可以进行指标的查看：

```text
[2021-06-07T12:20:06.661] [INFO ] [FC-METRICS] - 请用浏览器访问Uri地址进行查看: http://localhost:3000
```

![image](https://user-images.githubusercontent.com/21079031/120958920-419b2400-c78b-11eb-9f3c-8b49c1354a37.png)

### 其他

更多命令的使用，可以参考命令帮助文档详情：

| 构建&部署 | 可观测性 | 调用&调试 |  发布&配置  |  其他功能 |
| --- | --- | --- |--- | --- |
| [**部署 deploy**](command/deploy.md)   | [指标查询 metrics](command/metrics.md) | [**本地调用 local**](command/local.md)      | [**版本 version**](command/version.md)      | [**硬盘挂载 nas**](command/nas.md) | 
| [**构建 build**](command/build.md)     | [日志查询 logs](command/logs.md)       | [远程调用 invoke](command/invoke.md)    | [**别名 alias**](command/alias.md)         | [查看函数 info](command/info.md)  | 
| [移除 remove](command/remove.md)   |                                              | [**端云联调 proxied**](command/proxied.md) | [预留 provision](command/provision.md)   | [**资源同步 sync**](command/sync.md) | 
|                                          |                                              | [实例登录 instance](command/instance.md)    | [按量资源 ondemand](command/ondemand.md) | [压测 stress](command/stress.md) | 
|                                          |                                              | [内存&并发度探测 eval](command/eval.md)  | [层 layer](command/layer.md) | [Fun项目迁移 fun2s](command/fun2s.md)                     | 
|                                          |                                              |   |  | [API调用 api](command/api.md)                     | 
