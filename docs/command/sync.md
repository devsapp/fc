# Sync 命令

`sync` 命令是将线上的资源同步到本地的功能。

- [命令解析](#命令解析)
    - [参数解析](#参数解析)
    - [操作案例](#操作案例)
- [权限与策略说明](#权限与策略说明)

> 关于 `sync` 命令的常见问题和解决方法，可以参考[ FC 组件自动问答系统](http://qa.devsapp.cn/fc?type=sync) 。

## 命令解析

当我们执行`sync -h`/`sync --help`命令时，可以获取帮助文档。例如执行`s cli fc sync -h`：

```shell script
$ s cli fc sync -h

Sync

  Synchronize online resources to offline resources 

Usage

  s sync <options>  

Document
  
  https://github.com/devsapp/fc/blob/main/docs/command/sync.md                  

Options
 
  --region [region]               Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1  
  --service-name [serviceName]    Specify the fc service name  
  --function-name [functionName]  Specify the fc function name   
  --trigger-name [triggerName]    Specify the fc trigger name, multiple triggers can be specified using [--trigger-name name1 --trigger-name name2]                                                        
  --target-dir [path]             Specify storage directory, default: current dir                                
  --type [code/config]        Operation type, value: code/config
  -f, --force                     Mandatory overwrite code file                                  

Global Options

  -a, --access [aliasName]   Specify key alias         
  --debug                    Output debug informations 
  -h, --help                 Help for command.             

Examples with Yaml

  $ s sync                                                
  $ s <ProjectName> sync                                  
  $ s sync --region cn-hangzhou --service-name myService  

Examples with CLI

  $ s cli fc sync --region cn-shanghai --service-name myService --type config 
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| region | - | 选填 | 所同步的资源所在地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | - | 选填 | 所同步的资源所在服务名称 |
| function-name | - | 选填 | 所同步的资源所在函数名称 |
| trigger-name | - | 选填 | 所同步的资源所在触发器名称 |
| target-dir | - | 选填 | 目标路径 |
| type | - | 选填 | 类型，包括同步代码和配置，默认是全部同步，可选`code`/`config` |
| access | a | 选填 | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug | - | 选填 | 打开`debug`模式，将会输出更多日志信息 |
| help | h | 选填 | 查看帮助信息 |

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s <ProjectName> sync`或者`s sync`：
    ```text
    $ s sync
  
    fc-deploy-test: 
      codeFiles: 
        http-trigger-py36: /Users/jiangyu/demo/test/start-fc-http-python3/1583208943291465_cn-hangzhou_fc-deploy-service_http-trigger-py36
      configYmlPath: /Users/jiangyu/demo/test/start-fc-http-python3/s.cn-hangzhou-fc-deploy-service.sync.yaml
    ``` 
- **纯命令行形式（在没有资源描述 Yaml 文件时）**：
     ```text
    $ s cli fc sync --region cn-hanghzou --service-name fc-deploy-service --function-name http-trigger-py36
  
    fc-deploy-test: 
      codeFiles: 
        http-trigger-py36: /Users/jiangyu/demo/test/start-fc-http-python3/1583208943291465_cn-hangzhou_fc-deploy-service_http-trigger-py36
      configYmlPath: /Users/jiangyu/demo/test/start-fc-http-python3/s.cn-hangzhou-fc-deploy-service.sync.yaml
    ```    
## 权限与策略说明

使用该命令时，推荐配置系统策略：`AliyunFCReadOnlyAccess`
