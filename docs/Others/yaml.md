# Yaml规范说明

阿里云函数计算（FC）组件的Yaml字段如下：

```yaml
edition: 1.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: ffmpeg-app        #  项目名称
access: default         #  秘钥别名

services:
  MyFCExample:
    region: cn-qingdao
    service:
      name: qianfeng-fc-deploy-service
      description: demo for fc-deploy component
      internetAccess: true
      role: 'acs:ram::xxx:role/qianfeng-fc-deploy-test-role'
      nasConfig:
        userId: 10003
        groupId: 10003
        mountPoints:
          - serverAddr: xxx.cn-qingdao.nas.aliyuncs.com
            nasDir: /qianfeng-fc-deploy-service
            fcDir: /mnt/auto
      vpcConfig:
        vpcId: xxx
        securityGroupId: xxx
        vswitchIds:
          - vsw-xxx
      logConfig:
        project: xxx
        logstore: xxx
    function:
      name: qianfeng-fc-base-service
      description: 'this is test'
      codeUri: './code.zip'
      ossBucket: xxx
      ossKey: xxx
      handler: 'index.handler'
      memorySize: 128
      runtime: nodejs12
      timeout: 60
      caPort: 9000
      customContainerConfig:
        image: xxx
        command: xxx
        args: xxx
      environmentVariables:
        key: 'value'
      initializationTimeout: 20
      initializer: index.initializer
      instanceConcurrency: 1
      instanceType: e
    triggers:
      - name: httpTrigger
        type: http
        config:
          authType: anonymous
          methods:
            - GET
      - name: timerTrigger
        type: timer
        config:
          cronExpression: '0 0 8 * * *'
          enable: true
          payload: 'awesome-fc'
      - name: ossTrigger
        type: oss
        role: xxx
        sourceArn: xxx
        config:
          bucketName: fassdemo
          events:
            - oss:ObjectCreated:*
            - oss:ObjectRemoved:DeleteObject
          filter:
            Key:
              Prefix: source/
              Suffix: .png
      - name: logTrigger
        type: log
        role: xxx
        sourceArn: xxx
        config:
          logConfig:
            project: fass-demo
            logstore: fc-log
          jobConfig:
            maxRetryTime: 1
            triggerInterval: 30
          sourceConfig:
            logstore: function-log
          functionParameter:
            key: val
          enable: true
      - name: mnsTrigger
        type: mns_topic
        role: xxx
        sourceArn: xxx
        config:
          topicName: test-topic
          region: cn-hangzhou
          notifyContentFormat: 'JSON'
          notifyStrategy: 'BACKOFF_RETRY'
      - name: cdnTrigger
        type: cdn_events
        role: xxx
        sourceArn: xxx
        config:
          eventName: LogFileCreated
          eventVersion: '1.0.0'
          notes: cdn events trigger test
          filter:
            domain: 
              - 'www.taobao.com'
              - 'www.tmall.com'
    customDomains:
      - domainName: auto
        protocol: HTTP
        routeConfigs:
          - path: /a
            serviceName: qianfeng-fc-deploy-service
            functionName: custom-container-function
            methods:
              - GET
        certConfig:
          certName: xxx
          certificate: xxx
          privateKey: xxx
```


# 字段解析

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| region | True | Enum | 地域 |
| service | True | Struct | 服务 |
| function | True | Struct | 函数 |
| triggers | True | Struct | 触发器 |
| customDomains | True | Struct | 自定义域名 |

地区目前支持：cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1

## service字段
| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| name | True | String | service名称 |
| description | True | String | Service的简短描述 |
| internetAccess | False | Boolean | 设为true让function可以访问公网 |
| role | False | String[简单配置]/Struct[详细配置] | 授予函数计算所需权限的RAM role, 使用场景包含 1. 把 function产生的 log 发送到用户的 logstore 中 2. 为function 在执行中访问其它云资源生成 token |
| logConfig | False | Enum[简单配置]/Struct[详细配置] | log配置，function产生的log会写入这里配置的logstore |
| vpcConfig | False | Enum[简单配置]/Struct[详细配置] | VPC配置, 配置后function可以访问指定VPC |
| nasConfig | False | Enum[简单配置]/Struct[详细配置] | NAS配置, 配置后function可以访问指定NAS |

### role

当`role`参数为字符串时，可以是：`acs:ram::xxx:role/qianfeng-fc-deploy-test-role`

当`role`参数为结构时，可以参考：

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| name | True | String | 角色名 |
| policies | True | List<String> | 策略列表 |

例如：

```
role:
  name: roleName
  policies:
    - AliyunOSSFullAccess
    - name: myPolicy
      description: custom policy
      statement: 
      - Effect: Allow
        Action: 
          - log:ListProject
        Resource:
          - acs:log:*:*:project/*
```

### logConfig

当`logConfig`参数为简单配置是，可以是：`auto`

当`logConfig`参数为结构时，可以参考：

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| logStore | False | String | loghub中的logstore名称 |
| project | False | String | loghub中的project名称 |



### vpcConfig

当`vpcConfig`参数为简单配置是，可以是：`auto`

当`vpcConfig`参数为结构时，可以参考：

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| securityGroupId | False | String | 安全组ID |
| vSwitchIds | False | List<String> | 一个或多个VSwitch ID |
| vpcId | False | String | VPC ID |

### nasConfig

当`nasConfig`参数为简单配置是，可以是：`auto`

当`nasConfig`参数为结构时，可以参考：

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| mountPoints | False | List<Struct>[多目录配置] | 目录配置 |
| userId | False | String | userID, 默认为10003 |
| groupId | False | String | groupID, 默认为10003 |

#### mountPoints

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| serverAddr | False | String | NAS 服务器地址 |
| nasDir | False | String | NAS目录 |
| fcDir | False | String | 函数计算目录 |


## function
| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| name | True | String | function名称 |
| description | False | String | function的简短描述 |
| codeUri | False | String | 代码位置 |
| ossBucket | False | String | 如果指定oss代码，所在的存储桶，不能与codeUri同时出现 |
| ossKey | False | String | 如果指定oss代码，所对应的对象，不能与codeUri同时出现  |
| handler | False | String | function执行的入口，具体格式和语言相关 |
| memorySize | False | Number | function的内存规格 |
| runtime | False | String | 运行时 |
| timeout | False | Number | function运行的超时时间 |
| caPort | False | Number | CustomContainer/Runtime指定端口 |
| customContainerConfig | False | Struct | 自定义镜像配置 |
| InstanceConcurrency | False | Number | 单实例多并发 |
| environmentVariables | False | List<Struct> | 环境变量 |
| initializationTimeout | False | Number | 初始化方法超时时间 |
| initializer | False | String | 初始化方法 |
| instanceConcurrency | String | Struct | 单实例多并发 |
| instanceType | False | String | 实例类型 |

runtime目前支持：nodejs4.4、nodejs6、nodejs8、nodejs10、nodejs12、python2.7、python3、java8、java11、php7.2、dotnetcore2.1、custom及custom-container

### customContainerConfig
| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| image | False | String | 仓库地址 |
| command | False | String | 指令 |
| args | False | String | 参数 |


### environmentVariables

Object格式，例如：

```
TempKey: tempValue
```

## triggers

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| name | True | String | 触发器名称 |
| type | True | Enum | 触发器类型 |
| role | False | String | 使用一个 RAM 角色的 ARN 为函数指定执行角色，事件源会使用该角色触发函数执行，请确保该角色有调用函数的权限 |
| sourceArn | False | String | 资源Arn |
| config | True | Struct | 触发器配置 |

type目前支持：http, timer, oss, log, mns_topic, cdn_events

### OSS触发器


| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| bucketName | True | String | 为 OSS 中对应的 bucket 名称 |
| events | True | List | 为 OSS 端触发函数执行的事件 |
| filter | True | Struct | 筛选条件 |

#### filter

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| Key | False | Struct |  |

##### Key

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| Prefix | False | String | 前缀 |
| Suffix | False | String | 后缀 |


### Log触发器


| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| logConfig | True | String | log配置 |
| jobConfig | True | List | job配置 |
| sourceConfig | True | Struct | source配置 |
| functionParameter | True | Struct | 日志服务将该配置内容作为函数 event, 当事件触发时 |
| enable | True | Struct | 开关 |

#### logConfig
| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| project | False | String | 表示日志服务 Project 名称 |
| logStore | False | String | 表示触发函数执行时，产生的日志会记录到该 Logstore |


#### jobConfig
| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| maxRetryTime | False | String | 表示日志服务触发函数执行时，如果遇到错误，所允许的最大尝试次数 |
| triggerInterval | False | String | 表示日志服务触发函数执行的间隔 |

#### sourceConfig
| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| logstore | False | String | 数据源的 Logstore 名称。触发器会定时从该 Logstore 订阅数据到函数计算 |

#### functionParameter

Object格式，例如：

```
TempKey: tempValue
```

### Timer触发器

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| cronExpression | True | String | 时间触发器表达式 |
| enable | True | List | 表示是否启用该触发器 |
| payload | True | Struct | 传入参数 |

### Http触发器

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| authType | True | String | 鉴权类型，可选值：anonymous、function |
| methods | True | List | HTTP 触发器支持的访问方法，可选值：GET、POST、PUT、DELETE、HEAD |

### MNS触发器

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| topicName | True | String | mns topic的名字 |
| region | False | List | mns topic 所在的 region，如果不填，默认为和函数一样的 region |
| notifyContentFormat | False | String | 推送给函数入参 event 的格式，可选值：STREAM, JSON |
| notifyStrategy | False | List | 调用函数的重试策略，可选值：BACKOFF_RETRY, EXPONENTIAL_DECAY_RETRY |
| filterTag | False | List | 描述了该订阅中消息过滤的标签（标签一致的消息才会被推送）,不超过 16 个字符的字符串，默认不进行消息过滤，即默认不填写该字段 |

### CDN触发器

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| eventName | True | String | 为 CDN 端触发函数执行的事件，一经创建不能更改 |
| eventVersion | True | List | 为 CDN 端触发函数执行事件的版本，一经创建不能更改 |
| notes | True | String | 备注信息 |
| filter | True | Struct | 过滤器（至少需要一个过滤器） |

#### filter

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| domain | True | List<String> | 网址 |



## customDomains

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| domainName | True | String | 域名，如果是auto取值，系统则会默认分配域名 |
| protocol | True | String | 协议，取值：`HTTP`, `HTTPS`, `HTTP, HTTPS` |
| routeConfigs | True | List<Struct> | 路由 |
| certConfig | False | Struct | 域名证书 |

### certConfig
| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| certName | False | String | 名称 |
| privateKey | False | String | 表示私钥 |
| certificate | False | String | 表示证书 |

### routeConfigs
| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| path | True | String | 路径 |
| serviceName | False | String | 服务名 |
| functionName | False | String | 函数名 |
