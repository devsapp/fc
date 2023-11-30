---
title: customDomains字段
description: 'customDomains字段'
position: 5
category: 'Yaml规范'
---

## customDomains 字段

| 参数名                        | 必填  | 类型                           | 参数描述                                             |
| ----------------------------- | ----- | ------------------------------ | ---------------------------------------------------- |
| domainName                    | True  | String                         | 域名，如果是 auto 取值，系统则会默认分配域名         |
| protocol                      | True  | String                         | 协议，取值：`HTTP`, `HTTP,HTTPS`                     |
| [routeConfigs](#routeconfigs) | True  | [List\<Struct>](#routeconfigs) | 路由                                                 |
| [certConfig](#certconfig)     | False | [Struct](#certconfig)          | 域名证书                                             |
| certId                        | False | Number                         | 域名证书 ID                                          |
| [tlsConfig](#tlsConfig)       | False | [Struct](#tlsConfig)           | TLS 协议, 注：目前仅支持配置和修改，不支持删除此配置 |
| [wafConfig](#wafConfig)       | False | [Struct](#wafConfig)           | Web 应用防火墙配置信息                               |

参考案例：

```yaml
customDomains:
  - domainName: auto
    protocol: HTTP
    wafConfig:
      enableWAF: true
    routeConfigs:
      - path: /*
        serviceName: unit-deploy-service
        functionName: event-function
        qualifier: LATEST
        rewriteConfig:
          equalRules:
            - match: /equalRules
              replacement: /xxxx
          regexRules:
            - match: ^/old/[a-z]+/
              replacement: /xxxx
          wildcardRules:
            - match: /api/*
              replacement: /$1
```

> ⚠️ 注意：如果域名配置为`auto`，系统会默认分配测试域名，该域名仅供测试使用，不对其稳定性等做保证，Serverless Devs FC 组件在日后有权对该域名进行回收等处理，如是线上业务，生产需求业务，强烈建议绑定自己的自定义域名。

### certConfig

| 参数名      | 必填 | 类型   | 参数描述                      |
| ----------- | ---- | ------ | ----------------------------- |
| certName    | True | String | 证书名称                      |
| privateKey  | True | String | 表示私钥，内容仅支持 PEM 格式 |
| certificate | True | String | 表示证书，内容仅支持 PEM 格式 |

#### 通过配置 certId 获取证书内容

当没有配置 certConfig，可以通过 `certId` 获取配置。当填写 certId 时，会调用阿里云数字证书管理服务的[接口](https://help.aliyun.com/document_detail/465112.html)获取配置，所以需要`有获取证书详情`的权限。
参考案例：

```
customDomains:
    - domainName: test.com
      protocol: HTTP,HTTPS
      certId: 123456
      routeConfigs:
        - path: /*
```

#### 通过配置 certConfig 获取证书内容

配置 certConfig 时，certificate 和 privateKey 的内容支持多种方式方式获取，参考案例：

直接填写**文件内容**

```yaml
customDomains:
  - domainName: test.com
    protocol: HTTP,HTTPS
    routeConfigs:
      - path: /*
    certConfig:
      certName: certName
      certificate: '-----BEGIN CERTIFICATE----\n certificate content \n----END CERTIFICATE-----'
      privateKey: '-----BEGIN RSA PRIVATE KEY----\n privateKey content \n----END RSA PRIVATE KEY-----'
```

**本地文件路径**

```yaml
customDomains:
  - domainName: test.com
    protocol: HTTP,HTTPS
    routeConfigs:
      - path: /*
    certConfig:
      certName: certName
      certificate: ./localpath/certificate.pem
      privateKey: ./localpath/privateKey.pem
```

能公网直接访问的**http 或者 https**地址

```yaml
customDomains:
  - domainName: test.com
    protocol: HTTP,HTTPS
    routeConfigs:
      - path: /*
    certConfig:
      certName: certName
      certificate: https://oss.abc.com/certificate
      privateKey: http://oss.abc.com/privateKey
```

**OSS**地址，格式 `oss://{region}/{bucketName}/{objectName}`, 但是需要`子账号`有`获取oss文件`的权限

```yaml
customDomains:
  - domainName: test.com
    protocol: HTTP,HTTPS
    routeConfigs:
      - path: /*
    certConfig:
      certName: certName
      certificate: oss://cn-hangzhou/bucketName/certificate.pem
      privateKey: oss://cn-hangzhou/bucketName/privateKey.pem
```

### tlsConfig

| 参数名       | 必填  | 类型           | 参数描述                                            |
| ------------ | ----- | -------------- | --------------------------------------------------- |
| minVersion   | True  | String         | TLS 协议版本，取值：`TLSv1.0`、`TLSv1.1`、`TLSv1.2` |
| maxVersion   | False | String         | TLS 协议版本，取值：`TLSv1.0`、`TLSv1.1`、`TLSv1.2` |
| cipherSuites | True  | List\<String\> | 加密套件                                            |

### wafConfig

| 参数名    | 必填  | 类型    | 参数描述                |
| --------- | ----- | ------- | ----------------------- |
| enableWAF | False | Boolean | 是否开启 Web 应用防火墙 |

### routeConfigs

| 参数名        | 必填  | 类型                     | 参数描述     |
| ------------- | ----- | ------------------------ | ------------ |
| path          | True  | String                   | 路径         |
| serviceName   | False | String                   | 服务名       |
| functionName  | False | String                   | 函数名       |
| qualifier     | False | String                   | 服务的版本   |
| rewriteConfig | False | [Struct](#rewriteConfig) | URI 重写配置 |
| methods | False | List\<String> | 支持的请求方法列表，支持：HEAD、DELETE、POST、GET、OPTIONS、PUT、PATCH。默认支持GET、POST、PUT、DELETE|


#### rewriteConfig

| 参数名        | 必填  | 类型                                 | 参数描述       |
| ------------- | ----- | ------------------------------------ | -------------- |
| equalRules    | False | [List\<Struct>](#rewriteConfigRules) | 完全匹配规则   |
| wildcardRules | False | [List\<Struct>](#rewriteConfigRules) | 通配符匹配规则 |
| regexRules    | False | [List\<Struct>](#rewriteConfigRules) | 正则匹配规则   |

##### rewriteConfigRules

| 参数名      | 必填 | 类型   | 参数描述 |
| ----------- | ---- | ------ | -------- |
| match       | True | String | 匹配规则 |
| replacement | True | String | 替换规则 |

### 权限配置相关

#### 子账号需要的权限

##### 最大权限

系统策略：`AliyunFCFullAccess`

##### 最小权限

> 服务和函数权限较多的原因：`domainName` 为 `auto`，需要创建 http 函数作为一个辅助函数，使用完之后会进行删除

```yaml
{
  'Statement':
    [
      {
        'Action': ['fc:DeleteService', 'fc:UpdateService', 'fc:CreateService'],
        'Effect': 'Allow',
        'Resource': 'acs:fc:<region>:<account-id>:services/*',
      },
      {
        'Action': ['fc:DeleteFunction', 'fc:CreateFunction', 'fc:UpdateFunction'],
        'Effect': 'Allow',
        'Resource': 'acs:fc:<region>:<account-id>:services/*/functions/*',
      },
      {
        'Action': ['fc:DeleteTrigger', 'fc:UpdateTrigger', 'fc:CreateTrigger'],
        'Effect': 'Allow',
        'Resource': 'acs:fc:<region>:<account-id>:services/*/functions/*/triggers/*',
      },
      { 'Action': 'ram:PassRole', 'Effect': 'Allow', 'Resource': '*' },
      {
        'Action': ['fc:GetCustomDomain', 'fc:UpdateCustomDomain', 'fc:CreateCustomDomain'],
        'Resource': 'acs:fc:<region>:<account-id>:custom-domains/*',
        'Effect': 'Allow',
      },
    ],
  'Version': '1',
}
```
