"use strict";
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
exports.componentMethodCaller = exports.tableShow = exports.isHttpFunction = exports.getFcNames = exports.genServiceStateID = exports.isAutoConfig = exports.promptForConfirmOrDetails = exports.getCredentials = void 0;
var tty_table_1 = __importDefault(require("tty-table"));
var lodash_1 = __importDefault(require("lodash"));
var core = __importStar(require("@serverless-devs/core"));
var logger_1 = __importDefault(require("../common/logger"));
var inquirer_1 = __importDefault(require("inquirer"));
function getCredentials(credentials, access) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!lodash_1.default.isEmpty(credentials)) return [3 /*break*/, 2];
                    return [4 /*yield*/, core.getCredential(access)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2: return [2 /*return*/, credentials];
            }
        });
    });
}
exports.getCredentials = getCredentials;
function promptForConfirmOrDetails(message) {
    return __awaiter(this, void 0, void 0, function () {
        var answers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt([{
                            type: 'list',
                            name: 'prompt',
                            message: message,
                            choices: ['yes', 'no'],
                        }])];
                case 1:
                    answers = _a.sent();
                    return [2 /*return*/, answers.prompt === 'yes'];
            }
        });
    });
}
exports.promptForConfirmOrDetails = promptForConfirmOrDetails;
function isAutoConfig(config) {
    return config === 'auto' || config === 'Auto';
}
exports.isAutoConfig = isAutoConfig;
function genServiceStateID(accountID, region, serviceName) {
    return accountID + "-" + region + "-" + serviceName;
}
exports.genServiceStateID = genServiceStateID;
function getFcNames(argsParse, inputsProps) {
    var _a, _b;
    if (argsParse === null || argsParse === void 0 ? void 0 : argsParse.region) {
        return {
            region: argsParse.region,
            serviceName: argsParse['service-name'],
            functionName: argsParse['function-name'],
        };
    }
    return {
        region: inputsProps === null || inputsProps === void 0 ? void 0 : inputsProps.region,
        serviceName: (_a = inputsProps === null || inputsProps === void 0 ? void 0 : inputsProps.service) === null || _a === void 0 ? void 0 : _a.name,
        functionName: (_b = inputsProps === null || inputsProps === void 0 ? void 0 : inputsProps.function) === null || _b === void 0 ? void 0 : _b.name,
    };
}
exports.getFcNames = getFcNames;
function isHttpFunction(props) {
    var triggers = props === null || props === void 0 ? void 0 : props.triggers;
    if (lodash_1.default.isEmpty(triggers)) {
        return false;
    }
    for (var _i = 0, triggers_1 = triggers; _i < triggers_1.length; _i++) {
        var trigger = triggers_1[_i];
        if (trigger.type === 'http') {
            return true;
        }
    }
    return false;
}
exports.isHttpFunction = isHttpFunction;
exports.tableShow = function (data, showKey) {
    var options = {
        borderStyle: 'solid',
        borderColor: 'blue',
        headerAlign: 'center',
        align: 'left',
        color: 'cyan',
        width: '100%',
    };
    var header_option = {
        headerColor: 'cyan',
        color: 'cyan',
        align: 'left',
        width: 'auto',
        formatter: function (value) { return value; },
    };
    var header = showKey.map(function (value) { return (lodash_1.default.isString(value) ? (__assign(__assign({}, header_option), { value: value })) : (__assign(__assign({}, header_option), value))); });
    console.log(tty_table_1.default(header, data, options).render());
};
function componentMethodCaller(inputs, componentName, methodName, props, args, argsObj) {
    return __awaiter(this, void 0, void 0, function () {
        var componentIns;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inputs.props = props || (inputs === null || inputs === void 0 ? void 0 : inputs.props);
                    inputs.args = args || (inputs === null || inputs === void 0 ? void 0 : inputs.args);
                    inputs.argsObj = argsObj || (inputs === null || inputs === void 0 ? void 0 : inputs.argsObj);
                    return [4 /*yield*/, core.load("" + componentName)];
                case 1:
                    componentIns = _a.sent();
                    logger_1.default.debug("Inputs of component: " + componentName + " is: " + JSON.stringify(inputs, null, '  '));
                    return [4 /*yield*/, componentIns[methodName](inputs)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.componentMethodCaller = componentMethodCaller;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLHdEQUE4QjtBQUM5QixrREFBdUI7QUFDdkIsMERBQThDO0FBQzlDLDREQUFzQztBQUN0QyxzREFBZ0M7QUFFaEMsU0FBc0IsY0FBYyxDQUFDLFdBQXlCLEVBQUUsTUFBYzs7Ozs7eUJBQ3hFLGdCQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUF0Qix3QkFBc0I7b0JBQ2pCLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUE7d0JBQXZDLHNCQUFPLFNBQWdDLEVBQUM7d0JBRTFDLHNCQUFPLFdBQVcsRUFBQzs7OztDQUNwQjtBQUxELHdDQUtDO0FBRUQsU0FBc0IseUJBQXlCLENBQUMsT0FBZTs7Ozs7d0JBQ3hDLHFCQUFNLGtCQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQzFDLElBQUksRUFBRSxNQUFNOzRCQUNaLElBQUksRUFBRSxRQUFROzRCQUNkLE9BQU8sU0FBQTs0QkFDUCxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDO3lCQUN2QixDQUFDLENBQUMsRUFBQTs7b0JBTEcsT0FBTyxHQUFRLFNBS2xCO29CQUVILHNCQUFPLE9BQU8sQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFDOzs7O0NBQ2pDO0FBVEQsOERBU0M7QUFFRCxTQUFnQixZQUFZLENBQUMsTUFBVztJQUN0QyxPQUFPLE1BQU0sS0FBSyxNQUFNLElBQUksTUFBTSxLQUFLLE1BQU0sQ0FBQztBQUNoRCxDQUFDO0FBRkQsb0NBRUM7QUFFRCxTQUFnQixpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFdBQVc7SUFDOUQsT0FBVSxTQUFTLFNBQUksTUFB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