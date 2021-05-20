# 阿里云函数计算组件

## 指令

```shell
# 部署
s deploy --help

# 删除
s remove --help
```

## yaml 示例

```yaml
demo:
  Component: fc-deploy
  Provider: alibaba
  Access: default
  Properties:
    region: cn-qingdao
    service:
      name: qianfeng-fc-deploy-service
      description: demo for fc-deploy component
      internetAccess: true
      role: 'acs:ram::xxx:role/qianfeng-fc-deploy-test-role'
      nasConfig:
        userId: 10003
        groupId: 10003
        mountPoints:
          - serverAddr: xxx.cn-qingdao.nas.aliyuncs.com
            nasDir: /qianfeng-fc-deploy-service
            fcDir: /mnt/auto
      vpcConfig:
        vpcId: xxx
        securityGroupId: xxx
        vswitchIds:
          - vsw-xxx
      logConfig:
        project: xxx
        logstore: xxx
    function:
      name: qianfeng-fc-base-service
      description: 'this is test'
      filename: './code.zip'
      ossBucket: xxx
      ossKey: xxx
      handler: 'index.handler'
      memorySize: 128
      runtime: nodejs12
      timeout: 60
      caPort: 9000
      customContainerConfig:
        image: xxx
        command: xxx
        args: xxx
      environmentVariables:
        key: 'value'
      initializationTimeout: 20
      initializer: index.initializer
      instanceConcurrency: 1
      instanceType: e
    triggers:
    	- name: httpTrigger
        type: http
        config:
          authType: anonymous
          methods:
            - GET
      - name: timerTrigger
        type: timer
        config:
          cronExpression: '0 0 8 * * *'
          enable: true
          payload: 'awesome-fc'
      - name: ossTrigger
        type: oss
        role: xxx
        sourceArn: xxx
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
        config:
          topicName: test-topic
          region: cn-hangzhou
          notifyContentFormat: 'JSON'
          notifyStrategy: 'BACKOFF_RETRY'
      - name: cdnTrigger
        type: cdn_events
        role: xxx
        sourceArn: xxx
        config:
          eventName: LogFileCreated
          eventVersion: '1.0.0'
          notes: cdn events trigger test
          filter:
            domain: 
              - 'www.taobao.com'
              - 'www.tmall.com'
    customDomains:
      - domainName: auto
        protocol: HTTP
        routeConfigs:
          - path: /a
            serviceName: qianfeng-fc-deploy-service
            functionName: custom-container-function
            methods:
              - GET
        certConfig:
        	certName: xxx
        	certificate: xxx
        	privateKey: xxx
```
