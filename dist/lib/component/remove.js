"use strict";
/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
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
var on_demand_1 = __importDefault(require("./on-demand"));
var provision_1 = __importDefault(require("./provision"));
var alias_1 = __importDefault(require("./alias"));
var version_1 = __importDefault(require("./version"));
var HELP = __importStar(require("../help/remove"));
var lodash_1 = __importDefault(require("lodash"));
var utils_1 = require("../utils");
var COMMAND = [
    'service',
    'function',
    'trigger',
    'domain',
    'version',
    'alias',
    'provision',
    'onDemand',
    'layer',
];
var Remove = /** @class */ (function () {
    function Remove(_a) {
        var region = _a.region, credentials = _a.credentials;
        client_1.default.setFcClient(region, credentials);
    }
    Remove.handlerInputs = function (inputs) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var parsedArgs, parsedData, rawData, subCommand, props, endProps, credentials;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        logger_1.default.debug("inputs.props: " + JSON.stringify(inputs.props));
                        parsedArgs = core.commandParse(inputs, {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        });
                        parsedData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                        rawData = parsedData._ || [];
                        subCommand = rawData[0] || 'service';
                        logger_1.default.debug("remove subCommand: " + subCommand);
                        if (!COMMAND.includes(subCommand)) {
                            core.help(HELP.REMOVE);
                            return [2 /*return*/, { errorMessage: "Does not support " + subCommand + " command" }];
                        }
                        if (parsedData.help) {
                            rawData[0] ? core.help(HELP[("remove_" + subCommand).toLocaleUpperCase()]) : core.help(HELP.REMOVE);
                            return [2 /*return*/, { help: true, subCommand: subCommand }];
                        }
                        props = inputs.props || {};
                        endProps = {
                            region: parsedData.region || props.region,
                            assumeYes: parsedData['assume-yes'] || parsedData.y,
                            onlyLocal: parsedData['use-local'],
                            serviceName: parsedData['service-name'] || ((_a = props.service) === null || _a === void 0 ? void 0 : _a.name),
                            functionName: parsedData['function-name'] || ((_b = props.function) === null || _b === void 0 ? void 0 : _b.name),
                            qualifier: parsedData.qualifier,
                            layerName: parsedData['layer-name'],
                            versionId: parsedData['version-id'] || parsedData.id,
                            aliasName: parsedData['alias-name'],
                        };
                        if (!endProps.region) {
                            throw new Error('Not fount region');
                        }
                        return [4 /*yield*/, utils_1.getCredentials(inputs.credentials, (_c = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _c === void 0 ? void 0 : _c.access)];
                    case 1:
                        credentials = _d.sent();
                        logger_1.default.debug("handler inputs props: " + JSON.stringify(endProps));
                        return [2 /*return*/, {
                                credentials: credentials,
                                subCommand: subCommand,
                                props: endProps,
                                args: props.args,
                                table: parsedData.table,
                            }];
                }
            });
        });
    };
    Remove.prototype.removeOnDemand = function (credentials, _a) {
        var region = _a.region, qualifier = _a.qualifier, serviceName = _a.serviceName, functionName = _a.functionName, assumeYes = _a.assumeYes;
        return __awaiter(this, void 0, void 0, function () {
            var onDemand;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!lodash_1.default.isEmpty(qualifier) && lodash_1.default.isEmpty(functionName)) {
                            throw new Error('not fount functionName');
                        }
                        onDemand = new on_demand_1.default({ region: region, credentials: credentials });
                        if (!!lodash_1.default.isEmpty(qualifier)) return [3 /*break*/, 2];
                        return [4 /*yield*/, onDemand.remove({ qualifier: qualifier, serviceName: serviceName, functionName: functionName })];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2: return [4 /*yield*/, onDemand.removeAll({ serviceName: serviceName, qualifier: qualifier, assumeYes: assumeYes })];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Remove.prototype.removeProvision = function (credentials, _a) {
        var region = _a.region, qualifier = _a.qualifier, serviceName = _a.serviceName, functionName = _a.functionName, assumeYes = _a.assumeYes;
        return __awaiter(this, void 0, void 0, function () {
            var provision;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!lodash_1.default.isEmpty(qualifier) && lodash_1.default.isEmpty(functionName)) {
                            throw new Error('not fount functionName');
                        }
                        provision = new provision_1.default({ region: region, credentials: credentials });
                        if (!!lodash_1.default.isEmpty(qualifier)) return [3 /*break*/, 2];
                        return [4 /*yield*/, provision.put({ qualifier: qualifier, serviceName: serviceName, functionName: functionName, target: 0 })];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2: return [4 /*yield*/, provision.removeAll({ serviceName: serviceName, qualifier: qualifier, assumeYes: assumeYes })];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Remove.prototype.removeAlias = function (credentials, _a) {
        var region = _a.region, serviceName = _a.serviceName, aliasName = _a.aliasName, assumeYes = _a.assumeYes;
        return __awaiter(this, void 0, void 0, function () {
            var alias;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        alias = new alias_1.default({ region: region, credentials: credentials });
                        if (aliasName) {
                            return [2 /*return*/, alias.remove({ serviceName: serviceName, aliasName: aliasName })];
                        }
                        return [4 /*yield*/, alias.removeAll({ serviceName: serviceName, assumeYes: assumeYes })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    Remove.prototype.removeVersion = function (credentials, _a) {
        var region = _a.region, serviceName = _a.serviceName, versionId = _a.versionId, assumeYes = _a.assumeYes;
        return __awaiter(this, void 0, void 0, function () {
            var versionClient;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        versionClient = new version_1.default({ region: region, credentials: credentials });
                        if (versionId) {
                            return [2 /*return*/, versionClient.remove({ serviceName: serviceName, versionId: versionId })];
                        }
                        return [4 /*yield*/, versionClient.removeAll({ serviceName: serviceName, assumeYes: assumeYes })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    Remove.prototype.remove = function (_a, inputs) {
        var props = _a.props, subCommand = _a.subCommand, credentials = _a.credentials;
        return __awaiter(this, void 0, void 0, function () {
            var region, assumeYes, onlyLocal, serviceName, functionName, qualifier, versionId, aliasName, componentName_1, componentInputs_1, componentName_2, componentInputs_2, componentName, componentInputs;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        region = props.region, assumeYes = props.assumeYes, onlyLocal = props.onlyLocal, serviceName = props.serviceName, functionName = props.functionName, qualifier = props.qualifier, versionId = props.versionId, aliasName = props.aliasName;
                        if (!(subCommand === 'layer')) return [3 /*break*/, 4];
                        componentName_1 = 'devsapp/fc-layer';
                        componentInputs_1 = this.genInputs(inputs, componentName_1, props);
                        if (!versionId) return [3 /*break*/, 2];
                        return [4 /*yield*/, core.loadComponent(componentName_1)];
                    case 1: return [2 /*return*/, (_b.sent()).deleteVersion(componentInputs_1)];
                    case 2: return [4 /*yield*/, core.loadComponent(componentName_1)];
                    case 3: return [2 /*return*/, (_b.sent()).deleteLayer(componentInputs_1)];
                    case 4:
                        if (!(subCommand === 'domain')) return [3 /*break*/, 6];
                        componentName_2 = 'devsapp/fc-deploy';
                        componentInputs_2 = this.genInputs(inputs, componentName_2, inputs.props);
                        return [4 /*yield*/, core.loadComponent(componentName_2)];
                    case 5: return [2 /*return*/, (_b.sent()).remove(componentInputs_2)];
                    case 6:
                        if (lodash_1.default.isEmpty(serviceName)) {
                            throw new Error('not fount serviceName');
                        }
                        if (!(subCommand === 'onDemand')) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.removeOnDemand(credentials, { region: region, qualifier: qualifier, serviceName: serviceName, functionName: functionName, assumeYes: assumeYes })];
                    case 7: return [2 /*return*/, _b.sent()];
                    case 8:
                        if (!(subCommand === 'provision')) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.removeProvision(credentials, { region: region, qualifier: qualifier, serviceName: serviceName, functionName: functionName, assumeYes: assumeYes })];
                    case 9: return [2 /*return*/, _b.sent()];
                    case 10:
                        if (!(subCommand === 'alias')) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.removeAlias(credentials, { region: region, serviceName: serviceName, aliasName: aliasName, assumeYes: assumeYes })];
                    case 11: return [2 /*return*/, _b.sent()];
                    case 12:
                        if (!(subCommand === 'version')) return [3 /*break*/, 14];
                        return [4 /*yield*/, this.removeVersion(credentials, { region: region, serviceName: serviceName, versionId: versionId, assumeYes: assumeYes })];
                    case 13: return [2 /*return*/, _b.sent()];
                    case 14:
                        if (!(!onlyLocal && subCommand === 'service')) return [3 /*break*/, 19];
                        return [4 /*yield*/, this.removeOnDemand(credentials, { region: region, serviceName: serviceName, assumeYes: assumeYes })];
                    case 15:
                        _b.sent();
                        return [4 /*yield*/, this.removeProvision(credentials, { region: region, serviceName: serviceName, assumeYes: assumeYes })];
                    case 16:
                        _b.sent();
                        return [4 /*yield*/, this.removeAlias(credentials, { region: region, serviceName: serviceName, assumeYes: assumeYes })];
                    case 17:
                        _b.sent();
                        return [4 /*yield*/, this.removeVersion(credentials, { region: region, serviceName: serviceName, assumeYes: assumeYes })];
                    case 18:
                        _b.sent();
                        _b.label = 19;
                    case 19:
                        componentName = 'devsapp/fc-deploy';
                        componentInputs = this.genInputs(inputs, componentName, inputs.props);
                        return [4 /*yield*/, core.loadComponent(componentName)];
                    case 20: return [2 /*return*/, (_b.sent()).remove(componentInputs)];
                }
            });
        });
    };
    Remove.prototype.genInputs = function (_a, componentName, props) {
        var appName = _a.appName, projectName = _a.projectName, access = _a.access, args = _a.args, curPath = _a.curPath;
        return {
            project: {
                component: componentName,
                projectName: projectName + "-" + componentName + "-project",
                access: access,
            },
            appName: appName,
            props: props,
            args: args,
            path: curPath,
        };
    };
    return Remove;
}());
exports.default = Remove;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnQvcmVtb3ZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw0QkFBNEI7QUFDNUIscUNBQXFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFckMsMERBQThDO0FBRTlDLHFEQUErQjtBQUMvQiwrREFBeUM7QUFDekMsMERBQW1DO0FBQ25DLDBEQUFvQztBQUNwQyxrREFBNEI7QUFDNUIsc0RBQWdDO0FBQ2hDLG1EQUF1QztBQUN2QyxrREFBdUI7QUFDdkIsa0NBQTBDO0FBRTFDLElBQU0sT0FBTyxHQUFhO0lBQ3hCLFNBQVM7SUFDVCxVQUFVO0lBQ1YsU0FBUztJQUNULFFBQVE7SUFDUixTQUFTO0lBQ1QsT0FBTztJQUNQLFdBQVc7SUFDWCxVQUFVO0lBQ1YsT0FBTztDQUNSLENBQUM7QUF5Q0Y7SUFzREUsZ0JBQVksRUFBc0U7WUFBcEUsTUFBTSxZQUFBLEVBQUUsV0FBVyxpQkFBQTtRQUMvQixnQkFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQXZEWSxvQkFBYSxHQUExQixVQUEyQixNQUFNOzs7Ozs7O3dCQUMvQixnQkFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBaUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFHLENBQUMsQ0FBQzt3QkFFeEQsVUFBVSxHQUF5QixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTs0QkFDakUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDOzRCQUNqQixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFO3lCQUNyQixDQUFDLENBQUM7d0JBRUcsVUFBVSxHQUFHLENBQUEsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLElBQUksS0FBSSxF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