---
title: Remove commands
description: 'Remove commands'
position: 3
category: 'Build&Deploy'
---
# Remove commands

The `remove` commands are used to remove resources that are deployed. 

- [Command description](#Command description)
  - [Parameter description](#Parameter-description)
  - [Examples](#Examples)
- [remove service command](#remove-service-command)
  - [Parameter description](#Parameter-description-1)
  - [Examples](#Examples-1)
- [remove function command](#deploy-function-command)
  - [Parameter description](#Parameter-description-2)
  - [Examples](#Examples-2)
- [remove trigger command](#remove-trigger-command)
  - [Parameter description](#Parameter-description-3)
  - [Examples](#Examples-3)
- [remove domain command](#remove-domain-command)
  - [Parameter description](#Parameter-description-4)
  - [Examples](#Examples-4)
- [remove version command](#remove-version-command)
  - [Parameter description](#Parameter-description-5)
  - [Examples](#Examples-5)
- [remove alias command](#remove-alias-command)
  - [Parameter description](#Parameter-description-6)
  - [Examples](#Examples-6)
- [remove provision command](#remove-provision-command)
  - [Parameter description](#Parameter-description-7)
  - [Examples](#Examples-7)
- [remove ondemand command](#remove-ondemand-command)
  - [Parameter description](#Parameter-description-8)
  - [Examples](#Examples-8)
- [remove layer command](#remove-layer-command)
  - [Parameter description](#Parameter-description-9)
  - [Examples](#Examples-9)
- [权限与策略说明](#权限与策略说明)

>  ⚠️ Note: **Resources may not be restored once they are removed. Proceed with caution when you run the remove commands.**


## Command description

You can run the `remove -h` or `remove --help` command to obtain the help documentation for the remove commands:

```shell script
Remove

  The ability to delete resources                                                       

Usage

  $ s remove <options>
  $ s remove <sub-command> <options>

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/remove.md

Options
                              
  -y, --assume-yes        [Optional] Assume that the answer to any question which would be asked is yes 

Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [string]   	 [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations 

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/docs/docs/en/yaml_and_cli.md

SubCommand 
  service    Remove service resources; help command [s remove service -h]                                                        
  function   Remove function resources; help command [s remove function -h]                                                       
  trigger    Only remove trigger resources; help command [s remove trigger -h]                                                        
  domain     Only remove domain resources; help command [s remove domain -h] 
  version    Only remove version resources; help command [s remove version -h] 
  alias      Only remove alias resources; help command [s remove alias -h] 
  provision  Only remove provision resources; help command [s remove provision -h] 
  ondemand   Only remove ondemand resources; help command [s remove ondemand -h] 
  layer      Only remove layer resources; help command [s remove layer -h] 

Examples with Yaml

  $ s remove
```


The remove commands consist of nine subcommands: 
 
- [service: deletes a specified service.](#remove-service-command)
- [function: deletes a specified function.](#remove-function-command)
- [trigger: deletes a specified trigger.](#remove-trigger-command)
- [domain: deletes a specified domain name.](#remove-domain-command)
- [version: deletes a specified version.](#remove-version-command)
- [alias: deletes a specified alias.](#remove-alias-command)
- [provision: deletes specified reserved resources.](#remove-provision-command)
- [ondemand: deletes specified on-demand resources.](#remove-ondemand-command)
- [layer: deletes versions of a specified layer.](#remove-layer-command)
 


### Parameter description
 
 | Parameter  | Abbreviation | Required in YAML mode | Description                           |
 | ---------- | -------- | -------------- | ------------------------------------------------------------ |
 | assume-yes | y    | No      | By default, `y` is selected.                     |
 | access   | a    | No      | The AccessKey pair that is used in the request. You can use the AccessKey pair that is configured by running the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add-command), or [the AccessKey pair that is configured by using environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Configure-keys-by-using-environment-variables). |
 | debug   | -    | No      | The debug mode. If you enable the `debug` mode, more log information is returned.            |
 | help    | h    | No      | Views the help documentation.                         |
 
### Examples
 
**If the resource description file (YAML) exists**, you can run the `s remove` command to delete resources. Sample command output: 
 
```text
Service [myService] deleted successfully.
Function [myFunction] deleted successfully.
```

> ⚠️ Note:
> - Executing `s remove` is equivalent to executing `s remove ondemand`, `s remove provision`, `s remove alias`, `s remove version`, `s remove trigger`, `s remove function`, `s remove in sequence service`;
> - If the parameter `-y`/`--assume-yes` is used, then there will be no interactive **forced deletion** of **all resources** under the service, please use this parameter with caution;
> Case: If there is a service in Shanghai area, there are two functions under the service, and only the service and one of the functions are configured in Yaml
> - If `s remove` is executed, it will prompt the next two functions of this service, whether to delete all functions;
> - If `s remove -y` is executed, both functions and services are forcibly removed;
> - If you just want to remove the current Yaml-declared function, you can do `s remove function`

## remove service command

You can run the `remove service` command to delete a specified service. 

You can run the `remove service -h` or `remove service --help` command to obtain the help documentation for the remove service command:

```shell script
Remove service

  Delete service

Usage

  s remove service <options>  

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/remove.md
                           
Options

  --region [string]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [string]             [C-Required] Specify the fc service name  
  -y, --assume-yes                    [Optional] Assume that the answer to any question which would be asked is yes              

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

  $ s remove service

Examples with CLI

  $ s cli fc remove service --region cn-hangzhou --service-name serviceName
```

### Parameter description
 
 | Parameter   | Abbreviation | Required in YAML mode | Required in CLI mode | Description                           |
 | ------------ | -------- | -------------- | ------------- | ------------------------------------------------------------ |
 | region    | -    | No      | Yes     | The region of the service. Valid values: `cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, and ap-south-1`. |
 | service-name | -    | No      | Yes      | The name of the service.                            |
 | assume-yes  | y    | No      | No     | By default, `y` is selected.                            |
 | access    | a    | No      | No     | The AccessKey pair that is used in the request. You can use the AccessKey pair that is configured by running the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add-command), or [the AccessKey pair that is configured by using environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Configure-keys-by-using-environment-variables). |
 | debug    | -    | No      | No     | The debug mode. If you enable the `debug` mode, more log information is returned.            |
 | help     | h    | No      | No     | Views the help documentation.                         |
 
### Examples
 
- **If the resource description file (YAML) exists**, you can run the `s remove service` command to delete the specified service.
- **If the resource description file (YAML) does not exist (only the CLI mode is available)**, you need to specify the region and the name of the service. Example: `s cli fc remove service --region cn-hangzhou --service-name fc-deploy-service`.
 
Sample command output: 

```text
Service [fc-deploy-service] deleted successfully.
```

## remove function commands

The `remove function` command is a command to delete the specified function.

When executing the command `remove function -h`/`remove function --help`, you can get help documentation:

```shell script
Remove function

  Delete function

Usage

  s remove function <options>  

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/remove.md

Options

  --region [string]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [string]             [C-Required] Specify the fc service name  
  --function-name [string]            [C-Required] Specify the fc function name  
  -y, --assume-yes                    [Optional] Assume that the answer to any question which would be asked is yes              

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

  $ s remove function

Examples with CLI

  $ s cli fc remove function --region cn-hangzhou --service-name serviceName --function-name functionName
```

### Parameter description
 
 | Parameter   | Abbreviation | Required in YAML mode | Required in CLI mode | Description                           |
 | ------------ | -------- | -------------- | ------------- | ------------------------------------------------------------ |
 | region    | -    | No      | Yes     | The region of the service. Valid values: `cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, and ap-south-1`. |
 | service-name | -    | No      | Yes     | The name of the service.                            |
 | function-name | -    | No      | Yes     | The name of the function.                            |
 | assume-yes  | y    | No      | No     | By default, `y` is selected.                            |
 | access    | a     | No      | No     | The AccessKey pair that is used in the request. You can use the AccessKey pair that is configured by running the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add-command), or [the AccessKey pair that is configured by using environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Configure-keys-by-using-environment-variables). |
 | debug    | -    | No      | No     | The debug mode. If you enable the `debug` mode, more log information is returned.            |
 | help     | h    | No      | No     | Views the help documentation.                         |
 
### Examples
 
- **If the resource description file (YAML) exists**, you can run the `s remove function` command to delete the specified function. 
- **If the resource description file (YAML) does not exist (only the CLI mode is available)**, you need to specify the region and the name of the service. Example: `s cli fc remove function --region cn-hangzhou --service-name fc-deploy-service --function-name fc-deploy-function`.
 
Sample command output: 

```text
Function [fc-deploy-function] deleted successfully.
```

## remove trigger command

The `remove trigger` command is a command to delete the specified trigger.

When executing the command `remove trigger -h`/`remove trigger --help`, you can get help documentation:


```shell script
Remove trigger

  Delete trigger

Usage

  s remove trigger <options>  

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/remove.md
                           
Options

  --region [string]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [string]             [C-Required] Specify the fc service name  
  --function-name [string]            [C-Required] Specify the fc function name  
  --trigger-name [string]             [C-Required] Specify the fc trigger name  
  -y, --assume-yes                    [Optional] Assume that the answer to any question which would be asked is yes              

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

  $ s remove trigger

Examples with CLI

  $ s cli fc remove trigger --region cn-hangzhou --service-name serviceName --function-name functionName --trigger-name triggerName
```

### Parameter description
 
 | Parameter   | Abbreviation | Required in YAML mode | Required in CLI mode | Description                           |
 | ------------ | -------- | -------------- | ------------- | ------------------------------------------------------------ |
 | region    | -    | No      | Yes     | The region of the service. Valid values: `cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, and ap-south-1`. |
 | service-name | -    | No      | Yes     | The name of the service.                            |
 | function-name | -    | No      | Yes     | The name of the function.                            |
 | trigger-name | -    | No      | Yes     | The name of the trigger.                            |
 | assume-yes  | y    | No      | No     | By default, `y` is selected.                            |
 | access    | a    | No      | No     | The AccessKey pair that is used in the request. You can use the AccessKey pair that is configured by running the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add-command), or [the AccessKey pair that is configured by using environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Configure-keys-by-using-environment-variables). |
 | debug    | -    | No      | No     | The debug mode. If you enable the `debug` mode, more log information is returned.             |
 | help     | h    | No      | No     | Views the help documentation.                         |
 
### Examples
 
- **If the resource description file (YAML) exists**, you can run the `s remove trigger` command to delete all triggers that are configured in the resource description file (YAML). You can configure the `--trigger-name triggerName` parameter to specify the trigger that you want to delete. 
- **If the resource description file (YAML) does not exist (only the CLI mode is available)**, you need to specify the region and the name of the service. Example: `s cli fc remove trigger --region cn-hangzhou --service-name fc-deploy-service --function-name fc-deploy-function --trigger-name fc-deploy-trigger`. 
 
Sample command output: 

```text
Trigger [fc-deploy-trigger] deleted successfully.
```

## remove domain command

The `remove domain` command is a command to delete the specified custom domain name.

When executing the command `remove domain -h`/`remove domain --help`, you can get help documentation:

```shell script
Remove domain

  Delete domain

Usage

  s remove domain <options>  

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/remove.md
                           
Options

  --region [string]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --domain [string]                   [C-Required] Specify the fc custom domain  
  -y, --assume-yes                    [Optional] Assume that the answer to any question which would be asked is yes              

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

  $ s remove domain

Examples with CLI

  $ s cli fc remove domain --region cn-hangzhou --domain anycodes.cn
```

### Parameter description
 
 | Parameter   | Abbreviation | Required in YAML mode | Required in CLI mode | Description                           |
 | ------------ | -------- | -------------- | ------------- | ------------------------------------------------------------ |
 | region    | -    | No      | Yes     | The region of the service. Valid values: `cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, and ap-south-1`. |
 | domain | -    | No      | Yes     | The custom domain name.                            |
 | assume-yes  | y    | No      | No     | By default, `y` is selected.                            |
 | access    | a    | No      | No     | The AccessKey pair that is used in the request. You can use the AccessKey pair that is configured by running the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add-command), or [the AccessKey pair that is configured by using environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Configure-keys-by-using-environment-variables). |
 | debug    | -    | No      | No     | The debug mode. If you enable the `debug` mode, more log information is returned.            |
 | help     | h    | No      | No     | Views the help documentation.                         |
 
### Examples
 
- **If the resource description file (YAML) exists**, you can run the `s remove domain` command to delete all custom domain names that are configured in the resource description file (YAML). You can configure the `--domain domain` parameter to specify the custom domain name that you want to delete. 
- **If the resource description file (YAML) does not exist (only the CLI mode is available)**, you need to specify the region and the name of the service. Example: `s cli fc remove domain --region cn-hangzhou --domain anycodes.cn`. 
 
 Sample command output: 
```text
Custom domain [anycodes.cn] deleted successfully.
```

## remove version command

The `remove version` command is a command for the user to delete the specified released version.

When executing the command `remove version -h`/`remove version --help`, you can get help documentation:

```shell script
Remove version

  Delete service version 

Usage

  s remove version <options>  

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/remove.md
                           
Options

  --region [string]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [string]             [C-Required] Specify the fc service name  
  --version-id [number]               [Required] The version Id                   

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

  $ s remove version --version-id 1

Examples with CLI

  $ s cli fc remove version --region cn-hangzhou --service-name serviceName --version-id 1
```

### Parameter description
 
 | Parameter   | Abbreviation | Required in YAML mode | Required in CLI mode | Description                           |
 | ------------ | -------- | -------------- | ------------- | ------------------------------------------------------------ |
 | region    | -    | No      | Yes     | The region of the service. Valid values: `cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, and ap-south-1`. |
 | service-name | -    | No      | Yes     | The name of the service.                            |
 | version-id  | -    | Yes      | Yes     | The ID of the version.                            |
 | access    | a    | No      | No     | The AccessKey pair that is used in the request. You can use the AccessKey pair that is configured by running the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add-command), or [the AccessKey pair that is configured by using environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Configure-keys-by-using-environment-variables). |
 | debug    | -    | No      | No     | The debug mode. If you enable the `debug` mode, more log information is returned.            |
 | help     | h    | No      | No     | Views the help documentation.                         |
 
### Examples
 
- **If the resource description file (YAML) exists**, you can run the `s remove version --version-id versionId` command to delete the version with the specified `versionId`.
- **If the resource description file (YAML) does not exist (only the CLI mode is available)**, you need to specify the region and the name of the service. Example: `s cli fc remove version --region cn-hangzhou --service-name fc-deploy-service --version-id 1`. 
 
Sample command output: 
 
```text
VersionId [1] deleted successfully.
```



## remove alias command

The `remove alias` command is a command to remove the specified service alias.

When executing the command `remove alias -h`/`remove alias --help`, you can get help documentation:

```shell script
Remove alias

  Delete alias 

Usage

  s remove alias <options> 

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/remove.md
                               
Options

  --region [string]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [string]        	  [C-Required] Specify the fc service name  
  --alias-name [string]            	  [Required] Specify the fc alias name 

Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [string]      [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations 

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/en/yaml_and_cli.md

Examples with Yaml

  $ s remove alias --alias-name aliasName 

Examples with CLI

  $ s cli fc remove alias --region cn-hangzhou --service-name serviceName --alias-name aliasName 
```

### Parameter description
 
 | Parameter   | Abbreviation | Required in YAML mode | Required in CLI mode | Description                           |
 | ------------ | -------- | -------------- | ------------- | ------------------------------------------------------------ |
 | region    | -    | No      | Yes     | The region of the service. Valid values: `cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, and ap-south-1`. |
 | service-name | -     | No      | Yes     | The name of the service.                            |
 | alias-name  | -    | Yes      | Yes     | The alias of the service.                             |
 | access    | a    | No      | No     | The AccessKey pair that is used in the request. You can use the AccessKey pair that is configured by running the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add-command), or [the AccessKey pair that is configured by using environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Configure-keys-by-using-environment-variables). |
 | debug    | -    | No      | No     | The debug mode. If you enable the `debug` mode, more log information is returned.            |
 | help     | h    | No      | No     | Views the help documentation.                         |
 
### Examples
 
- **If the resource description file (YAML) exists**, you can run the `s remove alias --alias-name aliasName` command to delete the specified alias. 
- **If the resource description file (YAML) does not exist (only the CLI mode is available)**, you need to specify the region and the name of the service. Example: `s cli fc remove alias --region cn-hangzhou --service-name fc-deploy-service --alias-name pre`. 
 
Sample command output: 
 
```text
AliasName [pre] deleted successfully.
```

## remove provision commans

The `remove provision` command is a command to remove reserved resources.

When executing the command `remove provision -h`/`remove provision --help`, you can get help documentation:

```shell script
Remove provision

  Delete provision 

Usage

  s remove provision <options>
                
Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/remove.md
                           
Options
    
  --region [string]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [string]             [C-Required] Specify the fc service name  
  --function-name [string]            [C-Required] Specify the fc function name                         
  --qualifier string                  [Required] Specify the qualifier parameter. Only supports LATEST and alias                           

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

  $ s remove provision --qualifier alias

Examples with CLI

  $ s cli fc remove provision --region cn-hangzhou --service-name serviceName --function-name functionName --qualifier alias   
```

### Parameter description
 
 | Parameter   | Abbreviation | Required in YAML mode | Required in CLI mode | Description                           |
 | ------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
 | region    | -    | No      | Yes     | The region of the service. Valid values: `cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, and ap-south-1`. |
 | service-name | -    | No      | Yes     | The name of the service.                            |
 | function-name | -    | No      | Yes     | The name of the function.                           |
 | qualifier   |     | No      | No     | The version or alias of the service. Only LATEST is supported for the version. If you specify a value for the `qualifier` parameter, only reserved resources that are specified by using the `qualifier` parameter are deleted. If you do not specify a value for the `qualifier` parameter, reserved resources of all versions of the service are deleted.          |
 | access    | a    | No      | No     | The AccessKey pair that is used in the request. You can use the AccessKey pair that is configured by running the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add-command), or [the AccessKey pair that is configured by using environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Configure-keys-by-using-environment-variables). |
 | debug     | -    | No      | No     | The debug mode. If you enable the `debug` mode, more log information is returned.            |
 | help     | h    | No      | No     | Views the help documentation.                         |
 
### Examples
 
- **If the resource description file (YAML) exists**, you can run the `s remove provision --qualifier qualifier` command to delete the reserved instances. 
- **If the resource description file (YAML) does not exist (only the CLI mode is available)**, you need to specify the region and the name of the service. Example: `s cli fc remove provision --region cn-hangzhou --service-name fc-deploy-service --qualifier release`. 
 
Sample command output: 
 
```text
Proivision qualifier [release] deleted successfully.
```


## remove ondemand command

The `remove ondemand` command is a command to delete the ondemand resource of the specified function.

When executing the command `remove ondemand -h`/`remove ondemand --help`, you can get help documentation:

```shell script
Remove ondemand

  Delete ondemand resouece

Usage

  s remove ondemand <options> 

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/remove.md
                               
Options

  --region [string]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [string]        	  [C-Required] Specify the fc service name  
  --function-name [string]        	  [C-Required] Specify the fc function name  
  --qualifier [string]            	  [Required] If qualifier is specified, only all onDemand resources under this alias will be cleared; if not specified, all versions of onDemand resources under this service will be cleared       

Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [string]      [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations 

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/en/yaml_and_cli.md

Examples with Yaml

  $ s remove ondemand

Examples with CLI

  $ s cli fc remove ondemand --region cn-hangzhou --service-name serviceName
```

### Parameter description
 
 | Parameter   | Abbreviation | Required in YAML mode | Required in CLI mode | Description                           |
 | ------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
 | region    | -    | No      | Yes     | The region of the service. Valid values: `cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, and ap-south-1`. |
 | service-name | -    | No      | Yes     | The name of the service.                            |
 | function-name | -    | Yes      | Yes     | The name of the function.                            |
 | qualifier   | -    | No      | No      | The version or alias of the service. Only LATEST is supported for the version. If you specify a value for the `qualifier` parameter, only on-demand resources that are specified by using the `qualifier` parameter are deleted. If you do not specify a value for the `qualifier` parameter, on-demand resources of all versions of the service are deleted. |
 | access    | a    | No      | No     | The AccessKey pair that is used in the request. You can use the AccessKey pair that is configured by running the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add-command), or [the AccessKey pair that is configured by using environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Configure-keys-by-using-environment-variables). |
 | debug     | -    | No      | No     | The debug mode. If you enable the `debug` mode, more log information is returned.            |
 | help     | h    | No      | No     | Views the help documentation.                         |
 
### Examples
 
- **If the resource description file (YAML) exists**, you can run the `s remove ondemand` command to delete the specified on-demand resources. 
- **If the resource description file (YAML) does not exist (only the CLI mode is available)**, you need to specify the region and the name of the service. Example: `s cli fc remove ondemand`. 
 
Sample command output: 

```text
Ondemand [*] deleted successfully.
```


## remove layer command

The `remove layer` command is a command to remove the specified layer version.

When executing the command `remove layer -h`/`remove layer --help`, you can get help documentation:

```shell script
Remove layer

  Delete layer 

Usage

  s remove layer <options>
                
Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/remove.md
                           
Options
    
  --region [string]            [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --layer-name [string]        [Required] Delete all versions of the specified layer     
  --version-id [number]        [Optional] Only delete the version of the specified layer                           

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

  $ s layer delete --layer-name layerName

Examples with CLI

  $ s cli fc layer delete --region cn-hangzhou --layer-name layerName
```

### Parameter description
 
 | Parameter  | Abbreviation | Required in YAML mode | Required in CLI mode | Description                           |
 | ---------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
 | region   | -    | No      | Yes     | The region of the service. Valid values: `cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, and ap-south-1`. |
 | layer-name | -    | No      | Yes     | The name of the layer.                            |
 | version-id | -    | No      | No      | The version that you want to delete. If you specify a value for the --version-id parameter, only the version that is specified by using the --version-id parameter is deleted. If you do not specify a value for the --version-id parameter, all versions of the specified layer are deleted. |
 | access   | a    | No      | No     | The AccessKey pair that is used in the request. You can use the AccessKey pair that is configured by running the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add-command), or [the AccessKey pair that is configured by using environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Configure-keys-by-using-environment-variables). |
 | debug   | -    | No      | No     | The debug mode. If you enable the `debug` mode, more log information is returned.            |
 | help    | h    | No      | No     | Views the help documentation.                         |
 
### Examples
 
- **If the resource description file (YAML) exists**, you can run the `s remove layer --layer-name layerName` command to delete all versions of the specified layer.
- **If the resource description file (YAML) does not exist (only the CLI mode is available)**, you need to specify the region of the service. Example: `s cli fc remove layer --region cn-hangzhou --layer-name demo`. 
 
Sample command output: 

```text
Layer [demo] deleted successfully.
```

## Permissions and policies

- `s remove`/`s remove service`：
    ````json
    {
        "Statement": [
            {
                "Action": [
                    "fc:ListOnDemandConfigs",
                    "fc:DeleteFunctionOnDemandConfig",
                    "fc:ListProvisionConfigs",
                    "fc:PutProvisionConfig",
                    "fc:ListAliases",
                    "fc:DeleteAlias",
                    "fc:ListServiceVersions",
                    "fc:DeleteServiceVersion",
                    "fc:ListTriggers",
                    "fc:DeleteTrigger",
                    "fc:ListFunctions",
                    "fc:DeleteFunction",
                    "fc:DeleteService"
                ],
                "Effect": "Allow",
                "Resource": "*"
            }
        ],
        "Version": "1"
    }
    ````
- `s remove function`：
    ````json
    {
        "Statement": [
            {
                "Action": [
                    "fc:ListTriggers",
                    "fc:DeleteTrigger",
                    "fc:DeleteFunction"
                ],
                "Effect": "Allow",
                "Resource": "*"
            }
        ],
        "Version": "1"
    }
    ````
- `s remove trigger`：
    ````json
    {
        "Statement": [
            {
                "Action": [
                    "fc:DeleteTrigger"
                ],
                "Effect": "Allow",
                "Resource": "*"
            }
        ],
        "Version": "1"
    }
    ````
- `s remove version`：
    System policy：`AliyunFCReadOnlyAccess`   
    ```json
    {
        "Version": "1",
        "Statement": [
            {
                "Action": "fc:DeleteServiceVersion",
                "Effect": "Allow",
                "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>/versions/<version-id>"
            }
        ]
    }
    ```
- `s remove provision`：
    System policy：`AliyunFCReadOnlyAccess`   
    ```json
    {
        "Version": "1",
        "Statement": [
            {
                "Action": "fc:PutProvisionConfig",
                "Effect": "Allow",
                "Resource": "acs:fc:<region>:<account-id>:services/services/<serviceName>.<qualifier>/functions/<functionName>"
            }
        ]
    }
    ```
- `s remove ondemand`：
    System policy：`AliyunFCReadOnlyAccess`
    ```yaml
    {
        "Version": "1",
        "Statement": [
            {
                "Action": "fc:DeleteFunctionOnDemandConfig",
                "Effect": "Allow",
                "Resource": "acs:fc:<region>:<account-id>:services/services/<serviceName>.<qualifier>/functions/<functionName>"
            }
        ]
    }
    ```
- `s remove layer`：
    System policy：`AliyunFCReadOnlyAccess`
    ````json
  {
      "Version": "1",
      "Statement": [
          {
              "Action": "fc:DeleteLayerVersion",
              "Effect": "Allow",
              "Resource": "acs:fc:<region>:<account-id>:layers/<layerName>/versions/*"
          }
      ]
  }
    ````
