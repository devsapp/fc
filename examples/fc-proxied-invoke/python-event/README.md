# python-event

## Normal

### Setup

```bash
$ s proxied setup
```

支持解释型语言热更。

## Proxied Invoke

setup 执行完会阻塞住，此时打开一个新的终端，执行如下指令进行调用：

```bash
$ s proxied invoke
```

调用完成后会返回如下结果：

```bash
[2021-07-07T10:08:09.468] [INFO ] [S-CLI] - Start ...
========= FC invoke Logs begin =========
Not all function logs are available, please retry
FC Invoke End RequestId: 279f1ced-c5e8-4efb-8350-16faa1a33c1d
Duration: 21977.58 ms, Billed Duration: 21978 ms, Memory Size: 1024 MB, Max Memory Used: 66.52 MB
========= FC invoke Logs end =========

FC Invoke Result:
hello world


End of method: invoke
```

## clean

清理辅助资源、session 以及本地调试容器。

```bash
$ s proxied cleanup
```

## Debugging

### Setup

```bash
$ s proxied setup --config vscode --debug-port 3000
```

命令执行完成后， 本地的函数计算执行环境会阻塞等待调用(执行环境本质是一个 HTTP Server), 如下图中的 5：

![](https://img.alicdn.com/imgextra/i2/O1CN018mgNZh20wCiDHdoMT_!!6000000006913-2-tps-2255-1282.png)

此时直接执行下一步 `Proxied Invoke`，进行的是正常模式的调用流程。若要进行断点调试，进行如下操作：

> 工具直接自动给您工程目录下面生成 .vscode/launch.json 文件, 完成调试配置，直接按下图操作即可。

![](https://img.alicdn.com/imgextra/i1/O1CN01kNeLy01Omd2Ge3Q6J_!!6000000001748-2-tps-341-233.png)

## Proxied Invoke

打开一个新的终端，执行如下指令进行调用：

```bash
$ s proxied invoke
```

上述指令执行完成后，回到 vscode 界面，函数就开始了断点调试。

![img](https://img.alicdn.com/imgextra/i4/O1CN01biJncZ1l3V9VNWOd8_!!6000000004763-2-tps-3542-2232.png)

调试完成后返回结果。

若要在调用的时候制定传入的 event 参数，可以使用 --event，详情请执行:

```bash
$ s proxied invoke -h
```

## clean

清理辅助资源、session 以及本地调试容器。

```bash
$ s proxied cleanup
```
