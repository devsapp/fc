---
title: Local commands
description: 'Local commands'
position: 1
category: 'Call&Debugging'
---

# Local commands

The `local` commands are used to debug local functions. 

- [Command description](#Command-description)
- [local invoke command](#local-invoke-command)
  - [Parameter description](#Parameter-description)
  - [Example](#Example)
- [local start command](#local-start-command)
  - [Parameter description](#Parameter-description-1)
  - [Example](#Example-1)

> ⚠️ 注意：该命令对 Docker 有所依赖，所以在使用该命令时，需要先进行 [Docker 安装](https://docs.docker.com/get-started/#download-and-install-docker) 。


## Command description

When you run the `local -h` or the `local --help` command, you can obtain the help documentation:

```shell script
Local

  Run your serverless application locally for quick development & testing. 

Usage

  $ s local <sub-command> <options>

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/local.md

SubCommand List

  invoke   Local start fc event function; help command [s local invoke -h]         
  start    Local invoke fc http function; help command [s local start -h]               
```

The local commands include the following subcommands:
 
- [invoke: the command that is used to debug a local event function.](#local-invoke-command)
- [start: the command that is used to debug a local HTTP function.](#local-start-command) 
 

## local invoke command

The `local invoke` command is used to debug a local event function. 

>💡Event functions refer to functions that are triggered by events, instead of HTTP triggers. For example, Object Storage Service (OSS) trigger functions, Alibaba Cloud CDN (CDN) trigger functions, and Tablestore trigger functions are event functions. 

You can run the `local invoke -h` or the `local invoke --help` command to obtain the help documentation: 

```shell script
Local Invoke

  Local invoke fc event function 

Usage

  $ s local invoke <options> 

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/local.md
                               
Options
  -e, --event [string]                [Optional] Event data passed to the function during invocation (default: "")                                                 
  -f, --event-file [string]           [Optional] A file containing event data passed to the function during invoke             
  -s, --event-stdin [string]          [Optional] Read from standard input, to support script pipeline                        
  -m, --mode [api/server/normal]      [Optional] Invoke mode, including api, server and normal:                                
                                       - api: start api server for invokeFunction api invoking                      
                                       - server: start server container for invoking function in the other terminal repeatedly                                                                   
                                       - normal: default mode, invoke event function and then close the container
  -c, --config [vscode/pycharm/idea]  [Optional] Select which IDE to use when debugging and output related debug config tips for the IDE. value: vscode/pycharm/idea                                   
  -d, --debug-port [number]           [Optional] Specify the local function container starting in debug mode, and exposing this port on localhost                                                   
  --debug-args [string]               [Optional] Additional parameters that will be passed to the debugger                     
  --debugger-path [string]            [Optional] The path of the debugger on the host                                          
  --tmp-dir [string]                  [Optional] The temp directory mounted to '/tmp' , default: './.s/tmp/invoke/serviceName/functionName/'                                                            
  --server-port [number]              [Optional] The exposed port of http server, default value is the random port between 7000 and 8000

Global Options

  -h, --help                 [Optional] Help for command             
  --debug                    [Optional] Output debug informations 

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/docs/docs/en/yaml_and_cli.md

Event Format
  
  Quickly obtain the data structures of different events through the command [s cli fc-event -h]


Examples with Yaml

  $ s local invoke --event "hello world!"                                                                                          
```

### Parameter description

| Parameter     | Abbreviation | Required   in YAML mode | Description                                                  |
| ------------- | ------------ | ----------------------- | ------------------------------------------------------------ |
| event         | e            | No                      | The event data  that is passed into the event function. Run the s cli fc-event  command to obtain the sample event data. For more information, click [here](https://github.com/devsapp/fc/blob/main/docs/en/command/invoke.md#Precautions). |
| event-file    | f            | No                      | Pass the event data by  using a file.                        |
| event-stdin   | s            | No                      | Pass the event data by  using standard input.                |
| mode          | m            | No                      | The debugging mode.  Valid values: -normal: By default, the normal mode is used. The container that runs a  local function immediately exits after the local function is invoked. server: The  container that runs a local function does not exit. The container is reused  when users send requests to invoke the local function from another terminal. api: The local  function can be invoked by using SDKs. |
| config        | c            | No                      | The integrated  development environment (IDE) that is used for breakpoint debugging. Valid  values: vscode,  pycharm, and intellij. |
| debug-port    | d            | No                      | The port that is  specified for breakpoint debugging.        |
| debug-args    | -            | No                      | The parameters that  are passed in during breakpoint debugging. |
| debugger-path | q            | No                      | The path that stores  the custom breakpoint debugger.        |
| tmp-dir       | -            | No                      | The local path in  which the /tmp path is mounted in the custom function running environment.  Default value: ./.s/tmp/invoke/serviceName/functionName/ |
| server-port   | -            | No                      | The custom port for listening  server. By default, the port is a random port that ranges from 7000 to  8000. |
| debug         | -            | No                      | The debug mode. If  you enable the debug mode, more log information is output. |
| help          | h            | No                      | Specifies whether to  view the help documentation.           |


### Example

**If a resource description file (YAML) exists,** you can run the `s local invoke` command to debug local functions. Sample output:

```
FC Invoke Start RequestId: 0ba8ac3f-abf8-46d4-b61f-8e0f9f265d6a
2021-11-11T05:45:58.027Z 0ba8ac3f-abf8-46d4-b61f-8e0f9f265d6a [INFO] hello world
FC Invoke End RequestId: 0ba8ac3f-abf8-46d4-b61f-8e0f9f265d6a
hello world

RequestId: 0ba8ac3f-abf8-46d4-b61f-8e0f9f265d6a 	 Billed Duration: 146 ms 	 Memory Size: 128 MB 	 Max Memory Used: 23 MB
```


## local start command

The `local start` command is used to debug local HTTP functions. 

When you run the `local -h` or `local --help` command, you can obtain the following help documentation:

```shell script
Local Start

  Local invoke fc http function 

Usage

  $ s local start <options> 

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/local.md
                               
Options

  -c, --config [vscode/pycharm/idea]      [Optional] Select which IDE to use when debugging and output related debug config tips for the IDE. value: vscode/pycharm/idea
  -d, --debug-port [number]               [Optional] Specify the sandboxed container starting in debug mode, and exposing this port on localhost 
  --custom-domain                         [Optional] Access in the form of custom domain    
  --debug-args [string]                   [Optional] Additional parameters that will be passed to the debugger    
  --debug-path [string]                   [Optional] The path of the debugger on the host   
  --tmp-dir [string]                      [Optional] The temp directory mounted to '/tmp' , default: './.s/tmp/invoke/serviceName/functionName/'                                                            
  --server-port [number]                  [Optional] The exposed port of http server, default value is the random port between 7000 and 8000
Global Options

  -h, --help                 [Optional] Help for command          
  --debug                    [Optional] Output debug informations 

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/docs/docs/en/yaml_and_cli.md

Examples with Yaml

  $ s local start --debug-port 9000 --config vscode                                                                 
```

### Parameter description 
 
| Parameter | Abbreviation | Required in YAML mode | Description | 
| ---------------- | ----- | ----- | ----- | 
| config | c | The IDE that is used for breakpoint debugging. Valid values: `vscode, pycharm, and intellij`. | 
| debug-port | d | No | The port that is specified for breakpoint debugging. | 
| custom-domain | - | No | A custom domain is used as the access URL to access the HTTP server. | 
| debug-args | - | No | The parameters that are passed in during breakpoint debugging. | 
| debugger-path | y | No | The path that stores the custom breakpoint debugger. | 
| tmp-dir | - | No | The local path in which the `/tmp` path is mounted in the custom function running environment on your computer. Default value: `./.s/tmp/invoke/serviceName/functionName/` | 
| server-port | y | No | The custom port for listening the HTTP server. By default, the port ranges from 7000 to 8000. | 
| debug | - | No | The `debug` mode. If you enable the `debug` mode, more logs are output. | 
| help | h | No | The help documentation. | 
 
### Example
 
**If a resource description file (YAML) exists**, you can run the `s local start` command to deploy resources. Sample output: 
 
```text
 	url: http://localhost:7665/2016-08-15/proxy/fc-deploy-service/http-trigger-py36/
	methods: GET
	authType: anonymous

    Tips for more action:
        Start with customDomain method: [s local start auto]
        Debug with customDomain method: [s local start -d 3000 auto]
```

You can view the details about debugging local HTTP functions in a browser by using `url` in the output. 

If you need to debug an HTTP function by using a custom domain name, you can add the `--custom` parameter before the debugging. Sample output:

```
  url: http://localhost:7308/
	methods: GET
	authType: anonymous
```

> Difference between debugging by using the custom domain name and debugging by using the default mode: When you use the HTTP function in Function Compute, two domain names can be used for debugging:
>
> - A domain name that is allocated by Function Compute. Example: `http://localhost:7665/2016-08-15/proxy/fc-deploy-service/http-trigger-py36/`
> - A custom domain name. Example: `http://abc.com/`
>
> For non-custom runtime functions, the two domain names are not distinguished. For custom runtime functions or custom container functions, the difference between a custom runtime function and custom container function is `path`. Take a traditional web framework as an example.
>
> - The basic path matched for the system domain name is `/2016-08-15/proxy/fc-deploy-service/http-trigger-py36/`
> - The basic path matched for the custom domain name can be in all forms, including `/`
>
> The methods to develop or process code vary based on the different paths of the two domain names. If a web framework, such as Express and Django, is used, when the matched path / appears on the homepage. if you use a system domain name, the error code 404 may appear. In this case, we recommend that you use a custom domain name for a more native experience. To meet the requirements of developers who may use system domain names or custom domain names for debugging, the --custom parameter can be added for debugging by using custom domain names. 
>
> If you want to use a custom runtime function or custom container function, use the system domain name for debugging, and leave the basic path unchanged, you can add the header x-fc-invocation-target:2016-08-15/proxy/$ServiceName/$functionName to the HTTP request sent to invoke the HTTP function.



