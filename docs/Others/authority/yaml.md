# Yaml相关权限配置

本文档给出了Yaml相关配置对应的权限情况。

目录：
- [服务相关权限配置](#服务相关权限配置)
    - [基础配置](#基础配置)
    - [存在日志配置的情况](#存在日志配置的情况)
    - [存在 vpc 配置](#存在vpc配置)

# 服务相关权限配置

## 基础配置

### 

```yaml
service:
    name: unit-deploy-service
    description: 'demo for fc-deploy component'
    internetAccess: true
```

### 子账号需要的权限

#### 最大权限
系统策略：AliyunFCFullAccess

#### 部署最小权限
**自定义策略**
⚠️ fc:GetService 的权限默认可以选填，但是如果是 --use-remote 建议必填
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

#### 删除最小权限
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

## 存在日志配置的情况
### yaml
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

> logConfig 为 auto时
> project 名字生成规则 {accountID}-{region}-logproject
> logstore 名字生成规则 'fc-service-{serviceName}-logstore'.toLocaleLowerCase()


### 子账号需要的权限
#### 最大权限
系统策略：AliyunFCFullAccess、AliyunLogFullAccess

#### 部署最小权限**<**[**服务权限参考**](#qW2hs)**>**

logConfig 不为 auto 

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

logConfg === auto

**自定义策略**

```json
{
    "Version": "1",
    "Statement": [
      	{
            "Action": "ram:PassRole",
            "Effect": "Allow",
            "Resource": "*"
        },
        {
            "Action": [
                "log:GetProject",
                "log:CreateProject"
            ],
            "Resource": "acs:log:cn-shenzhen:1899690531354629:project/1899690531354629-cn-shenzhen-logproject",
            "Effect": "Allow"
        },
        {
            "Action": [
                "log:CreateLogStore",
                "log:GetIndex",
                "log:GetLogStore",
                "log:CreateIndex"
            ],
            "Resource": "acs:log:cn-shenzhen:1899690531354629:project/1899690531354629-cn-shenzhen-logproject/logstore/fc-service-unit-deploy-service-logstore",
            "Effect": "Allow"
        }
    ]
}
```

### 服务角色权限
#### 最大权限

**系统策略**：`AliyunLogFullAccess`


#### 最小权限

**自定义策略**

```json
{
    "Version": "1",
    "Statement": [
        {
            "Action": "log:PostLogStoreLogs",
            "Resource": "acs:log:<region>:<account-id>:project/<projectName>/logstore/<logstoreName>",
            "Effect": "Allow"
        }
    ]
}
```


## 存在 vpc 配置
### yaml
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

### 子账号需要的权限
#### 最大权限

**系统策略**：`AliyunFCFullAccess`、`AliyunVPCFullAccess`、`AliyunECSFullAccess`

#### 部署最小权限**<**[**服务权限参考**](#qW2hs)**>**
vpcConfig 不为 auto
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
vpcConfig === auto
**系统策略**：AliyunVPCReadOnlyAccess
**自定义策略**
```json
{
    "Statement": [
        {
            "Action": "ram:PassRole",
            "Effect": "Allow",
            "Resource": "*"
        },
        {
            "Action": "fc:GetAccountSettings",
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:account-settings"
        },
        {
            "Action": [
                "vpc:CreateVpc",
                "vpc:CreateVSwitch",
                "ecs:AuthorizeSecurityGroup",
                "ecs:DescribeSecurityGroups",
                "ecs:CreateSecurityGroup"
            ],
            "Effect": "Allow",
            "Resource": "*"
        }
    ],
    "Version": "1"
}
```


### 服务角色权限
**系统策略**：AliyunECSNetworkInterfaceManagementAccess




## 存在 nas 配置
### yaml
```yaml
component: devsapp/fc
props:
  region: cn-shenzhen
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


### 子账号需要的权限
#### 最大权限
**系统策略**：AliyunFCFullAccess、AliyunVPCFullAccess、AliyunNasFullAccess
​

#### 部署最小权限
nasConfig 不为 auto
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
nasConfig === auto
**系统策略**：AliyunNasReadOnlyAccess
**自定义策略**
```json
{
    "Statement": [
        {
            "Action": "fc:GetAccountSettings",
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:account-settings"
        },
        {
            "Action": [
                "fc:UpdateService",
                "fc:CreateService"
            ],
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:services/*"
        },
        {
            "Action": [
                "fc:InvokeFunction",
                "fc:CreateFunction",
                "fc:UpdateFunction"
            ],
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:services/*/functions/*"
        },
        {
            "Action": [
              "fc:UpdateTrigger",
              "fc:CreateTrigger"
            ],
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
                "nas:CreateMountTarget",
                "nas:DescribeMountTargets",
                "nas:DescribeFileSystems",
                "nas:CreateFileSystem",
                "vpc:DescribeVSwitchAttributes"
            ],
            "Effect": "Allow",
            "Resource": "*"
        }
    ],
    "Version": "1"
}
```


### 服务角色权限
**系统策略**：AliyunECSNetworkInterfaceManagementAccess
​

## 存在链路追踪
### yaml
```yaml
edition: 1.0.0
name: fcDeployApp 
access: unit 

services:
  fc-deploy-test: 
    component: devsapp/fc 
    props:
      region: cn-shenzhen
      service:
        name: unit-deploy-service
        description: 'demo for fc-deploy component'
        internetAccess: true
        tracingConfig: Enable
        
```
### 子账号需要的权限
**系统策略**：AliyunFCFullAccess、AliyunARMSFullAccess
```yaml
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
​

## 如果需要操作角色
### yaml
```yaml
role:
  name: unit-fc
  policies:
    - AliyunContainerRegistryReadOnlyAccess
    - name: unit-test-123
      description: nichousha
      statement:
        Action: ram:PassRole
        Effect: Allow
        Resource: '*'
```
​

​

### 子账号需要权限
#### 最大权限
**系统策略**：AliyunFCFullAccess、AliyunRAMFullAccess
​

#### 更细度的策略**<**[**服务权限参考**](#qW2hs)**>**
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

# 函数相关权限配置

## 基础配置
### yaml
```yaml
edition: 1.0.0
name: fcDeployApp 
access: unit

services:
  fc-deploy-test: 
    component: devsapp/fc 
    props:
      region: cn-shenzhen
      service:
        name: unit-deploy-service
        description: 'demo for fc-deploy component'
        internetAccess: true
      function:
        name: event-function
        description: this is a test
        runtime: nodejs12
        codeUri: ./
        handler: index.handler
        memorySize: 128
        timeout: 60
```


### 子账号需要的函数权限
#### 最大权限
AliyunFCFullAccess
​

#### 部署最小权限
⚠️ fc:GetFunctionAsyncInvokeConfig 选填，不影响使用
```json
{
    "Statement": [
        {
            "Action": [
                "fc:GetFunction",
                "fc:CreateFunction",
                "fc:UpdateFunction"
            ],
            "Effect": "Allow",
            "Resource": "acs:fc:cn-shenzhen:1899690531354629:services/unit-deploy-service/functions/*"
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


​

## runtime 为 custom-container
### 子账号需要的权限
> 参考基础配置

### 服务角色权限
**系统策略**：AliyunContainerRegistryReadOnlyAccess

## 存在 asyncConfig 配置
### 子账号需要的权限
#### 最大权限
**系统策略**：AliyunFCFullAccess、AliyunMNSReadOnlyAccess【查看消息服务(MNS)的权限】、AliyunEventBridgeReadOnlyAccess【事件总线（EventBridge）的权限】、AliyunMQReadOnlyAccess【消息队列(MQ)的权限】、AliyunFCInvocationAccess【调用函数权限】


#### 最小权限
**系统策略**

- 如果配置了mns相关 AliyunMNSReadOnlyAccess
- 如果配置了EventBridge相关 AliyunEventBridgeReadOnlyAccess
- 如果配置了MQ相关 AliyunMQReadOnlyAccess

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
            "Action": [
                "fc:GetFunction",
                "fc:CreateFunction",
                "fc:UpdateFunction"
            ],
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

# 触发器相关权限配置

## 基础配置
### yaml
```yaml
edition: 1.0.0
name: fcDeployApp 
access: unit 

services:
  fc-deploy-test: 
    component: devsapp/fc 
    props:
      region: cn-shenzhen
      service:
        name: unit-deploy-service
        description: 'demo for fc-deploy component'
        internetAccess: true
      function:
        name: event-function
        description: this is a test
        runtime: nodejs12
        codeUri: ./
        handler: index.handler
        memorySize: 128
        timeout: 60
      triggers:
        - name: httpTrigger
          type: http
          config:
            authType: anonymous
            methods:
              - GET
              - POST
```


### 子账号需要的函数权限
#### 最大权限
AliyunFCFullAccess
​

#### 部署最小权限
```json
{
    "Version": "1",
    "Statement": [
        {
            "Action": [
                "fc:GetTrigger",
                "fc:CreateTrigger",
                "fc:UpdateTrigger"
            ],
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>/functions/<functionName>/triggers/<triggerName>"
        }
    ]
}
```


#### 删除最小权限
```json
{
    "Version": "1",
    "Statement": [
        {
            "Action": "fc:DeleteTrigger",
            "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>/functions/<functionName>/triggers/*",
            "Effect": "Allow"
        }
    ]
}
```


## 触发器角色配置参考
[https://help.aliyun.com/document_detail/253969.html#title-0wo-zl0-c61](https://help.aliyun.com/document_detail/253969.html#title-0wo-zl0-c61)

# 触发器相关权限配置

## 基础配置

### yaml
```yaml
edition: 1.0.0
name: fcDeployApp 
access: unit 
# access: default 

services:
  fc-deploy-test: 
    component: devsapp/fc 
    props:
      region: cn-shenzhen
      service:
        name: unit-deploy-service
        description: 'demo for fc-deploy component'
        internetAccess: true
      function:
        name: event-function
        description: this is a test
        runtime: nodejs12
        codeUri: ./
        handler: index.handler
        memorySize: 128
        timeout: 60
      triggers:
        - name: httpTrigger
          type: http
          config:
            authType: anonymous
            methods:
              - GET
              - POST
      customDomains:
        - domainName: auto
          protocol: HTTP
          routeConfigs:
            - path: /*
              serviceName: unit-deploy-service
              functionName: event-function
```


### 子账号需要的权限
#### 最大权限
系统策略：AliyunFCFullAccess
​

#### 最小权限
> 服务和函数权限较多的原因：domainName 为 auto，需要创建http函数作为一个辅助函数，使用完之后会进行删除

```yaml
{
    "Statement": [
        {
            "Action": [
                "fc:DeleteService",
                "fc:UpdateService",
                "fc:CreateService"
            ],
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:services/*"
        },
        {
            "Action": [
                "fc:DeleteFunction",
                "fc:CreateFunction",
                "fc:UpdateFunction"
            ],
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:services/*/functions/*"
        },
        {
            "Action": [
              "fc:DeleteTrigger",
              "fc:UpdateTrigger",
              "fc:CreateTrigger"
            ],
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
                "fc:GetCustomDomain",
                "fc:UpdateCustomDomain",
                "fc:CreateCustomDomain"
            ],
            "Resource": "acs:fc:<region>:<account-id>:custom-domains/*",
            "Effect": "Allow"
        }
    ],
    "Version": "1"
}
```

