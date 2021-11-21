/**
 * Global Options
 */
export interface GlobalParams {
  /**
   * [Optional] Output debug informations  
   */
  debug: string;
  /**
   * [Optional] Help for command
   * @alias h
   */
  help: string;
  /**
   * [Optional] Specify key alias
   * @alias a
   */
  access: string;
}

/**
 * @pre_help
 * {"header":"Options Help","content":[{"desc":"Required: Required parameters in YAML mode and CLI mode","example":""},{"desc":"C-Required: Required parameters in CLI mode","example":""},{"desc":"Optional: Non mandatory parameter","example":""},{"desc":"✋ The difference between Yaml mode and CLI mode: https://github.com/Serverless-Devs/Serverless-Devs/blob/docs/docs/zh/yaml_and_cli.md","example":""}]}
 */
export interface GlobalDescribe {}
