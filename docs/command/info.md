# Info 命令

`info` 命令是查看函数对应的线上资源详情的命令，通过该命令可以查看到函数、触发器以及对应服务的基本信息。

- [命令解析](#命令解析)
    - [参数解析](#参数解析)
    - [操作案例](#操作案例)
- [权限与策略说明](#权限与策略说明)

> 关于 `info` 命令的常见问题和解决方法，可以参考[ FC 组件自动问答系统](http://qa.devsapp.cn/fc?type=info) 。

## 命令解析

当我们执行`info -h`/`info --help`命令时，可以获取帮助文档。例如执行`s cli fc info -h`：

```shell script
$ s cli fc info -h

Info

  Query online resource details 

Usage

  s info <options>  
  s cli fc info <options>  
                    
Document
  
  https://github.com/devsapp/fc/blob/main/docs/command/info.md

Options

  --region [region]               Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [serviceName]    Specify the fc service name  
  --function-name [functionName]  Specify the fc function name   
  --trigger-name [triggerName]    Specify the fc trigger name   

Global Options

  -a, --access [aliasName]   Specify key alias         
  --debug                    Output debug informations 
  -h, --help                 Help for command.         

Examples with Yaml

  $ s info               
  $ s <ProjectName> info 

Examples with CLI

  $ s cli fc info --region region --service-name serviceName --access accessName                                                                    
  $ s cli fc info --region region --service-name serviceName --function-name functionName --trigger-name triggerName --access accessName             
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| region | - | 选填 |查询的函数所处的地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | - | 选填 |查询的函数所处的服务 |
| function-name | - | 选填 | 查询的函数名称 |
| access | a | 选填 | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug | - | 选填 | 打开`debug`模式，将会输出更多日志信息 |
| help | h | 选填 | 查看帮助信息 |

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s <ProjectName> info`或者`s info`：
    ```text
    $ s info
    
    [2021-11-02T15:02:39.717] [INFO ] [S-CLI] - Start ...
    [2021-11-02T15:02:39.717] [INFO ] [S-CLI] - End ...
    
    fc-deploy-test:
        region: cn-hangzhou
        service:
          name: fc-deploy-service
          internetAccess: true
          role: acs:ram::1583208943291465:role/aliyunfcdefaultrole
          description: demo for fc-deploy component
          logConfig:
            logstore: fc-service-fc-deploy-service-logstore
            project: 1583208943291465-cn-hangzhou-logproject
        function:
          name: http-trigger-py36
          runtime: python3
          handler: index.handler
          timeout: 60
          instanceType: e1
          memorySize: 128
          description: this is a test
          initializationTimeout: 3
          instanceConcurrency: 1
          environmentVariables: {}
        triggers:
          - name: httpTrigger
            type: http
            config:
              qualifier: null
              authType: anonymous
              methods:
                - GET
    ``` 
- **纯命令行形式（在没有资源描述 Yaml 文件时）**：
    - **查询服务详情**，需要指定地区和服务名，例如`s cli fc info --region cn-hangzhou --service-name fc-deploy-service`：
        ```text
        $ s cli fc info --region cn-hangzhou --service-name fc-deploy-service
        region: cn-hangzhou
        service:
          name: fc-deploy-service
          internetAccess: true
          role: acs:ram::1583208943291465:role/aliyunfcdefaultrole
          description: demo for fc-deploy component
          logConfig:
            logstore: fc-service-fc-deploy-service-logstore
            project: 1583208943291465-cn-hangzhou-logproject
        ```
    - **查询函数详情**，需要指定地区、服务名和函数名，例如`s cli fc info --region cn-hangzhou --service-name fc-deploy-service --function-name http-trigger-py36`：
        ```text
        $ s cli fc info --region cn-hangzhou --service-name fc-deploy-service --function-name http-trigger-py36
        region: cn-hangzhou
        service:
          name: fc-deploy-service
          internetAccess: true
          role: acs:ram::1583208943291465:role/aliyunfcdefaultrole
          description: demo for fc-deploy component
          logConfig:
            logstore: fc-service-fc-deploy-service-logstore
            project: 1583208943291465-cn-hangzhou-logproject
        function:
          name: http-trigger-py36
          runtime: python3
          handler: index.handler
          timeout: 60
          instanceType: e1
          memorySize: 128
          description: this is a test
          initializationTimeout: 3
          instanceConcurrency: 1
          environmentVariables: {}
        triggers:
          - name: httpTrigger
            type: http
            config:
              qualifier: null
              authType: anonymous
              methods:
                - GET
        ```

## 权限与策略说明

使用该命令时，推荐配置系统策略：`AliyunFCReadOnlyAccess`
