# Version commands

The `version` commands are used to perform operations related to function versions. For example, you can view, publish, and delete aliases. 

- [Command description](#Command-description)
- [version list command](#version-list-command)
  - [Parameter description](#Parameter-description)
  - [Examples](#Examples)
- [version publish command](#version-publish-command)
  - [Parameter description](#Parameter-description-1)
  - [Examples](#Examples-1)
- [remove version command](remove.md#remove-version-command)
- [Permissions and policies](#Permissions-and-policies)

## Command description

You can run the `version -h` or `version --help` command to obtain help document:

```shell script
Version

  Service version operation 

Usage

  s version <sub-command> <options>

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/version.md

SubCommand List

  list      View the list of service versions; help command [s version list -h] 
  publish   Publish service version; help command [s version publish -h] 
```


In the preceding command, the following subcommands are included:

- [list: checks a list of versions.](#version-list-command)
- [publish: publishes a version](#version-publish-command)

## version list command

The `version list` command is used to check a list of published versions. 

 You can run the `version list -h` or `version list --help` command to obtain the help document: 

```shell script
Version list

  View the list of service versions 

Usage

  s version list <options>  

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/version.md
                               
Options

  --region [string]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [string]             [C-Required] Specify the fc service name  
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
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/docs/docs/en/yaml_and_cli.md

Examples with Yaml

  $ s version list 

Examples with CLI

  $ s cli fc version list --region cn-hangzhou --service-name serviceName 
```

### Parameter description



| Parameter    | Abbreviation | Required   in YAML mode | Required   in CLI mode | Description                                                  |
| ------------ | ------------ | ----------------------- | ---------------------- | ------------------------------------------------------------ |
| region       | -            | No                      | Yes                    | The  name of the region. Valid values: cn-hangzhou, cn-beijing, cn-beijing,  cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote,  cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2,  ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1,  us-west-1, us-east-1, and ap-south-1. |
| service-name | -            | No                      | Yes                    | The  name of the service.                                    |
| table        | -            | No                      | No                     | Specifies  whether to return the result in the form of a table. |
| access       | a            | No                      | No                     | The  key that is used in this request. You can use the key information configured  by using the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add-命令), or [the key information configured to   environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#通过环境变量配置密钥信息). |
| debug        | -            | No                      | No                     | Enables  the debug mode. In this case, more logs are generated. |
| help         | h            | No                      | No                     | Views  help information                                      |



### Examples

- **If a resource description file (YAML) is available,** you can run the `s version list` command to check a list of published versions of the service.

- **In CLI mode (no YAML),** you must specify the region of the service and the name of the service. Example: `s cli fc version list --region cn-hangzhou --service-name fc-deploy-service`.

Example output:

```text
fc-deploy-test: 
  - 
    versionId:        1
    description:      test publish version
    createdTime:      2021-11-08T06:07:00Z
    lastModifiedTime: 2021-11-08T06:07:00Z
```

If the `--table` parameter is specified, the following output is returned:

```text
  ┌───────────┬──────────────────────┬──────────────────────┬──────────────────────┐
  │ versionId │     description      │     createdTime      │   lastModifiedTime   │
  ├───────────┼──────────────────────┼──────────────────────┼──────────────────────┤
  │ 1         │ test publish version │ 2021-11-08T06:07:00Z │ 2021-11-08T06:07:00Z │
  └───────────┴──────────────────────┴──────────────────────┴──────────────────────┘
```


## version publish command

The `version publish` command is used to publish a version. 

You can run the `version publish -h` or `version publish --hel`p command to obtain the help document:

```shell script
Version publish

  Publish service version 

Usage

  s version publish <options>  

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/version.md
                           
Options

  --region [string]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [string]             [C-Required] Specify the fc service name  
  --description [string]              [Optional] Specify the description     

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

  $ s version publish --description xxx 

Examples with CLI

  $ s cli fc version publish --region cn-hangzhou --service-name name --description xxx 
```

### Parameter description

| Parameter   | Abbreviation | Required in YAML mode | Required in CLI mode | Description                           |
| ------------ | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region    | -    | No      | Yes     | The name of the region. Valid values:`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | -    | No      | Yes     | The name of the service.                            |
| description | -    | No      | No     | Version description                           |
| access    | a    | No      | No     | The key that is used in this request. You can use the key information that is configured by using the [configcommand](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add-command), or the [key information that is configured to environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Configure key information by using environment variables). |
| debug    | -    | No      | No     | Enables the `debug` mode. In this case, more logs are generated.            |
| help     | h    | No      | No     | Views the help information.                         |
 
###  Examples
 
- **If a resource description file (YAML) is available, **you can run the `s version publish` command to publish a version.
- **In CLI mode (no YAML), **you must specify the region of the service and the name of the service. For example, `s cli fc version publish --region cn-hangzhou --service-name fc-deploy-service --description "test publish version"`.
 
 Example output:

```text
fc-deploy-test: 
  versionId:        1
  description:      test publish version
  createdTime:      2021-11-08T06:07:00Z
  lastModifiedTime: 2021-11-08T06:07:00Z
```

## Permissions and policies

- Policy required for the `version lis`t command: `AliyunFCReadOnlyAccess`.

- Policy required for the `version publish` command:

  ```yaml
  {
      "Version": "1",
      "Statement": [
          {
              "Action": "fc:PublishServiceVersion",
              "Effect": "Allow",
              "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>/versions"
          }
      ]
  }
  ```
