# 同步操作：Sync

阿里云函数计算（FC）组件为使用者提供了FC相关资源的同步能力。可以通过`sync`指令，快速进行同步操作（将线上资源，包括配置、代码等下载到本地）。

您可以通过`sync -h`/`sync --help`参数，唤起帮助信息。例如执行`s sync -h`后，可以看到：

```

Sync 

  Synchronize online resources to offline resources.

Usage

  $ s sync <options> 

Options

  --type string            Operation type, code/config/all(default: all)    
  --target-dir             Specify storage directory(default: current dir) 
  --region string          Specify the region parameter                    
  --service-name string    Specify the service name parameter     
  --function-name string   Specify the function name parameter 

Global Options

  -y, --assume-yes    Assume that the answer to any question which would be asked is yes. 
  -h, --help          Display help for command.                                           

Examples with Yaml

  $ s sync
  $ s <ProjectName> sync
  $ s sync --region cn-hangzhou --service-name myService
  $ s exec -- sync  --region cn-hangzhou --service-name myService

Examples with CLI

  $ s cli fc sync --region * --service-name * --type all

```

# 快速使用

当我们下载好[Serverless Devs开发者工具](../Getting-started/Install-tutorial.md), 并完成[阿里云密钥配置](../Getting-started/Setting-up-credentials.md)之后，我们可以根据自身的需求进行资源的同步。

例如我想要将线上香港区（cn-hongkong），服务ai-album下的函数pre-warm同步下来，此时我可以执行：

```
s cli fc sync --region cn-hongkong --service-name ai-album --function-name pre-warm
```

即可将代码和相关配置同步到本地：

```
jiangyu@ServerlessSecurity test % s cli fc sync --region cn-hongkong --service-name ai-album --function-name pre-warm
[2021-06-05T23:25:50.584] [INFO ] [FC-SYNC] - sync code to /Users/jiangyu/Desktop/serverless-devs/test
✔ download success
codeFiles:
  pre-warm: /Users/jiangyu/Desktop/serverless-devs/test/1583208943291465_cn-hongkong_ai-album_pre-warm.zip
configYmlPath: /Users/jiangyu/Desktop/serverless-devs/test/s.cn-hongkong-ai-album.sync.yaml
```

-------

> 使用场景：当我们已经存在线上资源，此时需要用Serverless devs的FC组件进行托管，或者需要将已有的资源通过工具进行管理，此时可以免除手写配置信息等相关操作，通过该指令，可以快速的获取符合Serverless Devs FC组件线上资源，获取之后就可以通过`s deploy`，`s build`...等指令进行更多操作。
