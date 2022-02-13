---
title: 	Layer commands
description: 'Layer commands'
position: 5
category: 'Release&configuration'
---
# Layer commands

The `layer` commands are used to perform layer operations. 

- [Command description](#Command description)
- [layer publish command](#layer-publish-command)
  - [Parameters description](#Parametersdescription)
  - [Examples](#examples)
- [layer list command](#layer-list-command)
  - [Parameters description](#Parametersdescription-1)
  - [examples](#examples-1)
- [layer detail command](#layer-detail-command)
  - [Parameters description](#Parametersdescription-2)
  - [Examples](#examples-2)
- [layer versions command](#layer-versions-command)
  - [Parameters description](#Parametersdescription-3)
  - [Examples](#examples-3)
- [remove layer command](remove.md#remove-layer-command)
- [Permissions and policies](#Permissions-and-policies)


## Command description

You can run the `layer -h` or `layer --help` command to obtain the help document.

```shell script
Layer

  Resource layer operation 

Usage

  s layer <sub-command> <options>

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/layer.md

SubCommand List

  publish        New layer version; help command [s layer publish -h] 
  list           Get layer list; help command [s layer list -h] 
  detail         Get layer versionConfig; help command [s layer detail -h] 
  versions       Get layer versions; help command [s layer verisons -h] 
```

Four commands are included: 
 
- [publish: publishes a layer](#layer-publish-command)
- [list: obtains the list of layers](#layer-list-command)
- [detail: obtains layer details](#layer-detail-command)
- [versions: obtains layer versions](#layer-versions-command) 

## layer publish command

The `layer publish` command is a used to publish a layer. 
 
You can run the `layer publish -h` or `layer publish --help` command to obtain the help document.

```shell script
Layer publish

  New layer version 

Usage

  s layer publish <options>  

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/layer.md
                               
Options

  --region [string]             [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1       
  --code string                 [Required] Specify the code parameter               
  --compatible-runtime string   [Optional] Specify the compatibleRuntime parameter  
  --description string          [Optional] Specify the description parameter        
  --layer-name string           [Optional] Specify the layer name parameter         


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

  $ s layer publish --layer-name testName --code ./src 

Examples with CLI

  $ s cli fc layer publish --region cn-hangzhou --layer-name testName --code ./src --compatible-runtime nodejs12,nodejs10,python3 
```

### Parameters description



| Full   parameter   | Short   form | Required   in YAML mode | Required   in CLI mode | Description                                                  |
| ------------------ | ------------ | ----------------------- | ---------------------- | ------------------------------------------------------------ |
| region             | -            | Optional                | Required               | The region. Valid  values: cn-hangzhou,  cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou,  cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1,  ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1,  eu-west-1, us-west-1, us-east-1, and ap-south-1 |
| code               | -            | Required                | Required               | The code of the layer.                                       |
| compatible-runtime | -            | Optional                | Optional               | Supported runtime.  Default value: nodejs12,nodejs10,nodejs8,nodejs6,python3,python2.7 |
| description        |              | Optional                | Optional               | The description of the  layer.                               |
| layer-name         |              | Required                | Required               | The name of the layer.                                       |
| access             | a            | Optional                | Optional               | The key used in this  request. You can use the key configured by running the [config](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add-command) command or [the key configured to the   environment variable](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Configure-keys-by-using-environment-variables). |
| debug              | -            | Optional                | Optional               | Enables debug mode to  obtain more logs.                     |
| help               | h            | Optional                | Optional               | Obtains the help  document.                                  |


### Examples

- **If the YAML file is available**, you can directly run the `s layer publish` command to publish a layer. Example: `s layer publish --layer-name demo --code ./code`.
- **If the YAML file is unavailable**, you must specify the region where the service is deployed in the command. Example: `s cli fc layer publish --region cn-hangzhou --layer-name demo --code ./code`.

The output of the preceding command:

```text
fc-deploy-test: 544c887879c38e5d0afcaf8b4f8f348e#demo#1
```


## layer list command

The `layer list` command is used to obtain the list of layers. 

You can run the `layer list -h` or `layer list--help` command to obtain the help document.

```shell script
Layer list

  Get layer list 

Usage

  s layer list <options>

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/layer.md
                           
Options

  --region [string]        [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --prefix [string]        [Optional] Specify the prefix parameter    
  --table                  [Optional] Table format output       

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

  $ s layer list          

Examples with CLI

  $ s cli fc layer list --region cn-hangzhou       
```

### Parameters description

| Full parameter | Short form | Required in YAML mode | Required in CLI mode | Description                           |
| -------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region  | -    | Optional      | Required     | The region. Valid values: cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, and ap-south-1` |
| prefix  | -    | Optional      | Optional     |                               |
| table  | -    | Optional      | Optional     |                               |
| access  | a    | Optional      | Optional     | The key used in this request. You can use the key configured by running the config command (https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add) or the key configured to the environment variable (https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Use environment variables to configure keys). |
| debug  | -    | Optional      | Optional     | Enables debug mode to obtain more logs.             |
| help   | h    | Optional      | Optional     | Obtains the help document.                         |

### Examples

- **If the YAML file is available**, you can directly run the `s layer list` command to view the list of layers.
- **If the YAML file is unavailable**, you must specify the region where the service is deployed in the command. Example: `s cli fc layer list --region cn-hangzhou`. 
 
 The output of the preceding command: 

```text
fc-deploy-test: 
  - 
    layerName:         demo
    arn:               544c887879c38e5d0afcaf8b4f8f348e#demo#1
    version:           1
    description:       
    compatibleRuntime: 
      - nodejs12
      - nodejs10
      - nodejs8
      - nodejs6
      - python3
      - python2.7
```

## layer detail command

The `layer detail` command is used to obtain details of a specified layer and its versions. 

You can run the `layer detail -h` or `layer detail --help` command to obtain the help document.

```shell script
Layer detail

  Get layer version config 

Usage

  s layer detail <options> 
                
Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/layer.md
                           
Options
    
  --region [string]           [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --layer-name [string]       [C-Required] Specify the layer name parameter    
  --version-id [number]       [C-Required] Specify the version parameter                             

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

  $ s layer detail --layer-name layerName --version-id 1 

Examples with CLI

  $ s cli fc layer detail --region cn-hangzhou --layer-name layerName --version-id 1 
```

### Parameters description

| Full parameter  | Short form | Required in YAML mode | Required in CLI mode | Description                           |
| ---------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region   | -    | Optional      | Required     | The region. Valid values: `cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| layer-name | -     | Required      | Required     | The name of the layer.                            |
| version-id | -    | Required      | Required     | The version of the layer.                            |
| access   | a    | Optional     | Optional     | The key used in this request. You can use the key configured by running the config command (https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add) or the key configured to the environment variable (https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Use environment variables to configure keys). |
| debug   | -    | Optional      | Optional     | Enables debug mode to obtain more logs.            |
| help    | h    | Optional      | Optional     | Obtains the help document.                         |
 
### 操作案例

- **If the YAML file is available**, you can directly run the `s layer detail --layer-name layerName --version-id versionId` command to view details about the specified layer and the specified version.
- **If the YAML file is unavailable**, you must specify the region where the service is deployed in the command. Example: `s layer detail --layer-name demo --version-id 1 -h`. 
 
The output of the preceding command: 

```text
fc-deploy-test: 
  layerName:         demo
  version:           1
  description:       
  code: 
    repositoryType: null
    location:       https://fc-hz-yunqi-func-code.oss-cn-hangzhou-internal.aliyuncs.com/1583208943291465%2Fdemo%2Fdecddf35-8705-4f80-9baa-2c4a9ffc512b?Expires=1636621101&OSSAccessKeyId=&Signature=cZZHNSpeewLXVoFd2%2FdFuLBe4cc%3D
  codesize:          550
  codeChecksum:      17221560529872498506
  createTime:        2021-11-11T08:46:38Z
  acl:               0
  compatibleRuntime: 
    - nodejs12
    - nodejs10
    - nodejs8
    - nodejs6
    - python3
    - python2.7
  arn:               544c887879c38e5d0afcaf8b4f8f348e#demo#1
```

## layer versions command

The `layer versions` command is used to obtain the versions of a specified layer. 

You can run the `layer version -h` or `layer versions --help` command to obtain the help document.

```shell script
Layer versions

  Get layer versions 

Usage

  s layer versions <options>
                
Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/layer.md
                           
Options
    
  --region [string]          [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --layer-name [string]      [Required] Specify the layer name parameter   
  --table                    [Optional] Table format output                           

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

  $ s layer versions --layer-name layerName

Examples with CLI

  $ s cli fc layer versions --region cn-hangzhou --layer-name layerName
```

### Parameters description

| Full parameter  | Short form | Required in YAML mode | Required in CLI mode | Description                           |
| ---------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region   | -    | Optional      | Required     | The region. Valid values: cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, and ap-south-1 |
| layer-name | -    | Required      | Required     | The name of the layer.                            |
| table   | -    | Optional      | Required     | Specifies whether to display outputs in a table.                      |
| access   | a    | Optional      | Optional     | The key used in this request. You can use the key configured by running the config command (https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add) or the key configured to the environment variable (https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Use environment variables to configure keys). |
| debug   | -    | Optional     | Optional     | Enables debug mode to obtain more logs.            |
| help    | h    | Optional      | Optional     | Obtains the help document.                         |
 
### 操作案例

- **If the YAML file is available**, you can directly run the `s layer versions --layer-name layerName` command to view the list of versions of the specified layer. 
- **If the YAML file is unavailable**, you must specify the region where the service is deployed in the command. Example: `s cli fc layer versions --layer-name layerName --region cn-hangzhou`. 
 
The output of the preceding command: 

```text
fc-deploy-test: 
  - 
    layerName:         demo
    arn:               544c887879c38e5d0afcaf8b4f8f348e#demo#1
    version:           1
    description:       
    compatibleRuntime: 
      - nodejs12
      - nodejs10
      - nodejs8
      - nodejs6
      - python3
      - python2.7
```

## Permissions and policies

- Required permissions for the `layer list`, `layer version`, and `layer detail` commands: `AliyunFCReadOnlyAccess`.

- Required permissions for the `layer publish` command:

  ```yaml
  {
      "Version": "1",
      "Statement": [
          {
              "Action": "fc:CreateLayerVersion",
              "Effect": "Allow",
              "Resource": "acs:fc:<region>:<account-id>:layers/<layerName>/versions/*"
          }
      ]
  }
  ```
