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
var fs_1 = __importDefault(require("fs"));
var logger_1 = __importDefault(require("../../common/logger"));
var client_1 = __importDefault(require("../client"));
var utils_1 = require("../utils");
var lodash_1 = __importDefault(require("lodash"));
var PROVISION_COMMADN = ['list', 'get', 'put'];
var PROVISION_COMMADN_HELP_KEY = {
    list: 'ProvisionListInputsArgs',
    get: 'ProvisionGetInputsArgs',
    put: 'ProvisionPutInputsArgs',
};
var TABLE = [
    { value: 'serviceName', width: '10%' },
    { value: 'qualifier', width: '10%' },
    { value: 'functionName', width: '10%' },
    { value: 'target', width: '10%', alias: 'target', formatter: function (value) { return value || '0'; } },
    { value: 'current', width: '10%', alias: 'current', formatter: function (value) { return value || '0'; } },
    {
        value: 'scheduledActions',
        width: '25%',
        formatter: function (value) { return (value && value.length ? JSON.stringify(value, null, 2) : value); },
    },
    {
        value: 'targetTrackingPolicies',
        width: '25%',
        formatter: function (value) { return (value && value.length ? JSON.stringify(value, null, 2) : value); },
    },
];
var Provision = /** @class */ (function () {
    function Provision(_a) {
        var region = _a.region, credentials = _a.credentials;
        client_1.default.setFcClient(region, credentials);
    }
    Provision.handlerInputs = function (inputs) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var parsedArgs, parsedData, rawData, subCommand, props, region, endProps, credentials;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        logger_1.default.debug("inputs.props: " + JSON.stringify(inputs.props));
                        parsedArgs = core.commandParse(inputs, {
                            boolean: ['help', 'table'],
                            string: ['region', 'service-name', 'qualifier', 'function-name', 'config'],
                            number: ['target'],
                            alias: { help: 'h' },
                        });
                        parsedData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                        rawData = parsedData._ || [];
                        if (!rawData.length) {
                            return [2 /*return*/, { help: true, helpKey: 'ProvisionInputsArgs' }];
                        }
                        subCommand = rawData[0];
                        logger_1.default.debug("provision subCommand: " + subCommand);
                        if (!PROVISION_COMMADN.includes(subCommand)) {
                            return [2 /*return*/, { help: true, helpKey: 'ProvisionInputsArgs', errorMessage: "Does not support " + subCommand + " command" }];
                        }
                        if (parsedData.help) {
                            return [2 /*return*/, { help: true, subCommand: subCommand, helpKey: PROVISION_COMMADN_HELP_KEY[subCommand] }];
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
                            config: parsedData.config,
                            target: parsedData.target,
                        };
                        return [4 /*yield*/, utils_1.getCredentials(inputs.credentials, (_c = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _c === void 0 ? void 0 : _c.access)];
                    case 1:
                        credentials = _d.sent();
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
    Provision.prototype.get = function (_a) {
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
                        logger_1.default.info("Getting provision: " + serviceName + "." + qualifier + "/" + functionName);
                        return [4 /*yield*/, client_1.default.fcClient.getProvisionConfig(serviceName, functionName, qualifier)];
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
    Provision.prototype.put = function (_a) {
        var serviceName = _a.serviceName, qualifier = _a.qualifier, functionName = _a.functionName, config = _a.config, target = _a.target;
        return __awaiter(this, void 0, void 0, function () {
            var options, fileStr, data;
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
                        if (!config && typeof target !== 'number') {
                            throw new Error('config and target must fill in one');
                        }
                        options = {
                            target: 0,
                            scheduledActions: [],
                            targetTrackingPolicies: [],
                        };
                        if (config) {
                            try {
                                fileStr = fs_1.default.readFileSync(config, 'utf8');
                                options = JSON.parse(fileStr);
                            }
                            catch (ex) {
                                logger_1.default.debug("Read " + config + " error: " + ex.message);
                                throw new Error("Reading " + config + " file failed, please check whether this file exists and is a standard JSON");
                            }
                        }
                        if (typeof target === 'number') {
                            options.target = target;
                        }
                        logger_1.default.info("Updating provision: " + serviceName + "." + qualifier + "/" + functionName);
                        return [4 /*yield*/, client_1.default.fcClient.putProvisionConfig(serviceName, functionName, qualifier, options)];
                    case 1:
                        data = (_b.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    Provision.prototype.list = function (_a, table) {
        var serviceName = _a.serviceName, qualifier = _a.qualifier;
        return __awaiter(this, void 0, void 0, function () {
            var provisionConfigs, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger_1.default.info("Getting list provision: " + serviceName);
                        return [4 /*yield*/, client_1.default.fcClient.get_all_list_data('/provision-configs', 'provisionConfigs', {
                                serviceName: serviceName,
                                qualifier: qualifier,
                            })];
                    case 1:
                        provisionConfigs = (_b.sent());
                        data = provisionConfigs === null || provisionConfigs === void 0 ? void 0 : provisionConfigs.filter(function (item) { return item.target || item.current; }).map(function (item) { return (__assign({ serviceName: item.resource.split('#')[1], qualifier: item.resource.split('#')[2], functionName: item.resource.split('#')[3] }, item)); });
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
    Provision.prototype.removeAll = function (_a) {
        var serviceName = _a.serviceName, qualifier = _a.qualifier, assumeYes = _a.assumeYes;
        return __awaiter(this, void 0, void 0, function () {
            var provisionList, meg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.list({ serviceName: serviceName, qualifier: qualifier })];
                    case 1:
                        provisionList = _b.sent();
                        if (!!lodash_1.default.isEmpty(provisionList)) return [3 /*break*/, 6];
                        if (!assumeYes) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.forDelete(provisionList)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3:
                        utils_1.tableShow(provisionList, TABLE);
                        meg = "Provision configuration exists under service " + serviceName + ", whether to delete all provision resources";
                        return [4 /*yield*/, utils_1.promptForConfirmOrDetails(meg)];
                    case 4:
                        if (!_b.sent()) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.forDelete(provisionList)];
                    case 5: return [2 /*return*/, _b.sent()];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Provision.prototype.forDelete = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, data_1, _a, serviceName, qualifier, functionName;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, data_1 = data;
                        _b.label = 1;
                    case 1:
                        if (!(_i < data_1.length)) return [3 /*break*/, 4];
                        _a = data_1[_i], serviceName = _a.serviceName, qualifier = _a.qualifier, functionName = _a.functionName;
                        return [4 /*yield*/, this.put({ serviceName: serviceName, qualifier: qualifier, functionName: functionName, target: 0 })];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Provision;
}());
exports.default = Provision;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnQvcHJvdmlzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBQzlDLDBDQUFvQjtBQUNwQiwrREFBeUM7QUFDekMscURBQStCO0FBQy9CLGtDQUFnRjtBQUNoRixrREFBdUI7QUFnQnZCLElBQU0saUJBQWlCLEdBQWEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzNELElBQU0sMEJBQTBCLEdBQUc7SUFDakMsSUFBSSxFQUFFLHlCQUF5QjtJQUMvQixHQUFHLEVBQUUsd0JBQXdCO0lBQzdCLEdBQUcsRUFBRSx3QkFBd0I7Q0FDOUIsQ0FBQztBQUNGLElBQU0sS0FBSyxHQUFHO0lBQ1osRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDdEMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDcEMsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDdkMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFLLElBQUksR0FBRyxFQUFaLENBQVksRUFBRTtJQUN0RixFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFDLEtBQUssSUFBSyxPQUFBLEtBQUssSUFBSSxHQUFHLEVBQVosQ0FBWSxFQUFFO0lBQ3hGO1FBQ0UsS0FBSyxFQUFFLGtC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