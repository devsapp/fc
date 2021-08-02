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
var version_1 = __importDefault(require("./version"));
var client_1 = __importDefault(require("../client"));
var logger_1 = __importDefault(require("../../common/logger"));
var utils_1 = require("../utils");
var inquirer_1 = __importDefault(require("inquirer"));
var ALIAS_COMMAND = ['list', 'get', 'publish', 'remove', 'removeAll'];
var ALIAS_COMMAND_HELP_KEY = {
    list: 'AliasListInputsArgs',
    get: 'AliasGetInputsArgs',
    publish: 'AliasPublishInputsArgs',
    remove: 'AliasDeleteInputsArgs',
    removeAll: 'AliasDeleteAllInputsArgs',
};
var Alias = /** @class */ (function () {
    function Alias() {
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
                        return [4 /*yield*/, client_1.default.setFcClient(endProps.region, credentials)];
                    case 2:
                        _c.sent();
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
            var hasWeight, parames, versionClient, versionList, answers, aliasConfig;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
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
                        if (!/^[_a-zA-Z][-_a-zA-Z0-9]*$/.test(aliasName)) {
                            throw new Error("AliasName doesn't match expected format (allowed: ^[_a-zA-Z][-_a-zA-Z0-9]*$, actual: '" + aliasName + "')");
                        }
                        if (!!versionId) return [3 /*break*/, 5];
                        versionClient = new version_1.default();
                        return [4 /*yield*/, versionClient.list({ serviceName: serviceName })];
                    case 1:
                        versionList = _c.sent();
                        if (!(versionList.length === 0)) return [3 /*break*/, 2];
                        throw new Error('Not fount version.Please use [s version publish --description xxx] to publish the version');
                    case 2:
                        if (!(versionList.length === 1)) return [3 /*break*/, 3];
                        versionId = versionList[0].versionId;
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, inquirer_1.default.prompt([{
                                type: 'list',
                                name: 'versionId',
                                message: 'Please select the version pointed to by the alias, and display the latest 20 versions. If you want to see more, please execute [s version list --table]',
                                choices: versionList.slice(0, 20).map(function (item) { return item.versionId; }),
                            }])];
                    case 4:
                        answers = _c.sent();
                        versionId = answers.versionId;
                        _c.label = 5;
                    case 5: return [4 /*yield*/, this.findAlias({ serviceName: serviceName, aliasName: aliasName })];
                    case 6:
                        aliasConfig = _c.sent();
                        if (!aliasConfig) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.updateAlias({ aliasName: aliasName, serviceName: serviceName, versionId: versionId, parames: parames })];
                    case 7: return [2 /*return*/, _c.sent()];
                    case 8: return [4 /*yield*/, this.createAlias({ aliasName: aliasName, serviceName: serviceName, versionId: versionId, parames: parames })];
                    case 9: return [2 /*return*/, _c.sent()];
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
                        meg = "Alias configuration exists under service " + serviceName + ", whether to delete all alias resources.To delete only a single configuration, execute [s remove alias --alias-name xxx]";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpYXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NvbXBvbmVudC9hbGlhcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBcUM7QUFDckMsMERBQThDO0FBRTlDLGtEQUF1QjtBQUN2QixzREFBZ0M7QUFDaEMscURBQStCO0FBQy9CLCtEQUF5QztBQUN6QyxrQ0FBZ0Y7QUFDaEYsc0RBQWdDO0FBMkJoQyxJQUFNLGFBQWEsR0FBYSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUNsRixJQUFNLHNCQUFzQixHQUE0QjtJQUN0RCxJQUFJLEVBQUUscUJBQXFCO0lBQzNCLEdBQUcsRUFBRSxvQkFBb0I7SUFDekIsT0FBTyxFQUFFLHdCQUF3QjtJQUNqQyxNQUFNLEVBQUUsdUJBQXVCO0lBQy9CLFNBQVMsRUFBRSwwQkFBMEI7Q0FDdEMsQ0FBQztBQUVGO0lBQUE7SUF1TEEsQ0FBQztJQXRMYyxtQkFBYSxHQUExQixVQUEyQixNQUFNOzs7Ozs7O3dCQUMvQixnQkFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBaUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFHLENBQUMsQ0FBQzt3QkFFeEQsVUFBVSxHQUF5QixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTs0QkFDakUsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUM7NEJBQy9CLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDOzRCQUNqRixNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUM7NEJBQ2xCLEtBQUssRUFBRSxFQUFFLElBQUksRUFB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