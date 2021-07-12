import { IInputs } from '../lib/interface/interface';
import { componentMethodCaller } from '../lib/utils';


export async function setup(inputs: IInputs): Promise<any> {
  return await componentMethodCaller(inputs, 'devsapp/fc-proxied-invoke', 'setup');
}

export async function invoke(inputs: IInputs): Promise<any> {
  return await componentMethodCaller(inputs, 'devsapp/fc-proxied-invoke', 'invoke');
}

export async function clean(inputs: IInputs): Promise<any> {
  return await componentMethodCaller(inputs, 'devsapp/fc-proxied-invoke', 'clean');
}

