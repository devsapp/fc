"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHttpFunction = exports.getFcNames = exports.genServiceStateID = exports.isAutoConfig = void 0;
var lodash_1 = __importDefault(require("lodash"));
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
function isHttpFunction(props) {
    var triggers = props === null || props === void 0 ? void 0 : props.triggers;
    if (lodash_1.default.isEmpty(triggers)) {
        return false;
    }
    for (var _i = 0, triggers_1 = triggers; _i < triggers_1.length; _i++) {
        var trigger = triggers_1[_i];
        if (trigger.type === 'http') {
            return true;
        }
    }
    return false;
}
exports.isHttpFunction = isHttpFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLGtEQUF1QjtBQUV2QixTQUFnQixZQUFZLENBQUMsTUFBVztJQUN0QyxPQUFPLE1BQU0sS0FBSyxNQUFNLElBQUksTUFBTSxLQUFLLE1BQU0sQ0FBQztBQUNoRCxDQUFDO0FBRkQsb0NBRUM7QUFFRCxTQUFnQixpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFdBQVc7SUFDOUQsT0FBVSxTQUFTLFNBQUksTUFBTSxTQUFJLFdBQWEsQ0FBQztBQUNqRCxDQUFDO0FBRkQsOENBRUM7QUFFRCxTQUFnQixVQUFVLENBQUMsU0FBUyxFQUFFLFdBQVc7O0lBQy9DLElBQUksU0FBUyxhQUFULFNBQVMsdUJBQVQsU0FBUyxDQUFFLE1BQU0sRUFBRTtRQUNyQixPQUFPO1lBQ0wsTUFBTSxFQUFFLFNBQVMsQ0FBQyxNQUFNO1lBQ3hCLFdBQVcsRUFBRSxTQUFTLENBQUMsY0FBYyxDQUFDO1lBQ3RDLFlBQVksRUFBRSxTQUFTLENBQUMsZUFBZSxDQUFDO1NBQ3pDLENBQUM7S0FDSDtJQUVELE9BQU87UUFDTCxNQUFNLEVBQUUsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLE1BQU07UUFDM0IsV0FBVyxRQUFFLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxPQUFPLDBDQUFFLElBQUk7UUFDdkMsWUFBWSxRQUFFLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxRQUFRLDBDQUFFLElBQUk7S0FDMUMsQ0FBQztBQUNKLENBQUM7QUFkRCxnQ0FjQztBQUVELFNBQWdCLGNBQWMsQ0FBQyxLQUFrQjtJQUMvQyxJQUFNLFFBQVEsR0FBb0IsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLFFBQVEsQ0FBQztJQUNsRCxJQUFJLGdCQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQUUsT0FBTyxLQUFLLENBQUM7S0FBRTtJQUMxQyxLQUFzQixVQUFRLEVBQVIscUJBQVEsRUFBUixzQkFBUSxFQUFSLElBQVEsRUFBRTtRQUEzQixJQUFNLE9BQU8saUJBQUE7UUFDaEIsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFDO1NBQUU7S0FDOUM7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFQRCx3Q0FPQyJ9