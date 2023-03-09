import { globalParams, globalDescribe } from './constant';

export const BUILD_HELP_INFO = [
  {
    header: 'Build',
    content: 'Build the dependencies',
  },
  {
    header: 'Document',
    content: 'https://serverless.help/t/build',
  },
  {
    header: 'Usage',
    content: [{ example: '$ s build <option>' }],
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'use-docker',
        description: '[Optional] Use docker container to build functions',
        alias: 'd',
        defaultOption: false,
        type: Boolean,
      },
      {
        name: 'use-buildkit',
        description: '[Optional] Use buildkit to build functions',
        defaultOption: false,
        type: Boolean,
      },
      {
        name: 'use-sandbox',
        description: '[Optional] Enter the sandbox container of the corresponding runtime',
        defaultOption: false,
        type: Boolean,
      },
      {
        name: 'dockerfile',
        description: '[Optional] Specify the dockerfile path.Use the use docker or use buildkit to build the image of the custom container runtime',
        alias: 'f',
        defaultOption: false,
        type: String,
      },
      {
        name: 'context',
        description: '[Optional] custom-container Context for constructing the image',
        defaultOption: false,
        type: String,
      },
      {
        name: 'custom-env',
        description: '[Optional] Custom environment variables injected during build',
        defaultOption: false,
        type: String,
      },
      {
        name: 'custom-args',
        description: '[Optional] Additional parameters when using the default build behavior, such as specifying a pypi or NPM source',
        defaultOption: false,
        type: String,
      },
      {
        name: 'command',
        description: '[Optional] Using custom commands',
        defaultOption: false,
        type: String,
      },
      {
        name: 'script-file',
        description: '[Optional] Using custom shell scripts',
        defaultOption: false,
        type: String,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s build', '$ s build --use-docker'],
  },
  {
    header: 'Others',
    content:
      "You can override the default docker image version by setting up the 'FC_DOCKER_VERSION' environment variable\r\n" +
      "For example: export 'FC_DOCKER_VERSION=latest'\r\n" +
      'For all available versions, see https://github.com/aliyun/fc-docker or https://hub.docker.com/u/aliyunfc',
  },
];
