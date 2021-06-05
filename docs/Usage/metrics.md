# 指标查询操作：Metrics

阿里云函数计算（FC）组件为使用者提供了FC相关资源的指标查询能力。可以通过`metrics`指令，快速进行指标查询操作。

您可以通过`metrics -h`/`metrics --help`参数，唤起帮助信息。例如执行`s metrics -h`后，可以看到：


```

Metrics

  Query function metrics information

Usage

  $ s metrcis <options> 

Options

  --region string          Specify the region parameter               
  --service-name string    Specify the service name parameter     
  --function-name string   Specify the function name parameter                          

Global Options

  -a, --access        Specify key alias.   
  -h, --help          Display help for command.                                           

Examples with Yaml

  $ s metrcis
  $ s <ProjectName> metrcis
  $ s exec -- metrcis --region ch-hangzhou --service-name myService --function-name myFunction

Examples with CLI

  $ s cli fc metrcis --region ch-hangzhou --service-name myService --function-name myFunction

```
