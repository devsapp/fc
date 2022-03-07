---
title: Yaml specification
description: 'Yaml specification'
position: 1
category: 'Yaml-Spec'
---
# Field parsing

| Parameter Name                        | Required | Type                           | Parameter Description |
| ------------------------------------- | -------- | ------------------------------ | --------------------- |
| region                                | True     | Enum                           | Region                |
| [service](./service.md)             | True     | [Struct](./service.md)       | Service               |
| [function](./function.md)           | True     | [Struct](./function.md)      | function              |
| [triggers](./triggers.md)           | True     | [Struct](./triggers.md)      | Triggers              |
| [customDomains](./customDomains.md) | True     | [Struct](./customDomains.md) | Custom Domain Name    |

Regions currently supported: `cn-beijing`, `cn-hangzhou`, `cn-shanghai`, `cn-qingdao`, `cn-zhangjiakou`, `cn-huhehaote`, `cn-shenzhen`, `cn-chengdu `, `cn-hongkong`, `ap-southeast-1`, `ap-southeast-2`, `ap-southeast-3`, `ap-southeast-5`, `ap-northeast-1`, `eu -central-1`, `eu-west-1`, `us-west-1`, `us-east-1`, `ap-south-1`

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
        layers: 
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
>
> - How to declare multiple functions?
>   In the function computing component of Serverless Devs, by default, there is a one-to-one correspondence between services and functions. If you need to declare multiple functions under one service, you can refer to [Common Tips](http://www.serverless-devs.com/en/fc/tips) Provided in [How to declare and deploy multiple functions document](http://www.serverless-devs.com/en/fc/tips#declaration-and-deployment-of-multiple-functions)

