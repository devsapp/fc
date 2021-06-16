"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFcNames = exports.genServiceStateID = exports.isAutoConfig = void 0;
function isAutoConfig(config) {
    return config === 'auto' || config === 'Auto';
}
exports.isAutoConfig = isAutoConfig;
function genServiceStateID(accountID, region, serviceName) {
    return accountID + "-" + region + "-" + serviceName;
}
exports.genServiceStateID = genServiceStateID;
function getFcNames(argsParse, inputsProps) {
    var _a, _b;
    if (argsParse === null || argsParse === void 0 ? void 0 : argsParse.region) {
        return {
            region: argsParse.region,
            serviceName: argsParse['service-name'],
            functionName: argsParse['function-name'],
        };
    }
    return {
        region: inputsProps === null || inputsProps === void 0 ? void 0 : inputsProps.region,
        serviceName: (_a = inputsProps === null || inputsProps === void 0 ? void 0 : inputsProps.service) === null || _a === void 0 ? void 0 : _a.name,
        functionName: (_b = inputsProps === null || inputsProps === void 0 ? void 0 : inputsProps.function) === null || _b === void 0 ? void 0 : _b.name,
    };
}
exports.getFcNames = getFcNames;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLFNBQWdCLFlBQVksQ0FBQyxNQUFXO0lBQ3RDLE9BQU8sTUFBTSxLQUFLLE1BQU0sSUFBSSxNQUFNLEtBQUssTUFBTSxDQUFDO0FBQ2hELENBQUM7QUFGRCxvQ0FFQztBQUVELFNBQWdCLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsV0FBVztJQUM5RCxPQUFVLFNBQVMsU0FBSSxNQUFNLFNBQUksV0FBYSxDQUFDO0FBQ2pELENBQUM7QUFGRCw4Q0FFQztBQUVELFNBQWdCLFVBQVUsQ0FBQyxTQUFTLEVBQUUsV0FBVzs7SUFDL0MsSUFBSSxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsTUFBTSxFQUFFO1FBQ3JCLE9BQU87WUFDTCxNQUFNLEVBQUUsU0FBUyxDQUFDLE1BQU07WUFDeEIsV0FBVyxFQUFFLFNBQVMsQ0FBQyxjQUFjLENBQUM7WUFDdEMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxlQUFlLENBQUM7U0FDekMsQ0FBQztLQUNIO0lBRUQsT0FBTztRQUNMLE1BQU0sRUFBRSxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsTUFBTTtRQUMzQixXQUFXLFFBQUUsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLE9BQU8sMENBQUUsSUFBSTtRQUN2QyxZQUFZLFFBQUUsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLFFBQVEsMENBQUUsSUFBSTtLQUMxQyxDQUFDO0FBQ0osQ0FBQztBQWRELGdDQWNDIn0=