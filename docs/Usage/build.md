# 构建操作：Build

- [快速使用](#快速使用)
- [[Future]: DevsFile](future-devsfile)
-------

阿里云函数计算（FC）组件为使用者提供了FC相关资源的构建/安装依赖的能力。可以通过`build`指令，快速进行构建/安装依赖操作。

您可以通过`build -h`/`build --help`参数，唤起帮助信息。例如执行`s build -h`后，可以看到：

```

Build 

  Build the dependencies.

Usage

  $ s build <options> 

Options

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

# 快速使用

当我们下载好[Serverless Devs开发者工具](../Getting-started/Install-tutorial.md), 并完成[阿里云密钥配置](../Getting-started/Setting-up-credentials.md)之后，我们可以根据自身的需求进行资源的快速构建。

例如当我们现在存在某个Python语言项目，此时我们项目下可以拥有一个`requirements.txt`文件:

```
DateTime==4.3
```

同时需要拥有资源描述文档，例如`s.yaml`:

```
edition: 1.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: buildApp          #  项目名称
access: aliyun-release  #  秘钥别名

services:
  python3-test: #  服务名称
    component: fc  # 组件名称
    props: #  组件的属性值
      region: cn-shenzhen
      service:
        name: build-test-service
      function:
        name: build-test-function
        runtime: python3
        codeUri: .
```

此时，我们执行`s build`指令，会进行资源构建，包括下载依赖等。在我们下载依赖的过程中，可能涉及到部分依赖不能快平台使用，所以此时为了保证下载的依赖可以在函数计算中正常使用，可以使用`--use-docker`参数，例如：

```
s build --use-docker
```

当然，除了Python语言之外，Java语言、Nodejs语言，以及容器镜像等都可以支持。以下简单例举可以识别的依赖文件名（即通过识别该文件，进行相关依赖下载，或者资源构建）：
- Python: requirements.txt
- Nodejs: package.json
- Java: pom.xml
- Container: dockerfile

# [Future]: DevsFile

DevsFile将会为用户提供更高阶的构建能力。
