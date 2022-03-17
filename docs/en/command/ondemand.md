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

You can run the `ondemand -`h or `ondemand --help` command to query the help information.

The ondemand command consists of three subcommands:
 
- [get: Queries the details of on-demand resources.](#ondemand-get-command)
- [list: Queries the lists of on-demand resources.](#ondemand-list-command)
- [put: Publishes or updates configurations of on-demand resources.](#ondemand-put-command)

## ondemand get command

The `ondemand get` command is used to query the details of specified on-demand resources. 
 
You can run the `ondemand get -h` or `ondemand get --help`command to query the help information.
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

You can run the `ondemand list -h` or `ondemand list --help` command to query the help information

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

You can run the `ondemand put -h` or `ondemand put --help` command to query the help information.

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
