"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fc2_1 = __importDefault(require("@alicloud/fc2"));
var lodash_1 = __importDefault(require("lodash"));
fc2_1.default.prototype.on_demand_list = function (options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, this.get('/on-demand-configs', options)];
        });
    });
};
fc2_1.default.prototype.alias_list = function (serviceName, options, headers) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, this.get("/services/" + serviceName + "/aliases", options, headers)];
        });
    });
};
fc2_1.default.prototype.version_list = function (serviceName, options, headers) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, this.get("/services/" + serviceName + "/versions", options, headers)];
        });
    });
};
fc2_1.default.prototype.on_demand_get = function (serviceName, qualifier, functionName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, this.get("/services/" + serviceName + "." + qualifier + "/functions/" + functionName + "/on-demand-config")];
        });
    });
};
fc2_1.default.prototype.on_demand_put = function (serviceName, qualifier, functionName, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, this.put("/services/" + serviceName + "." + qualifier + "/functions/" + functionName + "/on-demand-config", options)];
        });
    });
};
fc2_1.default.prototype.on_demand_delete = function (serviceName, qualifier, functionName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, this.delete("/services/" + serviceName + "." + qualifier + "/functions/" + functionName + "/on-demand-config")];
        });
    });
};
fc2_1.default.prototype.get_all_list_data = function (path, dataKeyword, options, headers) {
    var _a, _b;
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var data, res, keywordData;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    data = [];
                    _c.label = 1;
                case 1: return [4 /*yield*/, this.get(path, options, headers)];
                case 2:
                    res = _c.sent();
                    keywordData = (_a = res.data) === null || _a === void 0 ? void 0 : _a[dataKeyword];
                    options.nextToken = (_b = res.data) === null || _b === void 0 ? void 0 : _b.nextToken;
                    if (!lodash_1.default.isEmpty(keywordData)) {
                        data = data.concat(keywordData);
                    }
                    _c.label = 3;
                case 3:
                    if (options.nextToken) return [3 /*break*/, 1];
                    _c.label = 4;
                case 4: return [2 /*return*/, data];
            }
        });
    });
};
var Client = /** @class */ (function () {
    function Client() {
    }
    Client.setFcClient = function (region, credentials) {
        var AccountID = credentials.AccountID, AccessKeyID = credentials.AccessKeyID, AccessKeySecret = credentials.AccessKeySecret, SecurityToken = credentials.SecurityToken;
        var fcClient = new fc2_1.default(AccountID, {
            accessKeyID: AccessKeyID,
            accessKeySecret: AccessKeySecret,
            securityToken: SecurityToken,
            region: region,
            timeout: 6000000,
        });
        this.fcClient = fcClient;
        return fcClient;
    };
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBK0I7QUFDL0Isa0RBQXVCO0FBRXZCLGFBQUUsQ0FBQyxTQUFTLENBQUMsY0FBYyxHQUFHLFVBQWdCLE9BQVk7SUFBWix3QkFBQSxFQUFBLFlBQVk7OztZQUN4RCxzQkFBTyxJQUFJLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxFQUFDOzs7Q0FDaEQsQ0FBQztBQUNGLGFBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLFVBQWdCLFdBQVcsRUFBRSxPQUFZLEVBQUUsT0FBUTtJQUF0Qix3QkFBQSxFQUFBLFlBQVk7OztZQUNqRSxzQkFBTyxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWEsV0FBVyxhQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxFQUFDOzs7Q0FDdkUsQ0FBQztBQUNGLGFBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLFVBQWdCLFdBQVcsRUFBRSxPQUFZLEVBQUUsT0FBUTtJQUF0Qix3QkFBQSxFQUFBLFlBQVk7OztZQUNuRSxzQkFBTyxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWEsV0FBVyxjQUFXLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxFQUFDOzs7Q0FDeEUsQ0FBQztBQUNGLGFBQUUsQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHLFVBQWdCLFdBQVcsRUFBRSxTQUFTLEVBQUUsWUFBWTs7O1lBQy9FLHNCQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBYSxXQUFXLFNBQUksU0FBUyxtQkFBYyxZQUFZLHNCQUFtQixDQUFDLEVBQUM7OztDQUNyRyxDQUFDO0FBQ0YsYUFBRSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEdBQUcsVUFBZ0IsV0FBVyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsT0FBWTtJQUFaLHdCQUFBLEVBQUEsWUFBWTs7O1lBQzdGLHNCQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBYSxXQUFXLFNBQUksU0FBUyxtQkFBYyxZQUFZLHNCQUFtQixFQUFFLE9BQU8sQ0FBQyxFQUFDOzs7Q0FDOUcsQ0FBQztBQUNGLGFBQUUsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEdBQUcsVUFBZ0IsV0FBVyxFQUFFLFNBQVMsRUFBRSxZQUFZOzs7WUFDbEYsc0JBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFhLFdBQVcsU0FBSSxTQUFTLG1CQUFjLFlBQVksc0JBQW1CLENBQUMsRUFBQzs7O0NBQ3hHLENBQUM7QUFDRixhQUFFLENBQUMsU0FBUyxDQUFDLGlCQUFpQixHQUFHLFVBQWdCLElBQUksRUFBRSxXQUFXLEVBQUUsT0FBb0MsRUFBRSxPQUFROztJQUE5Qyx3QkFBQSxFQUFBLFlBQW9DOzs7Ozs7b0JBQ2xHLElBQUksR0FBRyxFQUFFLENBQUM7O3dCQUVBLHFCQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFBQTs7b0JBQTVDLEdBQUcsR0FBRyxTQUFzQztvQkFFNUMsV0FBVyxTQUFHLEdBQUcsQ0FBQyxJQUFJLDBDQUFHLFdBQVcsQ0FBQyxDQUFDO29CQUM1QyxPQUFPLENBQUMsU0FBUyxTQUFHLEdBQUcsQ0FBQyxJQUFJLDBDQUFFLFNBQVMsQ0FBQztvQkFFeEMsSUFBSSxDQUFDLGdCQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFO3dCQUMzQixJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztxQkFDakM7Ozt3QkFDTSxPQUFPLENBQUMsU0FBUzs7d0JBRTFCLHNCQUFPLElBQUksRUFBQzs7OztDQUNiLENBQUM7QUFFRjtJQUFBO0lBdUJBLENBQUM7SUFwQlEsa0JBQVcsR0FBbEIsVUFBbUIsTUFBYyxFQUFFLFdBQVc7UUFFMUMsSUFBQSxTQUFTLEdBSVAsV0FBVyxVQUpKLEVBQ1QsV0FBVyxHQUdULFdBQVcsWUFIRixFQUNYLGVBQWUsR0FFYixXQUFXLGdCQUZFLEVBQ2YsYUFBYSxHQUNYLFdBQVcsY0FEQSxDQUNDO1FBRWhCLElBQU0sUUFBUSxHQUFHLElBQUksYUFBRSxDQUFDLFNBQVMsRUFBRTtZQUNqQyxXQUFXLEVBQUUsV0FBVztZQUN4QixlQUFlLEVBQUUsZUFBZTtZQUNoQyxhQUFhLEVBQUUsYUFBYTtZQUM1QixNQUFNLFFBQUE7WUFDTixPQUFPLEVBQUUsT0FBTztTQUNqQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUV6QixPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBQ0gsYUFBQztBQUFELENBQUMsQUF2QkQsSUF1QkMifQ==