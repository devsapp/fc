"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var FcProxiedInvoke = /** @class */ (function () {
    function FcProxiedInvoke(inputs) {
        this.userInputs = inputs;
    }
    FcProxiedInvoke.prototype.makeInputs = function (methodName) {
        var inputs = lodash_1.default.cloneDeep(this.userInputs);
        inputs.command = methodName;
        return inputs;
    };
    return FcProxiedInvoke;
}());
exports.default = FcProxiedInvoke;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMtcHJveGllZC1pbnZva2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NvbXBvbmVudC9mYy1wcm94aWVkLWludm9rZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLGtEQUF1QjtBQUV2QjtJQUdFLHlCQUFZLE1BQWU7UUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7SUFDM0IsQ0FBQztJQUVELG9DQUFVLEdBQVYsVUFBVyxVQUFrQjtRQUMzQixJQUFNLE1BQU0sR0FBWSxnQkFBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckQsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7UUFDNUIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQVpELElBWUMifQ==