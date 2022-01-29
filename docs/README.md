![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635756716877_20211101085157044368.png)
<p align="center">
  <a href="https://nodejs.org/en/">
    <img src="https://img.shields.io/badge/node-%3E%3D%2010.8.0-brightgreen" alt="node.js version">
  </a>
  <a href="https://github.com/devsapp/fc/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green" alt="license">
  </a>
  <a href="https://github.com/devsapp/fc/issues">
    <img src="https://img.shields.io/github/issues/devsapp/fc" alt="issues">
  </a>
  </a>
</p>

# 五大亮点

- **全生命周期管理**：组件拥有项目的创建、开发、调试、部署、运维全生命周期管理能力；
- **安全发布**：通过其他形式对函数进行变更，组件可以感知并安全更新；
- **快速集成**：借助于 Serverless Devs 的集成性和被集成性，可以与常见的 [CI/CD 平台工具](https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/cicd.md) 等集成；
- **可观测性**：拥有完善的可观测性，在客户端可以通过[指标查询 metrics](zh/command/metrics.md) 以及[日志查询 logs](zh/command/logs.md) 等命令，进行业务的数据指标、执行日志等多重维度观测；
- **多模调试**：提出了多模调试方案，可以同时满足开发态、运维态的不同调试需求；包括[本地运行](zh/command/local.md)、[在线运行](zh/command/invoke.md)、[端云联调](zh/command/proxied.md)等功能；

# 快速开始

🙋 三步即可上手 函数计算（FC）组件的使用：   
❶ [安装 Serverless Devs 开发者工具](https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/install.md) ：`npm install -g @serverless-devs/s`；   
❷ 初始化一个函数计算的 `Hello World` 项目：`s init devsapp/start-fc-http-python3`；      
❸ 初始化完成之后，系统会提示是否部署项目，只需要输入`y`并按回车按钮即可完成项目的部署；

> 您还可以通过[快速创建应用](zh/quick_start_application.md)文档，了解包括[**Serverless：Hello World**](zh/quick_start_application.md#serverlesshello-world)、[**人工智能：目标检测**](zh/quick_start_application.md#人工智能目标检测)、[**传统框架：基于Django的博客项目**](zh/quick_start_application.md#传统框架基于django的博客项目)等经典应用的快速体验过程；还可以通过[快速使用功能](zh/quick_start_function.md)文档，进行包括[**部署**](zh/quick_start_function.md#一键部署)、[**项目查看**](zh/quick_start_function.md#一键部署)、[**可观测性**](zh/quick_start_function.md#一键部署)等在内的常用功能入门。

# 文档相关

函数计算（FC）组件全部支持的能力列表如下：

| 构建&部署 | 可观测性 | 调用&调试 |  发布&配置  |  其他功能 |
| --- | --- | --- |--- | --- |
| [**部署 deploy**](zh/command/deploy.md)   | [指标查询 metrics](zh/command/metrics.md) | [**本地调用 local**](zh/command/local.md)      | [**版本 version**](zh/command/version.md)      | [**硬盘挂载 nas**](zh/command/nas.md) | 
| [**构建 build**](zh/command/build.md)     | [日志查询 logs](zh/command/logs.md)       | [函数触发 invoke](zh/command/invoke.md)    | [**别名 alias**](zh/command/alias.md)         | [Fun项目迁移 fun2s](zh/command/fun2s.md)  | 
| [移除 remove](zh/command/remove.md)   |                                              | [**端云联调 proxied**](zh/command/proxied.md) | [预留 provision](zh/command/provision.md)   | [查看函数 info](zh/command/info.md) | 
| [计划变更 plan](zh/command/plan.md)                                         |                                              | [实例登录 instance](zh/command/instance.md)    | [按量资源 ondemand](zh/command/ondemand.md) | [**资源同步 sync**](zh/command/sync.md) | 
|                                          |                                              | [内存&并发度探测 eval](zh/command/eval.md)  | [层 layer](zh/command/layer.md) |   [压测 stress](zh/command/stress.md)                   | 
|                                          |                                              |   |  | [API调用 api【支持中】](zh/command/api.md)                    

在使用函数计算（FC）组件时，还会涉及到资源描述文件的编写，关于函数计算（FC）组件的 Yaml 规范可以参考[**函数计算（FC） Yaml 规范文档**](zh/yaml.md)，除此之外，在使用本组件的时候，还会有一些[小 Tips ](zh/tips.md) 可供学习和了解，例如[如何部署多个函数](zh/tips.md#如何声明部署多个函数) ......

> 如果您之前是 Funcraft 或者 Fcli 的用户，您可以参考[**Serverless Devs 与 Funcraft、Fcli等工具的对比**](zh/vs_fun_fcli.md) 文档，以便获取这三个工具之间的区别，以及如何快速[**从 Funcraft 迁移到 Serverless Devs 的方法**](zh/vs_fun_fcli.md#从-funcraft-迁移到-serverless-devs-的方法)、[**从 Fcli 迁移到 Serverless Devs 的方法**](zh/vs_fun_fcli.md#从-fcli-迁移到-serverless-devs-的方法)等。

# 项目贡献

我们非常希望您可以和我们一起贡献这个项目。贡献内容包括不限于代码的维护、应用/组件的贡献、文档的完善等，更多详情可以参考[ 🏆 贡献指南](./CONTRIBUTING.md)。

与此同时，我们也非常感谢所有[ 👬 参与贡献的小伙伴](https://github.com/devsapp/fc/graphs/contributors) ，为 Serverless Devs FC 组件项目贡献的努力和汗水。

# 开源许可

Serverless Devs FC 组件遵循 [MIT License](./LICENSE) 开源许可。

位于`node_modules`和外部目录中的所有文件都是本软件使用的外部维护库，具有自己的许可证；我们建议您阅读它们，因为它们的条款可能与[MIT License](./LICENSE)的条款不同。

# 交流社区

您如果有关于错误的反馈或者未来的期待，您可以在 [Serverless Devs repo Issues](https://github.com/serverless-devs/serverless-devs/issues) 或 [Fc repo Issues](https://github.com/devsapp/fc/issues) 中进行反馈和交流。如果您想要加入我们的讨论组或者了解 FC 组件的最新动态，您可以通过以下渠道进行：

<p align="center">

| <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407298906_20211028074819117230.png" width="200px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407044136_20211028074404326599.png" width="200px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407252200_20211028074732517533.png" width="200px" > |
|--- | --- | --- |
| <center>关注微信公众号：`serverless`</center> | <center>联系微信小助手：`xiaojiangwh`</center> | <center>加入钉钉交流群：`33947367`</center> | 

</p>
