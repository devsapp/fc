# 层的操作：Layer

- [快速使用](#快速使用)
  - [简单使用](#简单使用)
  - [高级使用](#高级使用)
- [操作所需权限](../Others/authority/command.md#layer-指令)


------


阿里云函数计算（FC）组件为使用者提供了FC层的操作能力。可以通过`layer`指令，进行操作。

您可以通过`layer -h`/`layer --help`参数，唤起帮助信息。例如执行`s layer -h`后，可以看到：

```
Layer

  Resource layer operation 

Usage

  $ s layer <sub-command> 

SubCommand

  publish         New layer version, you can get help through [s layer publish -h]             
  list            Get layer list, you can get help through [s layer list -h]                   
  versionConfig   Get layer versionConfig, you can get help through [s layer versionConfig -h] 
  versions        Get layer versions, you can get help through [s layer versions -h]           
  deleteVersion   Delete layer version, you can get help through [s layer deleteVersion -h]    
  deleteLayer     Delete layer all version, you can get help through [s layer deleteLayer -h] 
```
Layer命令为我们提供了一些子命令：
- publish: 发布层的版本，可以通过`s layer publish -h`获取帮助文档
    ```
    layer publish

      New layer version 

    Usage

      $ s layer publish <options> 

    Command List

      --region string               Specify the region parameter            
      --layer-name string           Specify the layer name parameter        
      --code string                 Specify the code parameter              
      --description string          Specify the description parameter       
      --compatible-runtime string   Specify the compatibleRuntime parameter 

    Global Options

      -a, --access    Specify key alias        
      -h, --help      Display help for command 

    Examples with Yaml

      $ s layer publish --layer-name testName --code ./src         
      $ s exec -- layer publish --layer-name testName --code ./src 

    Examples with CLI

      $ s cli fc layer publish --region cn-hangzhou --layer-name testName --code ./src --compatible-runtime nodejs12,nodejs10,python3   
    ```
- list: 查看指定区域所有层的列表，可以通过`s layer list -h`获取帮助文档
    ```
    layer list

      Get layer list 

    Usage

      $ s layer list <options> 

    Command List

      --region string   Specify the region parameter 
      --prefix string   Specify the prefix parameter 

    Global Options

      -a, --access    Specify key alias        
      -h, --help      Display help for command 
      --table         Table format output      

    Examples with Yaml

      $ s layer list         
      $ s exec -- layer list 

    Examples with CLI

      $ s cli fc layer list --region cn-hangzhou --prefix test 
    ```
- versionConfig: 获取指定层版本的信息，可以通过`s layer versionConfig -h`获取帮助文档
    ```
    layer versionConfig

      Get layer versionConfig 

    Usage

      $ s versionConfig <options> 

    Command List

      --region string       Specify the region parameter     
      --layer-name string   Specify the layer name parameter 
      --version number      Specify the version parameter    

    Global Options

      -a, --access    Specify key alias        
      -h, --help      Display help for command 

    Examples with Yaml

      $ s layer versionConfig --layer-name name --version 1         
      $ s exec -- layer versionConfig --layer-name name --version 1 

    Examples with CLI

      $ s cli fc layer versionConfig --region cn-hangzhou --layer-name name         
      --version 1 
    ```
- versions: 获取指定层的所有版本信息，可以通过`s layer versions -h`获取帮助文档
    ```
    layer versions

      Get layer versions 

    Usage

      $ s layer versions <options> 

    Command List

      --region string       Specify the region parameter     
      --layer-name string   Specify the layer name parameter 

    Global Options

      -a, --access    Specify key alias        
      -h, --help      Display help for command 
      --table         Table format output      

    Examples with Yaml

      $ s layer versions --layer-name name         
      $ s exec -- layer versions --layer-name name 

    Examples with CLI

      $ s cli fc layer versions --region cn-hangzhou --layer-name name
    ```
- deleteVersion: 删除指定的层版本，可以通过`s layer deleteVersion -h`获取帮助文档
    ```
    layer deleteVersion

      Delete layer version 

    Usage

      $ s layer deleteVersion <options> 

    Command List

      --region string       Specify the region parameter     
      --layer-name string   Specify the layer name parameter 
      --version number      Specify the version parameter    

    Global Options

      -a, --access    Specify key alias        
      -h, --help      Display help for command 

    Examples with Yaml

      $ s layer deleteVersion --layer-name name --version 1         
      $ s exec -- layer deleteVersion --layer-name name --version 1 

    Examples with CLI

      $ s cli fc layer deleteVersion --region cn-hangzhou --layer-name name --version 1 
    ```
- deleteLayer: 删除指定层的所有版本，可以通过`s layer deleteLayer -h`获取帮助文档
    ```
    layer deleteLayer

      Delete layer all version 

    Usage

      $ s layer deleteLayer <options> 

    Command List

      --region string       Specify the region parameter     
      --layer-name string   Specify the layer name parameter 

    Global Options

      -a, --access    Specify key alias        
      -h, --help      Display help for command 

    Examples with Yaml

      $ s layer deleteLayer --layer-name name         
      $ s exec -- layer deleteLayer --layer-name name 

    Examples with CLI

      $ s cli fc layer deleteLayer --region cn-hangzhou --layer-name name 
    ```

# 快速使用

当我们下载好[Serverless Devs开发者工具](../Getting-started/Install-tutorial.md), 并完成[阿里云密钥配置](../Getting-started/Setting-up-credentials.md)之后，我们可以根据自身的需求进行资源的移除。

## 简单使用

```
s layer publish --layer-name testName --code ./src  
```

- 重点1: region、layerName、code 必填
- 重点2: compatibleRuntime 不填写默认值为 nodejs12,nodejs10,nodejs8,nodejs6,python3,python2.7


```
s layer versionConfig --layer-name name --version 1  
```

- 重点1: region、layerName、version 必填


```
s layer versions --layer-name name
```

- 重点1: region、layerName 必填


```
s layer deleteVersion --layer-name name --version 1
```

- 重点1: region、layerName、version 必填


```
s layer deleteLayer --layer-name name
```

- 重点1: region、layerName 必填
