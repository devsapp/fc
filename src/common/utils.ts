import path from 'path';
import * as _ from 'lodash';
import { IInputs } from '../lib/interface/interface';

export function setCodeUri(inputs: IInputs) {
  const codeUri = _.get(inputs, 'props.function.codeUri');
  const spath = _.get(inputs, 'path.configPath');
  if (path.isAbsolute(codeUri)) return codeUri;
  const dirName = path.dirname(spath);
  const realCodeUri = path.join(dirName, codeUri);
  _.set(inputs, 'props.function.codeUri', realCodeUri);
}
