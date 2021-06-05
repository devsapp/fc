# 构建操作：Build

阿里云函数计算（FC）组件为使用者提供了FC相关资源的构建/安装依赖的能力。可以通过`build`指令，快速进行构建/安装依赖操作。

您可以通过`build -h`/`build --help`参数，唤起帮助信息。例如执行`s build -h`后，可以看到：

```

Build 

  Build the dependencies.

Usage

  $ s build <options> 

Options

  -l, --language   string   Sprcify the language, include python2.7, python3.6, nodejs6, nodejs8, nodejs12, golang1, java8, java10
  -f, --dockerfile string   Specify the dockerfile path
  -d, --use-docker string   Use docker container to build functions

Global Options

  -y, --assume-yes    Assume that the answer to any question which would be asked is yes. 
  -h, --help          Display help for command.                                           

Examples with Yaml

  $ s build
  $ s <ProjectName> build
  $ s build --use-docker 
  $ s exec -- build --use-docker 

Examples with CLI

  $ s cli fc build --use-docker 

```
