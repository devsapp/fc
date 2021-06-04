# Alibaba Fc 组件

[fc 组件](https://github.com/devsapp/fc) 是一个用于支持 Serverless 应用全生命周期的工具，它通过一个资源配置文件 (s.yml) ，能够帮助您便捷地开发、构建、测试以及部署函数计算应用。

fc 组件基于 [Serverless Devs](https://www.serverless-devs.com/) 进行开发，包含以下两部分: 

- s.yml 规范: 使用 fc 组件的 YAML 规范来定义 Serverless 资源，它包含了函数计算的服务、函数、触发器以及自定义域名等资源，fc 组件的 YAML 规范详细信息可参考[YAML 规范]()。

- fc 组件命令行接口 (fc component cli): 您能够利用 fc 组件命令行接口来完成 Serverless 应用的开发部署。该命令行接口能够帮助您校验 s.yml，构建函数，本地调试函数，部署函数至函数计算并对其进行观测。fc 组件命令行接口的详细使用可参考[命令行接口]()。

本教程将帮助您使用 fc 组件去开发简单的函数计算应用，同时我们也提供了[入门案例](./Getting-started/Hello-world-application.md)、[进阶案例]()以及[高阶案例]()来帮助您更好地使用 fc 组件。

## Alibaba Fc 组件的优势

使用 fc 组件有如下几点优势：

- 小而美的设计: fc 组件由多个子功能组件组合而成，只有在首次使用某个子功能时才会下载对应的子功能组件，若用户想为 fc 组件增加自定义功能或组合已有子宫功能组件，则只需要遵循 [Serverless Devs 组件开发规范](https://github.com/Serverless-Devs/Serverless-Devs/discussions/62)开发子功能组件，在已有 fc 组件开源代码的基础上集成自定义子功能组件或自由组合已有子功能组件，并发布即可，详情可参考[自定义 fc 组件]()。

- 多样化部署能力: fc 组件目前支持两种部署模式：pulumi 以及 sdk。用户可以在这两种部署模式之间自由切换，详情可参考[fc 组件的部署模式]()。

- 线上资源感知：fc 组件在进行部署时能够感知线上已有的函数计算资源，并由用户进行自由选择，详情可参考[fc 组件的部署感知]()。

- 监控能力：fc 组件不仅涵盖了 Serverless 应用的开发态，还能够监控其运行态，详情可参考[fc 组件的监控能力]()。

## 下一步
---
[开始使用](./Getting-started/Getting-started.md)