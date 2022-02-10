# Build 命令

`build` 命令是进行函数构建/依赖安装的命令。

- [命令解析](#命令解析)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)


## 命令解析

当执行命令`build -h`/`build --help`时，可以获取帮助文档：

```shell script
Build

  Build the dependencies

Usage

  s build <options>  
                            
Document
  
  https://github.com/devsapp/fc/blob/main/docs/zh/command/build.md

Options

  -f, --dockerfile [string]   [Optional] Specify the dockerfile path             
  -d, --use-docker            [Optional] Use docker container to build functions 
  -b, --use-buildkit          [Optional] Use buildkit to build functions         

Global Options

  -h, --help                 [Optional] Help for command               
  --debug                    [Optional] Output debug informations        

Options Help

  Required: Required parameters in YAML mode and CLI mode
  C-Required: Required parameters in CLI mode
  Y-Required: Required parameters in Yaml mode
  Optional: Non mandatory parameter
  ✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/docs/docs/zh/yaml_and_cli.md

Examples with Yaml

  $ s build               
  $ s build --use-docker  
```

### 参数解析

| 参数全称     | 参数缩写 | Cli模式下必填 | 参数含义                              |
| ------------ | -------- | ------------- | ------------------------------------- |
| dockerfile   | f        | 选填          | 指定构建自定义镜像的文件 |
| use-docker   | d        | 选填          | 通过 docker 构建 |
| use-buildkit | b        | 选填          | 通过 buildctl 构建 |
| debug        | -        | 选填          | 打开`debug`模式，将会输出更多日志信息 |
| help         | h        | 选填          | 查看帮助信息                          |

### 操作案例

#### 基础操作

**有资源描述文件（Yaml）时**，可以直接执行`s build `即可实现对函数进行构建/依赖安装，示例输出：

```
Build succeeded.
```

#### 进阶操作

由于函数计算的运行环境与本地的开发环境可能存在比较大的不同，这就导致一部分本地安装/构建的依赖，代码包等，在线上无法正常运行，所以，Serverless Devs 开发者工具在 `build` 命令中，增加了 `--use-docker` 的命令，即通过本地的启动 Docker 容器的能力，在容器中进行项目的构建，以尽可能地保证构建出来的依赖/产物，在线上可以得到良好的使用。

不同的运行时，在进行依赖安装/项目构建的时候，可能会有不同的依赖描述文件，其系统默认的对应关系如下：

- Python: requirements.txt

- Nodejs: package.json

- Php: composer.json

- Java: pom.xml

- Container: dockerfile

> ⚠️ 注意：在部分语言完成项目构建之后，部署的时候可能会出现交互式操作，提醒用户是否要将安装的依赖路径加入到环境变量中，以便线上可以正确的加载到这些依赖内容。此时可以通过交互式的方法，根据提醒输入`y`，也可以在部署时通过`-y`命令，默认进行环境变量等内容的添加。

以 Python 应用为例：在具有 `requirements.txt` 的 Python 项目下，可以通过`s build --use-docker`命令实现依赖安装：

![](https://img.alicdn.com/imgextra/i3/O1CN016yUmJP1aKU4boPjWo_!!6000000003311-2-tps-1667-978.png)

如上图所示：

1. 开发编辑源代码；

2. `s build --use-docker`之后， 自动根据 `requirements.txt` 下载对应的依赖到本地， 并且和源码一起组成交付物；

3. `s deploy` 将整个交付物 zip 打包， 创建函数， 同时设置好依赖包的环境变量， 让函数可以直接 `import` 对应的代码依赖包；

> **Node.js 项目**、**PHP 项目**与 Python 项目类似，都是在开发代码之后，可以通过`s build --use-docker`进行依赖安装，此时工具将会自动根据相关依赖文件（例如Node.js是 `package.json` ，PHP是`composer.json` ）下载对应的依赖到本地， 并且和源码一起组成交付物；接下来可以通过`s deploy`进行项目部署，此时工具会将整个交付物 ZIP 打包， 创建函数， 同时设置好依赖包的环境变量， 让函数可以直接 `require` 对应的代码依赖包

> **Java**是在开发代码之后，可以通过`s build --use-docker`进行 Java 工程的构建：
>
> ![](https://img.alicdn.com/imgextra/i4/O1CN014gwk4d1PZdOnL9gWC_!!6000000001855-2-tps-1304-622.png)
>
> 接下来可以通过`s deploy`进行项目部署，此时的交付物是 Jar 包。

> **Custom Container**，则是需要先[开通 ACR/CR 容器镜像服务](https://cr.console.aliyun.com/)，然后在`s.yaml`的`image`字段处填写好`acr`镜像地址，通过`s build --use-docker --dockerfile ./Dockerfile`进行项目构建；接下来可以通过`s deploy --push-registry acr-internet -y`将项目部署到线上，此时工具会先将构建完成的镜像推送到 ACR 服务，然后再进行函数的创建。

> 💡 在使用`build`命令时，可以通过环境变量 `FC_DOCKER_VERSION` 控制镜像的版本，例如 export FC_DOCKER_VERSION=latest（所有可用版本可查看 https://github.com/aliyun/fc-docker 或者 https://hub.docker.com/u/aliyunfc ）

> 💡 在代码包的场景中， 除了各自语言的库以外， 其实还有更加复杂的情况，例如，在函数计算的 Node.js Runtime 上部署 puppeteer 应用， puppeteer 库还需要安装底层的 so 库， 此时还需要 [apt-get.list](https://github.com/devsapp/start-puppeteer/blob/master/puppeteer-nodejs/src/src/apt-get.list) 的支持,  具体如下图所示：
>
> ![](https://img.alicdn.com/imgextra/i2/O1CN01IOxwXQ1EiNBT7jFtJ_!!6000000000385-2-tps-1684-964.png)
>
> 感兴趣的可以参考 [fc-start-puppeteer](https://github.com/devsapp/start-puppeteer/tree/master/src)  中 Deploy using Nodejs 12 with NAS 章节。
