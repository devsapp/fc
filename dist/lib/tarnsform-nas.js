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
Object.defineProperty(exports, "__esModule", { value: true });
var core = __importStar(require("@serverless-devs/core"));
var lodash_1 = __importStar(require("lodash"));
var utils_1 = require("./utils");
var HANDlER_NAS_COMMANDS = ['ls', 'cp', 'rm', 'download', 'upload', 'command'];
function toNas(props, nonOptionsArgs, args, access, commandName, credentials) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, vpcConfig, nasConfig, role, name, vpcId, vSwitchIds, securityGroupId, userId, groupId, mountPoints, _b, fcDirInput, needAppendNas, _c, serverAddr, nasDir, transformInputDir, tarnsformArgs;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, getServiceConfig(props, access, credentials)];
                case 1:
                    _a = _d.sent(), vpcConfig = _a.vpcConfig, nasConfig = _a.nasConfig, role = _a.role, name = _a.name;
                    if (!nasConfig) {
                        throw new Error('Not fount nasConfig.');
                    }
                    if (!vpcConfig) {
                        throw new Error('Not fount vpcConfig.');
                    }
                    vpcId = vpcConfig.vpcId, vSwitchIds = vpcConfig.vSwitchIds, securityGroupId = vpcConfig.securityGroupId;
                    if (!vpcId) {
                        throw new Error("Service " + name + " is configured for query to vpc");
                    }
                    userId = nasConfig.userId, groupId = nasConfig.groupId, mountPoints = nasConfig.mountPoints;
                    if (lodash_1.isEmpty(mountPoints)) {
                        throw new Error("Service " + name + " is configured for query to nas");
                    }
                    _b = getFcDirPath(nonOptionsArgs, commandName), fcDirInput = _b.fcDirInput, needAppendNas = _b.needAppendNas;
                    if (HANDlER_NAS_COMMANDS.includes(commandName) && !fcDirInput) {
                        throwError(args, commandName, nonOptionsArgs);
                    }
                    _c = getMount(mountPoints, fcDirInput), serverAddr = _c.serverAddr, nasDir = _c.nasDir, transformInputDir = _c.transformInputDir;
                    if (!serverAddr) {
                        throw new Error("There is no nas configuration matching the path [" + fcDirInput + "]");
                    }
                    tarnsformArgs = args;
                    if (!lodash_1.default.isNil(transformInputDir)) {
                        tarnsformArgs = transfromArgsFunction(args, fcDirInput, needAppendNas ? "nas://" + transformInputDir : transformInputDir);
                    }
                    core.Logger.debug('FC', "tarnsformArgs: " + tarnsformArgs);
                    return [2 /*return*/, {
                            tarnsformArgs: tarnsformArgs,
                            payload: {
                                regionId: props === null || props === void 0 ? void 0 : props.region,
                                serviceName: "_FC_NAS_" + name,
                                description: "service for fc nas used for service " + name,
                                vpcId: vpcId,
                                vSwitchId: vSwitchIds[0],
                                securityGroupId: securityGroupId,
                                role: role,
                                userId: userId,
                                groupId: groupId,
                                mountPointDomain: serverAddr,
                                nasDir: nasDir,
                            },
                        }];
            }
        });
    });
}
exports.default = toNas;
function transfromArgsFunction(tarnsformArgs, fcDirInput, transformInputDir) {
    tarnsformArgs = tarnsformArgs.replace(fcDirInput, transformInputDir);
    if (tarnsformArgs.includes(fcDirInput)) {
        return transfromArgsFunction(tarnsformArgs, fcDirInput, transformInputDir);
    }
    return tarnsformArgs;
}
function throwError(args, commandName, nonOptionsArgs) {
    var example = "\n     Example: \n\t  s nas upload -r -n ./local-path /mnt/nas-path\n\t  s nas download -r /mnt/nas-path ./local-path";
    if (['upload', 'download'].includes(commandName)) {
        if (nonOptionsArgs.length < 2) {
            throw new Error("It is expected that there needs to be a local path and a remote path, only one path is obtained in [" + args + "]" + example);
        }
        if (nonOptionsArgs.length > 2) {
            throw new Error("It is expected that there needs to be a local path and a remote path, and multiple paths are obtained in [" + args + "]" + example);
        }
        if (nonOptionsArgs.length === 2) {
            throw new Error("The nas remote path was not started with /mnt/ or /home/ in [" + args + "]" + example);
        }
    }
    throw new Error("The path of nas was not found in [" + args + "]" + example);
}
function getMount(mountPoints, fcDirInput) {
    if (fcDirInput === void 0) { fcDirInput = ''; }
    for (var _i = 0, mountPoints_1 = mountPoints; _i < mountPoints_1.length; _i++) {
        var mountPointItem = mountPoints_1[_i];
        var fcDir = mountPointItem.mountDir;
        if (lodash_1.default.isNil(mountPointItem.serverAddr) || lodash_1.default.isNil(fcDir)) {
            throw new Error("Handling mountPoints exception\uFF0CmountPoint is " + JSON.stringify(mountPoints));
        }
        var _a = mountPointItem.serverAddr.split(':'), serverAddr = _a[0], nasDir = _a[1];
        var suffix = fcDirInput.slice(fcDir.length);
        if (fcDirInput.startsWith(fcDir) && (!suffix || suffix.startsWith('/'))) {
            var transformInputDir = fcDirInput.replace(fcDir, nasDir);
            return { serverAddr: serverAddr, nasDir: nasDir, transformInputDir: transformInputDir };
        }
    }
    return {};
}
function getFcDirPath(inputPaths, commandName) {
    for (var _i = 0, inputPaths_1 = inputPaths; _i < inputPaths_1.length; _i++) {
        var inputPath = inputPaths_1[_i];
        if (inputPath.indexOf('nas://') === 0) {
            var fcDirInput = inputPath.slice(6);
            core.Logger.debug('FC', "inputNasPath: " + inputPath + ", fcDirInput: " + fcDirInput);
            return { fcDirInput: fcDirInput, needAppendNas: false };
        }
    }
    // 支持非 nas:// 写法
    if (commandName === 'upload' && isFcDirStart(inputPaths[1])) {
        return { fcDirInput: inputPaths[1], needAppendNas: true };
    }
    else if (commandName === 'download' && isFcDirStart(inputPaths[0])) {
        return { fcDirInput: inputPaths[0], needAppendNas: true };
    }
    else if (commandName === 'command') {
        for (var _a = 0, inputPaths_2 = inputPaths; _a < inputPaths_2.length; _a++) {
            var inputPath = inputPaths_2[_a];
            if (isFcDirStart(inputPath)) {
                return { fcDirInput: inputPath, needAppendNas: false };
            }
        }
    }
    return {};
}
function isFcDirStart(dirInput) {
    return (dirInput === null || dirInput === void 0 ? void 0 : dirInput.startsWith('/mnt/')) || (dirInput === null || dirInput === void 0 ? void 0 : dirInput.startsWith('/home/'));
}
function getServiceConfig(props, access, credentials) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function () {
        var _g, name, vpcConfig, nasConfig, role, config, stateId, cacheData;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _g = (props === null || props === void 0 ? void 0 : props.service) || {}, name = _g.name, vpcConfig = _g.vpcConfig, nasConfig = _g.nasConfig, role = _g.role;
                    config = {
                        name: name, vpcConfig: vpcConfig, nasConfig: nasConfig, role: role,
                    };
                    if (!lodash_1.default.isEmpty(credentials)) return [3 /*break*/, 2];
                    return [4 /*yield*/, core.getCredential(access)];
                case 1:
                    credentials = _h.sent();
                    _h.label = 2;
                case 2:
                    stateId = utils_1.genServiceStateID(credentials.AccountID, props === null || props === void 0 ? void 0 : props.region, name);
                    return [4 /*yield*/, core.getState(stateId)];
                case 3:
                    cacheData = (_h.sent()) || {};
                    if (utils_1.isAutoConfig(vpcConfig) || lodash_1.default.isEmpty(vpcConfig)) {
                        config.vpcConfig = ((_a = cacheData === null || cacheData === void 0 ? void 0 : cacheData.statefulAutoConfig) === null || _a === void 0 ? void 0 : _a.vpcConfig) || ((_b = cacheData === null || cacheData === void 0 ? void 0 : cacheData.statefulConfig) === null || _b === void 0 ? void 0 : _b.vpcConfig);
                    }
                    if (utils_1.isAutoConfig(nasConfig)) {
                        config.nasConfig = ((_c = cacheData === null || cacheData === void 0 ? void 0 : cacheData.statefulAutoConfig) === null || _c === void 0 ? void 0 : _c.nasConfig) || ((_d = cacheData === null || cacheData === void 0 ? void 0 : cacheData.statefulConfig) === null || _d === void 0 ? void 0 : _d.nasConfig);
                    }
                    if (!lodash_1.default.isString(role)) {
                        config.role = ((_e = cacheData === null || cacheData === void 0 ? void 0 : cacheData.statefulAutoConfig) === null || _e === void 0 ? void 0 : _e.role) || ((_f = cacheData === null || cacheData === void 0 ? void 0 : cacheData.statefulConfig) === null || _f === void 0 ? void 0 : _f.role);
                    }
                    return [2 /*return*/, config];
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFybnNmb3JtLW5hcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdGFybnNmb3JtLW5hcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBOEM7QUFDOUMsK0NBQW9DO0FBQ3BDLGlDQUEwRDtBQUUxRCxJQUFNLG9CQUFvQixHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUVqRixTQUE4QixLQUFLLENBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxXQUFXOzs7Ozt3QkFNM0YscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsRUFBQTs7b0JBTGhELEtBS0YsU0FBa0QsRUFKcEQsU0FBUyxlQUFBLEVBQ1QsU0FBUyxlQUFBLEVBQ1QsSUFBSSxVQUFBLEVBQ0osSUFBSSxVQUFBO29CQUdOLElBQUksQ0FBQyxTQUFTLEVBQUU7d0JBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO3FCQUN6QztvQkFFRCxJQUFJLENBQUMsU0FBUyxFQUFFO3dCQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztxQkFDekM7b0JBRU8sS0FBSyxHQUFrQyxTQUFTLE1BQTNDLEVBQUUsVUFBVSxHQUFzQixTQUFTLFdBQS9CLEVBQUUsZUFBZSxHQUFLLFNBQVMsZ0JBQWQsQ0FBZTtvQkFFekQsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDVixNQUFNLElBQUksS0FBSyxDQUFDLGFBQVcsSUFBSSxvQ0FBaUMsQ0FBQyxDQUFDO3FCQUNuRTtvQkFFTyxNQUFNLEdBQTJCLFNBQVMsT0FBcEMsRUFBRSxPQUFPLEdBQWtC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