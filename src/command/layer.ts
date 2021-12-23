export function publish() {}
export function list() {}
export function detail() {}
export function versions() {}
// export function deleteVersion() {}
// export function deleteLayer() {}


/**
 * s layer <sub-command> <options>
 * @pre_help
 * {"header":"Layer","content":"Resource layer operation"}
 * @after_help
 * {"header":"SubCommand List","content":[{"desc":"publish","example":"New layer version; help command [s layer publish -h]"},{"desc":"list","example":"Get layer list; help command [s layer list -h]"},{"desc":"detail","example":"Get layer versionConfig; help command [s layer detail -h]"},{"desc":"versions","example":"Get layer versions; help command [s layer verisons -h]"}]}
 */
export interface LayerInputsArgs {}

/**
 * s layer publish <options>
 * @pre_help
 * {"header":"Layer publish","content":"New layer version"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/command/layer.md"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @after_help
 * {"ref":"GlobalDescribe"}
 * @example
 * {"header":"Examples with Yaml","content":["$ s layer publish --layer-name testName --code ./src"]}
 * @example
 * {"header":"Examples with CLI","content":["$ s cli fc layer publish --region cn-hangzhou --layer-name testName --code ./src --compatible-runtime nodejs12,nodejs10,python3"]}
 */
export interface LayerPublishInputsArgs {
  /**
   * [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1
   */
  region: string;
  /**
   * [Optional] Specify the layer name parameter
   */
  'layer-name'?: string;
  /**
   * [Optional] Specify the description parameter
   */
  'description'?: string;
  /**
   * [Required] Specify the code parameter
   */
  'code': string;
  /**
   * [Optional] Specify the compatibleRuntime parameter
   */
  'compatible-runtime'?: string;
}

/**
 * s layer list <options>
 * @pre_help
 * {"header":"Layer list","content":"Get layer list"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/command/layer.md"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @after_help
 * {"ref":"GlobalDescribe"}
 * @example
 * {"header":"Examples with Yaml","content":["$ s layer list"]}
 * @example
 * {"header":"Examples with CLI","content":["$ s cli fc layer list --region cn-hangzhou --prefix test"]}
 */
export interface LayerListInputsArgs {
  /**
   * [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1
   */
  region: string;
  /**
   * [Optional] Specify the prefix parameter
   */
  'prefix': string;
  /**
   * [Optional] Table format output
   */
  'table': boolean;
}

/**
 * s layer detail <options>
 * @pre_help
 * {"header":"Layer versionConfig","content":"Get layer version config"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/command/layer.md"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @after_help
 * {"ref":"GlobalDescribe"}
 * @example
 * {"header":"Examples with Yaml","content":["$ s layer detail --layer-name layerName --version-id 1"]}
 * @example
 * {"header":"Examples with CLI","content":["$ s cli fc layer detail --region cn-hangzhou --layer-name layerName --version-id 1"]}
 */
export interface LayerVersionConfigInputsArgs {
  /**
   * [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1
   */
  region: string;
  /**
   * [C-Required] Specify the layer name parameter
   */
  'layer-name': string;
  /**
   * [C-Required] Specify the version parameter
   */
  'version-id': number;
}

/**
 * s layer deleteVersion <options>\n
 * @pre_help
 * {"header":"Layer deleteVersion","content":"Delete layer version"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header":"Examples with Yaml","content":["$ s layer deleteVersion --layer-name name --version-id 1"]}
 * @example
 * {"header":"Examples with CLI","content":["$ s cli fc layer deleteVersion --region cn-hangzhou --layer-name name --version-id 1"]}
 */
export interface LayerDeleteVerisonInputsArgs {
  /**
   *  Specify the region of alicloud
   */
  region: string;
  /**
   *  Specify the layer name parameter
   */
  'layer-name': string;
  /**
   *  Specify the version parameter
   */
  'version-id': number;
}

/**
 * s layer versions <options>
 * @pre_help
 * {"header":"Layer versions","content":"Get layer versions"}
 * @pre_help
 * {"header":"Document","content":"https://github.com/devsapp/fc/blob/main/docs/command/layer.md"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @after_help
 * {"ref":"GlobalDescribe"}
 * @example
 * {"header":"Examples with Yaml","content":["$ s layer versions --layer-name layerName"]}
 * @example
 * {"header":"Examples with CLI","content":["$ s cli fc layer versions --region cn-hangzhou --layer-name layerName"]}
 */
export interface LayerVersionsInputsArgs {
  /**
   * [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1
   */
  region: string;
  /**
   * [Required] Specify the layer name parameter
   */
  'layer-name': string;
  /**
   * [Optional] Table format output
   */
  'table': boolean;
}

/**
 * s layer deleteLayer\n
 * @pre_help
 * {"header":"Layer deleteLayer","content":"Delete layer all version"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header":"Examples with Yaml","content":["$ s layer deleteLayer --layer-name name"]}
 * @example
 * {"header":"Examples with CLI","content":["$ s cli fc layer deleteLayer --region cn-hangzhou --layer-name name"]}
 */
export interface LayerDeleteLayerInputsArgs {
  /**
   *  Specify the region of alicloud
   */
  region: string;
  /**
   *  Specify the layer name parameter
   */
  'layer-name': string;
  /**
   *  Assume that the answer to any question which would be asked is yes
   * @alias y
   */
  'assume-yes': boolean;
}
