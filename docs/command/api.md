# Api 命令

`api` 命令是直接操作函数计算 API 的命令。

- [命令解析](#命令解析)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [权限与策略说明](#权限与策略说明)

> 关于 `api` 命令的常见问题和解决方法，可以参考[ FC 组件自动问答系统](http://qa.devsapp.cn/) 。

## 命令解析

当执行命令`api -h`/`api --help`时，可以获取帮助文档：

```shell script
Api

  Directly operate the FC API without yaml support

Usage

  s api <api> <options>  
                            
Document
  
  https://github.com/devsapp/fc/blob/main/docs/command/api.md    

API Document 

  https://help.aliyun.com/document_detail/188577.html

Global Options

  -h, --help                 [Optional] Help for command    
  -a, --access [string]      [Optional] Specify key alias             
  --debug                    [Optional] Output debug informations        

Examples with Cli

  $ s cli api ListService              
```

### 参数解析

| 参数全称   | 参数缩写 | Yaml模式下必填 | 参数含义                                                     |
| ---------- | -------- | -------------- | ------------------------------------------------------------ |
| access     | a        | 选填           | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug      | -        | 选填           | 打开`debug`模式，将会输出更多日志信息                        |
| help       | h        | 选填           | 查看帮助信息                                                 |

### 操作案例

以 `ListService` 接口为例（对应的文档是：https://help.aliyun.com/document_detail/175559.html）。

只需要在命令行，按照`api`指令的固定格式，进行功能拼接即可：

```shell script
s cli api ListService
```

在 `ListService` 的接口文档中，还有四个可选参数，也可以通过`--<参数>`的形式传入，例如：

```shell script
s cli api ListService --limit 20 --nextToken _FUN_NAS-classify --prefix _FUN_NAS
```

## 权限与策略说明

根据使用的接口不同，可能会有不同的权限策略，可以根据接口名定义权限策略。
