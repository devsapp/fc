"use strict";
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
exports.clean = exports.invoke = exports.setup = void 0;
var utils_1 = require("../lib/utils");
function setup(inputs) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils_1.componentMethodCaller(inputs, 'devsapp/fc-proxied-invoke', 'setup')];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.setup = setup;
function invoke(inputs) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils_1.componentMethodCaller(inputs, 'devsapp/fc-proxied-invoke', 'invoke')];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.invoke = invoke;
function clean(inputs) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils_1.componentMethodCaller(inputs, 'devsapp/fc-proxied-invoke', 'clean')];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.clean = clean;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveGllZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kL3Byb3hpZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esc0NBQXFEO0FBR3JELFNBQXNCLEtBQUssQ0FBQyxNQUFlOzs7O3dCQUNsQyxxQkFBTSw2QkFBcUIsQ0FBQyxNQUFNLEVBQUUsMkJBQTJCLEVBQUUsT0FBTyxDQUFDLEVBQUE7d0JBQWhGLHNCQUFPLFNBQXlFLEVBQUM7Ozs7Q0FDbEY7QUFGRCxzQkFFQztBQUVELFNBQXNCLE1BQU0sQ0FBQyxNQUFlOzs7O3dCQUNuQyxxQkFBTSw2QkFBcUIsQ0FBQyxNQUFNLEVBQUUsMkJBQTJCLEVBQUUsUUFBUSxDQUFDLEVBQUE7d0JBQWpGLHNCQUFPLFNBQTBFLEVBQUM7Ozs7Q0FDbkY7QUFGRCx3QkFFQztBQUVELFNBQXNCLEtBQUssQ0FBQyxNQUFlOzs7O3dCQUNsQyxxQkFBTSw2QkFBcUIsQ0FBQyxNQUFNLEVBQUUsMkJBQTJCLEVBQUUsT0FBTyxDQUFDLEVBQUE7d0JBQWhGLHNCQUFPLFNBQXlFLEVBQUM7Ozs7Q0FDbEY7QUFGRCxzQkFFQyJ9