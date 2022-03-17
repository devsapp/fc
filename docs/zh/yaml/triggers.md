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
| config    | True  | Struct | 触发器配置，包括[OSS触发器](#OSS触发器), [Log触发器](#Log触发器), [Log触发器](#Log触发器), [Timer触发器](#Timer触发器), [Http触发器](#Http触发器), [MNS触发器](#MNS触发器), [CDN触发器](#CDN触发器) |

type目前支持：`http`, `timer`, `oss`, `log`, `mns_topic`, `cdn_events`, `tablestore`

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
    sourceArn: acs:oss:acs:log:<region>:<account-id>:<buckctName>    
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

### CDN 触发器

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
