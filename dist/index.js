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
                        return [4 /*yield*/, new remove_1.default({ region: props.region, credentials: credentials }).remove({
                                props: props,
                                subCommand: subCommand,
                                credentials: credentials,
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
                        if ((_c = comParse === null || comParse === void 0 ? void 0 : comParse.data) === null || _c === void 0 ? void 0 : _c.help) {
                            core.help(help_1.NAS_SUB_COMMAND_HELP_INFO[commandName]);
                            return [2 /*return*/];
                        }
                        nonOptionsArgs.shift();
                        return [4 /*yield*/, tarnsform_nas_1.default(props, nonOptionsArgs, tarnsformArgs, project === null || project === void 0 ? void 0 : project.access, commandName)];
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
                        qualifier = new version_1.default({ region: props.region, credentials: credentials });
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
                        qualifier = new alias_1.default({ region: props.region, credentials: credentials });
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
                        provision = new provision_1.default({ region: props.region, credentials: credentials });
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
                        onDemand = new on_demand_1.default({ region: props.region, credentials: credentials });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBQzlDLHdDQUE0QjtBQUM1QiwyREFBcUM7QUFDckMsbUNBQ2dIO0FBQ2hILDZEQUFpRDtBQUNqRCxzRUFBK0M7QUFHL0MsMkNBQWtEO0FBS2xELHFDQUF5RDtBQUN6RCwrQ0FBbUM7QUFDbkMsd0VBQWlEO0FBQ2pELG9FQUE4QztBQUM5QyxnRUFBMEM7QUFDMUMsd0VBQWlEO0FBQ2pELGtFQUE0QztBQUM1Qyx3RUFBa0Q7QUFFbEQsNENBQWdDO0FBQ2hDLHVEQUEwQztBQUMxQyx3RkFBZ0U7QUFDaEUseURBQTZDO0FBRTdDLGdCQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hCLElBQU0sc0JBQXNCLEdBQWEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFN0Q7SUFBNkMsbUNBQWE7SUFBMUQ7UUFBQSxxRUF1ckJDO1FBdHJCQyxZQUFNLEdBQUcsZ0JBQU0sQ0FBQzs7SUFzckJsQixDQUFDO0lBcHJCTyxnQ0FBTSxHQUFaLFVBQWEsTUFBZTs7Ozs7O3dCQUNwQixLQUFrQixJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLEVBQW5ELEtBQUssV0FBQSxFQUFFLElBQUksVUFBQSxDQUF5Qzt3QkFDdEQsVUFBVSxHQUF5QixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTs0QkFDakUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDOzRCQUNqQixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFO3lCQUNyQixDQUFDLENBQUM7d0JBRUcsVUFBVSxHQUFHLENBQUEsVUFBVSxhQUFWLFVBQVUsdUJBQVYs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