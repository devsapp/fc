# Metrics 命令

`metrics` 命令是查看函数指标信息，例如调用了多少次，成功了多少次等。

- [命令解析](#命令解析)
    - [参数解析](#参数解析)
    - [操作案例](#操作案例)
- [权限与策略说明](#权限与策略说明)

> 关于 `metrics` 命令的常见问题和解决方法，可以参考[ FC 组件自动问答系统](http://qa.devsapp.cn/fc?type=metrics) 。

## 命令解析

当我们执行`metrics -h`/`metrics --help`命令时，可以获取帮助文档。例如执行`s cli fc metrics -h`：

```shell script
$ s cli fc metrics -h

Metrics

  Query function metrics information 

Usage

  s metrics <options>  
                       
Document
  
  https://github.com/devsapp/fc/blob/main/docs/command/metrics.md                

Options
               
  --region [region]               Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1  
  --service-name [serviceName]    Specify the fc service name  
  --function-name [functionName]  Specify the fc function name                                          

Global Options

  -a, --access string   Specify key alias         
  --debug string        Output debug informations 
  -h, --help string     Help for command.         

Examples with Yaml

  $ s metrics                                                          
  $ s metrics --region cn-hangzhou --service-name myService --function-name myFunction 

Examples with CLI

  $ s cli fc metrics --region cn-hangzhou --service-name myService --function-name myFunction 
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| region | - | 选填 |查询的函数所处的地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | - | 选填 |查询的函数指标所处的服务 |
| function-name | - | 选填 | 查询的函数指标对应的函数名 |
| access | a | 选填 | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug | - | 选填 | 打开`debug`模式，将会输出更多日志信息 |
| help | h | 选填 | 查看帮助信息 |

### 操作案例

可以通过 `s metrics` 命令，或者纯命令形式（需要指定相关的地区，服务名，函数名等，例如`s cli fc metrics --region ch-hangzhou --service-name myService --function-name myFunction`），查看函数的指标信息：

```
[2021-06-07T12:20:06.661] [INFO ] [FC-METRICS] - 请用浏览器访问Uri地址进行查看: http://localhost:3000
```

通过浏览器打开地址，可以看到相关信息：

![image](https://user-images.githubusercontent.com/21079031/120958920-419b2400-c78b-11eb-9f3c-8b49c1354a37.png)


## 权限与策略说明

所需权限：`AliyunLogFullAccess`、`AliyunCloudMonitorReadOnlyAccess`、`AliyunFCReadOnlyAccess`
