---
title: Build 命令
description: 'Build 命令'
position: 2
category: '构建&部署'
---

# Build 命令

`build` 命令是进行函数构建/依赖安装的命令。

- [Build 命令](#build-命令)
  - [命令解析](#命令解析)
    - [参数解析](#参数解析)
    - [操作案例](#操作案例)
      - [基础操作 use-docker](#基础操作-use-docker)
      - [基础操作 local](#基础操作-local)
      - [高阶自定义操作 use-sandbox](#高阶自定义操作-use-sandbox)
      - [进阶操作 use-buildkit](#进阶操作-use-buildkit)
  - [apt-get.list文件](#apt-get.list)

## 命令解析

当执行命令`build -h`/`build --help`时，可以获取帮助文档。

### 参数解析

| 参数全称     | 参数缩写 | 参数含义                                                                                                                  |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| use-docker   | d        | 通过 docker 构建                                                                                                          |
| use-buildkit | 无       | 通过 buildctl 构建                                                                                                        |
| use-sandbox  | 无       | 进入对应 runtime 的 sandbox 容器                                                                                          |
| dockerfile   | f        | 指定构建自定义镜像的文件, use-docker 或 use-buildkit 构建 custom-container runtime 的镜像时使用                           |
| context      | 无       | custom-container 构建镜像时上下文                          |
| custom-env   | 无       | build 时注入的自定义环境变量                                                                                              |
| custom-args  | 无       | 使用默认 build 行为时的附加参数， 比如指定 pypi 或者 npm 源, 需要配合 use-docker 或 use-buildkit 使用， 默认是 use-docker |
| command      | 无       | 使用自定义命令， 需要配合 use-docker 或 use-buildkit 使用， 默认是 use-docker                                             |
| script-file  | 无       | 使用自定义脚本， 需要配合 use-docker 或 use-buildkit 使用， 默认是 use-docker                                             |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`, `--help`等），详情可参考 [Serverless Devs 全局参数文档](https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/command/readme.md#%E5%85%A8%E5%B1%80%E5%8F%82%E6%95%B0)

### 操作案例

#### 基础操作 use-docker

最佳推荐使用方式，由于函数计算的运行环境(linux debian9)与本地的开发环境可能存在比较大的不同，这就导致一部分本地安装/构建的依赖，代码包等，在线上无法正常运行，所以，Serverless Devs 开发者工具在 `build` 命令中，增加了 `--use-docker` 的命令，即通过本地的启动 Docker 容器的能力，在容器中进行项目的构建，以尽可能地保证构建出来的依赖/产物，在线上可以得到良好的使用，

不同的运行时，在进行依赖安装/项目构建的时候，可能会有不同的依赖描述文件，其系统默认的对应关系如下：

- Python: requirements.txt

- Nodejs: package.json

- Php: composer.json

- Container: dockerfile

> ⚠️ 注意：在部分语言完成项目构建之后，部署的时候可能会出现交互式操作，提醒用户是否要将安装的依赖路径加入到环境变量中，以便线上可以正确的加载到这些依赖内容。此时可以通过交互式的方法，根据提醒输入`y`，也可以在部署时通过`-y`命令，默认进行环境变量等内容的添加。

以 Python 应用为例：在具有 `requirements.txt` 的 Python 项目下，可以通过`s build --use-docker`命令实现依赖安装：

![](https://img.alicdn.com/imgextra/i3/O1CN016yUmJP1aKU4boPjWo_!!6000000003311-2-tps-1667-978.png)

如上图所示：

1. 开发编辑源代码；

2. `s build --use-docker`之后， 自动根据 `requirements.txt` 下载对应的依赖到本地， 并且和源码一起组成交付物；

3. `s deploy` 将整个交付物 zip 打包， 创建函数， 同时设置好依赖包的环境变量， 让函数可以直接 `import` 对应的代码依赖包；

> **Tips:**
>
> 1. 在 build 过程中注入自定义环境变量和使用指定的 pypi 源， 可以使用如下命令 `s build --use-docker --custom-env '{"myenv": "test"}' --custom-args '-i https://pypi.tuna.tsinghua.edu.cn/simple'`
> 2. 如果不想使用 `s build --use-docker` 的默认行为
>    - 2.1 直接输入命令 `s build --use-docker --command="pip install -t . flask -i https://pypi.tuna.tsinghua.edu.cn/simple"` , command 工作的目录对应您 s.yaml 指定的 codeUri
>    - 2.2 直接输入命令 `s build --use-docker --script-file my_script.sh` , script-file 工作的目录对应您 s.yaml 指定的 codeUri

**Node.js 项目**、**PHP 项目**与 Python 项目类似，都是在开发代码之后，可以通过`s build --use-docker`进行依赖安装，此时工具将会自动根据相关依赖文件（例如 Node.js 是 `package.json` ，PHP 是`composer.json` ）下载对应的依赖到本地， 并且和源码一起组成交付物；接下来可以通过`s deploy`进行项目部署，此时工具会将整个交付物 ZIP 打包， 创建函数， 同时设置好依赖包的环境变量， 让函数可以直接 `require` 对应的代码依赖包。

**Custom Container**，则是需要先[开通 ACR/CR 容器镜像服务](https://cr.console.aliyun.com/)，然后在`s.yaml`的`image`字段处填写好`acr`镜像地址，通过`s build --use-docker --dockerfile ./Dockerfile`进行项目构建；接下来可以通过`s deploy -y`将项目部署到线上，此时工具会自动先将构建完成的镜像推送到 ACR 服务，然后再进行函数的创建。

> 💡 在使用`build`命令时，可以通过环境变量 `FC_DOCKER_VERSION` 控制镜像的版本，例如 export FC_DOCKER_VERSION=latest（所有可用版本可查看 https://github.com/aliyun/fc-docker 或者 https://hub.docker.com/u/aliyunfc ）

> 💡 在代码包的场景中， 除了各自语言的库以外， 其实还有更加复杂的情况，例如，在函数计算的 Node.js Runtime 上部署 puppeteer 应用， puppeteer 库还需要安装底层的 so 库， 此时还需要 [apt-get.list](https://github.com/devsapp/start-puppeteer/blob/master/puppeteer-nodejs/src/code/apt-get.list) 的支持, 具体如下图所示：
>
> ![](https://img.alicdn.com/imgextra/i2/O1CN01IOxwXQ1EiNBT7jFtJ_!!6000000000385-2-tps-1684-964.png)
>
> 感兴趣的可以参考 [fc-start-puppeteer](https://github.com/devsapp/start-puppeteer/tree/master/puppeteer-nodejs) 中 Deploy using Nodejs 12 章节。

#### 基础操作 local

**有资源描述文件（Yaml）时**，可以直接执行`s build `即可实现对函数进行构建/依赖安装，示例输出：

```
root@iZbp13jtbkfo9pfhol23exZ:~/test # s build
[2022-05-12 06:23:09] [INFO] [FC-BUILD] - Build artifact start...
✔ devsapp_fc-core@dev.zip file decompression completed
[2022-05-12 06:23:09] [INFO] [FC-BUILD] - build use model useLocal
builder begin to build, runtime is: python3, sourceDir:  /root/a/start-fc-event-python3/code
running task: flow PipTaskFlow
running task: PipInstall
...
[2022-05-12 06:23:11] [INFO] [FC-BUILD] - Build artifact successfully.
```

不推荐的使用方式， 除非您本地的运行容器和函数计算线上容器环境比较一致， 没有兼容性问题。

#### 高阶自定义操作 use-sandbox

为了满足用户自定义操作， Serverless Devs 开发者工具在 `build` 命令中，增加了 `--use-sandbox` 的命令， 只要输入:

```bash
$ s build --use-sandbox
# or
$ s build --use-sandbox --custom-env '{"myenv": "test"}'
```

Serverless Devs 开发者工具会根据您 `s.yaml` 中的 runtime, 自动拉起一个模拟线上 runtime 的真实容器， 并且将您 s.yaml 中的 `codeUri` 指定的目录挂载到容器的 `/code` 目录下面，之后您可以在容器里面执行 `npm install` 等满足您自己需求的命令。

在这里推荐使用内置 s-install 工具解决您可能遇见的如下两个难题，比如:

**1. 第三方 lib 依赖底层的 so 文件**
比如在 nodejs12 runtime 部署 puppeteer 应用， 但是 puppeteer 依赖的一些底层 so 库在 nodejs12 runtime 中不存在， 可以借助 s-install 完成我们的目标:

```bash
xiliu@xl-mac:~/test-puppeteer $ s build --use-sandbox
...
root@fc-nodejs12:/code# s-install apt-get install libblas3 fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libgtk-3-0 libnspr4 libnss3 libpangocairo-1.0-0 libxcb-dri3-0 libx11-xcb1 libxcb1 libxss1 libxtst6 lsb-release xdg-utils libatspi2.0-0 libatk1.0-0 libxkbcommon0 libepoxy0 libglapi-mesa libnspr4 libgbm-dev
Task => AptTask
     => sudo apt-get update (if need)
     => apt-get install -y -d -o=dir::cache=/code/.s/tmp/install libblas3,fonts-liberation,libappindicator3-1,libasound2,libatk-bridge2.0-0,libgtk-3-0,libnspr4,libnss3,libpangocairo-1.0-0,libxcb-dri3-0,libx11-xcb1,libxcb1,libxss1,libxtst6,lsb-release,xdg-utils,libatspi2.0-0,libatk1.0-0,libxkbcommon0,libepoxy0,libglapi-mesa,libnspr4,libgbm-dev --reinstall --no-install-recommends
     => bash -c
        for f in $(ls /code/.s/tmp/install/archives/*.deb); do
          echo "Preparing to unpack ${f##*/}"
          dpkg -x $f /code/.s/root;

          echo "Setting up ${f##*/}"
          mkdir -p /code/.s/tmp/install/deb-control/${f%.*};
          dpkg -e $f /code/.s/tmp/install/deb-control/${f%.*};
          if [ -f "/code/.s/tmp/install/deb-control/${f%.*}/postinst" ]; then
            FUN_INSTALL_LOCAL=true DPKG_MAINTSCRIPT_NAME=postinst /code/.s/tmp/install/deb-control/${f%.*}/postinst configure;
          fi;
        done;
     => bash -c 'rm -rf /code/.s/tmp/install/archives /code/.s/tmp'
root@fc-nodejs12:/code# ls -a
.  ..  .s  index.js  package.json
root@fc-nodejs12:/code# ls .s/root/
etc  usr
```

如上所示，so 底层 lib 全部安装到 .s/root 目录下面， 为了能函数能正确使用到这些 so 文件， 最后 deploy 的时候给函数增加下面两个环境变量即可：

```
LD_LIBRARY_PATH=/code/.s/root/usr/local/lib:/code/.s/root/usr/lib:/code/.s/root/usr/lib/x86_64-linux-gnu:/code/.s/root/usr/lib64:/code/.s/root/lib:/code/.s/root/lib/x86_64-linux-gnu:/code/.s/root/python/lib/python2.7/site-packages:/code/.s/root/python/lib/python3.6/site-packages:/code:/code/lib:/usr/local/lib

PATH=/code/.s/root/usr/local/bin:/code/.s/root/usr/local/sbin:/code/.s/root/usr/bin:/code/.s/root/usr/sbin:/code/.s/root/sbin:/code/.s/root/bin:/code:/code/node_modules/.bin:/code/.s/python/bin:/code/.s/node_modules/.bin:/usr/local/bin:/usr/local/sbin:/usr/bin:/usr/sbin:/sbin:/bin
```

**2. python 库安装目录组织更简洁**

```bash
xiliu@xl-mac:~/test-py $ s build --use-sandbox
...
root@fc-python3:/code# s-install pip install DingtalkChatbot
Task => PipTask
     => PYTHONUSERBASE=/code/.s/python pip install --user --upgrade DingtalkChatbot
root@fc-python3:/code# ls
index.py  requiremenets.txt
root@fc-python3:/code# ls -a
.  ..  .s  index.py
root@fc-python3:/code# ls .s/python/lib/python3.6/site-packages/
DingtalkChatbot-1.5.3.dist-info  dingtalkchatbot
```

如上所示，python lib 全部安装到 .s/python 目录下面，代码目录比 `pip install -t . DingtalkChatbot` 简洁很多，为了能函数能正确 import 这些 lib， 最后 deploy 的时候给函数增加下面这个环境变量即可：

```
PYTHONUSERBASE=/code/.s/python
```

#### 进阶操作 use-buildkit

**示例**

```bash
# 非 custom-container 函数
$ s build --use-buildkit
## or
$ s build --use-buildkit --custom-env '{"myenv": "test"}'
## or 使用自定义命令 build，工作目录对应 s.yaml 中的 codeUri
$ s build --use-buildkit --command="npm install"
## or 使用自定义脚本 build 行为，工作目录对应 s.yaml 中的 codeUri
$ s build --use-buildkit --script-file my_script.sh

# custom-container 函数
$ s build --use-buildkit --dockerfile ./code/Dockerfile
```

目前这个指令主要用于在云效的流水线，配置如下：

![](https://img.alicdn.com/imgextra/i4/O1CN01uvxZNh1Zx7vmwrftZ_!!6000000003260-2-tps-932-644.png)

> 云效的 `Serverless Devs` 默认带有环境变量 `enableBuildkitServer=1` 和 `buildkitServerPort=65360`, `s build` 会自动使用 use-buildkit 模式

比如您的 codeup 的工程如下：
![](https://img.alicdn.com/imgextra/i3/O1CN01WoLZNT1vAxp88zO91_!!6000000006133-2-tps-1012-881.png)

同时流水线配置的用户命令如下：

> 将 ak 和 access 换成您自己的

```bash
#! /bin/bash
echo $HOME
export HOME=/root/workspace
# 1. install and config s
curl -o- -L http://cli.so/install.sh | bash
export PATH=$HOME/.s/node-v14.19.3-linux-x64/bin:$PATH
s config add --AccessKeyID ${my-ak-id} --AccessKeySecret ${my-ak-secret}  -a default -f

s clean --all

s code-function  build --use-buildkit
s image-function build --use-buildkit --dockerfile ./code-img/Dockerfile
s deploy -y --use-local
```

## apt-get.list

此文件顾名思义，就是声明可以使用 apt-get 命令安装但是函数计算没有系统包。

使用方式是在 code 目录的根目录下，创建一个 apt-get.list 的文件，文件内容如下所示。然后部署之前执行 s build --use-docker 即可。
```
zip
unzip
```
