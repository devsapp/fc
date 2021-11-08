# Logs 命令

`logs` 命令是查看函数日志的命令。需要额外注意的是，在使用该功能之前，需要先开通 SLS 日志服务，并且函数本身已经配置了相关的日志等。

- [命令解析](#命令解析)
    - [参数解析](#参数解析)
    - [操作案例](#操作案例)
- [权限与策略说明](#权限与策略说明)

> 关于 `logs` 命令的常见问题和解决方法，可以参考[ FC 组件自动问答系统](http://qa.devsapp.cn/fc?type=logs) 。

## 命令解析

当我们执行`logs -h`/`logs --help`命令时，可以获取帮助文档。例如执行`s cli fc logs -h`：

```shell script
$ s cli fc logs -h

Logs

  Query the function log. You need to open SLS log service 

Usage

  s logs <options>  


Document
  
  https://github.com/devsapp/fc/blob/main/docs/command/logs.md                

Options
               
  --region [region]               [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1  
  --service-name [serviceName]    [C-Required] Specify the fc service name  
  --function-name [functionName]  [C-Required] Specify the fc function name                                          
  --keyword [string]              [Optional] Keyword query                                                                                                          
  --request-id [requestId]        [Optional] Query according to requestId within the time interval                                                            
  -s, --start-time [datetime]     [Optional] Query log start time (timestamp or time format，like 1611827290000 or 2021-11-11T11:11:12+00:00)                                                            
  -e, --end-time [datetime]       [Optional] Query log end time (timestamp or time format，like 1611827290000 or 2021-11-11T11:11:12+00:00)        
  -t, --tail                      [Optional] Continuous log output mode                                                    
  --type [success/fail]           [Optional] Log type query, value: code/config/all, default: all                                             

Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [aliasName]   [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations        

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/docs/docs/zh/yaml_and_cli.md

Examples with Yaml

  $ s logs -s 2021-06-07T02:54:00+08:00 -e 2021-06-07T02:54:59+08:00 
  $ s logs -t                                                        

Examples with CLI

  $ s cli fc logs --region cn-hangzhou --service-name myService --function-name myFunction -t
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| region | - | 选填 |地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | - | 选填 |服务名 |
| function-name | - | 选填 | 函数名 |
| keyword | - | 选填 | 查询的关键词 |
| request-id | - | 选填 | 通过RequestId进行查询，UTC时间或者时间戳，例如`2021-06-07T02:54:59+08:00`，`1611827290000` |
| start-time | s | 选填 | 查询的时间点起点，UTC时间或者时间戳，例如`2021-06-07T02:54:59+08:00`，`1611827290000` |
| end-time | e | 选填 | 查询的时间点终点 |
| tail | t | 选填 | 以`tail`模式进行日志输出 |
| type | - | 选填 | 查询的日志型，成功或者失败,取值范围：`success, fail` |
| access | a | 选填 | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug | - | 选填 | 打开`debug`模式，将会输出更多日志信息 |
| help | h | 选填 | 查看帮助信息 |

### 操作案例

- `tail`模式日志查询： 在具有资源描述 Yaml 文件目录下，可以通过`s logs -t`实现：
    ```shell script
    $ s logs -t    

    FunctionCompute python3 runtime inited.
    
    FC Invoke Start RequestId: 84d6ae81-02ff-4011-b3ca-45e65b210cc3
    FC Invoke End RequestId: 84d6ae81-02ff-4011-b3ca-45e65b210cc3
    
    FC Invoke Start RequestId: de4812be-9137-4a33-9869-370cb61ac427
    FC Invoke End RequestId: de4812be-9137-4a33-9869-370cb61ac427
    ```
- 指定时间段日志查询：通过指定`--start-time`和`--end-time`实现，例如`s logs -s 2021-11-04T15:40:00 -e 2021-11-04T15:45:00`：
    ```shell script
    $ s logs -s 2021-11-04T15:40:00 -e 2021-11-04T15:45:00   
    
    FunctionCompute python3 runtime inited.
    
    FC Invoke Start RequestId: 84d6ae81-02ff-4011-b3ca-45e65b210cc3
    FC Invoke End RequestId: 84d6ae81-02ff-4011-b3ca-45e65b210cc3
    
    FC Invoke Start RequestId: de4812be-9137-4a33-9869-370cb61ac427
    FC Invoke End RequestId: de4812be-9137-4a33-9869-370cb61ac427
    ```
- 纯命令行形式查询：如果当前并没有资源描述文件（Yaml 文件），可以考虑通过纯命令行模式，指定服务名，函数名等进行，例如`s cli fc logs --region cn-hangzhou --service-name fc-deploy-service --function-name http-trigger-py36 -s 2021-11-04T15:40:00 -e 2021-11-04T15:45:00`：
    ```shell script
    $ s cli fc logs --region cn-hangzhou --service-name fc-deploy-service --function-name http-trigger-py36 -s 2021-11-04T15:40:00 -e 2021-11-04T15:45:00
    
    FunctionCompute python3 runtime inited.
    
    FC Invoke Start RequestId: 84d6ae81-02ff-4011-b3ca-45e65b210cc3
    FC Invoke End RequestId: 84d6ae81-02ff-4011-b3ca-45e65b210cc3
    
    FC Invoke Start RequestId: de4812be-9137-4a33-9869-370cb61ac427
    FC Invoke End RequestId: de4812be-9137-4a33-9869-370cb61ac427
    ```

## 权限与策略说明

- 最大权限：`AliyunFCReadOnlyAccess`、`AliyunLogReadOnlyAccess`
- 最小权限：`AliyunFCReadOnlyAccess` 与相关接口权限：
    ```yaml
    {
        "Version": "1",
        "Statement": [
            {
                "Action": "log:GetLogStoreLogs",
                "Effect": "Allow",
                "Resource": "acs:log:<region>:<account-id>:project/<project>/logstore/<logstore>"
            }
        ]
    }
    ```
