"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
/* eslint-disable no-param-reassign */
var core = __importStar(require("@serverless-devs/core"));
var _ = __importStar(require("lodash"));
var logger_1 = __importDefault(require("./common/logger"));
var HELP = __importStar(require("./lib/help"));
var DEPLOY_HELP = __importStar(require("./lib/help/deploy"));
var LAYER_HELP = __importStar(require("./lib/help/layer"));
var nas_1 = __importDefault(require("./lib/component/nas"));
var info_1 = require("./lib/component/info");
var instance_1 = __importDefault(require("./lib/component/instance"));
var utils_1 = require("./lib/utils");
var tips = __importStar(require("./lib/tips"));
var fc_stress_1 = __importDefault(require("./lib/component/fc-stress"));
var version_1 = __importDefault(require("./lib/component/version"));
var alias_1 = __importDefault(require("./lib/component/alias"));
var on_demand_1 = __importDefault(require("./lib/component/on-demand"));
var remove_1 = __importDefault(require("./lib/component/remove"));
var plan_1 = __importDefault(require("./lib/component/plan"));
var provision_1 = __importDefault(require("./lib/component/provision"));
var entry_public_method_1 = __importDefault(require("./entry-public-method"));
var fc_proxied_invoke_1 = __importDefault(require("./lib/component/fc-proxied-invoke"));
var fc_remote_debug_1 = __importDefault(require("./lib/component/fc-remote-debug"));
var fc_eval_1 = __importDefault(require("./lib/component/fc-eval"));
var logs_1 = __importDefault(require("./lib/component/logs"));
var local_1 = __importDefault(require("./lib/component/local"));
var DEPLOY_SUPPORT_CONFIG_ARGS = ['code', 'config'];
var FcBaseComponent = /** @class */ (function (_super) {
    __extends(FcBaseComponent, _super);
    function FcBaseComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.logger = logger_1.default;
        return _this;
    }
    FcBaseComponent.prototype.instance = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, help, subCommand, props, instance;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.handlerPreMethod.call(this, inputs, { getSecretKey: true })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, instance_1.default.handlerInputs(inputs)];
                    case 2:
                        _a = _b.sent(), help = _a.help, subCommand = _a.subCommand, props = _a.props;
                        if (help) {
                            return [2 /*return*/];
                        }
                        instance = new instance_1.default();
                        if (!(subCommand === 'list')) return [3 /*break*/, 4];
                        return [4 /*yield*/, instance.list(props)];
                    case 3: return [2 /*return*/, _b.sent()];
                    case 4:
                        if (!(subCommand === 'exec')) return [3 /*break*/, 6];
                        return [4 /*yield*/, instance.exec(props)];
                    case 5: return [2 /*return*/, _b.sent()];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    FcBaseComponent.prototype.plan = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, isHelp, planType, palnRs;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.handlerPreMethod.call(this, inputs, { getSecretKey: true })];
                    case 1:
                        _b.sent();
                        _a = plan_1.default.handlerInputs(inputs), isHelp = _a.isHelp, planType = _a.planType;
                        if (isHelp) {
                            return [2 /*return*/, core.help(HELP.PLAN_HELP)];
                        }
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/fc-plan', 'plan', inputs.props, inputs.args)];
                    case 2:
                        palnRs = _b.sent();
                        return [2 /*return*/, plan_1.default.showPlan(palnRs, planType)];
                }
            });
        });
    };
    FcBaseComponent.prototype.deploy = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, props, args, parsedArgs, parsedData, rawData, commandList, subCommand, deployRes, result, temp_url, i, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, _super.prototype.handlerPreMethod.call(this, inputs, { getSecretKey: true })];
                    case 1:
                        _c.sent();
                        _b = this.handlerComponentInputs(inputs), props = _b.props, args = _b.args;
                        parsedArgs = core.commandParse(inputs, this.MINIMIST_HELP_OPT);
                        parsedData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                        rawData = parsedData._ || [];
                        commandList = ['all', 'service', 'function', 'trigger', 'domain'];
                        subCommand = rawData[0] || 'all';
                        this.logger.debug("deploy subCommand: ".concat(subCommand));
                        if (!commandList.includes(subCommand)) {
                            this.logger.error("Deploy ".concat(subCommand, " is not supported now."));
                            return [2 /*return*/, core.help(DEPLOY_HELP.DEPLOY)];
                        }
                        if (parsedData.help) {
                            rawData[0]
                                ? core.help(DEPLOY_HELP["DEPLOY_".concat(subCommand).toLocaleUpperCase()])
                                : core.help(DEPLOY_HELP.DEPLOY);
                            return [2 /*return*/];
                        }
                        if (parsedData.type && !DEPLOY_SUPPORT_CONFIG_ARGS.includes(parsedData.type)) {
                            core.help(DEPLOY_HELP.DEPLOY);
                            throw new Error("Type does not support ".concat(parsedData.type, ", only config and code are supported"));
                        }
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/fc-deploy', 'deploy', props, args)];
                    case 2:
                        deployRes = _c.sent();
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
                            if (!_.isEmpty(deployRes.function.gpuMemorySize)) {
                                result.function.gpuMemorySize = deployRes.function.gpuMemorySize;
                            }
                            if (deployRes.function.timeout) {
                                result.function.timeout = deployRes.function.timeout;
                            }
                        }
                        // https://github.com/devsapp/fc/issues/383
                        if (deployRes.systemDomain && !['custom', 'custom-container'].includes((_a = props.function) === null || _a === void 0 ? void 0 : _a.runtime)) {
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
            var _a, help, props, subCommand;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.handlerPreMethod.call(this, inputs, { getSecretKey: true })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, remove_1.default.handlerInputs(inputs)];
                    case 2:
                        _a = _b.sent(), help = _a.help, props = _a.props, subCommand = _a.subCommand;
                        if (help) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, new remove_1.default().remove({ props: props, subCommand: subCommand }, this.handlerInputs(inputs))];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcBaseComponent.prototype.info = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, props, args, argsObj;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.handlerPreMethod.call(this, inputs, { getSecretKey: true })];
                    case 1:
                        _b.sent();
                        _a = this.handlerComponentInputs(inputs), props = _a.props, args = _a.args, argsObj = _a.argsObj;
                        if (this.isHelp(args, argsObj)) {
                            core.help(HELP.INFO);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/fc-info', 'info', (0, info_1.infoPropsGenerator)(props), args)];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.sync = function (inputs) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var _d, props, args, argsObj, property;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, _super.prototype.handlerPreMethod.call(this, inputs, { getSecretKey: true })];
                    case 1:
                        _e.sent();
                        _d = this.handlerComponentInputs(inputs), props = _d.props, args = _d.args, argsObj = _d.argsObj;
                        if (this.isHelp(args, argsObj)) {
                            core.help(HELP.SYNC);
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
                    case 2: return [2 /*return*/, _e.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.build = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, props, args;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.handlerPreMethod.call(this, inputs)];
                    case 1:
                        _b.sent();
                        _a = this.handlerComponentInputs(inputs), props = _a.props, args = _a.args;
                        if (this.isHelp(args)) {
                            core.help(HELP.BUILD_HELP_INFO);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/fc-build', 'build', props, args)];
                    case 2:
                        _b.sent();
                        tips.showNextTip(args, tips.showBuildNextTips);
                        return [2 /*return*/];
                }
            });
        });
    };
    FcBaseComponent.prototype.local = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, isHelp, methodName, fcLocalInvokeArgs, props, args, localRes;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, _super.prototype.handlerPreMethod.call(this, inputs, { getSecretKey: true })];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, local_1.default.handlerComponentInputs(inputs)];
                    case 2:
                        _b = _c.sent(), isHelp = _b.isHelp, methodName = _b.methodName, fcLocalInvokeArgs = _b.fcLocalInvokeArgs;
                        if (isHelp) {
                            return [2 /*return*/];
                        }
                        props = inputs.props, args = inputs.args;
                        (_a = inputs.argsObj) === null || _a === void 0 ? void 0 : _a.shift();
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/fc-local-invoke', methodName, props, fcLocalInvokeArgs)];
                    case 3:
                        localRes = _c.sent();
                        tips.showNextTip(args, tips.showLocalNextTips);
                        return [2 /*return*/, localRes];
                }
            });
        });
    };
    FcBaseComponent.prototype.invoke = function (inputs) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var _e, props, args, argsObj, invokePayload;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, _super.prototype.handlerPreMethod.call(this, inputs, { getSecretKey: true })];
                    case 1:
                        _f.sent();
                        _e = this.handlerComponentInputs(inputs), props = _e.props, args = _e.args, argsObj = _e.argsObj;
                        if (this.isHelp(args, argsObj)) {
                            core.help(HELP.INVOKE);
                            return [2 /*return*/];
                        }
                        invokePayload = {
                            region: props === null || props === void 0 ? void 0 : props.region,
                            serviceName: (_a = props === null || props === void 0 ? void 0 : props.service) === null || _a === void 0 ? void 0 : _a.name,
                            functionName: (_b = props === null || props === void 0 ? void 0 : props.function) === null || _b === void 0 ? void 0 : _b.name,
                            timeout: (_c = props === null || props === void 0 ? void 0 : props.function) === null || _c === void 0 ? void 0 : _c.timeout,
                            runtime: (_d = props === null || props === void 0 ? void 0 : props.function) === null || _d === void 0 ? void 0 : _d.runtime,
                        };
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/fc-remote-invoke', 'invoke', invokePayload, args)];
                    case 2:
                        _f.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcBaseComponent.prototype.logs = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, logsPayload, args, isHelp;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.handlerPreMethod.call(this, inputs, { getSecretKey: true })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, logs_1.default.handlerComponentInputs(inputs, this.info)];
                    case 2:
                        _a = _b.sent(), logsPayload = _a.logsPayload, args = _a.args, isHelp = _a.isHelp;
                        if (isHelp) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/sls', 'logs', logsPayload, args)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcBaseComponent.prototype.metrics = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, props, args, argsObj, opts, comParse, payload;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, _super.prototype.handlerPreMethod.call(this, inputs, { getSecretKey: true })];
                    case 1:
                        _c.sent();
                        _b = this.handlerComponentInputs(inputs), props = _b.props, args = _b.args, argsObj = _b.argsObj;
                        opts = {
                            boolean: ['help'],
                            string: ['region', 'service-name', 'function-name'],
                            alias: { help: 'h' },
                        };
                        comParse = (_a = core.commandParse({ args: args, argsObj: argsObj }, opts)) === null || _a === void 0 ? void 0 : _a.data;
                        if (comParse === null || comParse === void 0 ? void 0 : comParse.help) {
                            core.help(HELP.METRICS);
                            return [2 /*return*/];
                        }
                        payload = (0, utils_1.getFcNames)(comParse, props);
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/fc-metrics', 'metrics', payload, args)];
                    case 2:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcBaseComponent.prototype.nas = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, isHelp, commandName, nasConfig, componentInputs, props, assumeYes, vpcConfig, name, role, transformArgs, payload_1, payload;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, _super.prototype.handlerPreMethod.call(this, inputs, { getSecretKey: true })];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, nas_1.default.handlerComponentInputs(inputs)];
                    case 2:
                        _b = _c.sent(), isHelp = _b.isHelp, commandName = _b.commandName, nasConfig = _b.nasConfig, componentInputs = _b.componentInputs, props = _b.props, assumeYes = _b.assumeYes, vpcConfig = _b.vpcConfig, name = _b.name, role = _b.role, transformArgs = _b.transformArgs;
                        if (isHelp) {
                            return [2 /*return*/];
                        }
                        if (!(commandName === 'init' && (0, utils_1.isAutoConfig)(nasConfig))) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.componentMethodCaller(componentInputs, 'devsapp/fc-deploy', 'deployAutoNas', props, assumeYes ? '--assume-yes' : null)];
                    case 3: return [2 /*return*/, _c.sent()];
                    case 4:
                        if (!(commandName === 'init')) return [3 /*break*/, 7];
                        this.logger.info('Ensuring nas dir');
                        return [4 /*yield*/, nas_1.default.toNasAbility(props === null || props === void 0 ? void 0 : props.region, vpcConfig, name, role, nasConfig)];
                    case 5:
                        payload_1 = _c.sent();
                        return [4 /*yield*/, this.componentMethodCaller(componentInputs, 'devsapp/nas', 'ensureNasDir', payload_1.payload)];
                    case 6:
                        _c.sent();
                        return [2 /*return*/];
                    case 7: return [4 /*yield*/, nas_1.default.getServiceConfig(props, (_a = inputs.project) === null || _a === void 0 ? void 0 : _a.access, inputs.credentials)];
                    case 8:
                        payload = _c.sent();
                        this.logger.debug("transform nas payload: ".concat(JSON.stringify(payload.payload)));
                        this.logger.debug("  args: ".concat(transformArgs, ", command: ").concat(commandName));
                        return [4 /*yield*/, this.componentMethodCaller(componentInputs, 'devsapp/nas', commandName, payload.payload, transformArgs)];
                    case 9:
                        _c.sent();
                        tips.showNasNextTips();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcBaseComponent.prototype.stress = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, isHelp, access, region, commandName, stressOpts, httpTypeOpts, eventTypeOpts, payloadOpts, argsData, fcStress, fcStressArgs;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.handlerPreMethod.call(this, inputs, { getSecretKey: true })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, fc_stress_1.default.handlerComponentInputs(inputs)];
                    case 2:
                        _a = _b.sent(), isHelp = _a.isHelp, access = _a.access, region = _a.region, commandName = _a.commandName, stressOpts = _a.stressOpts, httpTypeOpts = _a.httpTypeOpts, eventTypeOpts = _a.eventTypeOpts, payloadOpts = _a.payloadOpts, argsData = _a.argsData;
                        if (isHelp) {
                            return [2 /*return*/];
                        }
                        fcStress = new fc_stress_1.default(access, region, stressOpts, httpTypeOpts, eventTypeOpts, payloadOpts);
                        if (commandName === 'start') {
                            if ((stressOpts === null || stressOpts === void 0 ? void 0 : stressOpts.functionType) === 'http' && !(argsData === null || argsData === void 0 ? void 0 : argsData.url)) {
                                this.logger.error('Function type is http, please specify --url');
                            }
                            fcStressArgs = fcStress.makeStartArgs();
                        }
                        else if (commandName === 'clean') {
                            fcStressArgs = fcStress.makeCleanArgs(argsData['assume-yes']);
                        }
                        this.logger.debug("Input args of fc-stress component is: ".concat(fcStressArgs));
                        delete inputs.argsObj;
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/fc-stress', commandName, null, fcStressArgs)];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.version = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, help, props, subCommand, table, qualifier;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.handlerPreMethod.call(this, inputs, { getSecretKey: true })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, version_1.default.handlerInputs(inputs)];
                    case 2:
                        _a = _b.sent(), help = _a.help, props = _a.props, subCommand = _a.subCommand, table = _a.table;
                        if (help) {
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
            var _a, help, props, subCommand, table, qualifier;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.handlerPreMethod.call(this, inputs, { getSecretKey: true })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, alias_1.default.handlerInputs(inputs)];
                    case 2:
                        _a = _b.sent(), help = _a.help, props = _a.props, subCommand = _a.subCommand, table = _a.table;
                        if (help) {
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
            var _a, help, props, subCommand, table, provision;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.handlerPreMethod.call(this, inputs, { getSecretKey: true })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, provision_1.default.handlerInputs(inputs)];
                    case 2:
                        _a = _b.sent(), help = _a.help, props = _a.props, subCommand = _a.subCommand, table = _a.table;
                        if (help) {
                            return [2 /*return*/];
                        }
                        provision = new provision_1.default();
                        return [4 /*yield*/, provision[subCommand](props, table)];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.ondemand = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, help, props, subCommand, table, ondemand;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.handlerPreMethod.call(this, inputs, { getSecretKey: true })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, on_demand_1.default.handlerInputs(inputs)];
                    case 2:
                        _a = _b.sent(), help = _a.help, props = _a.props, subCommand = _a.subCommand, table = _a.table;
                        if (help) {
                            return [2 /*return*/];
                        }
                        ondemand = new on_demand_1.default();
                        return [4 /*yield*/, ondemand[subCommand](props, table)];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.onDemand = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // warning: 2021.12.23 交互修改警告，过段时间可以删除
                        this.logger.warn('The onDemand command will be removed soon, please use ondemand');
                        return [4 /*yield*/, this.ondemand(inputs)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.layer = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, props, args, argsObj, LAYER_COMMAND, comParse, argsData, nonOptionsArgs, commandName;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.handlerPreMethod.call(this, inputs, { getSecretKey: true })];
                    case 1:
                        _b.sent();
                        _a = this.handlerComponentInputs(inputs), props = _a.props, args = _a.args, argsObj = _a.argsObj;
                        LAYER_COMMAND = {
                            publish: LAYER_HELP.LAYER_PUBLISH,
                            list: LAYER_HELP.LAYER_LIST,
                            detail: LAYER_HELP.LAYER_DETAIL,
                            versionConfig: LAYER_HELP.LAYER_DETAIL,
                            versions: LAYER_HELP.LAYER_VERSIONS,
                        };
                        comParse = core.commandParse({ args: args, argsObj: argsObj }, this.MINIMIST_HELP_OPT);
                        argsData = (comParse === null || comParse === void 0 ? void 0 : comParse.data) || {};
                        nonOptionsArgs = (argsData === null || argsData === void 0 ? void 0 : argsData._) || [];
                        this.logger.debug("nonOptionsArgs is ".concat(JSON.stringify(nonOptionsArgs)));
                        if (nonOptionsArgs.length === 0) {
                            core.help(LAYER_HELP.LAYER);
                            return [2 /*return*/];
                        }
                        commandName = nonOptionsArgs[0];
                        if (!LAYER_COMMAND[commandName]) {
                            this.logger.error("Not supported sub-command: [".concat(commandName, "]"));
                            core.help(LAYER_HELP.LAYER);
                            return [2 /*return*/];
                        }
                        // warning: 2021.12.23 交互修改警告，过段时间可以删除
                        if (commandName === 'versionConfig') {
                            this.logger.warn('The versionConfig command will be removed soon, please use detail');
                        }
                        if (argsData === null || argsData === void 0 ? void 0 : argsData.help) {
                            core.help(LAYER_COMMAND[commandName]);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/fc-layer', commandName, { region: props === null || props === void 0 ? void 0 : props.region }, args)];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.proxied = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, args, argsObj, SUPPORTED_METHOD, comParse, argsData, nonOptionsArgs, showhelp, methodName, fcProxiedInvoke;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.handlerPreMethod.call(this, inputs, { getSecretKey: true })];
                    case 1:
                        _b.sent();
                        _a = this.handlerComponentInputs(inputs), args = _a.args, argsObj = _a.argsObj;
                        SUPPORTED_METHOD = ['setup', 'invoke', 'clean', 'cleanup'];
                        comParse = core.commandParse({ args: args, argsObj: argsObj }, this.MINIMIST_HELP_OPT);
                        argsData = (comParse === null || comParse === void 0 ? void 0 : comParse.data) || {};
                        nonOptionsArgs = (argsData === null || argsData === void 0 ? void 0 : argsData._) || [];
                        this.logger.debug("nonOptionsArgs is ".concat(JSON.stringify(nonOptionsArgs)));
                        showhelp = nonOptionsArgs.length === 0;
                        if (showhelp || ((argsData === null || argsData === void 0 ? void 0 : argsData.help) && showhelp)) {
                            core.help(HELP.PROXIED);
                            return [2 /*return*/];
                        }
                        methodName = nonOptionsArgs[0];
                        if (!SUPPORTED_METHOD.includes(methodName)) {
                            this.logger.error("Not supported sub-command: [".concat(methodName, "]"));
                            core.help(HELP.PROXIED);
                            return [2 /*return*/];
                        }
                        fcProxiedInvoke = new fc_proxied_invoke_1.default(inputs);
                        if (!(methodName === 'setup')) return [3 /*break*/, 3];
                        if (argsData === null || argsData === void 0 ? void 0 : argsData.help) {
                            core.help(HELP.PROXIED_SETUP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, fc_proxied_invoke_1.default.setup(fcProxiedInvoke.makeInputs(methodName))];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3:
                        if (!(methodName === 'invoke')) return [3 /*break*/, 5];
                        if (argsData === null || argsData === void 0 ? void 0 : argsData.help) {
                            core.help(HELP.PROXIED_INVOKE);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, fc_proxied_invoke_1.default.invoke(fcProxiedInvoke.makeInputs(methodName))];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5:
                        if (!(methodName === 'clean')) return [3 /*break*/, 7];
                        // clean
                        if (argsData === null || argsData === void 0 ? void 0 : argsData.help) {
                            core.help(HELP.PROXIED_CLEANUP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, fc_proxied_invoke_1.default.clean(fcProxiedInvoke.makeInputs(methodName))];
                    case 6: return [2 /*return*/, _b.sent()];
                    case 7:
                        // cleanup
                        if (argsData === null || argsData === void 0 ? void 0 : argsData.help) {
                            core.help(HELP.PROXIED_CLEANUP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, fc_proxied_invoke_1.default.cleanup(fcProxiedInvoke.makeInputs(methodName))];
                    case 8: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.fun2s = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, args, argsObj;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.handlerPreMethod.call(this, inputs, { getSecretKey: true })];
                    case 1:
                        _b.sent();
                        _a = this.handlerComponentInputs(inputs), args = _a.args, argsObj = _a.argsObj;
                        if (this.isHelp(args, argsObj)) {
                            return [2 /*return*/, core.help(HELP.FUN_TO_S)];
                        }
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'fc-transform', 'fun2fc', {}, args)];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.remote = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, methodName, isHelp, subCommandHelp, fcRemoteDebug;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.handlerPreMethod.call(this, inputs, { getSecretKey: true })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, fc_remote_debug_1.default.handlerComponentInputs(inputs)];
                    case 2:
                        _a = _b.sent(), methodName = _a.methodName, isHelp = _a.isHelp, subCommandHelp = _a.subCommandHelp;
                        if (isHelp) {
                            return [2 /*return*/];
                        }
                        fcRemoteDebug = new fc_remote_debug_1.default(inputs);
                        if (!(methodName === 'setup')) return [3 /*break*/, 4];
                        if (subCommandHelp) {
                            core.help(HELP.REMOTE_SETUP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, fc_remote_debug_1.default.setup(fcRemoteDebug.makeInputs(methodName))];
                    case 3: return [2 /*return*/, _b.sent()];
                    case 4:
                        if (!(methodName === 'invoke')) return [3 /*break*/, 6];
                        if (subCommandHelp) {
                            core.help(HELP.REMOTE_INVOKE);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, fc_remote_debug_1.default.invoke(fcRemoteDebug.makeInputs(methodName))];
                    case 5: return [2 /*return*/, _b.sent()];
                    case 6:
                        if (!(methodName === 'cleanup')) return [3 /*break*/, 8];
                        if (subCommandHelp) {
                            core.help(HELP.REMOTE_CLEANUP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, fc_remote_debug_1.default.cleanup(fcRemoteDebug.makeInputs(methodName))];
                    case 7: return [2 /*return*/, _b.sent()];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    FcBaseComponent.prototype.eval = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, isHelp, project, evalOpts, httpTypeOpts, payloadOpts, region, commandName, fcEval, fcEvalArgs;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.handlerPreMethod.call(this, inputs, { getSecretKey: true })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, fc_eval_1.default.handlerComponentInputs(inputs)];
                    case 2:
                        _a = _b.sent(), isHelp = _a.isHelp, project = _a.project, evalOpts = _a.evalOpts, httpTypeOpts = _a.httpTypeOpts, payloadOpts = _a.payloadOpts, region = _a.region, commandName = _a.commandName;
                        if (isHelp) {
                            return [2 /*return*/];
                        }
                        fcEval = new fc_eval_1.default(project === null || project === void 0 ? void 0 : project.access, region, evalOpts, httpTypeOpts, payloadOpts);
                        if (commandName === 'start') {
                            fcEvalArgs = fcEval.makeStartArgs();
                        }
                        else {
                            this.logger.error("invalid command ".concat(commandName));
                            return [2 /*return*/];
                        }
                        this.logger.debug("Input args of fc-eval component is: ".concat(fcEvalArgs));
                        delete inputs.argsObj;
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/fc-eval', commandName, null, fcEvalArgs)];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.env = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, props, args, argsObj;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.handlerPreMethod.call(this, inputs, { getSecretKey: true })];
                    case 1:
                        _b.sent();
                        _a = this.handlerComponentInputs(inputs), props = _a.props, args = _a.args, argsObj = _a.argsObj;
                        if (this.isHelp(args, argsObj)) {
                            core.help(HELP.ENV_HELP_INFO);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/infrastructure-as-template', 'env', props, args)];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.api = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, props, args, argsObj;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.handlerComponentInputs(inputs), props = _a.props, args = _a.args, argsObj = _a.argsObj;
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'fc-api-component', 'index', props, args)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    return FcBaseComponent;
}(entry_public_method_1.default));
exports.default = FcBaseComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0QywwREFBOEM7QUFDOUMsd0NBQTRCO0FBQzVCLDJEQUFxQztBQUNyQywrQ0FBbUM7QUFDbkMsNkRBQWlEO0FBQ2pELDJEQUErQztBQUMvQyw0REFBc0M7QUFFdEMsNkNBQTBEO0FBRTFELHNFQUFnRDtBQUVoRCxxQ0FBdUQ7QUFDdkQsK0NBQW1DO0FBQ25DLHdFQUFpRDtBQUNqRCxvRUFBOEM7QUFDOUMsZ0VBQTBDO0FBQzFDLHdFQUFpRDtBQUNqRCxrRUFBNEM7QUFDNUMsOERBQXdDO0FBQ3hDLHdFQUFrRDtBQUNsRCw4RUFBc0Q7QUFDdEQsd0ZBQWdFO0FBQ2hFLG9GQUE0RDtBQUM1RCxvRUFBNkM7QUFFN0MsOERBQXVDO0FBQ3ZDLGdFQUEwQztBQUUxQyxJQUFNLDBCQUEwQixHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBRXREO0lBQTZDLG1DQUFpQjtJQUE5RDtRQUFBLHFFQXVtQkM7UUF0bUJDLFlBQU0sR0FBRyxnQkFBTSxDQUFDOztJQXNtQmxCLENBQUM7SUFwbUJPLGtDQUFRLEdBQWQsVUFBZSxNQUFNOzs7Ozs0QkFDbkIscUJBQU0saUJBQU0sZ0JBQWdCLFlBQUMsTUFBTSxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUE7O3dCQUE1RCxTQUE0RCxDQUFDO3dCQUt6RCxxQkFBTSxrQkFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBSmxDLEtBSUYsU0FBb0MsRUFIdEMsSUFBSSxVQUFBLEVBQ0osVUFBVSxnQkFBQSxFQUNWLEtBQUssV0FBQTt3QkFHUCxJQUFJLElBQUksRUFBRTs0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