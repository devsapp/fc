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
            var parsedArgs, parsedData, rawData, subCommand, props, endProps, credentials, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
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
                            version: parsedData.version,
                            aliasName: parsedData['alias-name'],
                        };
                        if (!endProps.region) {
                            throw new Error('Not fount region');
                        }
                        _d = inputs.credentials;
                        if (_d) return [3 /*break*/, 2];
                        return [4 /*yield*/, core.getCredential((_c = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _c === void 0 ? void 0 : _c.access)];
                    case 1:
                        _d = (_e.sent());
                        _e.label = 2;
                    case 2:
                        credentials = _d;
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
        var region = _a.region, serviceName = _a.serviceName, version = _a.version, assumeYes = _a.assumeYes;
        return __awaiter(this, void 0, void 0, function () {
            var versionClient;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        versionClient = new version_1.default({ region: region, credentials: credentials });
                        if (version) {
                            return [2 /*return*/, versionClient.remove({ serviceName: serviceName, version: version })];
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
            var region, assumeYes, onlyLocal, serviceName, functionName, qualifier, version, aliasName, componentName_1, componentInputs_1, componentName_2, componentInputs_2, componentName, componentInputs;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        region = props.region, assumeYes = props.assumeYes, onlyLocal = props.onlyLocal, serviceName = props.serviceName, functionName = props.functionName, qualifier = props.qualifier, version = props.version, aliasName = props.aliasName;
                        if (!(subCommand === 'layer')) return [3 /*break*/, 4];
                        componentName_1 = 'devsapp/fc-layer';
                        componentInputs_1 = this.genInputs(inputs, componentName_1, props);
                        if (!version) return [3 /*break*/, 2];
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
                        return [4 /*yield*/, this.removeVersion(credentials, { region: region, serviceName: serviceName, version: version, assumeYes: assumeYes })];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnQvcmVtb3ZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw0QkFBNEI7QUFDNUIscUNBQXFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFckMsMERBQThDO0FBRTlDLHFEQUErQjtBQUMvQiwrREFBeUM7QUFDekMsMERBQW1DO0FBQ25DLDBEQUFvQztBQUNwQyxrREFBNEI7QUFDNUIsc0RBQWdDO0FBQ2hDLG1EQUF1QztBQUN2QyxrREFBdUI7QUFFdkIsSUFBTSxPQUFPLEdBQWE7SUFDeEIsU0FBUztJQUNULFVBQVU7SUFDVixTQUFTO0lBQ1QsUUFBUTtJQUNSLFNBQVM7SUFDVCxPQUFPO0lBQ1AsV0FBVztJQUNYLFVBQVU7SUFDVixPQUFPO0NBQ1IsQ0FBQztBQXlDRjtJQXNERSxnQkFBWSxFQUFzRTtZQUFwRSxNQUFNLFlBQUEsRUFBRSxXQUFXLGlCQUFBO1FBQy9CLGdCQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBdkRZLG9CQUFhLEdBQTFCLFVBQTJCLE1BQU07Ozs7Ozs7d0JBQy9CLGdCQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFpQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUcsQ0FBQyxDQUFDO3dCQUV4RCxVQUFVLEdBQXlCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFOzRCQUNqRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7NEJBQ2pCLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUU7eUJBQ3JCLENBQUMsQ0FBQzt3QkFFRyxVQUFVLEdBQUcsQ0FBQSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsSUFBSSxLQUFJLEVBQUUsQ0FBQzt3QkFD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