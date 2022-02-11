# Nas commands

The `nas` commands are used to perform operations on Apsara File Storage NAS (NAS), including uploading files, downloading files, and running custom commands. 

- [Command description](#Command-description)
- [nas init command](#nas-init-command)
  - [Parameter description](#Parameter-description)
  - [Examples](#Examples)
- [nas upload command](#nas-upload-command)
  - [Parameter description](#Parameter-description-1)
  - [Examples](#Examples-1)
- [nas download command](#nas-download-command)
  - [Parameter description](#Parameter-description-2)
  - [Examples](#Examples-2)
- [nas command command](#nas-command-command)
  - [Parameter description](#Parameter-description-3)
  - [Examples](#Examples-3)
- [Permissions and policies](#Permissions-and-policies)

> 💡Tips: To run the `nas` commands, the NAS service must be attached to Function Compute. You must take note of the following items before you use the nas commands:
>
> - The [NAS service](https://nasnext.console.aliyun.com/) is activated. Fees may incur if you activate the NAS service.
> -  When you perform operations on NAS, you must take note of the directory to which NAS is attached in Function Compute. For example, if NAS is attached to the `/mnt/auto` directory, you must specify the directory `/mnt/auto` when you upload and download files. Example: `s nas upload ./demo.yaml /mnt/auto/`.

## Command description

You can run the `nas -h` or `nas --help` command to obtain the help documentation:

```shell script
Nas

  Upload and download files for NAS service. 

Usage

  $ s nas <sub-command> <options>

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/nas.md

SubCommand List

  init       Init nas resource; help command [s nas init -h]               
  upload     Upload resources; help command [s nas upload -h] 
  download   Download resources; help command [s nas download -h]  
  command    Execute relevant instructions; help command [s nas command -h]  
```


The nas commands include the following subcommands:
 
- [init: initializes NAS.](#nas-init-command)
- [upload: queries aliases.](#nas-upload-command)
- [download: publishes or updates aliases.](#nas-download-command)
- [command: runs Linux commands in Function Compute.](#nas-command-command) 
 

## nas init command

The `nas init` command is used to initialize NAS. After you run the `s.yaml` or `s.yml` command to write a document, NAS resources may not be created before the project is deployed. In this case, you can run the `nas init` command to initialize NAS. This way, you can use NAS. 
 
You can run the `nas init -h` or `nas init --help` command to obtain the help documentation:

```shell script
Nas Init

  Init nas resources. 

Usage

  $ s nas init 

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/nas.md
                              
Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [string]		 [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations 

Examples with Yaml

  $ s nas init
```

### Parameter description



| Parameter | Abbreviation | Required   in YAML mode | Description                                                  |
| --------- | ------------ | ----------------------- | ------------------------------------------------------------ |
| access    | a            | No                      | The AccessKey pair  that is used in the request. You can use the AccessKey pair that is  configured by running the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add-command) and [the AccessKey pair that is   configured by using environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Configure-keys-by-using-environment-variables). |
| debug     | -            | No                      | The debug mode. If  you enable the debug mode, more log information is returned. |
| help      | h            | No                      | Views the help  information.                                 |


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

You can run the `nas upload -h` or `nas upload --help` command to view the help documentation:

```shell script
Nas Upload

  Upload resources

Usage

  $ s nas upload <options> <local> <remote> 

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/nas.md
                               
Options

  -r, --recursive     [Optional] Iterate to copy folder content 
  -o, --override      [Optional] Override existing files    

Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [string]      [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations 

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/en/yaml_and_cli.md

Examples with Yaml

  $ s nas upload /home/usr/demo.file /mnt/auto
```

### Parameter description
 
| Parameter | Abbreviation | Required in YAML mode | Description | 
| --------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | 
| recursive | r | No |                               |
| override | o | No |                               |
| access | a | No | The AccessKey pair that is used in the request. You can use the AccessKey pair that is configured by running the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add-command) and the [AccessKey pair that is configured by using environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md# Configure-keys-by-using-environment-variables). |
| debug | - | No | The debug mode. If you enable the `debug` mode, more log information is returned. |
| help | h | No | Views the help information. | 
 
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

You can run the `nas download -h` or `nas download --help` command to obtain the help documentation:

```shell script
Nas Download

  Download resources. 

Usage

  $ s nas download <options> <remote> <local> 

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/nas.md
                               
Options

  -o, --override     [Optional] Override existing files 
  --no-unzip         [Optional] Do not unzip the folder

Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [string]      [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations 

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/en/yaml_and_cli.md

Examples with Yaml

  $ s nas download /mnt/auto /home/usr/demo.file
```

### Parameter Description
 
| Parameter | Abbreviation | Required in YAML mode | Description | 
| -------- | -------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| override | o    | No      | Specifies that the existing file is overwritten. |
| no-unzip | - | No | Specifies that the folder is not decompressed. |
| access | a | No | The AccessKey pair that is used in the request. You can use the AccessKey pair that is configured by running the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add- command) and the [AccessKey pair that is configured by using environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md# Configure-keys-by-using-environment-variables). | 
| debug | - | No | The debug mode. If you enable the `debug` mode, more log information is returned. | 
| help | h | No | Views the help information. | 
 
### Examples 
 
**If a resource description file in YAML exists**, you can run the `s nas download` command to download a file. For example, you can run the `s nas download /mnt/auto/template.yml ./` command to download the file `./template.yml` that is stored in the directory `/mnt/auto` to which NAS is attached in Function Compute to the local directory `./`.
 
```text
File [/mnt/auto/template.yml] download successfully.
```

> ⚠️ Note: If the file that you want to upload already exists, you need to add the `--override` or `-o` parameter to the command to overwrite the existing file. 

## nas command command

The `nas command` command is used to run the specified commands in an instance. For example, you can run the `nas command` command to create a file or folder, or delete a file or folder in a function instance to which NAS is attached. 

You can run the `nas command -h` or `nas command --help` command to obtain the help documentation:

```shell script
Nas Command

  Operation instruction. 

Usage

  $ s nas command <command> 

Document
  
  https://github.com/devsapp/fc/blob/main/docs/en/command/nas.md
                               
Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [string]      [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations 

Examples with Yaml

  $ s nas command ls -al /mnt/auto
  $ s nas command rm -rf /mnt/auto/demoDir
  $ s nas command mkdir /mnt/auto/demoDir
```

### Parameter description
 
| Parameter | Abbreviation | Required in YAML mode | Description | 
| -------- | -------- | -------------- | ------------------------------------------------------------ | 
| access | a | No | The AccessKey pair that is used in the request. You can use the AccessKey pair that is configured by running the [config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add- command) and the [AccessKey pair that is configured by using environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md# Configure-keys-by-using-environment-variables). | 
| debug | - | No | The debug mode. If you enable the `debug` mode, more information is returned. | 
| help | h | No | Views the help information. | 
 
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
