---
title: Nas commands
description: 'Nas commands'
position: 1
category: 'Other'
---
# Nas commands

The `nas` commands are used to perform operations on Apsara File Storage NAS (NAS), including uploading files, downloading files, and running custom commands. 

- [Command description](#Command-description)
- [nas init command](#nas-init-command)
  - [Parameter description](#Parameter-description)
  - [Examples](#Examples)
- [nas upload command](#nas-upload-command)
  - [Parameter description](#Parameter-description)
  - [Examples](#Examples-1)
- [nas download command](#nas-download-command)
  - [Parameter description](#Parameter-description-1)
  - [Examples](#Examples-2)
- [nas command command](#nas-command-command)
  - [Examples](#Examples-3)
- [Permissions and policies](#Permissions-and-policies)

> 💡Tips: To run the `nas` commands, the NAS service must be attached to Function Compute. You must take note of the following items before you use the nas commands:
>
> - The [NAS service](https://nasnext.console.aliyun.com/) is activated. Fees may incur if you activate the NAS service.
> -  When you perform operations on NAS, you must take note of the directory to which NAS is attached in Function Compute. For example, if NAS is attached to the `/mnt/auto` directory, you must specify the directory `/mnt/auto` when you upload and download files. Example: `s nas upload ./demo.yaml /mnt/auto/`.

## Command description

You can run the `nas -h` or `nas --help` command to obtain the help documentation.

The nas commands include the following subcommands:

- [init: initializes NAS.](#nas-init-command)
- [upload: Upload local files](#nas-upload-command)
- [download: Download remote files](#nas-download-command)
- [command: runs Linux commands in Function Compute.](#nas-command-command) 
 
## nas init command

The `nas init` command is used to initialize NAS. After you run the `s.yaml` or `s.yml` command to write a document, NAS resources may not be created before the project is deployed. In this case, you can run the `nas init` command to initialize NAS. This way, you can use NAS. 

You can run the `nas init -h` or `nas init --help` command to obtain the help documentation.

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)

### Examples

**If a resource description file in YAML exists**, you can run the `s nas init` to initialize NAS. The following example shows the output of the command:
```text
fc-deploy-test: 
  userId:      10003
  groupId:     10003
  mountPoints: 
    - 
      serverAddr: 06c1e48887-rmm92.cn-hangzhou.nas.aliyuncs.com
      nasDir:     /fc-deploy-service
      fcDir:      /mnt/auto
```

## nas upload upload

The `nas upload` command is used to upload local files to NAS. 

You can run the `nas upload -h` or `nas upload --help` command to view the help documentation.

### Parameter description
 
| Parameter | Abbreviation | Required in YAML mode | Description | 
| --------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | 
| recursive | r | No |                               |
| override | o | No |                               |

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)
 
### Examples
 
**If a resource description file in YAML exists**, you can run the `s nas upload` command to upload files. For example, you can run the `s nas upload ./template.yml to /mnt/auto` command to upload the local file `./template.yml` to the directory `/mnt/auto` to which NAS is attached in Function Compute.
 
```text
File [./template.yml] uploaded successfully.
```

If you need to upload a folder, you can add the `--recursive` or `-r` parameter to the command. Example: `s nas upload ./code /mnt/auto -r`.

```
Dir [./code] uploaded successfully.
```

> ⚠️ Note: If the file that you want to upload already exists, you need to add the `--override` or `-o` parameter to the command to overwrite the existing file. 

## nas download command

The `nas download` command is used to download files that are stored in NAS, which is attached to Function Compute. 

You can run the `nas download -h` or `nas download --help` command to obtain the help documentation.

### Parameter Description
 
| Parameter | Abbreviation | Required in YAML mode | Description | 
| -------- | -------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| override | o    | No      | Specifies that the existing file is overwritten. |
| no-unzip | - | No | Specifies that the folder is not decompressed. |

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)
 
### Examples 
 
**If a resource description file in YAML exists**, you can run the `s nas download` command to download a file. For example, you can run the `s nas download /mnt/auto/template.yml ./` command to download the file `./template.yml` that is stored in the directory `/mnt/auto` to which NAS is attached in Function Compute to the local directory `./`.
 
```text
File [/mnt/auto/template.yml] download successfully.
```

> ⚠️ Note: If the file that you want to upload already exists, you need to add the `--override` or `-o` parameter to the command to overwrite the existing file. 

## nas command command

The `nas command` command is used to run the specified commands in an instance. For example, you can run the `nas command` command to create a file or folder, or delete a file or folder in a function instance to which NAS is attached. 

You can run the `nas command -h` or `nas command --help` command to obtain the help documentation.

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)
 
### Examples 
 
**If a resource description file in YAML exists**, you can run the `s nas command` command to run the specified command in the Function Compute instance. For example, you can run the `s nas command ls /mnt/auto` command to view the directories in NAS: 

```text
code
template.yml
```

You can run the `s nas command mkdir /mnt/auto/demo` command to create a folder named demo in NAS.

## Permissions and policies

### Permissions required for a RAM user

#### Highest level of permissions

**System policy**：`AliyunFCFullAccess`、`AliyunVPCFullAccess`、`AliyunNasFullAccess`

#### Lowest level of permissions

When you run a command, you need to detect, deploy, and invoke helper functions. If nasConfig is set to `auto` when you run `nas init`, you must create resources related to nas. The following permissions are required:

**System policy**: `AliyunNasReadOnlyAccess`

**Custom policies**

```json
{   
  "Statement":[
        {
            "Action":"fc:GetAccountSettings",
            "Effect":"Allow",
            "Resource":"acs:fc:<region>:<account-id>:account-settings"
        },
        {
            "Action":[
                "fc:UpdateService",
                "fc:CreateService"
            ],
            "Effect":"Allow",
            "Resource":"acs:fc:<region>:<account-id>:services/*"
        },
        {
            "Action":[
                "fc:InvokeFunction",
                "fc:CreateFunction",
                "fc:UpdateFunction"
            ],
            "Effect":"Allow",
            "Resource":"acs:fc:<region>:<account-id>:services/*/functions/*"
        },
        {
            "Action":[
                "fc:UpdateTrigger",
                "fc:CreateTrigger"
            ],
            "Effect":"Allow",
            "Resource":"acs:fc:<region>:<account-id>:services/*/functions/*/triggers/*"
        },
        {
            "Action":"ram:PassRole",
            "Effect":"Allow",
            "Resource":"*"
        },
        {
            "Action":[
                "nas:CreateMountTarget",
                "nas:DescribeMountTargets",
                "nas:DescribeFileSystems",
                "nas:CreateFileSystem",
                "vpc:DescribeVSwitchAttributes"
            ],
            "Effect":"Allow",
            "Resource":"*"
        }
    ],
    "Version":"1"
}
```

### Permissions required for a service-linked role

**System policy**: AliyunECSNetworkInterfaceManagementAccess
