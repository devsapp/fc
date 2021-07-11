"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@serverless-devs/core");
var ComponentLogger = /** @class */ (function () {
    function ComponentLogger() {
    }
    ComponentLogger.setContent = function (content) {
        ComponentLogger.CONTENT = content;
    };
    ComponentLogger.log = function (m, color) {
        core_1.Logger.log(m, color);
    };
    ComponentLogger.info = function (m) {
        core_1.Logger.info(ComponentLogger.CONTENT, m);
    };
    ComponentLogger.debug = function (m) {
        core_1.Logger.debug(ComponentLogger.CONTENT, m);
    };
    ComponentLogger.error = function (m) {
        core_1.Logger.error(ComponentLogger.CONTENT, m);
    };
    ComponentLogger.warning = function (m) {
        core_1.Logger.warn(ComponentLogger.CONTENT, m);
    };
    ComponentLogger.success = function (m) {
        core_1.Logger.log(m, 'green');
    };
    ComponentLogger.CONTENT = '';
    return ComponentLogger;
}());
exports.default = ComponentLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1vbi9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw4Q0FBK0M7QUFFL0M7SUFBQTtJQTRCQSxDQUFDO0lBMUJRLDBCQUFVLEdBQWpCLFVBQWtCLE9BQU87UUFDdkIsZUFBZSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDcEMsQ0FBQztJQUNNLG1CQUFHLEdBQVYsVUFBVyxDQUFDLEVBQUUsS0FBNkc7UUFDekgsYUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUNNLG9CQUFJLEdBQVgsVUFBWSxDQUFDO1FBQ1gsYUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTSxxQkFBSyxHQUFaLFVBQWEsQ0FBQztRQUNaLGFBQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU0scUJBQUssR0FBWixVQUFhLENBQUM7UUFDWixhQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLHVCQUFPLEdBQWQsVUFBZSxDQUFDO1FBQ2QsYUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFHTSx1QkFBTyxHQUFkLFVBQWUsQ0FBQztRQUNkLGFBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUExQk0sdUJBQU8sR0FBRyxFQUFFLENBQUM7SUEyQnRCLHNCQUFDO0NBQUEsQUE1QkQsSUE0QkM7a0JBNUJvQixlQUFlIn0=