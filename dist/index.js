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
            var _b, props, args, parsedArgs, argsData, nonOptionsArgs, methodName, fcInfoArgs, localRes;
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
                        fcInfoArgs = args ? args.replace(methodName, '').replace(/(^\s*)|(\s*$)/g, '') : '';
                        this.logger.debug("Args of fc-info is: " + fcInfoArgs);
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/fc-local-invoke', methodName, props, fcInfoArgs)];
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
                        if (!(methodName === 'setup')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.proxied_method_invoker(fcProxiedInvoke.makeInputs(methodName), methodName, argsData === null || argsData === void 0 ? void 0 : argsData.help, 'ProxiedSetupInputsArgs', creds)];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 7];
                    case 3:
                        if (!(methodName === 'invoke')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.proxied_method_invoker(fcProxiedInvoke.makeInputs(methodName), methodName, argsData === null || argsData === void 0 ? void 0 : argsData.help, 'ProxiedInvokeInputsArgs', creds)];
                    case 4:
                        _c.sent();
                        return [3 /*break*/, 7];
                    case 5: 
                    // clean
                    return [4 /*yield*/, this.proxied_method_invoker(fcProxiedInvoke.makeInputs(methodName), methodName, argsData === null || argsData === void 0 ? void 0 : argsData.help, 'ProxiedCleanInputsArgs', creds)];
                    case 6:
                        // clean
                        _c.sent();
                        _c.label = 7;
                    case 7: return [2 /*return*/];
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
    FcBaseComponent.prototype.proxied_method_invoker = function (inputs, methodName, isHelp, helpName, creds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.report('fc', "proxied_" + methodName, creds === null || creds === void 0 ? void 0 : creds.AccountID)];
                    case 1:
                        _a.sent();
                        if (isHelp) {
                            _super.prototype.help.call(this, helpName);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/fc-proxied-invoke', methodName)];
                    case 2:
                        _a.sent();
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
    FcBaseComponent.prototype.componentMethodCaller = function (inputs, componentName, methodName, props, args, argsObj) {
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
                        componentInputs.props = props || (inputs === null || inputs === void 0 ? void 0 : inputs.props);
                        componentInputs.args = args || (inputs === null || inputs === void 0 ? void 0 : inputs.args);
                        componentInputs.argsObj = argsObj || (inputs === null || inputs === void 0 ? void 0 : inputs.argsObj);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBQzlDLHdDQUE0QjtBQUM1QiwyREFBcUM7QUFDckMsbUNBRTJGO0FBQzNGLHNFQUErQztBQUcvQywyQ0FBa0Q7QUFLbEQscUNBQXlEO0FBQ3pELCtDQUFtQztBQUNuQyx3RUFBaUQ7QUFDakQsb0VBQThDO0FBQzlDLGdFQUEwQztBQUMxQyx3RUFBaUQ7QUFDakQsd0VBQWtEO0FBRWxELDRDQUFnQztBQUNoQyw4Q0FBcUQ7QUFDckQsdURBQTBDO0FBQzFDLHdGQUFnRTtBQUVoRSxnQkFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4QixJQUFNLHNCQUFzQixHQUFhLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRTdEO0lBQTZDLG1DQUFhO0lBQTFEO1FBQUEscUVBcW5CQztRQXBuQkMsWUFBTSxHQUFHLGdCQUFNLENBQUM7O0lBb25CbEIsQ0FBQztJQWxuQk8sZ0NBQU0sR0FBWixVQUFhLE1BQWU7Ozs7Ozt3QkFDcEIsS0FBa0IsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxFQUFuRCxLQUFLLFdBQUEsRUFBRSxJQUFJLFVBQUEsQ0FBeUM7d0JBQ3JDLHFCQUFNLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBQTs7d0JBQXJHLFNBQVMsR0FBUSxTQUFvRjt3QkFDM0csSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7d0JBRWhELE9BQU8sQ0FBQyxHQUFHLENBQUMs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