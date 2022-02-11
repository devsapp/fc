# Fun2s commands

The `fun2s` command is the command that converts the `template.yaml` recognized by Funcraft DevTools into the `s.yaml` recognized by Serverless Devs.

- [Command description](#command-description)
  - [Parameter description](#parameter-description)
  - [Examples](#Examples)


## Command description

When executing the command `fun2s -h`/`fun2s --help`, you can get help documentation:

```shell script
Fun2s

  Convert the Yaml specification of Funcraft to the Yaml specification of Serverless Devs.

Usage

  s cli fc fun2s <options>
                            
Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/fun2s.md

Options

  --force [Optional] Mandatory overwrite s file
  --region [string] [Optional] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn- shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west- 1/us-west-1/us-east-1/ap-south-1
  --source [string] [Optional] Specify Funcraft configuration path, default: template.yaml/template.yml
  --target [string] [Optional] Specify Serverless Devs configuration path, default: s.yaml

Global Options

  -h, --help [Optional] Help for command
  -a, --access [string] [Optional] Specify key alias
  --debug [Optional] Output debug informations

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/docs/docs/en/yaml_and_cli.md

Examples with CLI

  $ s cli fc fun2s --region cn-shenzhen --target ./s.yml
````

### Parameter description

| Full name of parameter | Abbreviation of parameter | Required in Cli mode | Meaning of parameter |
| -------- | -------- | ------------- | ----------------- ------------------------------------------------------- |
| force | - | Optional | Forcibly overwrite the existing/specified Serverless Devs resource description file |
| region | - | Optional | Region, reads Funcraft's configuration by default. Value range: `cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap -southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east -1, ap-south-1` |
| source | - | Optional | Funcraft's configuration file path (default is `template.yaml`/`template.yml`) |
| target | - | optional | path to the generated Serverless Devs configuration file (default is `s.yaml`) |
| access | a | Optional | The key used in this request can be used via [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/ config.md#config-add-command) configured key information, and [key information configured to environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/ en/command/config.md#Configure key information through environment variables) |
| debug | - | optional | open `debug` mode, will output more log information |
| help | h | Optional | View help information |

### Examples

You can use the `fun2s` command in the Funcraft project directory to implement Yaml specification conversion, for example:

```shell script
s cli fc fun2s --region cn-shenzhen --target ./s.yml

[2021-11-02T19:51:25.418] [INFO ] [FC-TRANSFORM] - Using funcraft yaml: /Users/jiangyu/demo/test/start-fc-http-python3/template.yml
[2021-11-02T19:51:25.429] [INFO ] [FC-TRANSFORM] - Reminder serverless devs yaml path: /Users/jiangyu/demo/test/start-fc-http-python3/s.yml

Tips for next step
=======================
* Deploy Function: s deploy -t ./s.yml
* Invoke Event Function: s local invoke -t ./s.yml
* Invoke HTTP Function: s local start -t ./s.yml
````

At this point, the original Funcraft specification's `template.yaml` can be converted into a `s.yaml` that supports the Serverless Devs specification.

Before conversion (`template.yaml`):

````yaml
ROSTemplateFormatVersion: '2015-09-01'
Transform: 'Aliyun::Serverless-2018-04-03'
Resources:
  start-fc-http-python3:
    Type: 'Aliyun::Serverless::Service'
    Properties:
      Description: 'helloworld'
    start-fc-http-python3:
      Type: 'Aliyun::Serverless::Function'
      Properties:
        Handler: index.handler
        Runtime: nodejs10
        CodeUri: './'
````

After conversion (`s.yaml`):

````yaml
edition: 1.0.0
name: transform_fun
access: default
vars:
  region: cn-shenzhen
services:
  fc-start-fc-http-python3-start-fc-http-python3:
    component: devsapp/fc
    props:
      region: ${vars.region}
      service:
        name: start-fc-http-python3
        description: helloworld
        internetAccess: true
      function:
        name: start-fc-http-python3
        handler: index.handler
        runtime: nodejs10
        codeUri: ./
```` 
