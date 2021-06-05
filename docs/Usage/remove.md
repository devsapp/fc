# 移除操作：Remove

阿里云函数计算（FC）组件为使用者提供了FC相关资源的移除能力。可以通过`remove`指令，快速进行移除操作。

您可以通过`remove -h`/`remove --help`参数，唤起帮助信息。例如执行`s remove -h`后，可以看到：

```

Remove 

    Specify RESOURCE to remove it and resource belonging to it.                   
    If service is specified, service and its functions should be removed.         
    If function is specified, function and its triggers should be removed.        
    If trigger is specified, you can specify the trigger name to remove the       
    specific trigger or remove all triggers without trigger name.                 
    If domain is specified, you can specify the domain name to remove the         
    specific domain or remove all domains without domain name.   

Usage

  $ s remove <RESOURCE> <options> 

Resource

  service            The service resource.
  function           The function resource.
  trigger            The trigger resource.
  domain             The domain resource.

Options

  --n, --name <name>   Resource name to be removed, only for trigger/domain resource. 

Global Options

  -y, --assume-yes    Assume that the answer to any question which would be asked is yes. 
  -h, --help          Display help for command.                                           

Examples with Yaml

  $ s remove 
  $ s <ProjectName> remove
  $ s remove service               
  $ s remove domain --name myDomain
  $ s exec -- remove domain --name myDomain

Examples with CLI

  You can refer to the usage of fc-api and execute [s cli fc-api -h] for help

```


