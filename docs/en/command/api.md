---
title: Api commands
description: 'Api commands'
position: 6
category: 'Other'
---
# Api commands (coming soon)

The api commands are used to perform operations on Function Compute API. 

- [Command description](#Command-description)
  - [Examples](#Examples)
- [Permissions and policies](#Permissions-and-policies)


## Command description

You can run the `api -h` or `api --help` command to obtain the help documentation.

### Examples
 
The following example uses the `ListService` operation as an example. For more information, visit https://help.aliyun.com/document_detail/175559.html. 
 
You only need to follow the `api` format to integrate features in the command line. Example: 
 
```shell script
s cli fc api ListService
```

In the interface document of `ListService`, some parameters can be passed in:

```
Options

  --region string       [Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-           
                        beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-    
                        shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-   
                        3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-     
                        1/ap-south-1                                                                  
                        * Set default region: [s cli fc-default set api-default-region <region>]      
  -a, --access string   [Optional] Specify key alias                                                  
  --apiVersion string   [Optional] API version, value: 20210416, 20160815                             
                        * Set default version: [s cli fc-default set api-default-version <version>]   
  --query string        Parameter details refer to [Detail: --query], format is JSON String           

Detail: --query

  limit       <Integer> [Optional] The maximum number of services to be returned. Default value: 20. Maximum value: 100.The     
              number of returned services is less than or equal to the specified number.                                        
  nextToken   <String> [Optional] The token used to obtain more results. If the number of services exceeds the limit,the        
              nextToken parameter is returned. You can include the parameter in subsequent invocationsto obtain more results.   
              You do not need to provide this parameter in the first invocation.                                                
  prefix      <String> [Optional] The prefix that the names of returned services must contain. For example, if you setthe       
              parameter to a, the names of all the returned services start with a.                                              
  startKey    <String> [Optional] The position from which the list begins. Results are sorted in alphabetical orderand those    
              results following startKey (inclusive) are listed.    
```

At this time, you can pass in the parameters in the corresponding format according to the reminder of `detail: --***`. For example, you can see in the above description:

```
--query string        Parameter details refer to [Detail: --query], format is JSON String 
```

Therefore, the `--query` parameter can be of JSON string type:

```shell script
s cli fc api ListService --query '{"limit": **, "nextToken": "**", "prefix": "**", "startKey": "**"}'
```


## Permissions and policies

Policies vary with API operations. You can define a policy based on the name of an operation. 

