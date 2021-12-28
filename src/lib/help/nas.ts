import { globalParams, globalDescribe } from '../../common/entity';

export const NAS_HELP_INFO = [
  {
    header: 'Nas',
    content: 'Upload and download files for NAS service',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/nas.md',
  },
  {
    header: 'Usage',
    content: '$ s nas <sub-command> <options>',
  },
  {
    header: 'SubCommand List',
    content: [
      {
        desc: 'init',
        example: 'Init nas resource; help command [s nas init -h]',
      },
      {
        desc: 'download',
        example: 'Download resources; help command [s nas download -h]',
      },
      {
        desc: 'upload',
        example: 'Upload resources; help command [s nas upload -h]',
      },
      {
        desc: 'command',
        example: 'Execute relevant instructions; help command [s nas command -h]',
      },
    ],
  },
];

const UPLOADHELP = [
  {
    header: 'Nas Upload',
    content: 'Upload resources',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/nas.md',
  },
  {
    header: 'Usage',
    content: [
      { example: '$ s nas upload <options> <local> <remote>' },
    ],
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'recursive',
        description: '[Optional] Iterate to copy folder content',
        alias: 'r',
        defaultOption: false,
        type: Boolean,
      },
      {
        name: 'override',
        description: '[Optional] Override existing files',
        alias: 'o',
        defaultOption: false,
        type: Boolean,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s nas upload /home/usr/demo.file /mnt/auto/'],
  },
];

const DOWNLOADHELP = [
  {
    header: 'Nas Download',
    content: 'Download resources',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/nas.md',
  },
  {
    header: 'Usage',
    content: [
      { example: '$ s nas download <options> <remote> <local>' },
    ],
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'no-unzip',
        description: '[Optional] Do not unzip the folder',
        defaultOption: false,
        type: Boolean,
      },
      {
        name: 'override',
        description: '[Optional] Override existing files',
        alias: 'o',
        defaultOption: false,
        type: Boolean,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s nas download /mnt/auto /home/usr/demo.file'],
  },
];

const COMMANDHELP = [
  {
    header: 'Nas Command',
    content: 'Operation instruction',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/nas.md',
  },
  {
    header: 'Usage',
    content: [
      { example: '$ s nas command <command>' },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples',
    content: [
      { example: '$ s nas command ls -al /mnt/auto' },
      { example: '$ s nas command mkdir /mnt/auto/demoDir' },
      { example: '$ s nas command rm -rf /mnt/auto/demoDir' },
    ],
  },
];

const INITHELP = [
  {
    header: 'Nas Init',
    content: 'Init nas resources',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/nas.md',
  },
  {
    header: 'Usage',
    content: [
      { example: '$ s nas init' },
    ],
  },
  { ...globalParams },
  {
    header: 'Examples with Yaml',
    content: [
      {
        example: '$ s nas init',
      },
    ],
  },
];

export const NAS_SUB_COMMAND_HELP_INFO = {
  download: DOWNLOADHELP,
  upload: UPLOADHELP,
  command: COMMANDHELP,
  init: INITHELP,
};
