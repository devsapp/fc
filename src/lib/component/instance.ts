import * as core from '@serverless-devs/core';
import logger from '../../common/logger';
import Client from '../client';
import { getCredentials } from '../utils';
import { ICredentials } from '../interface/profile';
import _ from 'lodash';

const INSTANCE_COMMAND = ['list', 'exec'];
const INSTANCE_COMMAND_HELP_KEY: {[key: string]: string} = {
  list: 'InstanceListInputsArgs',
  exec: 'InstanceExecInputsArgs',
};


export default class Instance {
  static async handlerInputs(inputs) {
    logger.debug(`inputs.props: ${JSON.stringify(inputs.props)}`);

    const parsedArgs: {[key: string]: any} = core.commandParse(inputs, {
      boolean: ['help'],
      string: ['region', 'service-name', 'function-name'],
      alias: { help: 'h' },
    });
    logger.debug(`Instance parsedArgs: \n${JSON.stringify(parsedArgs, null, 2)}`);
    const {
      data: parsedData = {},
      rawData = [],
    } = parsedArgs;
    const subCommands = parsedData._ || [];
    if (!subCommands.length) {
      return { help: true, helpKey: 'InstanceInputsArgs' };
    }

    const subCommand = subCommands[0];
    logger.debug(`version subCommand: ${subCommand}`);
    if (!INSTANCE_COMMAND.includes(subCommand)) {
      return {
        help: true,
        helpKey: 'InstanceInputsArgs',
        errorMessage: `Does not support ${subCommand} command`,
      };
    }

    if (parsedData.help) {
      return { help: true, subCommand, helpKey: INSTANCE_COMMAND_HELP_KEY[subCommand] };
    }

    const props = inputs.props || {};

    const endProps = {
      rawData,
      region: parsedData.region || props.region,
      serviceName: parsedData['service-name'] || props.service?.name,
      functionName: parsedData['function-name'] || props.function?.name,
      qualifier: parsedData.qualifier,
      instanceId: parsedData['instance-id'],
      stdin: parsedData.i || parsedData.stdin,
      tty: parsedData.t || parsedData.tty,
    };

    const {
      region,
      serviceName,
      functionName,
    } = endProps;
    if (_.isEmpty(region) || !_.isString(region)) {
      throw new Error('No region is found, you can specify the parameter with --region');
    }
    if (_.isEmpty(serviceName) || !_.isString(serviceName)) {
      throw new Error('No serviceName is found, you can specify the parameter with --service-name');
    }
    if (_.isEmpty(functionName) || !_.isString(functionName)) {
      throw new Error('No functionName is found, you can specify the parameter with --function-name');
    }
    if (subCommand === 'exec' && (_.isEmpty(endProps.instanceId) || !_.isString(endProps.instanceId))) {
      const command = `s cli fc instance list --region ${region} --service-name ${serviceName} --function-name ${functionName}`;
      throw new Error(`No instanceId is found, you can specify the parameter with --instance-id.\nYou can get the instance list through ${command}`);
    }

    const credentials: ICredentials = await getCredentials(inputs.credentials, inputs?.project?.access);
    logger.debug(`handler inputs props: ${JSON.stringify(endProps)}`);
    await Client.setFcClient(endProps.region, inputs.credentials, inputs?.project?.access);

    return {
      credentials,
      subCommand,
      props: endProps,
      table: parsedData.table,
    };
  }

  async list(props) {
    const {
      serviceName,
      functionName,
      qualifier,
    } = props;
    return (await Client.fcClient.listInstances(serviceName, functionName, qualifier)).data;
  }

  async exec(props) {
    console.log(props.rawData);
    if (props.stdin) {
      return await this.stdinExec(props);
    }
    return await this.commandExec(props);
  }

  private async commandExec({
    region,
    serviceName,
    functionName,
    qualifier,
    instanceId,
    rawData,
    tty,
  }) {
    const command = this.handlerCommand(rawData);

    if (_.isEmpty(command)) {
      let paramCommend = ` --region ${region} --service-name ${serviceName} --function-name ${functionName} --instance-id ${instanceId}`;
      if (!_.isEmpty(qualifier)) {
        paramCommend += ` --qualifier ${qualifier}`;
      }

      const recommend = `s cli fc instance exec ${paramCommend} ${tty ? '-t ' : ''}ls`;
      const stdinCommend = `s cli fc instance exec ${paramCommend} -it`;
      throw new Error(`Did not find the instruction to execute, you can try to execute:\n  1. ${recommend}\n  2. ${stdinCommend}`);
    }

    const options = {
      stdin: 'false',
      tty: tty ? 'true' : 'false',
      stdout: 'true',
      stderr: 'true',
      command: command || [],
    };
    logger.log(`command-exec command:\n${JSON.stringify(options, null, 2)}`);
    logger.log('----------------------------------------');

    const hooks = {
      onStdout: (msg) => logger.log(`${msg}`),
      onStderr: (msg) => logger.log(`${msg}`, 'red'),
      onClose: () => logger.log('\nws close'),
      onError: (e) => logger.log(`${e.message}`),
    };

    await Client.fcClient.instanceExec(
      serviceName,
      functionName,
      qualifier,
      instanceId,
      options,
      hooks,
    );
  }

  private async stdinExec({
    serviceName,
    functionName,
    qualifier,
    instanceId,
    rawData,
    tty,
  }) {
    const command = this.handlerCommand(rawData);
    const options = {
      stdin: 'true',
      tty: tty ? 'true' : 'false',
      stdout: 'true',
      stderr: 'true',
      command: _.isEmpty(command) ? ['/bin/bash'] : command,
    };
    // eslint-disable-next-line no-async-promise-executor
    await new Promise(async (_resolve, reject) => {
      const hooks = {
        onStdout: (msg) => process.stdout.write(msg.toString()),
        onStderr: (msg) => process.stderr.write(msg.toString()),
        onClose: () => process.exit(0),
        onError: (e) => {
          process.stdin.setRawMode(false);
          reject(e.message);
        },
      };
      logger.log(`command-exec command:\n${JSON.stringify(options, null, 2)}`);
      console.log('----------------------------------------');

      const conn = await Client.fcClient.instanceExec(
        serviceName,
        functionName,
        qualifier,
        instanceId,
        options,
        hooks,
      );

      process.stdin.setEncoding('ascii');
      process.stdin.setRawMode(true);
      process.stdin.on('data', (chunk: string) => {
        const arr = [];
        for (const ch of chunk) {
          if (ch.charCodeAt(0) === 29) {
            conn?.close();
            process.exit(0);
          }
          arr.push(ch.charCodeAt(0));
        }
        conn.sendMessage(new Uint8Array(arr));
      });
    });
  }

  private handlerCommand(rawData) {
    if (rawData[0] === 'exec') {
      rawData.shift(); // 清除执行指令 exec
    }
    let nextFilter = false;
    const command = [];
    const EXEC_PARAM_BOOL = ['-it', '-t', '-i', '--tty', '--stdin'];
    const EXEC_PARAM_OTHER = ['--service-name', '--function-name', '--qualifier', '--instance-id'];
    // 如果是 exec 的 string 类型参数，则抛出本次输入和下次的输入
    // 如果是 exec 的 bool 类型的参数，则抛出本次输入
    // 余下的就认为是用户需要输入的指令
    for (const raw of rawData) {
      if (EXEC_PARAM_OTHER.includes(raw)) {
        nextFilter = true;
        continue;
      } else if (EXEC_PARAM_BOOL.includes(raw) || nextFilter) {
        nextFilter = false;
        continue;
      }
      command.push(raw);
    }
    return command;
  }
}
