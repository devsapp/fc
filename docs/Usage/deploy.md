# 部署操作：Deploy

阿里云函数计算（FC）组件为使用者提供了FC相关资源的部署能力。可以通过`deploy`指令，快速进行部署操作。

您可以通过`deploy -h`/`deploy --help`参数，唤起帮助信息。例如执行`s deploy -h`后，可以看到：

```

Deploy

  Deploy a serverless application.
  If service is specified, only the service will be deployed.         
  If function is specified, only the function will be deployed.        
  If trigger is specified, only the trigger will be deployed. 
  If domain is specified, only the domain will be deployed. 

Usage

  $ s deploy <RESOURCE> <options> 

Resource

  service            The service resource.
  function           The function resource.
  trigger            The trigger resource.
  domain             The domain resource.

Options

  --use-remote    Deploy resource using remote config. 
  --use-local     Deploy resource using local config.  

Global Options

  -y, --assume-yes    Assume that the answer to any question which would be asked is yes. 
  -a, --access        Specify key alias.   
  -h, --help          Display help for command.                                           

Examples with Yaml

  $ s deploy
  $ s <ProjectName> deploy
  $ s deploy --use-remote
  $ s exec -- deploy --use-remote
  $ s exec <ProjectName> -- deploy --use-remote

Examples with CLI

  You can refer to the usage of fc-api and execute [s cli fc-api -h] for help

```

# 快速使用

