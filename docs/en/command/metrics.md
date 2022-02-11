# Metrics command

The `metrics` command is a command for viewing function metrics information.

- [Command description](#Command-description)
  - [Parameter description](#parameter-description)
  - [Examples](#Examplese)
- [Permissions and policies](#Permissions-and-policies)

## Command description

When executing the command `metrics -h`/`metrics --help`, you can get help documentation:

```shell script
Metrics

  Query function metrics information

Usage

  s metrics <options>
                       
Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/metrics.md

Options
               
  --region [string] [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/ cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu- west-1/us-west-1/us-east-1/ap-south-1
  --service-name [string] [C-Required] Specify the fc service name
  --function-name [string] [C-Required] Specify the fc function name

Global Options

  -h, --help [Optional] Help for command
  -a, --access [string] [Optional] Specify key alias
  --debug [Optional] Output debug informations

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/docs/docs/en/yaml_and_cli.md

Examples with Yaml

  $s metrics

Examples with CLI

  $ s cli fc metrics --region cn-hangzhou --service-name myService --function-name myFunction
````

### Parameter description

| Parameter full name | Parameter abbreviation | Required in Yaml mode | Required in Cli mode | Parameter meaning |
| ------------- | -------- | -------------- | ----------- -- | --------------------------------------------------------- ------------- |
| region | - | optional | required | cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu- west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | - | optional | required | service name |
| function-name | - | optional | required | function name |
| access | a | Optional | Optional | The key used in this request can be used via the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh /command/config.md#config-add-command) configured key information, and [key information configured to environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master /docs/en/command/config.md#Configure key information through environment variables) |
| debug | - | optional | optional | open `debug` mode, will output more log information |
| help | h | Optional | Optional | View help information |

### Examples

- **When there is a resource description file (Yaml)**, you can directly execute `s metrics` to view the metrics information of the function;
- **Pure command line form (when there is no resource description Yaml file)**, you need to specify the service region, service name, function name, etc., such as `s cli fc metrics --region ch-hangzhou --service-name myService --function-name myFunction`;

Example of the execution result of the above command:

````text
[2021-06-07T12:20:06.661] [INFO ] [FC-METRICS] - Please open with browser: http://localhost:3000
````

 At this point, open the address through the browser, and you can see the function indicator information:

![image](https://user-images.githubusercontent.com/21079031/120958920-419b2400-c78b-11eb-9f3c-8b49c1354a37.png)

**You need to enable the request level indicator to view the function indicator information, otherwise the chart will not display data**

**How ​​to enable request level indicators:**

**1. https://fcnext.console.aliyun.com/**

**2. In services and functions-find your own region-corresponding service name-click configure in the operation bar to open the request level indicator**

## Permissions and policies

Required permissions: `AliyunLogFullAccess`, `AliyunCloudMonitorReadOnlyAccess`, `AliyunFCReadOnlyAccess`
