export interface HttpTypeOption {
    url?: string;
    method?: string;
    path?: string;
    query?: string;
    body?: any;
    qualifier?: string;
}
export interface EventTypeOption {
    serviceName: string;
    functionName: string;
    qualifier?: string;
    payload?: any;
}
export interface PayloadOption {
    payload?: string;
    payloadFile?: string;
}
