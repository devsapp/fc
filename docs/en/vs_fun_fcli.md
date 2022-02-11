# Compare among Serverless Devs, Function Compute command line interface (fcli), and Funcraft

- [Format comparison](#Format-comparison)
- [Feature comparison](#Feature-comparison)
- [Scenario comparison](#Scenario-comparison)
- [Migration cases](#Migration-cases)
    - [Migrate resources from Funcraft to Serverless Devs](#Migrate-resources-from-Funcraft-to-Serverless-Devs)
    - [Migrate resources from fcli to Serverless Devs](#Migrate-resources-from-fcli-to-Serverless-Devs)
    

## Format comparison

|                                                 | FC component | funcraft | fcli |
| ----------------------------------------------- | ------------ | -------- | ---- |
| Dependent on resource description  files (YAML) | ✅            | ✅        | 🙅    |
| Command line mode                               | ✅            | 🙅        | ✅    |


## Feature comparison



|                              | FC component | funcraft | fcli                                       |
| ---------------------------- | ------------ | -------- | ------------------------------------------ |
| Application deployment       | ✅            | ✅        | ✅(Multiple commands need to be  executed.) |
| Application removal          | ✅            | 🙅️        | ✅(Multiple commands need to be  executed.) |
| build operation              | ✅            | ✅        | 🙅️                                          |
| Remote call                  | ✅            | ✅        | 🙅️                                          |
| Local call                   | ✅            | ✅        | 🙅️                                          |
| Log query                    | ✅            | 🙅        | 🙅️                                          |
| Metric query                 | ✅            | 🙅        | 🙅️                                          |
| nas operation                | ✅            | ✅        | 🙅️                                          |
| sync operation               | ✅            | 🙅        | 🙅️                                          |
| version operation            | ✅            | 🙅        | 🙅️                                          |
| alias operation              | ✅            | 🙅        | 🙅️                                          |
| provision operation          | ✅            | 🙅        | 🙅️                                          |
| ondemand operation           | ✅            | 🙅        | 🙅️                                          |
| layer operation              | ✅            | 🙅        | 🙅️                                          |
| proxied operation            | ✅            | 🙅        | 🙅️                                          |
| stress operation             | ✅            | 🙅        | 🙅️                                          |
| eval operation               | ✅            | 🙅        | 🙅️                                          |
| Remote debugging             | ✅            | 🙅        | 🙅️                                          |
| Function exception awareness | ✅            | 🙅        | 🙅️                                          |
| End-to-end deployment        | ✅            | 🙅        | 🙅️                                          |
| Multi-account management     | ✅            | 🙅️        | 🙅️                                          |
| API operations               | ✅            | 🙅️        | ✅️                                          |

## Scenario comparison

|                                                              | FC component | funcraft | fcli |
| ------------------------------------------------------------ | ------------ | -------- | ---- |
| Users may have a production  account and a test account, or a personal account and a company account.  Users need to switch between different accounts to perform different  operations. | ✅            | 🙅        | 🙅️    |
| Users need to perform different  operations before a project is deployed and after a project is deployed. For  example, users need to perform the build operation before a project is  deployed. After a project is deployed, users need to publish versions, upload  files, and configure canary release settings. | ✅            | 🙅        | 🙅️    |
| Users need to deploy end-to-end  projects with a few clicks. For example, users need to upload the frontend  code to Object Storage Service (OSS) and the backend code to Function  Compute, and deploy services, such as API Gateway and Alibaba Cloud Content Delivery  Network (CDN), at the same time. | ✅            | 🙅        | 🙅️    |
| Users need to debug the project  code in an on-premises environment. Before users debug the project code, a  connection must be established to a virtual private cloud (VPC). | ✅            | 🙅        | 🙅️    |
| When a project is deployed,  sensitive information must be obtained from environment variables or other  files. Users must obtain the values that are returned after the project is  deployed and use the values to configure input parameters. | ✅            | 🙅        | 🙅️    |
| Users need to perform atomic operations  that do not rely on the YAML file. The operations include viewing functions  and services, deleting a function or a service, and viewing versions. | ✅            | 🙅        | ✅    |

## Migration cases

### Migrate resources from Funcraft to Serverless Devs

- **[Recommended] YAML format conversion**: You can use this method to convert the resource description files that are supported by Funcarft to resource description files that are supported by Serverless Devs. For example, you can convert template.yaml files to s.yaml files. In the s.yaml files, the FC component is specified to use. For more information, see [fun2s commands](command/fun2s.md).
- **Resource information resynchronization**: You can use this method to synchronize cloud function resources to your on-premises devices. The cloud function resources include the function code and related configurations. The configurations (s.yaml files) are provided based on the Serverless Devs specifications, and the FC component is specified to use. For more information, see [sync commands](command/sync.md).

### Migrate resources from fcli to Serverless Devs

fcli can be integrated into your scripts to automatically manage functions. Now, you can call API operations of FunctionCompute to manage functions. For more information, see [API operations](command/api.md).
