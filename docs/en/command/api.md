---
title: Api commands
description: 'Api commands'
position: 6
category: 'Other'
---
# Api commands (coming soon)

> The api commands are in the process of development, which will be available soon. You can use the FC-API component to perform related operations. For more information, see [FC-API component](https://github.com/devsapp/fc-api). 

The api commands are used to perform operations on Function Compute API. 

- [Command description](#Command-description)
  - [Parameter description](#Parameter-description)
  - [Examples](#Examples)
- [Permissions and policies](#Permissions-and-policies)


## Command description

You can run the `api -h` or `api --help` command to obtain the help documentation.

### Parameter description
 
| Parameter  | Abbreviation | Required in YAML mode | Description                           |
| ---------- | -------- | -------------- | ------------------------------------------------------------ |
| access   | a    | No      | The key that is used in the request. You can use the key information that is configured by using the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add-command), or [the Configure-keys-by-using-environment-variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Configure key information by using environment variables). |
| debug   | -    | No      | Enables the `debug` mode. In this case, more logs are generated.            |
| help    | h    | No      | Views the help information.                         |

### Examples
 
The following example uses the `ListService` operation as an example. For more information, visit https://help.aliyun.com/document_detail/175559.html. 
 
You only need to follow the `api` format to integrate features in the command line. Example: 
 
```shell script
s cli fc api ListService
```

In the ListService operation document, four optional parameters are available. You can deliver the parameters by using the --<parameter> format. Example:

```shell script
s cli fc api ListService --limit 20 --nextToken _FUN_NAS-classify --prefix _FUN_NAS
```

## Permissions and policies

Policies vary with API operations. You can define a policy based on the name of an operation. 

