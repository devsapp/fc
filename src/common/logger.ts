import { Logger } from '@serverless-devs/core';
import os from 'os';
import path from 'path';
import rimraf from 'rimraf';
import { spawnSync } from 'child_process';

export const CONTEXT = 'FC';

const logger = new Logger(CONTEXT);

function getCommand() {
  try {
    const serverless_devs_temp_argv = JSON.parse(process.env['serverless_devs_temp_argv']);
    const command = serverless_devs_temp_argv.slice(2);
    return command ? `s ${command.join(' ')}` : undefined;
  } catch (error) {}
}

if (typeof logger.task !== 'function') {
  const cachePath = path.join(os.homedir(), '.s', 'cache');
  rimraf.sync(path.join(cachePath));
  try {
    spawnSync('npm install @serverless-devs/s -g', { shell: true });
  } catch (error) {
    try {
      spawnSync('yarn global add @serverless-devs/s', { shell: true });
    } catch (error) {
      logger.warn(
        "It is detected that your version is an old version, you can run 'npm install @serverless-devs/s -g' to update",
      );
    }
  }
  const msg = getCommand() ? `Please retry again with '${getCommand()}'.` : 'Please retry again.';
  logger.log(`\nWARNING\n======================\n* Oops! some problem happen, ${msg}`, 'yellow');
  process.exit(1);
}

export default logger;
