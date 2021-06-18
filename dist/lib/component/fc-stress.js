"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FcStress = /** @class */ (function () {
    function FcStress(access, region, stressOpts, httpTypeOpts, eventTypeOpts, payloadOpts) {
        this.access = access;
        this.region = region;
        this.stressOpts = stressOpts;
        this.payloadOpts = payloadOpts;
        this.eventTypeOpts = eventTypeOpts;
        this.httpTypeOpts = httpTypeOpts;
    }
    FcStress.prototype.isEventFunctionType = function () {
        var _a;
        return ((_a = this.stressOpts) === null || _a === void 0 ? void 0 : _a.functionType) === 'event';
    };
    FcStress.prototype.isHttpFunctionType = function () {
        var _a;
        return ((_a = this.stressOpts) === null || _a === void 0 ? void 0 : _a.functionType) === 'http';
    };
    FcStress.prototype.makeStartArgs = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        var args = "--region " + this.region + " --access " + this.access + " --function-type " + ((_a = this.stressOpts) === null || _a === void 0 ? void 0 : _a.functionType);
        if ((_b = this.stressOpts) === null || _b === void 0 ? void 0 : _b.numUser) {
            args += " --num-user " + ((_c = this.stressOpts) === null || _c === void 0 ? void 0 : _c.numUser);
        }
        if ((_d = this.stressOpts) === null || _d === void 0 ? void 0 : _d.spawnRate) {
            args += " --spawn-rate " + ((_e = this.stressOpts) === null || _e === void 0 ? void 0 : _e.spawnRate);
        }
        if ((_f = this.stressOpts) === null || _f === void 0 ? void 0 : _f.runningTime) {
            args += " --run-time " + ((_g = this.stressOpts) === null || _g === void 0 ? void 0 : _g.spawnRate);
        }
        if (this.isEventFunctionType()) {
            args += " --service-name " + ((_h = this.eventTypeOpts) === null || _h === void 0 ? void 0 : _h.serviceName) + " --function-name " + ((_j = this.eventTypeOpts) === null || _j === void 0 ? void 0 : _j.functionName);
            if ((_k = this.eventTypeOpts) === null || _k === void 0 ? void 0 : _k.qualifier) {
                args += " --qualifier " + ((_l = this.eventTypeOpts) === null || _l === void 0 ? void 0 : _l.qualifier);
            }
        }
        else if (this.isHttpFunctionType()) {
            args += " --url " + ((_m = this.httpTypeOpts) === null || _m === void 0 ? void 0 : _m.url) + " --method " + ((_o = this.httpTypeOpts) === null || _o === void 0 ? void 0 : _o.method);
        }
        if ((_p = this.payloadOpts) === null || _p === void 0 ? void 0 : _p.payload) {
            args += " --payload " + JSON.stringify((_q = this.payloadOpts) === null || _q === void 0 ? void 0 : _q.payload);
        }
        if ((_r = this.payloadOpts) === null || _r === void 0 ? void 0 : _r.payloadFile) {
            args += " --payload-file " + ((_s = this.payloadOpts) === null || _s === void 0 ? void 0 : _s.payloadFile);
        }
        return args;
    };
    FcStress.prototype.makeCleanArgs = function (assumeYes) {
        var args = "--region " + this.region + " --access " + this.access;
        if (assumeYes) {
            args += ' -y';
        }
        return args;
    };
    return FcStress;
}());
exports.default = FcStress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMtc3RyZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnQvZmMtc3RyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0E7SUFRRSxrQkFBWSxNQUFjLEVBQUUsTUFBYyxFQUFFLFVBQXlCLEVBQUUsWUFBNkIsRUFBRSxhQUErQixFQUFFLFdBQTJCO1FBQ2hLLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ25DLENBQUM7SUFHTyxzQ0FBbUIsR0FBM0I7O1FBQ0UsT0FBTyxPQUFBLElBQUksQ0FBQyxVQUFVLDBDQUFFLFlBQVksTUFBSyxPQUFPLENBQUM7SUFDbkQsQ0FBQztJQUNPLHFDQUFrQixHQUExQjs7UUFDRSxPQUFPLE9BQUEsSUFBSSxDQUFDLFVBQVUsMENBQUUsWUFBWSxNQUFLLE1BQU0sQ0FBQztJQUNsRCxDQUFDO0lBRUQsZ0NBQWEsR0FBYjs7UUFDRSxJQUFJLElBQUksR0FBRyxjQUFZLElBQUksQ0FBQyxNQUFNLGtCQUFhLElBQUksQ0FBQyxNQUFNLGdDQUFvQixJQUFJLENBQUMsVUFBVSwwQ0FBRSxZQUFZLENBQUUsQ0FBQztRQUM5RyxVQUFJLElBQUksQ0FBQyxVQUFVLDBDQUFFLE9BQU8sRUFBRTtZQUM1QixJQUFJLElBQUksd0JBQWUsSUFBSSxDQUFDLFVBQVUsMENBQUUsT0FBTyxDQUFFLENBQUM7U0FDbkQ7UUFDRCxVQUFJLElBQUksQ0FBQyxVQUFVLDBDQUFFLFNBQVMsRUFBRTtZQUM5QixJQUFJLElBQUksMEJBQWlCLElBQUksQ0FBQyxVQUFVLDBDQUFFLFNBQVMsQ0FBRSxDQUFDO1NBQ3ZEO1FBQ0QsVUFBSSxJQUFJLENBQUMsVUFBVSwwQ0FBRSxXQUFXLEVBQUU7WUFDaEMsSUFBSSxJQUFJLHdCQUFlLElBQUksQ0FBQyxVQUFVLDBDQUFFLFNBQVMsQ0FBRSxDQUFDO1NBQ3JEO1FBQ0QsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRTtZQUM5QixJQUFJLElBQUksNEJBQW1CLElBQUksQ0FBQyxhQUFhLDBDQUFFLFdBQVcsaUNBQW9CLElBQUksQ0FBQyxhQUFhLDBDQUFFLFlBQVksQ0FBRSxDQUFDO1lBQ2pILFVBQUksSUFBSSxDQUFDLGFBQWEsMENBQUUsU0FBUyxFQUFFO2dCQUNqQyxJQUFJLElBQUkseUJBQWdCLElBQUksQ0FBQyxhQUFhLDBDQUFFLFNBQVMsQ0FBRSxDQUFDO2FBQ3pEO1NBQ0Y7YUFBTSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUFFO1lBQ3BDLElBQUksSUFBSSxtQkFBVSxJQUFJLENBQUMsWUFBWSwwQ0FBRSxHQUFHLDBCQUFhLElBQUksQ0FBQyxZQUFZLDBDQUFFLE1BQU0sQ0FBRSxDQUFDO1NBQ2xGO1FBRUQsVUFBSSxJQUFJLENBQUMsV0FBVywwQ0FBRSxPQUFPLEVBQUU7WUFDN0IsSUFBSSxJQUFJLGdCQUFjLElBQUksQ0FBQyxTQUFTLE9BQUMsSUFBSSxDQUFDLFdBQVcsMENBQUUsT0FBTyxDQUFHLENBQUM7U0FDbkU7UUFDRCxVQUFJLElBQUksQ0FBQyxXQUFXLDBDQUFFLFdBQVcsRUFBRTtZQUNqQyxJQUFJLElBQUksNEJBQW1CLElBQUksQ0FBQyxXQUFXLDBDQUFFLFdBQVcsQ0FBRSxDQUFDO1NBQzVEO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsZ0NBQWEsR0FBYixVQUFjLFNBQW1CO1FBQy9CLElBQUksSUFBSSxHQUFHLGNBQVksSUFBSSxDQUFDLE1BQU0sa0JBQWEsSUFBSSxDQUFDLE1BQVEsQ0FBQztRQUM3RCxJQUFJLFNBQVMsRUFBRTtZQUNiLElBQUksSUFBSSxLQUFLLENBQUM7U0FDZjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNILGVBQUM7QUFBRCxDQUFDLEFBN0RELElBNkRDIn0=