# 移除操作：Remove

- [快速使用](#快速使用)
    - [简单使用](#简单使用)
    - [高级使用](#高级使用)
- [其他替代方法](#其他替代方法)
- [操作所需权限](../Others/authority/command.md#deployremove-指令)

--------

阿里云函数计算（FC）组件为使用者提供了FC相关资源的移除能力。可以通过`remove`指令，快速进行移除操作。

您可以通过`remove -h`/`remove --help`参数，唤起帮助信息。例如执行`s remove -h`后，可以看到：

```

Remove 

    Specify RESOURCE to remove it and resource belonging to it.                   
    If service is specified, service and its functions should be removed.         
    If function is specified, function and its triggers should be removed.        
    If trigger is specified, you can specify the trigger name to remove the       
    specific trigger or remove all triggers without trigger name.                 
    If domain is specified, you can specify the domain name to remove the         
    specific domain or remove all domains without domain name.   

Usage

  $ s remove <RESOURCE> <options> 

Resource

  service            The service resource.
  function           The function resource.
  trigger            The trigger resource.
  domain             The domain resource.

Options

  --n, --name <name>   Resource name to be removed, only for trigger/domain resource. 

Global Options

  -y, --assume-yes    Assume that the answer to any question which would be asked is yes. 
  -h, --help          Display help for command.                                           

Examples with Yaml

  $ s remove 
  $ s <ProjectName> remove
  $ s remove service               
  $ s remove domain --name myDomain
  $ s exec -- remove domain --name myDomain

Examples with CLI

  You can refer to the usage of fc-api and execute [s cli fc-api -h] for help

```

# 快速使用

当我们下载好[Serverless Devs开发者工具](../Getting-started/Install-tutorial.md), 并完成[阿里云密钥配置](../Getting-started/Setting-up-credentials.md)之后，我们可以根据自身的需求进行资源的移除。

## 简单使用

**值得注意的是，资源一旦移除可能无法恢复，所以在使用移除功能时，请您慎重操作**

移除资源的前提是，您需要在本地有一个Serverless Devs的项目，即包括符合Serverless Devs规范的资源描述文档（例如`s.yaml`），同时该资源是已经部署在线上的。此时可以执行：

```
s remove service
```

- 重点1：如果当前的yaml中有多个project，在执行`s remove service`时，将会将这些资源全部删除；
- 重点2：如果当前的yaml中有多个project，您只想移除一个，您可以执行`s projectName remove service`

例如，当我们本地的yaml内容为：

```
# s.yaml
edition: 1.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: fcDeployApp       #  项目名称

vars:
  region: cn-hangzhou
  service: 
    name: fc-deploy-service
    description: 'demo for fc-deploy component'
    internetAccess: true

services:
  fc-deploy-test-function-a:
    component: devsapp/fc  # 组件名称
    props: #  组件的属性值
      region: ${vars.region}
      service: ${vars.service}
      function:
        name: http-trigger-function-a
        description: this is a test
        runtime: nodejs10
        codeUri: ./a
        handler: index.handler
        memorySize: 128
        timeout: 60
  fc-deploy-test-function-b:
      component: devsapp/fc  # 组件名称
      props: #  组件的属性值
      region: ${vars.region}
      service: ${vars.service}
        function:
          name: http-trigger-function-b
          description: this is a test
          runtime: nodejs10
          codeUri: ./b
          handler: index.handler
          memorySize: 128
          timeout: 60
```

此时，我要移除`http-trigger-function-b`，我可以执行：

```
s fc-deploy-test-function-b remove service
```

如果我执行

```
s remove service
```

则`http-trigger-function-a`和`http-trigger-function-b`均会被删除。

## 高级使用

在移除资源的时候，我们可以通过指定资源类型，进行部分指定类型资源的移除。

例如，移除domain，且名字为myDomian的资源，可以执行：

```
s remove domain --name myDomain
```

除此之外，还可以分别移除`trigger`、`function`、`service`等资源

# 其他替代方法

在使用过程中，虽然我们相信`remove`指令已经可以做很多事情了，但是我们仍然会给您备用的替代方案。您可以使用[fc-api](https://github.com/devsapp/fc-api) 中关于delete的方法进行更多原子能力的移除。

例如:
- deleteAlias ： 删除别名
- deleteCustomDomain ： 删除自定义域名
- deleteFunction ： 删除函数
- deleteFunctionAsyncConfig ： 删除函数异步配置
- deleteService ： 删除服务
- deleteTrigger ： 删除触发器
- deleteVersion ： 删除版本

具体方法可以使用`-h/--help`获取，例如获取`deleteTrigger`的帮助文档，可以执行`s cli fc-api deleteTrigger -h`:

```

Usage

  s cli fc-api deleteTrigger                                                    
  API Document: https://help.aliyun.com/document_detail/191157.html             

Options

  --region string         The region of fc endpoint. 
  --access string         Specify the key name.      
  --props string          The json string of props.  
  --serviceName string    The name of the service.   
  --functionName string   The name of the function.  
  --triggerName string    The name of the trigger.  
```

例如，我要删除`cn-hongkong`地区下的`MyService`服务下的`MyFunction`函数下的`MyTrigger`触发器：

```
 s cli fc-api deleteTrigger --region cn-hongkong --serviceName MyService --functionName MyFunction --triggerName MyTrigger
```

