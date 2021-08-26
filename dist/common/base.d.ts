export default class BaseComponent {
    protected inputs: any;
    protected client: any;
    name: string;
    private basePath;
    private docPath;
    constructor(inputs: any);
    __getBasePath(): string;
    private getEntityByName;
    private getEntityHelpInfoByName;
    protected help(name: any): void;
}
