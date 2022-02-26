import * as _ from 'lodash';
import * as core from '@serverless-devs/core';
import * as yaml from 'js-yaml';
import Immutable from 'immutable';
import logger from '../../common/logger';
import { IInputs, IProperties } from '../interface/interface';
import fs from 'fs';

const COMMON_VARIABLE_TYPE_REG = new RegExp(/\$\{(.*)\}/, 'i');
export interface InfraConfig {
  name: string;
  template: string;
  roleArn?: string;
  region?: string;
  props?: any;
}

export default class InfraAsTemplate {
  /**
   * 使用部署服务的信息修改input，必须要在组件的handlerInputs方法前调用
   * 当指定了--env时触发环境的部署，并返回环境部署结果
   * @param inputs
   */
  static async modifyInputs(inputs: IInputs): Promise<any> {
    logger.debug(`Props is: ${JSON.stringify(inputs.props)}`);

    const parsedArgs: { [key: string]: any } = core.commandParse(inputs, {
      boolean: ['help'],
      string: ['env', 'overlays', 'patch-strategy'],
      alias: { help: 'h', env: 'e' },
    });
    const argsData: any = parsedArgs?.data || {};
    if (argsData?.help) {
      return {
        isHelp: true,
      };
    }

    // check the environment and using environment state to modify the inputs.
    const { env, overlays } = argsData;
    await logger.task('Checking', [
      {
        title: `Checking Environment ${env} exists `,
        id: 'Environment',
        enabled: () => !_.isEmpty(env),
        task: async () => {
          const infraComponentInputs = InfraAsTemplate.handlerInputs(inputs);
          infraComponentInputs.props = {};
          core.reportComponent('infrastructure-as-template', {
            methodName: 'deploy',
            uid: inputs?.credentials?.AccountID,
          });
          const infraComponentInst = await core.load('infrastructure-as-template');
          const result = await infraComponentInst.deploy(infraComponentInputs);
          const state = {
            name: result.name,
            region: result.region,
            roleArn: result.roleArn,
            template: result.template,
            props: result.props,
            outputs: result.status.output,
          };
          logger.debug(
            `Resolved environment state is:\n${JSON.stringify(state, null, '  ')}`,
          );
          // modifying the prop which associated with overlay args
          if (!_.isEmpty(overlays)) {
            let parsedOverlays: { [key: string]: any };
            try {
              parsedOverlays = JSON.parse(overlays);
            } catch (e) {
              logger.info('Overlays is not a json object, try to parsed as yaml file.');

              if (!fs.existsSync(overlays)) {
                throw new Error(`Overlays file ${overlays} does not exist, please check your command args.`);
              }

              try {
                parsedOverlays = yaml.load(fs.readFileSync(overlays), 'utf8');
              } catch (e) {
                throw new Error(`Overlays ${overlays} is not a vaild json or yaml object, please check your command args.`);
              }
            }

            const patchStrategy = argsData['patch-strategy'] || 'merge';
            inputs.props = InfraAsTemplate.patchProps(inputs.props, parsedOverlays, patchStrategy);
            logger.debug(`Props after patched is: ${JSON.stringify(inputs.props, null, 2)}`);
          }

          // modifying the prop which associated with environment
          inputs.props = InfraAsTemplate.modifyVariables(inputs.props, state) || {};

          // keep the service region consistent with environment
          if (inputs.props?.region !== state.region) {
            inputs.props.region = state.region;
          }
          logger.debug(`Props after modified is: ${JSON.stringify(inputs.props, null, '  ')}`);
        },
      },
    ]);
  }

  private static handlerInputs(inputs: IInputs): any {
    const project = inputs?.project;
    const props: IProperties = inputs?.props;
    const access: string = project?.access;
    const args: string = inputs?.args;
    const argsObj: any = inputs?.argsObj;
    const curPath: any = inputs?.path;
    const projectName: string = project?.projectName;
    const appName: string = inputs?.appName;

    return {
      project: {
        component: 'infrastructure-as-template',
        projectName: `${projectName}-infrastructure-as-template-project`,
        access,
      },
      appName,
      props,
      args,
      argsObj,
      path: curPath,
    };
  }

  private static patchProps(baseProps: any, patchProps: any, patchStrategy: string) {
    logger.debug(`patching base: ${JSON.stringify(baseProps, null, 2)}\n, patch: ${JSON.stringify(patchProps, null, 2)}\n, patchStrategy: ${patchStrategy}`);
    if (patchStrategy === 'replace') {
      return { ...baseProps, ...patchProps };
    } else if (patchStrategy === 'merge') {
      return Immutable.mergeDeep(baseProps, patchProps);
    } else {
      throw new Error(`Unknown patch strategy: ${patchStrategy}, must be 'replace' or 'merge'`);
    }
  }

  private static walkThroughPatch(baseObj: any, lookup: any, parentStr = '') {
    if (Object.prototype.toString.call(baseObj) === '[object Object]') {
      Object.keys(baseObj).forEach((key) => {
        if (Object.prototype.toString.call(baseObj[key]) === '[object Object]') {
          const newParent = parentStr === '' ? `${parentStr}${key}` : `${parentStr}.${key}`;
          InfraAsTemplate.walkThroughPatch(baseObj[key], lookup, newParent);
        } else if (Object.prototype.toString.call(baseObj[key]) === '[object Array]') {
          const path = parentStr === '' ? `${parentStr}${key}` : `${parentStr}.${key}`;
          if (Object.prototype.toString.call(lookup[path]) === '[object Array]') {
            let merged = Immutable.Set(lookup[path]);
            baseObj[key].forEach((base: any) => {
              logger.debug(`base: ${JSON.stringify(base, null, 2)}`);
              merged = merged.add(base);
            });
            baseObj[key] = Array.from(merged);
          }
        } else {
          const path = parentStr === '' ? `${parentStr}${key}` : `${parentStr}.${key}`;
          if (lookup[path]) {
            baseObj[key] = lookup[path];
          }
        }
      });
    }
  }

  private static modifyVariables(variables: any, lookup: any) {
    const _walkResult: any = {};
    InfraAsTemplate.lookupVariables(lookup, '', _walkResult);
    logger.debug(`lookup result is: ${JSON.stringify(_walkResult, null, 2)}`);
    InfraAsTemplate.walkThroughVariables(variables, _walkResult);
    return variables;
  }

  private static lookupVariables(value: any, parentStr = '', result: any) {
    if (Object.prototype.toString.call(value) === '[object Object]') {
      Object.keys(value).forEach((key) => {
        const path = parentStr === '' ? `${parentStr}${key}` : `${parentStr}.${key}`;
        const objValue = value[key];
        result[path] = objValue;
        InfraAsTemplate.lookupVariables(objValue, `${path}`, result);
      });
    } else if (Object.prototype.toString.call(value) === '[object Array]') {
      value.forEach((_arrValue: any, i: number) => {
        const path = `${parentStr}[${i}]`;
        result[path] = _arrValue;
        InfraAsTemplate.lookupVariables(_arrValue, `${path}`, result);
      });
    }
  }

  private static walkThroughVariables(variables: any, lookup: any) {
    for (const k in variables) {
      if (typeof variables[k] === 'object' && variables[k] !== null) InfraAsTemplate.walkThroughVariables(variables[k], lookup);
      else {
        const _objValue = variables[k];
        variables[k] = InfraAsTemplate.findAndModify(_objValue, lookup);
      }
    }
  }

  private static findAndModify(objValue: any, lookup: any) {
    if (Object.prototype.toString.call(objValue) === '[object String]') {
      const regResult = objValue.match(COMMON_VARIABLE_TYPE_REG);
      if (regResult) {
        logger.debug(`matchResult is: ${JSON.stringify(regResult, null, '  ')}`);
        const matchResult = regResult[1]; // get match result like projectName.key.variable
        const realValue = _.startsWith(matchResult, 'environment.') ? lookup[matchResult.replace('environment.', '')] : objValue;
        logger.debug(`realValue is: ${JSON.stringify(realValue, null, '  ')}`);
        if (_.isEmpty(realValue)) {
          throw new Error(`Cannot find the matched result of variable ${matchResult}, you can check the variable syntax in s.yaml`);
        }
        return Object.prototype.toString.call(realValue) === '[object String]' ? objValue.replace(COMMON_VARIABLE_TYPE_REG, realValue) : realValue;
      }
    }
    return objValue;
  }
}
