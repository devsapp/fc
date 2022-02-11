# Alias commands

The `alias` commands are used to perform operations on the aliases of functions. For example, you can run the alias commands to view, publish, change, and delete aliases. 

- [Command description](#Command-description)
- [alias get command](#alias-get-command)
  - [Parameter description](#Parameter-description)
  - [Examples](#Examples)
- [alias list command](#alias-list-command)
  - [Parameter description](#Parameter-description-1)
  - [Examples](#Examples-1)
- [alias publish command](#alias-publish-command)
  - [Parameter description](#Parameter-description-2)
  - [Examples](#Examples-2)
  - [Logic of the master version number](#Logic-of-the-master-version-number)
- [remove alias command](remove.md#remove-alias-command)
- [Permissions and policies](#Permissions-and-policies)

## Command description

You can run the `alias -h` or `alias --help` command to obtain the following information about the relevant help documentation:

```shell script
Alias

  Service alias operation 

Usage

  s alias <sub-command> <options>

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/alias.md

SubCommand List

  get       Get alias details; help command [s alias get -h]               
  list      View the list of alias; help command [s alias list -h] 
  publish   Publish alias; help command [s alias publish -h]  
```


The sample code contains the following subcommands:

- [get: obtains the details of the specified alias of a service.](#alias-get-command)
- [list: obtains the details of aliases in a table.](#alias-list-command)
- [publish: publishes or updates an alias.](#alias-publish-command)

## alias get command

You can run the `alias get` command to obtain the details of the specified alias of a service. 

 You can run the `alias get -h` or `alias get --help` command to obtain the following information about the relevant help documentation:

```shell script
Alias get

  Get alias details 

Usage

  s alias get <options> 

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/alias.md
                               
Options

  --region [string]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1
  --service-name [string]        	  [C-Required] Specify the fc service name  
  --alias-name [string]               [Required] Specify the fc alias name 

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

  $ s alias get --alias-name aliasName

Examples with CLI

  $ s cli fc alias get --region cn-hangzhou --service-name serviceName --alias-name aliasName
```

### Parameter description

| Parameter    | Abbreviation | Required   in YAML mode | Required   in CLI mode | Description                                                  |
| ------------ | ------------ | ----------------------- | ---------------------- | ------------------------------------------------------------ |
| region       | -            | No                      | Yes                    | The region. Valid  values: cn-hangzhou,  cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou,  cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1,  ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1,  eu-west-1, us-west-1, us-east-1, and ap-south-1. |
| service-name | -            | No                      | Yes                    | The name of the  service.                                    |
| alias-name   | -            | Yes                     | Yes                    | The name of the alias.                                       |
| access       | a            | No                      | No                     | The AccessKey pair  that is used in the request. You can use the AccessKey pair that is  configured by running the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add-命令) or by using [environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#通过环境变量配置密钥信息). |
| debug        | -            | No                      | No                     | The debug mode. If  you enable the dedug mode, more logs are returned. |
| help         | h            | No                      | No                     | Views the help  information.                                 |

### Examples

- **If the YAML description file of resources exist**, you can run the `s alias get --alias-name aliasName` command to obtain the details of the specified alias.
- **If the YAML description file of resources do not exist (In CLI mode)**, you need to specify the region and the name of the service in the alias get command. Example: `s cli fc alias get --region cn-hangzhou --service-name fc-deploy-service --alias-name pre`.

The following sample code shows the command output:

```text
fc-deploy-test: 
  aliasName:               pre
  versionId:               1
  description:             test publish version
  additionalVersionWeight: 
  createdTime:             2021-11-08T06:51:36Z
  lastModifiedTime:        2021-11-08T06:54:02Z
```

## alias list command

You can run the `alias list` command to obtain the details of aliases in a table. 

You can run the `alias list -h` or `alias list --help` to obtain the following information about the relevant help documentation:

```shell script
Alias list

  View the list of service alias 

Usage

  s alias list <options>   

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/alias.md
                               
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

  $ s alias list 

Examples with CLI

  $ s cli fc alias list --region cn-hangzhou --service-name serviceName
```

### Parameter description

| Parameter    | Abbreviation | Required in YAML mode | Required in CLI mode | Description                                                  |
| ------------ | ------------ | --------------------- | -------------------- | ------------------------------------------------------------ |
| region       | -            | No                    | Yes                  | The region. Valid values: `cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, and ap-south-1`. |
| service-name | -            | No                    | Yes                  | The name of the service.                                     |
| table        | -            | No                    | No                   | Specifies whether the details of the aliases are returned in a table. |
| access       | a            | No                    | No                   | The AccessKey pair that is used in this request. You can use the AccessKey pair that is configured by running the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add-command) or [the AccessKey pair that is configured by using environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Configure the AccessKey pair by using environment variables). |
| debug        | -            | No                    | No                   | The `debug` mode. If you enable the debug mode, more logs are returned. |
| help         | h            | No                    | No                   | Views the help information.                                  |


### Examples
 
- **If the YAML description file of resources exist**, you can run the `s alias list` command to obtain the details of aliases in a table.
- **If the YAML description file of resources do not exist (In CLI mode)**, you need to specify the region and the name of the service in the alias list command. Example: `s cli fc alias list --region cn-hangzhou --service-name fc-deploy-service`.
 
The following sample code shows the command output:

```text
fc-deploy-test: 
  - 
    aliasName:               pre
    versionId:               1
    description:             test publish version
    additionalVersionWeight: 
    createdTime:             2021-11-08T06:51:36Z
    lastModifiedTime:        2021-11-08T06:54:02Z
```

When the `--table` parameter is specified, the following command output is returned:

```text
  ┌───────────┬───────────┬──────────────────────┬──────────────────────┬──────────────────────┬─────────────────────────┐
  │ aliasName │ versionId │     description      │     createdTime      │   lastModifiedTime   │ additionalVersionWeight │
  ├───────────┼───────────┼──────────────────────┼──────────────────────┼──────────────────────┼─────────────────────────┤
  │ pre       │ 1         │ test publish version │ 2021-11-08T06:51:36Z │ 2021-11-08T06:54:02Z │                         │
  └───────────┴───────────┴──────────────────────┴──────────────────────┴──────────────────────┴─────────────────────────┘
```

## alias publish command

You can run the `alias publish` command to publish or update an alias. 

You can run the `alias publish -h` or `alias publish --help` command to obtain the following information about the relevant help documentation:

```shell script
Alias publish

  Publish service alias 

Usage

  s alias publish <options>  

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/alias.md
                               
Options

  --region [string]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [string]             [C-Required] Specify the fc service name  
  --description [string]              [Optional] Specify the alias description     
  --alias-name [string]            	  [Required] Specify the fc alias name                   
  --gversion [number]              	  [Optional] The grayscale version id  
  --version-id [number]            	  [Optional] The version Id               
  --version-latest [boolean]          [Optional] Binding the latest service version          
  --weight [number]                   [Optional] The weight for grayscale version 

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

  $ s alias publish --alias-name aliasName --version-id 2                             
  $ s alias publish --alias-name aliasName --version-latest                         
  $ s alias publish --description description --alias-name aliasName --version-id 2 --gversion 3 --weight 20                                                      

Examples with CLI

  $ s cli fc alias publish --region cn-hangzhou --service-name serviceName --alias-name aliasName --version-id 2 
```

### Parameter description

| Parameter | Abbreviation | Required in YAML mode | Required in CLI mode | Description |
| --------- | ------------ | --------------------- | -------------------- | ----------- |
| region    | -    | No      | No     | The region. Valid values: `cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, and ap-south-1`. |
| service-name | -    | No      | Yes     | The name of the service.                            |
| description | -    | No      | No     | The description of the alias.                           |
| alias-name  | -    | Yes      | Yes     | The name of the alias.                             |
| gversion   | -    | No      | No     | The ID of the canary release version. This parameter is required when the weight parameter is specified.| 
| version-id  | -    | No      | No     | The ID of the version. If the version-id and version-latest parameters are specified, you need to select a version number in interactive mode. | 
| version-latest | -   | No      | No     | Specifies the latest version of the service. The version-id parameter takes precedence over the version-latest parameter. |
| weight    | -    | No      | No     | The weight of the canary release version. This parameter is required when the gversion parameter is specified. |
| access    | a    | No      | No     | The AccessKey pair that is used in the request. You can use the AccessKey pair that is configured by running the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add-command) or [the AccessKey pair that is configured by using [environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Configure the AccessKey pair by using environment variables). |
| debug    | -    | No      | No     | The `debug` mode. If you enable the debug mode, more logs are returned.            |
| help     | h    | No      | No     | Views the help information.                         |

### Examples

- **If the YAML description file of resources exist**, you can run the `s alias publish` command to publish or update the version.
- **If the YAML description file of resources do not exist**, specify the region and the name of the service in the alias publish command. Example: ` s cli fc alias publish --region cn-hangzhou --service-name fc-deploy-service --alias-name pre --version-id 1`.

The following sample code shows the command output:

```text
fc-deploy-test: 
  aliasName:               pre
  versionId:               1
  description:             
  additionalVersionWeight: 
  createdTime:             2021-11-08T06:51:36Z
  lastModifiedTime:        2021-11-08T06:51:36Z
```

If you need to update the alias, you need only to specify the parameter that you want to update in the alias publish command. In this example, the --alias-name (pre) and the --description parameters are specified in the command. The following sample code shows the command output:

```text
fc-deploy-test: 
  aliasName:               pre
  versionId:               1
  description:             test publish version
  additionalVersionWeight: 
  createdTime:             2021-11-08T06:51:36Z
  lastModifiedTime:        2021-11-08T06:54:02Z
```

### Logic of the master version number

- If the version-id parameter is specified in the alias publish command, the master version number is the value of the version-id parameter.
- If the version-id parameter is not specified, but the version-latest parameter is specified in the alias publish command, the relevant version numbers are contained in the command output and are displayed in descending order by default. The master version number is the version number 0 that is contained in the returned version numbers. The version number 0 is the highest version.
- If the version-id and version-latest parameters are specified in the alias publish command, one or more version numbers are returned. If only one version number is returned, this version number is the major version number. If multiple version numbers are returned, you need to select a version number in interactive mode.

## Permissions and policies

- To run the `alias lis`t and `alias get` commands, attach the `AliyunFCReadOnlyAccess` policy.
- To run the `alias publish` command, run the following command to attach the policy:

  ```yaml
  {
      "Version": "1",
      "Statement": [
          {
              "Action": [
                  "fc:CreateAlias",
                  "fc:UpdateAlias"
              ],
              "Effect": "Allow",
              "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>/aliases/*"
          }
      ]
  }
  ```
