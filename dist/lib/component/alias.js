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
var core = __importStar(require("@serverless-devs/core"));
var client_1 = __importDefault(require("../client"));
var logger_1 = __importDefault(require("../../common/logger"));
var help_constant = __importStar(require("../help/alias"));
var utils_1 = require("../utils");
var ALIAS_COMMAND = ['list', 'get', 'publish', 'delete', 'deleteAll'];
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
                            boolean: ['help', 'table'],
                            string: ['region', 'service-name', 'description', 'alias-name', 'id', 'gversion'],
                            number: ['weight'],
                            alias: { help: 'h', 'version-id': 'id' },
                        });
                        parsedData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                        rawData = parsedData._ || [];
                        if (!rawData.length) {
                            core.help(help_constant.ALIAS);
                            process.exit();
                        }
                        subCommand = rawData[0];
                        logger_1.default.debug("version subCommand: " + subCommand);
                        if (!ALIAS_COMMAND.includes(subCommand)) {
                            core.help(help_constant.ALIAS);
                            return [2 /*return*/, { errorMessage: "Does not support " + subCommand + " command" }];
                        }
                        if (parsedData.help) {
                            core.help(help_constant[("alias_" + subCommand).toLocaleUpperCase()]);
                            return [2 /*return*/, { help: true, subCommand: subCommand }];
                        }
                        props = inputs.props || {};
                        endProps = {
                            region: parsedData.region || props.region,
                            serviceName: parsedData['service-name'] || ((_a = props.service) === null || _a === void 0 ? void 0 : _a.name),
                            description: parsedData.description,
                            versionId: parsedData.id,
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
        var serviceName = _a.serviceName, description = _a.description, aliasName = _a.aliasName, versionId = _a.versionId, gversion = _a.gversion, weight = _a.weight;
        return __awaiter(this, void 0, void 0, function () {
            var hasWeight, parames, aliasConfig;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!versionId) {
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
            var data, showWeight;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger_1.default.info("Getting listAliases: " + serviceName);
                        return [4 /*yield*/, client_1.default.fcClient.get_all_list_data("/services/" + serviceName + "/aliases", 'aliases')];
                    case 1:
                        data = _b.sent();
                        if (table) {
                            showWeight = {
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
    Alias.prototype.delete = function (_a) {
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
    Alias.prototype.deleteAll = function (_a) {
        var serviceName = _a.serviceName;
        return __awaiter(this, void 0, void 0, function () {
            var aliasList, _i, aliasList_2, aliasName;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.list({ serviceName: serviceName })];
                    case 1:
                        aliasList = _b.sent();
                        _i = 0, aliasList_2 = aliasList;
                        _b.label = 2;
                    case 2:
                        if (!(_i < aliasList_2.length)) return [3 /*break*/, 5];
                        aliasName = aliasList_2[_i].aliasName;
                        return [4 /*yield*/, this.delete({ serviceName: serviceName, aliasName: aliasName })];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpYXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NvbXBvbmVudC9hbGlhcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBOEM7QUFFOUMscURBQStCO0FBQy9CLCtEQUF5QztBQUN6QywyREFBK0M7QUFDL0Msa0NBQXFDO0FBWXJDLElBQU0sYUFBYSxHQUFhLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBRWxGO0lBNERFLGVBQVksRUFBdUI7WUFBckIsTUFBTSxZQUFBLEVBQUUsV0FBVyxpQkFBQTtRQUMvQixnQkFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQTdEWSxtQkFBYSxHQUExQixVQUEyQixNQUFNOzs7Ozs7O3dCQUMvQixnQkFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBaUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFHLENBQUMsQ0FBQzt3QkFFeEQsVUFBVSxHQUF5QixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTs0QkFDakUsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQzs0QkFDMUIsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUM7NEJBQ2pGLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQzs0QkFDbEIsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFO3lCQUN6QyxDQUFDLENBQUM7d0JBRUcsVUFBVSxHQUFHLENBQUEsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLElB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