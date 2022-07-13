---
title: Tips
description: 'Common tips'
position: 6
category: 'Overview'
---

# Common tips

- [Relationship between Serverless Devs and the FC component](#Relationship-between-Serverless-Devs-and-the-FC-component)
- [Declaration and deployment of multiple functions](#Declaration-and-deployment-of-multiple-functions)
- [How to configure custom domain name routing for different services/functions](#how-to-configure-custom-domain-name-routing-for-different-servicesfunctions)
- [How to use a `.fcignore` file](#How-to-use-a-fcignore-file)
- [How to use a `.env` file](#How-to-use-a-env-file)
- [Purpose of the `.s` directory in Serverless Devs](#Purpose-of-the-s-directory-in-Serverless-Devs)
- [How to process build results](#How-to-process-build-results)
- [Check whether YAML supports global variables, environment](#Check-whether-YAML-supports-global-variables-environment)
- [Special variables](#Special-variables)
- [Configure components by using environment variables](#Configure-components-by-using-environment-variables)
- [Best practice](https://github.com/devsapp/start-realwrold/tree/master/src)
- [Cases](#Cases)

## Relationship between Serverless Devs and the FC component

1. Serverless Devs is an open source framework for serverless developers and does not provide features. You can integrate different components into Serverless Devs to use different features.

   ![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1639104284744_20211210024516345769.png)

2. You can use the FC component of Serverless Devs to perform operations on Function Compute. For example, you can create functions, delete functions, publish versions, build projects, and perform remote debugging.

> Example：
>
> - Serverless Devs can be compared to the Nintendo Entertainment System, a popular video game console, and components such as FC, Object Storage Service (OSS), and Apsara File Storage NAS (NAS) can be compared to the Nintendo video game cards. The Nintendo Entertainment System can be used only as a platform. You can use the platform together with components such as the game cards to use different features.
> - Serverless Devs can be used in the same manner as Visual Studio Code that does not provide features. You can insert different plug-ins into Visual Studio Code to provide new features. The plug-ins are used in the same manner as different components in the Serverless Devs ecosystem, such as the FC, NAS, and OSS components.

## Declaration and deployment of multiple functions

The FC component supports only one function for a service that is used in a single project. For example, the YAML file contains only one `service` and one `function` for `project1`.

```yaml
edition: 1.0.0           # The version of the YAML specification, which conforms to semantic versioning
name: fcDeployApp        # The project name
access: "default"  # The alias of the key

services:
  project1:
    component: devsapp/fc  # The component name
    props: # The property value of the component
      region: cn-hangzhou
      service:
        name: fc-build-demo
        description: 'demo for fc-deploy component'
      function:
        name: py-event-function
        description: this is a test
```

If you need to deploy multiple `functions` for one `service`, you can configure the `service` by using global variables. Example:

```yaml
edition: 1.0.0           # The version of the YAML specification, which conforms to semantic versioning
name: fcDeployApp        # The project name
access: "default"  # The alias of the key

vars:
  service:
    name: fc-build-demo
    description: 'demo for fc-deploy component'
services:
  project1:
    component: devsapp/fc   # The component name
    props: # The property value of the component
      region: cn-hangzhou
      service: ${vars.service}
      function:
        name: py-event-function-1
        description: this is a test
  project2:
    component: devsapp/fc   # The component name
    props: # The property value of the component
      region: cn-hangzhou
      service: ${vars.service}
      function:
        name: py-event-function-2
        description: this is a test
```

In the preceding YAML file, the global variable `vars` specifies a `service` and `project1` and `project2`. The service is referenced by using the magic variable `${vars.service}`, and the `py-event-function-1` and `py-event-function-2` functions are deployed for the `service`.

## How to configure custom domain name routing for different services/functions

If you need to configure routes with the same custom domain name for different functions, the 'fc-domain' component is recommended. Set up a separate 'service' to establish the mapping between functions and routes.

```yaml
edition: 1.0.0           # The version of the YAML specification, which conforms to semantic versioning
name: fcDeployApp        # The project name
access: "default"  # The alias of the key

vars:
  service:
    name: fc-build-demo
    description: 'demo for fc-deploy component'
  methods:
    - GET
    - POST
    - DELETE
    - PUT
    - HEAD
services:
  compose:
      component: fc-domain
      props:
        region: ${vars.region}
        customDomain:
          domainName: "fc.example.com"
          protocol: HTTP
          routeConfigs:
            - path: "/*"  # The path of the route
              serviceName: ${vars.service.name} # service name
              functionName: website             # function name
              methods: ${vars.methods}          # HTTP methods
            - path: "/api/*"
              serviceName: ${vars.service.name}
              functionName: admin
              methods: ${vars.methods}
```

In the preceding YAML file, set the custom domain name `fc.example.com`, map the function `website` of the front-end resource to the `/*` route, and map the function `admin` of the back-end resource to the `/api/*` route.

## How to use a `.fcignore` file

Save the `.fcignore` file in the code directory. When you deploy files, you can exclude the files or folders that are included in the `.fcignore` file. Example:

```
# Logs
logs/
*.log
 
# Dependency directories
node_modules/
!demo/node_modules
```

The logs/ directory and *.log files can be ignored when you package a code. The node_modules/ directories at all levels are ignored, excluding the demo/node_modules directory. 

**Scenarios**: When you deploy a code package that is larger than 100 MB, the nas command is run to save dependencies to NAS. You can use the .fcignore file to ignore the files that are uploaded to NAS. 


## How to use a `.env` file

When you write code or submit the code to the Git repository, do not disclose sensitive data or information that is used to connect to databases. The sensitive data includes the `AccessKeyID` and `AccessKey` secret of your Alibaba Cloud account. If you write the information that is used to connect to databases or sensitive data in the code, your data may be compromised. 

### Example
1. In this example, the .env file contains the following information:
```
AccessKeyID=xxxx
AccessKeySecret=xxxxxxx
```
> Note: Add the .env file to the `.gitignore` file to ensure that the `.env` file is ignored. 

2. Configure the `s.yaml` file to transfer variables in the `.env` file to Function Compute as environment variables.
```
# s.yaml
edition: 1.0.0
name: fcDeployApp
services:
  fc-deploy-test-function:
    component: devsapp/fc
    props:
      region: cn-hangzhou
      service: 
        name: fc-deploy-service
        internetAccess: true
      function:
        name: function-a
        runtime: nodejs10
        codeUri: ./code
        handler: index.handler
        memorySize: 128
        timeout: 60
        environmentVariables:
          AccessKeyID: ${env.AccessKeyID}
          AccessKeySecret: ${env.AccessKeySecret}
```
3. Read the environment variables in the project code.
- For tests on on-premises devices, read the environment variables in the `.env` file by using a module that is similar to the [dotenv](https://www.npmjs.com/package/dotenv) module.
- For tests in Function Compute, the environment variables are injected into the current process. Node. js obtains the environment variables by using `process.env.AccessKeyID`. 

## Purpose of the `.s` directory in Serverless Devs

When you use the FC component, the .s directory is generated. This directory is an in-process directory and provides the following capabilities:

1. Caches data, such as the cloud resource information that is used during project deployment. After you deploy the project, logs are saved in the .s directory. If you redeploy the project, Serverless Devs compares the resource information that is stored in the logs with your resource information. If the resource information is inconsistent, you are notified about changes in the resources. You can overwrite the changes based on the business requirements. For more information, see Services recorded in your computer and Functions recorded in your computer in the table in the Interactive operations section on the [Deploy](command/deploy.md#Precautions) page.
2. Stores the build results. For example, the build results are stored in the .`/.s/build/artifacts/<Service name>/<Function name>/` directory. The capability is not supported when a custom container is used.

## How to process build results

In general, the products after build have the following situations:

1. In the case of Containers, after the build is the image address, the deploy operation can be performed directly. At this time, the tool will automatically push the image to the Alibaba Cloud Container Image Service and deploy the project;

2. In the case of non-Container:

   - The user code package is not large and can be deployed directly: At this time, you can consider deploying directly, but it should be noted that the `.s` directory cannot be filled in the `.fcignore` file, and it will remind you whether to add the corresponding file during the deployment process. environment variables, you can choose `y` to add to ensure that the built product takes effect;

   - The user code package is relatively large and needs to be uploaded to the NAS: If the code package is relatively large and needs to be uploaded to the NAS, the `.s` directory needs to be added to the `.fcignore` file to ignore the content of the build product; it needs to be in Yaml` Configure the `nasConfig` parameter under service`, you need to choose to add environment variables during the deployment process to ensure that the built product takes effect; after the project deployment operation is completed, upload the product in the `.s` directory, if the service name is `ai-cv at this time. -image-prediction`, the function name is `server`, then the build product (or dependency) path is `./.s/build/artifacts/ai-cv-image-prediction/server/`, so you need to execute the following command to upload:

     ```
     s nas upload -r ./.s/build/artifacts/ai-cv-image-prediction/server/.s/python /mnt/auto/.s/python
     ```

     At this point, we need to pay extra attention. The `/mnt/auto/.s/python` directory we uploaded may not exist, so we need to create the directory before uploading:

     ```
     s nas command mkdir /mnt/auto/.s
     ```

## Check whether YAML supports global variables, environment

The YAML files of the serverless application model supports multiple variable formats:
- Get environment variables of the current server: env(ENV)，example: {env(secretId)}.
- Get the variables of an external document: file(path)，example: {file(./path)}.
- Get global variables :${ vars.*}.
- Get variables of another project :${ projectName.props.*}.
- Get result variables of another project in the YAML file: ${projectName.output.*}
- Gets the config variable for the current configuration: ${config(AccountID)}
  The essence is to get the variable value in `s config get`
- Gets information about the current module: ${this.xx}
  Take Yaml as an example:
  ```
  edition: 1.0.0
  name: NextProject
  access: default-access

  services:
    nextjs-portal:
      component: fc
      actions:
        pre-deploy:
          - run: s invoke ${this.props.url}
            path: ./backend_src
      props:
        codeUri: ./frontend_src
        url: url
  ```
  In `nextjs-portal` Application :
    - Use `${this.name}` means `nextjs-portal`
    - Use `${this.props.codeUri}` means `./frontend_src`
    - Use `${this.access}` means `default-access`;

For more information, see [YAML specifications of Serverless Devs](https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/yaml.md)

## Special-variables

In Serverless-Devs, some special variables have specific purposes, and developers do not have special requirements, so avoid using special variables
- `${aliyun-cli}`
  Acts in the value of `access`, obtains the default `profile` from [aliyun cli](https://github.com/aliyun/aliyun-cli), and takes effect

> Execute `aliyun configure list` to view the currently valid `profile`


## Configure components by using environment variables

The FC component is updated at a low speed. To use the latest version of the component, you can manage the component by using environment variables.

`FC_DOCKER_VERSION`: docker version control for build or local. For example export FC_DOCKER_VERSION=1.9.21

`NAS_CHUNK_SIZE`: nas upload/download slice size, the default is 4M. For example export NAS_CHUNK_SIZE=4

`FC_INSTANCE_EXEC_TIMEOUT`: Instance login idle timeout, the default is 10 minutes. For example export FC_INSTANCE_EXEC_TIMEOUT=600

## Cases

- About Build：
  - [Python Example](./../../examples/build/python)
  - [Node.js Example](./../../examples/build/nodejs)
  - [Java Example](./../../examples/build/java)
  - [PHP Example](./../../examples/build/php)
  - [Custom Container Example](./../../examples/build/custom-container)
