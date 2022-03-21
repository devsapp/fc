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


Four commands are included: 
 
- [publish: publishes a layer](#layer-publish-command)
- [list: obtains the list of layers](#layer-list-command)
- [detail: obtains layer details](#layer-detail-command)
- [versions: obtains layer versions](#layer-versions-command) 

## layer publish command

The `layer publish` command is a used to publish a layer. 
 
You can run the `layer publish -h` or `layer publish --help` command to obtain the help document.


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
