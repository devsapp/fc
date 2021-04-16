"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceOfOssTriggerConfig = exports.instanceOfLogTriggerConfig = exports.instanceOfMnsTriggerConfig = exports.instanceOfHttpTriggerConfig = exports.instanceOfTimerTriggerConfig = exports.instanceOfCdnTriggerConfig = void 0;
function instanceOfCdnTriggerConfig(data) {
    return 'eventName' in data && 'eventVersion' in data && 'notes' in data && 'filter' in data;
}
exports.instanceOfCdnTriggerConfig = instanceOfCdnTriggerConfig;
function instanceOfTimerTriggerConfig(data) {
    return 'cronExpression' in data && 'enable' in data && 'payload' in data;
}
exports.instanceOfTimerTriggerConfig = instanceOfTimerTriggerConfig;
function instanceOfHttpTriggerConfig(data) {
    return 'authType' in data && 'methods' in data;
}
exports.instanceOfHttpTriggerConfig = instanceOfHttpTriggerConfig;
function instanceOfMnsTriggerConfig(data) {
    return 'topicName' in data;
}
exports.instanceOfMnsTriggerConfig = instanceOfMnsTriggerConfig;
function instanceOfLogTriggerConfig(data) {
    return 'jobConfig' in data && 'logConfig' in data && 'sourceConfig' in data && 'enable' in data;
}
exports.instanceOfLogTriggerConfig = instanceOfLogTriggerConfig;
function instanceOfOssTriggerConfig(data) {
    return 'bucketName' in data && 'events' in data && 'filter' in data;
}
exports.instanceOfOssTriggerConfig = instanceOfOssTriggerConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvaW50ZXJmYWNlL2ZjL3RyaWdnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBaUJBLFNBQWdCLDBCQUEwQixDQUFDLElBQVM7SUFDbEQsT0FBTyxXQUFXLElBQUksSUFBSSxJQUFJLGNBQWMsSUFBSSxJQUFJLElBQUksT0FBTyxJQUFJLElBQUksSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDO0FBQzlGLENBQUM7QUFGRCxnRUFFQztBQVlELFNBQWdCLDRCQUE0QixDQUFDLElBQVM7SUFDcEQsT0FBTyxnQkFBZ0IsSUFBSSxJQUFJLElBQUksUUFBUSxJQUFJLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDO0FBQzNFLENBQUM7QUFGRCxvRUFFQztBQU9ELFNBQWdCLDJCQUEyQixDQUFDLElBQVM7SUFDbkQsT0FBTyxVQUFVLElBQUksSUFBSSxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUM7QUFDakQsQ0FBQztBQUZELGtFQUVDO0FBVUQsU0FBZ0IsMEJBQTBCLENBQUMsSUFBUztJQUNsRCxPQUFPLFdBQVcsSUFBSSxJQUFJLENBQUM7QUFDN0IsQ0FBQztBQUZELGdFQUVDO0FBWUQsU0FBZ0IsMEJBQTBCLENBQUMsSUFBUztJQUNsRCxPQUFPLFdBQVcsSUFBSSxJQUFJLElBQUksV0FBVyxJQUFJLElBQUksSUFBSSxjQUFjLElBQUksSUFBSSxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUM7QUFDbEcsQ0FBQztBQUZELGdFQUVDO0FBZ0JELFNBQWdCLDBCQUEwQixDQUFDLElBQVM7SUFDbEQsT0FBTyxZQUFZLElBQUksSUFBSSxJQUFJLFFBQVEsSUFBSSxJQUFJLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQztBQUN0RSxDQUFDO0FBRkQsZ0VBRUMifQ==