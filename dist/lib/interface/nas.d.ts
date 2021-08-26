export interface NasConfig {
    userId?: number;
    groupId?: number;
    mountPoints: MountPoint[];
}
export interface MountPoint {
    serverAddr?: string;
    nasDir: string;
    fcDir: string;
}
