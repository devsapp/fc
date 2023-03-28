---
title: function field
description: 'function field'
position: 3
category: 'Yaml-Spec'
---

## function field

| Parameter Name                                      | Required | Type                               | Parameter Description                                        |
| --------------------------------------------------- | -------- | ---------------------------------- | ------------------------------------------------------------ |
| name                                                | True     | String                             | function name                                                |
| description                                         | False    | String                             | A short description of the function                          |
| codeUri                                             | False    | String                             | Code position                                                |
| ossBucket                                           | False    | String                             | The oss bucket where the code is stored                      |
| ossKey                                              | False    | String                             | If oss code is specified, the corresponding object cannot appear at the same time as codeUri |
| handler                                             | False    | String                             | The entry of function execution, the specific format is related to the language |
| memorySize                                          | False    | Number                             | The memory size of the function                              |
| [runtime](#runtime)                                 | True     | String                             | Runtime                                                      |
| timeout                                             | False    | Number                             | The timeout time for the function to run                     |
| caPort                                              | False    | Number                             | CustomContainer/Runtime specified port                       |
| cpu                                              | False    | Number                             | The CPU specification of the function, in vCPU, is a multiple of 0.05 vCPU.                      |
| diskSize                                              | False    | Number                             | The disk specification of the function. The unit is MB. The optional values are 512 MB or 10240 MB.                      |
| [customContainerConfig](#customcontainerconfig)     | False    | [Struct](#customcontainerconfig)   | Custom image configuration                                   |
| [environmentVariables](#environmentvariables)       | False    | [Struct](#environmentvariables)    | Environment Variables                                        |
| initializationTimeout                               | False    | Number                             | initialization method timeout                                |
| initializer                                         | False    | String                             | Initializer                                                  |
| instanceConcurrency                                 | False    | Number                             | Single instance with multiple concurrency                    |
| instanceType                                        | False    | String                             | Function instance type, optional values: e1 (elastic instance), c1 (performance instance), fc.gpu.tesla.1 (GPU T4 instance), fc.gpu.ampere.1 (GPU A10 instance) |
| gpuMemorySize                                        | False | Number                                | GPU instance memory size |
| layers                                               | False    | List\<String\>                     | Function binding layer,supports Custom and Go1 and Nodejs and Python; the value is the ARN of the layer |
| [instanceLifecycleConfig](#instancelifecycleconfig) | False    | [Struct](#instancelifecycleconfig) | extension function                                           |
| [asyncConfiguration](#asyncconfiguration)           | False    | [Struct](#asyncconfiguration)      | Async Configuration                                          |
| [customDNS](#customdns)                             | False    | [Struct](#customdns)               | DNS Configuration                                            |
| [customRuntimeConfig](#customRuntimeConfig)         | False    | [Struct](#customRuntimeConfig)     | Custom runtime startup configuration                         |

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

The runtime currently supports:
`nodejs14`、`nodejs12`、`nodejs10`、`nodejs8`、`nodejs6`、`nodejs4.4`   
`python3.10`、`python3.9`、`python3`、`python2.7`   
`java11`、`java8`   
`go1`   
`php7.2`   
`dotnetcore2.1`   
`custom`、`custom.debian10`、`custom-container`

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
| dnsOptions | False | [List\<Struct\>](#dnsoptions) | Corresponds to the Options item of resolv.conf DNS configuration |

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
| onSuccess | False | String | Asynchronous call to successful target service |
| onFailure | False | String | The target service for which the asynchronous call failed |

