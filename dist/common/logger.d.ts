export default class ComponentLogger {
    static CONTENT: string;
    static setContent(content: any): void;
    static log(m: any, color?: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'whiteBright' | 'gray'): void;
    static info(m: any): void;
    static debug(m: any): void;
    static error(m: any): void;
    static warning(m: any): void;
    static success(m: any): void;
}
