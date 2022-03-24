import { lodash as _ } from '@serverless-devs/core';
import { FcInfoProps } from '../interface/component/fc-info';

export const infoPropsGenerator = (property: any) => {
  if (_.isEmpty(property)) {
    return null;
  }
  const res: FcInfoProps = {
    region: property?.region,
    serviceName: property?.service?.name,
  };
  if (!_.isNil(property?.function?.name)) {
    Object.assign(res, {
      functionName: property?.function?.name,
    });
  }
  if (!_.isEmpty(property?.triggers)) {
    Object.assign(res, {
      triggerNames: property?.triggers.map((t) => t.name),
    });
  }
  if (!_.isEmpty(property?.customDomains)) {
    Object.assign(res, {
      customDomains: property?.customDomains.map((t) => t.domainName),
    });
  }
  return res;
};
