---
title: Stress commands
description: 'Stress commands'
position: 5
category: 'Other'
---
# Stress commands

The `stress` commands are used to perform a stress testing on a function. 

- [Related principles](#Related-principles)
- [ommand description](#ommand-description)
- [stress start commands](#stress-start-commands)
  - [Parameter description](#Parameter-description)
  - [Examples](#Examples)
- [stress clean commands](#stress-clean-commands)
  - [Parameter description](#Parameter-description-1)
  - [Examples](#Examples-1)
- [Permissions and policies](#Permissions-and-policies)


## Related principles

The `stress` commands create a helper function to perform a stress testing on a function. The following figure shows the workflow:

![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1647526464542_20220317141428852826.png)

1. The `stress start` command creates a helper function based on the built-in configuration of the component. Both the name of the helper function and the name of the service to which the helper function belongs are `_DEFAULT_FC_STRESS_COMPONENT_SERVICE`.

2. You can invoke the created helper function. Parameters for stress testing are included in the payload parameter. The helper function performs stress testing on the desired function based on [Python Locust](https://docs.locust.io/en/stable/).

3. After the stress testing, the results of stress testing are returned to the local environment.

4. After the local environment receives the results, the local environment displays the results and generates an HTML report.


## Command description

You can run the `stress -h` or `stress --help` command to obtain the help documentation.


The stress commands include the following subcommands:
 
- [start: starts stress testing.](#stress-start-command)
- [clean: cleans resources that are created during stress testing.](#stress-clean-command) 

## stress start command

The `stress start` command is used to perform stress testing on functions in Function Compute. 
 
You can run the `stress start -h` or `stress start --help` command to obtain the help documentation.

### Parameter description

| Parameter       | Abbreviation | Required   in YAML mode | Required   in CLI mode | Description                                                  |
| --------------- | ------------ | ----------------------- | ---------------------- | ------------------------------------------------------------ |
| region          | -            | No                      | Yes                    | The region in which  the function that you want to perform stress testing is located. Valid  values: cn-hangzhou,  cn-beijing, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote,  cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2,  ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1,  us-west-1, us-east-1, and ap-south-1. |
| service-name    | -            | No                      | Yes                    | The name of the  service to which the function that you want to perform stress testing  belongs. |
| function-name   | -            | No                      | Yes                    | The name of the  function on which you want to perform stress testing. |
| function-type   | -            | No                      | No                     | The type of the  function. Valid values: event  and http. By default, the type of the function  is determined by the function configurations that are configured in Function  Compute. If the type fails to be determined, you can specify a type. |
| method          | -            | No                      | No                     | The request method of  the HTTP request, such as GET and POST. This parameter takes effect only on  stress testing for functions that are triggered by HTTP requests. |
| payload         | -            | No                      | No                     | If you perform stress  testing on the function that is triggered by events, this parameter specifies  the event data that is passed in when you invoke the function. If you perform  stress testing on the function that is triggered by HTTP requests, this parameter  specifies the request body that is passed in when you invoke the function. |
| payload-file    | -            | No                      | No                     | Passes in the value of  the payload parameter as a file.     |
| num-user        | -            | No                      | No                     | The number of  simulated concurrent users during stress testing. |
| qualifier       | q            | No                      | No                     | The version  information about the function on which you want to perform stress testing.  This parameter takes effect only when you perform stress testing on the  function that is triggered by events. |
| run-time        | -            | No                      | No                     | The running duration  of stress testing.                     |
| spawn-rate      | -            | No                      | No                     | The number of new  simulated users per second.               |
| url             | u            | No                      | No                     | The URL of the  function on which the stress testing is performed. This parameter takes  effect only when you perform stress testing on the function that is triggered  by events. |
| invocation-type | -            | No                      | No                     | The type of function  invocation. Valid values: async and sync. |
| access          | a            | No                      | No                     | The AccessKey pair  that is used in the request. You can use the AccessKey pair that is  configured by running the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add-command) and the AccessKey pair that is [configured by using environment   variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Configure-keys-by-using-environment-variables). |
| debug           | -            | No                      | No                     | The debug mode. If  you enable the debug mode, more log information is returned. |
| help            | h            | No                      | No                     | Views the help  documentation.                               |



### Examples

- **If a resource description file in YAML exists**, you can run the `s stress start` command to perform stress testing on the desired function.
- **For the CLI mode in which no resource description file in YAML exists**, you need to specify the information such as the region in which the service is located, the service name, and the function name. Example: `s cli fc stress start --region cn-hangzhou --access myAccess --service-name fc-deploy-service --function-name http-trigger-py36 --function-type event`.

The following example shows the output of the preceding command:

```text
Html report flie: /Users/jiangyu/.s/cache/fc-stress/html/url#2021-11-10T15-48-10.html
Execute 'open /Users/jiangyu/.s/cache/fc-stress/html/url#2021-11-10T15-48-10.html' on macos for html report with browser.
fc-deploy-test: 
  Average:     8
  Error:       HTTPConnectionPool(host='undefined', port=80): Max retries exceeded with url: / (Caused by NewConnectionError(': Failed to establish a new connection: [Errno -2] Name or service not known',))
  Fails:       20699
  Failures/s:  690
  Max:         55
  Method:      undefined
  Min:         1
  Name:        /
  Occurrences: 20699
  RPS:         690
  Requests:    20699
  p50:         8
  p60:         8
  p70:         9
  p90:         10
  p95:         11
  p99:         18
```

You can check the stress testing report based on the returned information. Example: `Execute 'open /Users/jiangyu/.s/cache/fc-stress/html/url#2021-11-10T15-48-10.html' on macos for html report with browser`.

![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1636530616197_20211110075023373607.png)
![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1636530626182_20211110075035336150.png)


## stress clean command

The `stress clean` command is used to clean up the resources that are used for stress testing and local HTML stress testing reports. 

You can run the `stress clean -h` command to obtain the help documentation.

### Parameter description
 
| Parameter    | Abbreviation | Required   in YAML mode | Required   in CLI mode | Description                                                  |
| ------------ | ------------ | ----------------------- | ---------------------- | ------------------------------------------------------------ |
| region | - | No | No | The region in which the function on which you want to perform stress testing is located. Valid values: `cn-hangzhou, cn-beijing, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, and ap-south-1`. | 
| service-name | - | No | No | | 
| function-name | - | No | No | | 
| assume-yes | y | No | No | By default, `y` is selected. | 
| access | a | No | No | The AccessKey pair that is used in the request. You can use the AccessKey pair that is configured by running the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add- command) and the [AccessKey pair that is configured by using environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md# Configure-keys-by-using-environment-variables). | 
| debug | - | No | No | The debug mode. If you enable the `debug` mode, more log information is returned. | 
| help | h | No | No | Views the help information. | 

### Examples
 
- **If a resource description file in YAML exists**, you can run the `s stress clean` command to clean up the helper function created for the stress testing.
- **For the CLI mode in which no resource description file in YAML exists,** you need to specify the information such as the region in which the service is located, the service name, and the function name. Example: `s cli fc stress clean --region cn-hangzhou --service-name fc-deploy-service --function-name http-trigger-py36 `. 
 
The following example shows the output of the preceding command:

```text
Resource cleanup succeeded.
```


## Permissions and policies

- The `stress start` command is used to deploy and invoke a helper function. The following permissions are required:
  - Highest level of permissions：`AliyunFCFullAccess`
  - Lowest level of permissions：
  ```shell
  {
    "Version": "1",
    "Statement": [
      {
        "Action": [
          "fc:UpdateService",
          "fc:CreateService",
          "fc:GetService"
        ],
        "Resource": "acs:fc:<region>:<account-id>:services/_DEFAULT_FC_STRESS_COMPONENT_SERVICE",
        "Effect": "Allow"
      },
      {
        "Action": [
            "fc:InvokeFunction",
            "fc:UpdateFunction",
            "fc:CreateFunction",
            "fc:GetFunction"
        ],
        "Effect": "Allow",
        "Resource": "acs:fc:<region>:<account-id>:services/_DEFAULT_FC_STRESS_COMPONENT_SERVICE.*/functions/*"
      },
      {
            "Action": "ram:PassRole",
            "Effect": "Allow",
            "Resource": "*"
      }
    ]
  }
  ```
-  The `stress clean` command is used to delete the helper function. The following permissions are required:
  - Highest level of permissions：`AliyunFCFullAccess`
  - Lowest level of permissions：
  ```shell
  {
    "Version": "1",
    "Statement": [
      {
        "Action": "fc:DeleteService",
        "Resource": "acs:fc:<region>:<account-id>:services/_DEFAULT_FC_STRESS_COMPONENT_SERVICE",
        "Effect": "Allow"
      },
      {
        "Action": "fc:DeleteFunction",
        "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>/functions/*",
        "Effect": "Allow"
      }
    ]
  }
  ```
