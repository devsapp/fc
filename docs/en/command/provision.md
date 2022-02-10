# Provision 命令

`provision` 命令是进行函数预留操作的命令；主要包括预留配置的查看与更新等操作。

- [命令解析](#命令解析)
- [provision list 命令](#provision-list-命令)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [provision put 命令](#provision-put-命令)
  - [参数解析](#参数解析-1)
  - [操作案例](#操作案例-1)
- [provision get 命令](#provision-get-命令)
  - [参数解析](#参数解析-2)
  - [操作案例](#操作案例-2)
- [remove provision](remove.md#remove-provision-命令)
- [权限与策略说明](#权限与策略说明)

>  ⚠️ 注意：**预留资源会持续产生费用，如果不需要请及时释放资源**

## 命令解析

当执行命令`provision -h`/`provision --help`时，可以获取帮助文档：

```shell script
Provision

  Resource reservation operation 

Usage

  s provision <sub-command> <options>

Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/provision.md

SubCommand List

  list      View the list of resource reservation; help command [s provision list -h] 
  put       Put resource reservation; help command [s provision put -h] 
  get       Get resource reservation; help command [s provision get -h] 
```


在该命令中，包括了三个子命令：

- [list：查看预留列表](#provision-list-命令)
- [put：配置预留（配置规则，包括缩减到0，即删除预留）](#provision-put-命令)
- [get：获取预留配置详情](#provision-get-命令)

## provision list 命令

`provision list` 命令，是查看服务已发布的版本列表的命令。

当执行命令`provision list -h`/`provision list --help`时，可以获取帮助文档：

```shell script
Provision list

  View the list of provision 

Usage

  s provision list <options>

Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/provision.md
                               
Options

  --region [string]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [string]             [C-Required] Specify the fc service name
  --qualifier string                  [C-Required] Specify the qualifier parameter. Only supports LATEST and alias
  --table                             [Optional] Table format output     

Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [string]      [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations 

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/docs/docs/zh/yaml_and_cli.md

Examples with Yaml

  $ s version list 

Examples with CLI

  $ s cli fc version list --region cn-hangzhou --service-name serviceName 
```

### 参数解析

| 参数全称      | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region        | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name  | -        | 选填           | 必填          | 服务名                                                       |
| qualifier     |          | 选填           | 选填          | 配置预留的版本，仅支持服务的 LATEST 和别名                   |
| table         |          | 选填           |               | 是否以表格形式输出                                           |
| access        | a        | 选填           | 选填          | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug         | -        | 选填           | 选填          | 打开`debug`模式，将会输出更多日志信息                        |
| help          | h        | 选填           | 选填          | 查看帮助信息                                                 |

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s provision list`查看当前预留示例列表；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，例如`s cli fc provision list --region cn-hangzhou --service-name fc-deploy-service`；

上述命令的执行结果示例：

```text
fc-deploy-test: 
  - 
    serviceName:            fc-deploy-service
    qualifier:              release
    functionName:           http-trigger-py36
    resource:               1583208943291465#fc-deploy-service#release#http-trigger-py36
    target:                 1
    current:                1
    scheduledActions:       (empty array)
    targetTrackingPolicies: (empty array)
```

如果指定了`--table`参数，输出示例：

```text
  ┌────────────┬────────────┬────────────┬────────────┬────────────┬────────────────────────────┬────────────────────────────┐
  │ serviceNam │ qualifier  │ functionNa │   target   │  current   │      scheduledActions      │   targetTrackingPolicies   │
  │     e      │            │     me     │            │            │                            │                            │
  ├────────────┼────────────┼────────────┼────────────┼────────────┼────────────────────────────┼────────────────────────────┤
  │ fc-deploy- │ release    │ http-trigg │ 1          │ 1          │                            │                            │
  │ service    │            │ er-py36    │            │            │                            │                            │
  └────────────┴────────────┴────────────┴────────────┴────────────┴────────────────────────────┴────────────────────────────┘
```


## provision put 命令

`provision put` 命令用于配置预留。

当执行命令`provision put -h`/`provision put --help`时，可以获取帮助文档：

```shell script
Provision put

  Set reserved configuration 

Usage

  s provision put <options>

Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/provision.md
                           
Options

  --region [string]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [string]             [C-Required] Specify the fc service name  
  --function-name [string]            [C-Required] Specify the fc function name   
  --config string                     [Optional] Specify the configuration path parameter                         
  --qualifier string                  [C-Required] Specify the qualifier parameter. Only supports LATEST and alias                           
  --target number                     [Optional] Specify the provision target parameter          

Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [string]      [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations 

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/docs/docs/zh/yaml_and_cli.md

Examples with Yaml

  $ s provision put --target 1 --qualifier alias                
  $ s provision put --config ./provision.json --qualifier alias 

Examples with CLI

  $ s cli fc provision put --region cn-hangzhou --service-name serviceName --function-name functionName --qualifier alias --target 1         
```

### 参数解析

| 参数全称      | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region        | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name  | -        | 选填           | 必填          | 服务名                                                       |
| function-name | -        | 选填           | 必填          | 版本描述                                                     |
| config        |          | 选填           | 选填          | 定时伸缩与弹性伸缩配置                |
| qualifier     |          | 选填           | 必填          | 配置预留的版本，仅支持服务的 LATEST 和别名                   |
| target        |          | 选填           | 选填          | 预留实例数量，target 如果大于0，配置函数预留，**预留资源会持续产生费用，如果不需要请及时释放资源**；target 如果等于0，释放预留资源；`--target`参数的权重大于`--config`中的`target`，即如果`config`的配置文件中和参数指定同时存在`target`配置，优先使用参数中的`target`配置 |
| access        | a        | 选填           | 选填          | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug         | -        | 选填           | 选填          | 打开`debug`模式，将会输出更多日志信息                        |
| help          | h        | 选填           | 选填          | 查看帮助信息                                                 |

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s provision put`进行版本的发布，例如`s provision put --qualifier release --target 1`；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，例如`s cli fc provision put --region cn-hangzhou --service-name fc-deploy-service --qualifier release --target 1 -h`；

上述命令的执行结果示例：

```text
fc-deploy-test: 
  resource:               1583208943291465#fc-deploy-service#release#http-trigger-py36
  target:                 1
  scheduledActions:       []
  targetTrackingPolicies: []
```

> 💡 删除预留：删除预留的方法，可以通过`s provision put`命令，进行删除，只需要将`target`调整为0即可。例如`s provision put --qualifier release --target 0`

> ⚠️ `--target`参数的权重大于`--config`中的`target`，即如果`config`的配置文件中和参数指定同时存在`target`配置，优先使用参数中的`target`配置
<a id="provision-config" href="#provision-config"></a>
[阿里云函数计算配置预留拥有多种形式](https://help.aliyun.com/document_detail/138103.html)，单纯通过`target`参数进行控制的只是非常简单的配置，除此之外还支持定时伸缩与弹性伸缩配置方法，此时就需要对`--config`参数进行配置，`--config`参数识别的是一个 JSON 文件，基础格式如下：

```json
{
  "target": 2,
  "scheduledActions": [
    {"name":"timer","startTime":"2021-07-07T16:00:00.000Z","endTime":"2021-07-08T16:00:00.000Z","target":1,"scheduleExpression":"cron(0 0 12 * * *)"},
    {"name":"timer2","startTime":"2021-07-06T16:00:00.000Z","endTime":"2021-07-07T16:00:00.000Z","target":2,"scheduleExpression":"cron(0 0 12 * * *)"}
  ],
  "targetTrackingPolicies": [
    {"name":"zb","startTime":"2021-07-13T16:00:00.000Z","endTime":"2021-07-14T16:00:00.000Z","metricType":"ProvisionedConcurrencyUtilization","metricTarget":0.25,"minCapacity":1,"maxCapacity":3},
    {"name":"zb2","startTime":"2021-07-05T16:00:00.000Z","endTime":"2021-07-06T16:00:00.000Z","metricType":"ProvisionedConcurrencyUtilization","metricTarget":0.85,"minCapacity":4,"maxCapacity":5}
  ]
}
```

参数内容详情：

| 参数名                 | 类型         | 是否必填 | 示例 | 描述                                                         |
| ---------------------- | ------------ | -------- | ---- | ------------------------------------------------------------ |
| target                 | number       | 是       | 1    | 预留的目标资源个数                                           |
| scheduledActions       | list[object] | 否       |      | 定时伸缩策略：通过定时伸缩策略您可以更加灵活地配置预留的函数实例，在指定时间将预留的函数实例量设定成需要的值，使函数实例量更好地贴合业务的并发量。 |
| targetTrackingPolicies | list[object] | 否       |      | 指标伸缩策略：根据函数实例并发利用率的情况每分钟对预留资源进行一次伸缩。<br>   - 当指标超过追踪值metricTarget时，开始以积极的策略扩容预留模式的函数实例量，以使得指标值恢复到追踪值metricTarget附近。<br>   - 当指标低于追踪值metricTarget时，开始以保守的策略缩容预留模式的函数实例量，以使得指标值逐渐恢复到追踪值metricTarget附近。<br>当您在系统中设置了伸缩最大值和最小值时，预留的函数实例量会在最大值与最小值之间进行伸缩，超出最大值时将停止扩容，低于最小值时将停止缩容。 |

其中`scheduledActions`参数的数据结构为：

| 参数名             | 类型   | 是否必填 | 示例                 | 描述                                                         |
| ------------------ | ------ | -------- | -------------------- | ------------------------------------------------------------ |
| name               | string | 是       | demoScheduler        | 定时任务的名称。                                             |
| startTime          | string | 是       | 2020-10-10T10:10:10Z | 定时伸缩的起始生效时间。                                     |
| endTime            | string | 是       | 2020-12-10T10:10:10Z | 定时伸缩的结束生效时间。                                     |
| target             | number | 是       | 10                   | 预留的目标资源个数。                                         |
| scheduleExpression | string | 是       | cron(0 30 8 * * *)   | 定时信息，支持两种格式。<br>   - At expressions - "at(yyyy-mm-ddThh:mm:ss)"：只调度一次，使用UTC格式。<br/>   - Cron expressions - "cron(0 0 20 * * *)"：调度多次，使用标准crontab格式，如：每天20:00进行调度。 |

其中`targetTrackingPolicies`参数的数据结构为：

| 参数名       | 类型           | 是否必填 | 示例                              | 描述                     |
| ------------ | -------------- | -------- | --------------------------------- | ------------------------ |
| name         | string         | 是       | demoScheduler                     | 定时任务的名称。         |
| startTime    | string         | 是       | 2020-10-10T10:10:10Z              | 定时伸缩的起始生效时间。 |
| endTime      | string         | 是       | 2020-12-10T10:10:10Z              | 定时伸缩的结束生效时间。 |
| metricType   | string         | 是       | ProvisionedConcurrencyUtilization | 追踪的指标类型。         |
| metricTarget | number(double) | 是       | 0.6                               | 指标的追踪值。           |
| minCapacity  | number         | 是       | 10                                | 缩容的最小值。           |
| maxCapacity  | number         | 是       | 100                               | 扩容的最大值。           |

## provision get 命令

`provision get` 命令，是获取预留实例详情的命令。

当执行命令`provision get -h`/`provision get --help`时，可以获取帮助文档：

```shell script
Provision get

  Get provision configuration 

Usage

  s provision get <options>
                
Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/provision.md
                           
Options
    
  --region [string]                   [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1    
  --service-name [string]             [C-Required] Specify the fc service name  
  --function-name [string]            [C-Required] Specify the fc function name                         
  --qualifier string                  [C-Required] Specify the qualifier parameter. Only supports LATEST and alias                           

Global Options

  -h, --help                 [Optional] Help for command          
  -a, --access [string]      [Optional] Specify key alias         
  --debug                    [Optional] Output debug informations 

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/docs/docs/zh/yaml_and_cli.md

Examples with Yaml

  $ s provision get --qualifier alias

Examples with CLI

  $ s cli fc provision get --region cn-hangzhou --service-name serviceName --function-name functionName --qualifier alias   
```

### 参数解析

| 参数全称      | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义                                                     |
| ------------- | -------- | -------------- | ------------- | ------------------------------------------------------------ |
| region        | -        | 选填           | 必填          | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| service-name  | -        | 选填           | 必填          | 服务名                                                       |
| function-name | -        | 选填           | 必填          | 版本描述                                                     |
| qualifier     |          | 选填           | 选填          | 配置预留的版本，仅支持服务的 LATEST 和别名                   |
| access        | a        | 选填           | 选填          | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug         | -        | 选填           | 选填          | 打开`debug`模式，将会输出更多日志信息                        |
| help          | h        | 选填           | 选填          | 查看帮助信息                                                 |

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s provision get --qualifier qualifier`获取预留实例详情；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定服务所在地区以及服务名称，例如`s cli fc provision get --region cn-hangzhou --service-name fc-deploy-service --qualifier release`；

上述命令的执行结果示例：

```text
fc-deploy-test: 
  serviceName:            fc-deploy-service
  functionName:           http-trigger-py36
  qualifier:              release
  resource:               1583208943291465#fc-deploy-service#release#http-trigger-py36
  target:                 1
  current:                1
  scheduledActions:       []
  targetTrackingPolicies: []
```

## 权限与策略说明

- `provision list`与`provision get` 命令所需要的权限策略： `AliyunFCReadOnlyAccess`

- `provision put` 命令所需要的权限策略：

  ```yaml
  {
      "Version": "1",
      "Statement": [
          {
              "Action": "fc:PutProvisionConfig",
              "Effect": "Allow",
              "Resource": "acs:fc:<region>:<account-id>:services/services/<serviceName>.<qualifier>/functions/<functionName>"
          }
      ]
  }
  ```
