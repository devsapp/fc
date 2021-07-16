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
/* eslint-disable no-await-in-loop */
var core = __importStar(require("@serverless-devs/core"));
var lodash_1 = __importDefault(require("lodash"));
var client_1 = __importDefault(require("../client"));
var logger_1 = __importDefault(require("../../common/logger"));
var utils_1 = require("../utils");
var ALIAS_COMMAND = ['list', 'get', 'publish', 'remove', 'removeAll'];
var ALIAS_COMMAND_HELP_KEY = {
    list: 'AliasListInputsArgs',
    get: 'AliasGetInputsArgs',
    publish: 'AliasPublishInputsArgs',
    remove: 'AliasDeleteInputsArgs',
    removeAll: 'AliasDeleteAllInputsArgs',
};
var Alias = /** @class */ (function () {
    function Alias(_a) {
        var region = _a.region, credentials = _a.credentials;
        client_1.default.setFcClient(region, credentials);
    }
    Alias.handlerInputs = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var parsedArgs, parsedData, rawData, subCommand, props, endProps, credentials, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        logger_1.default.debug("inputs.props: " + JSON.stringify(inputs.props));
                        parsedArgs = core.commandParse(inputs, {
                            boolean: ['help', 'table', 'y'],
                            string: ['region', 'service-name', 'description', 'alias-name', 'id', 'gversion'],
                            number: ['weight'],
                            alias: { help: 'h', version: 'id', 'assume-yes': 'y' },
                        });
                        parsedData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                        rawData = parsedData._ || [];
                        if (!rawData.length) {
                            return [2 /*return*/, { help: true, helpKey: 'AliasInputsArgs' }];
                        }
                        subCommand = rawData[0];
                        logger_1.default.debug("version subCommand: " + subCommand);
                        if (!ALIAS_COMMAND.includes(subCommand)) {
                            return [2 /*return*/, {
                                    help: true,
                                    helpKey: 'AliasInputsArgs',
                                    errorMessage: "Does not support " + subCommand + " command",
                                }];
                        }
                        if (parsedData.help) {
                            return [2 /*return*/, { help: true, subCommand: subCommand, helpKey: ALIAS_COMMAND_HELP_KEY[subCommand] }];
                        }
                        props = inputs.props || {};
                        endProps = {
                            region: parsedData.region || props.region,
                            serviceName: parsedData['service-name'] || ((_a = props.service) === null || _a === void 0 ? void 0 : _a.name),
                            description: parsedData.description,
                            version: parsedData.id,
                            assumeYes: parsedData.y,
                            aliasName: parsedData['alias-name'],
                            gversion: parsedData.gversion,
                            weight: parsedData.weight,
                        };
                        if (!endProps.region) {
                            throw new Error('Not fount region');
                        }
                        if (!endProps.serviceName) {
                            throw new Error('Not fount serviceName');
                        }
                        _c = inputs.credentials;
                        if (_c) return [3 /*break*/, 2];
                        return [4 /*yield*/, core.getCredential((_b = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _b === void 0 ? void 0 : _b.access)];
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
    Alias.prototype.findAlias = function (_a) {
        var serviceName = _a.serviceName, aliasName = _a.aliasName;
        return __awaiter(this, void 0, void 0, function () {
            var aliasList, _i, aliasList_1, aliasItem;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.list({ serviceName: serviceName })];
                    case 1:
                        aliasList = _b.sent();
                        for (_i = 0, aliasList_1 = aliasList; _i < aliasList_1.length; _i++) {
                            aliasItem = aliasList_1[_i];
                            if (aliasItem.aliasName === aliasName) {
                                return [2 /*return*/, aliasItem];
                            }
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    Alias.prototype.publish = function (_a) {
        var serviceName = _a.serviceName, description = _a.description, aliasName = _a.aliasName, version = _a.version, gversion = _a.gversion, weight = _a.weight;
        return __awaiter(this, void 0, void 0, function () {
            var hasWeight, parames, aliasConfig;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!version) {
                            throw new Error('Not fount versionId');
                        }
                        hasWeight = typeof weight === 'number';
                        if (hasWeight && !gversion) {
                            throw new Error('weight exists, gversion is required');
                        }
                        if (gversion && !hasWeight) {
                            throw new Error('gversion exists,weight is required');
                        }
                        parames = {
                            description: description,
                            additionalVersionWeight: {},
                        };
                        if (hasWeight) {
                            parames.additionalVersionWeight = (_b = {}, _b[gversion] = weight / 100, _b);
                        }
                        return [4 /*yield*/, this.findAlias({ serviceName: serviceName, aliasName: aliasName })];
                    case 1:
                        aliasConfig = _c.sent();
                        if (!aliasConfig) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.updateAlias({ aliasName: aliasName, serviceName: serviceName, version: version, parames: parames })];
                    case 2: return [2 /*return*/, _c.sent()];
                    case 3: return [4 /*yield*/, this.createAlias({ aliasName: aliasName, serviceName: serviceName, version: version, parames: parames })];
                    case 4: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    Alias.prototype.list = function (_a, table) {
        var serviceName = _a.serviceName;
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger_1.default.info("Getting listAliases: " + serviceName);
                        return [4 /*yield*/, client_1.default.fcClient.get_all_list_data("/services/" + serviceName + "/aliases", 'aliases')];
                    case 1:
                        data = _b.sent();
                        if (table) {
                            this.showAlias(data);
                        }
                        else {
                            return [2 /*return*/, data];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Alias.prototype.get = function (_a) {
        var serviceName = _a.serviceName, aliasName = _a.aliasName;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger_1.default.info("Getting alias: " + aliasName);
                        return [4 /*yield*/, client_1.default.fcClient.getAlias(serviceName, aliasName)];
                    case 1: return [2 /*return*/, (_b.sent()).data];
                }
            });
        });
    };
    Alias.prototype.remove = function (_a) {
        var serviceName = _a.serviceName, aliasName = _a.aliasName;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger_1.default.info("Removing alias: " + aliasName);
                        return [4 /*yield*/, client_1.default.fcClient.deleteAlias(serviceName, aliasName)];
                    case 1: return [2 /*return*/, (_b.sent()).data];
                }
            });
        });
    };
    Alias.prototype.removeAll = function (_a) {
        var serviceName = _a.serviceName, assumeYes = _a.assumeYes;
        return __awaiter(this, void 0, void 0, function () {
            var aliasList, meg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.list({ serviceName: serviceName })];
                    case 1:
                        aliasList = _b.sent();
                        if (!!lodash_1.default.isEmpty(aliasList)) return [3 /*break*/, 6];
                        meg = "Alias configuration exists under service " + serviceName + ", whether to delete all alias resources";
                        if (!assumeYes) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.forDataDelete(serviceName, aliasList)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3:
                        this.showAlias(aliasList);
                        return [4 /*yield*/, utils_1.promptForConfirmOrDetails(meg)];
                    case 4:
                        if (!_b.sent()) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.forDataDelete(serviceName, aliasList)];
                    case 5: return [2 /*return*/, _b.sent()];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Alias.prototype.forDataDelete = function (serviceName, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, data_1, aliasName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, data_1 = data;
                        _a.label = 1;
                    case 1:
                        if (!(_i < data_1.length)) return [3 /*break*/, 4];
                        aliasName = data_1[_i].aliasName;
                        return [4 /*yield*/, this.remove({ serviceName: serviceName, aliasName: aliasName })];
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
    Alias.prototype.showAlias = function (data) {
        var showWeight = {
            value: 'additionalVersionWeight',
            formatter: function (value) {
                var gversion = Object.keys(value)[0];
                if (gversion) {
                    return "additionalVersion: " + gversion + "\nWeight: " + value[gversion] * 100 + "%";
                }
                return '';
            },
        };
        utils_1.tableShow(data, ['aliasName', 'versionId', 'description', 'createdTime', 'lastModifiedTime', showWeight]);
    };
    Alias.prototype.updateAlias = function (_a) {
        var aliasName = _a.aliasName, serviceName = _a.serviceName, version = _a.version, parames = _a.parames;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger_1.default.info("Updating alias: " + aliasName);
                        return [4 /*yield*/, client_1.default.fcClient.updateAlias(serviceName, aliasName, version, parames)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Alias.prototype.createAlias = function (_a) {
        var aliasName = _a.aliasName, serviceName = _a.serviceName, version = _a.version, parames = _a.parames;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger_1.default.info("Creating alias: " + aliasName);
                        return [4 /*yield*/, client_1.default.fcClient.createAlias(serviceName, aliasName, version, parames)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Alias;
}());
exports.default = Alias;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpYXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NvbXBvbmVudC9hbGlhcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBcUM7QUFDckMsMERBQThDO0FBRTlDLGtEQUF1QjtBQUN2QixxREFBK0I7QUFDL0IsK0RBQXlDO0FBQ3pDLGtDQUFnRTtBQTJCaEUsSUFBTSxhQUFhLEdBQWEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDbEYsSUFBTSxzQkFBc0IsR0FBNEI7SUFDdEQsSUFBSSxFQUFFLHFCQUFxQjtJQUMzQixHQUFHLEVBQUUsb0JBQW9CO0lBQ3pCLE9BQU8sRUFBRSx3QkFBd0I7SUFDakMsTUFBTSxFQUFFLHVCQUF1QjtJQUMvQixTQUFTLEVBQUUsMEJBQTBCO0NBQ3RDLENBQUM7QUFFRjtJQThERSxlQUFZLEVBQXNFO1lBQXBFLE1BQU0sWUFBQSxFQUFFLFdBQVcsaUJBQUE7UUFDL0IsZ0JBQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUEvRFksbUJBQWEsR0FBMUIsVUFBMkIsTUFBTTs7Ozs7Ozt3QkFDL0IsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsbUJBQWlCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRyxDQUFDLENBQUM7d0JBRXhELFVBQVUsR0FBeUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7NEJBQ2pFLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDOzRCQUMvQixNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFVB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