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
            var parsedArgs, parsedData, rawData, subCommand, props, endProps, credentials;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        logger_1.default.debug("inputs.props: " + JSON.stringify(inputs.props));
                        parsedArgs = core.commandParse(inputs, {
                            boolean: ['help', 'table', 'y'],
                            string: ['region', 'service-name', 'description', 'alias-name', 'id', 'gversion'],
                            number: ['weight'],
                            alias: { help: 'h', 'version-id': 'id', 'assume-yes': 'y' },
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
                            versionId: parsedData.id,
                            assumeYes: parsedData.y,
                            aliasName: parsedData['alias-name'],
                            gversion: parsedData.gversion,
                            weight: parsedData.weight,
                        };
                        if (!endProps.region) {
                            throw new Error('Not fount region');
                        }
                        if (!endProps.serviceName) {
                            throw new Error('Not fount service name');
                        }
                        return [4 /*yield*/, utils_1.getCredentials(inputs.credentials, (_b = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _b === void 0 ? void 0 : _b.access)];
                    case 1:
                        credentials = _c.sent();
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
        var serviceName = _a.serviceName, description = _a.description, aliasName = _a.aliasName, versionId = _a.versionId, gversion = _a.gversion, weight = _a.weight;
        return __awaiter(this, void 0, void 0, function () {
            var hasWeight, parames, aliasConfig;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!versionId) {
                            throw new Error('Not fount version id');
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
                        return [4 /*yield*/, this.updateAlias({ aliasName: aliasName, serviceName: serviceName, versionId: versionId, parames: parames })];
                    case 2: return [2 /*return*/, _c.sent()];
                    case 3: return [4 /*yield*/, this.createAlias({ aliasName: aliasName, serviceName: serviceName, versionId: versionId, parames: parames })];
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
        var aliasName = _a.aliasName, serviceName = _a.serviceName, versionId = _a.versionId, parames = _a.parames;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger_1.default.info("Updating alias: " + aliasName);
                        return [4 /*yield*/, client_1.default.fcClient.updateAlias(serviceName, aliasName, versionId, parames)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Alias.prototype.createAlias = function (_a) {
        var aliasName = _a.aliasName, serviceName = _a.serviceName, versionId = _a.versionId, parames = _a.parames;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger_1.default.info("Creating alias: " + aliasName);
                        return [4 /*yield*/, client_1.default.fcClient.createAlias(serviceName, aliasName, versionId, parames)];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpYXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NvbXBvbmVudC9hbGlhcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBcUM7QUFDckMsMERBQThDO0FBRTlDLGtEQUF1QjtBQUN2QixxREFBK0I7QUFDL0IsK0RBQXlDO0FBQ3pDLGtDQUFnRjtBQTJCaEYsSUFBTSxhQUFhLEdBQWEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDbEYsSUFBTSxzQkFBc0IsR0FBNEI7SUFDdEQsSUFBSSxFQUFFLHFCQUFxQjtJQUMzQixHQUFHLEVBQUUsb0JBQW9CO0lBQ3pCLE9BQU8sRUFBRSx3QkFBd0I7SUFDakMsTUFBTSxFQUFFLHVCQUF1QjtJQUMvQixTQUFTLEVBQUUsMEJBQTBCO0NBQ3RDLENBQUM7QUFFRjtJQTZERSxlQUFZLEVBQXNFO1lBQXBFLE1BQU0sWUFBQSxFQUFFLFdBQVcsaUJBQUE7UUFDL0IsZ0JBQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUE5RFksbUJBQWEsR0FBMUIsVUFBMkIsTUFBTTs7Ozs7Ozt3QkFDL0IsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsbUJBQWlCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRyxDQUFDLENBQUM7d0JBRXhELFVBQVUsR0FBeUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7NEJBQ2pFLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDOzRCQUMvQixNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQzs0QkFDakYsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDOzRCQUNsQixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRTt5QkFDNUQsQ0FBQyxDQUFDO3dCQUNHLFVBQVUsR0FBRyxDQUFBLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxJQUFJLEtBQUksRUFBRSxDQUFDO3dCQUNwQyxPQUFPLEdBQUcsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFOzRCQUNuQixzQkFBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLEVBQUM7eUJBQ25EO3dCQUVLLFVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzlCLGdCQUFNLENBQUMsS0FBSyxDQUFDLHlCQUF1QixVQUFZLENBQUMsQ0FBQzt3QkFDbEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7NEJBQ3ZDLHNCQUFPO29DQUNMLElBQUksRUFBRSxJQUFJO29DQUNWLE9BQU8sRUFBRSxpQkFBaUI7b0NBQzFCLFlBQVksRUFBRSxzQkFBb0IsVUFBVSxhQUFVO2lDQUN2RCxFQUFDO3lCQUNIO3dCQUVELElBQUksVUFBVSxDQUFDLElBQUksRUFBRTs0QkFDbkIsc0JBQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsWUFBQSxFQUFFLE9BQU8sRUFBRSxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFDO3lCQUNoRjt3QkFFSyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7d0JBRTNCLFFBQVEsR0FBVzs0QkFDdkIsTUFBTSxFQUFFLFVBQVUsQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU07NEJBQ3pDLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBYyxDQUFDLFdBQUksS0FBSyxDQUFDLE9BQU8sMENBQUUsSUFBSSxDQUFBOzRCQUM5RCxXQUFXLEVBQUUsVUFBVSxDQUFDLFdBQVc7NEJBQ25DLFNBQVMsRUFBRSxVQUFVLENBQUMsRUFBRTs0QkFDeEIsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDOzRCQUN2QixTQUFTLEVBQUUsVUFBVSxDQUFDLFlBQVksQ0FBQzs0QkFDbkMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxRQUFROzRCQUM3QixNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU07eUJBQzFCLENBQUM7d0JBRUYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7NEJBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQzt5QkFDckM7d0JBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7NEJBQ3pCLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQzt5QkFDM0M7d0JBRWlDLHFCQUFNLHNCQUFjLENBQUMsTUFBTSxDQUFDLFdBQVcsUUFBRSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsT0FBTywwQ0FBRSxNQUFNLENBQUMsRUFBQTs7d0JBQTdGLFdBQVcsR0FBaUIsU0FBaUU7d0JBQ25HLGdCQUFNLENBQUMsS0FBSyxDQUFDLDJCQUF5QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBRyxDQUFDLENBQUM7d0JBRWxFLHNCQUFPO2dDQUNMLFdBQVcsYUFBQTtnQ0FDWCxVQUFVLFlBQUE7Z0NBQ1YsS0FBSyxFQUFFLFFBQVE7Z0NBQ2YsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLOzZCQUN4QixFQUFDOzs7O0tBQ0g7SUFNSyx5QkFBUyxHQUFmLFVBQWdCLEVBQXFDO1lBQW5DLFdBQVcsaUJBQUEsRUFBRSxTQUFTLGVBQUE7Ozs7OzRCQUNwQixxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsV0FBVyxhQUFBLEVBQUUsQ0FBQyxFQUFBOzt3QkFBNUMsU0FBUyxHQUFHLFNBQWdDO3dCQUNsRCxXQUFpQyxFQUFULHVCQUFTLEVBQVQsdUJBQVMsRUFBVCxJQUFTLEVBQUU7NEJBQXhCLFNBQVM7NEJBQ2xCLElBQUksU0FBUyxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7Z0NBQ3JDLHNCQUFPLFNBQVMsRUFBQzs2QkFDbEI7eUJBQ0Y7d0JBQ0Qsc0JBQU8sS0FBSyxFQUFDOzs7O0tBQ2Q7SUFFSyx1QkFBTyxHQUFiLFVBQWMsRUFBNkU7WUFBM0UsV0FBVyxpQkFBQSxFQUFFLFdBQVcsaUJBQUEsRUFBRSxTQUFTLGVBQUEsRUFBRSxTQUFTLGVBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxNQUFNLFlBQUE7Ozs7Ozs7d0JBQzlFLElBQUksQ0FBQyxTQUFTLEVBQUU7NEJBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO3lCQUN6Qzt3QkFDSyxTQUFTLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDO3dCQUM3QyxJQUFJLFNBQVMsSUFBSSxDQUFDLFFBQVEsRUFBRTs0QkFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO3lCQUN4RDt3QkFDRCxJQUFJLFFBQVEsSUFBSSxDQUFDLFNBQVMsRUFBRTs0QkFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO3lCQUN2RDt3QkFDSyxPQUFPLEdBQUc7NEJBQ2QsV0FBVyxhQUFBOzRCQUNYLHVCQUF1QixFQUFFLEVBQUU7eUJBQzVCLENBQUM7d0JBQ0YsSUFBSSxTQUFTLEVBQUU7NEJBQ2IsT0FBTyxDQUFDLHVCQUF1QixhQUFLLEdBQUMsUUFBUSxJQUFHLE1BQU0sR0FBRyxHQUFHLEtBQUUsQ0FBQzt5QkFDaEU7d0JBRW1CLHFCQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxXQUFXLGFBQUEsRUFBRSxTQUFTLFdBQUEsRUFBRSxDQUFDLEVBQUE7O3dCQUE5RCxXQUFXLEdBQUcsU0FBZ0Q7NkJBQ2hFLFdBQVcsRUFBWCx3QkFBVzt3QkFDTixxQkFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsU0FBUyxXQUFBLEVBQUUsV0FBVyxhQUFBLEVBQUUsU0FBUyxXQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQyxFQUFBOzRCQUE3RSxzQkFBTyxTQUFzRSxFQUFDOzRCQUV2RSxxQkFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsU0FBUyxXQUFBLEVBQUUsV0FBVyxhQUFBLEVBQUUsU0FBUyxXQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQyxFQUFBOzRCQUE3RSxzQkFBTyxTQUFzRSxFQUFDOzs7O0tBRWpGO0lBRUssb0JBQUksR0FBVixVQUFXLEVBQXdDLEVBQUUsS0FBZTtZQUF2RCxXQUFXLGlCQUFBOzs7Ozs7d0JBQ3RCLGdCQUFNLENBQUMsSUFBSSxDQUFDLDBCQUF3QixXQUFhLENBQUMsQ0FBQzt3QkFDdEMscUJBQU0sZ0JBQU0sQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsZUFBYSxXQUFXLGFBQVUsRUFBRSxTQUFTLENBQUMsRUFBQTs7d0JBQTdGLElBQUksR0FBRyxTQUFzRjt3QkFDbkcsSUFBSSxLQUFLLEVBQUU7NEJBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDdEI7NkJBQU07NEJBQ0wsc0JBQU8sSUFBSSxFQUFDO3lCQUNiOzs7OztLQUNGO0lBRUssbUJBQUcsR0FBVCxVQUFVLEVBQW9DO1lBQWxDLFdBQVcsaUJBQUEsRUFBRSxTQUFTLGVBQUE7Ozs7O3dCQUNoQyxnQkFBTSxDQUFDLElBQUksQ0FBQyxvQkFBa0IsU0FBVyxDQUFDLENBQUM7d0JBQ25DLHFCQUFNLGdCQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLEVBQUE7NEJBQTlELHNCQUFPLENBQUMsU0FBc0QsQ0FBQyxDQUFDLElBQUksRUFBQzs7OztLQUN0RTtJQUVLLHNCQUFNLEdBQVosVUFBYSxFQUF1QztZQUFyQyxXQUFXLGlCQUFBLEVBQUUsU0FBUyxlQUFBOzs7Ozt3QkFDbkMsZ0JBQU0sQ0FBQyxJQUFJLENBQUMscUJBQW1CLFNBQVcsQ0FBQyxDQUFDO3dCQUNwQyxxQkFBTSxnQkFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxFQUFBOzRCQUFqRSxzQkFBTyxDQUFDLFNBQXlELENBQUMsQ0FBQyxJQUFJLEVBQUM7Ozs7S0FDekU7SUFFSyx5QkFBUyxHQUFmLFVBQWdCLEVBQTBDO1lBQXhDLFdBQVcsaUJBQUEsRUFBRSxTQUFTLGVBQUE7Ozs7OzRCQUNwQixxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsV0FBVyxhQUFBLEVBQUUsQ0FBQyxFQUFBOzt3QkFBNUMsU0FBUyxHQUFHLFNBQWdDOzZCQUU5QyxDQUFDLGdCQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFyQix3QkFBcUI7d0JBQ2pCLEdBQUcsR0FBRyw4Q0FBNEMsV0FBVyw0Q0FBeUMsQ0FBQzs2QkFDekcsU0FBUyxFQUFULHdCQUFTO3dCQUNKLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxFQUFBOzRCQUF2RCxzQkFBTyxTQUFnRCxFQUFDOzt3QkFFMUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDdEIscUJBQU0saUNBQXlCLENBQUMsR0FBRyxDQUFDLEVBQUE7OzZCQUFwQyxTQUFvQyxFQUFwQyx3QkFBb0M7d0JBQy9CLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxFQUFBOzRCQUF2RCxzQkFBTyxTQUFnRCxFQUFDOzs7OztLQUc3RDtJQUVhLDZCQUFhLEdBQTNCLFVBQTRCLFdBQW1CLEVBQUUsSUFBaUM7Ozs7Ozs4QkFDaEQsRUFBSixhQUFJOzs7NkJBQUosQ0FBQSxrQkFBSSxDQUFBO3dCQUFuQixTQUFTLHVCQUFBO3dCQUNwQixxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsV0FBVyxhQUFBLEVBQUUsU0FBUyxXQUFBLEVBQUUsQ0FBQyxFQUFBOzt3QkFBN0MsU0FBNkMsQ0FBQzs7O3dCQURwQixJQUFJLENBQUE7Ozs7OztLQUdqQztJQUVPLHlCQUFTLEdBQWpCLFVBQWtCLElBQWlDO1FBQ2pELElBQU0sVUFBVSxHQUFHO1lBQ2pCLEtBQUssRUFBRSx5QkFBeUI7WUFDaEMsU0FBUyxFQUFFLFVBQUMsS0FBSztnQkFDZixJQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLFFBQVEsRUFBRTtvQkFDWixPQUFPLHdCQUFzQixRQUFRLGtCQUFhLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLE1BQUcsQ0FBQztpQkFDNUU7Z0JBQ0QsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDO1NBQ0YsQ0FBQztRQUNGLGlCQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDNUcsQ0FBQztJQUVhLDJCQUFXLEdBQXpCLFVBQTBCLEVBQW9FO1lBQWxFLFNBQVMsZUFBQSxFQUFFLFdBQVcsaUJBQUEsRUFBRSxTQUFTLGVBQUEsRUFBRSxPQUFPLGFBQUE7Ozs7O3dCQUNwRSxnQkFBTSxDQUFDLElBQUksQ0FBQyxxQkFBbUIsU0FBVyxDQUFDLENBQUM7d0JBQzVDLHFCQUFNLGdCQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsRUFBQTs7d0JBQTdFLFNBQTZFLENBQUM7Ozs7O0tBQy9FO0lBRWEsMkJBQVcsR0FBekIsVUFBMEIsRUFBb0U7WUFBbEUsU0FBUyxlQUFBLEVBQUUsV0FBVyxpQkFBQSxFQUFFLFNBQVMsZUFBQSxFQUFFLE9BQU8sYUFBQTs7Ozs7d0JBQ3BFLGdCQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFtQixTQUFXLENBQUMsQ0FBQzt3QkFDNUMscUJBQU0sZ0JBQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxFQUFBOzt3QkFBN0UsU0FBNkUsQ0FBQzs7Ozs7S0FDL0U7SUFDSCxZQUFDO0FBQUQsQ0FBQyxBQXRLRCxJQXNLQyJ9