---
title: triggers字段
description: 'triggers字段'
position: 4
category: 'Yaml规范'
---

## triggers字段

| 参数名    | 必填  | 类型   | 参数描述                                                     |
| --------- | ----- | ------ | ------------------------------------------------------------ |
| name      | True  | String | 触发器名称                                                   |
| type      | True  | Enum   | 触发器类型                                                   |
| role      | False | String | 使用一个 RAM 角色的 ARN 为函数指定执行角色，事件源会使用该角色触发函数执行，请确保该角色有调用函数的权限 |
| sourceArn | False | String | 触发器事件源的 ARN                                           |
| qualifier | False | String | 触发器函数的版本或者别名，默认 `LATEST`                      |
| config    | True  | Struct | 触发器配置，包括[OSS触发器](#OSS触发器), [Log触发器](#Log触发器), [Log触发器](#Log触发器), [Timer触发器](#Timer触发器), [Http触发器](#Http触发器), [MNS触发器](#MNS触发器), [CDN触发器](#CDN触发器), [EventBridge触发器](#EventBridge触发器) |

type目前支持：`http`, `timer`, `oss`, `log`, `mns_topic`, `cdn_events`, `tablestore`, `eventbridge`

### OSS触发器

| 参数名            | 必填 | 类型              | 参数描述                     |
| ----------------- | ---- | ----------------- | ---------------------------- |
| bucketName        | True | String            | OSS 中目标 bucket 名称       |
| events            | True | List\<String\>      | OSS 端触发函数执行的事件列表， 相关文档：https://help.aliyun.com/document_detail/62922.html#section-mf3-l4l-1nf |
| [filter](#filter) | True | [Struct](#filter) | 触发条件                     |

参考案例：

```yaml
triggers:  
  - name: oss    
    sourceArn: acs:oss:<region>:<account-id>:<buckctName>    
    type: oss    
    role: acs:ram::<account-id>:role/aliyunosseventnotificationrole    
    # qualifier: LATEST    
    config:      
      events:        
        - oss:ObjectCreated:*      
      filter:       
        Key:          
          Prefix: pppppppp          
          Suffix: ''
```

#### 权限配置相关

##### 子账号权限

###### 最大权限

`AliyunFCFullAccess`、`AliyunOSSFullAccess`

###### 操作最小权限

```json
{
    "Version":"1",
    "Statement":[
        {
            "Action":[
                "fc:GetTrigger",
                "fc:CreateTrigger",
                "fc:UpdateTrigger",
                "fc:DeleteTrigger"
            ],
            "Effect":"Allow",
            "Resource":"acs:fc:<region>:<account-id>:services/*/functions/*/triggers/*"
        },
        {
            "Action":"ram:PassRole",
            "Effect":"Allow",
            "Resource":"*"
        },
        {
            "Action":[
                "oss:ListBucket",
                "oss:GetBucketEventNotification",
                "oss:PutBucketEventNotification",
                "oss:DeleteBucketEventNotification"
            ],
            "Effect":"Allow",
            "Resource":"*"
        }
    ]
}
```


##### 触发器角色权限

```json
{
    "Version":"1",
    "Statement":[
        {
            "Action":[
                "fc:InvokeFunction"
            ],
            "Resource":"*",
            "Effect":"Allow"
        }
    ]
}
```

#### filter

| 参数名 | 必填  | 类型          | 参数描述 |
| ------ | ----- | ------------- | -------- |
| Key    | True | [Struct](Key) | 键值     |

##### Key

| 参数名 | 必填  | 类型   | 参数描述 |
| ------ | ----- | ------ | -------- |
| Prefix | True | String | 前缀     |
| Suffix | True | String | 后缀     |

### Log触发器


| 参数名                                  | 必填 | 类型                         | 参数描述                                                   |
| --------------------------------------- | ---- | ---------------------------- | ---------------------------------------------------------- |
| [logConfig](#logConfig-1)               | True | [Struct](#logConfig-1)       | 日志配置                                                   |
| [jobConfig](#jobConfig)                 | True | [Struct](#jobConfig)         | job配置                                                    |
| [sourceConfig](#sourceConfig)           | True | [Struct](#sourceConfig)      | source配置                                                 |
| [functionParameter](#functionParameter) | True | [Struct](#functionParameter) | 该参数将作为函数Event的Parameter传入函数。默认值为空（{}） |
| enable                                  | True | Boolean                      | 触发器开关                                                 |


参考案例：

```yaml
triggers:  
  - name: log    
    sourceArn: acs:log:<region>:<account-id>:project/<projectName>    
    type: log    
    role: acs:ram::<account-id>:role/aliyunlogetlrole    
    # qualifier: LATEST    
    config:      
      sourceConfig:        
        logstore: log      
      jobConfig:        
        maxRetryTime: 3        
        triggerInterval: 60      
      functionParameter: {}      
      logConfig:        
        project: test-data-abc-ss        
        logstore: log2      
      enable: false
```

#### 权限配置相关

##### 子账号权限

###### 最大权限

`AliyunFCFullAccess`、`AliyunLogFullAccess`

###### 最小权限

```json
{
    "Version":"1",
    "Statement":[
        {
            "Action":[
                "fc:GetTrigger",
                "fc:CreateTrigger",
                "fc:UpdateTrigger",
                "fc:DeleteTrigger"
            ],
            "Effect":"Allow",
            "Resource":"acs:fc:<region>:<account-id>:services/*/functions/*/triggers/*"
        },
        {
            "Action":"ram:PassRole",
            "Effect":"Allow",
            "Resource":"*"
        },
        {
            "Effect":"Allow",
            "Action":[
                "log:GetEtlJob",
                "log:UpdateEtlJob",
                "log:CreateEtlJob",
                "log:DeleteEtlJob"
            ],
            "Resource":"*"
        }
    ]
}
```

##### 触发器角色权限

```json
{
    "Version":"1",
    "Statement":[
        {
            "Action":[
                "fc:InvokeFunction"
            ],
            "Resource":"*",
            "Effect":"Allow"
        },
        {
            "Action":[
                "log:Get*",
                "log:List*",
                "log:PostProjectQuery",
                "log:PutProjectQuery",
                "log:DeleteProjectQuery",
                "log:GetProjectQuery",
                "log:PostLogStoreLogs",
                "log:BatchPostLogStoreLogs",
                "log:CreateConsumerGroup",
                "log:UpdateConsumerGroup",
                "log:DeleteConsumerGroup",
                "log:ListConsumerGroup",
                "log:ConsumerGroupUpdateCheckPoint",
                "log:ConsumerGroupHeartBeat",
                "log:GetConsumerGroupCheckPoint"
            ],
            "Resource":"*",
            "Effect":"Allow"
        }
    ]
}
```


#### logConfig

| 参数名   | 必填  | 类型   | 参数描述                                                     |
| -------- | ----- | ------ | ------------------------------------------------------------ |
| project  | True | String | 日志项目名称                                                 |
| logstore | True | String | 日志仓库名称，日志服务触发函数执行过程的日志会记录到该日志仓库中 |


#### jobConfig

| 参数名          | 必填  | 类型   | 参数描述                                                     |
| --------------- | ----- | ------ | ------------------------------------------------------------ |
| maxRetryTime    | False | String | 表示日志服务触发函数执行时，如果遇到错误，所允许的最大尝试次数，取值范围：[0,100] |
| triggerInterval | False | String | 日志服务触发函数运行的时间间隔，取值范围：[3,600]，单位：秒  |

#### sourceConfig

| 参数名   | 必填  | 类型   | 参数描述                                                   |
| -------- | ----- | ------ | ---------------------------------------------------------- |
| logstore | True | String | 触发器会定时从该日志仓库中订阅数据到函数服务进行自定义加工 |

#### functionParameter

Object格式，例如：

```
TempKey: tempValue
```

### Timer触发器

| 参数名         | 必填  | 类型    | 参数描述                                            |
| -------------- | ----- | ------- | --------------------------------------------------- |
| cronExpression | True  | String  | 时间触发器表达式，支持两种设置：@every、cron 表达式 |
| enable         | True  | Boolean | 是否启用该触发器                                    |
| payload        | False | String  | 代表触发器事件本身的输入内容                        |

参考案例：

```yaml
triggers:  
  - name: timer    
    type: timer    
    # qualifier: LATEST    
    config:    
      payload: '{"s": "ss"}'    
      cronExpression: '@every 100m'    
      enable: false
```

#### 权限配置相关

##### 子账号需要的函数权限

###### 最大权限

`AliyunFCFullAccess`

###### 最小权限

```json
{
    "Version":"1",
    "Statement":[
        {
            "Action":[
                "fc:GetTrigger",
                "fc:CreateTrigger",
                "fc:DeleteTrigger",
                "fc:UpdateTrigger"
            ],
            "Effect":"Allow",
            "Resource":"acs:fc:<region>:<account-id>:services/<serviceName>/functions/<functionName>/triggers/<triggerName>"
        }
    ]
}
```

### Http触发器

| 参数名   | 必填 | 类型         | 参数描述                                                     |
| -------- | ---- | ------------ | ------------------------------------------------------------ |
| authType | True | String       | 鉴权类型，可选值：anonymous、function                        |
| methods  | True | List\<String\> | HTTP 触发器支持的访问方法，可选值：GET、POST、PUT、DELETE、HEAD |

参考案例：

```yaml
triggers:  
  - name: httpTrigger    
    type: http    
    # qualifier: LATEST    
    config:      
      authType: anonymous      
      methods:        
        - GET
```

#### 权限配置相关

##### 子账号需要的函数权限

###### 最大权限

`AliyunFCFullAccess`

###### 最小权限

```json
{
    "Version":"1",
    "Statement":[
        {
            "Action":[
                "fc:GetTrigger",
                "fc:CreateTrigger",
                "fc:DeleteTrigger",
                "fc:UpdateTrigger"
            ],
            "Effect":"Allow",
            "Resource":"acs:fc:<region>:<account-id>:services/<serviceName>/functions/<functionName>/triggers/<triggerName>"
        }
    ]
}
```

### MNS触发器

| 参数名              | 必填  | 类型   | 参数描述                                                     |
| ------------------- | ----- | ------ | ------------------------------------------------------------ |
| topicName           | True  | String | mns topic的名字                                              |
| region              | False | List   | mns topic 所在的 region，如果不填，默认为和函数一样的 region |
| notifyContentFormat | False | String | 推送给函数入参 event 的格式，可选值：STREAM, JSON            |
| notifyStrategy      | False | String | 调用函数的重试策略，可选值：BACKOFF_RETRY, EXPONENTIAL_DECAY_RETRY |
| filterTag           | False | String | 描述了该订阅中消息过滤的标签（标签一致的消息才会被推送）,不超过 16 个字符的字符串，默认不进行消息过滤，即默认不填写该字段 |

参考案例：

```yaml
triggers:  
  - name: mns    
    sourceArn: acs:mns:<region>:<account-id>:/topics/test    
    type: mns_topic    
    role: acs:ram::<account-id>:role/aliyunmnsnotificationrole    
    # qualifier: LATEST    
    config:      
      filterTag: ss      
      notifyContentFormat: STREAM      
      notifyStrategy: BACKOFF_RETRY
```

#### 权限配置相关

##### 子账号需要的函数权限

###### 最大权限

`AliyunFCFullAccess`、`AliyunMNSFullAccess`

###### 最小权限

```json
{
    "Version":"1",
    "Statement":[
        {
            "Action":[
                "fc:GetTrigger",
                "fc:CreateTrigger",
                "fc:UpdateTrigger",
                "fc:DeleteTrigger"
            ],
            "Effect":"Allow",
            "Resource":"acs:fc:<region>:<account-id>:services/*/functions/*/triggers/*"
        },
        {
            "Action":"ram:PassRole",
            "Effect":"Allow",
            "Resource":"*"
        },
        {
            "Effect":"Allow",
            "Action":[
                "mns:Subscribe",
                "mns:Unsubscribe"
            ],
            "Resource":"*"
        }
    ]
}
```

##### 触发器角色权限

```json
{
    "Version":"1",
    "Statement":[
        {
            "Action":[
                "fc:InvokeFunction"
            ],
            "Resource":"*",
            "Effect":"Allow"
        }
    ]
}
```

### CDN触发器

| 参数名              | 必填 | 类型                | 参数描述                                          |
| ------------------- | ---- | ------------------- | ------------------------------------------------- |
| eventName           | True | String              | 为 CDN 端触发函数执行的事件，一经创建不能更改     |
| eventVersion        | True | String              | 为 CDN 端触发函数执行事件的版本，一经创建不能更改 |
| notes               | True | String              | 备注信息                                          |
| [filter](#filter-1) | True | [Struct](#filter-1) | 过滤器（至少需要一个过滤器）                      |

参考案例：

```yaml
triggers:  
  - name: cdn    
    sourceArn: acs:cdn:*:<account-id>    
    type: cdn_events    
    role: <roleArn>    
    # qualifier: LATEST    
    config:      
      eventName: CachedObjectsBlocked      
      eventVersion: 1.0.0      
      notes: shshhs      
      filter:        
        domain:         
          - sss
```

#### 权限配置相关

##### 子账号权限

###### 最大权限

`AliyunFCFullAccess`、`AliyunCDNFullAccess`

###### 最小权限

```json
{
    "Version":"1",
    "Statement":[
        {
            "Action":[
                "fc:GetTrigger",
                "fc:CreateTrigger",
                "fc:UpdateTrigger",
                "fc:DeleteTrigger"
            ],
            "Effect":"Allow",
            "Resource":"acs:fc:<region>:<account-id>:services/*/functions/*/triggers/*"
        },
        {
            "Action":"ram:PassRole",
            "Effect":"Allow",
            "Resource":"*"
        },
        {
            "Effect":"Allow",
            "Action":[
                "cdn:UpdateFCTrigger",
                "cdn:DeleteFCTrigger",
                "cdn:DescribeFCTrigger",
                "cdn:AddFCTrigger"
            ],
            "Resource":"*"
        }
    ]
}
```

##### 触发器角色权限

```json
{
    "Version":"1",
    "Statement":[
        {
            "Action":[
                "fc:InvokeFunction"
            ],
            "Resource":"*",
            "Effect":"Allow"
        }
    ]
}
```

#### filter

| 参数名 | 必填 | 类型         | 参数描述         |
| ------ | ---- | ------------ | ---------------- |
| domain | True | List\<String\> | 过滤参数值的集合 |

### Tablestore 触发器

| 参数名       | 必填 | 类型         | 参数描述           |
| ------------ | ---- | ------------ | ------------------ |
| instanceName | True | String | 表格存储实例的名称 |
| tableName    | True | String | 实例中的表名称     |

参考案例：

```yaml
triggers:  
  - name: ots    
    sourceArn: acs:ots:<region>:<account-id>:instance/<instance>/table/<table>    
    type: tablestore    
    role: acs:ram::<account-id>:role/AliyunTableStoreStreamNotificationRole    
    # qualifier: 1 
    # LATEST    
    config: 
      instanceName: xxx
      tableName: xxx
```

#### 权限配置相关

##### 子账号需要的函数权限

###### 最大权限

`AliyunFCFullAccess`、`AliyunOTSFullAccess`

###### 最小权限

```json
{
    "Version":"1",
    "Statement":[
        {
            "Action":[
                "fc:GetTrigger",
                "fc:CreateTrigger",
                "fc:UpdateTrigger",
                "fc:DeleteTrigger"
            ],
            "Effect":"Allow",
            "Resource":"acs:fc:<region>:<account-id>:services/*/functions/*/triggers/*"
        },
        {
            "Action":"ram:PassRole",
            "Effect":"Allow",
            "Resource":"*"
        },
        {
            "Effect":"Allow",
            "Action":[
                "ots:GetTrigger",
                "ots:UpdateTrigger",
                "ots:CreateTrigger",
                "ots:DeleteTrigger"
            ],
            "Resource":"*"
        }
    ]
}
```

##### 触发器角色权限

```json
{
    "Version":"1",
    "Statement":[
        {
            "Action":[
                "ots:BatchGet*",
                "ots:Describe*",
                "ots:Get*",
                "ots:List*"
            ],
            "Resource":"*",
            "Effect":"Allow"
        },
        {
            "Action":[
                "fc:InvokeFunction"
            ],
            "Resource":"*",
            "Effect":"Allow"
        }
    ]
}
```

### EventBridge触发器

| 参数名                                  | 必填 | 类型                         | 参数描述                                                   |
| --------------------------------------- | ---- | ---------------------------- | ---------------------------------------------------------- |
| triggerEnable               | False | Boolean       | 触发器禁用开关。等同于 EventBridge 侧对应事件规则的[禁用开关](https://help.aliyun.com/document_detail/163710.html#section-bnw-ofn-u8d)                                                   |
| asyncInvocationType                 | False | Boolean         | 触发器调用函数的方式。目前支持同步调用以及异步调用                                                    |
| [eventSourceConfig](#eventSourceConfig)           | True | [Struct](#eventSourceConfig)      | 事件源配置                                                 |
| eventRuleFilterPattern | True | String | 事件模式。JSON 格式，详细规则可以参考 [EventBridge 事件模式官方文档](https://help.aliyun.com/document_detail/181432.html) |

参考案例：

```yaml
triggers:  
  - name: eventbridgeTriggerWithDefaultSource    
    # sourceArn: acs:eventbridge:<region>:<accountID>:eventbus/<eventBusName>/rule/<eventRuleName>    
    type: eventbridge        
    # qualifier: LATEST    
    config:      
      triggerEnable: true
      asyncInvocationType: false
      eventRuleFilterPattern: '{"source":["acs.oss"],"type":["oss:BucketCreated:PutBucket"]}'
      eventSourceConfig:
        eventSourceType: Default
  - name: eventbridgeTriggerWithMNSSource    
    # sourceArn: acs:eventbridge:<region>:<accountID>:eventbus/<eventBusName>/rule/<eventRuleName>    
    type: eventbridge        
    # qualifier: LATEST    
    config:      
      triggerEnable: true
      asyncInvocationType: false
      eventRuleFilterPattern: '{"source":["MNS-${functionName}-eventbridgeTriggerWithMNSSource"]}'
      eventSourceConfig:
        eventSourceType: MNS
        eventSourceParameters:
          sourceMNSParameters:
            QueueName: gjl-test
            IsBase64Decode: false
  - name: eventbridgeTriggerWithRocketMQSource    
    # sourceArn: acs:eventbridge:<region>:<accountID>:eventbus/<eventBusName>/rule/<eventRuleName>    
    type: eventbridge        
    # qualifier: LATEST    
    config:      
      triggerEnable: true
      asyncInvocationType: false
      eventRuleFilterPattern: '{"source":["RocketMQ-${functionName}-eventbridgeTriggerWithRocketMQSource"]}'
      eventSourceConfig:
        eventSourceType: RocketMQ
        eventSourceParameters:
          sourceRocketMQParameters:
            RegionId: cn-hangzhou
            InstanceId: MQ_INST_164901546557****_BAAN****   
            GroupID: GID_group1    
            Topic: mytopic    
            Timestamp: 1636597951984
  - name: eventbridgeTriggerWithRabbitMQSource    
    # sourceArn: acs:eventbridge:<region>:<accountID>:eventbus/<eventBusName>/rule/<eventRuleName>    
    type: eventbridge        
    # qualifier: LATEST    
    config:      
      triggerEnable: true
      asyncInvocationType: false
      eventRuleFilterPattern: '{"source":["RabbitMQ-${functionName}-eventbridgeTriggerWithRabbitMQSource"]}'
      eventSourceConfig:
        eventSourceType: RabbitMQ
        eventSourceParameters:
          sourceRabbitMQParameters:
            RegionId: cn-hangzhou
            InstanceId: amqp-cn-******   
            QueueName: test-queue    
            VirtualHostName: test-virtual
```

#### 权限配置相关

##### 子账号权限

###### 最大权限

`AliyunFCFullAccess`、`AliyunEventBridgeFullAccess`

###### 操作最小权限

```json
{
    "Version":"1",
    "Statement":[
        {
            "Action":[
                "fc:GetTrigger",
                "fc:CreateTrigger",
                "fc:UpdateTrigger",
                "fc:DeleteTrigger"
            ],
            "Effect":"Allow",
            "Resource":"acs:fc:<region>:<account-id>:services/*/functions/*/triggers/*"
        },
        {
            "Action":"ram:PassRole",
            "Effect":"Allow",
            "Resource":"*"
        },
        {
            "Action":[
                "eventbridge:CreateEventBus",
                "eventbridge:GetEventBus",
                "eventbridge:DeleteEventBus",
                "eventbridge:CreateRule",
                "eventbridge:GetRule",
                "eventbridge:UpdateRule",
                "eventbridge:EnableRule",
                "eventbridge:DisableRule",
                "eventbridge:DeleteRule",
                "eventbridge:ListRules",
                "eventbridge:UpdateTargets",
                "eventbridge:DeleteTargets",
                "eventbridge:ListTargets"
            ],
            "Effect":"Allow",
            "Resource":"*"
        }
    ]
}
```

##### 触发器角色权限
EventBridge 触发器创建时无需指定 role，但是需要在开通 [EventBridge](https://eventbridge.console.aliyun.com) 产品后，进行 SLR 授权，授权方式有如下两种：

- 在控制台点击授权
- 通过 terraform 进行授权，terraform 授权代码如下所示：
```
provider "alicloud" {
  access_key = "${alicloud_access_key}"
  secret_key = "${aliclou_secret_key}"
  region     = "cn-hangzhou"
}


resource "alicloud_event_bridge_service_linked_role" "service_linked_role" {
  product_name = "AliyunServiceRoleForEventBridgeSendToFC"
}
```

#### eventSourceConfig

| 参数名                                  | 必填 | 类型                         | 参数描述                                                   |
| --------------------------------------- | ---- | ---------------------------- | ---------------------------------------------------------- |
| eventSourceType               | True | String       | 触发器事件源类型，目前支持如下四种触发源：<br> 1. Default：表示 EventBridge 官方触发源<br> 2. MNS：消息队列 MNS 队列作为触发源<br> 3. RocketMQ：消息队列 RockerMQ 作为触发源<br> 4. RabbitMQ：消息队列 RabbitMQ 作为触发源<br><br>注：该字段不可更新，更新时传入该字段将被忽略                                                   |
| [eventSourceParameters](#eventSourceParameters)           | False | [Struct](#eventSourceParameters)      | 自定义事件源参数，自定义事件源包括：MNS，RocketMQ，RabbitMQ                                                 |

#### eventSourceParameters

| 参数名                                  | 必填 | 类型                         | 参数描述                                                   |
| --------------------------------------- | ---- | ---------------------------- | ---------------------------------------------------------- |
| [sourceMNSParameters](#sourceMNSParameters)           | False | [Struct](#sourceMNSParameters)      | 事件源为消息服务 MNS 时的自定义参数配置                                                 |
| [sourceRocketMQParameters](#sourceRocketMQParameters)           | False | [Struct](#sourceRocketMQParameters)      | 事件源为消息服务 RockerMQ 时的自定义参数配置                                                 |
| [sourceRabbitMQParameters](#sourceRabbitMQParameters)           | False | [Struct](#sourceRabbitMQParameters)      | 事件源为消息服务 RabbitMQ 时的自定义参数配置                                                 |

#### sourceMNSParameters

| 参数名                                  | 必填 | 类型                         | 参数描述                                                   |
| --------------------------------------- | ---- | ---------------------------- | ---------------------------------------------------------- |
| RegionId           | False | String      | 消息服务 MNS Queue 所属地域                                                 |
| QueueName           | True | String      | 消息服务MNS的Queue的名称                                                 |
| IsBase64Decode           | False | Boolean      | 是否开启Base64编码。默认为true                                                 |

#### sourceRocketMQParameters

| 参数名                                  | 必填 | 类型                         | 参数描述                                                   |
| --------------------------------------- | ---- | ---------------------------- | ---------------------------------------------------------- |
| RegionId           | False | String      | 消息队列RocketMQ版的实例所属地域                                                 |
| InstanceId           | True | String      | 消息队列RocketMQ版的实例ID。更多信息，请参见[使用限制](https://help.aliyun.com/document_detail/85006.htm?spm=a2c4g.11186623.0.0.31b96401luYFDO#concept-2047059)                                                 |
| Topic           | True | String      | 消息队列RocketMQ版实例的Topic名称。更多信息，请参见[使用限制](https://help.aliyun.com/document_detail/85006.htm#concept-2047059)                                                 |
| Tag           | False | String      | 消息的过滤标签                                                 |
| Offset           | False | String      | 消息的消费位点。取值说明如下：<br>1. CONSUME_FROM_LAST_OFFSET：从最新位点开始消费。<br>2. CONSUME_FROM_FIRST_OFFSET：从最早位点开始消费。<br>3. CONSUME_FROM_TIMESTAMP：从指定时间点的位点开始消费。<br><br>默认值:CONSUME_FROM_LAST_OFFSET                                                 |
| Timestamp           | False | Number      | 时间戳。仅当参数Offset取值为CONSUME_FROM_TIMESTAMP时，该参数有效                                                 |
| GroupID           | True | String      | 消息队列RocketMQ版的Group ID                                                 |

#### sourceRabbitMQParameters

| 参数名                                  | 必填 | 类型                         | 参数描述                                                   |
| --------------------------------------- | ---- | ---------------------------- | ---------------------------------------------------------- |
| RegionId           | False | String      | 消息服务 MNS Queue 所属地域                                                 |
| InstanceId           | True | String      | 消息队列RabbitMQ版的实例的ID。更多信息，请参见[使用限制](https://help.aliyun.com/document_detail/101627.htm#concept-101627-zh)                                                 |
| VirtualHostName           | True | String      | 消息队列RabbitMQ版实例的Vhost的名称。更多信息，请参见[使用限制](https://help.aliyun.com/document_detail/101627.htm#concept-101627-zh)                                                 |
| QueueName           | True | String      | 消息队列RabbitMQ版实例的Queue的名称。更多信息，请参见[使用限制](https://help.aliyun.com/document_detail/101627.htm#concept-101627-zh)                                                 |