export default class Remove {
    static handlerInputs(inputs: any): {
        isHelp: boolean;
        subCommand: any;
        errorMessage?: undefined;
        planType?: undefined;
    } | {
        errorMessage: string;
        isHelp?: undefined;
        subCommand?: undefined;
        planType?: undefined;
    } | {
        planType: any;
        subCommand: any;
        isHelp?: undefined;
        errorMessage?: undefined;
    };
    static showPlan(planRs: any, planType: any): void;
    private static showDeployItem;
}
