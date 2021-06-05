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
