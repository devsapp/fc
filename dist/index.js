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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var static_1 = require("./lib/static");
var tarnsform_nas_1 = __importDefault(require("./lib/tarnsform-nas"));
var sls_1 = require("./lib/interface/sls");
var utils_1 = require("./lib/utils");
var tips = __importStar(require("./lib/tips"));
var SUPPORTED_LOCAL_METHOD = ['invoke', 'start'];
var FcBaseComponent = /** @class */ (function () {
    function FcBaseComponent() {
    }
    // 解析入参
    FcBaseComponent.prototype.handlerInputs = function (inputs) {
        var project = inputs === null || inputs === void 0 ? void 0 : inputs.project;
        var props = inputs === null || inputs === void 0 ? void 0 : inputs.props;
        var access = project === null || project === void 0 ? void 0 : project.access;
        var args = inputs === null || inputs === void 0 ? void 0 : inputs.args;
        var curPath = inputs === null || inputs === void 0 ? void 0 : inputs.path;
        var projectName = project === null || project === void 0 ? void 0 : project.projectName;
        var appName = inputs === null || inputs === void 0 ? void 0 : inputs.appName;
        return {
            appName: appName,
            projectName: projectName,
            access: access,
            props: props,
            args: args,
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
                        if (!_.isEmpty(accountID)) return [3 /*break*/, 2];
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
        var _a = this.handlerInputs(inputs), appName = _a.appName, projectName = _a.projectName, access = _a.access, props = _a.props, args = _a.args, curPath = _a.curPath;
        return {
            project: {
                component: componentName,
                projectName: componentName ? projectName + "-" + componentName + "-project" : projectName,
                access: access,
            },
            appName: appName,
            props: props,
            args: args,
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
    FcBaseComponent.prototype.deploy = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, props, args, deployRes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.handlerComponentInputs(inputs), props = _a.props, args = _a.args;
                        return [4 /*yield*/, this.componentMethodCaller(inputs, 'devsapp/fc-deploy', 'deploy', props, args)];
                    case 1:
                        deployRes = _b.sent();
                        tips.showNextTip(args, tips.showDeployNextTips);
                        return [2 /*return*/, deployRes];
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
                            core.help(static_1.BUILD_HELP_INFO);
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
                            core.help(static_1.LOCAL_HELP_INFO);
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
                            core.help(static_1.LOCAL_START_HELP_INFO);
                            return [2 /*return*/];
                        }
                        if ((argsData === null || argsData === void 0 ? void 0 : argsData.help) && methodName === 'invoke') {
                            core.help(static_1.LOCAL_INVOKE_HELP_INFO);
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
                            core.help(static_1.INVOKE_HELP_INFO);
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
                            core.help(static_1.LOGS_HELP_INFO);
                            return [2 /*return*/];
                        }
                        _e = utils_1.getFcNames(comParse, props), region = _e.region, serviceName = _e.serviceName, functionName = _e.functionName;
                        this.logger.debug("[logs] region: " + region + ", serviceName: " + serviceName + ", functionName: " + functionName);
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.info(inputs)];
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
                            core.help(static_1.METRICS_HELP_INFO);
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
                            core.help(static_1.NAS_HELP_INFO);
                            return [2 /*return*/];
                        }
                        if (nonOptionsArgs.length === 0) {
                            if (!((_b = comParse === null || comParse === void 0 ? void 0 : comParse.data) === null || _b === void 0 ? void 0 : _b.help)) {
                                this.logger.error('Not fount sub-command.');
                            }
                            core.help(static_1.NAS_HELP_INFO);
                            return [2 /*return*/];
                        }
                        commandName = nonOptionsArgs[0];
                        if (!SUPPORTED_METHOD.includes(commandName)) {
                            this.logger.error("Not supported sub-command: [" + commandName + "]");
                            core.help(static_1.NAS_HELP_INFO);
                            return [2 /*return*/];
                        }
                        tarnsformArgs = args.replace(commandName, '').replace(/(^\s*)|(\s*$)/g, '');
                        if ((_c = comParse === null || comParse === void 0 ? void 0 : comParse.data) === null || _c === void 0 ? void 0 : _c.help) {
                            core.help(static_1.NAS_SUB_COMMAND_HELP_INFO[commandName]);
                            return [2 /*return*/];
                        }
                        nonOptionsArgs.shift();
                        return [4 /*yield*/, tarnsform_nas_1.default(props, nonOptionsArgs, tarnsformArgs, project === null || project === void 0 ? void 0 : project.access)];
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
    FcBaseComponent.prototype.help = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.report('fc', 'help', null, (_a = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
                    case 1:
                        _b.sent();
                        core.help(static_1.COMPONENT_HELP_INFO);
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core.HLogger('FC'),
        __metadata("design:type", Object)
    ], FcBaseComponent.prototype, "logger", void 0);
    return FcBaseComponent;
}());
exports.default = FcBaseComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBQzlDLHdDQUE0QjtBQUM1Qix1Q0FDb0k7QUFDcEksc0VBQStDO0FBRy9DLDJDQUFrRDtBQUtsRCxxQ0FBeUM7QUFDekMsK0NBQW1DO0FBRW5DLElBQU0sc0JBQXNCLEdBQWEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDN0Q7SUFBQTtJQW1UQSxDQUFDO0lBaFRDLE9BQU87SUFDQyx1Q0FBYSxHQUFyQixVQUFzQixNQUFlO1FBQ25DLElBQU0sT0FBTyxHQUFHLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxPQUFPLENBQUM7UUFDaEMsSUFBTSxLQUFLLEdBQWdCLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxLQUFLLENBQUM7UUFDekMsSUFBTSxNQUFNLEdBQVcsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLE1BQU0sQ0FBQztRQUN2QyxJQUFNLElBQUksR0FBVyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsSUFBSSxDQUFDO1FBQ2xDLElBQU0sT0FBTyxHQUFXLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxJQUFJLENBQUM7UUFDckMsSUFBTSxXQUFXLEdBQVcsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFdBQVcsQ0FBQztRQUNqRCxJQUFNLE9BQU8sR0FBVyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsT0FBTyxDQUFDO1FBRXhDLE9BQU87WUFDTCxPQUFPLFNBQUE7WUFDUCxXQUFXLGFBQUE7WUFDWCxNQUFNLFFBQUE7WUFDTixLQUFLLE9BQUE7WUFDTCxJQUFJLE1BQUE7WUFDSixP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