# 常见小贴士

- [如何声明/部署多个函数](#如何声明部署多个函数)
- [超过50M的代码包如何部署](#超过50M的代码包如何部署)
- [关于`ignore`使用方法](#关于ignore使用方法)
- [项目实践案例](#项目实践案例)

## 如何声明/部署多个函数

函数计算组件在单个模块下在仅支持一个服务对应一个函数，例如下面所示 Yaml 中`project1`仅有一个`service`与`function`：
```yaml
edition: 1.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: fcDeployApp       #  项目名称
access: "default"  #  秘钥别名

services:
  project1:
    component: devsapp/fc  # 组件名称
    props: #  组件的属性值
      region: cn-hangzhou
      service:
        name: fc-build-demo
        description: 'demo for fc-deploy component'
      function:
        name: py-event-function
        description: this is a test
```

如果需要一个`service`下由多个`function`，可以通过全局变量定义`service`，例如：

```yaml
edition: 1.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: fcDeployApp       #  项目名称
access: "default"  #  秘钥别名

vars:
  service:
    name: fc-build-demo
    description: 'demo for fc-deploy component'
services:
  project1:
    component: devsapp/fc  # 组件名称
    props: #  组件的属性值
      region: cn-hangzhou
      service: ${vars.service}
      function:
        name: py-event-function-1
        description: this is a test
  project2:
    component: devsapp/fc  # 组件名称
    props: #  组件的属性值
      region: cn-hangzhou
      service: ${vars.service}
      function:
        name: py-event-function-2
        description: this is a test
```

例如上面的 Yaml 中，全局变量`vars`定义了一个`service`，`project1`和`project2`同时通过魔法变量`${vars.service}`引用了这个`service`，然后分别对应了不同的函数`py-event-function-1`和`py-event-function-2`.


## 超过50M的代码包如何部署

函数计算的接口本身默认只支持 50M 的代码包，如果想要部署超过 50M 的代码包，可以考虑：
1. (50M, 100M] 范围内的代码包，可以：
    - 指定 `s.yml` 中的 `ossBucket` 字段(需要是已存在的 Bucket)，此时通过工具进行部署时，工具会把代码压缩上传到这个指定的 Bucket，然后再在函数中拉取这个代码包；
    - 手动将代码压缩上传到对象存储，然后在 `s.yaml` 中指定 `ossBucket` 和 `ossKey` 字段，此时部署函数时，工具会直接去对象存储中拉取指定的代码包；
2. 大于 100M 的代码包，可以：
    - 将 `nasConfig` 配置为 `auto`，然后基于 nas 指令将大文件（可能是训练集/依赖包）传输到 NAS 指定位置，然后配置相应的环境变量到 `s.yml` 中的函数配置中；
    - 将非 custom-container 的函数转换成 custom-container，这需要对代码进行一定的改造，并新增 dockerfile，然后创建这个函数；

## 关于`ignore`使用方法


## 项目实践案例

- Build相关：
    - [Python 案例](./../examples/build/python)
    - [Node.js 案例](./../examples/build/nodejs)
    - [Java 案例](./../examples/build/java)
    - [PHP 案例](./../examples/build/php)
    - [Custom Container 案例](./../examples/build/custom-container)
- [Custom Container 使用案例](./../examples/custom-container-function)