---
title: Version commands
description: 'Version commands'
position: 1
category: 'Release&configuration'
---

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

You can run the `version -h` or `version --help` command to obtain help document.

In the preceding command, the following subcommands are included:

- [list: checks a list of versions.](#version-list-command)
- [publish: publishes a version](#version-publish-command)

## version list command

The `version list` command is used to check a list of published versions. 

 You can run the `version list -h` or `version list --help` command to obtain the help document.

### Parameter description



| Parameter    | Abbreviation | Required   in YAML mode | Required   in CLI mode | Description                                                  |
| ------------ | ------------ | ----------------------- | ---------------------- | ------------------------------------------------------------ |
| region       | -            | No                      | Yes                    | The  name of the region. Valid values: cn-hangzhou, cn-beijing, cn-beijing,  cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote,  cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2,  ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1,  us-west-1, us-east-1, and ap-south-1. |
| service-name | -            | No                      | Yes                    | The  name of the service.                                    |
| table        | -            | No                      | No                     | Specifies  whether to return the result in the form of a table. |

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)



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

You can run the `version publish -h` or `version publish --hel`p command to obtain the help document.

### Parameter description

| Parameter   | Abbreviation | Required in YAML mode | Required in CLI mode | Description                           |
| ------------ | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region    | -    | No      | Yes     | The name of the region. Valid values:`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | -    | No      | Yes     | The name of the service.                            |
| description | -    | No      | No     | Version description                           |

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)
 
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
