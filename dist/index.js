"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var _ = __importStar(require("lodash"));
var logger_1 = __importDefault(require("./common/logger"));
var help_1 = require("./lib/help");
var DEPLOY_HELP = __importStar(require("./lib/help/deploy"));
var tarnsform_nas_1 = __importDefault(require("./lib/tarnsform-nas"));
var sls_1 = require("./lib/interface/sls");
var utils_1 = require("./lib/utils");
var tips = __importStar(require("./lib/tips"));
var fc_stress_1 = __importDefault(require("./lib/component/fc-stress"));
var version_1 = __importDefault(require("./lib/component/version"));
var alias_1 = __importDefault(require("./lib/component/alias"));
var on_demand_1 = __importDefault(require("./lib/component/on-demand"));
var remove_1 = __importDefault(require("./lib/component/remove"));
var provision_1 = __importDefault(require("./lib/component/provision"));
var yaml = __importStar(require("js-yaml"));
var base_1 = __importDefault(require("./common/base"));
var fc_proxied_invoke_1 = __importDefault(require("./lib/component/fc-proxied-invoke"));
var proxied = __importStar(require("./command/proxied"));
logger_1.default.setContent('FC');
var SUPPORTED_LOCAL_METHOD = ['invoke', 'start'];
var FcBaseComponent = /** @class */ (function (_super) {
    __extends(FcBaseComponent, _super);
    function FcBaseComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.logger = logger_1.default;
        return _this;
    }
    FcBaseComponent.prototype.deploy = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, props, args, parsedArgs, parsedData, rawData, commandList, subCommand, deployRes, result, temp_url, i, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.handlerComponentInputs(inputs), props = _a.props, args = _a.args;
                        parsedArgs = core.commandParse(inputs, {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        });
                        parsedData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                        rawData = parsedData._ || [];
                        commandList = ['all', 'service', 'function', 'trigger', 'domain'];
                        subCommand = rawData[0] || 'all';
                        this.logger.debug("deploy subCommand: " + subCommand);
                        if (!commandList.includes(subCommand)) {
                            return [2 /*return*/, core.help(DEPLOY_HELP.DEPLOY)];
                        }
                        if (parsedData.help) {
                            rawData[0] ? core.help(DEPLOY_HELP[("DEPLOY_" + subCommand).toLocaleUpperCase()]) : core.help(DEPLOY_HELP.DEPLOY);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/fc-deploy', 'deploy', props, args)];
                    case 1:
                        deployRes = _b.sent();
                        tips.showNextTip(args, tips.showDeployNextTips);
                        console.log('\n\n');
                        result = {};
                        if (deployRes.region) {
                            result.region = deployRes.region;
                        }
                        if (deployRes.service) {
                            result.service = {};
                            if (deployRes.service.name) {
                                result.service.name = deployRes.service.name;
                            }
                        }
                        if (deployRes.function) {
                            result.function = {};
                            if (deployRes.function.name) {
                                result.function.name = deployRes.function.name;
                            }
                            if (deployRes.function.runtime) {
                                result.function.runtime = deployRes.function.runtime;
                            }
                            if (deployRes.function.handler) {
                                result.function.handler = deployRes.function.handler;
                            }
                            if (deployRes.function.memorySize) {
                                result.function.memorySize = deployRes.function.memorySize;
                            }
                            if (deployRes.function.timeout) {
                                result.function.timeout = deployRes.function.timeout;
                            }
                        }
                        if (deployRes.systemDomain) {
                            result.url = {
                                system_url: deployRes.systemDomain,
                            };
                        }
                        if (deployRes.customDomains) {
                            result.url = result.url || {};
                            temp_url = [];
                            for (i = 0; i < deployRes.customDomains.length; i++) {
                                temp_url.push({
                                    domain: deployRes.customDomains[i].domainName,
                                    path: deployRes.customDomains[i].path,
                                });
                            }
                            result.url.custom_domain = temp_url;
                        }
                        if (deployRes.triggers) {
                            result.triggers = [];
                            for (i = 0; i < deployRes.triggers.length; i++) {
                                result.triggers.push({
                                    type: deployRes.triggers[i].type,
                                    name: deployRes.triggers[i].name,
                                });
                            }
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    FcBaseComponent.prototype.remove = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, credentials, help, props, subCommand, errorMessage;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, remove_1.default.handlerInputs(inputs)];
                    case 1:
                        _a = _b.sent(), credentials = _a.credentials, help = _a.help, props = _a.props, subCommand = _a.subCommand, errorMessage = _a.errorMessage;
                        return [4 /*yield*/, this.report('fc', subCommand ? "remove " + subCommand : 'remove', credentials === null || credentials === void 0 ? void 0 : credentials.AccountID)];
                    case 2:
                        _b.sent();
                        if (errorMessage) {
                            throw new Error(errorMessage);
                        }
                        if (help) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, new remove_1.default().remove({
                                props: props,
                                subCommand: subCommand,
                            }, this.handlerInputs(inputs))];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.info = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, props, args, propsGenerator;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.handlerComponentInputs(inputs), props = _a.props, args = _a.args;
                        if (this.isHelp(args)) {
                            _super.prototype.help.call(this, 'InfoInputsArgs');
                            return [2 /*return*/];
                        }
                        propsGenerator = function (property) {
                            var _a, _b, _c;
                            if (_.isEmpty(property)) {
                                return null;
                            }
                            var res = {
                                region: property === null || property === void 0 ? void 0 : property.region,
                                serviceName: (_a = property === null || property === void 0 ? void 0 : property.service) === null || _a === void 0 ? void 0 : _a.name,
                            };
                            if (!_.isNil((_b = property === null || property === void 0 ? void 0 : property.function) === null || _b === void 0 ? void 0 : _b.name)) {
                                Object.assign(res, {
                                    functionName: (_c = property === null || property === void 0 ? void 0 : property.function) === null || _c === void 0 ? void 0 : _c.name,
                                });
                            }
                            if (!_.isEmpty(property === null || property === void 0 ? void 0 : property.triggers)) {
                                Object.assign(res, {
                                    triggerNames: property === null || property === void 0 ? void 0 : property.triggers.map(function (t) { return t.name; }),
                                });
                            }
                            return res;
                        };
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/fc-info', 'info', propsGenerator(props), args)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.sync = function (inputs) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var _d, props, args, property;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _d = this.handlerComponentInputs(inputs), props = _d.props, args = _d.args;
                        if (this.isHelp(args)) {
                            _super.prototype.help.call(this, 'SyncInputsArgs');
                            return [2 /*return*/];
                        }
                        if (!_.isEmpty(props)) {
                            property = {
                                region: props === null || props === void 0 ? void 0 : props.region,
                                serviceName: (_a = props === null || props === void 0 ? void 0 : props.service) === null || _a === void 0 ? void 0 : _a.name,
                            };
                            if (!_.isNil((_b = props === null || props === void 0 ? void 0 : props.function) === null || _b === void 0 ? void 0 : _b.name)) {
                                property.functionName = (_c = props === null || props === void 0 ? void 0 : props.function) === null || _c === void 0 ? void 0 : _c.name;
                            }
                        }
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/fc-sync', 'sync', property, args)];
                    case 1: return [2 /*return*/, _e.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.build = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, props, args, parsedArgs;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = this.handlerComponentInputs(inputs), props = _b.props, args = _b.args;
                        parsedArgs = core.commandParse({ args: args }, {
                            boolean: ['help'],
                            alias: { help: 'h' }
                        });
                        if ((_a = parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) === null || _a === void 0 ? void 0 : _a.help) {
                            core.help(help_1.BUILD_HELP_INFO);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/fc-build', 'build', props, args)];
                    case 1:
                        _c.sent();
                        tips.showNextTip(args, tips.showBuildNextTips);
                        return [2 /*return*/];
                }
            });
        });
    };
    FcBaseComponent.prototype.local = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, props, args, parsedArgs, argsData, nonOptionsArgs, methodName, fcLocalInvokeArgs, localRes;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = this.handlerComponentInputs(inputs), props = _b.props, args = _b.args;
                        parsedArgs = core.commandParse({ args: args }, {
                            boolean: ['help'],
                            alias: { help: 'h' }
                        });
                        argsData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                        nonOptionsArgs = (_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a._;
                        if ((argsData === null || argsData === void 0 ? void 0 : argsData.help) && nonOptionsArgs.length === 0) {
                            core.help(help_1.LOCAL_HELP_INFO);
                            return [2 /*return*/];
                        }
                        if (!nonOptionsArgs || nonOptionsArgs.length === 0) {
                            this.logger.error(' Error: expects argument invoke/start.');
                            // help info
                            return [2 /*return*/];
                        }
                        methodName = nonOptionsArgs[0];
                        if (!SUPPORTED_LOCAL_METHOD.includes(methodName)) {
                            this.logger.error("Unsupported subcommand " + methodName + " for local method, only start and invoke are supported.");
                            return [2 /*return*/];
                        }
                        if ((argsData === null || argsData === void 0 ? void 0 : argsData.help) && methodName === 'start') {
                            core.help(help_1.LOCAL_START_HELP_INFO);
                            return [2 /*return*/];
                        }
                        if ((argsData === null || argsData === void 0 ? void 0 : argsData.help) && methodName === 'invoke') {
                            core.help(help_1.LOCAL_INVOKE_HELP_INFO);
                            return [2 /*return*/];
                        }
                        fcLocalInvokeArgs = args ? args.replace(methodName, '').replace(/(^\s*)|(\s*$)/g, '') : '';
                        this.logger.debug("Args of fc-info is: " + fcLocalInvokeArgs);
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/fc-local-invoke', methodName, props, fcLocalInvokeArgs)];
                    case 1:
                        localRes = _c.sent();
                        tips.showNextTip(args, tips.showLocalNextTips);
                        return [2 /*return*/, localRes];
                }
            });
        });
    };
    FcBaseComponent.prototype.invoke = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, props, args, invokePayload;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _c = this.handlerComponentInputs(inputs), props = _c.props, args = _c.args;
                        if (this.isHelp(args)) {
                            _super.prototype.help.call(this, 'InvokeInputsArgs');
                            return [2 /*return*/];
                        }
                        invokePayload = {
                            region: props === null || props === void 0 ? void 0 : props.region,
                            serviceName: (_a = props === null || props === void 0 ? void 0 : props.service) === null || _a === void 0 ? void 0 : _a.name,
                            functionName: (_b = props === null || props === void 0 ? void 0 : props.function) === null || _b === void 0 ? void 0 : _b.name,
                        };
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/fc-remote-invoke', 'invoke', invokePayload, args)];
                    case 1:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcBaseComponent.prototype.logs = function (inputs) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var _d, props, args, comParse, _e, region, serviceName, functionName, logsPayload, logConfig, ex_1;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _d = this.handlerComponentInputs(inputs), props = _d.props, args = _d.args;
                        comParse = (_a = core.commandParse({ args: args }, {
                            boolean: ['help'],
                            string: ['region', 'service-name', 'function-name'],
                            alias: { help: 'h' },
                        })) === null || _a === void 0 ? void 0 : _a.data;
                        if (comParse === null || comParse === void 0 ? void 0 : comParse.help) {
                            _super.prototype.help.call(this, 'LogsInputsArgs');
                            return [2 /*return*/];
                        }
                        _e = utils_1.getFcNames(comParse, props), region = _e.region, serviceName = _e.serviceName, functionName = _e.functionName;
                        this.logger.debug("[logs] region: " + region + ", serviceName: " + serviceName + ", functionName: " + functionName);
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.info(__assign(__assign({}, inputs), { props: {
                                    region: region,
                                    service: { name: serviceName },
                                    // @ts-ignore
                                    function: { name: functionName },
                                }, args: '' }))];
                    case 2:
                        logConfig = ((_f.sent()).service || {}).logConfig;
                        if (!sls_1.isLogConfig(logConfig)) {
                            throw new Error('The service logConfig is not found online, please confirm whether logConfig is configured first, and then execute [s exec - deploy].');
                        }
                        logsPayload = {
                            logConfig: logConfig,
                            region: region,
                            topic: serviceName,
                            query: (_b = props === null || props === void 0 ? void 0 : props.function) === null || _b === void 0 ? void 0 : _b.name,
                        };
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _f.sent();
                        if ((_c = ex_1.code) === null || _c === void 0 ? void 0 : _c.endsWith('NotFound')) {
                            throw new Error("Online search failed, error message: " + ex_1.message + ". Please execute [s exec -- deploy]");
                        }
                        throw ex_1;
                    case 4: return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/logs', 'logs', logsPayload, args)];
                    case 5:
                        _f.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcBaseComponent.prototype.metrics = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, props, args, comParse, payload;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = this.handlerComponentInputs(inputs), props = _b.props, args = _b.args;
                        comParse = (_a = core.commandParse({ args: args }, {
                            boolean: ['help'],
                            string: ['region', 'service-name', 'function-name'],
                            alias: { help: 'h' },
                        })) === null || _a === void 0 ? void 0 : _a.data;
                        if (comParse === null || comParse === void 0 ? void 0 : comParse.help) {
                            _super.prototype.help.call(this, 'MetricsInputsArgs');
                            return [2 /*return*/];
                        }
                        payload = utils_1.getFcNames(comParse, props);
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/fc-metrics', 'metrics', payload, args)];
                    case 1:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcBaseComponent.prototype.nas = function (inputs) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var _d, props, args, project, SUPPORTED_METHOD, apts, comParse, nonOptionsArgs, commandName, tarnsformArgs, payload;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _d = this.handlerComponentInputs(inputs), props = _d.props, args = _d.args, project = _d.project;
                        SUPPORTED_METHOD = ['remove', 'deploy', 'ls', 'cp', 'rm', 'download', 'upload', 'command'];
                        apts = {
                            boolean: ['all', 'long', 'help', 'recursive', 'no-clobber', 'force'],
                            alias: { force: 'f', 'no-clobber': 'n', recursive: 'r', help: 'h', all: 'a', long: 'l' },
                        };
                        comParse = core.commandParse({ args: args }, apts);
                        nonOptionsArgs = ((_a = comParse.data) === null || _a === void 0 ? void 0 : _a._) || [];
                        this.logger.debug("nonOptionsArgs is " + JSON.stringify(nonOptionsArgs));
                        if (!(comParse === null || comParse === void 0 ? void 0 : comParse.data)) {
                            this.logger.error('Not fount sub-command.');
                            core.help(help_1.NAS_HELP_INFO);
                            return [2 /*return*/];
                        }
                        if (nonOptionsArgs.length === 0) {
                            if (!((_b = comParse === null || comParse === void 0 ? void 0 : comParse.data) === null || _b === void 0 ? void 0 : _b.help)) {
                                this.logger.error('Not fount sub-command.');
                            }
                            core.help(help_1.NAS_HELP_INFO);
                            return [2 /*return*/];
                        }
                        commandName = nonOptionsArgs[0];
                        if (!SUPPORTED_METHOD.includes(commandName)) {
                            this.logger.error("Not supported sub-command: [" + commandName + "]");
                            core.help(help_1.NAS_HELP_INFO);
                            return [2 /*return*/];
                        }
                        tarnsformArgs = args.replace(commandName, '').replace(/(^\s*)|(\s*$)/g, '');
                        if (tarnsformArgs.startsWith('cp ')) {
                            throw new Error('Not supported command cp, please [s nas upload <option>]');
                        }
                        if ((_c = comParse === null || comParse === void 0 ? void 0 : comParse.data) === null || _c === void 0 ? void 0 : _c.help) {
                            core.help(help_1.NAS_SUB_COMMAND_HELP_INFO[commandName]);
                            return [2 /*return*/];
                        }
                        nonOptionsArgs.shift();
                        return [4 /*yield*/, tarnsform_nas_1.default(props, nonOptionsArgs, tarnsformArgs, project === null || project === void 0 ? void 0 : project.access, commandName, inputs.credentials)];
                    case 1:
                        payload = _e.sent();
                        this.logger.debug("tarnsform nas payload: " + JSON.stringify(payload.payload) + ", args: " + payload.tarnsformArgs + ", command: " + commandName);
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/nas', commandName, payload.payload, payload.tarnsformArgs)];
                    case 2:
                        _e.sent();
                        tips.showNasNextTips();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcBaseComponent.prototype.stress = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, props, project, SUPPORTED_METHOD, STRESS_SUB_COMMAND_HELP_KEY, apts, comParse, argsData, nonOptionsArgs, commandName, stressOpts, eventTypeOpts, httpTypeOpts, payloadOpts, fcStress, fcStressArgs;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _c = this.handlerComponentInputs(inputs), props = _c.props, project = _c.project;
                        SUPPORTED_METHOD = ['start', 'clean'];
                        STRESS_SUB_COMMAND_HELP_KEY = {
                            start: 'StressStartInputsArgs',
                            clean: 'StressCleanInputsArgs',
                        };
                        apts = {
                            boolean: ['help', 'assume-yes'],
                            alias: {
                                help: 'h',
                                region: 'r',
                                access: 'a',
                                qualifier: 'q',
                                url: 'u',
                                method: 'm',
                                payload: 'p',
                                'payload-file': 'f',
                                'assume-yes': 'y',
                            },
                        };
                        comParse = core.commandParse(inputs, apts);
                        argsData = (comParse === null || comParse === void 0 ? void 0 : comParse.data) || {};
                        nonOptionsArgs = (argsData === null || argsData === void 0 ? void 0 : argsData._) || [];
                        this.logger.debug("nonOptionsArgs is " + JSON.stringify(nonOptionsArgs));
                        if (!argsData) {
                            this.logger.error('Not fount sub-command.');
                            _super.prototype.help.call(this, 'StressInputsArgs');
                            return [2 /*return*/];
                        }
                        if (nonOptionsArgs.length === 0) {
                            if (!(argsData === null || argsData === void 0 ? void 0 : argsData.help)) {
                                this.logger.error('Not fount sub-command.');
                            }
                            _super.prototype.help.call(this, 'StressInputsArgs');
                            return [2 /*return*/];
                        }
                        commandName = nonOptionsArgs[0];
                        if (!SUPPORTED_METHOD.includes(commandName)) {
                            this.logger.error("Not supported sub-command: [" + commandName + "]");
                            _super.prototype.help.call(this, 'StressInputsArgs');
                            return [2 /*return*/];
                        }
                        if (argsData === null || argsData === void 0 ? void 0 : argsData.help) {
                            _super.prototype.help.call(this, STRESS_SUB_COMMAND_HELP_KEY[commandName]);
                            return [2 /*return*/];
                        }
                        stressOpts = {
                            functionType: argsData['function-type'] || utils_1.isHttpFunction(props) ? 'http' : 'event',
                            numUser: argsData['num-user'],
                            spawnRate: argsData['spawn-rate'],
                            runningTime: argsData['run-time'],
                        };
                        eventTypeOpts = null;
                        httpTypeOpts = null;
                        if ((stressOpts === null || stressOpts === void 0 ? void 0 : stressOpts.functionType) === 'event') {
                            eventTypeOpts = {
                                serviceName: argsData['service-name'] || ((_a = props === null || props === void 0 ? void 0 : props.service) === null || _a === void 0 ? void 0 : _a.name),
                                functionName: argsData['function-name'] || ((_b = props === null || props === void 0 ? void 0 : props.function) === null || _b === void 0 ? void 0 : _b.name),
                                qualifier: argsData === null || argsData === void 0 ? void 0 : argsData.qualifier,
                            };
                            this.logger.debug("Using event options: \n" + yaml.dump(eventTypeOpts));
                        }
                        else if ((stressOpts === null || stressOpts === void 0 ? void 0 : stressOpts.functionType) === 'http') {
                            httpTypeOpts = {
                                url: argsData === null || argsData === void 0 ? void 0 : argsData.url,
                                method: argsData === null || argsData === void 0 ? void 0 : argsData.method,
                            };
                            this.logger.debug("Using http options: \n" + yaml.dump(httpTypeOpts));
                        }
                        payloadOpts = {
                            payloadFile: argsData['payload-file'],
                            payload: argsData === null || argsData === void 0 ? void 0 : argsData.payload,
                        };
                        fcStress = new fc_stress_1.default(project === null || project === void 0 ? void 0 : project.access, (props === null || props === void 0 ? void 0 : props.region) || (argsData === null || argsData === void 0 ? void 0 : argsData.region), stressOpts, httpTypeOpts, eventTypeOpts, payloadOpts);
                        if (commandName === 'start') {
                            fcStressArgs = fcStress.makeStartArgs();
                        }
                        else if (commandName === 'clean') {
                            fcStressArgs = fcStress.makeCleanArgs(argsData['assume-yes']);
                        }
                        this.logger.debug("Input args of fc-stress component is: " + fcStressArgs);
                        delete inputs.argsObj;
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/fc-stress', commandName, null, fcStressArgs)];
                    case 1: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.version = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, credentials, help, helpKey, props, subCommand, table, errorMessage, qualifier;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, version_1.default.handlerInputs(inputs)];
                    case 1:
                        _a = _b.sent(), credentials = _a.credentials, help = _a.help, helpKey = _a.helpKey, props = _a.props, subCommand = _a.subCommand, table = _a.table, errorMessage = _a.errorMessage;
                        return [4 /*yield*/, this.report('fc', subCommand ? "version " + subCommand : 'version', credentials === null || credentials === void 0 ? void 0 : credentials.AccountID)];
                    case 2:
                        _b.sent();
                        if (help) {
                            _super.prototype.help.call(this, helpKey);
                            if (errorMessage) {
                                throw new Error(errorMessage);
                            }
                            return [2 /*return*/];
                        }
                        qualifier = new version_1.default();
                        return [4 /*yield*/, qualifier[subCommand](props, table)];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.alias = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, credentials, help, helpKey, props, subCommand, table, errorMessage, qualifier;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, alias_1.default.handlerInputs(inputs)];
                    case 1:
                        _a = _b.sent(), credentials = _a.credentials, help = _a.help, helpKey = _a.helpKey, props = _a.props, subCommand = _a.subCommand, table = _a.table, errorMessage = _a.errorMessage;
                        return [4 /*yield*/, this.report('fc', subCommand ? "alias " + subCommand : 'alias', credentials === null || credentials === void 0 ? void 0 : credentials.AccountID)];
                    case 2:
                        _b.sent();
                        if (help) {
                            _super.prototype.help.call(this, helpKey);
                            if (errorMessage) {
                                throw new Error(errorMessage);
                            }
                            return [2 /*return*/];
                        }
                        qualifier = new alias_1.default();
                        return [4 /*yield*/, qualifier[subCommand](props, table)];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.provision = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, credentials, help, helpKey, props, subCommand, table, errorMessage, provision;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, provision_1.default.handlerInputs(inputs)];
                    case 1:
                        _a = _b.sent(), credentials = _a.credentials, help = _a.help, helpKey = _a.helpKey, props = _a.props, subCommand = _a.subCommand, table = _a.table, errorMessage = _a.errorMessage;
                        return [4 /*yield*/, this.report('fc', subCommand ? "provision " + subCommand : 'provision', credentials === null || credentials === void 0 ? void 0 : credentials.AccountID)];
                    case 2:
                        _b.sent();
                        if (help) {
                            _super.prototype.help.call(this, helpKey);
                            if (errorMessage) {
                                throw new Error(errorMessage);
                            }
                            return [2 /*return*/];
                        }
                        provision = new provision_1.default();
                        return [4 /*yield*/, provision[subCommand](props, table)];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.onDemand = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, credentials, help, helpKey, props, subCommand, table, errorMessage, onDemand;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, on_demand_1.default.handlerInputs(inputs)];
                    case 1:
                        _a = _b.sent(), credentials = _a.credentials, help = _a.help, helpKey = _a.helpKey, props = _a.props, subCommand = _a.subCommand, table = _a.table, errorMessage = _a.errorMessage;
                        return [4 /*yield*/, this.report('fc', subCommand ? "onDemand " + subCommand : 'onDemand', credentials === null || credentials === void 0 ? void 0 : credentials.AccountID)];
                    case 2:
                        _b.sent();
                        if (help) {
                            _super.prototype.help.call(this, helpKey);
                            if (errorMessage) {
                                throw new Error(errorMessage);
                            }
                            return [2 /*return*/];
                        }
                        onDemand = new on_demand_1.default();
                        return [4 /*yield*/, onDemand[subCommand](props, table)];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.layer = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, props, args, LAYER_COMMAND, comParse, argsData, nonOptionsArgs, commandName;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.handlerComponentInputs(inputs), props = _a.props, args = _a.args;
                        LAYER_COMMAND = {
                            publish: 'LayerPublishInputsArgs',
                            list: 'LayerListInputsArgs',
                            versionConfig: 'LayerVersionConfigInputsArgs',
                            deleteVersion: 'LayerDeleteVerisonInputsArgs',
                            versions: 'LayerVersionsInputsArgs',
                            deleteLayer: 'LayerDeleteLayerInputsArgs',
                        };
                        comParse = core.commandParse({ args: args }, {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        });
                        argsData = (comParse === null || comParse === void 0 ? void 0 : comParse.data) || {};
                        nonOptionsArgs = (argsData === null || argsData === void 0 ? void 0 : argsData._) || [];
                        this.logger.debug("nonOptionsArgs is " + JSON.stringify(nonOptionsArgs));
                        if (nonOptionsArgs.length === 0) {
                            _super.prototype.help.call(this, 'LayerInputsArgs');
                            return [2 /*return*/];
                        }
                        commandName = nonOptionsArgs[0];
                        if (!LAYER_COMMAND[commandName]) {
                            this.logger.error("Not supported sub-command: [" + commandName + "]");
                            _super.prototype.help.call(this, 'LayerInputsArgs');
                            return [2 /*return*/];
                        }
                        if (argsData === null || argsData === void 0 ? void 0 : argsData.help) {
                            _super.prototype.help.call(this, LAYER_COMMAND[commandName]);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/fc-layer', commandName, { region: props === null || props === void 0 ? void 0 : props.region }, args)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.proxied = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, args, argsObj, SUPPORTED_METHOD, apts, comParse, argsData, nonOptionsArgs, methodName, creds, fcProxiedInvoke;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = this.handlerComponentInputs(inputs), args = _b.args, argsObj = _b.argsObj;
                        SUPPORTED_METHOD = ['setup', 'invoke', 'clean'];
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core.commandParse({ args: args, argsObj: argsObj }, apts);
                        argsData = (comParse === null || comParse === void 0 ? void 0 : comParse.data) || {};
                        nonOptionsArgs = (argsData === null || argsData === void 0 ? void 0 : argsData._) || [];
                        this.logger.debug("nonOptionsArgs is " + JSON.stringify(nonOptionsArgs));
                        if ((argsData === null || argsData === void 0 ? void 0 : argsData.help) && nonOptionsArgs.length === 0) {
                            _super.prototype.help.call(this, 'ProxiedInputsArgs');
                            return [2 /*return*/];
                        }
                        if (nonOptionsArgs.length === 0) {
                            _super.prototype.help.call(this, 'ProxiedInputsArgs');
                            return [2 /*return*/];
                        }
                        methodName = nonOptionsArgs[0];
                        if (!SUPPORTED_METHOD.includes(methodName)) {
                            this.logger.error("Not supported sub-command: [" + methodName + "]");
                            _super.prototype.help.call(this, 'ProxiedInputsArgs');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core.getCredential((_a = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
                    case 1:
                        creds = _c.sent();
                        fcProxiedInvoke = new fc_proxied_invoke_1.default(inputs);
                        if (!(methodName === 'setup')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.report('fc', 'proxied_setup', creds === null || creds === void 0 ? void 0 : creds.AccountID)];
                    case 2:
                        _c.sent();
                        if (argsData === null || argsData === void 0 ? void 0 : argsData.help) {
                            _super.prototype.help.call(this, 'ProxiedSetupInputsArgs');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, proxied.setup(fcProxiedInvoke.makeInputs(methodName))];
                    case 3: return [2 /*return*/, _c.sent()];
                    case 4:
                        if (!(methodName === 'invoke')) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.report('fc', 'proxied_invoke', creds === null || creds === void 0 ? void 0 : creds.AccountID)];
                    case 5:
                        _c.sent();
                        if (argsData === null || argsData === void 0 ? void 0 : argsData.help) {
                            _super.prototype.help.call(this, 'ProxiedInvokeInputsArgs');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, proxied.invoke(fcProxiedInvoke.makeInputs(methodName))];
                    case 6: return [2 /*return*/, _c.sent()];
                    case 7: 
                    // clean
                    return [4 /*yield*/, this.report('fc', 'proxied_clean', creds === null || creds === void 0 ? void 0 : creds.AccountID)];
                    case 8:
                        // clean
                        _c.sent();
                        if (argsData === null || argsData === void 0 ? void 0 : argsData.help) {
                            _super.prototype.help.call(this, 'ProxiedCleanInputsArgs');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, proxied.clean(fcProxiedInvoke.makeInputs(methodName))];
                    case 9: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.help = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.report('fc', 'help')];
                    case 1:
                        _a.sent();
                        core.help(help_1.COMPONENT_HELP_INFO);
                        return [2 /*return*/];
                }
            });
        });
    };
    // 解析入参
    FcBaseComponent.prototype.isHelp = function (args) {
        var _a;
        var comParse = core.commandParse({ args: args }, {
            boolean: ['help'],
            alias: { help: 'h' },
        });
        return (_a = comParse === null || comParse === void 0 ? void 0 : comParse.data) === null || _a === void 0 ? void 0 : _a.help;
    };
    FcBaseComponent.prototype.handlerInputs = function (inputs) {
        var project = inputs === null || inputs === void 0 ? void 0 : inputs.project;
        var props = inputs === null || inputs === void 0 ? void 0 : inputs.props;
        var access = project === null || project === void 0 ? void 0 : project.access;
        var args = inputs === null || inputs === void 0 ? void 0 : inputs.args;
        var argsObj = inputs === null || inputs === void 0 ? void 0 : inputs.argsObj;
        var curPath = inputs === null || inputs === void 0 ? void 0 : inputs.path;
        var projectName = project === null || project === void 0 ? void 0 : project.projectName;
        var appName = inputs === null || inputs === void 0 ? void 0 : inputs.appName;
        return {
            appName: appName,
            projectName: projectName,
            access: access,
            props: props,
            args: args,
            argsObj: argsObj,
            curPath: curPath,
        };
    };
    FcBaseComponent.prototype.report = function (componentName, command, accountID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                core.reportComponent(componentName, {
                    command: command,
                    uid: accountID,
                });
                return [2 /*return*/];
            });
        });
    };
    FcBaseComponent.prototype.handlerComponentInputs = function (inputs, componentName) {
        var _a = this.handlerInputs(inputs), appName = _a.appName, projectName = _a.projectName, access = _a.access, props = _a.props, args = _a.args, argsObj = _a.argsObj, curPath = _a.curPath;
        return {
            project: {
                component: componentName,
                projectName: componentName ? projectName + "-" + componentName + "-project" : projectName,
                access: access,
            },
            appName: appName,
            props: props,
            args: args,
            argsObj: argsObj,
            path: curPath,
        };
    };
    FcBaseComponent.prototype.componentMethodCaller = function (inputs, componentName, methodName, props, args) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var componentInputs, componentIns;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        componentInputs = this.handlerComponentInputs(inputs, componentName);
                        return [4 /*yield*/, this.report(componentName, methodName, (_a = inputs === null || inputs === void 0 ? void 0 : inputs.credentials) === null || _a === void 0 ? void 0 : _a.AccountID)];
                    case 1:
                        _b.sent();
                        componentInputs.props = props;
                        componentInputs.args = args;
                        return [4 /*yield*/, core.load("" + componentName)];
                    case 2:
                        componentIns = _b.sent();
                        this.logger.debug("Inputs of component: " + componentName + " is: " + JSON.stringify(componentInputs, null, '  '));
                        return [4 /*yield*/, componentIns[methodName](componentInputs)];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    return FcBaseComponent;
}(base_1.default));
exports.default = FcBaseComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBQzlDLHdDQUE0QjtBQUM1QiwyREFBcUM7QUFDckMsbUNBQ2dIO0FBQ2hILDZEQUFpRDtBQUNqRCxzRUFBK0M7QUFHL0MsMkNBQWtEO0FBS2xELHFDQUF5RDtBQUN6RCwrQ0FBbUM7QUFDbkMsd0VBQWlEO0FBQ2pELG9FQUE4QztBQUM5QyxnRUFBMEM7QUFDMUMsd0VBQWlEO0FBQ2pELGtFQUE0QztBQUM1Qyx3RUFBa0Q7QUFFbEQsNENBQWdDO0FBQ2hDLHVEQUEwQztBQUMxQyx3RkFBZ0U7QUFDaEUseURBQTZDO0FBRTdDLGdCQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hCLElBQU0sc0JBQXNCLEdBQWEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFN0Q7SUFBNkMsbUNBQWE7SUFBMUQ7UUFBQSxxRUEwckJDO1FBenJCQyxZQUFNLEdBQUcsZ0JBQU0sQ0FBQzs7SUF5ckJsQixDQUFDO0lBdnJCTyxnQ0FBTSxHQUFaLFVBQWEsTUFBZTs7Ozs7O3dCQUNwQixLQUFrQixJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLEVBQW5ELEtBQUssV0FBQSxFQUFFLElBQUksVUFBQSxDQUF5Qzt3QkFDdEQsVUFBVSxHQUF5QixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTs0QkFDakUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDOzRCQUNqQixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFO3lCQUNyQixDQUFDLENBQUM7d0JBRUcsVUFBVSxHQUFHLENBQUEsVUFBVSxhQUFWLFVBQVUsdUJBQVYs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