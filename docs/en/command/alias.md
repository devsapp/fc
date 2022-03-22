---
title: Alias commands
description: 'Alias commands'
position: 2
category: 'Release&configuration'
---

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

You can run the `alias -h` or `alias --help` command to obtain the information about the relevant help documentation.

The sample code contains the following subcommands:

- [get: obtains the details of the specified alias of a service.](#alias-get-command)
- [list: obtains the details of aliases in a table.](#alias-list-command)
- [publish: publishes or updates an alias.](#alias-publish-command)

## alias get command

You can run the `alias get` command to obtain the details of the specified alias of a service. 

 You can run the `alias get -h` or `alias get --help` command to obtain the information about the relevant help documentation.

### Parameter description

| Parameter    | Abbreviation | Required   in YAML mode | Required   in CLI mode | Description                                                  |
| ------------ | ------------ | ----------------------- | ---------------------- | ------------------------------------------------------------ |
| region       | -            | No                      | Yes                    | The region. Valid  values: cn-hangzhou,  cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou,  cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1,  ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1,  eu-west-1, us-west-1, us-east-1, and ap-south-1. |
| service-name | -            | No                      | Yes                    | The name of the  service.                                    |
| alias-name   | -            | Yes                     | Yes                    | The name of the alias.                                       |

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)

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

You can run the `alias list -h` or `alias list --help` to obtain the information about the relevant help documentation.

### Parameter description

| Parameter    | Abbreviation | Required in YAML mode | Required in CLI mode | Description                                                  |
| ------------ | ------------ | --------------------- | -------------------- | ------------------------------------------------------------ |
| region       | -            | No                    | Yes                  | The region. Valid values: `cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, and ap-south-1`. |
| service-name | -            | No                    | Yes                  | The name of the service.                                     |
| table        | -            | No                    | No                   | Specifies whether the details of the aliases are returned in a table. |

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)


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

You can run the `alias publish -h` or `alias publish --help` command to obtain the information about the relevant help documentation.

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

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)

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
