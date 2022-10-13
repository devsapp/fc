import { globalParams, globalDescribe, regionDescribe, showTableDescribe } from './constant';

const layerName = {
  name: 'layer-name',
  description: '[Required] Specify the layer name parameter',
  type: String,
};

export const LAYER = [
  {
    header: 'Layer',
    content: 'Resource layer operation',
  },
  {
    header: 'Usage',
    content: '$ s layer <sub-command> <options>',
  },
  {
    header: 'SubCommand List',
    content: [
      { desc: 'publish', example: 'New layer version; help command [s layer publish -h]' },
      { desc: 'list', example: 'Get layer list; help command [s layer list -h]' },
      { desc: 'detail', example: 'Get layer versionConfig; help command [s layer detail -h]' },
      { desc: 'versions', example: 'Get layer versions; help command [s layer verisons -h]' },
      { desc: 'download', example: 'Download layer version code; help command [s layer download -h]' },
      { desc: 'acl [beta]', example: 'Set layer to public; help command [s layer acl -h]' },
    ],
  },
];

export const LAYER_PUBLISH = [
  {
    header: 'Layer publish',
    content: 'New layer version',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/layer.md',
  },
  {
    header: 'Usage',
    content: '$ s layer publish <options>',
  },
  {
    header: 'Options',
    optionList: [
      regionDescribe,
      layerName,
      {
        name: 'code',
        description: '[Required] Specify the code parameter',
        type: String,
      },
      {
        name: 'compatible-runtime',
        description: '[Optional] Specify the compatibleRuntime parameter',
        type: String,
      },
      {
        name: 'description',
        description: '[Optional] Specify the description parameter',
        type: String,
      },
      {
        name: 'ossBucket',
        description: '[Optional] OSS bucket for storing code',
        type: String,
      },
      {
        name: 'ossKey',
        description: '[Optional] Full path to store code',
        type: String,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s layer publish --layer-name testName --code ./src'],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc layer publish --region cn-hangzhou --layer-name testName --code ./src --compatible-runtime nodejs12,nodejs10,python3',
    ],
  },
];

export const LAYER_LIST = [
  {
    header: 'Layer list',
    content: 'Get layer list',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/layer.md',
  },
  {
    header: 'Usage',
    content: '$ s layer list <options>',
  },
  {
    header: 'Options',
    optionList: [
      regionDescribe,
      {
        name: 'prefix',
        description: '[Optional] Specify the prefix parameter',
        type: String,
      },
      {
        name: 'public',
        description: '[Optional] Show the public layer of the individual',
        type: Boolean,
      },
      {
        name: 'official',
        description: '[Optional] Display the official public layer',
        type: Boolean,
      },
      showTableDescribe,
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s layer list'],
  },
  {
    header: 'Examples with CLI',
    content: ['$ s cli fc layer list --region cn-hangzhou --prefix test'],
  },
];

export const LAYER_DETAIL = [
  {
    header: 'Layer versionConfig',
    content: 'Get layer version config',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/layer.md',
  },
  {
    header: 'Usage',
    content: '$ s layer detail <options>',
  },
  {
    header: 'Options',
    optionList: [
      regionDescribe,
      layerName,
      {
        name: 'version-id',
        description: '[Required] Specify the version parameter',
        type: Number,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s layer detail --layer-name layerName --version-id 1'],
  },
  {
    header: 'Examples with CLI',
    content: ['$ s cli fc layer detail --region cn-hangzhou --layer-name layerName --version-id 1'],
  },
];

export const LAYER_DOWNLOAD = [
  {
    header: 'Download layer',
    content: 'Download layer version code',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/layer.md',
  },
  {
    header: 'Usage',
    content: '$ s layer download <options>',
  },
  {
    header: 'Options',
    optionList: [
      regionDescribe,
      {
        name: 'layer-name',
        description: '[Optional] Specify the layer name parameter',
        type: String,
      },
      {
        name: 'version-id',
        description: '[Optional] Specify the version parameter',
        type: Number,
      },
      {
        name: 'arn',
        description: '[Optional] Specify the layer arn parameter',
        type: String,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s layer download --layer-name layerName --version-id 1'],
  },
  {
    header: 'Examples with CLI',
    content: ['$ s cli fc layer download --region cn-hangzhou --layer-name layerName --version-id 1'],
  },
];

export const LAYER_VERSIONS = [
  {
    header: 'Layer versions',
    content: 'Get layer versions',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/layer.md',
  },
  {
    header: 'Usage',
    content: '$ s layer versions <options>',
  },
  {
    header: 'Options',
    optionList: [regionDescribe, layerName, showTableDescribe],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: ['$ s layer versions --layer-name layerName'],
  },
  {
    header: 'Examples with CLI',
    content: ['$ s cli fc layer versions --region cn-hangzhou --layer-name layerName'],
  },
];

export const LAYER_ACL = [
  {
    header: 'Layer acl',
    content: 'Get layer acl',
  },
  {
    header: 'Document',
    content: 'https://github.com/devsapp/fc/blob/main/docs/zh/command/layer.md',
  },
  {
    header: 'Usage',
    content: '$ s layer acl <options>',
  },
  {
    header: 'Options',
    optionList: [
      regionDescribe,
      layerName,
      {
        name: 'public',
        description: '[Optional] Set layer to public',
        type: Boolean,
      },
    ],
  },
  { ...globalParams },
  { ...globalDescribe },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s layer acl --layer-name layerName --public',
      '$ s layer acl --layer-name layerName',
    ],
  },
  {
    header: 'Examples with CLI',
    content: ['$ s cli fc layer acl --region cn-hangzhou --layer-name layerName'],
  },
];
