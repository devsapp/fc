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
var client_1 = __importDefault(require("../client"));
var utils_1 = require("../utils");
var lodash_1 = __importDefault(require("lodash"));
var ONDEMAND_COMMADN = ['list', 'get', 'put', 'remove'];
var ONDEMAND_COMMADN_HELP_KEY = {
    list: 'OnDemandListInputsArgs',
    get: 'OnDemandGetInputsArgs',
    put: 'OnDemandPutInputsArgs',
    remove: 'OnDemandDeleteInputsArgs',
};
var TABLE = [
    'serviceName',
    'qualifier',
    'functionName',
    'maximumInstanceCount',
];
var OnDemand = /** @class */ (function () {
    function OnDemand() {
    }
    OnDemand.handlerInputs = function (inputs) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var parsedArgs, parsedData, rawData, subCommand, props, region, endProps, credentials;
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
                            return [2 /*return*/, { help: true, helpKey: 'OnDemandInputsArgs' }];
                        }
                        subCommand = rawData[0];
                        logger_1.default.debug("onDemand subCommand: " + subCommand);
                        if (!ONDEMAND_COMMADN.includes(subCommand)) {
                            return [2 /*return*/, { help: true, helpKey: 'OnDemandInputsArgs', errorMessage: "Does not support " + subCommand + " command" }];
                        }
                        if (parsedData.help) {
                            return [2 /*return*/, { help: true, subCommand: subCommand, helpKey: ONDEMAND_COMMADN_HELP_KEY[subCommand] }];
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
                        return [4 /*yield*/, utils_1.getCredentials(inputs.credentials, (_c = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _c === void 0 ? void 0 : _c.access)];
                    case 1:
                        credentials = _d.sent();
                        logger_1.default.debug("handler inputs props: " + JSON.stringify(endProps));
                        return [4 /*yield*/, client_1.default.setFcClient(endProps.region, credentials)];
                    case 2:
                        _d.sent();
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
            var onDemandConfigs, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger_1.default.info("Getting list on-demand: " + serviceName);
                        return [4 /*yield*/, client_1.default.fcClient.get_all_list_data('/on-demand-configs', 'configs', {
                                prefix: serviceName ? "services/" + serviceName : '',
                            })];
                    case 1:
                        onDemandConfigs = (_b.sent());
                        data = onDemandConfigs === null || onDemandConfigs === void 0 ? void 0 : onDemandConfigs.map(function (item) {
                            var _a = item.resource.split('/'), service = _a[1], functionName = _a[3];
                            var serviceArr = service.split('.');
                            return __assign({ serviceName: serviceArr[0], qualifier: serviceArr[1], functionName: functionName }, item);
                        });
                        if (table) {
                            utils_1.tableShow(data, TABLE);
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
                            throw new Error('Not fount functio name');
                        }
                        if (!qualifier) {
                            throw new Error('Not fount qualifier');
                        }
                        if (!serviceName) {
                            throw new Error('Not fount service name');
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
    OnDemand.prototype.remove = function (_a) {
        var serviceName = _a.serviceName, qualifier = _a.qualifier, functionName = _a.functionName;
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!functionName) {
                            throw new Error('Not fount function name');
                        }
                        if (!qualifier) {
                            throw new Error('Not fount qualifier');
                        }
                        if (!serviceName) {
                            throw new Error('Not fount service name');
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
                            throw new Error('Not fount function name parameter');
                        }
                        if (!qualifier) {
                            throw new Error('Not fount qualifier parameter');
                        }
                        if (!serviceName) {
                            throw new Error('Not fount service name parameter');
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
    OnDemand.prototype.removeAll = function (_a) {
        var serviceName = _a.serviceName, qualifier = _a.qualifier, assumeYes = _a.assumeYes;
        return __awaiter(this, void 0, void 0, function () {
            var onDemandAllList, onDemandList, meg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.list({ serviceName: serviceName })];
                    case 1:
                        onDemandAllList = _b.sent();
                        onDemandList = onDemandAllList === null || onDemandAllList === void 0 ? void 0 : onDemandAllList.filter(function (item) { return item.qualifier === qualifier; });
                        if (!!lodash_1.default.isEmpty(onDemandList)) return [3 /*break*/, 6];
                        if (!assumeYes) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.forDelete(onDemandList)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3:
                        utils_1.tableShow(onDemandList, TABLE);
                        meg = "On-demand configuration exists under service " + serviceName + ", whether to delete all On-demand resources.To delete only a single configuration, execute [s remove onDemand --qualifier xxx --function-name xxx]";
                        return [4 /*yield*/, utils_1.promptForConfirmOrDetails(meg)];
                    case 4:
                        if (!_b.sent()) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.forDelete(onDemandList)];
                    case 5: return [2 /*return*/, _b.sent()];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    OnDemand.prototype.forDelete = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, data_1, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, data_1 = data;
                        _a.label = 1;
                    case 1:
                        if (!(_i < data_1.length)) return [3 /*break*/, 4];
                        item = data_1[_i];
                        return [4 /*yield*/, this.remove(item)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OnDemand;
}());
exports.default = OnDemand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib24tZGVtYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnQvb24tZGVtYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBQzlDLCtEQUF5QztBQUN6QyxxREFBK0I7QUFDL0Isa0NBQWdGO0FBQ2hGLGtEQUF1QjtBQWV2QixJQUFNLGdCQUFnQixHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDMUQsSUFBTSx5QkFBeUIsR0FBRztJQUNoQyxJQUFJLEVBQUUsd0JBQXdCO0lBQzlCLEdBQUcsRUFBRSx1QkFBdUI7SUFDNUIsR0FBRyxFQUFFLHVCQUF1QjtJQUM1QixNQUFNLEVBQUUsMEJBQTBCO0NBQ25DLENBQUM7QUFDRixJQUFNLEtBQUssR0FBRztJQUNaLGFBQWE7SUFDYixXQUFXO0lBQ1gsY0FBYztJQUNkLHNCQUFzQjtDQUN2QixDQUFDO0FBRUY7SUFBQTtJQTZKQSxDQUFDO0lBNUpjLHNCQUFhLEdBQTFCLFVBQTJCLE1BQU07Ozs7Ozs7d0JBQy9CLGdCQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFpQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUcsQ0FBQyxDQUFDO3dCQUV4RCxVQUFVLEdBQXlCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFOzRCQUNqRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDOzRCQUMxQixNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxlQUFlLENBQUM7NEJBQ2hFLE1BQU0sRUFBRSxDQUFDLHdCQUF3QixDQUFDOzRCQUNsQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxF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