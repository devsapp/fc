export default class Client {
    static fcClient: any;
    static setFcClient(region: string, credentials: any): Promise<any>;
    static getFcEndpoint(): Promise<any>;
    static extractAccountId(endpoint: string): string;
    static extractRegion(endpoint: string): string;
    static extractProtocol(endpoint: string): string;
}
