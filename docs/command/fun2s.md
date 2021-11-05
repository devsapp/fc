# Fun2s 命令

`fun2s` 命令是帮助 Funcraft 开发者将 Funcraft 所识别的 `template.yaml` 转换成 Serverless Devs 所识别的 `s.yaml`，是规范转换的命令。

- [命令解析](#命令解析)
    - [参数解析](#参数解析)
    - [操作案例](#操作案例)

> 关于 `fun2s` 命令的常见问题和解决方法，可以参考[ FC 组件自动问答系统](http://qa.devsapp.cn/fc?type=fun2s) 。

## 命令解析

当我们执行`fun2s -h`/`fun2s --help`命令时，可以获取帮助文档。例如执行`s cli fc fun2s -h`：

```shell script
$ s cli fc fun2s -h

Fun2s

  Convert the Yaml specification of Funcraft to the Yaml specification of Serverless Devs.

Usage

  s cli fc fun2s <options>  
                            
Document
  
  https://github.com/devsapp/fc/blob/main/docs/command/fun2s.md

Options

  --force               Mandatory overwrite s file                                    
  --region [region]     Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --source [yamlFile]   Specify Funcraft configuration path, default: template.yaml/template.yml
  --target [yamlFile]   Specify Serverless Devs configuration path, default: s.yaml

Global Options

  -a, --access [aliasName]   Specify key alias         
  --debug                    Output debug informations 
  -h, --help                 Help for command.         

Examples with CLI

  $ s cli fc fun2s --region cn-shenzhen --target ./s.yml 
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| force | - | 选填 | 强行覆盖已存在/已指定的 Serverless Devs 资源描述文档 |
| region | - | 选填 |查询的函数所处的服务，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| source | - | 选填 | Funcraft的配置文档路径（默认是`template.yaml`/`template.yml`） |
| target | - | 选填 | 生成的 Serverless Devs 的配置文档路径（默认是`s.yaml`） |
| access | a | 选填 | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug | - | 选填 | 打开`debug`模式，将会输出更多日志信息 |
| help | h | 选填 | 查看帮助信息 |

### 操作案例

可以在`Funcraft`项目目录下，通过`fun2s`命令，实现规范转换，例如：

```shell script
s cli fc fun2s --region cn-shenzhen --target ./s.yml

[2021-11-02T19:51:25.418] [INFO ] [FC-TRANSFORM] - Using funcraft yaml: /Users/jiangyu/demo/test/start-fc-http-python3/template.yml
[2021-11-02T19:51:25.429] [INFO ] [FC-TRANSFORM] - Reminder serverless devs yaml path: /Users/jiangyu/demo/test/start-fc-http-python3/s.yml

Tips for next step
======================
* Deploy Function: s deploy -t ./s.yml
* Invoke Event Function: s local invoke -t ./s.yml
* Invoke Http Function: s local start -t ./s.yml
```

此时，就可以将原有的 Funcraft 规范的 `template.yaml` 转换成支持 Serverless Devs 规范的 `s.yaml`。

转换前（`template.yaml`）：

```yaml
ROSTemplateFormatVersion: '2015-09-01'
Transform: 'Aliyun::Serverless-2018-04-03'
Resources:
  start-fc-http-python3:
    Type: 'Aliyun::Serverless::Service'
    Properties:
      Description: 'helloworld'
    start-fc-http-python3:
      Type: 'Aliyun::Serverless::Function'
      Properties:
        Handler: index.handler
        Runtime: nodejs10
        CodeUri: './'
```

转换后（`s.yaml`）：

```yaml
edition: 1.0.0
name: transform_fun
access: default
vars:
  region: cn-shenzhen
services:
  fc-start-fc-http-python3-start-fc-http-python3:
    component: devsapp/fc
    props:
      region: ${vars.region}
      service:
        name: start-fc-http-python3
        description: helloworld
        internetAccess: true
      function:
        name: start-fc-http-python3
        handler: index.handler
        runtime: nodejs10
        codeUri: ./
```
