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

You can run `plan -h` or `plan --help` to obtain the help documentation:

```shell script
Plan

  Perceived resource change

Usage

  s plan <options>  
                            
Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/plan.md    

Options

  --type-plan [remove/deploy]   [Required] Expected instruction,value: remove/deploy(default: "deploy")               
  --sub-command string          [Optional] Expected subcommand.                                                       
                                If type-plan is deploy, optional value:service/function/trigger/domain                
                                If type-plan is remove, optional                                                      
                                value:service/function/trigger/domain/version/alias/provision/ondemand/onDemand/layer

Global Options

  -h, --help                 [Optional] Help for command    
  -a, --access [string]      [Optional] Specify key alias             
  --debug                    [Optional] Output debug informations        

Examples with Cli

  $ s plan              
```

### Parameter description
 
| Parameter | Abbreviation | Required in YAML mode | Description | 
| ---------- | -------- | -------------- | ------------------------------------------------------------ | 
| type-plan | - | Yes | Views changes that are caused by deployment or deletion. By default, changes that are caused by deployment are viewed. | 
| sub-command | - | No | Views the changes of resources. If you set type-plan to deploy, you can set sub-command to service, function, trigger, or domain. If you set type-plan to remove, you can set sub-command to service, function, trigger, domain, version, alias, provision, ondemand, onDemand, or layer. | 
| access | a | No | The AccessKey pair that is used in the request. You can use the AccessKey pair that is configured by running the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add- command) and the [AccessKey pair that is configured by using environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md# Configure-keys-by-using-environment-variables). | 
| debug | - | No | The debug mode. If you enable the `debug` mode, more log information is returned. | 
| help | h | No | Views the help information. | 
 
### Examples

**If a resource description file in YAML exists**, you can run the `s plan` command to view resource changes. The following results are returned: 

```text
Local Last Deploy status => Online status

  description: "this is a test" => "ssssssssss. this is a test"
  timeout: 160 => 100
```

Take note of the following situations:

- Create a new local project：
    - If the resources of the desired function do not exist in Function Compute, the information about the resource to be created is displayed.
      ```shell script
      ✅ Resources to create:
      
        service:
          name: abc
          description: efg
      ```
    - If the resources of the desired function exist in Function Compute, the difference between the resources that need to be created for the local project and the configurations of the desired function in Function Compute is displayed. 
      ```shell script
      ✅ Resources to change (release => new):
        
        service:
          name: abc
          description: efg  =>   demo
      ```
- Create an existing local project：
    - If the resources of the desired function do not exist in Function Compute, the information about the resource to be created is displayed.
      ```shell script
      ✅ Resources to create:
      
        service:
          name: abc
          description: efg
      ```
    - The resources of the desired function exist in Function Compute:
        - If the resource status of the last local deployment is inconsistent with the resource status in Function Compute, the changes of the resource status in Function Compute since the last local deployment and the changed resources are displayed. 
          ```shell script
          ⚠️ Hazard change (last state => release):
            service:
              name: abc
              description: test  =>  efg
          
          ✅ Resources to change (release => new):
            
            service:
              name: abc
              description: efg  =>   demo
          ```
        - If the resource status of the last local deployment is the same as the resource status in Function Compute, the difference between the resources that need to be updated for the local project and the configurations of the desired function in Function Compute are displayed.
          ```shell script
          ✅ Resources to change (release => new):
            
            service:
              name: abc
              description: efg  =>   demo
          ```

## Permissions and policies

If you use the plan commands, we recommend that you configure the system policy: `AliyunFCReadOnlyAccess`.
