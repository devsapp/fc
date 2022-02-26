---
title: 密钥配置
description: '配置阿里云密钥'
position: 2
category: '概览'
---

# 配置阿里云密钥

- [获取密钥信息](#获取密钥信息)
- [配置密钥](#配置密钥)
    - [引导式配置](#引导式配置)
    - [命令式配置](#命令式配置)
    - [通过环境变量配置](#通过环境变量配置)
    - [配置临时密钥](#配置临时密钥)

## 获取密钥信息

获取密钥页面：https://usercenter.console.aliyun.com/#/manage/ak

- 打开 [获取密钥页面](https://usercenter.console.aliyun.com/#/manage/ak) 获取密钥信息 ：
  ![获取密钥页面](https://images.devsapp.cn/access/aliyun-access.jpg)
 
  
> 云账号 AccessKey 是您访问阿里云 API 的密钥，具有该账户完全的权限，请您务必妥善保管！不要通过任何方式（e.g. Github）将 AccessKey 公开到外部渠道，以避免被他人利用而造成 [安全威胁](https://help.aliyun.com/knowledge_detail/54059.html?spm=5176.2020520153.0.0.57f1336a8PQ1KR) 。    
> 强烈建议您遵循 [阿里云安全最佳实践](https://help.aliyun.com/document_detail/102600.html?spm=5176.2020520153.0.0.57f1336a8PQ1KR) ，使用 RAM 子用户 AccessKey 来进行 API 调用。

## 配置密钥

### 引导式配置

可以通过`config add`直接进行密钥的添加：

```shell script
$ s config add 

? Please select a provider: (Use arrow keys)
❯ Alibaba Cloud (alibaba) 
  AWS (aws) 
  Azure (azure) 
  Baidu Cloud (baidu) 
  Google Cloud (google) 
  Huawei Cloud (huawei) 
  Tencent Cloud (tencent) 
  Custom (others) 
```

当使用者选择某个选项之后，系统会进行交互式引导：

```shell script
s config add 

? Please select a provider: Alibaba Cloud (alibaba)
? AccessKeyID **********
? AccessKeySecret **********
? Please create alias for key pair. If not, please enter to skip default
```

### 命令式配置

可以通过命令式直接进行密钥的添加：
```shell script
$ s config add --AccessKeyID ****** --AccessKeySecret ****** 
```

或：

```shell script
$ s config add -kl AccessKeyID,AccessKeySecret -il ${AccessKeyID},${AccessKeySecret}
```

### 通过环境变量配置

Serverless Devs可以比较容易的通过环境变量进行密钥信息的设定。通过环境变量配置密钥的方法有两种：

- 方法1：通过命令引入环境变量中的密钥：例如在环境变量中有`ALIBABA_CLOUD_ACCOUNT_ID`、`ALIBABA_CLOUD_ACCESS_KEY_ID`、`ALIBABA_CLOUD_ACCESS_KEY_SECRET`等相关内容，此时可以通过`s config add`命令进行添加：
    ```shell script
    s config add -a default-aliyun -kl AccountID,AccessKeyID,AccessKeySecret -il ${ALIBABA_CLOUD_ACCOUNT_ID},${ALIBABA_CLOUD_ACCESS_KEY_ID},${ALIBABA_CLOUD_ACCESS_KEY_SECRET}
    ```
- 方法2：通过指定环境变量的名字进行配置：例如当前有阿里云密钥对：
    - AccountID: temp_accountid
    - AccessKeyID: temp_accesskeyid
    - AccessKeySecret: temp_accesskeysecret      
    此时可以在环境变量中可以命名key为`*********_serverless_devs_access`，例如`default_serverless_devs_access`，value为JSON字符串，例如：
    - Key：`default_serverless_devs_access`
    - Value：`{\"AccountID\":\"temp_accountid\",\"AccessKeyID\":\"temp_accesskeyid\",\"AccessKeySecret\":\"temp_accesskeysecret\"}`        
    此时，可以在配置密钥的时候指定密钥`default_serverless_devs_access`，例如`${env(default_serverless_devs_access)}`
    
    在`s.yaml`配置如下:
    ```
    edition: 1.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
    name: fcDeployApp       #  项目名称
    access: default_serverless_devs_access  #  秘钥别名

    services:
      fc-deploy-test:
        component: fc-deploy  # 组件名称
        props: #  组件的属性值
          region: cn-shenzhen
          service:
            name: fc-deploy-service
    ```

### 配置临时密钥

可以通过命令式直接进行密钥的添加：
```shell script
$ s config add --AccessKeyID ****** --AccessKeySecret ****** --SecurityToken ******
```

或者添加自定义内容：
```shell script
$ s config add -kl AccessKeyID,AccessKeySecret,SecurityToken -il ${AccessKeyID},${AccessKeySecret},${SecurityToken}
```
