# 硬盘挂载操作：Nas

- [快速使用](#快速使用)
    - [Download指令](#Download指令)
    - [Upload指令](#Upload指令)
    - [Command指令](#Command指令)
- [操作所需权限](../Others/authority/command.md#nas-指令)

--------

阿里云函数计算（FC）组件为使用者提供了FC相关资源的硬盘挂载操作能力。可以通过`nas`指令，快速进行硬盘相关操作。

您可以通过`nas -h`/`nas --help`参数，唤起帮助信息。例如执行`s nas -h`后，可以看到：

```
Nas

  Upload and download files for NAS service.

Usage

  $ s nas download <options> <fc_dir> <src_path> 

SubCommand:

  download   Download resources, you can get help through [s nas download -h]
  upload     Upload resources, you can get help through [s nas upload -h]
  command    Execute relevant instructions, you can get help through [s nas command -h]

```

Nas命令为我们提供了三个子命令：
- download: 将Nas的内容下载到本地，可以通过`s nas download -h`获取帮助文档
    ```
    
    Nas Download
    
      Download resources.
    
    Usage
    
      $ s nas download  <fc_dir> <src_path> <options> 
    
    Options
        
      -r, --recursive     Iterate to copy folder content
      -n, --no-clobber    Do not override existing files
    
    Global Options
    
      -a, --access        Specify key alias.   
      -h, --help          Display help for command.                                           
    
    Examples with Yaml
    
      $ s nas download nas://<fc_dir> /home/usr/demo
    
    ```
- upload: 将本地的内容上传到Nas，可以通过`s nas upload -h`获取帮助文档
    ```
    
    Nas Upload
    
      Upload resources.
    
    Usage
    
      $ s nas upload <options> <src_path> <fc_dir>
    
    Options
        
      -r, --recursive     Iterate to copy folder content
      -n, --no-clobber    Do not override existing files
    
    Global Options
    
      -a, --access        Specify key alias.   
      -h, --help          Display help for command.                                           
    
    Examples with Yaml
    
      $ s nas upload /home/usr/demo.file nas://<fc_dir>
    
    ```
- command: 可以在实例中执行某些指令，对Nas进行操作，可以通过`s nas command -h`获取帮助文档
    ```
    
    Nas Command
    
      Execute commands.
    
    Usage
    
      $ s nas command <command>
    
    Global Options
    
      -a, --access        Specify key alias.   
      -h, --help          Display help for command.                                           
    
    Examples with Yaml
    
      $ s nas command ls -al nas:///mnt/auto1/folder
    
    ```

# 快速使用

当我们下载好[Serverless Devs开发者工具](../Getting-started/Install-tutorial.md), 并完成[阿里云密钥配置](../Getting-started/Setting-up-credentials.md)之后，我们可以根据自身的需求进行Nas相关操作。
## Upload指令

与Download指令类似，该指令也适用于本地和线上资源同步使用，只不过该指令是将本地资源上传到Nas制定目录中，例如：

```
s nas upload -r ./model/ /mnt/auto/model
```

关于上传文件的说明，参考 linux 系统指令 cp 指令设计：

1. 上传的文件本地是文件夹，就必须使用使用 -r/--recursive 参数
2. 上传的文件本地是文件夹，远端不能是文件
3. 远端目标地址已经不存在，则远端的父目录必须存在
4. 远端目标地址已经不存在，远端的父目录存在
  a. 如果是上传的是文件夹，则创建一个同名的文件夹，然后上传`当前目录下`所有的文件到远端地址
  b. 如果是上传的是文件，则创建文件
3. 远端目标地址已经存在
  a. 上传的是文件夹：本地路径以斜线结尾，上传`当前目录下`所有的文件到远端地址
  b. 上传的是文件夹：本地地址不以斜线结尾，将当前目录（包含目录）上传到远端地址
  c. 上传的是文件，远端是文件夹，创建或者覆盖文件
  c. 上传的是文件，远端是文件，则不能指定 -n/--no-clobber
  

## Command指令

> command 指令实现原理是将 command 的后面的参数当作一个 linux 指令在函数计算上运行，所以linux的指令大部分都是可以运行的。

我们在实际项目中，除了上传，下载文件，保证线上线下部分文件一致，在某些时候可能还涉及到一些特殊操作，例如：

- 查看线上NAS的文件列表
- 删除线上NAS中的某个文件
- 查看线上NAS的某个文件

此时就需要一些命令操作。

通过阿里云函数计算(FC)组件，我们可以实现上述需求，例如：

查看Nas的某个目录内容：

```
s nas command ls -al /mnt/auto/folder
```
> 注：此处需要注意 ls -a 存在问题，因为 -a 是系统指令


删除Nas下的某个文件夹：

```
s nas command rm -r /mnt/auto/folder
```

查看Nas下的某个文件：

```
s nas command cat /mnt/auto/folder/test.txt
```


## Download指令

Download指令是将Nas已有的内容下载到本地。例如，我需要将线上NAS中的`/mnt/auto/folder/`文件夹同步到本地，我可以直接执行：

```
s nas download /mnt/auto/folder/ ./folder
```