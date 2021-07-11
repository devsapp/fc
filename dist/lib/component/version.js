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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core = __importStar(require("@serverless-devs/core"));
var client_1 = __importDefault(require("../client"));
var logger_1 = __importDefault(require("../../common/logger"));
var help_constant = __importStar(require("../help/version"));
var utils_1 = require("../utils");
var VERSION_COMMAND = ['list', 'publish', 'delete', 'deleteAll'];
var Version = /** @class */ (function () {
    function Version(_a) {
        var region = _a.region, credentials = _a.credentials;
        client_1.default.setFcClient(region, credentials);
    }
    Version.handlerInputs = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var parsedArgs, parsedData, rawData, subCommand, props, endProps, credentials, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        logger_1.default.debug("inputs.props: " + JSON.stringify(inputs.props));
                        parsedArgs = core.commandParse(inputs, {
                            boolean: ['help', 'table'],
                            string: ['region', 'service-name', 'description', 'id'],
                            alias: { help: 'h', 'version-id': 'id' },
                        });
                        parsedData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                        rawData = parsedData._ || [];
                        if (!rawData.length) {
                            core.help(help_constant.VERSION);
                            process.exit();
                        }
                        subCommand = rawData[0];
                        logger_1.default.debug("version subCommand: " + subCommand);
                        if (!VERSION_COMMAND.includes(subCommand)) {
                            core.help(help_constant.VERSION);
                            return [2 /*return*/, { errorMessage: "Does not support " + subCommand + " command" }];
                        }
                        if (parsedData.help) {
                            core.help(help_constant[("version_" + subCommand).toLocaleUpperCase()]);
                            return [2 /*return*/, { help: true, subCommand: subCommand }];
                        }
                        props = inputs.props || {};
                        endProps = {
                            region: parsedData.region || props.region,
                            serviceName: parsedData['service-name'] || ((_a = props.service) === null || _a === void 0 ? void 0 : _a.name),
                            description: parsedData.description,
                            versionId: parsedData.id,
                        };
                        if (!endProps.region) {
                            throw new Error('Not fount region');
                        }
                        if (!endProps.serviceName) {
                            throw new Error('Not fount serviceName');
                        }
                        _c = inputs.credentials;
                        if (_c) return [3 /*break*/, 2];
                        return [4 /*yield*/, core.getCredential((_b = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _b === void 0 ? void 0 : _b.access)];
                    case 1:
                        _c = (_d.sent());
                        _d.label = 2;
                    case 2:
                        credentials = _c;
                        logger_1.default.debug("handler inputs props: " + JSON.stringify(endProps));
                        return [2 /*return*/, {
                                credentials: credentials,
                                subCommand: subCommand,
                                props: endProps,
                                table: parsedData.table,
                            }];
                }
            });
        });
    };
    Version.prototype.list = function (_a, table) {
        var serviceName = _a.serviceName;
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger_1.default.info("Getting listVersions: " + serviceName);
                        return [4 /*yield*/, client_1.default.fcClient.get_all_list_data("/services/" + serviceName + "/versions", 'versions')];
                    case 1:
                        data = _b.sent();
                        if (table) {
                            utils_1.tableShow(data, ['versionId', 'description', 'createdTime', 'lastModifiedTime']);
                        }
                        else {
                            return [2 /*return*/, data];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Version.prototype.publish = function (_a) {
        var serviceName = _a.serviceName, description = _a.description;
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger_1.default.info("Creating service version: " + serviceName);
                        return [4 /*yield*/, client_1.default.fcClient.publishVersion(serviceName, description)];
                    case 1:
                        data = (_b.sent()).data;
                        logger_1.default.debug("publish version: " + JSON.stringify(data));
                        return [2 /*return*/, data];
                }
            });
        });
    };
    Version.prototype.delete = function (_a) {
        var serviceName = _a.serviceName, versionId = _a.versionId;
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!versionId) {
                            throw new Error('Not fount versionId');
                        }
                        logger_1.default.info("Removing service version: " + serviceName + "." + versionId);
                        return [4 /*yield*/, client_1.default.fcClient.deleteVersion(serviceName, versionId)];
                    case 1:
                        res = _b.sent();
                        logger_1.default.debug("delete version: " + JSON.stringify(res));
                        return [2 /*return*/];
                }
            });
        });
    };
    Version.prototype.deleteAll = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var listData, serviceName, _i, listData_1, versionId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.list(props)];
                    case 1:
                        listData = _a.sent();
                        serviceName = props.serviceName;
                        _i = 0, listData_1 = listData;
                        _a.label = 2;
                    case 2:
                        if (!(_i < listData_1.length)) return [3 /*break*/, 5];
                        versionId = listData_1[_i].versionId;
                        return [4 /*yield*/, this.delete({ serviceName: serviceName, versionId: versionId })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return Version;
}());
exports.default = Version;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY29tcG9uZW50L3ZlcnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBRTlDLHFEQUErQjtBQUMvQiwrREFBeUM7QUFDekMsNkRBQWlEO0FBQ2pELGtDQUFxQztBQVNyQyxJQUFNLGVBQWUsR0FBYSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBRTdFO0lBd0RFLGlCQUFZLEVBQXVCO1lBQXJCLE1BQU0sWUFBQSxFQUFFLFdBQVcsaUJBQUE7UUFDL0IsZ0JBQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUF6RFkscUJBQWEsR0FBMUIsVUFBMkIsTUFBTTs7Ozs7Ozt3QkFDL0IsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsbUJBQWlCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRyxDQUFDLENBQUM7d0JBRXhELFVBQVUsR0FBeUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7NEJBQ2pFLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7NEJBQzFCLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQzs0QkFDdkQsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFO3lCQUN6QyxDQUFDLENBQUM7d0JBRUcsVUFBVSxHQUFHLENBQUEsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLElBQUksS0FBSSxFQUFFLENBQUM7d0JBQ3BDLE9BQU8sR0FBRyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVB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