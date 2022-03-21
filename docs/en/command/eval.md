---
title: Eval commands
description: 'Eval commands'
position: 5
category: 'Call&Debugging'
---
# Eval commands

The following two scenarios exist in serverless mode:

- For CPU-intensive scenarios, such as audio and video processing, AI inference and image processing, you can use a single instance to process a single request. In these scenarios, the function memory is proportional to the CPU power. You need to select a proper memory size based on whether the function is cost-sensitive or latency-sensitive. 

- For I/O-intensive scenarios, you can use a single instance to concurrently process multiple requests. In these scenarios, the function memory is proportional to the CPU power. We recommend that you use a large memory size for the function. If you select an improper concurrency value for a single instance, resources may be wasted. 

If you cannot specify parameters that meet your business requirements in the preceding scenarios, you can use Power Tuning that is provided by Serverless Devs to fine-tune memory and concurrency configurations. Power Tuning helps you obtain parameter configurations that meet your business requirements. The eval commands are used to detect the configurations of functions. You can run the eval commands to detect the memory configurations in the scenario where a single instance processes a single request or the concurrency configurations in the scenario where a single instance concurrently processes multiple requests. In this example, the optimal memory size for a function in a CPU-intensive scenario and the optimal concurrency value for a function in an I/O-intensive scenario are obtained by using the eval commands. You can configure the optimal memory size and the optimal concurrency value that meet your business requirements based on the detection results. 

<font color="red">Note: You can run the eval commands for functions in the development and pre-release environments. We recommend that you do not run the eval commands for functions in the production environments.</font>

- [Command description](#Command-description)
- [eval start command](#eval-start-command)
    - [Parameter description](#Parameter-description)
    - [Examples](#Examples)
      - [Memory detection](#Memory-detection)
      - [Concurrency detection](#Concurrency-detection)
- [Permissions and policies](#Permissions-and-policies)

## Command description

You can run the `eval -h` or `eval --help` command to obtain the information about the relevant help documentation.

The sample code contains the following subcommand:

- [start: detects the configurations of a function.](#eval-start-command)

## eval start command

The `eval start` command is used to detect the configurations of a function. 
 
You can run the `eval start -h` or `eval start --help` command to obtain the information about the relevant help documentation.

### Parameter description



| Parameter        | Abbreviation | Required   in YAML mode | Required   in CLI mode | Description                                                  |
| ---------------- | ------------ | ----------------------- | ---------------------- | ------------------------------------------------------------ |
| region           | -            | No                      | Yes                    | The region where the  function is deployed. Valid values: cn-hangzhou, cn-beijing, cn-beijing,  cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote,  cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2,  ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1,  us-west-1, us-east-1, and ap-south-1. |
| service-name     | -            | No                      | Yes                    | The name of the  service to which the function belongs.      |
| function-name    | -            | No                      | Yes                    | The name of the  function.                                   |
| eval-type        | -            | No                      | No                     | The type of the  detection. Valid values: memory  and concurrency. Default value: memory. |
| memory-size      | -            | No                      | No                     | The memory size. This  parameter is required when you set the eval-type parameter to memory.  Example:128,  256, 512, or 1024. |
| run-count        | -            | No                      | No                     | Specifies the number  of times that the function is invoked when different memory size are  specified. This parameter is required when you set the eval-type parameter to  memory. |
| memory           | -            | No                      | No                     | This parameter is  required when you set the eval-type parameter to concurrency. We recommend  that you use a large memory size. For example, you can use an elastic  instance of 1.5 GB (about 1vCPU) or 3 GB (about 2vCPU), or use a performance  instance. |
| concurrency-args | -            | No                      | No                     | Specifies the  concurrency range and the step size of the function. This parameter is  required when you set the eval-type parameter to concurrency. In this  example, the 2,20,5 value is set for the concurrency-args parameter. This  value indicates that the concurrency range is 2 to 20 and the step size is 5.  The function is detected in concurrency values of 2, 7, 12, and 17. |
| rt               | -            | No                      | No                     | Specifies the maximum  response time that meets your business requirements. This parameter is  required when you set the eval-type parameter to concurrency. |
| method           | -            | No                      | No                     | Specifies the request  method of an HTTP function. Valid values: GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD,  get, post, put, patch, delete, options, and head. |
| path             | -            | No                      | No                     | Specifies the request path of an  HTTP function.             |
| payload          | -            | No                      | No                     | Specifies the HTTP  request body of an HTTP function or the event input  parameter of an event function. |
| payload-file     | -            | No                      | No                     | Specifies the file  that contains the HTTP request body of an  HTTP function or the file that contains the event input  parameter of an event function. This parameter is required when you set the eval-type  parameter to memory or concurrency. |
| query            | -            | No                      | No                     | The query string  of the HTTP request of an HTTP function.   |
| headers          | -            | No                      | No                     | The HTTP request  headers of an HTTP function. Example: {"header_a":"val"}. |
| access           | a            | No                      | Yes                    | The AccessKey pair  that is used in the request. You can use the AccessKey pair that is  configured by running [the config command](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#config-add-command) or by using [environment variables](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md#Configure-keys-by-using-environment-variables). |
| debug            | -            | No                      | No                     | The debug mode. If  you enable the dedug mode, a larger number of logs are returned. |
| help             | h            | No                      | No                     | Views the help  information.                                 |


### Examples

- **If a function has a YAML description file**, run the `s eval start` command to detect the configurations of the function.
- **In CLI mode (no YAML file exists)**, you must add information such as the region ID, function name, and name of the service to the eval start command . Example: `s cli fc eval start --region cn-hangzhou --function-name cpu-test --function-name test --service-name Service --eval-type memory --run-count 10 --payload '{"key":"val"}' --memory-size 128,256,512,1024 --access default`.

#### Memory detection

This example shows how to use the memory detection mode in CPU-intensive scenarios. Run the following command to obtain the optimal memory size:

```bash
s cli fc eval start --region cn-hangzhou --function-name cpu-test --service-name Service  --eval-type memory  --run-count 10   --payload '{"key":"val"}' --memory-size 128,256,512,1024  --access default
```

In this example, a function is invoked 10 times at the following memory sizes: 128 MB, 256 MB, 512 MB, and 1024 MB. After you run the eval start command, the average values of the memory sizes are returned. You can compare the average values to obtain the optimal configurations of the memory size. 

The following command output is returned:

```text
...
>-
http://memory-tuning.devsapp.cn/#gAAAAQACAAQ=;AIAARwBYgEYAoPdFAHiBRQ==;37w+OH+BPjiqxzc4/SxAOA==
```

Open the URL that is contained in the command output in a browser to view the results of memory detection. The following figure shows the memory detection results.

![图片alt](https://img.alicdn.com/imgextra/i3/O1CN01nZNiZX1dQO2nqqWVf_!!6000000003730-2-tps-1533-649.png)

The results contain the following information:

1. Lines in the middle part: The red line indicates the relationship between the execution time and the memory size. The blue line indicates the relationship between the execution cost and the memory size.
2. Values on the right side:
   - Best Cost: specifies the memory size value when the execution cost reaches the minimal value. In the preceding figure, the memory size value is of 512 MB.
   - Best Time：Best Time: specifies the memory size value when the execution time reaches the minimal value. In the preceding figure, the memory size value is of 1024 MB.
   - Worst Cost: specifies the memory size value when the execution cost reaches the maximum value. In the preceding figure, the memory size value is of 1024 MB.
   - Worst Time: specifies the memory size value when the execution time reaches the maximum value. In the preceding figure, the memory size value is of 128 MB.

You can set the memory size value that best suits your needs based on the preceding results. For example, if the execution time cannot exceed 20000 ms, you can set the memory size to 256 MB. If the execution time cannot exceed 5000 ms, you can set the memory size to 1024 MB. 

#### Concurrency detection

This example shows how to perform concurrency detection on an HTTP function in I/O-intensive scenarios. Run the following command to obtain the information about the optimal concurrency value:

```bash
s cli fc eval start --region cn-hangzhou --function-name demo --service-name Service --eval-type concurrency --memory 1536 --concurrency-args 2,25,5 --rt 600 --method=get --path /login  --query 'a=1&b=2'  --headers='{"header_a":"v"}' --access default
```

In this example, the configurations of a function whose memory size is of 1.5 GB, concurrency range is from 2 to 20, and step size is 5 is detected. The function is detected in different concurrency values of 2, 7, 12, and 17. 

The following command output is returned:

```text
...
>-
http://concurrency-tuning.devsapp.cn/#AgAHAAwAEQAWABkA;zcw8QgAAhkIAACRDAICgQ81MwUOamaZD;AACwQQAAwEEAAMhBAACwQQAAwEEAAMhB
```

Open the URL that is contained in the command output in a browser to view the results of concurrency detection. The following figure shows the concurrency detection results.

![](https://img.alicdn.com/imgextra/i3/O1CN01B2gC2p1WDptdz4n9M_!!6000000002755-2-tps-2714-1252.png)

The results contain the following information:

1. Lines in the middle part: The red line indicates the relationship between the execution time and the single-instance concurrency. The blue line indicates the relationship between the effective queries per second (QPS) and the single-instance concurrency.

	>  Effective QPS refers to (total number of requests - 429 requests that are throttled, and 5XX requests that are abnormal such as OOM)/total time Calculated
                                                                                                                                                                                                                                                                    
2. Values on the right side:
   - Best QPS: specifies the concurrency value for an instance when the effective QPS reaches the maximum value. In the preceding figure, the concurrency value is 17.
   - Best Time: specifies the concurrency value for an instance when the execution time reaches the minimum value. In the preceding figure, the concurrency value is 2.
   - Worst QPS: specifies the concurrency value for an instance when the effective QPS reaches the minimum value. In the preceding figure, the concurrency value is 2.
   - Worst Time: specifies the concurrency value for an instance when the execution time reaches the minimum value. In the preceding figure, the concurrency value is 17.

You can set the concurrency value that best suits your needs for based on the preceding results. If the execution time cannot exceed 20 ms, you can set the concurrency value for an instance to 12. 

## Permissions and policies

Attach the FCFullAccess policy. The FCFullAccess policy corresponds to the access parameter specified by using the s config command.
