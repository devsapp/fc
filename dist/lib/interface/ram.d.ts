export interface RoleConfig {
    name: string;
    policies?: Array<string | CustomPolicyConfig>;
}
export interface CustomPolicyConfig {
    name: string;
    description?: string;
    statement: PolicyStatementConfig[];
}
export interface PolicyStatementConfig {
    Effect: 'Allow' | 'Deny';
    Action: string[];
    Resource: string[] | string;
    Condition?: any;
}
