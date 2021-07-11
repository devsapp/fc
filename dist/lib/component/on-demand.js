"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var core = __importStar(require("@serverless-devs/core"));
var logger_1 = __importDefault(require("../../common/logger"));
var help_constant = __importStar(require("../help/on-demand"));
var client_1 = __importDefault(require("../client"));
var utils_1 = require("../utils");
var ONDEMAND_COMMADN = ['list', 'get', 'put', 'delete'];
var OnDemand = /** @class */ (function () {
    function OnDemand(_a) {
        var region = _a.region, credentials = _a.credentials;
        client_1.default.setFcClient(region, credentials);
    }
    OnDemand.handlerInputs = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var parsedArgs, parsedData, rawData, subCommand, props, region, endProps, credentials, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        logger_1.default.debug("inputs.props: " + JSON.stringify(inputs.props));
                        parsedArgs = core.commandParse(inputs, {
                            boolean: ['help', 'table'],
                            string: ['region', 'service-name', 'qualifier', 'function-name'],
                            number: ['maximum-instance-count'],
                            alias: { help: 'h', 'maximum-instance-count': 'max' },
                        });
                        parsedData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                        rawData = parsedData._ || [];
                        if (!rawData.length) {
                            core.help(help_constant.ONDEMAND);
                            process.exit();
                        }
                        subCommand = rawData[0];
                        logger_1.default.debug("onDemand subCommand: " + subCommand);
                        if (!ONDEMAND_COMMADN.includes(subCommand)) {
                            core.help(help_constant.ONDEMAND);
                            return [2 /*return*/, { errorMessage: "Does not support " + subCommand + " command" }];
                        }
                        if (parsedData.help) {
                            core.help(help_constant[("onDemand_" + subCommand).toLocaleUpperCase()]);
                            return [2 /*return*/, { help: true, subCommand: subCommand }];
                        }
                        props = inputs.props || {};
                        region = parsedData.region || props.region;
                        if (!region) {
                            throw new Error('Not fount region');
                        }
                        endProps = {
                            region: region,
                            serviceName: parsedData['service-name'] || ((_a = props.service) === null || _a === void 0 ? void 0 : _a.name),
                            qualifier: parsedData.qualifier || props.qualifier,
                            functionName: parsedData['function-name'] || ((_b = props.function) === null || _b === void 0 ? void 0 : _b.name),
                            maximumInstanceCount: parsedData['maximum-instance-count'],
                        };
                        _c = inputs.credentials;
                        if (_c) return [3 /*break*/, 2];
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 1:
                        _c = (_d.sent());
                        _d.label = 2;
                    case 2:
                        credentials = _c;
                        logger_1.default.debug("handler inputs props: " + JSON.stringify(endProps));
                        return [2 /*return*/, {
                                credentials: credentials,
                                subCommand: subCommand,
                                props: endProps,
                                table: parsedData.table,
                            }];
                }
            });
        });
    };
    OnDemand.prototype.list = function (_a, table) {
        var serviceName = _a.serviceName;
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger_1.default.info("Getting list on-demand: " + serviceName);
                        return [4 /*yield*/, client_1.default.fcClient.get_all_list_data('/on-demand-configs', 'configs', {
                                prefix: serviceName ? "services/" + serviceName : '',
                            })];
                    case 1:
                        data = _b.sent();
                        if (table) {
                            utils_1.tableShow(data.map(function (item) {
                                var _a = item.resource.split('/'), service = _a[1], functionName = _a[3];
                                var serviceArr = service.split('.');
                                return __assign({ serviceName: serviceArr[0], qualifier: serviceArr[1], functionName: functionName }, item);
                            }), [
                                'serviceName',
                                'qualifier',
                                'functionName',
                                'maximumInstanceCount',
                            ]);
                        }
                        else {
                            return [2 /*return*/, data];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    OnDemand.prototype.get = function (_a) {
        var serviceName = _a.serviceName, qualifier = _a.qualifier, functionName = _a.functionName;
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!functionName) {
                            throw new Error('Not fount functionName');
                        }
                        if (!qualifier) {
                            throw new Error('Not fount qualifier');
                        }
                        if (!serviceName) {
                            throw new Error('Not fount serviceName');
                        }
                        logger_1.default.info("Getting on-demand: " + serviceName + "." + qualifier + "/" + functionName);
                        return [4 /*yield*/, client_1.default.fcClient.on_demand_get(serviceName, qualifier, functionName)];
                    case 1:
                        data = (_b.sent()).data;
                        if (data) {
                            return [2 /*return*/, __assign({ serviceName: serviceName,
                                    functionName: functionName,
                                    qualifier: qualifier }, data)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    OnDemand.prototype.delete = function (_a) {
        var serviceName = _a.serviceName, qualifier = _a.qualifier, functionName = _a.functionName;
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!functionName) {
                            throw new Error('Not fount functionName');
                        }
                        if (!qualifier) {
                            throw new Error('Not fount qualifier');
                        }
                        if (!serviceName) {
                            throw new Error('Not fount serviceName');
                        }
                        logger_1.default.info("Removing on-demand: " + serviceName + "." + qualifier + "/" + functionName);
                        return [4 /*yield*/, client_1.default.fcClient.on_demand_delete(serviceName, qualifier, functionName)];
                    case 1:
                        data = (_b.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    OnDemand.prototype.put = function (_a) {
        var serviceName = _a.serviceName, qualifier = _a.qualifier, functionName = _a.functionName, maximumInstanceCount = _a.maximumInstanceCount;
        return __awaiter(this, void 0, void 0, function () {
            var options, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!functionName) {
                            throw new Error('Not fount functionName parameter');
                        }
                        if (!qualifier) {
                            throw new Error('Not fount qualifier parameter');
                        }
                        if (!serviceName) {
                            throw new Error('Not fount serviceName parameter');
                        }
                        if (typeof maximumInstanceCount !== 'number') {
                            throw new Error('Not fount maximumInstanceCount parameter');
                        }
                        options = {
                            maximumInstanceCount: maximumInstanceCount,
                            resource: "services/" + serviceName + "." + qualifier + "/functions/" + functionName,
                        };
                        logger_1.default.info("Updating on-demand: " + serviceName + "." + qualifier + "/" + functionName);
                        return [4 /*yield*/, client_1.default.fcClient.on_demand_put(serviceName, qualifier, functionName, options)];
                    case 1:
                        data = (_b.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return OnDemand;
}());
exports.default = OnDemand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib24tZGVtYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnQvb24tZGVtYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBQzlDLCtEQUF5QztBQUN6QywrREFBbUQ7QUFDbkQscURBQStCO0FBQy9CLGtDQUFxQztBQVNyQyxJQUFNLGdCQUFnQixHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFFMUQ7SUFxREUsa0JBQVksRUFBdUI7WUFBckIsTUFBTSxZQUFBLEVBQUUsV0FBVyxpQkFBQTtRQUMvQixnQkFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQXREWSxzQkFBYSxHQUExQixVQUEyQixNQUFNOzs7Ozs7O3dCQUMvQixnQkFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBaUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFHLENBQUMsQ0FBQzt3QkFFeEQsVUFBVSxHQUF5QixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTs0QkFDakUsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQzs0QkFDMUIsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsZUFBZSxDQUFDOzRCQUNoRSxNQUFNLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQzs0QkFDbEMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSx3QkFBd0IsRUFBRSxLQUFLLEVBQUU7eUJBQ3RELENBQUMsQ0FBQzt3QkFFRyxVQUFVLEdBQUcsQ0FBQSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsSUFBSSxL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