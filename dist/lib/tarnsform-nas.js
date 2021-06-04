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
var lodash_1 = require("lodash");
var utils_1 = require("./utils");
function toNas(props, nonOptionsArgs, args, access) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, vpcConfig, nasConfig, role, name, vpcId, vswitchIds, securityGroupId, userId, groupId, mountPoints, fcDirInput, _b, serverAddr, nasDir, tarnsforInputDir;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, getServiceConfig(props, access)];
                case 1:
                    _a = _c.sent(), vpcConfig = _a.vpcConfig, nasConfig = _a.nasConfig, role = _a.role, name = _a.name;
                    if (!nasConfig) {
                        throw new Error('Not fount nasConfig.');
                    }
                    if (!vpcConfig) {
                        throw new Error('Not fount vpcConfig.');
                    }
                    vpcId = vpcConfig.vpcId, vswitchIds = vpcConfig.vswitchIds, securityGroupId = vpcConfig.securityGroupId;
                    if (!vpcId) {
                        throw new Error("Service " + name + " is configured for query to vpc");
                    }
                    userId = nasConfig.userId, groupId = nasConfig.groupId, mountPoints = nasConfig.mountPoints;
                    if (lodash_1.isEmpty(mountPoints)) {
                        throw new Error("Service " + name + " is configured for query to nas");
                    }
                    fcDirInput = getFcDirPath(nonOptionsArgs);
                    _b = getMount(fcDirInput, mountPoints), serverAddr = _b.serverAddr, nasDir = _b.nasDir, tarnsforInputDir = _b.tarnsforInputDir;
                    if (!serverAddr) {
                        core.Logger.warn('FC', 'Not fount serverAddr/nasDir');
                    }
                    return [2 /*return*/, {
                            tarnsformArgs: args.replace(fcDirInput, tarnsforInputDir),
                            payload: {
                                regionId: props === null || props === void 0 ? void 0 : props.region,
                                serviceName: "_FC_NAS_" + name,
                                description: "service for fc nas used for service " + name,
                                vpcId: vpcId,
                                vSwitchId: vswitchIds[0],
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
function getMount(fcDirInput, mountPoints) {
    for (var _i = 0, mountPoints_1 = mountPoints; _i < mountPoints_1.length; _i++) {
        var _a = mountPoints_1[_i], serverAddr = _a.serverAddr, nasDir = _a.nasDir, fcDir = _a.fcDir;
        var suffix = fcDirInput.slice(fcDir.length);
        if (fcDirInput.startsWith(fcDir) && (!suffix || suffix.startsWith('/'))) {
            var tarnsforInputDir = fcDirInput.replace(fcDir, nasDir);
            return { serverAddr: serverAddr, nasDir: nasDir, tarnsforInputDir: tarnsforInputDir };
        }
    }
    return {};
}
function getFcDirPath(inputPaths) {
    for (var _i = 0, inputPaths_1 = inputPaths; _i < inputPaths_1.length; _i++) {
        var inputPath = inputPaths_1[_i];
        if (inputPath.indexOf('nas://') === 0) {
            var fcDirInput = inputPath.slice(6);
            core.Logger.debug('FC', "inputNasPath: " + inputPath + ", fcDirInput: " + fcDirInput);
            return fcDirInput;
        }
    }
}
function getServiceConfig(props, access) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var _c, name, vpcConfig, nasConfig, role, credential, stateId, data;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _c = (props === null || props === void 0 ? void 0 : props.service) || {}, name = _c.name, vpcConfig = _c.vpcConfig, nasConfig = _c.nasConfig, role = _c.role;
                    if (!(utils_1.isAutoConfig(nasConfig) || utils_1.isAutoConfig(vpcConfig) || !lodash_1.isString(role))) return [3 /*break*/, 3];
                    return [4 /*yield*/, core.getCredential(access)];
                case 1:
                    credential = _d.sent();
                    stateId = utils_1.genServiceStateID(credential.AccountID, props === null || props === void 0 ? void 0 : props.region, name);
                    return [4 /*yield*/, core.getState(stateId)];
                case 2:
                    data = ((_a = (_d.sent())) === null || _a === void 0 ? void 0 : _a.resolvedConfig) || {};
                    if (lodash_1.isEmpty(data)) {
                        throw new Error('Configuration is not obtained, please execute the [s exec -- deploy] first.');
                    }
                    return [2 /*return*/, data];
                case 3: return [2 /*return*/, {
                        vpcConfig: vpcConfig,
                        nasConfig: nasConfig,
                        name: name,
                        role: (_b = props === null || props === void 0 ? void 0 : props.service) === null || _b === void 0 ? void 0 : _b.role,
                    }];
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFybnNmb3JtLW5hcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdGFybnNmb3JtLW5hcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBOEM7QUFDOUMsaUNBQTJDO0FBQzNDLGlDQUEwRDtBQUcxRCxTQUE4QixLQUFLLENBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsTUFBTTs7Ozs7d0JBTWpFLHFCQUFNLGdCQUFnQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBQTs7b0JBTG5DLEtBS0YsU0FBcUMsRUFKdkMsU0FBUyxlQUFBLEVBQ1QsU0FBUyxlQUFBLEVBQ1QsSUFBSSxVQUFBLEVBQ0osSUFBSSxVQUFBO29CQUdOLElBQUksQ0FBQyxTQUFTLEVBQUU7d0JBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO3FCQUN6QztvQkFFRCxJQUFJLENBQUMsU0FBUyxFQUFFO3dCQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztxQkFDekM7b0JBRU8sS0FBSyxHQUFrQyxTQUFTLE1BQTNDLEVBQUUsVUFBVSxHQUFzQixTQUFTLFdBQS9CLEVBQUUsZUFBZSxHQUFLLFNBQVMsZ0JBQWQsQ0FBZTtvQkFFekQsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDVixNQUFNLElBQUksS0FBSyxDQUFDLGFBQVcsSUFBSSxvQ0FBaUMsQ0FBQyxDQUFDO3FCQUNuRTtvQkFFTyxNQUFNLEdBQTJCLFNBQVMsT0FBcEMsRUFBRSxPQUFPLEdBQWtCLFNBQVMsUUFBM0IsRUFBRSxXQUFXLEdBQUssU0FBUyxZQUFkLENBQWU7b0JBQ25ELElBQUksZ0JBQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTt3QkFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxhQUFXLElBQUksb0NBQWlD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