---
title: Build commands
description: 'Build commands'
position: 2
category: 'Build&Deploy'
---
# Build commands

The `build` command is used to build functions and install dependencies. 

- [Command description](#Command-description)
  - [Parameter description ](#Parameter-description )
  - [Examples](#Examples)


## Command description

You can run the `build -h/build --help` command to obtain the documentation.


### Parameter description 
 
| Parameter  | Abbreviation | Required in YAML mode | Description                           |
| ---------- | -------- | -------------- | ------------------------------------------------------------ |
| dockerfile | f | Optional | Specifies the file that you want to use to customize an image. | 
| use-docker | d | Optional | Builds the image with docker. | 
| use-buildkit | b | Optional | Builds the image with buildctl. | 

> The current command also supports some global parameters (such as `-a/--access`, `--debug`, `--help`, etc.), please refer to [Serverless Devs Global Parameters Document](https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/en/command/readme.md#supported-parameters)

### Examples

#### Basic operation 

**If a YAML file can be used**, you can run the `s build` command to build functions and install dependencies. Example command output:
```
Build succeeded.
```

#### Advanced operations

The runtime environment of Function Compute is quite different from the local development environment. Some local dependent libraries and code libraries may not run normally in Function Compute. To solve this issue, Serverless Devs adds the `--use-docker` command to the `build` command, so that you can run containers from locally stored Docker images and build projects in containers. This ensures that the local dependent libraries and code libraries can run normally in Function Compute. 

When you build functions and install dependencies, different runtime environments require different dependency description files. Function Compute supports the following manifest files of package managers for different programming languages:

- Python: requirements.txt

- Nodejs: package.json

- Php: composer.json

- Java: pom.xml

- Container: dockerfile

> ⚠️ Note: When you run the s deploy command in some runtime environments, the system may ask you whether to add the paths of the installed dependencies to the environment variables so that these dependencies can be loaded to Function Compute. In this case, you can input `y` based on instructions or use the `-y` command during deployment to add the paths of the installed dependencies to environment variables by default. 

Take Python as an example. In a Python project that has the `requirements.txt` file, you can use the `s build --use-docker` command to install dependencies:



![](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1647525227853_20220317135348699845.png)



The preceding figure shows the following information:

1. Develop and edit source code.

2. Run the `s build --use-docker` command to install dependencies. Then, Serverless Devs automatically downloads the dependencies that are defined in the `requirements.txt` file to your computer, and packages the downloaded dependencies and source code into a deliverable ZIP file.

3. Run the `s deploy` command to deploy the project. Then, Serverless Devs creates a function based on the content in the deliverable ZIP file and configures the environment variable of the dependent library. This allows the function to directly `import` the code dependent library.


> **Node.js projects** and **PHP projects** are similar to Python projects. After developing the source code, you can install dependencies by using the `s build --use-docker` command. Then, Serverless Devs automatically downloads the dependencies that are defined in the dependency description file (the `package.json` file in a Node.js project or the `composer.json` file in a PHP project), and packages the downloaded dependencies and source code into a deliverable ZIP file. The next step is project deployment. You can run the `s deploy` command to deploy the project. Then, Serverless Devs creates a function based on the content in the deliverable ZIP file and configures the environment variable of the dependent library. This allows the function to directly `require` the code dependent library.

> To install dependencies in **Java**, you can perform the following operations: develop and edit source code, run the `s build --use-docker` command in the project directory to compile the Java project and install dependencies.
>
> ![](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1647525285018_20220317135456740085.png)
>
> Run the `s deploy` command to deploy the project. In Java projects, deliverable ZIP files are JAR packages. 

> Function Compute allows you to use custom containers as the runtime environments of functions. To install dependencies in a **custom container**, you must first [activate Container Registry (ACR)](https://cr.console.aliyun.com/). Then, specify the ACR image address in the image field of the `s.yaml` file and run the `s build --use-docker --dockerfile ./Dockerfile` command to build a project. Next, you can deploy the project by running the `s deploy --push-registry acr-internet -y` command. Then, the tool will push the new image to ACR before creating a function. 

> 💡 When using the s build command, you can use the `FC_DOCKER_VERSION` environment variable to specify the version of the image. For example, you can set `FC_DOCKER_VERSION` to latest to export the Docker image of the latest version. For all available versions, visit https://github.com/aliyun/fc-docker or https://hub.docker.com/u/aliyunfc.

> 💡 In scenarios in which code libraries are used, you may need to perform more operations in addition to installing the libraries for various programming languages. For example, the runtime environment of a Puppeteer application deployed in Function Compute is Node.js. In addition to the Puppeteer library, an underlying .so library, such as [apt-get.list](https://github.com/devsapp/start-puppeteer/blob/master/src/nodejs12/src/apt-get.list), needs to be installed, as shown in the following figure:
>
> ![](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1647526098404_20220317140844044956.png)
>
> For more information, see the "Deploy using Nodejs 12 with NAS" section in the [fc-start-puppeteer](https://github.com/devsapp/start-puppeteer/tree/master/src) page. 
