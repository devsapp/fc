export default class Client {
    static fcClient: any;
    static setFcClient(region: string, credentials: any): Promise<any>;
    static getFcEndpoint(): Promise<string | undefined>;
}
