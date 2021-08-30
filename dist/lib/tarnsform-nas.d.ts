import { VpcConfig } from './interface/vpc';
export declare function toNasAbility(region: string, vpcConfig: VpcConfig, serviceName: string, role: string, { userId, groupId, mountPointDomain, nasDir }: {
    userId: any;
    groupId: any;
    mountPointDomain: any;
    nasDir: any;
}, args?: string): Promise<any>;
export default function toNas(props: any, nonOptionsArgs: any, args: any, access: any, commandName: any, credentials: any): Promise<any>;
