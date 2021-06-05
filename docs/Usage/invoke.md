```

Invoke

  Invoke/trigger online functions.

Usage

  $ s invoke <options> 

Options
    
  --t, --invocation-type string   Invocation type: optional value "async"|"sync", default value "sync"          
                                  (default: "sync")                                                             
  --e, --event string             Event data (strings) passed to the function during invocation (default: "")   
  --f, --event-file string        A file containing event data passed to the function during invoke.            
  --s, --event-stdin              Read from standard input, to support script pipeline.                         
  --region string                 Specify the region parameter                    
  --service-name string           Specify the service name parameter     
  --function-name string          Specify the function name parameter

Global Options

  -a, --access        Specify key alias.   
  -h, --help          Display help for command.                                           

Examples with Yaml

  $ s invoke
  $ s <ProjectName> invoke
  $ s invoke --region cn-hangzhou --service-name myService --function-name myFunction
  $ s invoke -- info --region cn-hangzhou --service-name myService --function-name myFunction

Examples with CLI

  $ s cli fc invoke --region cn-hangzhou --service-name myService --function-name myFunction

  You also can refer to the usage of fc-api and execute [s cli fc-api -h] for help.
  $ s cli fc-api invokeFunction -h

```
