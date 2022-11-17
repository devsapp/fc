---
title: service字段
description: 'service字段'
position: 2
category: 'Yaml规范'
---

## service字段
| 参数名                            | 必填  | 类型                                          | 参数描述                                                     |
| --------------------------------- | ----- | ----------------------------------------------| ------------------------------------------------------------ |
| name                              | True  | String                                        | service名称                                                  |
| description                       | False | String                                        | Service的简短描述                                            |
| internetAccess                    | False | Boolean                                       | 设为true让function可以访问公网                               |
| [tracingConfig](#tracingConfig)   | False | String                                        | 链路追踪，可取值：Enable、Disable                            |
| [role](#role)                     | False | String[简单配置]/[Struct[详细配置]](#role)    | 授予函数计算所需权限的RAM role, 使用场景包含 1. 把 function产生的 log 发送到用户的 logstore 中 2. 为function 在执行中访问其它云资源生成 token |
| [logConfig](#logconfig)           | False | Enum[简单配置]/[Struct[详细配置]](#logconfig) | log配置，function产生的log会写入这里配置的logstore           |
| [vpcConfig](#vpcconfig)           | False | Enum[简单配置]/[Struct[详细配置]](#vpcconfig) | VPC配置, 配置后function可以访问指定VPC                       |
| [nasConfig](#nasconfig)           | False | Enum[简单配置]/[Struct[详细配置]](#nasconfig) | NAS配置, 配置后function可以访问指定NAS                       |
| [ossMountConfig](#ossmountconfig) | False | [Struct[详细配置]](#ossmountconfig)           | OSS挂载配置, 配置后function可以访问指定OSS bucket            |
| vpcBinding                        | False | List\<String\>                                | 仅允许函数被指定的VPC访问 [文档](https://help.aliyun.com/document_detail/72959.html) |


参考案例：

```yaml
service:
    name: unit-deploy-service
    description: 'demo for fc-deploy component'
    internetAccess: true
```


### 权限配置相关

#### 子账号需要的权限

##### 最大权限

系统策略：AliyunFCFullAccess

##### 部署最小权限

**自定义策略**

⚠️ `fc:GetService` 的权限默认可以选填。

```json
{
	"Version": "1",
        "Statement": [
        {
            "Action": "fc:CreateService",
            "Resource": "acs:fc:<region>:<account-id>:services/*",
            "Effect": "Allow"
        },
        {
            "Action": "fc:UpdateService",
            "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>",
            "Effect": "Allow"
        },
        {
            "Action": "fc:GetService",
            "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>",
            "Effect": "Allow"
        }
    ]
}
```

##### 删除最小权限

**自定义策略**

```json
{
    "Version": "1",
    "Statement": [
        {
            "Action": "fc:DeleteService",
            "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>",
            "Effect": "Allow"
        }
    ]
}
```

### role

当`role`参数为字符串时，可以是：`acs:ram::xxx:role/AliyunFcDefaultRole`

当`role`参数为结构时，可以参考：

| 参数名                | 必填 | 类型                      | 参数描述 |
| --------------------- | ---- | ------------------------- | -------- |
| name                  | True | String                    | 角色名   |
| [policies](#policies) | True | [List\<Struct>](#policies) | 策略列表 |

参考案例：

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

#### 权限配置相关

##### 子账号需要权限

###### 最大权限

**系统策略**：`AliyunFCFullAccess`、`AliyunRAMFullAccess`

###### 更细度的策略

```json
{
    "Statement": [
        {
          "Action": [
            "ram:PassRole",
            "ram:GetRole",
            "ram:CreateRole",
            "ram:ListPoliciesForRole",
            "ram:AttachPolicyToRole",
            "ram:GetPolicy",
            "ram:CreatePolicy",
            "ram:ListPolicyVersions",
            "ram:CreatePolicyVersion",
            "ram:DeletePolicyVersion"
          ],
          "Effect": "Allow",
          "Resource": "*"
        }
    ],
    "Version": "1"
}
```

#### policies

其中 `policies` 表示策略列表，当使用了这个字段，需要本地配置的 ak 具有创建 policy 和 role 的权限，列表中的元素支持字符串和 `policy` 结构体，该结构体可以参考:

| 参数名      | 必填  | 类型                       | 参数描述     |
| ----------- | ----- | -------------------------- | ------------ |
| name        | True  | String                     | 策略名称     |
| description | False | String                     | 策略描述     |
| statement   | True  | [List\<Struct>](#statement) | 策略内容列表 |

#### statement

其中 `statement` 表示策略内容列表，列表中元素的结构体可以参考：

| 参数名    | 必填  | 类型                | 参数描述                             |
| --------- | ----- | ------------------- | ------------------------------------ |
| Effect    | True  | String              | 策略效果，可选值有 'Allow' 和 'Deny' |
| Action    | True  | List\<String\>        | 策略动作                             |
| Resource  | True  | String/List\<String\> | 策略的目标资源                       |
| Condition | False | Object              | 策略的条件限制                       |

### logConfig

当`logConfig`参数为简单配置时，可以是：`auto`。在部署阶段会先检测线上是否存在 logConfig 的配置，如果存在则直接复用线上配置，如果不存在则按照以下规则复用或者创建日志资源：
- 日志服务中的project名称为 `${accountID}-${region}-logproject`
- 日志服务中的logstore名称规则是：如果服务名称长度小于20则为 `fc-service-${serviceName}-logstore.toLocaleLowerCase()`；如果长度大于20则截取服务名称的前6位作为前缀，然后根据服务名称生成一些随机串

当`logConfig`参数为结构时，可以参考：

| 参数名                | 必填  | 类型    | 参数描述                                 |
| --------------------- | ----- | ------- | ---------------------------------------- |
| logstore              | True | String  | loghub中的logstore名称                   |
| project               | True | String  | loghub中的project名称                    |
| enableRequestMetrics  | False | Boolean | RequestMetrics开关，取值`true`/`false`   |
| enableInstanceMetrics | False | Boolean | InstanceMetrics开关，取值`true`/`false`  |
| logBeginRule          | False | String  | 日志是否切分，取值 `DefaultRegex`/`None` |

参考案例：

```yaml
service:
    name: unit-deploy-service
    description: 'demo for fc-deploy component'
    internetAccess: true
        role: <role-arn> # role 为已配置好的，配置内容参考服务角色权限
    # logConfig: auto
    logConfig:
        project: XXX
        logstore: XXX
```


#### 权限配置相关

##### 子账号需要的权限

###### 最大权限

系统策略：`AliyunFCFullAccess`、`AliyunLogFullAccess`

###### 部署最小权限

- 当 `logConfig` 不为 `auto` 

**自定义策略**

```json
{
    "Statement": [
        {
            "Action": "ram:PassRole",
            "Effect": "Allow",
            "Resource": "*"
        }
    ],
    "Version": "1"
}
```

- 当 `logConfg` 为 `auto`

**自定义策略**

```json
{
    "Version":"1",
    "Statement":[
        {
            "Action":"ram:PassRole",
            "Effect":"Allow",
            "Resource":"*"
        },
        {
            "Action":[
                "log:GetProject",
                "log:CreateProject"
            ],
            "Resource":"acs:log:<region>:<account-id>:project/<project-name>",
            "Effect":"Allow"
        },
        {
            "Action":[
                "log:CreateLogStore",
                "log:GetIndex",
                "log:GetLogStore",
                "log:CreateIndex"
            ],
            "Resource":"acs:log:<region>:<account-id>:project/<project-name>/logstore/<logstore-name>",
            "Effect":"Allow"
        }
    ]
}
```

##### 服务角色权限

###### 最大权限

**系统策略**：`AliyunLogFullAccess`


###### 最小权限

**自定义策略**

```json
{
    "Version":"1",
    "Statement":[
        {
            "Action":"log:PostLogStoreLogs",
            "Resource":"acs:log:<region>:<account-id>:project/<projectName>/logstore/<logstoreName>",
            "Effect":"Allow"
        }
    ]
}
```

### vpcConfig

当`vpcConfig`参数为简单配置是，可以是：`auto`。在部署阶段会先检测线上是否存在 vpcConfig 的配置，如果存在则直接复用，如果不存在则尝试按照以下规则复用或者创建资源：
- vpcId 的名称是 `fc-deploy-component-generated-vpc-${this.region}`，当如果存在多个符合规则的 vpc，会复用第一个返回值。在创建时 cidrBlock 固定为 `10.0.0.0/8`。
- vswitch 的名称是 `fc-deploy-component-generated-vswitch-${this.region}`，当如果存在多个符合规则的 vswitch，会复用第一个返回值。
- securityGroup 的名称是 `fc-deploy-component-generated-securityGroup-${this.region}`，当如果存在多个符合规则的 securityGroup，会复用第一个返回值。

当`vpcConfig`参数为结构时，可以参考：

| 参数名          | 必填  | 类型         | 参数描述       |
| --------------- | ----- | ------------ | -------------- |
| securityGroupId | True | String       | 安全组ID       |
| vswitchIds      | True | List\<String\> | 交换机 ID 列表 |
| vpcId           | True | String       | VPC ID         |


参考案例：

```yaml
service:    
  name: unit-deploy-service    
  description: 'demo for fc-deploy component'    
  internetAccess: true        
  role: <role-arn> # role 为已配置好的，配置内容参考服务角色权限    
  # vpcConfig: auto    
  vpcConfig:      
    vpcId: xxx      
    securityGroupId: xxx      
    vswitchIds:        
      - vsw-xxx
```

#### 权限配置相关

##### 子账号需要的权限

###### 最大权限

**系统策略**：`AliyunFCFullAccess`、`AliyunVPCFullAccess`、`AliyunECSFullAccess`

###### 部署最小权限 **<**[**服务权限参考**](#子账号需要的权限)**>**

- 当 `vpcConfig` 不为 `auto`

**自定义策略**

```json
{
    "Statement":[
        {
            "Action":"ram:PassRole",
            "Effect":"Allow",
            "Resource":"*"
        }
    ],
    "Version":"1"
}
```

- 当 `vpcConfig` 为 `auto`

**系统策略**：`AliyunVPCReadOnlyAccess`

**自定义策略**

```json
{
    "Statement":[
        {
            "Action":"ram:PassRole",
            "Effect":"Allow",
            "Resource":"*"
        },
        {
            "Action":"fc:GetAccountSettings",
            "Effect":"Allow",
            "Resource":"acs:fc:<region>:<account-id>:account-settings"
        },
        {
            "Action":[
                "vpc:CreateVpc",
                "vpc:CreateVSwitch",
                "ecs:AuthorizeSecurityGroup",
                "ecs:DescribeSecurityGroups",
                "ecs:CreateSecurityGroup"
            ],
            "Effect":"Allow",
            "Resource":"*"
        }
    ],
    "Version":"1"
}
```

##### 服务角色权限

**系统策略**：`AliyunECSNetworkInterfaceManagementAccess`

### nasConfig

当`nasConfig`参数为简单配置是，可以是：`auto`。在部署阶段规则如下：
会先检测服务在线上是否存在 nasConfig 的配置，如果存在配置则验证挂载点是否已经被删除，如果存在直接复用线上配置；如果不存在则再创建一个新的挂载点。

当`nasConfig`参数为结构时，可以参考：

| 参数名                      | 必填  | 类型                                     | 参数描述             |
| --------------------------- | ----- | ---------------------------------------- | -------------------- |
| [mountPoints](#mountPoints) | True | [List\<Struct>[多目录配置]](#mountPoints) | 目录配置             |
| userId                      | False | String                                   | userID, 默认为10003  |
| groupId                     | False | String                                   | groupID, 默认为10003 |

参考案例：

```yaml
service:    
  name: unit-deploy-service    
  description: 'demo for fc-deploy component'    
  internetAccess: true        
  role: <role-arn> # role 为已配置好的，配置内容参考服务角色权限    
  vpcConfig:      
    vpcId: xxx     
    securityGroupId: xxx      
    vswitchIds:        
      - vsw-xxx    
  nasConfig:      
    userId: 10003      
    groupId: 10003      
    mountPoints:        
      - serverAddr: xxx-xxx.cn-shenzhen.nas.aliyuncs.com          
        nasDir: /unit-deploy-service          
        fcDir: /mnt/auto
```

#### 权限配置相关

##### 子账号需要的权限

###### 最大权限

**系统策略**：`AliyunFCFullAccess`、`AliyunVPCFullAccess`、`AliyunNasFullAccess`


###### 部署最小权限

- 当 `nasConfig` 不为 `auto`

**自定义策略**

```json
{
    "Statement":[
        {
            "Action":"ram:PassRole",
            "Effect":"Allow",
            "Resource":"*"
        }
    ],
    "Version":"1"
}
```

- 当 `nasConfig` 为 `auto`

**系统策略**：`AliyunNasReadOnlyAccess`

**自定义策略**

```json
{
    "Statement":[
        {
            "Action":"fc:GetAccountSettings",
            "Effect":"Allow",
            "Resource":"acs:fc:<region>:<account-id>:account-settings"
        },
        {
            "Action":[
                "fc:UpdateService",
                "fc:CreateService"
            ],
            "Effect":"Allow",
            "Resource":"acs:fc:<region>:<account-id>:services/*"
        },
        {
            "Action":[
                "fc:InvokeFunction",
                "fc:CreateFunction",
                "fc:UpdateFunction"
            ],
            "Effect":"Allow",
            "Resource":"acs:fc:<region>:<account-id>:services/*/functions/*"
        },
        {
            "Action":[
                "fc:UpdateTrigger",
                "fc:CreateTrigger"
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
                "nas:CreateMountTarget",
                "nas:DescribeMountTargets",
                "nas:DescribeFileSystems",
                "nas:CreateFileSystem",
                "vpc:DescribeVSwitchAttributes"
            ],
            "Effect":"Allow",
            "Resource":"*"
        }
    ],
    "Version":"1"
}
```

##### 服务角色权限

**系统策略**：`AliyunECSNetworkInterfaceManagementAccess`


#### mountPoints

| 参数名     | 必填  | 类型   | 参数描述       |
| ---------- | ----- | ------ | -------------- |
| serverAddr | True | String | NAS 服务器地址 |
| nasDir     | True | String | NAS目录        |
| fcDir      | True | String | 函数计算目录   |

### ossMountConfig

当`ossMountConfig`参数为结构时，可以参考：

| 参数名                         | 必填  | 类型                                        | 参数描述             |
| ------------------------------ | ----- | ------------------------------------------- | -------------------- |
| [mountPoints](#ossMountPoints) | True | [List\<Struct>[多目录配置]](#ossMountPoints) | 目录配置             |

参考案例：

```yaml
service:
  name: unit-deploy-service
  description: 'demo for fc-deploy component'
  internetAccess: true
  role: <role-arn> # role 为已配置好的，配置内容参考服务角色权限
  ossMountConfig:
    mountPoints:
      - endpoint: http://oss-cn-shanghai-internal.aliyuncs.com
        bucketName: example-bucket0
        mountDir: /mnt/example-bucket0
      - endpoint: https://oss-cn-beijing.aliyuncs.com
        bucketName: example-bucket1
        mountDir: /mnt/example-bucket1
        readOnly: true
```

#### 权限配置相关

##### 子账号需要的权限

###### 最大权限

**系统策略**：`AliyunFCFullAccess`


###### 部署最小权限

**自定义策略**

```json
{
    "Statement":[
        {
            "Action":"ram:PassRole",
            "Effect":"Allow",
            "Resource":"*"
        }
    ],
    "Version":"1"
}
```

##### 服务角色权限

###### 最大权限

**系统策略**：`AliyunOSSFullAccess`

###### 限定只读访问指定bucket

```
{
  "Version": "1",
  "Statement": [
    {
      "Action": [
        "oss:ListObjects",
        "oss:GetObject"
      ],
      "Resource": [
        "acs:oss:*:*:bucketName",
        "acs:oss:*:*:bucketName/*"
      ],
      "Effect": "Allow"
    }
  ]
}
```

###### 限定读写访问指定bucket

```
{
  "Version": "1",
  "Statement": [
    {
      "Action": [
        "oss:ListObjects",
        "oss:GetObject",
        "oss:PutObject",
        "oss:DeleteObject",
        "oss:AbortMultipartUpload",
        "oss:ListParts"
      ],
      "Resource": [
        "acs:oss:*:*:bucketName",
        "acs:oss:*:*:bucketName/*"
      ],
      "Effect": "Allow"
    }
  ]
}
```

#### ossMountPoints

| 参数名     | 必填  | 类型    | 参数描述       |
| ---------- | ----- | ------- | -------------- |
| endpoint   | True  | String  | OSS服务地址    |
| bucketName | True  | String  | OSS bucket名称 |
| mountDir   | True  | String  | 函数计算目录   |
| readOnly   | False | Boolean | 是否挂载为只读 |

### tracingConfig

链路追踪，可取值：Enable、Disable

参考案例

```yaml
service:    
  name: unit-deploy-service    
  description: 'demo for fc-deploy component'    
  internetAccess: true    
  tracingConfig: Enable     
```

#### 权限配置相关

##### 子账号需要的权限

**系统策略**：`AliyunFCFullAccess`、`AliyunTracingAnalysisReadOnlyAccess`

```yaml
{
    "Statement":[
        {
            "Action":"ram:PassRole",
            "Effect":"Allow",
            "Resource":"*"
        }
    ],
    "Version":"1"
}
```
