# 部署操作：Deploy

- [快速使用](#快速使用)
- [高阶功能](#高阶功能)
    - [部署时忽略某些文件](#部署时忽略某些文件)
    - [如何部署多个函数](#如何部署多个函数)
    - [代码包处理](#代码包处理)
    - [函数部署的"底座"](#函数部署的底座)
        - [pulumi部署方案](#pulumi部署方案)
        - [sdk部署方案](#sdk部署方案)
    - [如何支持CI/CD](#如何支持CICD)
- [其他方案切换](#其他方案切换)
    - [从Funcraft过渡到Serverless Devs](#从Funcraft过渡到Serverless-Devs)
    - [从ROS切换到Serverless Devs](#从ROS切换到Serverless-Devs)
- [操作所需权限](../Others/authority/command.md#deployremove-指令)

--------

阿里云函数计算（FC）组件为使用者提供了FC相关资源的部署能力。可以通过`deploy`指令，快速进行部署操作。

您可以通过`deploy -h`/`deploy --help`参数，唤起帮助信息。例如执行`s deploy -h`后，可以看到：

```

Deploy

  The ability to deploy resources                                               
  Executing `s deploy` is equivalent to `s deploy all`                           

Usage

  $ s deploy <sub-command> 

SubCommand List

  all        Deploy all resources, you can get help through [s deploy all -h]                
  service    Only deploy service resources, you can get help through [s deploy service -h]   
  function   Only deploy function resources, you can get help through [s deploy function -h] 
  trigger    Only deploy trigger resources, you can get help through [s deploy trigger -h]   
  domain     Only deploy domain resources, you can get help through [s deploy domain -h] 
```

Deploy 支持了一些子指令，更具体的信息请执行 `s deploy <sub-command> <options>` 查看。 
````
Usage

  $ s deploy <sub-command> <options> 

Options

  --type string       Only deploy configuration or code Value: code, config              
  --use-local         Deploy resource using local config                                 
  -y, --assume-yes    Assume that the answer to any question which would be asked is yes 

Global Options

  -h, --help            Help for command          
  -a, --access string   Specify key alias         
  --debug               Output debug informations 
````

# 快速使用

当我们下载好[Serverless Devs开发者工具](../Getting-started/Install-tutorial.md), 并完成[阿里云密钥配置](../Getting-started/Setting-up-credentials.md)之后，我们可以根据自身的需求进行资源的部署。

通过`deploy`方法，可以快速将通过Yaml描述的资源，部署到线上，例如现在有一个描述文档：

```
# s.yaml
edition: 1.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: fcDeployApp       #  项目名称

services:
  fc-deploy-test: 
    component: devsapp/fc  # 组件名称
    props: #  组件的属性值
      region: cn-hangzhou
      service:
        name: fc-deploy-service
        description: 'demo for fc-deploy component'
        internetAccess: true
      function:
        name: http-trigger-function
        description: this is a test
        runtime: nodejs10
        codeUri: ./
        handler: index.handler
        memorySize: 128
        timeout: 60
        initializationTimeout: 60
        initializer: index.initializer
        instanceConcurrency: 1
        instanceType: e1
        environmentVariables:
          testEnv: true
      triggers:
          - name: httpTrigger
            type: http
            config:
              authType: anonymous
              methods:
                - GET
```

此时，只需要执行`s deploy`即可部署对应的资源：
- 服务名为fc-deploy-service，函数名为http-trigger-function的资源
- 同时配有一个http触发器
- 函数的代码是`./`目录下的，并且是nodejs10的运行时

# 高阶功能

## 部署时忽略某些文件

在代码目录放置一个 .fcignore 文件，部署文件的时候可以排除掉 .fcignore 描述的文件或者文件夹。 例如：

```
# Logs
logs/
*.log
 
# Dependency directories
node_modules/
!bb/node_modules
```

打包时会忽略 logs/ 目录 、*.log 文件。所有层级的 node_modules/ 目录会被忽略，但是 bb/node_modules 会被保留。

.fcignore 遵从 .gitignore 的语法。

## 如何部署多个函数

如果我现在需要部署多个函数：

- 函数1：
    - 名称：function-a
    - 代码：./a
- 函数2：
    - 名称：function-b
    - 代码：./b

此时，我可以将配置文件(`s.yaml`)写成：

```
# s.yaml
edition: 1.0.0
name: fcDeployApp

vars:
  region: cn-hangzhou
  service: 
    name: fc-deploy-service
    description: 'demo for fc-deploy component'
    internetAccess: true

services:
  fc-deploy-test-function-a:
    component: devsapp/fc
    props:
      region: ${vars.region}
      service: ${vars.service}
      function:
        name: function-a
        description: this is a test
        runtime: nodejs10
        codeUri: ./a
        handler: index.handler
        memorySize: 128
        timeout: 60
  fc-deploy-test-function-b:
    component: devsapp/fc
    props:
      region: ${vars.region}
      service: ${vars.service}
        function:
          name: function-b
          description: this is a test
          runtime: nodejs10
          codeUri: ./b
          handler: index.handler
          memorySize: 128
          timeout: 60
```

此时，我执行`s deploy`即可同时部署函数`function-a`和`function-b`。

如果此时，我单独想要部署函数`function-b`，可以执行:

```
s fc-deploy-test-function-b deploy
```

同理，如果想要单独部署`function-a`，可以执行：

```
s fc-deploy-test-function-a deploy
```

## 代码包处理

代码包的处理是一个比较复杂的的场景，就大小来说：
- 如果代码包小于 50M，那么 deploy code 仅需要压缩上传代码修改函数
- 如果代码包代码大于 50M并且小于 100M，deploy code 时就需要用户配置指定一个 OSS 的 Bucket，工具这时会做三个动作
  1. 压缩代码包
  2. 将这个代码包上传到配置的 OSS Bucket 中
  3. 使用第二步的文件地址作为配置修改函数
- 如果代码包代码100M，这时可以有几个选择
  1. 如果是 node 或着 python，可以将依赖放到 layer 中
  2. 如果对冷启动不敏感，可以使用 [Custom Container](https://help.aliyun.com/document_detail/179368.html#title-3j5-18t-n7i)
  3. 使用[性能实例](https://help.aliyun.com/document_detail/179379.html#title-55k-dg6-iou) 最大可以到 100M
  4. 将依赖和部分代码放到 NAS 中。优点：代码包理论上可以放到无限大；缺点：服务的版本别名无法对这部分代码进行管理，至今没有可视化部分，上传和下载都需要通过一些辅助手段来操作。
- 有部分用户情况比较特殊，代码包的限制不是 100M，这时可以在自己的机器上指定临时环境变量`FC_CODE_SIZE_WITH_OSS`控制大小，例如 mac 机器设置 500M：`export FC_CODE_SIZE_WITH_OSS=524288000`


> [大代码包部署的实践案例](https://github.com/awesome-fc/fc-faq/blob/main/docs/大代码包部署的实践案例.md)


## 函数部署的"底座"

传统情况下，在我们部署函数的时候，我们可能涉及到多种部署方法：
- 通过API/SDK直接部署
- 通过一些IaC平台/工具部署

在Serverless Devs的FC组件中，同样支持多种部署模式：
- pulumi部署方案
- sdk部署方案

这两种部署方案仅是底层实现的区别，对用户的影响并不大，用户可以根据自己的爱好来选择两种部署方法。无论选择哪种部署方案，其Yaml的格式是一致的，无需额外修改。

### pulumi部署方案

使用pulumi部署方案很简单， 只需要执行`s cli fc-default set deploy-type pulumi`，即可切换默认部署方法为通过pulumi部署。

通过Pulumi部署速度可能会相对慢一些，但是他会相对来说更加安全和科学，所有的流程交给pulumi托管。

### sdk部署方案

使用sdk部署方案很简单， 只需要执行`s cli fc-default set deploy-type sdk`，即可切换默认部署方法为通过sdk部署。

通过SDK部署速度可能会相对快一些。

## 如何支持CI/CD

函数计算的CI/CD能力是我们一直探索和不断尝试部分。通过Serverless Devs如何快速创建CI/CD流程，可以参考[CI/CD文档](https://github.com/serverless-devs/cicd)

以Github Action为例， 只需要在当前项目下执行：

```
s cli cicd github
```

即可快速创建相关的模板。根据命令行的提醒，即可按照相关的操作方案和最佳实践，配置自己的CI/CD能力：

```
[2021-06-07T13:57:45.138] [INFO ] [CICD] - 
        
    👌 Github Action CI/CD template created successfully.
       1️⃣ Edit the file [./.github/workflow/serverless-devs.yml] to complete the CI/CD function configuration
       2️⃣ Configure user key information through GitHub Secrets
    
    Related documents：
      🛸 如何通过Github Action使用Serverless Devs做CI/CD：http://short.devsapp.cn/cicd/github/action/usage
    Best practices：
      🍉 Serverless Devs的官网是通过Serverless Devs部署的: http://short.devsapp.cn/cicd/github/action/practice
```


# 其他方案切换

## 从Funcraft过渡到Serverless Devs

如果您之前使用了Funcracf来进行函数的管理，此时您可以考虑以下两种方法进行切换，也可以参考[更详细的文档](../Others/fun-fc.md)

### Yaml的转换

[推荐] 通过我们提供一键切换指令，将Funcraft的Yaml切换成Serverless Devs可以识别的Yaml；


使用方法为：`s cli fc-transform fun2fc`

参数包括：

```
--source          Specify fun configuration path(default: template.[yaml|yml]). 
--target          Specify serverless devs configuration path(default: s.yaml).  
--force           Mandatory overwrite s file                                    
--region string   Pass in region in cli mode     
```

例如：

```
$ s cli fc-transform fun2fc --target test.yaml

[2021-06-11T12:21:51.022] [INFO ] [FC-TRANSFORM] - Using funcraft yaml: /Users/jiangyu/Desktop/test/template.yml
[2021-06-11T12:21:51.022] [INFO ] [FC-TRANSFORM] - Reminder serverless devs yaml path: /Users/jiangyu/Desktop/test/test.yaml

Tips for next step

======================
* Invoke Event Function: s local invoke -t test.yaml
* Invoke Http Function: s local start -t test.yaml
* Deploy Resources: s deploy -t test.yaml

End of method: fun2fc
```

即可看到已经生成文档`test.yaml`:

```
edition: 1.0.0
name: tramsform_fun
access: default
vars:
  region: cn-shenzhen
services:
  fc-test-test:
    component: devsapp/fc
    props:
      region: ${vars.region}
      service:
        name: test
        description: helloworld
        internetAccess: true
      function:
        name: test
        handler: index.handler
        runtime: nodejs10
        codeUri: ./
```

### 规范兼容

[不推荐] 在原有的Funcraft项目下，新建`s.yaml`，并将下面的代码拷贝粘贴到该文件：

```
edition: 1.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: funApp       #  项目名称
access: default  #  秘钥别名

services:
  fun-test: 
    component: fun  # 组件名称
    props: #  组件的属性值
      region: cn-hangzhou
      config: s
```

此时，即可完成Funcraft到Serverless Devs的过渡。

## 从ROS切换到Serverless Devs

可以直接参考已有的[ROS组件](https://github.com/devsapp/ros) ，通过该组件，可以部署ROS规范的项目。

