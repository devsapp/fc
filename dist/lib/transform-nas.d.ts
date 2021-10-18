import { VpcConfig } from './interface/vpc';
import { NasConfig } from './interface/nas';
export default class GenerateNasProps {
    static generateNasProps(props: any, access: any, credentials: any): Promise<any>;
    static toNasAbility(region: string, vpcConfig: VpcConfig, serviceName: string, role: string, nasConfig: NasConfig): Promise<any>;
}
