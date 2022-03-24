---
title: Provision commands
description: 'Provision commands'
position: 3
category: 'Release&configuration'
---

# Provision commands

The `provision` commands are used to provision function instances. You can use the commands to view and update provisioned configurations. 

- [Command description](#Command-description)
- [provision list command](#provision-list-command)
  - [Parameter description](#Parameter-description)
  - [Examples](#Examples)
- [provision put command](#provision-put-command)
  - [Parameter description](#Parameter-description-1)
  - [Examples](#Examples-1)
- [provision get command](#provision-get-command)
  - [Parameter description](#Parameter-description-2)
  - [Examples](#Examples-2)
- [remove provision](remove.md#remove-provision-command)
- [Permissions and policies](#Permissions-and-policies)

>  ⚠️ Note: **You are charged for provisioned resources. Release instances that are no longer needed to prevent unnecessary costs.**

## Command description

You can run the `provision -h` or `provision --help` command to obtain the help documen.


 In the preceding command, the following sub-commands are included:
 
- [list: views the list of provisioned resources.](#provision-list-command)
- [put: configures provisioned resources. You can remove the provisioned resources by setting the value to 0.](#provision-put-command)
- [get: queries the details of a provisioned resource.](#
)

## provision list command

You can run the `provision list` command to view the published versions of the service. 
 
You can run the `provision list -h` or `provision list --help` command to obtain the help document.
### Parameter description

| Parameter    | Abbreviation | Required   in YAML mode | Required   in CLI mode | Description                                                  |
| ------------ | ------------ | ----------------------- | ---------------------- | ------------------------------------------------------------ |
| region       | -            | No                      | Yes                    | The  name of the region. Valid values: cn-hangzhou, cn-beijing, cn-beijing,  cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote,  cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2,  ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1,  us-west-1, us-east-1, ap-south-1. |
| service-name | -            | No                      | Yes                    | The  name of the service.                                    |
| qualifier    |              | No                      | No                     | The  version for which provisioned resources are configured. Only LATEST and  service aliases are supported. |
| table        |              | No                      |                        | Specifies  whether the output is in the form of a table.     |

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)

### Examples

- **If a resource description file (YAML) exists,** run the `s provision list` command to view the list of provisioned instances.
- **In CLI mode (no YAML file)**, specify the region where the service resides and the name of the service. Example: `s cli fc provision list --region cn-hangzhou --service-name fc-deploy-service`.

Sample output:

```text
fc-deploy-test: 
  - 
    serviceName:            fc-deploy-service
    qualifier:              release
    functionName:           http-trigger-py36
    resource:               1583208943291465#fc-deploy-service#release#http-trigger-py36
    target:                 1
    current:                1
    scheduledActions:       (empty array)
    targetTrackingPolicies: (empty array)
```

When the `--table` parameter is specified, the following output is returned:

```text
  ┌────────────┬────────────┬────────────┬────────────┬────────────┬────────────────────────────┬────────────────────────────┐
  │ serviceNam │ qualifier  │ functionNa │   target   │  current   │      scheduledActions      │   targetTrackingPolicies   │
  │     e      │            │     me     │            │            │                            │                            │
  ├────────────┼────────────┼────────────┼────────────┼────────────┼────────────────────────────┼────────────────────────────┤
  │ fc-deploy- │ release    │ http-trigg │ 1          │ 1          │                            │                            │
  │ service    │            │ er-py36    │            │            │                            │                            │
  └────────────┴────────────┴────────────┴────────────┴────────────┴────────────────────────────┴────────────────────────────┘
```


## provision put command

You can run the `provision put` command to configure provisioned resources. 

You can run the `provision put -h` or `provision put --help` command to obtain the help document.

### Parameter description

| Parameter     | Abbreviation | Required in YAML mode | Required in CLI mode | Description                                                  |
| ------------- | ------------ | --------------------- | -------------------- | ------------------------------------------------------------ |
| region        | -            | No                    | Yes                  | The name of the region. Valid values: `cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1`. |
| service-name  | -            | No                    | Yes                  | The name of the service.                                     |
| function-name | -            | No                    | Yes                  | Version description.                                         |
| config        |              | No                    | No                   | Specifies scheduled scaling and auto scaling configurations. |
| qualifier     |              | Yes                    | Yes                  | The version for which provisioned resources are configured. Only LATEST and service aliases are supported. |
| target        |              | No                    | No                   | The number of provisioned instances. If the value of the target parameter is greater than 0, provisioned function resources are configured. **You are charged for provisioned function resources.Release the resources that are no longer used to reduce costs.** If the value of the target parameter is 0, the provisioned resources are released. The `--target` parameter takes a greater weight than the `target` parameter in `--config`. If both the `target` parameter and `--target` parameter exist, the value of the `target` parameter is preferentially used. |

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)


### Examples:
 
- **If a resource description file exists (YAML),** you can run the `s provision put` command to configure provisioned resources. Example: `s provision put --qualifier release --target 1`.
- **In CLI mode (no YAML file)**, specify the region where the service resides and the name of the service. Example: `s cli fc provision put --region cn-hangzhou --service-name fc-deploy-service --qualifier release --target 1 -h`;
 
Sample output:

```text
fc-deploy-test: 
  resource:               1583208943291465#fc-deploy-service#release#http-trigger-py36
  target:                 1
  scheduledActions:       []
  targetTrackingPolicies: []
```

> 💡 To remove provisioned resources, run the `s provision put` command. You need to only set the target value to 0. Example: `s provision put --qualifier release --target 0`.

> ⚠️ The `--target` parameter takes a greater weight than target in `--config`. If both the `target` parameter and `--target` parameter exist, the target value is preferentially used. [Alibaba Cloud Function Compute configures provisioned resources in multiple ways.](https://help.aliyun.com/document_detail/138103.html)Aside from the configuration by using the target parameter, you can use scheduled scaling and auto scaling policies. In this case, you must set the --config parameter. The --config parameter is used to identify a JSON file, which conforms to the following format:

```json
{
  "target": 2,
  "scheduledActions": [
    {"name":"timer","startTime":"2021-07-07T16:00:00.000Z","endTime":"2021-07-08T16:00:00.000Z","target":1,"scheduleExpression":"cron(0 0 12 * * *)"},
    {"name":"timer2","startTime":"2021-07-06T16:00:00.000Z","endTime":"2021-07-07T16:00:00.000Z","target":2,"scheduleExpression":"cron(0 0 12 * * *)"}
  ],
  "targetTrackingPolicies": [
    {"name":"zb","startTime":"2021-07-13T16:00:00.000Z","endTime":"2021-07-14T16:00:00.000Z","metricType":"ProvisionedConcurrencyUtilization","metricTarget":0.25,"minCapacity":1,"maxCapacity":3},
    {"name":"zb2","startTime":"2021-07-05T16:00:00.000Z","endTime":"2021-07-06T16:00:00.000Z","metricType":"ProvisionedConcurrencyUtilization","metricTarget":0.85,"minCapacity":4,"maxCapacity":5}
  ]
}
```

Parameter description:

| Parameter              | Type         | Required | Example | Description                                                  |
| ---------------------- | ------------ | -------- | ------- | ------------------------------------------------------------ |
| target                 | number       | Yes      | 1       | The number of  provisioned instances.                        |
| scheduledActions       | list[object] | No       |         | The configuration of  scheduled auto scaling. You can perform scheduled auto scaling to flexibly  configure provisioned instances. You can configure the number of provisioned  instances to be automatically adjusted to a specified value at scheduled  time. This way, the number of provisioned instances meets the concurrency  requirements of your business. |
| targetTrackingPolicies | list[object] | No       |         | The configuration of  metric tracking auto scaling. Provisioned instances are scaled in or out  every minute based on the concurrency utilization of provisioned instances. -  When the metric value exceeds the value of the metricTarget parameter, the  system scales out provisioned instances based on a progressive policy to make  the metric value close to the value of the metricTarget parameter. - When the  metric value is smaller than the value of the metricTarget parameter, the  system scales in provisioned instances based on a conservative policy to make  the metric value close to the value of the metricTarget parameter. If you specify  the maximum and minimum numbers of provisioned instances, the system scales  provisioned instances within the range from the minimum number to the maximum  number. If the number of provisioned instances is beyond the range, the  scaling stops. |

The following information describes the data structure of the `scheduledActions` parameter:

| Parameter          | Type   | Required | Example              | Description                                                  |
| ------------------ | ------ | -------- | -------------------- | ------------------------------------------------------------ |
| name               | string | Yes      | demoScheduler        | The name of the  scheduled task.                             |
| startTime          | string | Yes      | 2020-10-10T10:10:10Z | The time when the  scheduled auto scaling policy starts to take effect. |
| endTime            | string | Yes      | 2020-12-10T10:10:10Z | The time when the  scheduled auto scaling policy expires.    |
| target             | number | Yes      | 10                   | The number of  provisioned instances.                        |
| scheduleExpression | string | Yes      | cron(0 30 8 * * *)   | The schedule  information. Two formats are supported. - At expressions -  "at(yyyy-mm-ddThh:mm:ss)": runs the scheduled task only once. Use  the UTC format. - Cron expressions - “cron(0 0 20 * * *)“: runs the scheduled  task for multiple times. Use the standard crontab format. For example, the  scheduled task is executed at 20:00 every day. |


The following information describes the data structure of the `targetTrackingPolicies` parameter:

| Parameter    | Type           | Required | Example                           | Description                                                  |
| ------------ | -------------- | -------- | --------------------------------- | ------------------------------------------------------------ |
| name         | string         | Yes      | demoScheduler                     | The name of the  scheduled task.                             |
| startTime    | string         | Yes      | 2020-10-10T10:10:10Z              | The time when the  scheduled auto scaling policy starts to take effect. |
| endTime      | string         | Yes      | 2020-12-10T10:10:10Z              | The time when the  scheduled auto scaling policy expires.    |
| metricType   | string         | Yes      | ProvisionedConcurrencyUtilization | The type of the metric  to be tracked.                       |
| metricTarget | number(double) | Yes      | 0.6                               | The value of the  metric.                                    |
| minCapacity  | number         | Yes      | 10                                | The minimum number of  provisioned instances for scale-in.   |
| maxCapacity  | number         | Yes      | 100                               | The maximum number of  provisioned instances for scale-out.  |


## provision get command

The `provision get` command is used to obtain the details of provisioned instances. 

You can run the `provision get -h` or `provision get --help` command to obtain the help document.

### Parameter description
 
| Parameter   | Abbreviation | Required in YAML mode | Required in CLI mode | Description                           |
| ------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region    | -    | No      | Yes     | The name of the region. Valid values: `cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1`. |
| service-name | -    | No      | Yes     | The name of the service.                            |
| function-name | -    | No      | Yes     | Version description.                           |
| qualifier   |     | Yes      | Yes     | The version for which provisioned resources are configured. Only LATEST and service aliases are supported.          |

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)
 
### Examples
 
- **If a resource description file (YAML) is available,** you can run the `s provision get --qualifier qualifier` command to get the details of the provisioned instances.
- **In the command line mode (no YAML file),** specify the region and the name of the service. Example, `s cli fc provision get --region cn-hangzhou --service-name fc-deploy-service --qualifier release`;
 
 Sample output:

```text
fc-deploy-test: 
  serviceName:            fc-deploy-service
  functionName:           http-trigger-py36
  qualifier:              release
  resource:               1583208943291465#fc-deploy-service#release#http-trigger-py36
  target:                 1
  current:                1
  scheduledActions:       []
  targetTrackingPolicies: []
```

## Permissions and policies

- Permissions on the `provision list` and `provision get` commands: `AliyunFCReadOnlyAccess`.

- Permissions on the `provision put` command:

  ```yaml
  {
      "Version": "1",
      "Statement": [
          {
              "Action": "fc:PutProvisionConfig",
              "Effect": "Allow",
              "Resource": "acs:fc:<region>:<account-id>:services/services/<serviceName>.<qualifier>/functions/<functionName>"
          }
      ]
  }
  ```
