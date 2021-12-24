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
  help: boolean;
  /**
   * [Optional] Specify the template file
   * @alias t
   */
  template: string;
  /**
   * [Optional] Specify key alias
   * @alias a
   */
  access: string;
}

export const globalParams = {
  header: 'Global Options',
  optionList: [
    {
      name: 'debug',
      description: '[Optional] Output debug informations  ',
      type: String,
    },
    {
      name: 'help',
      description: '[Optional] Help for command',
      alias: 'h',
      type: Boolean,
    },
    {
      name: 'template',
      description: '[Optional] Specify the template file',
      alias: 't',
      type: String,
    },
    {
      name: 'access',
      description: '[Optional] Specify key alias',
      alias: 'a',
      type: String,
    },
  ],
};

/**
 * @pre_help
 * {"header":"Options Help","content":[{"desc":"Required: Required parameters in YAML mode and CLI mode","example":""},{"desc":"C-Required: Required parameters in CLI mode","example":""},{"desc":"Optional: Non mandatory parameter","example":""},{"desc":"✋ The difference between Yaml mode and CLI mode: http://ej6.net/yc","example":""}]}
 */
export interface GlobalDescribe {}

export const globalDescribe = {
  header: 'Options Help',
  content: [
    { desc: 'Required: Required parameters in YAML mode and CLI mode' },
    { desc: 'C-Required: Required parameters in CLI mode' },
    { desc: 'Y-Required: Required parameters in Yaml mode' },
    { desc: 'Optional: Non mandatory parameter' },
    { desc: '✋ The difference between Yaml mode and CLI mode: http://ej6.net/yc' },
  ],
};
