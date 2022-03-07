---
title: Yaml规范
description: 'Yaml规范说明'
position: 1
category: 'Yaml规范'
---

# 字段解析

| 参数名                              | 必填 | 类型                         | 参数描述   |
| ----------------------------------- | ---- | ---------------------------- | ---------- |
| region                              | True | Enum                         | 地域       |
| [service](./service.md)             | True | [Struct](./service.md)       | 服务       |
| [function](./function.md)           | True | [Struct](./function.md)      | 函数       |
| [triggers](./triggers.md)           | True | [Struct](./triggers.md)      | 触发器     |
| [customDomains](./customDomains.md) | True | [Struct](./customDomains.md) | 自定义域名 |

地区(region)目前支持：`cn-beijing`, `cn-hangzhou`, `cn-shanghai`, `cn-qingdao`, `cn-zhangjiakou`, `cn-huhehaote`, `cn-shenzhen`, `cn-chengdu`, `cn-hongkong`, `ap-southeast-1`, `ap-southeast-2`, `ap-southeast-3`, `ap-southeast-5`, `ap-northeast-1`, `eu-central-1`, `eu-west-1`, `us-west-1`, `us-east-1`, `ap-south-1`

# Yaml完整配置


阿里云函数计算（FC）组件的Yaml字段如下：

```yaml
edition: 1.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: ffmpeg-app        #  项目名称
access: default         #  秘钥别名

services:
  fc-deploy-test:
    component: devsapp/fc  # 组件名称
    props: #  组件的属性值
      region: cn-qingdao
      service:
        name: fc-deploy-service
        description: demo for fc-deploy component
        internetAccess: true
        role: 'acs:ram::xxx:role/AliyunFcDefaultRole'
        tracingConfig: Enable  # 'Enable' or 'Disable'
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
          instanceID: cri-xxxxxx  # 容器镜像服务企业版实例的ID，共享实例时不需要指定该参数
          accelerationType: Default  # 镜像加速开关，'Default' or 'None'
        environmentVariables:
          key: 'value'
        initializationTimeout: 20
        initializer: index.initializer
        instanceConcurrency: 1
        instanceType: e1  # e1(弹性实例) or c1(性能实例)
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
>  - 如何声明多个函数？     
>    在Serverless Devs的函数计算组件中，默认规定服务和函数是一一对应关系，如果需要在一个服务下声明多个函数，可以参考[常见小贴士](http://www.serverless-devs.com/fc/tips) 中提供的[如何声明部署多个函数文档](http://www.serverless-devs.com/fc/tips#%E5%A6%82%E4%BD%95%E5%A3%B0%E6%98%8E%E9%83%A8%E7%BD%B2%E5%A4%9A%E4%B8%AA%E5%87%BD%E6%95%B0)


