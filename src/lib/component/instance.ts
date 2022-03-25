import * as core from '@serverless-devs/core';
import logger from '../../common/logger';
import Client from '../client';
import * as HELP from '../help/instance';
import { getCredentials } from '../utils';
import { ICredentials } from '../interface/profile';
import _ from 'lodash';

const INSTANCE_COMMAND_HELP_KEY = {
  list: HELP.INSTANCE_LIST,
  exec: HELP.INSTANCE_EXEC,
};

const idleTimeout = Number.parseInt(process.env.FC_INSTANCE_EXEC_TIMEOUT || '600', 10);


export default class Instance {
  static async handlerInputs(inputs) {
    logger.debug(`inputs.props: ${JSON.stringify(inputs.props)}`);

    const parsedArgs: {[key: string]: any} = core.commandParse(inputs, {
      boolean: ['help', 'stdin', 'tty'],
      string: ['region', 'service-name', 'function-name', 'qualifier'],
      alias: { help: 'h', stdin: 'i', tty: 't' },
    });
    logger.debug(`Instance parsedArgs: \n${JSON.stringify(parsedArgs, null, 2)}`);
    const {
      data: parsedData = {},
      rawData = [],
    } = parsedArgs;
    const subCommands = parsedData._ || [];
    if (!subCommands.length) {
      core.help(HELP.INSTANCE);
      return { help: true };
    }

    const subCommand = subCommands[0];
    logger.debug(`version subCommand: ${subCommand}`);

    const fcCore = await core.loadComponent('devsapp/fc-core');

    if (!Object.keys(INSTANCE_COMMAND_HELP_KEY).includes(subCommand)) {
      core.help(HELP.INSTANCE);
      throw new fcCore.CatchableError(`Does not support ${subCommand} command`);
    }

    if (parsedData.help) {
      core.help(INSTANCE_COMMAND_HELP_KEY[subCommand]);
      return { help: true, subCommand };
    }

    const props = inputs.props || {};

    const endProps = {
      rawData,
      region: parsedData.region || props.region,
      serviceName: parsedData['service-name'] || props.service?.name,
      functionName: parsedData['function-name'] || props.function?.name,
      qualifier: parsedData.qualifier,
      instanceId: '',
      stdin: parsedData.i || parsedData.stdin,
      tty: parsedData.t || parsedData.tty,
    };

    const {
      region,
      serviceName,
      functionName,
    } = endProps;
    if (_.isEmpty(region) || !_.isString(region)) {
      throw new fcCore.CatchableError('No region is found, you can specify the parameter with --region');
    }
    if (_.isEmpty(serviceName) || !_.isString(serviceName)) {
      throw new fcCore.CatchableError('No serviceName is found, you can specify the parameter with --service-name');
    }
    if (_.isEmpty(functionName) || !_.isString(functionName)) {
      throw new fcCore.CatchableError('No functionName is found, you can specify the parameter with --function-name');
    }
    if (subCommand === 'exec') {
      const command = this.handlerCommand(rawData);
      if (command[0] === 'exec') {
        command.shift(); // 清除执行指令 exec
      }


      // 获取实例ID，eg:
      //   s instance exec c-****-1658cb3903eb4644b0ee ls
      //   s instance exec -i c-****-1658cb3903eb4644b0ee ls
      //   s instance exec -it c-****-1658cb3903eb4644b0ee ls
      //   s instance exec --tty c-****-1658cb3903eb4644b0ee ls
      //   s instance exec -i --tty c-****-1658cb3903eb4644b0ee ls
      let instanceId;
      if (command[0] && !command[0].startsWith('-')) {
        instanceId = command.shift();
      } else if (command[1] && !command[1].startsWith('-')) {
        instanceId = command.splice(1, 1)[0];
      } else if (command[2] && !command[2].startsWith('-')) {
        instanceId = command.splice(2, 1)[0];
      } else {
        const command = `s cli fc instance list --region ${region} --service-name ${serviceName} --function-name ${functionName}`;
        throw new fcCore.CatchableError('No instanceId is found', `
· You can get the instance list through '$ ${command}'
· You can get help by executing 's cli fc instance exec -h'`);
      }
      endProps.instanceId = instanceId;

      endProps.rawData = command;
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

  private static handlerCommand(rawData) {
    let nextFilter = false;
    const command = [];
    const EXEC_PARAM_BOOL = ['-it', '-t', '-i', '--tty', '--stdin', '--debug'];
    const EXEC_PARAM_OTHER = ['--region', '--service-name', '--function-name', '--qualifier', '--instance-id', '-a', '--access', '-t', '--template'];
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

  async list(props) {
    const {
      serviceName,
      functionName,
      qualifier,
    } = props;
    return (await Client.fcClient.listInstances(serviceName, functionName, qualifier)).data;
  }

  async exec(props) {
    logger.info(`props.rawData: ${JSON.stringify(props.rawData)}`);
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
    if (_.isEmpty(rawData)) {
      let paramCommend = ` --region ${region} --service-name ${serviceName} --function-name ${functionName} --instance-id ${instanceId}`;
      if (!_.isEmpty(qualifier)) {
        paramCommend += ` --qualifier ${qualifier}`;
      }

      const recommend = `s cli fc instance exec ${paramCommend} ${tty ? '-t ' : ''}ls`;
      const stdinCommend = `s cli fc instance exec ${paramCommend} -it`;
      const fcCore = await core.loadComponent('devsapp/fc-core');
      throw new fcCore.CatchableError(`Did not find the instruction to execute, you can try to execute:\n  1. ${recommend}\n  2. ${stdinCommend}`);
    }

    const options = {
      idleTimeout,
      stdin: 'false',
      tty: tty ? 'true' : 'false',
      stdout: 'true',
      stderr: 'true',
      command: rawData || [],
    };
    logger.debug(`command-exec command:\n${JSON.stringify(options, null, 2)}`);
    logger.debug('----------------------------------------');

    // @ts-ignore
    await new Promise(async (resolve) => {
      const hooks = {
        onStdout: (msg) => logger.log(`${msg}`),
        onStderr: (msg) => logger.log(`${msg}`, 'red'),
        onClose: () => {
          logger.log('\nws close');
          resolve('');
        },
        onError: (e) => {
          logger.log(`${e.message}`);
          resolve('');
        },
      };

      await Client.fcClient.instanceExec(
        serviceName,
        functionName,
        qualifier,
        instanceId,
        options,
        hooks,
      );
    });
  }

  private async stdinExec({
    serviceName,
    functionName,
    qualifier,
    instanceId,
    rawData,
    tty,
  }) {
    const options = {
      idleTimeout,
      stdin: 'true',
      tty: tty ? 'true' : 'false',
      stdout: 'true',
      stderr: 'true',
      command: _.isEmpty(rawData) ? ['/bin/bash'] : rawData,
    };

    logger.info('Enter `exit` to open the link on the server side to exit (recommended), or execute `control + ]` to force the client to exit');
    // eslint-disable-next-line no-async-promise-executor
    await new Promise(async (resolve) => {
      const hooks = {
        onStdout: (msg) => process.stdout.write(msg.toString()),
        onStderr: (msg) => process.stderr.write(msg.toString()),
        onClose: () => process.exit(0),
        onError: (e) => {
          process.stderr.write(e.toString());
          process.stdin.setRawMode(false);
          resolve(e);
        },
      };
      logger.debug(`command-exec command:\n${JSON.stringify(options, null, 2)}`);
      logger.debug('----------------------------------------');

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
          // control + ] 退出
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
}
