# 查看日志操作：Logs

阿里云函数计算（FC）组件为使用者提供了FC相关资源的日志查询能力。可以通过`logs`指令，快速进行日志查询操作。

您可以通过`logs -h`/`logs --help`参数，唤起帮助信息。例如执行`s logs -h`后，可以看到：


```

Logs

  Query the function log. You need to open SLS log service.

Usage

  $ s logs <options> 

Options
    
  -t, --tail               Real-time query log                                   
  -s, --startTime number   Query log start time (Timestamp or time format，like 1611827290000 or 2021-11-11T11:11:12)                                  
  -e, --endTime number     Query log end time (Timestamp or time format，like 1611827290000 or 2021-11-11T11:11:12)                                           
  -k, --keyword string     Keyword query                                         
  -r, --requestId string   Query according to requestId within the time interval 
  --type string            Log type query, value: failed     
  --region string          Specify the region parameter               
  --service-name string    Specify the service name parameter     
  --function-name string   Specify the function name parameter                          

Global Options

  -a, --access        Specify key alias.   
  -h, --help          Display help for command.                                           

Examples with Yaml

  $ s logs
  $ s <ProjectName> logs -t
  $ s logs --startTime 2021-11-11T11:11:11 --endTime 2021-11-11T11:11:12
  $ s exec -- logs -s 1611823690000 -e 1611827290000

Examples with CLI

  $ s cli fc logs --region cn-hangzhou --service-name myService --function-name myFunction -t

```
