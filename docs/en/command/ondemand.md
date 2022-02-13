---
title: 	Ondemand commands
description: 'Ondemand commands'
position: 4
category: 'Release&configuration'
---

# Ondemand commands

You can use the `ondemand` command to manage on-demand resources of Function Compute. 

- [Command description](#Command-description)
- [ondemand get command](#ondemand-get-command)
  - [Parameters decription](#Parameters-decription)
  - [Examples](#Examples)
- [ondemand list command](#ondemand-list-command)
  - [Parameters decription](#Parameters-decription-1)
  - [Examples](#Examples-1)
- [ondemand put command](#ondemand-put-command)
  - [Parameters decription](#Parameters-decription-2)
  - [Examples](#Examples-2)
- [remove ondemand command](remove.md#remove-ondemand-command)
- [Permissions and policies](#Permissions-and-policies)

## Command description

You can run the `ondemand -`h or `ondemand --help` command to query the following help information:

```shell script
OnDemand

  Resource on-demand operation 

Usage

  s ondemand <sub-command> <options>

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/ondemand.md

SubCommand List

  get       Get resource on-demand; help command [s ondemand get -h]               
  list      View the list of resource on-demand; help command [s ondemand list -h] 
  put       Put resource on-demand; help command [s ondemand put -h]
```

The ondemand command consists of three subcommands:
 
- [get: Queries the details of on-demand resources.](#ondemand-get-command)
- [list: Queries the lists of on-demand resources.](#ondemand-list-command)
- [put: Publishes or updates configurations of on-demand resources.](#ondemand-put-command)

## ondemand get command

The `ondemand get` command is used to query the details of specified on-demand resources. 
 
You can run the `ondemand get -h` or `ondemand get --help`command to query the following help information:

```shell script
Ondemand get

  Get on-demand configuration 

Usage

  s ondemand get <options>

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/ondemand.md
                               
Options

  --region [string]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1
  --service-name [string]        	  [C-Required] Specify the fc service name  
  --function-name [string]        	  [C-Required] Specify the fc function name  
  --qualifier [string]                [Optional] Specify the qualifier parameter. Only supports LATEST and alias  

Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [string]		 [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations 

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/en/yaml_and_cli.md

Examples with Yaml

  $ s ondemand get --qualifier qualifier 

Examples with CLI

  $ s cli fc ondemand get --region cn-hangzhou --service-name serviceName --function-name functionName --qualifier qualifier 
```

### Parameters decription

| Full   name   | Abbreviation | Required   in YAML mode | Required   in CLI mode | Description                                                  |
| ------------- | ------------ | ----------------------- | ---------------------- | ------------------------------------------------------------ |
| region        | -            | No                      | Yes                    | The  region. Valid values: cn-hangzhou,  cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou,  cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1,  ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1,  eu-west-1, us-west-1, us-east-1, and ap-south-1. |
| service-name  | -            | No                      | Yes                    | The  name of the service.                                    |
| function-name | -            | No                      | Yes                    | The  name of the function.                                   |
| qualifier     | -            | Yes                     | Yes                    | The  version. You can specify LATEST or an alias.            |
| access        | a            | No                      | No                     | The  key that is used in the request. You can use a key that is configured by  using the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add-command), or [a key that is configured in   environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Configure-keys-by-using-environment-variables). |
| debug         | -            | No                      | No                     | Enables  the debug mode to output more log information.      |
| help          | h            | No                      | No                     | Views  the help information.                                 |


### Examples

- **If a YAML resource description file exists,** you can run the `s ondemand get --qualifier qualifier` command to obtain the details of on-demand resources based on a specified version.

- **If no YAML file exists and you use the command-line interface (CLI) mode**, you must specify the region and name of the service. Example: `s cli fc ondemand get --region cn-hangzhou --service-name fc-deploy-service --qualifier qualifier`;

Sample output:

```text
fc-deploy-test: 
  serviceName:          fc-deploy-service
  functionName:         http-trigger-py36
  qualifier:            LATEST
  resource:             services/fc-deploy-service.http-trigger-py36/functions/LATEST
  maximumInstanceCount: 1
```

## ondemand list command

The `ondemand list` command is used to query the lists of on-demand resources. 

You can run the `ondemand list -h` or `ondemand list --help` command to query the following help information:

```shell script
OnDemand list

  View the list of on-demand 

Usage

  s ondemand list <options>

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/ondemand.md
                               
Options

  --region [string]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [string]       	  [C-Required] Specify the fc service name  
  --table                             [Optional] Table format output     

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

  $ s ondemand list 

Examples with CLI

  $ s cli fc ondemand list --region cn-hangzhou --service-name serviceName
```

### Parameters description
 
| Full name   | Abbreviation | Required in YAML mode | Required in CLI mode | Description                           |
| ------------ | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region    | -    | No      | Yes     | The region. Valid values: `cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, and ap-south-1`.|
| service-name | -    | No      | Yes     | The name of the service.                            |
| table    | -    | No      | No     | Exports the query results in a table.                      |
| access    | a    | No      | No     | The key that is used in the request. You can use a key that is configured by using the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add), or [a key that is configured in environment variables.](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Configure-keys-by-using-environment-variables) |
| debug    | -    | No      | No     | Enables the debug mode to output more log information.            |
| help     | h    | No      | No     | Views the help information.                         |
 
### Examples

- **If a YAML resource description file exists**, you can run the `s ondemand list` command to query the lists of on-demand resources.
- **If no YAML file exists and you use the CLI mode**, you must specify the region and name of the service. Example: `s cli fc ondemand list --region cn-hangzhou --service-name fc-deploy-service`

Sample output:

```text
fc-deploy-test: 
  - 
    serviceName:          fc-deploy-service
    qualifier:            http-trigger-py36
    functionName:         LATEST
    resource:             services/fc-deploy-service.http-trigger-py36/functions/LATEST
    maximumInstanceCount: 1
```

Sample output if you specify the `--table` parameter:

```text
  ┌───────────────────┬───────────────────┬──────────────┬──────────────────────┐
  │    serviceName    │     qualifier     │ functionName │ maximumInstanceCount │
  ├───────────────────┼───────────────────┼──────────────┼──────────────────────┤
  │ fc-deploy-service │ http-trigger-py36 │ LATEST       │ 1                    │
  └───────────────────┴───────────────────┴──────────────┴──────────────────────┘
```

## ondemand put command

The `ondemand put` command is used to publish or update an alias. 

You can run the `ondemand put -h` or `ondemand put --help` command to query the following help information:

```shell script
Ondemand put

  Set reserved configuration 

Usage

  s ondemand put <options>

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/ondemand.md
                               
Options

  --region [string]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [string]             [C-Required] Specify the fc service name  
  --function-name [string]            [C-Required] Specify the fc function name  
  --qualifier [string]                [Required] Specify the qualifier parameter. Only supports LATEST and alias  
  --max [string]                      [Required] Specify the maximumInstanceCount parameter  

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

  $ s ondemand put --qualifier pre --max 1                                                       

Examples with CLI

  $ s cli fc ondemand put --region cn-hangzhou --service-name serviceName --function-name functionName --qualifier alias --max 1
```

### Parameters description
 
| Full name   | Abbreviation | Required in YAML mode | Required in CLI mode | Description                           |
| ------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region    | -    | No      | Yes     | The region. Valid values: `cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, and ap-south-1`.|
| service-name | -    | No      | Yes     | The name of the service.                            |
| function-name | -    | No      | No     | The name of the function.                            |
| qualifier   | -    | Yes      | Yes     | The version. You can specify LATEST or an alias.                    |
| max      | -    | Yes      | Yes     | The maximum number of instances.                         |
| access    | a    | No      | No     | The key that is used in the request. You can use a key that is configured by using the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add), or [a key that is configured in environment variables.](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Configure keys in environment variables) |
| debug     | -    | No      | No     | Enables th debug mode to output more log information.            |
| help     | h    | No      | No     | Views the help information.                         |
 
###  Examples
 
- **If a YAML resource description file exists**, you can run the `s ondemand put --qualifier qualifier` command to configure on-demand resources.
- **If no YAML file exists and you use the CLI mode**, you must specify the service name, the service region, and the function name. Example: ` s cli fc ondemand put --qualifier LATEST --max 1`.
 
Sample output:
 

```text
fc-deploy-test: 
  resource:             services/fc-deploy-service.http-trigger-py36/functions/LATEST
  maximumInstanceCount: 1
```

## Permissions and policies

- The `AliyunFCReadOnlyAccess` permission policy is required to run the `ondemand list` or `ondemand get` command.

- The following permission policy is required to run the `ondemand put` command:

  ```yaml
  {
      "Version": "1",
      "Statement": [
          {
              "Action": "fc:PutFunctionOnDemandConfig",
              "Effect": "Allow",
              "Resource": "acs:fc:<region>:<account-id>:services/services/<serviceName>.<qualifier>/functions/<functionName>"
          }
      ]
  }
  ```
