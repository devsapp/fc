# Info commands

The `info` command is used to view the online resource information about a function. 

- [Command description](#Command-description)
  - [Parameter description](#Parameter-description)
  - [Examples](#Examples)
- [Permissions and policies](#Permissions-and-policies)

## Command description

You can run the `info -h` or `info --help` command to obtain the help documentation:

```shell script
Info

  Query online resource details 

Usage

  s info <options>  
                    
Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/info.md

Options

  --region [string]               [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [string]         [C-Required] Specify the fc service name  
  --function-name [string]        [Optional] Specify the fc function name   
  --trigger-name [string]         [Optional] Specify the fc trigger name   

Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [string]      [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations    

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/docs/docs/en/yaml_and_cli.md

Examples with Yaml

  $ s info               

Examples with CLI

  $ s cli fc info --region region --service-name serviceName --access accessName                                                                    
  $ s cli fc info --region region --service-name serviceName --function-name functionName --trigger-name triggerName  
```

### Parameter description 
 
| Parameter   | Abbreviation | Required in YAML mode | Required in CLI mode | Description                           |
| ------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region    | -    | No      | Yes     | The region of the service. Valid values: `cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, and ap-south-1`. |
| service-name | -    | No      | Yes     | The name of the service.                            |
| function-name | -    | No      | No     | The name of the function.                            |
| trigger-name | -    | No      | No     | The name of the trigger.                            |
| access    | a    | No      | No     | The AccessKey pair that is used in the request. You can use the AccessKey pair that is configured by running the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add-command), or the AccessKey pair that is configured by using [environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Configure the AccessKey pair by using environment variables). |
| debug     | -    | No      | No     | The debug mode. If you enable the `debug` mode, more log information is returned.            |
| help     | h    | No      | No     | The help documentation.                         |

### Examples
 
- **If the resource description file (YAML) exists**, you can run the `s info` command to view the details of your desired function.
- **If the resource description file (YAML) does not exist (only CLI mode available)**, you need to specify the desired service name and desired function name in the command based on your business requirements. Example: `s cli fc info --region cn-hangzhou --service-name fc-deploy-service --function-name http-trigger-py36`.

Sample output: 

```text
fc-deploy-test:
    region: cn-hangzhou
    service:
      name: fc-deploy-service
      internetAccess: true
      role: acs:ram::1583208943291465:role/aliyunfcdefaultrole
      description: demo for fc-deploy component
      logConfig:
        logstore: fc-service-fc-deploy-service-logstore
        project: 1583208943291465-cn-hangzhou-logproject
    function:
      name: http-trigger-py36
      runtime: python3
      handler: index.handler
      timeout: 60
      instanceType: e1
      memorySize: 128
      description: this is a test
      initializationTimeout: 3
      instanceConcurrency: 1
      environmentVariables: {}
    triggers:
      - name: httpTrigger
        type: http
        config:
          qualifier: null
          authType: anonymous
          methods:
            - GET
```

如To query only the details of a service, you need to only specify `--service-name`. For example, if you run the `s cli fc info --region cn-hangzhou --service-name fc-deploy-service` command, the following sample output is returned:

```
region: cn-hangzhou
service:
  name: fc-deploy-service
  internetAccess: true
  role: acs:ram::1583208943291465:role/aliyunfcdefaultrole
  description: demo for fc-deploy component
  logConfig:
    logstore: fc-service-fc-deploy-service-logstore
    project: 1583208943291465-cn-hangzhou-logproject
```

## Permissions and policies

When you use the command, we recommend that you configure the system policy `AliyunFCReadOnlyAccess`.
