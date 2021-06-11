# 从Funcraft迁移到Serverless Devs

如果您之前使用了Funcracf来进行函数的管理，此时我们强烈推荐您将相关资源迁移到Serverless Devs进行管理。

因为Serverless Devs将会提供更多更优质的能力，包括不限于：
- 优秀的可拓展性：可以非常简单的与更多产品进行结合，与更多功能进行集成
- 更丰富完善的功能：[日志查询能力](../Usage/logs.md)、[指标查询能力](../Usage/metrics.md)、[资源同步能力](../Usage/sync.md)等
- 支持多种模式，可以[通过无Yaml的模式进行资源管理](https://github.com/devsapp/fc-api)
- ... ...


## Yaml规范的一键转换

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

## Yaml规范兼容性处理

[不推荐] 在原有的Funcraft项目下，新建`s.yaml`，并将下面的代码拷贝粘贴到该文件：

```
edition: 1.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: funApp       #  项目名称
access: default  #  秘钥别名

services:
  fun-test: #  服务名称
    component: fun  # 组件名称
    props: #  组件的属性值
      region: cn-hangzhou
      config: s
```

此时，即可完成Funcraft到Serverless Devs的过渡。

例如，我需要使用`deploy`方法，此时可以直接执行`s deploy`。你可以认为只是把`fun ***`重的`fun`变为`s`。

## 资源同步方案

[不推荐] 如果函数等资源已经部署到线上，可以通过[sync功能](../Usage/sync.md)，进行资源同步，从而实现通过Serverless Devs进行项目管理。


