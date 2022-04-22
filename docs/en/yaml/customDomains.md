---
title: customDomains field
description: 'customDomains field'
position: 5
category: 'Yaml-Spec'
---

## customDomains field

| Parameter Name                | Required | Type                           | Parameter Description                                                                |
| ----------------------------- | -------- | ------------------------------ | ------------------------------------------------------------------------------------ |
| domainName                    | True     | String                         | Domain name, if the value is auto, the system will assign the domain name by default |
| protocol                      | True     | String                         | Protocol, value: `HTTP`, `HTTP,HTTPS`                                                |
| [routeConfigs](#routeconfigs) | True     | [List\<Struct>](#routeconfigs) | routes                                                                               |
| [certConfig](#certconfig)     | False    | [Struct](#certconfig)          | Domain Certificate                                                                   |
| certId                        | False    | Number                         | cert ID                                                                              |
| [tlsConfig](#tlsConfig)       | False    | [Struct](#tlsConfig)           | TLS                                                                                  |

References:

```yaml
customDomains:
  - domainName: auto
    protocol: HTTP
    routeConfigs:
      - path: /*
        serviceName: unit-deploy-service
        functionName: event-function
```

> ⚠️ Note: If the domain name is configured as `auto`, the system will assign a test domain name by default. This domain name is only for testing use, and its stability is not guaranteed. The Serverless Devs FC component has the right to recycle the domain name in the future. In the case of online business and production demand business, it is strongly recommended to bind your own custom domain name.

### certConfig

| Parameter   | Required | Type   | Description                                                 |
| ----------- | -------- | ------ | ----------------------------------------------------------- |
| certName    | False    | String | The name of the certificate.                                |
| privateKey  | False    | String | The private key. The key must be in the PEM format.         |
| certificate | False    | String | The certificate. The certificate must be in the PEM format. |

### routeConfigs

| Parameter    | Required | Type   | Description                 |
| ------------ | -------- | ------ | --------------------------- |
| path         | True     | String | The path.                   |
| serviceName  | False    | String | The name of the service.    |
| functionName | False    | String | The name of the function.   |
| qualifier    | False    | String | The version of the service. |

#### Obtain the certificate content by configuring certId

If certConfig is not configured, you can use 'certId' to obtain the configuration. Will call ali cloud digital certificate management service [interface](https://help.aliyun.com/document_detail/126512.html) access to configuration, so you need to has the authority to obtain the certificate details.

References:

```
customDomains:
    - domainName: test.com
      protocol: HTTP,HTTPS
      certId: 123456
      routeConfigs:
        - path: /*
```

#### Obtain the certificate by configuring certConfig

When configuring certConfig, you can obtain the certificate and privateKey in any of the following ways:

Directly fill in **file content**
References:

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

**Local file path**
References:

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

**HTTP or HTTPS** address that can be accessed directly from the public network
References:

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

**OSS** address in the format of 'OSS ://{region}/{bucketName}/{objectName}', but the 'sub-account' must have access to the 'OSS file'
References:

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

| Parameter    | Required | Type           | Description                                         |
| ------------ | -------- | -------------- | --------------------------------------------------- |
| ------------ | ----     | -------------- | --------------------------------------------------- |
| minVersion   | True     | String         | TLS Version, value: `TLSv1.0`、`TLSv1.1`、`TLSv1.2` |
| cipherSuites | True     | List\<String\> | Cipher Suite                                        |

### Permissions

#### Permissions required for a RAM user

##### Highest level of permissions

System Policy: `AliyunFCFullAccess`

##### Lowest level of permissions

> Reasons for more service and function permissions: `domainName` is `auto`, you need to create an http function as an auxiliary function, which will be deleted after use

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
