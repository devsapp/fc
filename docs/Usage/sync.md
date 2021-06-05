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

  $ s cli fc-sync --region * --service-name * --type all

```

