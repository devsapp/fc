# Plan 命令

`plan` 命令是对函数计算资源变更感知的命令。

- [命令解析](#命令解析)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [权限与策略说明](#权限与策略说明)

## 命令解析

当执行命令`plan -h`/`plan --help`时，可以获取帮助文档：

```shell script
Plan

  Perceived resource change

Usage

  s plan <options>  
                            
Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/plan.md    

Options

  --type-plan [remove/deploy]   [Required] Expected instruction,value: remove/deploy(default: "deploy")               
  --sub-command string          [Optional] Expected subcommand.                                                       
                                If type-plan is deploy, optional value:service/function/trigger/domain                
                                If type-plan is remove, optional                                                      
                                value:service/function/trigger/domain/version/alias/provision/ondemand/onDemand/layer

Global Options

  -h, --help                 [Optional] Help for command    
  -a, --access [string]      [Optional] Specify key alias             
  --debug                    [Optional] Output debug informations        

Examples with Cli

  $ s plan              
```

### 参数解析

| 参数全称   | 参数缩写 | Yaml模式下必填 | 参数含义                                                     |
| ---------- | -------- | -------------- | ------------------------------------------------------------ |
| type-plan | - | 必填 | 查看部署或者删除的变更，默认是查看部署 |
| sub-command | - | 选填 | 查看哪些资源的变更。如果 type-plan 是 deploy 那么可选参数有 service/function/trigger/domain；如果 type-plan 是 remove 那么可选参数有 service/function/trigger/domain/version/alias/provision/ondemand/onDemand/layer |
| access     | a        | 选填           | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug      | -        | 选填           | 打开`debug`模式，将会输出更多日志信息                        |
| help       | h        | 选填           | 查看帮助信息                                                 |

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s plan`进行资源变更感知，效果如下：

```text
Local Last Deploy status => Online status

  description: "this is a test" => "ssssssssss. this is a test"
  timeout: 160 => 100
```

此时需要额外注意几种情况：

- 本地全新项目：
    - 线上不存在目标函数资源：提示即将创建的资源内容
      ```shell script
      ✅ Resources to create:
      
        service:
          name: abc
          description: efg
      ```
    - 线上存在目标函数资源：提示本地项目所需要创建的资源与线上目标函数配置的区别（做 diff 操作）
      ```shell script
      ✅ Resources to change (release => new):
        
        service:
          name: abc
          description: efg  =>   demo
      ```
- 本地已存在项目：
    - 线上不存在目标函数资源：提示即将创建的资源内容
      ```shell script
      ✅ Resources to create:
      
        service:
          name: abc
          description: efg
      ```
    - 线上存在目标函数资源：
        - 本地上一次部署状态和线上资源不一致：提示上次本地部署完成之后，线上资源发生过那些变更，以及即将变成什么样子
          ```shell script
          ⚠️ Hazard change (last state => release):
            service:
              name: abc
              description: test  =>  efg
          
          ✅ Resources to change (release => new):
            
            service:
              name: abc
              description: efg  =>   demo
          ```
        - 本地上一次部署状态和线上资源一致：提示本地项目所需要更新的资源与线上目标函数配置的区别（做 diff 操作）
          ```shell script
          ✅ Resources to change (release => new):
            
            service:
              name: abc
              description: efg  =>   demo
          ```

## 权限与策略说明

使用该命令时，推荐配置系统策略：`AliyunFCReadOnlyAccess`
