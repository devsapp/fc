---
title: 硬盘挂载 nas
description: '硬盘挂载 nas'
position: 1
category: '其他功能'
---
# Nas 命令

`nas` 命令是对硬盘挂载（NAS）产品操作的接口，包括上传文件、下载文件、执行自定义命令等能力。

- [命令解析](#命令解析)
- [nas init 命令](#nas-init-命令)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [nas upload 命令](#nas-upload-命令)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例-1)
- [nas download 命令](#nas-download-命令)
  - [参数解析](#参数解析-1)
  - [操作案例](#操作案例-2)
- [nas command 命令](#nas-command-命令)
  - [操作案例](#操作案例-3)
- [权限与策略说明](#权限与策略说明)

> 💡Tips：`nas` 相关的命令都是建立在函数计算挂载 NAS 服务的的前提下，所以在使用该命令时需要注意以下几点：
>
> - 需要开通 [NAS 相关的服务](https://nasnext.console.aliyun.com/) ，开通 NAS 服务可能会产生相对应的费用；
> - 对 NAS 操作时，需要注意函数计算挂载 NAS 的路径。例如 NAS 被挂载到了 `/mnt/auto` 目录上，那么在上传下载的时候，就需要指定 `/mnt/auto`，例如`s nas upload ./demo.yaml /mnt/auto/`

## 命令解析

当执行命令`nas -h`/`nas --help`时，可以获取帮助文档。

在该命令中，包括了四个子命令：

- [init：初始化 NAS 的命令](#nas-init-命令)
- [upload：上传本地文件](#nas-upload-命令)
- [download：下载远程文件](#nas-download-命令)
- [command：在 FC 中执行 linux 指令](#nas-command-命令)

## nas init 命令

`nas init` 命令，是初始化 NAS 的命令；通常在完成 `s.yaml`/`s.yml` 文档编写之后，在没有进行项目部署时，NAS 可能处于未被创建的过程，此时可以通过 `nas init` 命令初始化 NAS 相关内容，从而可以直接使用 NAS 相关能力。

当执行命令`nas init -h`/`nas init --help`时，可以获取帮助文档。

> 当前命令支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s nas init `进行 NAS 相关内容初始化，初始化完成的输出示例：

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


## nas upload 命令

`nas upload` 命令，是将本地文件上传到 NAS 系统中的命令。

当执行命令`nas upload -h`/`nas upload --help`时，可以获取帮助文档。

### 参数解析

| 参数全称  | 参数缩写 | Yaml模式下必填 | 参数含义                                                     |
| --------- | -------- | -------------- | ------------------------------------------------------------ |
| recursive | r        | 选填           |                                                              |
| override  | o        | 选填           |                                                              |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s nas upload `进行文件内容的上传，例如可以通过命令`s nas upload ./template.yml /mnt/auto`上传本地文件`./template.yml`到远端 NAS 挂载到函数计算的目录 `/mnt/auto` 中：

```text
File [./template.yml] uploaded successfully.
```

如果需要上传文件夹，可以通过增加`--recursive`/`-r`参数实现，例如`s nas upload ./code /mnt/auto -r `：

```
Dir [./code] uploaded successfully.
```

> ⚠️ 注意：在使用的时候，如果遇到文件已存在，需要按需通过`--override`/`-o`参数进行强制覆盖。



## nas download 命令

`nas download` 命令，是将挂载在函数计算的 NAS 系统中的文件下载到本地。

当执行命令`nas download -h`/`nas download --help`时，可以获取帮助文档。

### 参数解析

| 参数全称 | 参数缩写 | Yaml模式下必填 | 参数含义                                                     |
| -------- | -------- | -------------- | ------------------------------------------------------------ |
| override | o        | 选填           | 覆盖现有文件 |
| no-unzip | -        | 选填           | 不解压文件夹 |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s nas download `进行文件内容的下载，例如可以通过命令`s nas download /mnt/auto/template.yml ./`将远端 NAS 挂载到函数计算的目录 `/mnt/auto` 中文件`./template.yml`下载到本地目录`./`中：

```text
File [/mnt/auto/template.yml] download successfully.
```

> ⚠️ 注意：在使用的时候，如果遇到文件已存在，需要按需通过`--override`/`-o`参数进行强制覆盖。

## nas command 命令

`nas command` 命令，是在实例中执行特定指令的命令；例如通过 `nas command` 命令，在已经挂载 NAS 产品的函数实例中创建文件/文件夹/删除文件/文件夹等。

当执行命令`nas command -h`/`nas command --help`时，可以获取帮助文档。

> 支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s nas command `在函数计算实例中进行命令的执行，例如可以通过命令`s nas command ls /mnt/auto`查看 NAS 中的目录内容：

```text
code
template.yml
```

可以通过`s nas command mkdir /mnt/auto/demo`在 NAS 中创建文件夹 `demo`

## 权限与策略说明

### 子账号需要的权限

#### 最大权限

**系统策略**：`AliyunFCFullAccess`、`AliyunVPCFullAccess`、`AliyunNasFullAccess`

#### 最小权限

执行命令时，需要检测、部署、调用辅助函数，如果执行 `nas init` 时 `nasConfig` 为 `auto` 需要创建 nas 的相关资源，因此需要如下权限：

**系统策略**：`AliyunNasReadOnlyAccess`

**自定义策略**

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

### 服务角色权限

**系统策略**：`AliyunECSNetworkInterfaceManagementAccess`
