export const BUILD_HELP_INFO = [
  {
    header: 'Build',
    content: 'Build the dependencies.',
  },
  {
    header: 'Usage',
    content: [
      { example: '$ s exec -- build <option>' },
    ],
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'dockerfile',
        description: 'Specify the dockerfile path',
        alias: 'f',
        defaultOption: false,
        type: String,
      },
      {
        name: 'use-docker',
        description: 'Use docker container to build functions',
        alias: 'd',
        defaultOption: false,
        type: String,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: [
      {
        name: 'help',
        description: 'Build help for command',
        alias: 'h',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Examples with Yaml',
    content: [
      {
        example: '$ s build --use-docker',
      },
      {
        example: '$ s <ProjectName> build',
      },
      {
        example: '$ s build --use-docker ',
      },
      {
        example: '$ s exec -- build',
      },
    ],
  },
  {
    header: 'Others',
    content: "You can use the environment variable 'FC_DOCKER_VERSION' to modify fc docker to use the default version number. For example: export 'FC_DOCKER_VERSION=1.9.19'",
  },
];
