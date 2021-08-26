import { NasConfig } from '../nas';
import { LogConfig } from '../sls';
import { VpcConfig } from '../vpc';
import { RoleConfig } from '../ram';
export interface ServiceConfig {
    name: string;
    description?: string;
    internetAccess?: boolean;
    logConfig?: LogConfig | 'auto' | 'Auto';
    role?: string | RoleConfig;
    vpcConfig?: VpcConfig | 'auto' | 'Auto';
    nasConfig?: NasConfig | 'atuo' | 'Auto';
}
