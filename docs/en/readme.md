---
title: Intro
description: 'FC component'
position: 1
category: 'Overview'
---

![Images](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635756716877_20211101085157044368.png)
<p align="center" class="flex justify-center">
  <a href="https://nodejs.org/en/" class="ml-1">
    <img src="https://img.shields.io/badge/node-%3E%3D%2010.8.0-brightgreen" alt="node.js version">
  </a>
  <a href="https://github.com/devsapp/fc/blob/master/LICENSE" class="ml-1">
    <img src="https://img.shields.io/badge/License-MIT-green" alt="license">
  </a>
  <a href="https://github.com/devsapp/fc/issues" class="ml-1">
    <img src="https://img.shields.io/github/issues/devsapp/fc" alt="issues">
  </a>
  </a>
</p>


# Highlights

- **Full lifecycle management**: manages a project during its lifecycle, including creation, development, debugging, deployment, and O&M.
- **Security release**: automatically detects the changes in functions.
- **Quick integration**: integrates with common CI/CD tools. For more information, see [CI/CD tools](https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/en/cicd.md).
- **Observability**: allows you to query metrics and logs on your client. For more information, see [Query metrics](command/metrics.md) and [Query logs](command/logs.md).
- **Multi-mode debugging**: supports multi-mode debugging to meet different debugging requirements in the development state and O&M state. The modes include [local call](command/local.md), [remote debugging](command/invoke.md), and [cloud-terminal joint debugging](command/proxied.md).
# Quick start

🙋 To use the FC component, perform the following steps:    
❶ [Run the following command to install Serverless Devs](https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/en/install.md): `npm install -g @serverless-devs/s`  
> After installation, you also need to configure the key. Please refer to [Secret Configuration Document](config.md)

❷ Run the following command to initialize the `Hello World` project of Function Compute: `s init devsapp/start-fc-http-python3`       
❸ Determine whether to deploy the project. To deploy the project, enter `y` and press Enter.     

> The [Create an application](quick_start_application.md) topic introduces the following projects: [**Serverless: Hello World**](quick_start_application.md#serverlesshello-world)[**Artificial intelligence: object detection**](quick_start_application.md#AITarget-Detection), [**Traditional framework: Django-based blog project**](quick_start_application.md#Traditional-framework-based-on-django-blog-project). The [Quick start](quick_start_function.md) topic introduces the following features: [**deploy operation**](quick_start_function.md#deploy-operation), [**Calls**](quick_start_function.md#Invoke), and [**Observability**](quick_start_function.md#Observability). 
 
# Commands

The following table lists the commands that are supported by the FC component:



| Building and deployment            | Observability                    | Call and debugging                   | Release and configuration            | Other feature                                |
| ---------------------------------- | -------------------------------- | ------------------------------------ | ------------------------------------ | -------------------------------------------- |
| [**deploy**](command/deploy.md) | [metrics](command/metrics.md) | [**local**](command/local.md)     | [**version**](command/version.md) | [**nas**](command/nas.md)                 |
| [**build**](command/build.md)   | [logs](command/logs.md)       | [invoke](command/invoke.md)       | [**alias**](command/alias.md)     | [fun2s](command/fun2s.md)                 |
| [remove](command/remove.md)     |                                  | [**proxied**](command/proxied.md) | [provision](command/provision.md) | [info](command/info.md)                   |
| [plan](command/plan.md)         |                                  | [instance](command/instance.md)       | [ondemand](command/ondemand.md)   | [**sync**](command/sync.md)               |
|                                    |                                  |           | [layer](command/layer.md)         | [stress](command/stress.md)               |
|                                    |                                  |                                      |                                      | [api   (to be supported)](command/api.md) |


When you use the FC component, you must edit resource description files. For more information about the YAML specifications of the FC component, see [**YAML specifications**](yaml/readme.md). You also need to read some tips on the FC component, such as [Declaration and deployment of multiple functions](tips.md#Declaration-and-deployment-of-multiple-functions). For more information, see [Common tips](tips.md).

> If you are using Funcraft or Function Compute command line interface (fcli), you can view the differences among Funcraft, fcli, and Serverless Devs from [**Compare among Serverless Devs, fcli, and Funcraft**](vs_fun_fcli.md). To migrate resources from Funcraft or fcli to Serverless Devs, see [**Migrate resources from Funcraft to Serverless Devs**](vs_fun_fcli.md#Migrate-resources-from-Funcraft-to-Serverless-Devs) and [**Migrate resources from fcli to Serverless Devs**](vs_fun_fcli.md#Migrate-resources-from-fcli-to-Serverless-Devs) 

# Contribution

We sincerely invite you to join the project to make your contributions. The contributions include but are not limited to code maintenance, contribution in applications and components, and document improvement. For more information, see [🏆 Contributing to Serverless Devs FC Component](../../CONTRIBUTING.md). 

Thank all contributors for their efforts in the FC component of Serverless Devs. For more information, see [👬 Contributors](https://github.com/devsapp/fc/graphs/contributors). 

# License

The FC component of Serverless Devs complies with the [MIT License](../../LICENSE). 

All files located in the node_modules directories and external directories are from external maintenance libraries that have their own licenses. We recommend that you read the licenses because their terms may be different from the terms of the [MIT License](../../LICENSE). 

# Community

We welcome your feedback and suggestions. For more information, visit [Serverless Devs issues](https://github.com/serverless-devs/serverless-devs/issues) or [FC component issues](https://github.com/devsapp/fc/issues). If you want to join our discussion group or learn about the latest updates in the FC component, scan one of the following quick response (QR) codes.

<p align="center">

| <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407298906_20211028074819117230.png" width="200px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407044136_20211028074404326599.png" width="200px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407252200_20211028074732517533.png" width="200px" > |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| <center>WeChat official account：`serverless`</center>       | <center>WeChat friend：`xiaojiangwh`</center>                | <center>DingTalk Froup：`33947367`</center>                  |

</p>
