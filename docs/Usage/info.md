# 查看操作：Info

阿里云函数计算（FC）组件为使用者提供了FC相关资源的资源查看能力。可以通过`info`指令，快速查看线上资源详情。

您可以通过`info -h`/`info --help`参数，唤起帮助信息。例如执行`s info -h`后，可以看到：

```

Info

  Query online resource details. 

Usage

  $ s info <options> 

Options
    
  --region string          Specify the region parameter                    
  --service-name string    Specify the service name parameter     
  --function-name string   Specify the function name parameter

Global Options

  -a, --access        Specify key alias.   
  -h, --help          Display help for command.                                           

Examples with Yaml

  $ s info
  $ s <ProjectName> info
  $ s info --region cn-hangzhou --service-name myService --function-name myFunction
  $ s exec -- info --region cn-hangzhou --service-name myService --function-name myFunction

Examples with CLI

  $ s cli fc info --region cn-hangzhou --service-name myService --function-name myFunction

  You also can refer to the usage of fc-api and execute [s cli fc-api -h] for help.
  $ s cli fc-api listSerices
  $ s cli fc-api listFunctions --serviceName myService

```

# 快速使用

当我们下载好[Serverless Devs开发者工具](../Getting-started/Install-tutorial.md), 并完成[阿里云密钥配置](../Getting-started/Setting-up-credentials.md)之后，我们可以根据自身的需求进行资源的查询。

例如我想要查询线上香港区（cn-hongkong），服务ai-album下的函数pre-warm的详细信息，此时我可以执行：

```
s cli fc info --region cn-hongkong --service-name ai-album --function-name pre-warm
```

此时可以看到结果：

```
jiangyu@ServerlessSecurity test % s cli fc info --region cn-hongkong --service-name ai-album --function-name pre-warm
service:
  name: ai-album
  internetAccess: true
  role: acs:ram::1583208943291465:role/al-album
  description: 基于函数计算的人工智能相册系统
  vpcConfig:
    securityGroupId: sg-j6c45wkv4vf4ghg104mc
    vswitchIds:
      - vsw-j6c797ywau90y6y03ohbq
    vpcId: vpc-j6c9lk4av0859r4e0tff7
  nasConfig:
    userId: 10003
    groupId: 10003
    mountPoints:
      - serverAddr: 12391848a0f-qek21.cn-hongkong.nas.aliyuncs.com
        nasDir: /ai-album
        fcDir: /mnt/auto
  logConfig:
    logstore: functions
    project: ai-album
function:
  name: pre-warm
  runtime: python3
  handler: index.handler
  timeout: 60
  instanceType: e1
  memorySize: 128
  initializationTimeout: 3
  instanceConcurrency: 1
  environmentVariables: {}
```

## 其他查询方法

当然，如果我们

-------

> 使用场景：在使用工具对阿里云函数计算进行操作时可能会生成一些新的资源，例如在进行服务部署时，VPC等参数选择的是Auto，那么此时部署后的线上资源是什么，就会成为一个比较困扰使用者的问题；通过info指令，用户可以快速的查看到函数的详细信息，例如`s info`

> 类似操作：除了FC组件为我们提供info的命令，帮助我们快速查询线上的某些资源，使用者也可以使用fc-api组件，进行更多信息的查询。例如查询某个地区的服务列表可以是`s cli fc-api listServices --region cn-hangzhou`, 查看函数列表`s cli fc-api listFunctions --serviceName myService  --region cn-hangzhou`，除此之外和可以查询触发器列表/详情，服务详情，函数详情，域名列表/详情，版本列表/详情等，更多操作可以参考`s cli fc-api -h`
