---
title: Instance commands
description: 'Instance commands'
position: 4
category: 'Call&Debugging'
---
# Instance commands (Beta)

The `instance` command supports logging into active instances; including viewing the list of active instances and performing command-line operations on specified instances

- [Command description](#Command-description)
- [instance list command](#instance-list-command)
  - [Parameter description](#Parameter-description)
  - [Examples](#Examples)
- [instance exec command](#instance-exec-command)
  - [Parameter description](#Parameter-description-1)
  - [Examples](#Examples-1)
- [Scene case](#scene-case)

## Command description

When executing the command `instance -h`/`instance --help`, you can get help documentation.

## instance list command

`instance list` command to get a list of all currently active instances of the function.

When executing the command `instance list -h`/`instance list --help`, you can get help documentation.

### Parameter description

| Parameter    | Abbreviation | Required   in YAML mode | Required   in CLI mode | Description                                                  |
| ------------ | ------------ | ----------------------- | ---------------------- | ------------------------------------------------------------ |
| region | - | optional | required | cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu- west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | - | optional | required | service name |
| function-name | - | optional | required | function name |
| qualifier | - | optional | optional | version or alias, default is `LATEST` |

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)

### Examples

- **When there is a resource description file (Yaml)**, you can directly execute `s instance list` to get the alias list;
- **Pure command line form (when there is no resource description Yaml file)**, you need to specify the service region and service name, such as `s cli fc instance list --region cn-hangzhou --service-name fc-deploy- service --function-name test-instance`

Example of the execution result of the above command:
````text
fc-event-test:
  instances:
    -
      instanceId: c-****-1658cb3903eb4644b0ee
      versionId: 0
````


## instance exec command

`instance exec` command, log in to the specified instance.

When executing the command `instance exec -h`/`instance exec --help`, you can get help documentation.

### Parameter description

| Parameter    | Abbreviation | Required   in YAML mode | Required   in CLI mode | Description                                                  |
| ------------ | ------------ | ----------------------- | ---------------------- | ------------------------------------------------------------ |
| region | - | optional | required | cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu- west-1, us-west-1, us-east-1, ap-south-1` |
| service-name | - | optional | required | service name |
| function-name | - | optional | required | function name |
| qualifier | - | optional | optional | version or alias, default is `LATEST` |
| stdin | i | optional | optional | open stdin |
| tty | t | optional | optional | assign a terminal device |

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)

### Examples

- **When there is a resource description file (Yaml)**
1. First execute `s instance list` to get the instance list of the function, and select the instance ID that needs to be operated.
2. Execute the command

````
$ s instance exec --instance-id instanceId ls

$ s instance exec --instance-id instanceId -it /bin/bash
````

If you are using terminal mode, you can enter `exit` to open the link on the server side to exit (recommended), or execute `control + ]` to force the client to exit.

## Scenario case

### Troubleshoot online issues

In some daily scenarios, instance command-line operations will bring about a more efficient and convenient troubleshooting method that is more in line with user habits.

User Xiao Wang is a serverless novice user. After writing a program and deploying it to Function Compute, it is found that the environment variables set in the function do not take effect. If you investigate further, you need to modify the code, print the log, redeploy, and view the log, which is cumbersome to use. method of investigation. Now, with the help of the instance command line operation, Xiao Zhang can direct a command: s instance exec {instance_id} ENV to locate the problem in one step.

Instance command line operations provide a convenient login experience and help users solve application problems in complex scenarios. In some cases, users can no longer locate the problem through function logs and monitoring indicators, and need to use tools such as coredump, tcpdump, and jmap for in-depth investigation.

For example, user Xiao Li found that some function errors occurred in his online program recently, and the content of the error report was that the connection to a remote service timed out. Xiao Li suspects that the network link between the function instance and the remote service is unstable. He wants to enter the instance and investigate and analyze the network situation between the instance and the remote service. He can follow these steps:

1. After logging in to the instance, first install the tcpdump tool. You need to execute the two commands apt-get update and apt-get install tcpdump:
<img src="https://img.alicdn.com/imgextra/i2/O1CN011qHFxA1hMxYdmzFs4_!!6000000004264-2-tps-1500-674.png" />

2. After the installation is complete, execute the tcpdump command to capture the request of the remote service IP, and save the capture result in the tcpdump.cap file:
<img src="https://img.alicdn.com/imgextra/i4/O1CN01HK9vYp1NlQPYOQNHI_!!6000000001610-0-tps-1500-504.jpg" />

3. After capturing the packets, upload the tcpdump.cap file to your own OSS with the help of the OSS command line tool ossutil64 , and then download it to the local analysis tool wireshark for analysis.
<img src="https://img.alicdn.com/imgextra/i2/O1CN01eSFr0v21D9OTCTdhE_!!6000000006950-2-tps-1500-372.png" />
<img src="https://img.alicdn.com/imgextra/i3/O1CN01ycfLsb1CXGNkMcZ4z_!!6000000000090-2-tps-1500-519.png" />
