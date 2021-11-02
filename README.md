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
- **可观测性**：拥有完善的可观测性，在客户端可以通过`metrics`以及`log`等命令，进行业务的数据指标、执行日志等多重维度观测；
- **多模调试**：提出了多模调试方案，可以同时满足开发态、运维态的不同调试需求；包括本地运行、在线运行、本地调试、云端调试、端云联调等功能；

# 快速开始

🔑 为了让您可以更简单体验阿里云函数计算（FC）组件，您可以参考[快速入门文档](./docs/Getting-started/Hello-world-application.md)

# 文档目录

- [入门相关](./docs/Getting-started/Getting-started.md)
  - [开发工具安装](./docs/Getting-started/Install-tutorial.md)
  - [账号配置](./docs/Getting-started/Setting-up-credentials.md)
  - [快速体验](./docs/Getting-started/Hello-world-application.md)
  - [Yaml 规范](./docs/Others/yaml.md)
- 指令使用方法
  - [部署操作：Deploy](./docs/Usage/deploy.md)
  - [构建操作：Build](./docs/Usage/build/build.md)
  - [查看操作：Info](./docs/Usage/info.md)
  - [远程调用操作：Invoke](./docs/Usage/invoke.md)
  - [本地调用操作：Local](./docs/Usage/local.md)
  - [查看日志操作：Logs](./docs/Usage/logs.md)
  - [指标查询操作：Metrics](./docs/Usage/metrics.md)
  - [硬盘挂载操作：Nas](./docs/Usage/nas.md)
  - [移除操作：Remove](./docs/Usage/remove.md)
  - [同步操作：Sync](./docs/Usage/sync.md)
  - [版本操作：Version](./docs/Usage/version.md)
  - [别名操作：Alias](./docs/Usage/alias.md)
  - [预留操作：Provision](./docs/Usage/provision.md)
  - [按量资源操作：OnDemand](./docs/Usage/onDemand.md)
  - [层的操作：Layer](./docs/Usage/layer.md)
  - [端云联调: Proxied](./docs/Usage/proxied.md)
  - [压测操作: Stress](./docs/Usage/stress.md)
  - [内存和并发度探测: Eval](./docs/Usage/eval.md)
  - [远程调试: Remote](./docs/Usage/remote.md)
- 权限相关
  - [Yaml 字段相关配置权限](./docs/Others/authority/yaml.md)
  - [命令使用相关权限](./docs/Others/authority/command.md)
- 更多内容
  - [从 Funcraft 迁移到 Serverless Devs](./docs/Others/fun-fc.md)
  - CI/CD 相关
    - [Github Action 与 Serverless Devs](./docs/Others/github-action.md)
    - [阿里云 Custom Container 的 CI/CD 最佳实践案例](http://www.serverless-devs.com/blog/aliyun-custom-container-ci-cd)
    - [通过 Gitee+Serverless Devs 快速实现函数代码更新与版本发布](http://www.serverless-devs.com/blog/gitee-gitee-go-serverless-devs-ci-cd)
    - [只更新代码，然后发布版本：基于 Serverless Devs 原子化操作阿里云函数计算](http://www.serverless-devs.com/blog/serverless-devs-update-fc-code)



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
