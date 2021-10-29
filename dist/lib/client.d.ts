export default class Client {
    static fcClient: any;
    static setFcClient(region: string, credentials: any, access: string): Promise<any>;
}
