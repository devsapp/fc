# 硬盘挂载操作：Nas

阿里云函数计算（FC）组件为使用者提供了FC相关资源的硬盘挂载操作能力。可以通过`nas`指令，快速进行硬盘相关操作。

您可以通过`nas -h`/`nas --help`参数，唤起帮助信息。例如执行`s nas -h`后，可以看到：
``

```
Nas

  Upload and download files for NAS service.

Usage

  $ s nas <sub-command> 

SubCommand:

  download   Download resources, you can get help through [s nas download -h]
  upload     Upload resources, you can get help through [s nas upload -h]
  command    Execute relevant instructions, you can get help through [s nas command -h]

```


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
  $ s exec -- nas download nas://<fc_dir> /home/usr/demo 

```


```

Nas Upload

  Upload resources.

Usage

  $ s nas upload <src_path> <fc_dir> <options> 

Options
    
  -r, --recursive     Iterate to copy folder content
  -n, --no-clobber    Do not override existing files

Global Options

  -a, --access        Specify key alias.   
  -h, --help          Display help for command.                                           

Examples with Yaml

  $ s nas upload /home/usr/demo.file nas://<fc_dir> 
  $ s exec -- nas upload /home/usr/demo.file nas://<fc_dir> 

```
