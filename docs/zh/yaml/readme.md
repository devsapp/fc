---
title: Yaml规范
description: 'Yaml规范说明'
position: 1
category: 'Yaml规范'
---

# 字段解析

| 参数名                              | 必填  | 类型                         | 参数描述   |
| ----------------------------------- | ----- | ---------------------------- | ---------- |
| region                              | True  | Enum                         | 地域       |
| [service](./service.md)             | True  | [Struct](./service.md)       | 服务       |
| [function](./function.md)           | False | [Struct](./function.md)      | 函数       |
| [triggers](./triggers.md)           | False | [Struct](./triggers.md)      | 触发器     |
| [customDomains](./customDomains.md) | False | [Struct](./customDomains.md) | 自定义域名 |

地区(region)目前支持：`cn-beijing`, `cn-hangzhou`, `cn-shanghai`, `cn-qingdao`, `cn-zhangjiakou`, `cn-huhehaote`, `cn-shenzhen`, `cn-chengdu`, `cn-hongkong`, `ap-southeast-1`, `ap-southeast-2`, `ap-southeast-3`, `ap-southeast-5`, `ap-northeast-1`, `eu-central-1`, `eu-west-1`, `us-west-1`, `us-east-1`, `ap-south-1`

# Yaml 完整配置

阿里云函数计算（FC）组件的 Yaml 字段如下：

```yaml
edition: 1.0.0 #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: ffmpeg-app #  项目名称
access: default #  秘钥别名

services:
  fc-deploy-test: # 模块名称
    component: devsapp/fc # 组件名称
    props: # 组件的属性值
      region: cn-qingdao # 地域
      service: # 服务配置
        name: fc-deploy-service # service名称
        description: dem component # Service的简短描述
        internetAccess: true # 设为true让function可以访问公网
        role: 'acs:ram::xxx:role/AliyunFcDefaultRole' # 授予函数计算所需权限的RAM role, 使用场景包含 1. 把 function产生的 log 发送到用户的 logstore 中 2. 为function 在执行中访问其它云资源生成 token
        tracingConfig: Enable # 链路追踪，可取值：Enable、Disable
        nasConfig: # NAS配置, 配置后function可以访问指定NAS
          userId: 10003 # userID, 默认为10003
          groupId: 10003 # groupID, 默认为10003
          mountPoints: # 目录配置
            - serverAddr: xxx.cn-qingdao.nas.aliyuncs.com # NAS 服务器地址
              nasDir: /fc-deploy-service # NAS目录
              fcDir: /mnt/auto # 函数计算目录
        vpcConfig: # VPC配置, 配置后function可以访问指定VPC
          vpcId: xxx # VPC ID
          securityGroupId: xxx # 安全组ID
          vswitchIds: # 交换机 ID 列表
            - vsw-xxx
        logConfig: # log配置，function产生的log会写入这里配置的logstore
          project: xxx # loghub中的project名称
          logstore: xxx # loghub中的logstore名称
          enableRequestMetrics: true # RequestMetrics开关，取值true/false
          enableInstanceMetrics: true # InstanceMetrics开关，取值true/false
          logBeginRule: DefaultRegex # 日志是否切分，取值 DefaultRegex/None
        ossMountConfig: # 挂载 oss
          mountPoints:
            - endpoint: http://oss-cn-shenzhen-internal.aliyuncs.com # OSS服务地址
              bucketName: test-oss-name # OSS bucket名称
              bucketPath: /my-dir # 挂载的OSS Bucket路径。留空或者填`/`，都表示挂载bucket根目录
              mountDir: /mnt/example-bucket # 函数计算目录
              readOnly: false # 是否挂载为只读
        vpcBinding: # 仅允许指定 VPC 调用函数
          - vpc-bpxxxxxxxoeoq
          - vpc-bpxxxxxxxxxmw
      function: # 函数配置
        name: fc-base-service # function名称
        description: 'this is test' # function的简短描述
        codeUri: './code.zip' # 代码位置
        ossBucket: xxx # 代码存放的 oss 存储桶
        ossKey: xxx # 如果指定 oss 代码，所对应的对象，不能与codeUri同时出现
        handler: 'index.handler' # function执行的入口，具体格式和语言相关
        memorySize: 128 # function的内存规格
        runtime: nodejs12 # 运行时
        timeout: 60 # function运行的超时时间
        caPort: 9000 # CustomContainer/Runtime指定端口
        customContainerConfig: # 自定义镜像配置
          image: xxx # 容器镜像仓库地址
          command: xxx # 容器启动指令，示例值: '["/code/myserver"]'
          args: xxx # 容器启动参数，示例值: '["-arg1", "value1"]'
          instanceID: cri-xxxxxx # 容器镜像服务企业版实例的ID。当容器镜像选择的是企业版实例时，您需要给容器镜像服务企业版添加实例ID，该实例的默认解析必须是服务所在的VPC网络地址。目前不支持PrivateZone产品定义域名解析
          accelerationType: Default # 镜像加速开关，可选值：'Default'、'None'，前者表示开启，后者表示关闭
        environmentVariables: # 环境变量
          key: 'value'
        initializationTimeout: 20 # 初始化方法超时时间
        initializer: index.init # 初始化方法
        instanceConcurrency: 1 # 单实例多并发
        instanceType: e1 # 函数实例类型，可选值为：e1（弹性实例）、c1（性能实例）、g1（GPU实例）
        layers: # 函数绑定层，支持 Nodejs、Python、Java、Php、Golang、.NET和Custom Runtime；取值是层的 ARN; 多个层会按照数组下标从大到小的顺序进行合并，下标小的层的内容会覆盖下标大的层的同名文件
          - xxx
          - xxx
        instanceLifecycleConfig: # 扩展函数
          preFreeze: # PreFreeze 函数
            handler: index.xxx # 函数入口
            timeout: 60 # 超时时间
          preStop: # PreStop 函数
            handler: index.xxx # 函数入口
            timeout: 60 # 超时时间
        asyncConfiguration: # 异步配置
          destination:
            onSuccess: acs:fc:{region}:{uid}:services/{serviceName}.{qualifier}/functions/{functionName} # 异步调用成功的目标服务
            onFailure: acs:fc:{region}:{uid}:services/{serviceName}.{qualifier}/functions/{functionName} # 异步调用失败的目标服务
            # onSuccess: acs:fc:::services/{serviceName}.{qualifier}/functions/{functionName}
            # onSuccess: acs:mns:::/queues/{queuesName}/messages # mns/queues
            # onSuccess: acs:mns:::/topics/{topicsName}/messages # mns/topics
          maxAsyncEventAgeInSeconds: 456 # 消息最大存活时长，取值范围[1,2592000]。单位：秒
          maxAsyncRetryAttempts: 3 # 异步调用失败后的最大重试次数，默认值为3。取值范围[0,8]
          statefulInvocation: true #是否开启有状态异步调用
        customDNS: # DNS 配置
          nameServers: # DNS 服务器的 IP 地址列表
            - 8.8.8.8
            - 114.114.114.114
          searches: # DNS 搜索域列表
            - default.svc.test.example
            - svc.jqDgWvOo.test.example
          dnsOptions: # 对应 resolv.conf DNS 配置的 Options 项
            - name: ndots # 对应 resolv.conf DNS 配置的 Options 项的键
              value: '6' # 对应 resolv.conf DNS 配置的 Options 项的值
            - name: edns # 对应 resolv.conf DNS 配置的 Options 项的键
              value: '7' # 对应 resolv.conf DNS 配置的 Options 项的值
        customRuntimeConfig: # 自定义运行时启动配置
          command: # 启动指令，示例值: ["/code/myserver"]
            - /code/node_modules/ts-node/dist/bin.js
            - server.ts
          args: # 启动参数，示例值: ["-arg1", "value1"]
            - '--args1'
            - args1
        customHealthCheckConfig:
          httpGetUrl: /url # 容器自定义健康检查 URL 地址
          initialDelaySeconds: 0 # 容器启动到发起健康检查的延迟
          periodSeconds: 3 # 健康检查周期
          timeoutSeconds: 1 # 健康检查超时时间
          failureThreshold: 3 # 健康检查失败次数阈值
          successThreshold: 1 # 健康检查成功次数阈值
      triggers: # 触发器配置
        - name: httpTrigger # 触发器名称
          type: http # 触发器类型
          qualifier: xxx # 触发服务的版本
          config: # 触发器配置，包括OSS触发器, Log触发器, Log触发器, Timer触发器, Http触发器, MNS触发器, CDN触发器
            authType: anonymous # 鉴权类型，可选值：anonymous、function
            disableURLInternet: false # 是否禁用公网访问 URL
            methods: # HTTP 触发器支持的访问方法，可选值：GET、POST、PUT、DELETE、HEAD
              - GET
        - name: timerTrigger # 触发器名称
          type: timer # 触发器类型
          qualifier: xxx # 触发服务的版本
          config: # 触发器配置，包括OSS触发器, Log触发器, Log触发器, Timer触发器, Http触发器, MNS触发器, CDN触发器
            cronExpression: '0 0 8 * * *' # 时间触发器表达式，支持两种设置：@every、cron 表达式
            enable: true # 是否启用该触发器
            payload: 'awesome-fc' # 代表触发器事件本身的输入内容
        - name: ossTrigger # 触发器名称
          type: oss # 触发器类型
          role: xxx # 使用一个 RAM 角色的 ARN 为函数指定执行角色，事件源会使用该角色触发函数执行，请确保该角色有调用函数的权限
          sourceArn: xxx # 触发器事件源的 ARN
          qualifier: xxx # 触发服务的版本
          config: # 触发器配置，包括OSS触发器, Log触发器, Log触发器, Timer触发器, Http触发器, MNS触发器, CDN触发器
            bucketName: fassdemo # OSS 中目标 bucket 名称
            events: # OSS 端触发函数执行的事件列表，参考文档：https://help.aliyun.com/document_detail/62922.html#section-mf3-l4l-1nf
              - oss:ObjectCreated:*
              - oss:ObjectRemoved:DeleteObject
            filter: # 触发条件
              Key: # 键值
                Prefix: source/ # 前缀
                Suffix: .png # 后缀
        - name: logTrigger # 触发器名称
          type: log # 触发器类型
          role: xxx # 使用一个 RAM 角色的 ARN 为函数指定执行角色，事件源会使用该角色触发函数执行，请确保该角色有调用函数的权限
          sourceArn: xxx # 触发器事件源的 ARN
          qualifier: xxx # 触发服务的版本
          config: # 触发器配置，包括OSS触发器, Log触发器, Log触发器, Timer触发器, Http触发器, MNS触发器, CDN触发器
            logConfig: # 日志配置
              project: fass-demo # 日志项目名称
              logstore: fc-log # 日志仓库名称，日志服务触发函数执行过程的日志会记录到该日志仓库中
            jobConfig: # job配置
              maxRetryTime: 1 # 表示日志服务触发函数执行时，如果遇到错误，所允许的最大尝试次数，取值范围：[0,100]
              triggerInterval: 30 # 日志服务触发函数运行的时间间隔，取值范围：[3,600]，单位：秒
            sourceConfig: # source配置
              logstore: function-log # 触发器会定时从该日志仓库中订阅数据到函数服务进行自定义加工
            functionParameter: # 该参数将作为函数Event的Parameter传入函数。默认值为空（{}）
              key: val
            enable: true # 触发器开关
        - name: mnsTrigger # 触发器名称
          type: mns_topic # 触发器类型
          role: xxx # 使用一个 RAM 角色的 ARN 为函数指定执行角色，事件源会使用该角色触发函数执行，请确保该角色有调用函数的权限
          sourceArn: xxx # 触发器事件源的 ARN
          qualifier: xxx # 触发服务的版本
          config: # 触发器配置，包括OSS触发器, Log触发器, Log触发器, Timer触发器, Http触发器, MNS触发器, CDN触发器
            topicName: test-topic # mns topic的名字
            region: cn-hangzhou # mns topic 所在的 region，如果不填，默认为和函数一样的 region
            notifyContentFormat: 'JSON' # 推送给函数入参 event 的格式，可选值：STREAM, JSON
            notifyStrategy: 'BACKOFF_RETRY' # 调用函数的重试策略，可选值：BACKOFF_RETRY, EXPONENTIAL_DECAY_RETRY
            filterTag: abc # 描述了该订阅中消息过滤的标签（标签一致的消息才会被推送）,不超过 16 个字符的字符串，默认不进行消息过滤，即默认不填写该字段
        - name: cdnTrigger # 触发器名称
          type: cdn_events # 触发器类型
          role: xxx # 使用一个 RAM 角色的 ARN 为函数指定执行角色，事件源会使用该角色触发函数执行，请确保该角色有调用函数的权限
          sourceArn: xxx # 触发器事件源的 ARN
          qualifier: xxx # 触发服务的版本
          config: # 触发器配置，包括OSS触发器, Log触发器, Log触发器, Timer触发器, Http触发器, MNS触发器, CDN触发器
            eventName: LogFileCreated # 为 CDN 端触发函数执行的事件，一经创建不能更改
            eventVersion: '1.0.0' # 为 CDN 端触发函数执行事件的版本，一经创建不能更改
            notes: cdn events trigger test # 备注信息
            filter: # 过滤器（至少需要一个过滤器）
              domain: # 过滤参数值的集合
                - 'www.taobao.com'
                - 'www.tmall.com'
        - name: tablestoreTrigger # 触发器名称
          type: tablestore # 触发器类型
          role: xxx # 使用一个 RAM 角色的 ARN 为函数指定执行角色，事件源会使用该角色触发函数执行，请确保该角色有调用函数的权限
          sourceArn: xxx # 触发器事件源的 ARN
          qualifier: xxx # 触发服务的版本
          config: # 触发器配置，包括OSS触发器, Log触发器, Log触发器, Timer触发器, Http触发器, MNS触发器, CDN触发器
            instanceName: xxx # 表格存储实例的名称
            tableName: xxxs # 实例中的表名称
      customDomains: # 自定义域名配置
        - domainName: auto # 域名，如果是auto取值，系统则会默认分配域名
          protocol: HTTP # 协议，取值：HTTP, HTTPS, HTTP, HTTPS
          routeConfigs: # 路由配置
            - path: /a # 路径
              serviceName: fc-depice # 服务名
              functionName: function # 函数名
              qualifier: 1 # 服务的版本
              rewriteConfig: # URI重写配置
                equalRules:  # 完全匹配规则
                  - match: /old  # 匹配规则
                    replacement: /new # 替换规则
                wildcardRules:  # 通配符匹配规则
                  - match: /old  # 匹配规则
                    replacement: /new # 替换规则
                regexRules:  # 正则匹配规则
                  - match: /old  # 匹配规则
                    replacement: /new # 替换规则
          wafConfig:  # Web应用防火墙配置信息
            enableWAF: true # 是否开启Web应用防火墙
          certConfig: # 域名证书
            certName: xxx # 证书名称
            certificate: xxx # 表示私钥，内容仅支持 PEM 格式
            privateKey: xxx # 表示证书，内容仅支持 PEM 格式
          certId: 123 # 域名证书Id
```

> Tips:
>
> - 如何声明多个函数？  
>   在 Serverless Devs 的函数计算组件中，默认规定服务和函数是一一对应关系，如果需要在一个服务下声明多个函数，可以参考[常见小贴士](http://www.serverless-devs.com/fc/tips) 中提供的[如何声明部署多个函数文档](http://www.serverless-devs.com/fc/tips#%E5%A6%82%E4%BD%95%E5%A3%B0%E6%98%8E%E9%83%A8%E7%BD%B2%E5%A4%9A%E4%B8%AA%E5%87%BD%E6%95%B0)
