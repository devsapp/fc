# 常见小贴士

- [Serverless Devs和FC组件的关系](#serverless-devs和FC组件的关系)
- [如何声明/部署多个函数](#如何声明部署多个函数)
- [关于`.fcignore`使用方法](#关于fcignore使用方法)
- [关于`.env`使用方法](#关于env使用方法)
- [工具中`.s`目录是做什么](#工具中s目录是做什么)
- [函数进行build操作之后如何处理build的产物](#函数进行build操作之后如何处理build的产物)
- [Yaml是否支持全局变量/环境变量/引用外部文件](#Yaml是否支持全局变量环境变量引用外部文件)
- [通过环境变量配置组件](#通过环境变量配置组件)
- [项目实践案例](#项目实践案例)

## Serverless Devs和FC组件的关系

1. Serverless Devs是一个无厂商锁定Serverless的工具框架，本身不具任何能力，用户可以通过引入不同的组件使用不同的功能，例如：

   ![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1639104284744_20211210024516345769.png)

2. 而FC组件则是这个工具框架的一个组件，主要是对阿里云函数计算进行操作的，例如创建函数，删除函数、发布版本、业务构建、在线调试等；

> 如果需要进行比喻：
>
> - Serverless Devs是小时候玩的红白机，而fc组件，oss组件，nas组件等都是游戏卡，游戏机本身不具备啥功能，根据我们插入的游戏卡实现不同的功能；
> - Serverless Devs就相当于我们用的VSCode工具，本身不具备太多的能力，但是我们可以安装不同的插件，来丰富VSCode的能力，而这些插件对应到Serverless Devs生态中，就是不同的组件，例如fc组件，nas组件，oss组件等；

## 如何声明/部署多个函数

函数计算组件在单个模块下在仅支持一个服务对应一个函数，例如下面所示 Yaml 中`project1`仅有一个`service`与`function`：

```yaml
edition: 1.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: fcDeployApp       #  项目名称
access: "default"  #  秘钥别名

services:
  project1:
    component: devsapp/fc  # 组件名称
    props: #  组件的属性值
      region: cn-hangzhou
      service:
        name: fc-build-demo
        description: 'demo for fc-deploy component'
      function:
        name: py-event-function
        description: this is a test
```

如果需要一个`service`下由多个`function`，可以通过全局变量定义`service`，例如：

```yaml
edition: 1.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: fcDeployApp       #  项目名称
access: "default"  #  秘钥别名

vars:
  service:
    name: fc-build-demo
    description: 'demo for fc-deploy component'
services:
  project1:
    component: devsapp/fc  # 组件名称
    props: #  组件的属性值
      region: cn-hangzhou
      service: ${vars.service}
      function:
        name: py-event-function-1
        description: this is a test
  project2:
    component: devsapp/fc  # 组件名称
    props: #  组件的属性值
      region: cn-hangzhou
      service: ${vars.service}
      function:
        name: py-event-function-2
        description: this is a test
```

例如上面的 Yaml 中，全局变量`vars`定义了一个`service`，`project1`和`project2`同时通过魔法变量`${vars.service}`引用了这个`service`，然后分别对应了不同的函数`py-event-function-1`和`py-event-function-2`.

## 关于`.fcignore`使用方法

在代码目录放置一个 .fcignore 文件，部署文件的时候可以排除掉 .fcignore 描述的文件或者文件夹。 例如：

```
# Logs
logs/
*.log
 
# Dependency directories
node_modules/
!demo/node_modules
```

打包时会忽略 logs/ 目录 、*.log 文件。所有层级的 node_modules/ 目录会被忽略，但是 demo/node_modules 会被保留。

**使用场景**：部署大代码包时，通过 nas 命令将项目中的依赖放到 NAS 中，然后通过.fcignore对上传到 nas 的文件忽略掉，再将项目部署到线上。

## 关于`.env`使用方法
项目代码中涉及到数据库的连接信息，云账号的`AccessKeyID`, `AccessKeySecret`等敏感信息，禁止写死在代码中，提交到git仓库。否则会造成严重的安全风险。

### 使用步骤
1. 假设我的.env文件如下
```
AccessKeyID=xxxx
AccessKeySecret=xxxxxxx
```
> 注意：务必在`.gitignore`中忽略`.env`文件
2. 配置文件(`s.yaml`)可以将`.env`中变量作为环境变量传递到FC执行环境中：
```
# s.yaml
edition: 1.0.0
name: fcDeployApp
services:
  fc-deploy-test-function:
    component: devsapp/fc
    props:
      region: cn-hangzhou
      service: 
        name: fc-deploy-service
        internetAccess: true
      function:
        name: function-a
        runtime: nodejs10
        codeUri: ./code
        handler: index.handler
        memorySize: 128
        timeout: 60
        environmentVariables:
          AccessKeyID: ${env.AccessKeyID}
          AccessKeySecret: ${env.AccessKeySecret}
```
3. 在项目代码中读取环境变量
- 本地测试可以通过类似[dotenv](https://www.npmjs.com/package/dotenv)库来读取`.env`环境变量
- 在FC环境线上执行时候，会将环境变量直接注入到当前进程，Nodejs应用可以通过`process.env.AccessKeyID`直接获取环境变量。

## 工具中`.s`目录是做什么

在使用函数计算组件时，会默认生成`.s`目录，这个目录主要是过程中目录，包括一下能力：

1. 缓存一些数据和信息，例如你本次部署过程的一些线上资源情况等；例如，本次部署完成，工具会存放本次部署的日志在这个目录下，如果用户下次再进行部署，工具将会对比这个日志，与用户当前线上资源是否一致，如果不一致，则提醒用户可能存在线上资源在其他端修改的情况，是否要覆盖部署等操作，实际对应的就是[ deploy文档中的交互式操作部分](./command/deploy.md#注意事项) 表格中`本地记录的服务`与`本地记录的函数`；
2. 如果有build等操作，通常会存放build操作后的产物（Container场景除外），路径是：`./.s/build/artifacts/<服务名>/<函数名>/ `；

## 函数进行build操作之后如何处理build的产物

一般情况下，build之后的产物有以下几种情况：

1. Container情况，build之后是镜像地址，可以直接进行deploy操作，此时工具会自动push镜像到阿里云容器镜像服务，并且进行项目的部署；

2. 非Container情况下：

   - 用户代码包不大，直接部署：此时，可以考虑直接进行deploy操作，但是需要注意的是，不能在`.fcignore`文件中填写`.s`目录，在部署过程中会提醒是否添加对应的环境变量，可以选择`y`进行添加，以确保build后的产物生效；

   - 用户代码包比较大，需要上传NAS：如果代码包比较大，需要上传到NAS，则需要在`.fcignore`文件中增加`.s`目录，以忽略build的产物内容；需要在Yaml中`service`下配置`nasConfig`参数，部署过程中需要选择添加环境变量，确保build后的产物生效；项目部署操作完成之后上传`.s`目录下的产物，假如此时服务名称是`ai-cv-image-prediction`，函数名称是`server`，则build的产物（或者依赖）路径为`./.s/build/artifacts/ai-cv-image-prediction/server/ `，所以需要执行下面这条指令进行上传：

     ```
     s nas upload -r ./.s/build/artifacts/ai-cv-image-prediction/server/.s/python /mnt/auto/.s/python
     ```

     此时需要额外注意，我们上传的`/mnt/auto/.s/python`目录可能不存在，所以需要在上传之前，进行目录创建：

     ```
     s nas command mkdir /mnt/auto/.s
     ```

## Yaml是否支持全局变量/环境变量/引用外部文件

Serverless Devs的Yaml规范本身支持全局变量、环境变量以及外部内容的引入：

- 获取当前机器中的环境变量：${env(环境变量)}，例如${env(secretId)}
- 获取外部文档的变量：${file(路径)}，例如${file(./path)}
- 获取全局变量：${vars.*}
- 获取其他项目的变量：${projectName.props.*}
- 获取Yaml中其他项目的结果变量：${projectName.output.*}

> 详情可以参考：[Serverless Devs Yaml规范文档](https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/yaml.md)

## 通过环境变量配置组件

组件更新比较滞后，这时可以通过环境变量配置控制组件：

`FC_DOCKER_VERSION`: build或者local的 docker 版本版控制。例如 export FC_DOCKER_VERSION=1.9.21

`NAS_CHUNK_SIZE`: nas upload/download 切片大小，默认是 4M。例如 export NAS_CHUNK_SIZE=4

`FC_INSTANCE_EXEC_TIMEOUT`: 实例登陆空闲超时时间，默认10分钟。例如 export FC_INSTANCE_EXEC_TIMEOUT=600

## 项目实践案例

- Build相关：
  - [Python 案例](./../examples/build/python)
  - [Node.js 案例](./../examples/build/nodejs)
  - [Java 案例](./../examples/build/java)
  - [PHP 案例](./../examples/build/php)
  - [Custom Container 案例](./../examples/build/custom-container)
