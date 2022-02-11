# Config Secret

- [Get secret key](#Get-secret-key)
- [Config](#Config)
    - [Guided configuration](#Guided-configuration)
    - [Command configuration](#Command-configuration)
    - [Configuration through environment variables](#Configuration-through-environment-variables)
    - [Configure temporary key (STS)](#Configure-temporary-key-STS)
    
## Get secret key

Alicloud's official website：https://www.aliyun.com   

The page to get the secret key：https://usercenter.console.aliyun.com/#/manage/ak

Open [The page to get the secret key](https://usercenter.console.aliyun.com/#/manage/ak) to get the secret key ：
  ![获取密钥页面](https://images.devsapp.cn/access/aliyun-access.jpg)


> AccessKey of your cloud account is the secret key to access Alibaba Cloud APIs. Since the AccessKey has full permissions of your cloud account, please make sure you keep it well. To avoid the AccessKey being used by others to cause [Sensitive information leakage](https://www.alibabacloud.com/help/doc-detail/54059.htm) , do not release your AccessKey to any external channels (for example, Github)    
> We strongly recommend you use the AccessKeys of RAM users in API calls, according to [Alibaba Cloud account security best practices](https://www.alibabacloud.com/help/doc-detail/102600.html) .

## Config

### Guided configuration

You can run the `config add` command to add keys：

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

When you select a provider, the following interactive commands appear：

```shell script
s config add 

? Please select a provider: Alibaba Cloud (alibaba)
? AccessKeyID **********
? AccessKeySecret **********
? Please create alias for key pair. If not, please enter to skip default
```

### Command configuration

You can also directly add keys by running the following command：

```shell script
$ s config add --AccessKeyID ****** --AccessKeySecret ****** 
```

You can also customize content that you want to add to the config add command by running the following command：

```shell script
$ s config add -kl AccessKeyID,AccessKeySecret -il ${AccessKeyID},${AccessKeySecret}
```


### Configuration through environment variables

Serverless Devs allows you to easily set key information by using environment variables. You can use the following methods to configure keys by using environment variables:

1. Use a command to introduce the keys in environment variables. For example, environment variables contain the following content: `ALIBABA_CLOUD_ACCOUNT_ID`, `ALIBABA_CLOUD_ACCESS_KEY_ID`, `ALIBABA_CLOUD_ACCESS_KEY_SECRET`. You can use the `s config add` command to add keys: 

```shell script
s config add -a default-aliyun -kl AccountID,AccessKeyID,AccessKeySecret -il ${ALIBABA_CLOUD_ACCOUNT_ID},${ALIBABA_CLOUD_ACCESS_KEY_ID},${ALIBABA_CLOUD_ACCESS_KEY_SECRET}.
```


2. Configure keys by using specified environment variables. For example, for the following key pairs:
    - AccountID: temp_accountid
    - AccessKeyID: temp_accesskeyid
    - AccessKeySecret: temp_accesskeysecret    

    You can name the key as a `*********_serverless_devs_access` in the environment variable, and set the value to a string in JSON format. In the following example, `default_serverless_devs_access` is used.
    - Key: `default_serverless_devs_access`
    - Value: `{\"AccountID\":\"temp_accountid\",\"AccessKeyID\":\"temp_accesskeyid\",\"AccessKeySecret\":\"temp_accesskeysecret\"}`
 
    In this case, you can specify the `default_serverless_devs_access` key when you configure keys. Example: `${env(default_serverless_devs_access)}`.
​    
    When you configure `s.yaml` file, conform to the following format: 
    ```
    edition: 1.0.0          #  The version of the YAML syntax. The version complies with the semantic versioning specification.
    name: fcDeployApp       #  The name of the project. 
    access: default_serverless_devs_access  #  The alias of the key.

    services:
      fc-deploy-test:
        component: fc-deploy  # Component name
        props: #  Property value of the component
          region: cn-shenzhen
          service:
            name: fc-deploy-service
    ```

### Configure temporary key (STS)


You can also directly add keys by running the following command：

```shell script
$ s config add --AccessKeyID ****** --AccessKeySecret ****** --SecurityToken ******
```

You can also customize content that you want to add to the config add command by running the following command：

```shell script
$ s config add -kl AccessKeyID,AccessKeySecret,SecurityToken -il ${AccessKeyID},${AccessKeySecret},${SecurityToken}
```

