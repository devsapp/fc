# 阿里云函数计算（FC）组件

[阿里云函数计算（FC）组件](https://github.com/devsapp/fc) 是一个用于支持阿里云 Serverless 应用全生命周期的工具，它通过资源配置文件 (s.yml) ，可以快速帮助用户便捷地开发、构建、测试以及部署应用到[阿里云函数计算平台](https://www.aliyun.com/product/fc?spm=5176.19720258.J_8058803260.115.e9392c4aHejRf3) 。

阿里云函数计算（FC）组件基于[Serverless Devs](https://www.serverless-devs.com/) 进行开发，主要支持两种使用形态: 

1. 通过Yaml文件进行资源描述。使用阿里云函数计算（FC）组件的 YAML 规范(`s.yaml`)定义 Serverless 资源。它包含了函数计算的服务、函数、触发器以及自定义域名等资源，阿里云函数计算（FC）组件的 YAML 规范详细信息可参考[FC组件YAML规范](./Others/yaml.md)。

2. 通过交互式命令行进行相关能力管理。您能够利用阿里云函数计算（FC）组件命令行接口来完成 Serverless 应用的开发部署。该命令行接口能够帮助您校验 `s.yml`，构建函数，本地调试函数，部署函数至函数计算并对其进行观测。阿里云函数计算（FC）组件命令行接口的详细使用可参考[命令行接口](./Others/cli.md)。

> 额外说明：如果您想要通过命令行对函数计算进行管理，例如查看服务列表、函数列表、触发器列表.....，您也可以参考我们的[fc-api 功能](https://github.com/devsapp/fc-api), 或者直接在 Serverless Devs 工具执行命令 `s cli fc-api -h` 获取帮助；

本文档将帮助您使用 阿里云函数计算（FC）组件 去开发函数计算应用。

## 组件的优势

使用阿里云函数计算（FC）组件有如下几点优势：

- 🌇 小而美的设计: 该组件支持部署、移除、调用、调试、构建、日志等十余项功能，为了保证组件使用的流畅性，所有的功能均是按需加载；

- 😉 多样化部署能力: 该组件目前支持两种部署模式：`Pulumi` 以及 `SDK`。用户可以在这两种部署模式之间自由切换，详情可参考[部署模式](Usage/deploy.md#函数部署的底座)；

- 🖥️ 线上资源感知：该组件在进行部署时能够感知线上已有的函数计算资源，并由用户进行自由选择，详情可参考部署感知；

- 👁️ 可观测性支持：该组件不仅涵盖了 Serverless 应用的开发态，还能够监控其运行态，详情可参考[监控能力](Usage/metrics.md)；同时也可以查看某些服务的执行日志，详情可参考[日志能力](Usage/logs.md)；

## 快速开始

🔑 为了让您可以更简单体验阿里云函数计算（FC）组件，您可以参考[快速入门文档](./Getting-started/Hello-world-application.md)

## 文档目录

- [入门相关](./Getting-started/Getting-started.md)
    - [开发工具安装](./Getting-started/Install-tutorial.md)
    - [账号配置](./Getting-started/Setting-up-credentials.md)
    - [快速体验](./Getting-started/Hello-world-application.md)
- 指令使用方法
    - [部署操作：Deploy](./Usage/deploy.md)
    - [构建操作：Build](./Usage/build.md)
    - [查看操作：Info](./Usage/info.md)
    - [远程调用操作：Invoke](./Usage/invoke.md)
    - [本地调用操作：Local](./Usage/local.md)
    - [查看日志操作：Logs](./Usage/logs.md)
    - [指标查询操作：Metrics](./Usage/metrics.md)
    - [硬盘挂载操作：Nas](./Usage/nas.md)
    - [移除操作：Remove](./Usage/remove.md)
    - [同步操作：Sync](./Usage/sync.md)
----

# More

## 讨论交流

钉钉群号: `11721331`

## 问题反馈

如您在使用中遇到问题，可以在[这里反馈](https://github.com/devsapp/fc/issues)

## 开源许可

The MIT License
