---
title: Layer commands
description: 'Layer commands'
position: 5
category: 'Release&configuration'
---

# Layer commands

The `layer` commands are used to perform layer operations.

- [Command description](#Command-description)
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
- [layer download command](#layer-download-command)
  - [Parameters description](#Parametersdescription-4)
  - [Examples](#examples-4)
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

| Full parameter     | Short form | Required in YAML mode | Required in CLI mode | Description                                                                                                                                                                                                                                                                                                            |
| ------------------ | ---------- | --------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| region             | -          | Optional              | Required             | The region. Valid values: cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, and ap-south-1 |
| code               | -          | Required              | Required             | The code of the layer.                                                                                                                                                                                                                                                                                                 |
| compatible-runtime | -          | Optional              | Optional             | Supported runtime. Default value: nodejs14,nodejs12,nodejs10,nodejs8,nodejs6,nodejs4.4,python3.9,python3,python2.7,java11,java8,go1,php7.2,dotnetcore2.1,custom.7                                                                                                                                                                                                                                  |
| description        |            | Optional              | Optional             | The description of the layer.                                                                                                                                                                                                                                                                                          |
| layer-name         |            | Required              | Required             | The name of the layer.                                                                                                                                                                                                                                                                                                 |

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)

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

| Full parameter | Short form | Required in YAML mode | Required in CLI mode | Description                                                                                                                                                                                                                                                                                                             |
| -------------- | ---------- | --------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| region         | -          | Optional              | Required             | The region. Valid values: cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, and ap-south-1` |
| prefix         | -          | Optional              | Optional             |                                                                                                                                                                                                                                                                                                                         |
| table          | -          | Optional              | Optional             |                                                                                                                                                                                                                                                                                                                         |

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)

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

| Full parameter | Short form | Required in YAML mode | Required in CLI mode | Description                                                                                                                                                                                                                                                                                                          |
| -------------- | ---------- | --------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| region         | -          | Optional              | Required             | The region. Valid values: `cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| layer-name     | -          | Required              | Required             | The name of the layer.                                                                                                                                                                                                                                                                                               |
| version-id     | -          | Required              | Required             | The version of the layer.                                                                                                                                                                                                                                                                                            |

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)

### Examples

- **If the YAML file is available**, you can directly run the `s layer detail --layer-name layerName --version-id versionId` command to view details about the specified layer and the specified version.
- **If the YAML file is unavailable**, you must specify the region where the service is deployed in the command. Example: `s cli fc layer detail --region cn-hangzhou --layer-name demo --version-id 1`.

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

| Full parameter | Short form | Required in YAML mode | Required in CLI mode | Description                                                                                                                                                                                                                                                                                                            |
| -------------- | ---------- | --------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| region         | -          | Optional              | Required             | The region. Valid values: cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, and ap-south-1 |
| layer-name     | -          | Required              | Required             | The name of the layer.                                                                                                                                                                                                                                                                                                 |
| table          | -          | Optional              | Required             | Specifies whether to display outputs in a table.                                                                                                                                                                                                                                                                       |

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)

### Examples

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

## layer download command

The `layer download` command is download layer version code.

You can run the `layer download -h` or `layer download --help` command to obtain the help document.

### Parameters description

| Full parameter | Short form | Required in YAML mode | Required in CLI mode | Description                                                                                                                                                                                                                                                                                                          |
| -------------- | ---------- | --------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| region         | -          | Optional              | Required             | The region. Valid values: `cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| layer-name     | -          | Required              | Required             | The name of the layer.                                                                                                                                                                                                                                                                                               |
| version-id     | -          | Required              | Required             | The version of the layer.                                                                                                                                                                                                                                                                                            |

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)

### Examples

- **If the YAML file is available**, you can directly run the `s layer detail --layer-name layerName --version-id versionId`.
- **If the YAML file is unavailable**, you must specify the region where the service is deployed in the command. Example: `s cli fc layer detail --region cn-hangzhou --layer-name demo --version-id 1`.

The output of the preceding command:

```text
✔ Downloading: [/189******629/test/7d954393-c5a2-4519-94de-d1a4c9e0611f] 144073/144073 100.00%
helloworld: /Users/test/.s/cache/layers/189******629-cn-shenzhen-test/8.zip
```

## Permissions and policies

- Required permissions for the `layer list`, `layer version`, and `layer detail` commands: `AliyunFCReadOnlyAccess`.

- Required permissions for the `layer publish` command:

  ```yaml
  {
    'Version': '1',
    'Statement':
      [
        {
          'Action': 'fc:CreateLayerVersion',
          'Effect': 'Allow',
          'Resource': 'acs:fc:<region>:<account-id>:layers/<layerName>/versions/*',
        },
      ],
  }
  ```
