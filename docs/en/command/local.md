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

> ⚠️ Note: This command is dependent on Docker, so when using this command, you need to[Docker installation](https://docs.docker.com/get-started/#download-and-install-docker) 。


## Command description

When you run the `local -h` or the `local --help` command, you can obtain the help documentation.
The local commands include the following subcommands:
 
- [invoke: the command that is used to debug a local event function.](#local-invoke-command)
- [start: the command that is used to debug a local HTTP function.](#local-start-command) 
 

## local invoke command

The `local invoke` command is used to debug a local event function. 

>💡Event functions refer to functions that are triggered by events, instead of HTTP triggers. For example, Object Storage Service (OSS) trigger functions, Alibaba Cloud CDN (CDN) trigger functions, and Tablestore trigger functions are event functions. 

You can run the `local invoke -h` or the `local invoke --help` command to obtain the help documentation.
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

When you run the `local -h` or `local --help` command, you can obtain the following help documentation.

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

If you need to debug an HTTP function by using a custom domain name, you can add the `--custom-domain` parameter before the debugging. Sample output:

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

### Note

Interaction design for `s local start`:

- If there is no customDomains configuration, must use the domain name system path: `/2016-08-15/proxy/serviceName/functionName/`

- The customDomains configuration exists
  1. Specify --custom-domain to use the path configured by the specified domain name
  2. --custom-domain is not specified
    2.1 If there is only one customDomains, directly use the path configured with this domain name
    2.2 If there are multiple domain names, 'interaction' is generated and the configured domain name path is selected

  > To use the system domain name path, use --custom-domain system or select system

## Simulation NAS directory

When nasConfig is configured in YAML, local can emulate the nas directory structure, for example:

s.yaml is configured as follows
````yaml
services:
  helloworld:
    component:  fc
    props:
      region: cn-hangzhou
      service:
        name: hello-world-service
        description: 'hello world by serverless devs'
        vpcConfig: auto
        nasConfig:
          userId: 10003
          groupId: 10003
          mountPoints:
            - serverAddr: xxx.cn-hangzhou.nas.aliyuncs.com
              nasDir: /hello-world-service
              fcDir: /mnt/auto
      function:
        name: event-py3
        description: 'hello world by serverless devs'
        runtime: python3
        codeUri: ./code
        handler: index.handler
        memorySize: 128
        timeout: 60
````

The code/index.py content is as follows
````
# -*- coding: utf-8 -*-
import logging
import os

def handler(event, context):
  logger = logging.getLogger()
  logger.info('============')
  os.system("ls /mnt/auto")
  logger.info('============')
  return 'hello world\n'
````

File `test.ts` is stored in directory `.s/nas/auto-default/hello-world-service`, which is of the same level as file `s.yaml`.The directory structure and execution results are as follows:
<img src="https://img.alicdn.com/imgextra/i2/O1CN01rTAOUC21O8uIqGZU1_!!6000000006974-0-tps-2494-1536.jpg"/>
