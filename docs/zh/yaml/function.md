---
title: function字段
description: 'function字段'
position: 3
category: 'Yaml规范'
---

## function 字段

| 参数名                                              | 必填  | 类型                               | 参数描述                                                               |
| --------------------------------------------------- | ----- | ---------------------------------- | ---------------------------------------------------------------------- |
| name                                                | True  | String                             | function 名称                                                          |
| description                                         | False | String                             | function 的简短描述                                                    |
| codeUri                                             | False | String                             | 代码位置                                                               |
| ossBucket                                           | False | String                             | 代码存放的 oss 存储桶                                                  |
| ossKey                                              | False | String                             | 如果指定 oss 代码，所对应的对象，不能与 codeUri 同时出现               |
| handler                                             | False | String                             | function 执行的入口，具体格式和语言相关                                |
| memorySize                                          | False | Number                             | function 的内存规格                                                    |
| [runtime](#runtime)                                 | True  | String                             | 运行时                                                                 |
| timeout                                             | False | Number                             | function 运行的超时时间                                                |
| caPort                                              | False | Number                             | CustomContainer/Runtime 指定端口                                       |
| cpu                                                 | False | Number                             | 函数的 CPU 规格，单位为 vCPU，为 0.05 vCPU 的倍数。                    |
| diskSize                                            | False | Number                             | 函数的磁盘规格，单位为 MB，可选值为 512 MB 或 10240 MB。               |
| [customContainerConfig](#customcontainerconfig)     | False | [Struct](#customcontainerconfig)   | 自定义镜像配置                                                         |
| [customHealthCheckConfig](#customHealthCheckConfig) | False | [Struct](#customHealthCheckConfig) | 函数自定义健康检查配置，仅适用于 Custom Runtime 和 Custom Container。  |
| [environmentVariables](#environmentvariables)       | False | [Struct](#environmentvariables)    | 环境变量                                                               |
| initializationTimeout                               | False | Number                             | 初始化方法超时时间                                                     |
| initializer                                         | False | String                             | 初始化方法                                                             |
| instanceConcurrency                                 | False | Number                             | 单实例多并发                                                           |
| instanceSoftConcurrency                                 | False | Number                             | 扩容并发度。扩容并发度用于优雅扩容，当实例上并发数超过扩容并发度时，会触发实例扩容。例如，您的实例启动较慢，可以通过设置合适的扩容并发度，提前启动实例。`注意：扩容并发度的值不能大于实例并发度，最小值为1。线上存在此配置，但是yaml中没有配置，则默认为和 instanceConcurrency 值一致`                                                           |
| instanceType                                        | False | String                             | 函数实例类型，可选值为：e1（弹性实例）、c1（性能实例）、fc.gpu.tesla.1（GPU T4实例）、fc.gpu.ampere.1（GPU A10实例） |
| gpuMemorySize                                       | False | Number                             | GPU 实例内存规格                                                       |
| layers                                              | False | List\<String\>                     | 函数绑定层，支持 Nodejs、Python、Custom、Go1；取值是层的 ARN           |
| [instanceLifecycleConfig](#instancelifecycleconfig) | False | [Struct](#instancelifecycleconfig) | 扩展函数                                                               |
| [asyncConfiguration](#asyncconfiguration)           | False | [Struct](#asyncconfiguration)      | 异步配置                                                               |
| [customDNS](#customdns)                             | False | [Struct](#customdns)               | DNS 配置                                                               |
| [customRuntimeConfig](#customRuntimeConfig)         | False | [Struct](#customRuntimeConfig)     | 自定义运行时启动配置                                                   |

参考案例：

```yaml
function:
  name: event-function
  description: this is a test
  runtime: nodejs12
  codeUri: ./
  handler: index.handler
  memorySize: 128
  timeout: 60
```

### 账号需要的函数权限

#### 最大权限

`AliyunFCFullAccess`

#### 部署最小权限

⚠️ `fc:GetFunctionAsyncInvokeConfig` 选填，不影响使用

```json
{
  "Statement": [
    {
      "Action": ["fc:GetFunction", "fc:CreateFunction", "fc:UpdateFunction"],
      "Effect": "Allow",
      "Resource": "acs:fc:<region>:<account-id>:services/<service-name>/functions/*"
    }
  ],
  "Version": "1"
}
```

#### 删除最小权限

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": "fc:DeleteFunction",
      "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>/functions/<functionName>",
      "Effect": "Allow"
    }
  ]
}
```

### runtime

runtime 目前支持

`nodejs14`、`nodejs12`、`nodejs10`、`nodejs8`、`nodejs6`、`nodejs4.4`  
`python3.10`、`python3.9`、`python3`、`python2.7`  
`java11`、`java8`  
`go1`  
`php7.2`  
`dotnetcore2.1`  
`custom`、`custom.debian10`、`custom-container`

当 runtime 为 custom-container 服务角色权限：

**系统策略**：`AliyunContainerRegistryReadOnlyAccess`

### customHealthCheckConfig

| 参数名              | 必填  | 类型   | 参数描述                                                                       |
| ------------------- | ----- | ------ | ------------------------------------------------------------------------------ |
| httpGetUrl          | True  | String | 容器自定义健康检查 URL 地址。长度不超过 2048 个字符。                          |
| initialDelaySeconds | False | Number | 容器启动到发起健康检查的延迟。取值范围 0~120。默认值为 0。                     |
| periodSeconds       | False | Number | 健康检查周期。取值范围 1~120。默认值为 3。                                     |
| timeoutSeconds      | False | Number | 健康检查超时时间。取值范围 1~3。默认值为 1。                                   |
| failureThreshold    | False | Number | 健康检查失败次数阈值，达到该值后系统认为检查失败。取值范围 1~120。默认值为 3。 |
| successThreshold    | False | Number | 健康检查成功次数阈值，达到该值后系统认为检查成功。取值范围 1~120。默认值为 1。 |

### customContainerConfig

| 参数名           | 必填  | 类型   | 参数描述                                                                                                                                                                                   |
| ---------------- | ----- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| image            | True  | String | 容器镜像仓库地址                                                                                                                                                                           |
| command          | False | String | 容器启动指令，示例值: '["/code/myserver"]'                                                                                                                                                 |
| args             | False | String | 容器启动参数，示例值: '["-arg1", "value1"]'                                                                                                                                                |
| accelerationType | False | String | 镜像加速开关，可选值：'Default'、'None'，前者表示开启，后者表示关闭                                                                                                                        |
| instanceID       | False | String | 容器镜像服务企业版实例的 ID。当容器镜像选择的是企业版实例时，您需要给容器镜像服务企业版添加实例 ID，该实例的默认解析必须是服务所在的 VPC 网络地址。目前不支持 PrivateZone 产品定义域名解析 |
| webServerMode | False | Boolean | 镜像运行是否为Web Server模式。取值为true,表示需要在容器镜像中实现Web Server来监听端口并处理请求。取值为false,表示需要容器运行后主动退出进程，并且ExitCode需要为0。| 

### environmentVariables

Object 格式，例如：

```
DB_connection: jdbc:mysql://rm-bp90434sds45c.mysql.rds.aliyuncs.com:3306/litemall
```

当然不推荐通过明文将敏感信息写入到`s.yaml`, 可以配合[.env](https://www.serverless-devs.com/fc/tips#%E5%85%B3%E4%BA%8Eenv%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95) 使用。
如果在 `CICD`流水线环境中，也可以通过`export DB_connection=xxx`到临时环境变量， 再配合`${env(DB_connection)}` （[$env 文档](https://www.serverless-devs.com/fc/tips#yaml%E6%98%AF%E5%90%A6%E6%94%AF%E6%8C%81%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F%E5%BC%95%E7%94%A8%E5%A4%96%E9%83%A8%E6%96%87%E4%BB%B6)）进行引用

### instanceLifecycleConfig

| 参数名                           | 必填  | 类型                          | 参数描述       |
| -------------------------------- | ----- | ----------------------------- | -------------- |
| [preFreeze](#prefreeze和prestop) | False | [Struct](#prefreeze和prestop) | PreFreeze 函数 |
| [preStop](#prefreeze和prestop)   | False | [Struct](#prefreeze和prestop) | PreStop 函数   |

#### preFreeze 和 preStop

| 参数名  | 必填  | 类型   | 参数描述 |
| ------- | ----- | ------ | -------- |
| handler | True  | String | 函数入口 |
| timeout | False | Number | 超时时间 |

### asyncConfiguration

| 参数名                      | 必填  | 类型                   | 参数描述                                                |
| --------------------------- | ----- | ---------------------- | ------------------------------------------------------- |
| maxAsyncEventAgeInSeconds   | False | Number                 | 消息最大存活时长，取值范围[1,2592000]。单位：秒         |
| maxAsyncRetryAttempts       | False | Number                 | 异步调用失败后的最大重试次数，默认值为 3。取值范围[0,8] |
| statefulInvocation          | False | Boolean                | 是否开启有状态异步调用                                  |
| [destination](#destination) | False | [Struct](#destination) | 异步调用目标的配置结构体                                |

### customDNS

| 参数名      | 必填  | 类型                          | 参数描述                               |
| ----------- | ----- | ----------------------------- | -------------------------------------- |
| nameServers | False | List\<String\>                | DNS 服务器的 IP 地址列表               |
| searches    | False | List\<String\>                | DNS 搜索域列表                         |
| dnsOptions  | False | [List\<Struct\>](#dnsoptions) | 对应 resolv.conf DNS 配置的 Options 项 |

### customRuntimeConfig

| 参数名  | 必填  | 类型           | 参数描述                              |
| ------- | ----- | -------------- | ------------------------------------- |
| command | True  | List\<String\> | 启动指令，示例值: ["/code/myserver"]  |
| args    | False | List\<String\>         | 启动参数，示例值: ["-arg1", "value1"] |

#### dnsOptions

| 参数名 | 必填 | 类型   | 参数描述                                   |
| ------ | ---- | ------ | ------------------------------------------ |
| name   | True | String | 对应 resolv.conf DNS 配置的 Options 项的键 |
| value  | True | String | 对应 resolv.conf DNS 配置的 Options 项的值 |

#### 权限配置相关

##### 服务角色权限

- 配置了 fc：`AliyunFCInvocationAccess`
- 配置了 mns

```
{
    "Action":[
        "mns:SendMessage",
        "mns:PublishMessage"
    ],
    "Resource":"*",
    "Effect":"Allow"
}
```

##### 子账号需要的权限

###### 最大权限

**系统策略**：`AliyunFCFullAccess`、`AliyunMNSReadOnlyAccess`【查看消息服务(MNS)的权限】、`AliyunEventBridgeReadOnlyAccess`【事件总线（EventBridge）的权限】、`AliyunMQReadOnlyAccess`【消息队列(MQ)的权限】、`AliyunFCInvocationAccess`【调用函数权限】

###### 最小权限

**系统策略**

- 如果配置了 mns 相关 `AliyunMNSReadOnlyAccess`
- 如果配置了 EventBridge 相关 `AliyunEventBridgeReadOnlyAccess`
- 如果配置了 MQ 相关 `AliyunMQReadOnlyAccess`

**自定义策略**

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": "fc:*Service",
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Action": ["fc:GetFunction", "fc:CreateFunction", "fc:UpdateFunction"],
      "Effect": "Allow",
      "Resource": "acs:fc:<region>:<account-id>:services/unit-deploy-service/functions/*"
    },
    {
      "Action": [
        "fc:InvokeFunction",
        "fc:GetFunctionAsyncInvokeConfig",
        "fc:DeleteFunctionAsyncInvokeConfig",
        "fc:PutFunctionAsyncInvokeConfig"
      ],
      "Effect": "Allow",
      "Resource": "acs:fc:<region>:<account-id>:services/unit-deploy-service.*/functions/*"
    },
    {
      "Action": "ram:PassRole",
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
```

#### destination

| 参数名    | 必填  | 类型   | 参数描述               |
| --------- | ----- | ------ | ---------------------- |
| onSuccess | False | String | 异步调用成功的目标服务 |
| onFailure | False | String | 异步调用失败的目标服务 |
