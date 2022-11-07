import { lodash as _ } from '@serverless-devs/core';
import logger from '../common/logger';

export function tipLayerArn(region: string, layers: string[], access) {
  const accessStr = access ? `-a ${access}` : '';

  _.forEach(layers, (layer) => {
    if (_.includes(layer, '#')) {
      try {
        const [, layerName, version] = layer.split('#');
        logger.warn(`The arnV2 layer is recommended. This can be done using the 's cli fc layer detail --region ${region} --layer-name ${layerName} --version-id ${version} ${accessStr}' query`);
      } catch (e) { /* 不影响主流程运行 */ }
    }
  });
}
