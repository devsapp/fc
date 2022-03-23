---
title: Sync commands
description: 'Sync commands'
position: 4
category: 'Other'
---
# Sync commands

The `sync` commands are used to synchronize online resources to an on-premises machine. 

- [Command description](#Command-description)
  - [Parameter description](#Parameter-description)
  - [Examples](#Examples)
- [Permissions and policies](#Permissions-and-policies)

## Command description

You can run the `sync -h` or `sync --help` command to obtain the help document.

### Parameter description
 
| Parameter   | Abbreviation | Required in YAML mode | Required in CLI mode | Description                           |
| ------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region    | -    | No      | No      | The name of the region. Valid values: `cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | -    | No      | Yes     | The name of the service.                            |
| function-name | -    | No      | No     | The name of the function.                            |
| trigger-name | -    | No      | No     | The name of the trigger.                           |
| target-dir  | -    | No      | No     | The destination directory.                           |
| type     | -    | No      | No     | The type of the synchronization. You can synchronize code and configurations. By default, both code and configurations are synchronized. Valid values: `code` and `config` |

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)
 
### Examples
 
- **If a resource description file (YAML) is available,** you can run the `s sync` command to synchronize online resources to a local machine.
- **In the CLI mode (no YAML),** you must specify the names of the service and function. For example, `s cli fc sync --region cn-hanghzou --service-name fc-deploy-service --function-name http-trigger-py36`.
 
Example output:
 

```text
fc-deploy-test: 
  codeFiles:  
  	http-trigger-py36: /Users/jiangyu/demo/test/start-fc-http-python3/1583208943291465_cn-hangzhou_fc-deploy_service_http-trigger-py36
  configYmlPath: /Users/jiangyu/demo/test/start-fc-http-python3/s.cn-hangzhou-fc-deploy-service.sync.yaml
```

## Permissions and policies

We recommend that you use the `AliyunFCReadOnlyAccess` policy when you use this command.
