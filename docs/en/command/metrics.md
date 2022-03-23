---
title: Metrics command
description: 'Metrics command'
position: 1
category: 'Observability'
---
# Metrics command

The `metrics` command is a command for viewing function metrics information.

- [Command description](#Command-description)
  - [Parameter description](#parameter-description)
  - [Examples](#Examplese)
- [Permissions and policies](#Permissions-and-policies)

## Command description

When executing the command `metrics -h`/`metrics --help`, you can get help documentation.

### Parameter description

| Parameter full name | Parameter abbreviation | Required in Yaml mode | Required in Cli mode | Parameter meaning |
| ------------- | -------- | -------------- | ------------- | ------------------------------------------------------- |
| region | - | optional | required | cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu- west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | - | optional | required | service name |
| function-name | - | optional | required | function name |

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)

### Examples

- **When there is a resource description file (Yaml)**, you can directly execute `s metrics` to view the metrics information of the function;
- **Pure command line form (when there is no resource description Yaml file)**, you need to specify the service region, service name, function name, etc., such as `s cli fc metrics --region ch-hangzhou --service-name myService --function-name myFunction`;

Example of the execution result of the above command:

````text
[2021-06-07T12:20:06.661] [INFO ] [FC-METRICS] - Please open with browser: http://localhost:3000
````

 At this point, open the address through the browser, and you can see the function indicator information.
 
**You need to enable the request level indicator to view the function indicator information, otherwise the chart will not display data**

**How ​​to enable request level indicators:**

**1. https://fcnext.console.aliyun.com/**

**2. In services and functions-find your own region-corresponding service name-click configure in the operation bar to open the request level indicator**

## Permissions and policies

Required permissions: `AliyunLogFullAccess`, `AliyunCloudMonitorReadOnlyAccess`, `AliyunFCReadOnlyAccess`
