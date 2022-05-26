---
title: Plan commands
description: 'Plan commands'
position: 4
category: 'Build&Deploy'
---
# Plan commands

The `plan` commands are used to view the changes of Function Compute resources. 

- [Command description](#Command-description)
  - [Parameter description](#Parameter-description)
  - [Examples](#Examples)
- [Permissions and policies](#Permissions-and-policies)

## Command description

You can run `plan -h` or `plan --help` to obtain the help documentation.

### Parameter description
 
| Parameter | Abbreviation | Required in YAML mode | Description | 
| ---------- | -------- | -------------- | ------------------------------------------------------------ | 
| plan-type | - | Yes | Views changes that are caused by deployment or deletion. By default, changes that are caused by deployment are viewed. | 
| sub-command | - | No | Views the changes of resources. If you set plan-type to deploy, you can set sub-command to service, function, trigger, or domain. If you set plan-type to remove, you can set sub-command to service, function, trigger, domain, version, alias, provision, ondemand, onDemand, or layer. | 

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)
 
### Examples

**If a resource description file in YAML exists**, you can run the `s plan` command to view resource changes. The following results are returned: 

<img src="https://img.alicdn.com/imgextra/i2/O1CN017bjBoD1WlGpbZonjX_!!6000000002828-2-tps-1700-622.png"/>

> ~: Configuration modified
> -: Delete the configuration
> +: Add the configuration

The figure shows what is expected after `deploy` is executed：
1. Function description changed from 'This is default function description by fc-deploy component' to 'test update'
2. Function memorySize changed from 256 to 512
3. Removed the TESSDATA_PREFIX configuration for Function environmentVariables
4. Function environmentVariables added test_add

## Permissions and policies

If you use the plan commands, we recommend that you configure the system policy: `AliyunFCReadOnlyAccess`.
