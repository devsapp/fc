# Sync commands

The `sync` commands are used to synchronize online resources to an on-premises machine. 

- [Command description](#Command-description)
  - [Parameter description](#Parameter-description)
  - [Examples](#Examples)
- [Permissions and policies](#Permissions-and-policies)

## Command description

You can run the `sync -h` or `sync --help` command to obtain the help document:

```shell script
Sync

  Synchronize online resources to offline resources 

Usage

  s sync <options>  

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/sync.md                  

Options
 
  --region [string]               [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1  
  --service-name [string]         [C-Required] Specify the fc service name  
  --function-name [string]        [Optional] Specify the fc function name   
  --trigger-name [string]         [Optional] Specify the fc trigger name, multiple triggers can be specified using [--trigger-name name1 --trigger-name name2]                                                        
  --target-dir [string]           [Optional] Specify storage directory, default: current dir                                
  --type [code/config]            [Optional] Operation type, value: code/config
  -f, --force                     [Optional] Mandatory overwrite code file                                  

Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [string]   [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations            

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/docs/docs/en/yaml_and_cli.md

Examples with Yaml

  $ s sync                                                                                  

Examples with CLI

  $ s cli fc sync --region cn-shanghai --service-name serviceName --type config 
```

### Parameter description
 
| Parameter   | Abbreviation | Required in YAML mode | Required in CLI mode | Description                           |
| ------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region    | -    | No      | No      | The name of the region. Valid values: `cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | -    | No      | Yes     | The name of the service.                            |
| function-name | -    | No      | No     | The name of the function.                            |
| trigger-name | -    | No      | No     | The name of the trigger.                           |
| target-dir  | -    | No      | No     | The destination directory.                           |
| type     | -    | No      | No     | The type of the synchronization. You can synchronize code and configurations. By default, both code and configurations are synchronized. Valid values: `code` and `config` |
| access    | a    | No      | No     | The key information that is used in the request. You can use the key information that is configured by using the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add-command), or use the [Configure-keys-by-using-environment-variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Configure-keys-by-using-environment-variables). |
| debug     | -    | No      | No     | Enables the `debug` mode. In this case, more logs are generated.            |
| help     | h    | No      | No     | Views the help information.                         |
 
### Examples
 
- **If a resource description file (YAML) is available,** you can run the `s sync` command to synchronize online resources to a local machine.
- **In the CLI mode (no YAML),** you must specify the names of the service and function. For example, `s cli fc sync --region cn-hanghzou --service-name fc-deploy-service --function-name http-trigger-py36`.
 
Example output:
 

```text
fc-deploy-test: 
  codeFiles:  
  	http-trigger-py36: /Users/jiangyu/demo/test/start-fc-http-python3/1583208943291465_cn-hangzhou_fc-deploy_service_http-trigger-py36
  configYmlPath: /Users/jiangyu/demo/test/start-fc-http-python3/s.cn-hangzhou-fc-deploy-service.sync.yaml
```

## Permissions and policies

We recommend that you use the `AliyunFCReadOnlyAccess` policy when you use this command.
