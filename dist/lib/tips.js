"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showNextTip = exports.showNasNextTips = exports.showDeployNextTips = exports.showLocalNextTips = exports.showBuildNextTips = void 0;
var core_1 = require("@serverless-devs/core");
function showBuildNextTips() {
    var eventInvokeTip = 's local invoke';
    var httpInvokeTip = 's local start';
    var deployTip = 's deploy';
    core_1.Logger.log("\nTips for next step\n======================\n* Invoke Event Function: " + eventInvokeTip + "\n* Invoke Http Function: " + httpInvokeTip + "\n* Deploy Resources: " + deployTip, 'yellow');
}
exports.showBuildNextTips = showBuildNextTips;
function showLocalNextTips() {
    var deployTip = 's deploy';
    core_1.Logger.log("\nTips for next step\n======================\n* Deploy Resources: " + deployTip, 'yellow');
}
exports.showLocalNextTips = showLocalNextTips;
function showDeployNextTips() {
    var invokeTip = 's invoke';
    var infoTip = 's info';
    var removeServiceTip = 's remove service';
    var removeFunctionTip = 's remove function';
    var removeTriggerTip = 's remove trigger';
    var removeDomainTip = 's remove domain';
    var metrics = 's metrics';
    var logs = 's logs';
    core_1.Logger.log("\nTips for next step\n======================\n* Display information of the deployed resource: " + infoTip + "\n* Display metrics: " + metrics + "\n* Display logs: " + logs + "\n* Invoke remote function: " + invokeTip + "\n* Remove Service: " + removeServiceTip + "\n* Remove Function: " + removeFunctionTip + "\n* Remove Trigger: " + removeTriggerTip + "\n* Remove CustomDomain: " + removeDomainTip, 'yellow');
}
exports.showDeployNextTips = showDeployNextTips;
function showNasNextTips() {
    var invokeTip = 's invoke';
    core_1.Logger.log("\nTips for next step\n======================\n* Invoke remote function: " + invokeTip, 'yellow');
}
exports.showNasNextTips = showNasNextTips;
function showNextTip(args, showMethod) {
    var parsedArgs = core_1.commandParse({ args: args }, {
        boolean: ['help'],
        alias: { help: 'h' }
    });
    var argsData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
    if (!(argsData === null || argsData === void 0 ? void 0 : argsData.help)) {
        showMethod();
    }
}
exports.showNextTip = showNextTip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlwcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdGlwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4Q0FBNkQ7QUFFN0QsU0FBZ0IsaUJBQWlCO0lBQy9CLElBQU0sY0FBYyxHQUFHLGdCQUFnQixDQUFDO0lBQ3hDLElBQU0sYUFBYSxHQUFHLGVBQWUsQ0FBQztJQUN0QyxJQUFNLFNBQVMsR0FBRyxVQUFVLENBQUM7SUFFN0IsYUFBTSxDQUFDLEdBQUcsQ0FBQyw0RUFFYyxjQUFjLGtDQUNmLGFBQWEsOEJBQ2pCLFNBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBVkQsOENBVUM7QUFFRCxTQUFnQixpQkFBaUI7SUFDL0IsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDO0lBQzdCLGFBQU0sQ0FBQyxHQUFHLENBQUMsdUVBRVMsU0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzdDLENBQUM7QUFMRCw4Q0FLQztBQUVELFNBQWdCLGtCQUFrQjtJQUNoQyxJQUFNLFNBQVMsR0FBRyxVQUFVLENBQUM7SUFDN0IsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDO0lBQ3pCLElBQU0sZ0JBQWdCLEdBQUcsa0JBQWtCLENBQUM7SUFDNUMsSUFBTSxpQkFBaUIsR0FBRyxtQkFBbUIsQ0FBQztJQUM5QyxJQUFNLGdCQUFnQixHQUFHLGtCQUFrQixDQUFDO0lBQzVDLElBQU0sZUFBZSxHQUFHLGlCQUFpQixDQUFDO0lBQzFDLElBQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQztJQUM1QixJQUFNLElBQUksR0FBRyxRQUFRLENBQUM7SUFFdEIsYUFBTSxDQUFDLEdBQUcsQ0FBQyxtR0FFcUMsT0FBTyw2QkFDcEMsT0FBTywwQkFDVixJQUFJLG9DQUNNLFNBQVMsNEJBQ2pCLGdCQUFnQiw2QkFDZixpQkFBaUIsNEJBQ2xCLGdCQUFnQixpQ0FDWCxlQUFpQixFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3RELENBQUM7QUFwQkQsZ0RBb0JDO0FBRUQsU0FBZ0IsZUFBZTtJQUM3QixJQUFNLFNBQVMsR0FBRyxVQUFVLENBQUM7SUFFN0IsYUFBTSxDQUFDLEdBQUcsQ0FBQyw2RUFFZSxTQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQU5ELDBDQU1DO0FBRUQsU0FBZ0IsV0FBVyxDQUFDLElBQVksRUFBRSxVQUFvQjtJQUM1RCxJQUFNLFVBQVUsR0FBeUIsbUJBQVksQ0FBQyxFQUFFLElBQUksTUFBQSxFQUFFLEVBQUU7UUFDOUQsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ2pCLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUU7S0FBRSxDQUFDLENBQUM7SUFDMUIsSUFBTSxRQUFRLEdBQVEsQ0FBQSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsSUFBSSxLQUFJLEVBQUUsQ0FBQztJQUM3QyxJQUFJLEVBQUMsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLElBQUksQ0FBQSxFQUFFO1FBQ25CLFVBQVUsRUFBRSxDQUFDO0tBQ2Q7QUFDSCxDQUFDO0FBUkQsa0NBUUMifQ==