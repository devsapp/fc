export interface ICredentials {
    AccountID: string;
    AccessKeyID: string;
    AccessKeySecret: string;
    SecurityToken?: string;
}
export interface ServerlessProfile {
    project: {
        component?: string;
        access: string;
        projectName: string;
    };
    appName: string;
}
