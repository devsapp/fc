import { Logger } from '@serverless-devs/core';
import os from 'os';
import path from 'path';
import rimraf from 'rimraf';
import { spawnSync } from 'child_process';

export const CONTEXT = 'FC';

const logger = new Logger(CONTEXT);

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
}

export default logger;
