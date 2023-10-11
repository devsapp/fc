---
title: Deploy commands
description: 'Deploy commands'
position: 1
category: 'Build&Deploy'

---

# Deploy commands

The `deploy` command is used to deploy function resources. You can use this command to deploy on-premises resources that are specified in a [YAML file](../yaml/readme.md) to an online environment. 

  - [Command description](#Command-description)
    - [Parameters description](#Parameters-description)
    - [Examples](#Examples)
    - [Precautions](#Precautions)
  - [deploy service command](#deploy-service-command)
    - [Parameters description](#Parameters-description-1)
    - [Examples](#Examples-1)
  - [deploy function command](#deploy-function-command)
    - [Parameters description](#Parameters-description-2)
    - [Examples](#Examples-2)
  - [deploy trigger command](#deploy-trigger-command)
    - [Parameters description](#Parameters-description-3)
    - [Examples](#Examples-3)
  - [deploy domain command](#deploy-domain-command)
    - [Parameters description](#Parameters-description-4)
    - [Examples](#Examples-4)
  - [Permissions and policies](#Permissions and policies)

> For more information about [how to deploy multiple functions](../tips.md#Declaration-and-deployment-of-multiple-functions), see [Tips](../tips.md). 

## Command description

You can run the `deploy -h` or `deploy --help` command to query the help information.

The deploy command consists of the following subcommands:

- [service: deploys only services](#deploy-service-command)
- [function: deploys only functions](#deploy-function-command)
- [trigger: deploys only triggers](#deploy-trigger-command)
- [domain: deploys only domains](#deploy-domain-command)


### Parameters description

| Full name  | Abbreviation | Required in YAML mode | Description                                                  |
| ---------- | ------------ | --------------------- | ------------------------------------------------------------ |
| type       | -            | No                    | The deployment type. Valid values:code and config.           |
| use-local  | -            | No                    | Preferentially uses on-premises configurations to deploy resources. |
| use-remote | -            | No                    | Preferentially uses online configurations to deploy resources. |
| assume-yes | y            | No                    | Selects yes by default for additional operations             |

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)

### Examples

**If a YAML resource description file exists**, you can run the `s deploy ` command to deploy resources. Sample output:

```text
fc-deploy-test: 
  region:   cn-hangzhou
  service: 
    name: fc-deploy-service
  function: 
    name:       http-trigger-py36
    runtime:    python3
    handler:    index.handler
    memorySize: 128
    timeout:    60
  url: 
    system_url:    https://1583208943291465.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/fc-deploy-service/http-trigger-py36/
    custom_domain: 
      - 
        domain: http://http-trigger-py36.fc-deploy-service.1583208943291465.cn-hangzhou.fc.devsapp.net
  triggers: 
    - 
      type: http
      name: httpTrigger
```

### Precautions

Take note of the following information about specific deployment scenarios:

- **Only need to deploy/update code**, you can add `--type code` parameter; only need to deploy/update configuration, you can add `--type config` parameter;

- **Interactive operations may be involved when deploying**:

  - When it is detected that the online resources are inconsistent with the last deployed resources recorded locally, it will remind you whether to use online resources or offline resources; if you do not want this interactive operation, you can add `- when executing the command -use-local`/`--use-remote` parameter, in this case, the local configuration/online configuration will be used first, for example:

  | Whether online services   exist | Whether online functions   exist | Recorded on-premises   services | Recorded on-premises   functions | On-premises services to   deploy | On-premises functions to   deploy | Direct deployment             | use-local                                  | use-remote                                                   |
  | ------------------------------- | -------------------------------- | ------------------------------- | -------------------------------- | -------------------------------- | --------------------------------- | ----------------------------- | ------------------------------------------ | ------------------------------------------------------------ |
  | Yes                             | Yes                              | Same as online services         | Same as online functions         | -                                | -                                 | No additional operation       | Online services and functions  are updated | Online services and functions  remain unchanged              |
  | Yes                             | No                               | Same as online services         | -                                | -                                | -                                 | No additional operation       | Online services and functions  are updated | Online services remain  unchanged, and online functions are created |
  | No                              | No                               | -                               | -                                | -                                | -                                 | No additional operation       | Online services and functions  are updated | Online services and functions  are created                   |
  | Yes                             | Yes                              | Different from online  services | Different from online  functions | Same as online services          | Same as online functions          | No additional operation       | Online services and functions  are updated | Online services and functions  remain unchanged              |
  | Yes                             | Yes                              | Different from online  services | Different from online  functions | Different from online  services  | Different from online  functions  | Additional operation required | Online services and functions  are updated | Online services and functions  remain unchanged              |

   > Online services & online functions: refers to services and functions that have been deployed;
   >
   > Locally recorded service & locally recorded function: refers to the state recorded when the deployment was performed locally last time, if it is the first time, no state is recorded;

   **Original intention of function design**: Since some services involve multiple team operations during deployment/update, if the default local configuration forcibly overrides the online configuration, it may cause the content to be updated through other channels/clients to become invalid. In order to More secure and standardized update function resources, so the ability to configure abnormal awareness online is introduced.

   > When deploying, an example of the form of interaction is as follows:
   >
   > ````
   > Local Last Deploy status => Online status
   > 
   > description: "this is a test" => "this is a test console"
   > 
   > ? Remote function: http-trigger-py36 is inconsistent with the config you deployed last time, deploy it with local config or remote
   > config? (Use arrow keys)
   > ❯ use local
   > use remote
   > ````
   >
   > At this time, it means that after the last local deployment and between the local deployment, the online function resources have been modified by other means. The modified content is `description`, and the content of the last deployment is `this is a test` `, the online configuration is now `this is a test console`, if you choose:
   >
   > - `use local`: The latest local configuration will be used by default to override the online configuration;
   > - `use remote`: this part will not be updated;

  - When deploying, when it detects that some additional configuration needs to be added to the process, it will remind you whether to add the configuration, etc.; for example, the Python language project, the `s build` operation is performed before deployment, and the deployment involves Put some dependency paths into environment variables to help dependencies take effect; if you do not want interactive operations at this time, you can add `-y`/`--assume-yes` parameters;

  > When deploying projects on CI/CD tools/platforms, in order to avoid the impact of interactive operations, you can consider using `--use-local`/`use-remote` and `-y`/`-- The assume-yes` parameter combination, for example, when the local configuration is explicitly preferred and all additional operations are agreed by default, resource deployment can be performed through `s deploy --use-local -y`.

  > ⚠️ Note: When deploying a function, if the domain name is configured as `auto`, the system will assign a test domain name by default. This domain name is only for testing, and its stability is not guaranteed. The Serverless Devs FC component has the right to Domain name recycling and other processing, such as online business, production demand business, it is strongly recommended to bind your own custom domain name.

## deploy service command

The `deploy service` command is a command to deploy service resources.

When executing the command `deploy service -h`/`deploy service --help`, you can get help documentation.
### Parameters description

| Full name   | Abbreviation | Required in YAML mode | Description                                                  |
| ----------- | ------------ | --------------------- | ------------------------------------------------------------ |
| use-local   | -            | No                    | Preferentially uses on-premises configurations to deploy resources. |
| use-remote | -            | No                    | Preferentially uses online configurations to deploy resources. |
| assume-yes  | y            | No                    | Selects yes by default for additional operations.            |

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)

### Examples

**If a YAML resource description file exists**, you can run the `s deploy service ` command to deploy services. Sample output:

```text
fc-deploy-test: 
  region:  cn-hangzhou
  service: 
    name: fc-deploy-service
```

> When you deploy services, additional operations may be required. For more information, see the Additional operations may be required when you deploy resources section in [Precautions](#Precautions). 

## deploy function commands

The `deploy function` command is the command to deploy the function.

When executing the command `deploy function -h`/`deploy function --help`, you can get help documentation.

### Parameters description

| Full name   | Abbreviation | Required in YAML mode | Description                                                  |
| ----------- | ------------ | --------------------- | ------------------------------------------------------------ |
| type        | -            | No                    | The deployment type. Valid values: code and config.          |
| use-local   | -            | No                    | Uses on-premises configurations to deploy resources.         |
| skip-push | -        | No           |  Skip auto push docker image   |
| use-remote | -            | No                    |                                                              |
| assume-yes  | y            | No                    | Selects yes by default for additional operations.            |

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)

### Examples

**If a YAML resource description file exists**, you can run the `s deploy function ` command to deploy functions. Sample output:

```text
fc-deploy-test: 
  region:   cn-hangzhou
  service: 
    name: fc-deploy-service
  function: 
    name:       http-trigger-py36
    runtime:    python3
    handler:    index.handler
    memorySize: 128
    timeout:    60
```

> When you deploy functions, additional operations may be required. For more information, see [Precautions](#Precautions). 


## deploy trigger command

The `deploy trigger` command is the command to deploy the function trigger.

When executing the command `deploy trigger -h`/`deploy trigger --help`, you can get help documentation.

### Parameters

| Full name    | Abbreviation | Required in YAML mode | Parameter                                                    |
| ------------ | ------------ | --------------------- | ------------------------------------------------------------ |
| trigger-name | -            | No                    | The names of the triggers that you want to deploy.           |
| use-local    | -            | No                    | Uses on-premises configurations to deploy resources.         |
| use-remote  | -            | No                    |                                                              |
| assume-yes   | y            | No                    | Selects yes by default for additional operations.            |

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)

### Examples

**If a YAML resource description file exists**, you can run the `s deploy trigger ` command to deploy triggers. Sample output: 

```text
fc-deploy-test: 
  region:   cn-hangzhou
  service: 
    name: fc-deploy-service
  function: 
    name:       http-trigger-py36
  url: 
    system_url: https://1583208943291465.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/fc-deploy-service/http-trigger-py36/
  triggers: 
    - 
      type: http
      name: httpTrigger
```

> When you deploy services, additional operations may be required. For more information, see the Additional operations may be required when you deploy resources section in [Precautions](#Precautions). 

You can use the --trigger-name parameter to deploy a specified trigger. Example:

```
$ s deploy trigger --trigger-name httpTrigger
```

## deploy domain command

The `deploy domain` command is a command to deploy a custom domain name.

When executing the command `deploy domain -h`/`deploy domain --help`, you can get help documentation.

### Parameters description

| Full name   | Abbreviation | Required in YAML mode | Description                                                  |
| ----------- | ------------ | --------------------- | ------------------------------------------------------------ |
| domain      | -            | No                    | The domain names that you want to deploy.                    |
| use-local   | -            | No                    | Uses on-premises configurations to deploy resources.         |
| use-remote | -            | No                    | Uses online configurations to deploy resources.              |
| assume-yes  | y            | No                    | Selects yes by default for additional operations.            |

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, etc.). For details, please refer to [Serverless Devs global parameters document](https://serverless-devs.com/en/serverless-devs/command/readme#supported-parameters)

### Examples

 **If a YAML resource description file exists**, you can run the `s deploy domain ` command to deploy custom domain names. Sample output:

```text
fc-deploy-test: 
  region:   cn-hangzhou
  service: 
    name: fc-deploy-service
  function: 
    name:       http-trigger-py36
  url: 
    custom_domain: 
      - 
        domain: http://http-trigger-py36.fc-deploy-service.1583208943291465.cn-hangzhou.fc.devsapp.net
```

> When you deploy services, additional operations may be required. For more information, see the Additional operations may be required when you deploy resources section in [Precautions](#Precautions). 

If you want to deploy a specified custom domain name, you can add the `--domain-name` parameter to your command. Example:

```
$ s deploy domain --domain-name http-trigger-py36.fc-deploy-service.1583208943291465.cn-hangzhou.fc.devsapp.net
```

## Permissions and policies

The permissions of the deploy command are related to the parameters that are configured in a YAML file. For more information about the configurations of fields and permissions in a YAML file, see [YAML specifications](../yaml/readme.md). 
