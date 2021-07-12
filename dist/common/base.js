"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
// import Table from 'tty-table';
var lodash_get_1 = __importDefault(require("lodash.get"));
var core_1 = require("@serverless-devs/core");
var SINGLE_VARS = ['string', 'number', 'boolean', 'null', 'undefined'];
var BaseComponent = /** @class */ (function () {
    function BaseComponent(inputs) {
        this.inputs = inputs;
        var libBasePath = this.__getBasePath();
        var pkgPath = path_1.default.join(libBasePath, '..', 'package.json');
        if (pkgPath) {
            var pkg = JSON.parse(fs_1.default.readFileSync(path_1.default.join(pkgPath), 'utf8'));
            this.name = pkg.name;
        }
    }
    BaseComponent.prototype.__getBasePath = function () {
        if (this.basePath) {
            return this.basePath;
        }
        var baseName = path_1.default.basename(__dirname);
        if (baseName !== 'lib') {
            this.basePath = path_1.default.join(__dirname, '..');
        }
        else {
            this.basePath = __dirname;
        }
        return this.basePath;
    };
    BaseComponent.prototype.getEntityByName = function (name) {
        var docPath = path_1.default.join(__dirname, '../..', 'doc', 'doc.json');
        if (fs_1.default.existsSync(docPath)) {
            var fileContent = fs_1.default.readFileSync(docPath).toString();
            var result = JSON.parse(fileContent);
            var interfaces = lodash_get_1.default(result, 'children', []).filter(function (item) { return item.name.indexOf('interface') !== -1 || item.name.indexOf('entity') !== -1; });
            var fullInputParams_1 = {};
            interfaces.forEach(function (_interface) {
                var data = lodash_get_1.default(_interface, 'children', []).filter(function (item) { return item.name === name; })[0];
                if (data) {
                    fullInputParams_1 = data;
                }
            });
            return fullInputParams_1;
        }
    };
    BaseComponent.prototype.getEntityHelpInfoByName = function (name, simpleType) {
        var _this = this;
        if (simpleType === void 0) { simpleType = false; }
        var inputPropParams = this.getEntityByName(name);
        var content = lodash_get_1.default(inputPropParams, 'comment.shortText');
        var tags = lodash_get_1.default(inputPropParams, 'comment.tags', []);
        var preHelpItem = [];
        var afterHelpItem = [];
        var example = [];
        tags.forEach(function (item) {
            if (item.tag === 'example') {
                example.push(item);
            }
            if (item.tag === 'pre_help') {
                preHelpItem.push(item);
            }
            if (item.tag === 'after_help') {
                afterHelpItem.push(item);
            }
        });
        var paramsList = lodash_get_1.default(inputPropParams, 'children', []);
        var optionList = paramsList.map(function (item) {
            var name = item.name;
            var description = lodash_get_1.default(item, 'comment.shortText');
            var tagData = lodash_get_1.default(item, 'comment.tags', []);
            var aliasTag = tagData.filter(function (item) { return item.tag === 'alias'; })[0] || {};
            var alias = aliasTag.text ? aliasTag.text.replace(/\n/g, '') : '';
            var defaultOption = lodash_get_1.default(item, 'flags.isOptional', false);
            var type = lodash_get_1.default(item, 'type.name');
            if (!SINGLE_VARS.includes(type)) {
                // const typeDetail = this.translateType(type);
                // type = `${type} <${typeDetail}> `;
                type = 'string';
            }
            if (alias) {
                return { name: name, typeLabel: type, description: description, alias: alias, defaultOption: defaultOption };
            }
            return { name: name, typeLabel: type, description: description, defaultOption: defaultOption };
        });
        var finalPreHelpData = preHelpItem.map(function (item) {
            if (item.text) {
                var jsonData = {};
                try {
                    jsonData = JSON.parse(item.text);
                    if (jsonData.ref) {
                        return _this.getEntityHelpInfoByName(jsonData.ref, true)[0];
                    }
                    return jsonData;
                }
                catch (e) {
                    return {
                        header: '',
                        context: item.text,
                    };
                }
            }
        });
        var finalAfterHelpData = afterHelpItem.map(function (item) {
            if (item.text) {
                var jsonData = {};
                try {
                    jsonData = JSON.parse(item.text);
                    if (jsonData.ref) {
                        return _this.getEntityHelpInfoByName(jsonData.ref, true)[0];
                    }
                    return jsonData;
                }
                catch (e) {
                    return {
                        header: '',
                        context: item.text,
                    };
                }
            }
        });
        var finalExampleData = example.map(function (item) {
            if (item.shortText) {
                return {
                    header: 'example',
                    content: item.shortText,
                };
            }
            if (item.text) {
                var jsonData = {};
                try {
                    jsonData = JSON.parse(item.text);
                    return jsonData;
                }
                catch (e) {
                    return {
                        header: 'example',
                        content: item.text,
                    };
                }
            }
        });
        var finalOptionData = [];
        if (simpleType) {
            finalOptionData = [{
                    header: content,
                    optionList: optionList,
                }];
        }
        else {
            finalOptionData = [{
                    header: 'Usage',
                    content: content,
                }];
            if (optionList.length > 0) {
                finalOptionData.push({
                    header: 'Options',
                    optionList: optionList,
                });
            }
        }
        return __spreadArrays(finalPreHelpData, finalOptionData, finalAfterHelpData, finalExampleData);
    };
    BaseComponent.prototype.help = function (name) {
        var helpInfo = this.getEntityHelpInfoByName(name);
        core_1.help(helpInfo);
    };
    return BaseComponent;
}());
exports.default = BaseComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSwwQ0FBb0I7QUFDcEIsOENBQXdCO0FBQ3hCLGlDQUFpQztBQUNqQywwREFBNkI7QUFDN0IsOENBQTZDO0FBRTdDLElBQU0sV0FBVyxHQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBRXpFO0lBSUUsdUJBQXNCLE1BQVc7UUFBWCxXQUFNLEdBQU4sTUFBTSxDQUFLO1FBQy9CLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QyxJQUFNLE9BQU8sR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDN0QsSUFBSSxPQUFPLEVBQUU7WUFDWCxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQUUsQ0FBQyxZQUFZLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztTQUN0QjtJQUNILENBQUM7SUFFRCxxQ0FBYSxHQUFiO1FBQ0UsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUN0QjtRQUNELElBQU0sUUFBUSxHQUFHLGNBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsSUFBSSxRQUFRLEtBQUssS0FBSyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDNUM7YUFBTTtZQUNMLElBQUksQ0FBQyxR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