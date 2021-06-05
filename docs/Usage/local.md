# 本地调用操作：Local

阿里云函数计算（FC）组件为使用者提供了FC相关资源本地调用和测试能力。可以通过`local`指令，快速进行本地调用和测试操作。

您可以通过`local -h`/`local --help`参数，唤起帮助信息。例如执行`s local -h`后，可以看到：


```
Local

  Run your serverless application locally for quick development & testing.

Usage

  $ s local <sub-command> 

SubCommand:

  invoke   Local start fc event function, you can get help through [s local invoke -h]
  start    Local invoke fc http function, you can get help through [s local invoke -h]

```



```
Local Invoke

  Local start fc event function 

Usage

  $ s invoke <options> 

Options

  -e, --event <event>              Support Event data(strings) or a file containing event data passed to the     
                                   function during invocation.                                                   
  -f, --event-file <path>          A file containing event data passed to the function during invoke.            
  -s, --event-stdin                Read from standard input, to support script pipeline.                         
  -m, --mode <mode>                Invoke mode, including api, server and normal:                                
                                   - api: start api server for invokeFunction api invoking.                      
                                   - server: start server container for invoking function in the other terminal  
                                   repeatedly.                                                                   
                                   - normal: default mode, invoke event function and then close the container.   
  -c, --config ide/debugger        Select which IDE to use when debugging and output related debug config tips   
                                   for the IDE. Options：'vscode', 'pycharm'.                                     
  -d, --debug-port <port>          Specify the sandboxed container starting in debug mode, and exposing this     
                                   port on localhos.                                                             
  --debug-args <debugArgs>         Additional parameters that will be passed to the debugger                     
  --debugger-path <debuggerPath>   The path of the debugger on the host                                          
  --tmp-dir <tmpDir>               The temp directory mounted to /tmp , default to                               
                                   './.s/tmp/invoke/serviceName/functionName/'                                   

Global Options

  -h, --help    Display help for command. 

Examples with Yaml

  $ s start [--debug-port debugPort] [--config config] 

```


```
Local Start

  Local invoke fc http function 

Usage

  $ s start <options> 

Options

  -c, --config ide/debugger        Select which IDE to use when debugging and output related debug config tips   
                                   for the IDE. Options：'vscode', 'pycharm'.                                     
  -d, --debug-port <port>          Specify the sandboxed container starting in debug mode, and exposing this     
                                   port on localhos.                                                             
  --debug-args <debugArgs>         Additional parameters that will be passed to the debugger                     
  --debugger-path <debuggerPath>   The path of the debugger on the host                                          
  --tmp-dir <tmpDir>               The temp directory mounted to /tmp , default to                               
                                   './.s/tmp/invoke/serviceName/functionName/'                                   

Global Options

  -h, --help    Display help for command. 

Examples with Yaml

  $ s start [--debug-port debugPort] [--config config] 

```
