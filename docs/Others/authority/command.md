## devsapp/fc 组件
### deploy、remove 指令
参考 [服务篇](https://yuque.antfin.com/docs/share/6d667063-809c-4ffc-ba63-7fe236bbc029?# 《服务篇》) [函数篇](https://yuque.antfin.com/docs/share/153c4149-3dde-4e4a-86c2-d9d6a60e496d?# 《函数篇》) [触发器篇](https://yuque.antfin.com/docs/share/4044a9f7-7a80-49a3-9109-3a59df0e5f7f?# 《触发器篇》)
​

### info、sync 指令
系统策略：AliyunFCReadOnlyAccess
​

### build、local 指令
不需要权限
​

### invoke 指令
#### 最大权限
AliyunFCInvocationAccess 或者 AliyunFCFullAccess
#### 最小权限
```yaml
{
    "Version": "1",
    "Statement": [
        {
            "Action": "fc:InvokeFunction",
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>.<qualifier>/functions/<functionName>"
        }
    ]
}
```
​

### logs 指令
#### 最大权限
AliyunFCReadOnlyAccess、AliyunLogReadOnlyAccess
#### 最小权限
AliyunFCReadOnlyAccess
```yaml
{
    "Version": "1",
    "Statement": [
        {
            "Action": "log:GetLogStoreLogs",
            "Effect": "Allow",
            "Resource": "acs:log:<region>:<account-id>:project/<project>/logstore/<logstore>"
        }
    ]
}
```


### metrics 指令
AliyunLogFullAccess、AliyunCloudMonitorReadOnlyAccess、AliyunFCReadOnlyAccess
​

### nas 指令
参考 [nas 部署](https://yuque.antfin.com/docs/share/6d667063-809c-4ffc-ba63-7fe236bbc029?#s2Oda)

### layer 指令
#### 查看操作权限：list、versions、versionConfig
AliyunFCReadOnlyAccess


#### 部署版本权限：publish
```yaml
{
    "Version": "1",
    "Statement": [
        {
            "Action": "fc:CreateLayerVersion",
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:layers/<layerName>/versions/*"
        }
    ]
}
```
#### 删除层的版本：deleteVersion、deleteLayer
```yaml
{
    "Version": "1",
    "Statement": [
        {
            "Action": "fc:DeleteLayerVersion",
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:layers/<layerName>/versions/<versionId>"
        }
    ]
}
```
#### 删除层：deleteLayer
AliyunFCReadOnlyAccess
```yaml
{
    "Version": "1",
    "Statement": [
        {
            "Action": "fc:DeleteLayerVersion",
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:layers/<layerName>/versions/*"
        }
    ]
}
```


### version 指令
#### 查看操作权限：list
AliyunFCReadOnlyAccess
​

#### 发布版本：publish
```yaml
{
    "Version": "1",
    "Statement": [
        {
            "Action": "fc:PublishServiceVersion",
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>/versions"
        }
    ]
}
```
#### 删除版本：delete
```yaml
{
    "Version": "1",
    "Statement": [
        {
            "Action": "fc:DeleteServiceVersion",
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>/versions/<version-id>"
        }
    ]
}
```


### alias 指令
#### 查看操作权限：list
AliyunFCReadOnlyAccess
​

#### 发布/修改：publish
```yaml
{
    "Version": "1",
    "Statement": [
        {
            "Action": [
            	"fc:CreateAlias",
              "fc:UpdateAlias"
            ],
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>/aliases/*"
        }
    ]
}
```
#### 删除：delete
```yaml
{
    "Version": "1",
    "Statement": [
        {
            "Action": "fc:DeleteAlias",
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>/aliases/<aliasName>"
        }
    ]
}
```


### provision 指令
#### 查看操作权限：list get
AliyunFCReadOnlyAccess
​

#### 操作权限：put
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
​

### onDemand 指令
#### 查看操作权限：list get
AliyunFCReadOnlyAccess
​

#### 发布/修改：put
```yaml
{
    "Version": "1",
    "Statement": [
        {
            "Action": "fc:PutFunctionOnDemandConfig",
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:services/services/<serviceName>.<qualifier>/functions/<functionName>"
        }
    ]
}
```
#### 删除：delete
```yaml
{
    "Version": "1",
    "Statement": [
        {
            "Action": "fc:DeleteFunctionOnDemandConfig",
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:services/services/<serviceName>.<qualifier>/functions/<functionName>"
        }
    ]
}
```




