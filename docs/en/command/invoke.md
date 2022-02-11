# Invoke commands

The `invoke` command is used to invoke or trigger online functions. 

- [Command description](#Command-description)
  - [Parameter description](#Parameter-description)
  - [Examples](#Examples)
  - [Precautions](#Precautions)
- [Permissions and policies](#Permissions-and-policies)

## Command description

You can run the `invoke -h` or `invoke --help` command to obtain the help documentation:

```shell script
Invoke

  Invoke/trigger online functions 

Usage

  s invoke <options>  
                                          
Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/invoke.md

Options

  --region [string]               [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [string]         [C-Required] Specify the fc service name  
  --function-name [string]        [Optional] Specify the fc function name   
  --timeout [number]              [Optional] Configure client timeout
  -e, --event [string]            [Optional] Event data passed to the function during invocation (default: "")                                                         
  -f, --event-file [string]       [Optional] Event funtion: A file containing event data passed to the function during invoke                                                                 
  -s, --event-stdin [string]      [Optional] Read from standard input, to support script pipeline                                                      
  --invocation-type [async/sync]  [Optional] Invocation type, value: async/sync, default: sync                                                                                                
  --stateful-async-invocation-id  [Optional] Stateful asynchronous invocation, only takes effect when --invocation-type=async                           

Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [string]      [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations    

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/docs/docs/en/yaml_and_cli.md

Event Format
  
  Quickly obtain the data structures of different events through the command [s cli fc-event -h]

Examples with Yaml

  $ s invoke               

Examples with CLI

  $ s cli fc invoke --region cn-hangzhou --service-name serviceName --function-name functionName --event evnetString                              
```

### Parameter description
 
| Parameter    | Abbreviation | Required in YAML mode | Required in CLI mode | Description                           |
| --------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region     | -    | No      | Yes     | The region where the service resides. Valid values: `cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, and ap-south-1`. |
| service-name  | -    | No      | Yes     | The name of the service.                            |
| function-name  | -    | No      | Yes     | The name of the function.                            |
| timeout      | -   | No      | No     | The client timeout session. [Timeout setting principles] (https://github.com/devsapp/fc/issues/480) |
| event      | e    | No      | No     | The event.                             |
| event-file   | f    | No      | No     | The event file.                           |
| event-stdin   | s    | No      | No     | The file of the event.                           |
| invocation-type | -    | No      | No     | The invocation type. Valid values: `async, sync`. Default value: `sync`.       |
| stateful-async-invocation-id | -    | No      | No     | The stateful asynchronous invocation.   |
| access     | a    | No      | No     | The AccessKey pair that is used in the request. You can use the AccessKey pair that is configured by running the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add-command), or the AccessKey pair that is configured by using [environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Configure the AccessKey pair by using environment variables). |
| debug      | -    | No      | No     | The debug mode. If you enable the `debug` mode, more log information is returned.            |
| help      | h    | No      | No     | The help information.                         |
 
### Examples


- **If the YAML description file of a resource exists, you can run the `s invoke` command to invoke online functions.
- **If the YAML description file of a resource does not exist (only CLI mode available)**, you need to specify the region where the service resides, the service name, and the function name. Example: `s invoke --region cn-hangzhou --service-name fc-deploy-service --function-name http-trigger-py36`
 
Sample command output: 

```text
Request url: https://1583208943291465.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/fc-deploy-service/http-trigger-py36/
========= FC invoke Logs begin =========
FC Invoke Start RequestId: 68f15da2-a453-4f7e-90d3-91198b76afbf
FC Invoke End RequestId: 68f15da2-a453-4f7e-90d3-91198b76afbf

Duration: 2.96 ms, Billed Duration: 3 ms, Memory Size: 128 MB, Max Memory Used: 10.83 MB
========= FC invoke Logs end =========

FC Invoke Result[code: ${resp.code}]:
Hello world!
```

### Precautions

During the function invocation, if you need to specify related events, such as Object Storage Service (OSS) events, Alibaba Cloud CDN (CDN) events, you can use the following command to obtain the event format: `s cli fc-event`:

| Method     | Method   description      | Example   of input parameters | CLI   invocation example   |
| ---------- | ------------------------- | ----------------------------- | -------------------------- |
| http       | HTTP trigger event        |                               | s cli fc-event http        |
| cdn        | CDN trigger event         |                               | s cli fc-event cdn         |
| mns        | MNS topic trigger  event  |                               | s cli fc-event mns         |
| oss        | OSS trigger event         |                               | s cli fc-event oss         |
| sls        | SLS trigger event         |                               | s cli fc-event sls         |
| tablestore | Tablestore trigger  event |                               | s cli fc-event  tablestore |


The following example uses an OSS event for testing. You can run the `s cli fc-event oss` command to obtain the information about the OSS event, and you can find the relative path in the following command output:
```
OSS event template created successfully.

👓 Event Template Path: event-template/oss-event.json

You could user fc/fc-api component invoke method and specify the event.
E.g: [s projectName invoke --event-file  event-template/oss-event.json]

More information about OSS Trigger: 
📝 https://help.aliyun.com/document_detail/74763.htm
```

You can use the template of the path to trigger functions. The template can be modified based on your business requirements. Example: `s invoke --event-file event-template/oss-event.json`.

## Permissions and policies

- Policy that contains the highest-level permissions: `AliyunFCInvocationAccess` or `AliyunFCFullAccess`

- Policy that contains the lowest-level permissions:: 

  ```yaml
  {
      "Version": "1",
      "Statement": [
          {
              "Action": "fc:InvokeFunction",
              "Effect": "Allow",
              "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>.<qualifier>/functions/<functionName>"
          }
      ]
  }
  ```
