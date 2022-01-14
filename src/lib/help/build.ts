import { globalParams, globalDescribe } from './constant';

export const BUILD_HELP_INFO = [
  {
    header: 'Build',
    content: 'Build the dependencies',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/build.md',
  },
  {
    header: 'Usage',
    content: [
      { example: '$ s build <option>' },
    ],
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'dockerfile',
        description: '[Optional] Specify the dockerfile path',
        alias: 'f',
        defaultOption: false,
        type: String,
      },
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
        name: 'clean-useless-image',
        description: '[Optional] Remove invalid lower version images',
        defaultOption: false,
        type: Boolean,
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
    content: "You can override the default docker image version by setting up the 'FC_DOCKER_VERSION' environment variable\r\n" +
      "For example: export 'FC_DOCKER_VERSION=latest'\r\n" +
      'For all available versions, see https://github.com/aliyun/fc-docker or https://hub.docker.com/u/aliyunfc',
  },
];
