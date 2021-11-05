

# 函数相关权限配置

## 基础配置

### yaml


### 子账号需要的函数权限

#### 最大权限

`AliyunFCFullAccess`

#### 部署最小权限

⚠️ `fc:GetFunctionAsyncInvokeConfig` 选填，不影响使用

```json
{
    "Statement": [
        {
            "Action": [
                "fc:GetFunction",
                "fc:CreateFunction",
                "fc:UpdateFunction"
            ],
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:services/<service-name>/functions/*"
        }
    ],
    "Version": "1"
}
```


#### 删除最小权限

```json
{
		"Version": "1",
    "Statement": [
      	{
            "Action": "fc:DeleteFunction",
            "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>/functions/<functionName>",
            "Effect": "Allow"
        }
    ]
}
```

## Runtime 为 custom-container

### 子账号需要的权限

> [参考基础配置](#子账号需要的函数权限)

### 服务角色权限

**系统策略**：`AliyunContainerRegistryReadOnlyAccess`

