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
var tarnsform_nas_1 = __importDefault(require("./lib/tarnsform-nas"));
var sls_1 = require("./lib/interface/sls");
var utils_1 = require("./lib/utils");
var tips = __importStar(require("./lib/tips"));
var fc_stress_1 = __importDefault(require("./lib/component/fc-stress"));
var version_1 = __importDefault(require("./lib/component/version"));
var alias_1 = __importDefault(require("./lib/component/alias"));
var on_demand_1 = __importDefault(require("./lib/component/on-demand"));
var provision_1 = __importDefault(require("./lib/component/provision"));
var yaml = __importStar(require("js-yaml"));
var proxied_1 = require("./lib/help/proxied");
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
            var _a, props, args, deployRes, result, temp_url, i, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.handlerComponentInputs(inputs), props = _a.props, args = _a.args;
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
            var _a, props, args;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.handlerComponentInputs(inputs), props = _a.props, args = _a.args;
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/fc-deploy', 'remove', props, args)];
                    case 1: return [2 /*return*/, _b.sent()];
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
            var _c, props, args, parsedArgs, argsData, invokePayload;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _c = this.handlerComponentInputs(inputs), props = _c.props, args = _c.args;
                        parsedArgs = core.commandParse({ args: args }, {
                            boolean: ['help'],
                            alias: { help: 'h' }
                        });
                        argsData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                        if (argsData === null || argsData === void 0 ? void 0 : argsData.help) {
                            core.help(help_1.INVOKE_HELP_INFO);
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
                            core.help(help_1.LOGS_HELP_INFO);
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
                            core.help(help_1.METRICS_HELP_INFO);
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
            var _c, props, project, SUPPORTED_METHOD, apts, comParse, argsData, nonOptionsArgs, commandName, stressOpts, eventTypeOpts, httpTypeOpts, payloadOpts, fcStress, fcStressArgs;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _c = this.handlerComponentInputs(inputs), props = _c.props, project = _c.project;
                        SUPPORTED_METHOD = ['start', 'clean'];
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
                            core.help(help_1.STRESS_HTLP_INFO);
                            return [2 /*return*/];
                        }
                        if (nonOptionsArgs.length === 0) {
                            if (!(argsData === null || argsData === void 0 ? void 0 : argsData.help)) {
                                this.logger.error('Not fount sub-command.');
                            }
                            core.help(help_1.STRESS_HTLP_INFO);
                            return [2 /*return*/];
                        }
                        commandName = nonOptionsArgs[0];
                        if (!SUPPORTED_METHOD.includes(commandName)) {
                            this.logger.error("Not supported sub-command: [" + commandName + "]");
                            core.help(help_1.STRESS_HTLP_INFO);
                            return [2 /*return*/];
                        }
                        if (argsData === null || argsData === void 0 ? void 0 : argsData.help) {
                            core.help(help_1.STRESS_SUB_COMMAND_HELP_INFO[commandName]);
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
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, credentials, help, props, subCommand, table, errorMessage, qualifier;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, version_1.default.handlerInputs(inputs)];
                    case 1:
                        _b = _c.sent(), credentials = _b.credentials, help = _b.help, props = _b.props, subCommand = _b.subCommand, table = _b.table, errorMessage = _b.errorMessage;
                        return [4 /*yield*/, this.report('fc', subCommand ? "version " + subCommand : 'version', credentials === null || credentials === void 0 ? void 0 : credentials.AccountID, (_a = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
                    case 2:
                        _c.sent();
                        if (errorMessage) {
                            throw new Error(errorMessage);
                        }
                        if (help) {
                            return [2 /*return*/];
                        }
                        qualifier = new version_1.default({ region: props.region, credentials: credentials });
                        return [4 /*yield*/, qualifier[subCommand](props, table)];
                    case 3: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.alias = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, credentials, help, props, subCommand, table, errorMessage, qualifier;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, alias_1.default.handlerInputs(inputs)];
                    case 1:
                        _b = _c.sent(), credentials = _b.credentials, help = _b.help, props = _b.props, subCommand = _b.subCommand, table = _b.table, errorMessage = _b.errorMessage;
                        return [4 /*yield*/, this.report('fc', subCommand ? "alias " + subCommand : 'alias', credentials === null || credentials === void 0 ? void 0 : credentials.AccountID, (_a = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
                    case 2:
                        _c.sent();
                        if (errorMessage) {
                            throw new Error(errorMessage);
                        }
                        if (help) {
                            return [2 /*return*/];
                        }
                        qualifier = new alias_1.default({ region: props.region, credentials: credentials });
                        return [4 /*yield*/, qualifier[subCommand](props, table)];
                    case 3: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.provision = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, credentials, help, props, subCommand, table, errorMessage, provision;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, provision_1.default.handlerInputs(inputs)];
                    case 1:
                        _b = _c.sent(), credentials = _b.credentials, help = _b.help, props = _b.props, subCommand = _b.subCommand, table = _b.table, errorMessage = _b.errorMessage;
                        return [4 /*yield*/, this.report('fc', subCommand ? "provision " + subCommand : 'provision', credentials === null || credentials === void 0 ? void 0 : credentials.AccountID, (_a = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
                    case 2:
                        _c.sent();
                        if (errorMessage) {
                            throw new Error(errorMessage);
                        }
                        if (help) {
                            return [2 /*return*/];
                        }
                        provision = new provision_1.default({ region: props.region, credentials: credentials });
                        return [4 /*yield*/, provision[subCommand](props, table)];
                    case 3: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.onDemand = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, credentials, help, props, subCommand, table, errorMessage, onDemand;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, on_demand_1.default.handlerInputs(inputs)];
                    case 1:
                        _b = _c.sent(), credentials = _b.credentials, help = _b.help, props = _b.props, subCommand = _b.subCommand, table = _b.table, errorMessage = _b.errorMessage;
                        return [4 /*yield*/, this.report('fc', subCommand ? "onDemand " + subCommand : 'onDemand', credentials === null || credentials === void 0 ? void 0 : credentials.AccountID, (_a = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
                    case 2:
                        _c.sent();
                        if (errorMessage) {
                            throw new Error(errorMessage);
                        }
                        if (help) {
                            return [2 /*return*/];
                        }
                        onDemand = new on_demand_1.default({ region: props.region, credentials: credentials });
                        return [4 /*yield*/, onDemand[subCommand](props, table)];
                    case 3: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.layer = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, props, args, SUPPORTED_METHOD, apts, comParse, argsData, nonOptionsArgs, commandName;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.handlerComponentInputs(inputs), props = _a.props, args = _a.args;
                        SUPPORTED_METHOD = Object.keys(help_1.LAYER_COMMAND);
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core.commandParse({ args: args }, apts);
                        argsData = (comParse === null || comParse === void 0 ? void 0 : comParse.data) || {};
                        nonOptionsArgs = (argsData === null || argsData === void 0 ? void 0 : argsData._) || [];
                        this.logger.debug("nonOptionsArgs is " + JSON.stringify(nonOptionsArgs));
                        if (nonOptionsArgs.length === 0) {
                            core.help(help_1.LAYER);
                            return [2 /*return*/];
                        }
                        commandName = nonOptionsArgs[0];
                        if (!SUPPORTED_METHOD.includes(commandName)) {
                            this.logger.error("Not supported sub-command: [" + commandName + "]");
                            core.help(help_1.LAYER);
                            return [2 /*return*/];
                        }
                        if (argsData === null || argsData === void 0 ? void 0 : argsData.help) {
                            core.help(help_1.LAYER_COMMAND[commandName]);
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
                        SUPPORTED_METHOD = Object.keys(proxied_1.PROXIED_COMMAND);
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
    FcBaseComponent.prototype.report = function (componentName, command, accountID, access) {
        return __awaiter(this, void 0, void 0, function () {
            var uid, credentials;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uid = accountID;
                        if (!(_.isEmpty(accountID) && !_.isEmpty(access))) return [3 /*break*/, 2];
                        return [4 /*yield*/, core.getCredential(access)];
                    case 1:
                        credentials = _a.sent();
                        uid = credentials.AccountID;
                        _a.label = 2;
                    case 2:
                        core.reportComponent(componentName, {
                            command: command,
                            uid: uid,
                        });
                        return [2 /*return*/];
                }
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
                        return [4 /*yield*/, this.report(componentName, methodName, undefined, (_a = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBQzlDLHdDQUE0QjtBQUM1QiwyREFBcUM7QUFDckMsbUNBRTJGO0FBQzNGLHNFQUErQztBQUcvQywyQ0FBa0Q7QUFLbEQscUNBQXlEO0FBQ3pELCtDQUFtQztBQUNuQyx3RUFBaUQ7QUFDakQsb0VBQThDO0FBQzlDLGdFQUEwQztBQUMxQyx3RUFBaUQ7QUFDakQsd0VBQWtEO0FBRWxELDRDQUFnQztBQUNoQyw4Q0FBcUQ7QUFDckQsdURBQTBDO0FBQzFDLHdGQUFnRTtBQUNoRSx5REFBNkM7QUFFN0MsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEIsSUFBTSxzQkFBc0IsR0FBYSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUU3RDtJQUE2QyxtQ0FBYTtJQUExRDtRQUFBLHFFQTBuQkM7UUF6bkJDLFlBQU0sR0FBRyxnQkFBTSxDQUFDOztJQXluQmxCLENBQUM7SUF2bkJPLGdDQUFNLEdBQVosVUFBYSxNQUFlOzs7Ozs7d0JBQ3BCLEtBQWtCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsRUFBbkQsS0FBSyxXQUFBLEVBQUUsSUFBSSxVQUFBLENBQXlDO3dCQUNyQyxxQkFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUE7O3dCQUFyRyxTQUFTLEdBQVEsU0FBb0Y7d0JBQzNHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO3dCQUVoRCxPQUFPLENB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