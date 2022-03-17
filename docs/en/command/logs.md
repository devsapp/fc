---
title: Logs command
description: 'Logs command'
position: 2
category: 'Observability'
---
# Logs commands

The `logs` commands are used to view the logs of a function. 

- [Command description](#Command-description)
  - [Parameter description](#Parameter-description)
  - [Examples](#Examples)
- [Permissions and policies](#Permissions-and-policies)

> ⚠️ Note: Before you use this feature, you must activate Log Service and [configure related log projects](../yaml/service.md#logconfig). 


## Command description

You can run the `logs -h` or `logs --help` command to obtain the help document.

### Parameter description

| Parameter   | Abbreviation | Required in YAML mode | Required in CLI mode | Description                           |
| ------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region    | -    | No      | Yes     | The name of the region. Valid values: `cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1`. |
| service-name | -    | No      | Yes     | The name of the service.                            |
| function-name | -    | No      | Yes     | The name of the function.                            |
| keyword    | -    | No      | No     | Key word for searching.                         |
| start-time  | s    | No      | No     | The start time of the query, which must be UTC time or a timestamp. Example: `2021-06-07T02:54:59+08:00`，`1611827290000` |
| end-time   | e    | No      | No     | The end time of the query, which must be UTC time or a timestamp. Example: `2021-06-07T02:54:59+08:00`，`1611827290000` |
| tail     | -    | No      | No     | Outputs the result in the `tail` mode.                   |
| type     | -    | No      | No     | The log type to query. Valid values: `success, fail`     |
| access    | a    | No      | No     | The key that is used in the request. You can use the key information that is configured by using the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add-command), or the [key information that is configured for environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Configure-keys-by-using-environment-variables). |
| debug     | -    | No      | No     | Enables the `debug` mode. In this case, more logs are generated.            |
| help     | h    | No      | No     | Views the help information.                         |

### Examples
 
- **If a resource description file (YAML) is available, **you can run the `s logs` command to view logs of online functions.
- **In CLI mode (no YAML),** you must specify the region in which the service resides and names of the service and function. Example: `s cli fc logs --region cn-hangzhou --service-name fc-deploy-service --function-name http-trigger-py36`
 
Sample output:

```
FunctionCompute python3 runtime inited.

FC Invoke Start RequestId: 84d6ae81-02ff-4011-b3ca-45e65b210cc3
FC Invoke End RequestId: 84d6ae81-02ff-4011-b3ca-45e65b210cc3

FC Invoke Start RequestId: de4812be-9137-4a33-9869-370cb61ac427
FC Invoke End RequestId: de4812be-9137-4a33-9869-370cb61ac427
```

You can add the `--tail` parameter to view logs in the `tail` mode. Example: `s logs --tail`.

You can add the `--start-time` and `--end-time` parameters to view the logs in a specified period. Example: `s logs -s 2021-11-04T15:40:00 -e 2021-11-04T15:45:00`.

## Permissions and policies

- Maximum permissions: `AliyunFCReadOnlyAccess`, and `AliyunLogReadOnlyAccess`

- Minimum permissions: `AliyunFCReadOnlyAccess` and permissions related to some API operations:

  ```yaml
  {
      "Version": "1",
      "Statement": [
          {
              "Action": "log:GetLogStoreLogs",
              "Effect": "Allow",
              "Resource": "acs:log:<region>:<account-id>:project/<project>/logstore/<logstore>"
          }
      ]
  }
  ```
