"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var core = __importStar(require("@serverless-devs/core"));
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
        return __awaiter(this, void 0, void 0, function () {
            var AccountID, AccessKeyID, AccessKeySecret, SecurityToken, fcClient, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        AccountID = credentials.AccountID, AccessKeyID = credentials.AccessKeyID, AccessKeySecret = credentials.AccessKeySecret, SecurityToken = credentials.SecurityToken;
                        _a = fc2_1.default.bind;
                        _b = [void 0, AccountID];
                        _c = {
                            accessKeyID: AccessKeyID,
                            accessKeySecret: AccessKeySecret,
                            securityToken: SecurityToken,
                            region: region
                        };
                        return [4 /*yield*/, this.getFcEndpoint()];
                    case 1:
                        fcClient = new (_a.apply(fc2_1.default, _b.concat([(_c.endpoint = _d.sent(),
                                _c.timeout = 6000000,
                                _c)])))();
                        this.fcClient = fcClient;
                        return [2 /*return*/, fcClient];
                }
            });
        });
    };
    Client.getFcEndpoint = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fcDefault, fcEndpoint, enableFcEndpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, core.loadComponent('devsapp/fc-default')];
                    case 1:
                        fcDefault = _a.sent();
                        return [4 /*yield*/, fcDefault.get({ args: 'fc-endpoint' })];
                    case 2:
                        fcEndpoint = _a.sent();
                        if (!fcEndpoint) {
                            return [2 /*return*/, undefined];
                        }
                        return [4 /*yield*/, fcDefault.get({ args: 'enable-fc-endpoint' })];
                    case 3:
                        enableFcEndpoint = _a.sent();
                        // @ts-ignore: .
                        return [2 /*return*/, (enableFcEndpoint === true || enableFcEndpoint === 'true') ? fcEndpoint : undefined];
                }
            });
        });
    };
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQStCO0FBQy9CLDBEQUE4QztBQUM5QyxrREFBdUI7QUFFdkIsYUFBRSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEdBQUcsVUFBZ0IsT0FBWTtJQUFaLHdCQUFBLEVBQUEsWUFBWTs7O1lBQ3hELHNCQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLEVBQUM7OztDQUNoRCxDQUFDO0FBQ0YsYUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsVUFBZ0IsV0FBVyxFQUFFLE9BQVksRUFBRSxPQUFRO0lBQXRCLHdCQUFBLEVBQUEsWUFBWTs7O1lBQ2pFLHNCQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBYSxXQUFXLGFBQVUsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLEVBQUM7OztDQUN2RSxDQUFDO0FBQ0YsYUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsVUFBZ0IsV0FBVyxFQUFFLE9BQVksRUFBRSxPQUFRO0lBQXRCLHdCQUFBLEVBQUEsWUFBWTs7O1lBQ25FLHNCQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBYSxXQUFXLGNBQVcsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLEVBQUM7OztDQUN4RSxDQUFDO0FBQ0YsYUFBRSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEdBQUcsVUFBZ0IsV0FBVyxFQUFFLFNBQVMsRUFBRSxZQUFZOzs7WUFDL0Usc0JBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFhLFdBQVcsU0FBSSxTQUFTLG1CQUFjLFlBQVksc0JBQW1CLENBQUMsRUFBQzs7O0NBQ3JHLENBQUM7QUFDRixhQUFFLENBQUMsU0FBUyxDQUFDLGFBQWEs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