---
title: Yaml specification
description: 'Yaml specification'
position: 3
category: 'Overview'
---

# Yaml specification

- [Yaml complete configuration](#Yaml-complete-configuration)
- [Field parsing](#Field-parsing)
  - [service field](#service-field)
    - [role](#role)
    - [logConfig](#logConfig)
    - [vpcConfig](#vpcConfig)
    - [nasConfig](#nasConfig)
  - [function field](#function-field)
    - [customContainerConfig](#customContainerConfig)
    - [environmentVariables](#environmentVariables)
    - [instanceLifecycleConfig](#instanceLifecycleConfig)
    - [asyncConfiguration](#asyncConfiguration)
    - [destination](#destination)
    - [customDNS](#customDNS)
    - [dnsOptions](#dnsOptions)
  - [triggers field](#triggers-field)
    - [OSS triggers](#OSS-triggers)
    - [Log triggers](#Log-triggers)
    - [Timer triggers](#Timer-triggers)
    - [Http triggers](#Http-triggers)
    - [MNS triggers](#MNS-triggers)
    - [CDN triggers](#CDN-triggers)
  - [customDomains field](#customDomains-field)
    - [certConfig](#certConfig)
    - [routeConfigs](#routeConfigs)

# Yaml complete configuration

The Yaml fields of Alibaba Cloud Function Compute (FC) components are as follows:

```yaml
edition: 1.0.0 # Command-line YAML specification version, following the Semantic Versioning specification
name: ffmpeg-app # project name
access: default # key alias

services:
  fc-deploy-test:
    component: devsapp/fc # component name
    props: # property value of the component
      region: cn-qingdao
      service:
        name: fc-deploy-service
        description: demo for fc-deploy component
        internetAccess: true
        role: 'acs:ram::xxx:role/AliyunFcDefaultRole'
        tracingConfig: Enable # 'Enable' or 'Disable'
        nasConfig:
          userId: 10003
          groupId: 10003
          mountPoints:
            - serverAddr: xxx.cn-qingdao.nas.aliyuncs.com
              nasDir: /fc-deploy-service
              fcDir: /mnt/auto        
        vpcConfig:
          vpcId: xxx
          securityGroupId: xxx
          vswitchIds:
            - vsw-xxx
        logConfig:
          project: xxx
          logstore: xxx
          enableRequestMetrics: true
          enableInstanceMetrics: true
      function:
        name: fc-base-service
        description: 'this is test'
        codeUri: './code.zip'
        ossBucket: xxx
        ossKey: xxx  # conflict with codeUri
        handler: 'index.handler'
        memorySize: 128
        runtime: nodejs12
        timeout: 60
        caPort: 9000
        customContainerConfig:
          image: xxx
          command: xxx
          args: xxx
          instanceID: cri-xxxxxx  # The ID of the Container Image Service Enterprise Edition instance. You do not need to specify this parameter when sharing an instance.
          accelerationType: Default  # Mirror acceleration switch, 'Default' or 'None'
        environmentVariables:
          key: 'value'
        initializationTimeout: 20
        initializer: index.initializer
        instanceConcurrency: 1
        instanceType: e1  # e1 (elastic instance) or c1 (performance instance)
        layer: 
          - xxx
          - xxx
        instanceLifecycleConfig:
          preFreeze:
            handler: index.xxx
            timeout: 60
          preStop:
            handler: index.xxx
            preStop: 60
        asyncConfiguration:
          destination:
            onSuccess: acs:fc:{region}:{uid}:services/{serviceName}.{qualifier}/functions/{functionName} 
            onFailure: acs:fc:{region}:{uid}:services/{serviceName}.{qualifier}/functions/{functionName}
            # onSuccess: acs:fc:::services/{serviceName}.{qualifier}/functions/{functionName}
            # onSuccess: acs:mns:::/queues/{queuesName}/messages # mns/queues
            # onSuccess: acs:mns:::/topics/{topicsName}/messages # mns/topics
          maxAsyncEventAgeInSeconds: 456
          maxAsyncRetryAttempts: 3
          statefulInvocation: true
        customDNS:
          nameServers:
            - 8.8.8.8
            - 114.114.114.114
          searches:
            - default.svc.test.example
            - svc.jqDgWvOo.test.example
          dnsOptions:
            - name: ndots
              value: '6'
            - name: edns
              value: '7'
        customRuntimeConfig:
            command:
                - /code/node_modules/ts-node/dist/bin.js
                - server.ts
            args:
                - '--args1'
                - args1
      triggers:
        - name: httpTrigger
          type: http
          qualifier: xxx
          config:
            authType: anonymous
            methods:
              - GET
        - name: timerTrigger
          type: timer
          qualifier: xxx
          config:
            cronExpression: '0 0 8 * * *'
            enable: true
            payload: 'awesome-fc'
        - name: ossTrigger
          type: oss
          role: xxx
          sourceArn: xxx
          qualifier: xxx
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
          qualifier: xxx
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
          qualifier: xxx
          config:
            topicName: test-topic
            region: cn-hangzhou
            notifyContentFormat: 'JSON'
            notifyStrategy: 'BACKOFF_RETRY'
        - name: cdnTrigger
          type: cdn_events
          role: xxx
          sourceArn: xxx
          qualifier: xxx
          config:
            eventName: LogFileCreated
            eventVersion: '1.0.0'
            notes: cdn events trigger test
            filter:
              domain: 
                - 'www.taobao.com'
                - 'www.tmall.com'
        - name: tablestoreTrigger
          type: tablestore
          role: xxx
          sourceArn: xxx
          qualifier: xxx
          config:
            instanceName: xxx
            tableName: xxxs
      customDomains:
        - domainName: auto
          protocol: HTTP
          routeConfigs:
            - path: /a
              serviceName: fc-deploy-service
              functionName: custom-container-function
              methods:
                - GET
          certConfig:
            certName: xxx
            certificate: xxx
            privateKey: xxx
```

> Tips:
> - How to declare multiple functions?
> In the function computing component of Serverless Devs, by default, there is a one-to-one correspondence between services and functions. If you need to declare multiple functions under one service, you can refer to [Common Tips](./tips.md) Provided in [How to declare and deploy multiple functions document](./tips.md#How to declare and deploy multiple functions)

# Field parsing

| Parameter Name | Required | Type | Parameter Description |
| ----------------------------------- | ---- | -------- -------------------- | ---------- |
| region | True | Enum | Region |
| [service](#service field) | True | [Struct](#service field) | Service |
| [function](#function field) | True | [Struct](#function field) | function |
| [triggers](#triggers field) | True | [Struct](#triggers field) | Triggers |
| [customDomains](#customDomains field) | True | [Struct](#customDomains field) | Custom Domain Name |

Regions currently supported: `cn-beijing`, `cn-hangzhou`, `cn-shanghai`, `cn-qingdao`, `cn-zhangjiakou`, `cn-huhehaote`, `cn-shenzhen`, `cn-chengdu `, `cn-hongkong`, `ap-southeast-1`, `ap-southeast-2`, `ap-southeast-3`, `ap-southeast-5`, `ap-northeast-1`, `eu -central-1`, `eu-west-1`, `us-west-1`, `us-east-1`, `ap-south-1`

## service field

| Parameter Name | Required | Type | Parameter Description |
| ------------------------------- | ----- | ------------- ---------------------------------- | --------------- --------------------------------------------- |
| name | True | String | service name |
| description | False | String | A short description of the Service |
| internetAccess | False | Boolean | Set to true to allow the function to access the public network |
| [tracingConfig](#tracingConfig) | False | String | Link tracing, available values: Enable, Disable |
| [role](#role) | False | String[Simple configuration]/[Struct[Detailed configuration]](#role) | The RAM role that grants the permissions required by Function Compute, the usage scenarios include 1. Send the log generated by the function To the user's logstore 2. Generate a token for the function to access other cloud resources during execution |
| [logConfig](#logConfig) | False | Enum[simple configuration]/[Struct[detailed configuration]](#logConfig) | log configuration, the log generated by the function will be written to the logstore configured here |
| [vpcConfig](#vpcConfig) | False | Enum[simple configuration]/[Struct[detailed configuration]](#vpcConfig) | VPC configuration, after configuration, the function can access the specified VPC |
| [nasConfig](#nasConfig) | False | Enum[simple configuration]/[Struct[detailed configuration]](#nasConfig) | NAS configuration, after configuration, the function can access the specified NAS |
Examples：

```yaml
service:
    name: unit-deploy-service
    description: 'demo for fc-deploy component'
    internetAccess: true
```

### Permission configuration related

#### Permissions required for sub-accounts

##### Maximum permissions

System Policy: AliyunFCFullAccess

##### Deployment Least Privileges

**Custom Policy**

⚠️ The permission of `fc:GetService` is optional by default.

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

##### Remove the least privilege

**Custom Policy**

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

When the `role` parameter is a string, it can be: `acs:ram::xxx:role/AliyunFcDefaultRole`

When the `role` parameter is a structure, you can refer to:

| Parameter Name | Required | Type | Parameter Description |
| --------------------- | ---- | ---------------------- --- | -------- |
| name | True | String | Character name |
| [policies](#policies) | True | [List\<Struct>](#policies) | list of policies |

Examples：

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
#### Permission configuration related

##### Sub-account requires permission

###### Maximum permissions

**System Policy**: `AliyunFCFullAccess`, `AliyunRAMFullAccess`

###### More granular strategies

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

Where `policies` represents a list of policies. When this field is used, the locally configured ak needs to have permission to create policies and roles. The elements in the list support strings and `policy` structures, which can be referred to:

| Parameter Name | Required | Type | Parameter Description |
| ----------- | ----- | -------------------------- | ------------ |
| name | True | String | Policy name |
| description | False | String | Policy description |
| statement | True | [List\<Struct>](#statement) | Policy content list |

#### statement

Among them, `statement` represents the list of policy content, and the structure of the elements in the list can be referred to:

| Parameter Name | Required | Type | Parameter Description |
| --------- | ----- | ------------------- | ------------------------------------ |
| Effect | True | String | Strategy effect, optional values ​​are 'Allow' and 'Deny' |
| Action | True | List\<String\> | Policy Action |
| Resource | True | String/List\<String\> | Policy's target resource |
| Condition | False | Object | Condition of the policy |

### logConfig

When the `logConfig` parameter is a simple configuration, it can be: `auto`

When the `logConfig` parameter is a structure, you can refer to:

| Parameter Name | Required | Type | Parameter Description |
| --------------------- | ----- | ------- | ---------------------------------------- |
| logstore | False | String | logstore name in loghub |
| project | False | String | project name in loghub |
| enableRequestMetrics | False | Boolean | RequestMetrics switch, value `true`/`false` |
| enableInstanceMetrics | False | Boolean | InstanceMetrics switch, value `true`/`false` |
| logBeginRule | False | String | Whether the log is split, the value is `DefaultRegex`/`None` |
Examples：

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

> when logConfig is auto
> project name generation rule {accountID}-{region}-logproject
> logstore name generation rule 'fc-service-{serviceName}-logstore'.toLocaleLowerCase()


#### Permission configuration related

##### Permissions required for sub-accounts

###### Maximum permissions

System policy: `AliyunFCFullAccess`, `AliyunLogFullAccess`

###### Deploy with minimal permissions

- when `logConfig` is not `auto`

**Custom Policy**

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

- when `logConfg` is `auto`

**Custom Policy**

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

##### Service role permissions

###### Maximum permissions

**System Policy**: `AliyunLogFullAccess`


###### least privilege

**Custom Policy**

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

When the `vpcConfig` parameter is a simple configuration, it can be: `auto`

When the `vpcConfig` parameter is a structure, you can refer to:

| Parameter Name | Required | Type | Parameter Description |
| --------------- | ----- | ------------ | -------------- |
| securityGroupId | False | String | Security Group ID |
| vSwitchIds | False | List\<String\> | List of switch IDs |
| vpcId | False | String | VPC ID |


Examples:

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
#### Permission configuration related

##### Permissions required for sub-accounts

###### Maximum permissions

**System Policy**: `AliyunFCFullAccess`, `AliyunVPCFullAccess`, `AliyunECSFullAccess`

###### Deployment minimum permissions **<**[**Service permissions reference**](#Permissions required by sub-accounts)**>**

- when `vpcConfig` is not `auto`

**Custom Policy**

````json
{
     "Statement":[
         {
             "Action":"ram:PassRole",
             "Effect":"Allow",
             "Resource": "*"
         }
     ],
     "Version": "1"
}
````

- when `vpcConfig` is `auto`

**System Policy**: `AliyunVPCReadOnlyAccess`

**Custom Policy** 

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

##### Service role permissions

**System Policy**: `AliyunECSNetworkInterfaceManagementAccess`

### nasConfig

When the `nasConfig` parameter is a simple configuration, it can be: `auto`

When the `nasConfig` parameter is a structure, you can refer to:

| Parameter Name | Required | Type | Parameter Description |
| --------------------------- | ----- | --------------- ------------------------- | -------------------- |
| [mountPoints](#mountPoints) | False | [List\<Struct>[Multiple Directory Configuration]](#mountPoints) | Directory Configuration |
| userId | False | String | userID, default is 10003 |
| groupId | False | String | groupID, default is 10003 |

Examples:

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

#### Permission configuration related

##### Permissions required for sub-accounts

###### Maximum permissions

**System Policy**: `AliyunFCFullAccess`, `AliyunVPCFullAccess`, `AliyunNasFullAccess`


###### Deploy with minimal permissions

- when `nasConfig` is not `auto`

**Custom Policy**

````json
{
     "Statement":[
         {
             "Action":"ram:PassRole",
             "Effect":"Allow",
             "Resource": "*"
         }
     ],
     "Version": "1"
}
````

- when `nasConfig` is `auto`

**System Policy**: `AliyunNasReadOnlyAccess`

**Custom Policy** 

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

##### Service role permissions

**System Policy**: `AliyunECSNetworkInterfaceManagementAccess`


#### mountPoints

| Parameter Name | Required | Type | Parameter Description |
| ---------- | ----- | ------ | -------------- |
| serverAddr | False | String | NAS server address |
| nasDir | False | String | NAS directory |
| fcDir | False | String | Function calculation directory |

### tracingConfig

Link tracking, possible values: Enable, Disable

Examples

````yaml
service:
   name: unit-deploy-service
   description: 'demo for fc-deploy component'
   internetAccess: true
   tracingConfig: Enable
````

#### Permission configuration related

##### Permissions required for sub-accounts

**System policy**: `AliyunFCFullAccess`, `AliyunTracingAnalysisReadOnlyAccess`

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


## function field

| Parameter Name | Required | Type | Parameter Description |
| --------------------------------------------------- | ----- | ------------------------------------- | ------------------------------------------------------ |
| name | True | String | function name |
| description | False | String | A short description of the function |
| codeUri | False | String | Code position |
| ossBucket | False | String | The oss bucket where the code is stored |
| ossKey | False | String | If oss code is specified, the corresponding object cannot appear at the same time as codeUri |
| handler | False | String | The entry of function execution, the specific format is related to the language |
| memorySize | False | Number | The memory size of the function |
| [runtime](#runtime) | True | String | Runtime |
| timeout | False | Number | The timeout time for the function to run |
| caPort | False | Number | CustomContainer/Runtime specified port |
| [customContainerConfig](#customContainerConfig) | False | [Struct](#customContainerConfig) | Custom image configuration |
| [environmentVariables](#environmentVariables) | False | [Struct](#environmentVariables) | Environment Variables |
| initializationTimeout | False | Number | initialization method timeout |
| initializer | False | String | Initializer |
| instanceConcurrency | False | Number | Single instance with multiple concurrency |
| instanceType | False | String | Function instance type, optional values: e1 (elastic instance), c1 (performance instance) |
| layer | False | List\<String\> | Function binding layer, only supports Nodejs and Python; the value is the ARN of the layer |
| [instanceLifecycleConfig](#instanceLifecycleConfig) | False | [Struct](#instanceLifecycleConfig) | extension function |
| [asyncConfiguration](#asyncConfiguration) | False | [Struct](#asyncConfiguration) | Async Configuration |
| [customDNS](#customDNS) | False | [Struct](#customDNS) | DNS Configuration |
| [customRuntimeConfig](#customRuntimeConfig) | False | [Struct](#customRuntimeConfig) | Custom runtime startup configuration |

Examples：

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

### Function permissions required by the account

#### Maximum permissions

`AliyunFCFullAccess`

#### deploy least privilege

⚠️ `fc:GetFunctionAsyncInvokeConfig`【Optional】, does not affect use

```json
{
    "Statement":[
        {
            "Action":[
                "fc:GetFunction",
                "fc:CreateFunction",
                "fc:UpdateFunction"
            ],
            "Effect":"Allow",
            "Resource":"acs:fc:<region>:<account-id>:services/<service-name>/functions/*"
        }
    ],
    "Version":"1"
}
```


#### remove least privilege

```json
{
    "Version":"1",
    "Statement":[
        {
            "Action":"fc:DeleteFunction",
            "Resource":"acs:fc:<region>:<account-id>:services/<serviceName>/functions/<functionName>",
            "Effect":"Allow"
        }
    ]
}
```


### runtime

The runtime currently supports: `nodejs4.4`, `nodejs6`, `nodejs8`, `nodejs10`, `nodejs12`, `python2.7`, `python3`, `java8`, `java11`, `php7.2`, `dotnetcore2.1`, `custom` and `custom-container`

When the runtime is the custom-container service role permission:

**System Policy**: `AliyunContainerRegistryReadOnlyAccess`


### customContainerConfig

| Parameter Name | Required | Type | Parameter Description |
| ---------------- | ----- | ------ | ------------------------------------------------------------ |
| image | False | String | Container image repository address |
| command | False | String | Container startup command, example value: '["/code/myserver"]' |
| args | False | String | Container startup parameters, example values: '["-arg1", "value1"]' |
| accelerationType | False | String | Mirror acceleration switch, optional values: 'Default', 'None', the former means on, the latter means off |
| instanceID | False | String | The ID of the Container Image Service Enterprise Edition instance. When an enterprise version instance is selected for the container image, you need to add an instance ID to the enterprise version of the container image service. The default resolution of the instance must be the VPC network address where the service is located. PrivateZone product definition domain name resolution is not currently supported |


### environmentVariables

Object format, for example:

````
TempKey: tempValue
````

### instanceLifecycleConfig

| Parameter Name | Required | Type | Parameter Description |
| -------------------------------- | ----- | ----------------------------- | -------------- |
| [preFreeze](#prefreeze and prestop) | False | [Struct](#prefreeze and prestop) | PreFreeze function |
| [preStop](#prefreeze and prestop) | False | [Struct](#prefreeze and prestop) | PreStop function |

#### preFreeze and preStop

| Parameter Name | Required | Type | Parameter Description |
| ------- | ----- | ------ | -------- |
| handler | True | String | Function entry |
| timeout | False | Number | Timeout time |

### asyncConfiguration

| Parameter Name | Required | Type | Parameter Description |
| --------------------------- | ----- | ---------------------- | ------------------------------------------------------------------ |
| maxAsyncEventAgeInSeconds | False | Number | The maximum survival time of the message, the value range is [1,2592000]. Unit: Second |
| maxAsyncRetryAttempts | False | Number | The maximum number of retries after an asynchronous call fails, the default value is 3. Value range [0,8] |
| statefulInvocation | False | Boolean | Whether to enable stateful asynchronous invocation |
| [destination](#destination) | False | [Struct](#destination) | The configuration structure of the asynchronous call destination |


### customDNS

| Parameter Name | Required | Type | Parameter Description |
| --------------------------- | ----- | ---------------------- | ------------------------------------------------------------------ |
| nameServers | False | List\<String\> | List of IP addresses of DNS servers |
| searches | False | List\<String\> | DNS search domains list |
| dnsOptions | False | [List\<Struct\>](#dnsOptions) | Corresponds to the Options item of resolv.conf DNS configuration |

### customRuntimeConfig

| Parameter Name | Required | Type | Parameter Description |
| --------------------------- | ----- | ---------------------- | ------------------------------------------------------------------ |
| command | True | List\<String\> | Start command, example value: ["/code/myserver"] |
| args | False | String | Startup arguments, example values: ["-arg1", "value1"] |


#### dnsOptions

| Parameter Name | Required | Type | Parameter Description |
| --------------------------- | ----- | ---------------------- | ------------------------------------------------------------------ |
| name | True | String | The key corresponding to the Options item of the resolv.conf DNS configuration |
| value | True | String | Corresponds to the value of the Options item of the resolv.conf DNS configuration |

#### Permission configuration related

##### Service role permissions

- fc is configured: `AliyunFCInvocationAccess`
- mns is configured

````
{
    "Action":[
        "mns:SendMessage",
        "mns:PublishMessage"
    ],
    "Resource":"*",
    "Effect":"Allow"
}
````

##### Permissions required for sub-accounts

###### Maximum permissions

**System policy**: `AliyunFCFullAccess`, `AliyunMNSReadOnlyAccess` [permission to view message service (MNS)], `AliyunEventBridgeReadOnlyAccess` [permission to event bus (EventBridge)], `AliyunMQReadOnlyAccess` [permission to message queue (MQ)] , `AliyunFCInvocationAccess` [invocation function permission]

###### Operating minimum permissions

**System Policy**

- If mns related `AliyunMNSReadOnlyAccess` is configured
- If EventBridge related `AliyunEventBridgeReadOnlyAccess` is configured
- If MQ related `AliyunMQReadOnlyAccess` is configured

**Custom Policy**

```json
{
    "Version":"1",
    "Statement":[
        {
            "Action":"fc:*Service",
            "Resource":"*",
            "Effect":"Allow"
        },
        {
            "Action":[
                "fc:GetFunction",
                "fc:CreateFunction",
                "fc:UpdateFunction"
            ],
            "Effect":"Allow",
            "Resource":"acs:fc:<region>:<account-id>:services/unit-deploy-service/functions/*"
        },
        {
            "Action":[
                "fc:InvokeFunction",
                "fc:GetFunctionAsyncInvokeConfig",
                "fc:DeleteFunctionAsyncInvokeConfig",
                "fc:PutFunctionAsyncInvokeConfig"
            ],
            "Effect":"Allow",
            "Resource":"acs:fc:<region>:<account-id>:services/unit-deploy-service.*/functions/*"
        },
        {
            "Action":"ram:PassRole",
            "Effect":"Allow",
            "Resource":"*"
        }
    ]
}
```

#### destination

| Parameter Name | Required | Type | Parameter Description |
| --------- | ----- | ------ | ------------ |
| onSuccess | False | String | The target service for which the asynchronous call failed |
| onFailure | False | String | Asynchronous call to successful target service |


## triggers field

| Parameter Name | Required | Type | Parameter Description |
| --------- | ----- | ------ | -------------------------------------------------------------- |
| name | True | String | trigger name |
| type | True | Enum | trigger type |
| role | False | String | Use the ARN of a RAM role to specify the execution role for the function, the event source will use this role to trigger the function execution, please ensure that the role has the permission to call the function |
| sourceArn | False | String | ARN of the trigger event source |
| qualifier | False | String | Version or alias of trigger function, default `LATEST` |
| config | True | Struct | Trigger configuration, including [OSS trigger](#OSS trigger), [Log trigger](#Log trigger), [Log trigger](#Log trigger), [Timer trigger](#Timer trigger), [Http trigger](#Http trigger), [MNS trigger](#MNS trigger), [CDN trigger](#CDN trigger) |

type currently supports: `http`, `timer`, `oss`, `log`, `mns_topic`, `cdn_events`, `tablestore`

### OSS triggers

| Parameter Name | Required | Type | Parameter Description |
| ----------------- | ---- | ----------------- | ---------------------------- |
| bucketName | True | String | Target bucket name in OSS |
| events | True | List\<String\> | The list of events that trigger the function execution on the OSS side |
| [filter](#filter) | True | [Struct](#filter) | Trigger condition |

Examples:

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

#### Permission configuration related

##### Sub-account permissions

###### Maximum permissions

`AliyunFCFullAccess`, `AliyunOSSFullAccess`

###### Operating minimum permissions

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


##### Trigger role permissions

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

| Parameter Name | Required | Type | Parameter Description |
| ------ | ----- | ------------- | -------- |
| Key | False | [Struct](Key) | key value |

##### Key

| Parameter Name | Required | Type | Parameter Description |
| ------ | ----- | ------ | -------- |
| Prefix | False | String | Prefix |
| Suffix | False | String | Suffix |

### Log trigger


| Parameter Name | Required | Type | Parameter Description |
| --------------------------------------- | ---- | ---------------------------- | ---------------------------------------------------------- |
| [logConfig](#logConfig-1) | True | [Struct](#logConfig-1) | Log Configuration |
| [jobConfig](#jobConfig) | True | [Struct](#jobConfig) | job configuration |
| [sourceConfig](#sourceConfig) | True | [Struct](#sourceConfig) | source configuration |
| [functionParameter](#functionParameter) | True | [Struct](#functionParameter) | This parameter will be passed into the function as the Parameter of the function Event. The default value is empty ({}) |
| enable | True | Boolean | Trigger switch |


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

##### Trigger role permissions

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

| Parameter Name | Required | Type | Parameter Description |
| -------- | ----- | ------ | -------------------------------------------------------------- |
| project | False | String | Log project name |
| logstore | False | String | The name of the log store, the log of the function execution process triggered by the log service will be recorded in the log store |


#### jobConfig

| Parameter Name | Required | Type | Parameter Description |
| --------------- | ----- | ------ | ------------------------------------------------------------ |
| maxRetryTime | False | String | Indicates the maximum number of attempts allowed if an error is encountered when the log service triggers the function execution, the value range: [0,100] |
| triggerInterval | False | String | The time interval at which the log service triggers the function to run, value range: [3,600], unit: second |

#### sourceConfig

| Parameter Name | Required | Type | Parameter Description |
| -------- | ----- | ------ | ------------------------------------------------------------ |
| logstore | False | String | The trigger will periodically subscribe data from the log store to the function service for custom processing |

#### functionParameter

Object format, for example:

```
TempKey: tempValue
```

### Timer trigger

| Parameter Name | Required | Type | Parameter Description |
| -------------- | ----- | ------- | --------------------------------------------------- |
| cronExpression | True | String | Time trigger expression, supports two settings: @every, cron expression |
| enable | True | Boolean | Whether to enable this trigger |
| payload | False | String | Represents the input content of the trigger event itself |

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

### Http trigger

| Parameter Name | Required | Type | Parameter Description |
| -------- | ---- | ------------ | -------------------------------------------------- |
| authType | True | String | Authentication type, optional values: anonymous, function |
| methods | True | List\<String\> | Access methods supported by HTTP triggers, optional values: GET, POST, PUT, DELETE, HEAD |

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

### MNS Triggers

| Parameter Name | Required | Type | Parameter Description |
| ------------------- | ----- | ------ | ---------------- |
| topicName | True | String | mns topic name |
| region | False | List | The region where the mns topic is located, if not filled, the default is the same region as the function |
| notifyContentFormat | False | String | The format of the input parameter event pushed to the function, optional values: STREAM, JSON |
| notifyStrategy | False | String | Retry strategy for calling the function, optional values: BACKOFF_RETRY, EXPONENTIAL_DECAY_RETRY |
| filterTag | False | String | Describes the tag of message filtering in this subscription (only messages with the same tag will be pushed), a string of no more than 16 characters, message filtering is not performed by default, that is, this field is not filled in by default |

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

##### Trigger role permissions

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

### CDN Triggers

| Parameter Name | Required | Type | Parameter Description |
| ------------------- | ---- | ------------------- | ------------------------------------------------- |
| eventName | True | String | The event that triggers function execution on the CDN side, once created, cannot be changed |
| eventVersion | True | String | The version that triggers the function execution event on the CDN side, once created, it cannot be changed |
| notes | True | String | Notes information |
| [filter](#filter-1) | True | [Struct](#filter-1) | Filter (requires at least one filter) |

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

##### Trigger role permissions

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

| Parameter Name | Required | Type | Parameter Description |
| ------ | ---- | ------------ | ---------------- |
| domain | True | List\<String\> | Collection of filter parameter values |

### Tablestore triggers

| Parameter Name | Required | Type | Parameter Description |
| ------------ | ---- | ------------ | ------------------ |
| instanceName | True | List\<String\> | Name of the Tablestore instance |
| tableName | True | List\<String\> | table name in instance |

References:

```yaml
triggers:  
  - name: ots    
    sourceArn: acs:ots:<region>:<account-id>:instance/<instance>/table/<table>    
    type: tablestore    
    role: acs:ram::<account-id>:role/AliyunTableStoreStreamNotificationRole    
    # qualifier: 1 
    # LATEST    
    config: {}
```

#### Permission configuration related

##### Function permissions required by the sub-account

###### Maximum permissions

`AliyunFCFullAccess`, `AliyunOTSFullAccess`

###### Operating minimum permissions

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

##### Trigger role permissions

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

## customDomains field

| Parameter Name | Required | Type | Parameter Description |
| --------------------------- | ----- | --------------------------- | ------------------------------------------ |
| domainName | True | String | Domain name, if the value is auto, the system will assign the domain name by default |
| protocol | True | String | Protocol, value: `HTTP`, `HTTPS`, `HTTP, HTTPS` |
| [routeConfigs](#certConfig) | True | [List\<Struct>](#certConfig) | routes |
| [certConfig](#routeConfigs) | False | [Struct](#routeConfigs) | Domain Certificate |

References:

```yaml
customDomains:
    - domainName: auto
      protocol: HTTP
      routeConfigs:
        - path: /*
          serviceName: unit-deploy-service
          functionName: event-function
```

> ⚠️ Note: If the domain name is configured as `auto`, the system will assign a test domain name by default. This domain name is only for testing use, and its stability is not guaranteed. The Serverless Devs FC component has the right to recycle the domain name in the future. In the case of online business and production demand business, it is strongly recommended to bind your own custom domain name.

### Permissions

#### Permissions required for a RAM user

##### Highest level of permissions

System Policy: `AliyunFCFullAccess`

##### Lowest level of permissions

> Reasons for more service and function permissions: `domainName` is `auto`, you need to create an http function as an auxiliary function, which will be deleted after use

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

### certConfig



| Parameter   | Required | Type   | Description                                                  |
| ----------- | -------- | ------ | ------------------------------------------------------------ |
| certName    | False    | String | The  name of the certificate.                                |
| privateKey  | False    | String | The private  key. The key must be in the PEM format.         |
| certificate | False    | String | The  certificate. The certificate must be in the PEM format. |



### routeConfigs



| Parameter    | Required | Type   | Description                  |
| ------------ | -------- | ------ | ---------------------------- |
| path         | True     | String | The  path.                   |
| serviceName  | False    | String | The  name of the service.    |
| functionName | False    | String | The  name of the function.   |
| qualifier    | False    | String | The  version of the service. |



 
