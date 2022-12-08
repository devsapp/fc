---
title: triggers field
description: 'triggers field'
position: 4
category: 'Yaml-Spec'
---

## triggers field

| Parameter Name | Required | Type   | Parameter Description                                                                                                                                                                                                                            |
| -------------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name           | True     | String | trigger name                                                                                                                                                                                                                                     |
| type           | True     | Enum   | trigger type                                                                                                                                                                                                                                     |
| role           | False    | String | Use the ARN of a RAM role to specify the execution role for the function, the event source will use this role to trigger the function execution, please ensure that the role has the permission to call the function                             |
| sourceArn      | False    | String | ARN of the trigger event source                                                                                                                                                                                                                  |
| qualifier      | False    | String | Version or alias of trigger function, default `LATEST`                                                                                                                                                                                           |
| config         | True     | Struct | Trigger configuration, including [OSS trigger](#OSS trigger), [Log trigger](#Log-trigger), [Log trigger](#Log-trigger), [Timer trigger](#Timer trigger), [Http trigger](#Http trigger), [MNS trigger](#MNS trigger), [CDN trigger](#CDN trigger) |

type currently supports: `http`, `timer`, `oss`, `log`, `mns_topic`, `cdn_events`, `tablestore`

### OSS triggers

| Parameter Name    | Required | Type              | Parameter Description                                                                                                                                            |
| ----------------- | -------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| bucketName        | True     | String            | Target bucket name in OSS                                                                                                                                        |
| events            | True     | List\<String\>    | The list of events that trigger the function execution on the OSS side, Document: https://www.alibabacloud.com/help/en/doc-detail/62922.html#section-mf3-l4l-1nf |
| [filter](#filter) | True     | [Struct](#filter) | Trigger condition                                                                                                                                                |

Examples:

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

#### Permission configuration related

##### Sub-account permissions

###### Maximum permissions

`AliyunFCFullAccess`, `AliyunOSSFullAccess`

###### Operating minimum permissions

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": ["fc:GetTrigger", "fc:CreateTrigger", "fc:UpdateTrigger", "fc:DeleteTrigger"],
      "Effect": "Allow",
      "Resource": "acs:fc:<region>:<account-id>:services/*/functions/*/triggers/*"
    },
    {
      "Action": "ram:PassRole",
      "Effect": "Allow",
      "Resource": "*"
    },
    {
      "Action": [
        "oss:ListBucket",
        "oss:GetBucketEventNotification",
        "oss:PutBucketEventNotification",
        "oss:DeleteBucketEventNotification"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
```

##### Trigger role permissions

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": ["fc:InvokeFunction"],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
```

#### filter

| Parameter Name | Required | Type          | Parameter Description |
| -------------- | -------- | ------------- | --------------------- |
| Key            | False    | [Struct](Key) | key value             |

##### Key

| Parameter Name | Required | Type   | Parameter Description |
| -------------- | -------- | ------ | --------------------- |
| Prefix         | False    | String | Prefix                |
| Suffix         | False    | String | Suffix                |

### Log trigger

| Parameter Name                          | Required | Type                         | Parameter Description                                                                                                   |
| --------------------------------------- | -------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [logConfig](#logConfig-1)               | True     | [Struct](#logConfig-1)       | Log Configuration                                                                                                       |
| [jobConfig](#jobConfig)                 | True     | [Struct](#jobConfig)         | job configuration                                                                                                       |
| [sourceConfig](#sourceConfig)           | True     | [Struct](#sourceConfig)      | source configuration                                                                                                    |
| [functionParameter](#functionParameter) | True     | [Struct](#functionParameter) | This parameter will be passed into the function as the Parameter of the function Event. The default value is empty ({}) |
| enable                                  | True     | Boolean                      | Trigger switch                                                                                                          |

References:

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

#### Permission configuration related

##### Sub-account permissions

###### Maximum permissions

`AliyunFCFullAccess`, `AliyunLogFullAccess`

###### Operating minimum permissions

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": ["fc:GetTrigger", "fc:CreateTrigger", "fc:UpdateTrigger", "fc:DeleteTrigger"],
      "Effect": "Allow",
      "Resource": "acs:fc:<region>:<account-id>:services/*/functions/*/triggers/*"
    },
    {
      "Action": "ram:PassRole",
      "Effect": "Allow",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": ["log:GetEtlJob", "log:UpdateEtlJob", "log:CreateEtlJob", "log:DeleteEtlJob"],
      "Resource": "*"
    }
  ]
}
```

##### Trigger role permissions

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": ["fc:InvokeFunction"],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Action": [
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
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
```

#### logConfig

| Parameter Name | Required | Type   | Parameter Description                                                                                                               |
| -------------- | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| project        | False    | String | Log project name                                                                                                                    |
| logstore       | False    | String | The name of the log store, the log of the function execution process triggered by the log service will be recorded in the log store |

#### jobConfig

| Parameter Name  | Required | Type   | Parameter Description                                                                                                                                      |
| --------------- | -------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| maxRetryTime    | False    | String | Indicates the maximum number of attempts allowed if an error is encountered when the log service triggers the function execution, the value range: [0,100] |
| triggerInterval | False    | String | The time interval at which the log service triggers the function to run, value range: [3,600], unit: second                                                |

#### sourceConfig

| Parameter Name | Required | Type   | Parameter Description                                                                                         |
| -------------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------- |
| logstore       | False    | String | The trigger will periodically subscribe data from the log store to the function service for custom processing |

#### functionParameter

Object format, for example:

```
TempKey: tempValue
```

### Timer trigger

| Parameter Name | Required | Type    | Parameter Description                                                   |
| -------------- | -------- | ------- | ----------------------------------------------------------------------- |
| cronExpression | True     | String  | Time trigger expression, supports two settings: @every, cron expression |
| enable         | True     | Boolean | Whether to enable this trigger                                          |
| payload        | False    | String  | Represents the input content of the trigger event itself                |

References:

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

#### Permission configuration related

##### Function permissions required by the sub-account

###### Maximum permissions

`AliyunFCFullAccess`

###### Least privilege

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": ["fc:GetTrigger", "fc:CreateTrigger", "fc:DeleteTrigger", "fc:UpdateTrigger"],
      "Effect": "Allow",
      "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>/functions/<functionName>/triggers/<triggerName>"
    }
  ]
}
```

### Http trigger

| Parameter Name | Required | Type           | Parameter Description                                                                           |
| -------------- | -------- | -------------- | ----------------------------------------------------------------------------------------------- |
| authType       | True     | String         | Authentication type, optional values: anonymous, function                                       |
| methods        | True     | List\<String\> | Access methods supported by HTTP triggers, optional values: GET, POST, PUT, DELETE, PATCH, HEAD |

Examples：

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

#### Permission configuration related

##### Function permissions required by the sub-account

###### Maximum permissions

`AliyunFCFullAccess`

###### Least privilege

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": ["fc:GetTrigger", "fc:CreateTrigger", "fc:DeleteTrigger", "fc:UpdateTrigger"],
      "Effect": "Allow",
      "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>/functions/<functionName>/triggers/<triggerName>"
    }
  ]
}
```

### MNS Triggers

| Parameter Name      | Required | Type   | Parameter Description                                                                                                                                                                                                                                |
| ------------------- | -------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| topicName           | True     | String | mns topic name                                                                                                                                                                                                                                       |
| region              | False    | List   | The region where the mns topic is located, if not filled, the default is the same region as the function                                                                                                                                             |
| notifyContentFormat | False    | String | The format of the input parameter event pushed to the function, optional values: STREAM, JSON                                                                                                                                                        |
| notifyStrategy      | False    | String | Retry strategy for calling the function, optional values: BACKOFF_RETRY, EXPONENTIAL_DECAY_RETRY                                                                                                                                                     |
| filterTag           | False    | String | Describes the tag of message filtering in this subscription (only messages with the same tag will be pushed), a string of no more than 16 characters, message filtering is not performed by default, that is, this field is not filled in by default |

References:

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

#### Permission configuration related

##### Function permissions required by the sub-account

###### Maximum permissions

`AliyunFCFullAccess`, `AliyunMNSFullAccess`

###### Operating minimum permissions

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": ["fc:GetTrigger", "fc:CreateTrigger", "fc:UpdateTrigger", "fc:DeleteTrigger"],
      "Effect": "Allow",
      "Resource": "acs:fc:<region>:<account-id>:services/*/functions/*/triggers/*"
    },
    {
      "Action": "ram:PassRole",
      "Effect": "Allow",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": ["mns:Subscribe", "mns:Unsubscribe"],
      "Resource": "*"
    }
  ]
}
```

##### Trigger role permissions

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": ["fc:InvokeFunction"],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
```

### CDN Triggers

| Parameter Name      | Required | Type                | Parameter Description                                                                                      |
| ------------------- | -------- | ------------------- | ---------------------------------------------------------------------------------------------------------- |
| eventName           | True     | String              | The event that triggers function execution on the CDN side, once created, cannot be changed                |
| eventVersion        | True     | String              | The version that triggers the function execution event on the CDN side, once created, it cannot be changed |
| notes               | True     | String              | Notes information                                                                                          |
| [filter](#filter-1) | True     | [Struct](#filter-1) | Filter (requires at least one filter)                                                                      |

References:

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

#### Permission configuration related

##### Sub-account permissions

###### Maximum permissions

`AliyunFCFullAccess`, `AliyunCDNFullAccess`

###### Operating minimum permissions

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": ["fc:GetTrigger", "fc:CreateTrigger", "fc:UpdateTrigger", "fc:DeleteTrigger"],
      "Effect": "Allow",
      "Resource": "acs:fc:<region>:<account-id>:services/*/functions/*/triggers/*"
    },
    {
      "Action": "ram:PassRole",
      "Effect": "Allow",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "cdn:UpdateFCTrigger",
        "cdn:DeleteFCTrigger",
        "cdn:DescribeFCTrigger",
        "cdn:AddFCTrigger"
      ],
      "Resource": "*"
    }
  ]
}
```

##### Trigger role permissions

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": ["fc:InvokeFunction"],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
```

#### filter

| Parameter Name | Required | Type           | Parameter Description                 |
| -------------- | -------- | -------------- | ------------------------------------- |
| domain         | True     | List\<String\> | Collection of filter parameter values |

### Tablestore triggers

| Parameter Name | Required | Type   | Parameter Description           |
| -------------- | -------- | ------ | ------------------------------- |
| instanceName   | True     | String | Name of the Tablestore instance |
| tableName      | True     | String | table name in instance          |

References:

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

#### Permission configuration related

##### Function permissions required by the sub-account

###### Maximum permissions

`AliyunFCFullAccess`, `AliyunOTSFullAccess`

###### Operating minimum permissions

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": ["fc:GetTrigger", "fc:CreateTrigger", "fc:UpdateTrigger", "fc:DeleteTrigger"],
      "Effect": "Allow",
      "Resource": "acs:fc:<region>:<account-id>:services/*/functions/*/triggers/*"
    },
    {
      "Action": "ram:PassRole",
      "Effect": "Allow",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": ["ots:GetTrigger", "ots:UpdateTrigger", "ots:CreateTrigger", "ots:DeleteTrigger"],
      "Resource": "*"
    }
  ]
}
```

##### Trigger role permissions

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": ["ots:BatchGet*", "ots:Describe*", "ots:Get*", "ots:List*"],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Action": ["fc:InvokeFunction"],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
```
