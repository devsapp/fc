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
    FcStress.prototype.isEventFunctionType = function () {
        var _a;
        return ((_a = this.stressOpts) === null || _a === void 0 ? void 0 : _a.functionType) === 'event';
    };
    FcStress.prototype.isHttpFunctionType = function () {
        var _a;
        return ((_a = this.stressOpts) === null || _a === void 0 ? void 0 : _a.functionType) === 'http';
    };
    return FcStress;
}());
exports.default = FcStress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMtc3RyZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnQvZmMtc3RyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0E7SUFRRSxrQkFBWSxNQUFjLEVBQUUsTUFBYyxFQUFFLFVBQXlCLEVBQUUsWUFBNkIsRUFBRSxhQUErQixFQUFFLFdBQTJCO1FBQ2hLLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ25DLENBQUM7SUFFRCxnQ0FBYSxHQUFiOztRQUNFLElBQUksSUFBSSxHQUFHLGNBQVksSUFBSSxDQUFDLE1BQU0sa0JBQWEsSUFBSSxDQUFDLE1BQU0sZ0NBQW9CLElBQUksQ0FBQyxVQUFVLDBDQUFFLFlBQVksQ0FBRSxDQUFDO1FBQzlHLFVBQUksSUFBSSxDQUFDLFVBQVUsMENBQUUsT0FBTyxFQUFFO1lBQzVCLElBQUksSUFBSSx3QkFBZSxJQUFJLENBQUMsVUFBVSwwQ0FBRSxPQUFPLENBQUUsQ0FBQztTQUNuRDtRQUNELFVBQUksSUFBSSxDQUFDLFVBQVUsMENBQUUsU0FBUyxFQUFFO1lBQzlCLElBQUksSUFBSSwwQkFBaUIsSUFBSSxDQUFDLFVBQVUsMENBQUUsU0FBUyxDQUFFLENBQUM7U0FDdkQ7UUFDRCxVQUFJLElBQUksQ0FBQyxVQUFVLDBDQUFFLFdBQVcsRUFBRTtZQUNoQyxJQUFJLElBQUksd0JBQWUsSUFBSSxDQUFDLFVBQVUsMENBQUUsU0FBUyxDQUFFLENBQUM7U0FDckQ7UUFDRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFO1lBQzlCLElBQUksSUFBSSw0QkFBbUIsSUFBSSxDQUFDLGFBQWEsMENBQUUsV0FBVyxpQ0FBb0IsSUFBSSxDQUFDLGFBQWEsMENBQUUsWUFBWSxDQUFFLENBQUM7WUFDakgsVUFBSSxJQUFJLENBQUMsYUFBYSwwQ0FBRSxTQUFTLEVBQUU7Z0JBQ2pDLElBQUksSUFBSSx5QkFBZ0IsSUFBSSxDQUFDLGFBQWEsMENBQUUsU0FBUyxDQUFFLENBQUM7YUFDekQ7U0FDRjthQUFNLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUU7WUFDcEMsSUFBSSxJQUFJLG1CQUFVLElBQUksQ0FBQyxZQUFZLDBDQUFFLEdBQUcsMEJBQWEsSUFBSSxDQUFDLFlBQVksMENBQUUsTUFBTSxDQUFFLENBQUM7U0FDbEY7UUFFRCxVQUFJLElBQUksQ0FBQyxXQUFXLDBDQUFFLE9BQU8sRUFBRTtZQUM3QixJQUFJLElBQUksZ0JBQWMsSUFBSSxDQUFDLFNBQVMsT0FBQyxJQUFJLENBQUMsV0FBVywwQ0FBRSxPQUFPLENBQUcsQ0FBQztTQUNuRTtRQUNELFVBQUksSUFBSSxDQUFDLFdBQVcsMENBQUUsV0FBVyxFQUFFO1lBQ2pDLElBQUksSUFBSSw0QkFBbUIsSUFBSSxDQUFDLFdBQVcsMENBQUUsV0FBVyxDQUFFLENBQUM7U0FDNUQ7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxnQ0FBYSxHQUFiLFVBQWMsU0FBbUI7UUFDL0IsSUFBSSxJQUFJLEdBQUcsY0FBWSxJQUFJLENBQUMsTUFBTSxrQkFBYSxJQUFJLENBQUMsTUFBUSxDQUFDO1FBQzdELElBQUksU0FBUyxFQUFFO1lBQ2IsSUFBSSxJQUFJLEtBQUssQ0FBQztTQUNmO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU8sc0NBQW1CLEdBQTNCOztRQUNFLE9BQU8sT0FBQSxJQUFJLENBQUMsVUFBVSwwQ0FBRSxZQUFZLE1BQUssT0FBTyxDQUFDO0lBQ25ELENBQUM7SUFDTyxxQ0FBa0IsR0FBMUI7O1FBQ0UsT0FBTyxPQUFBLElBQUksQ0FBQyxVQUFVLDBDQUFFLFlBQVksTUFBSyxNQUFNLENBQUM7SUFDbEQsQ0FBQztJQUNILGVBQUM7QUFBRCxDQUFDLEFBNURELElBNERDIn0=