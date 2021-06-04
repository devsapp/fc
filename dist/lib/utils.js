"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genServiceStateID = exports.isAutoConfig = void 0;
function isAutoConfig(config) {
    return config === 'auto' || config === 'Auto';
}
exports.isAutoConfig = isAutoConfig;
function genServiceStateID(accountID, region, serviceName) {
    return accountID + "-" + region + "-" + serviceName;
}
exports.genServiceStateID = genServiceStateID;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLFNBQWdCLFlBQVksQ0FBQyxNQUFXO0lBQ3RDLE9BQU8sTUFBTSxLQUFLLE1BQU0sSUFBSSxNQUFNLEtBQUssTUFBTSxDQUFDO0FBQ2hELENBQUM7QUFGRCxvQ0FFQztBQUVELFNBQWdCLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsV0FBVztJQUM5RCxPQUFVLFNBQVMsU0FBSSxNQUFNLFNBQUksV0FBYSxDQUFDO0FBQ2pELENBQUM7QUFGRCw4Q0FFQyJ9