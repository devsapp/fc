# 配置阿里云密钥

用户使用 Serverless Devs 工具时，可以通过 ```s``` 指令来查看整体帮助信息。

```shell
$ s
Usage: s [options] [command]

  _________                               .__
 /   _____/ ______________  __ ___________|  |   ____   ______ ______
 \_____  \_/ __ \_  __ \  \/ // __ \_  __ \  | _/ __ \ /  ___//  ___/
 /        \  ___/|  | \/\   /\  ___/|  | \/  |_\  ___/ \___ \ \___ \
/_________/\_____>__|    \_/  \_____>__|  |____/\_____>______>______>

Welcome to the Serverless Devs.
You can use the corresponding function through the following instructions.

More: 
📘 Documents: https://www.github.com/serverless-devs/docs
🙌 Discussions: https://github.com/Serverless-Devs/Serverless-Devs/discussions
⁉️  Issues: https://github.com/Serverless-Devs/Serverless-Devs/issues
👀 Current Registry: http://registry.devsapp.cn/simple

Quick start: 
🍻 Can perform 's init' fast experience

Options:
  -v, --version   Output the version number
  --skip-actions  Skip the extends section
  --debug         Debug model
  -h, --help      Display help for command

Commands:
  config          👤 Configure cloud service account.
  init            💞 Initializing a project.
  cli             🐚 Command line operation through yaml free mode.
  set             🔧 Settings for the tool.
  exec            🚀 Subcommand execution analysis.
```

在第一次使用 fc 组件前需要先执行 ```s config add``` 来进行密钥的配置，按照提示，选择 ```Alibaba Cloud (alibaba)``` 后依次配置 `AccountID`、`AccessKeyID`、`AccessKeySecret`、 `alias` 即可。其中 `AccountID`、`AccessKeyID` 可以从[函数计算控制台](https://fc.console.aliyun.com)首页的右上方获得，如下图所示：

![](https://img.alicdn.com/tfs/TB13J02wp67gK0jSZPfXXahhFXa-2424-1380.png)
![](https://img.alicdn.com/tfs/TB1cYuGwuH2gK0jSZJnXXaT1FXa-2424-1380.png)

您也可以通过命令式直接进行密钥的添加：

```shell
$ s config add --AccessKeyID ****** --AccessKeySecret ****** --AccountID ****** --aliasName ***
```