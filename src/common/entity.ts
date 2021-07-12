
/**
 * Global Options
 */
export interface GlobalParams {
  /**
   * Display help for command.
   * @alias h
   */
  help: string;
  /**
   * Output debug informations.
   * @alias d
   */
  debug: string;
}

/**
 * s proxied <SubCommand> <options>\n
 * @pre_help
 * {"header":"Proxied","content":"Local invoke via proxied service."}
 * @pre_help
 * {"header": "Detail", "content": "Local invoke with real net traffic via proxied service."}
 * @pre_help
 * {"header": "SubCommand List", "content": [{"name": "setup", "summary": "Setup the preconditions."},{"name": "invoke", "summary": "Invoke local function."}, {"name": "clean", "summary": "Clean the related resource and environment.."}]}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Example1","content": [{"desc":"Help for setup.","example":"$ s proxied setup -h"},{"desc":"Help for invoke.","example":"$ s proxied invoke -h"},{"desc":"Help for clean.","example":"$ s proxied clean -h"}]}
 */
export interface ProxiedInputsArgs {
}

/**
 * s proxied setup <options>\n
 * @pre_help
 * {"header":"Setup","content":"Setup Operation."}
 * @pre_help
 * {"header": "Detail", "content": "Setup for local invoke via proxied service."}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Example","content": [{"desc":"Just setup.","example":"$ s proxied setup"},{"desc":"Setup with debug.","example":"$ s proxied setup --config vscode --debug-port 3000"}]}
 */
export interface ProxiedSetupInputsArgs {
  /**
   *  Select which IDE to use when debugging and output related debug config tips for the IDE. Options：'vscode'.
   *  @alias c
   */
  config: string;
  /**
   *  Specify the sandboxed container starting in debug mode, and exposing this port on localhost.
   *  @alias d
   */
  'debug-port': string;
  /**
   *   The temp directory mounted to /tmp , default to './.s/tmp/invoke/serviceName/functionName/'
   */
  'tmp-dir': string;
  /**
   *   Additional parameters that will be passed to the debugger.
   */
  'debug-args': string;
  /**
   *   The path of the debugger on the host.
   */
  'debugger-path': string;
}

/**
 * s proxied invoke <options>\n
 * @pre_help
 * {"header":"Invoke","content":"Invoke local function."}
 * @pre_help
 * {"header": "Detail", "content": "Invoke local function in the container.Need setup first"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Example","content": [{"desc":"Just invoke.","example":"$ s proxied invoke"},{"desc":"Invoke with event.","example":"$ s proxied invoke --event string"}]}
 */
export interface ProxiedInvokeInputsArgs {
  /**
   *  Event data (strings) passed to the function during invocation (default: "").Http function format refers to [https://github.com/devsapp/fc-remote-invoke#特别说明]
   *  @alias e
   */
  event: string;
  /**
   *  Event funtion: A file containing event data passed to the function during invoke. Http function: A file containing http request options sent to https strigger. Format refers to [https://github.com/devsapp/fc-remote-invoke#特别说明]
   *  @alias f
   */
  'event-file': string;
  /**
   *   Read from standard input, to support script pipeline.Http function format refers to [https://github.com/devsapp/fc-remote-invoke#特别说明]
   *   @alias s
   */
  'event-stdin': string;
}

/**
 * s proxied clean <options>\n
 * @pre_help
 * {"header":"Clean","content":"Clean the related resource and environment."}
 * @pre_help
 * {"header": "Detail", "content": "Clean the helper resource and the local container."}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Example","content": [{"desc":"Just clean.","example":"$ s proxied clean"}]}
 */
export interface ProxiedCleanInputsArgs {
}

