"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CurrencyFormatPipe = (function () {
    function CurrencyFormatPipe() {
        this.separateLength = 3; //分隔长度
        this.accuracy = 2; //保留精度
        this.format = ''; //格式
        this.separator = ','; //分隔符
    }
    CurrencyFormatPipe.prototype.transform = function (value, param) {
        if (value === undefined || value === null) {
            return value;
        }
        else if (!value) {
            return '';
        }
        var sep = this.separator;
        var inputStr = (value + '').replace(new RegExp(sep, 'g'), ''), numRegExp = /^\-?[0-9]+(\.[0-9]+)?$/, str = inputStr.replace(/\s/g, ''), accuracy = this.accuracy, format = this.format, sepLen = this.separateLength;
        //参数匹配
        var nums = [];
        var strs = [];
        if (typeof param === 'string') {
            strs.push(param);
        }
        else if (typeof param === 'number') {
            nums.push(param);
        }
        else if (param instanceof Array) {
            for (var _i = 0, param_1 = param; _i < param_1.length; _i++) {
                var o = param_1[_i];
                if (typeof o === 'string') {
                    strs.push(o);
                }
                else if (typeof o === 'number') {
                    nums.push(o);
                }
            }
        }
        //数字参数识别
        if (nums.length > 0) {
            accuracy = nums[0];
        }
        if (nums.length > 1) {
            sepLen = nums[1];
        }
        //字符串参数识别
        if (strs.length > 0) {
            format = strs[0];
        }
        if (strs.length > 1) {
            sep = strs[1];
        }
        var result = '';
        if (numRegExp.test(str)) {
            if (sepLen) {
                str = parseFloat(str).toFixed(accuracy) + ''; //四舍五入
                var splits = str.split('.');
                var intStr = splits[0];
                var ext = splits.length > 1 ? splits[1] : '';
                if (ext.length < accuracy) {
                    var fillLen = accuracy - ext.length;
                    for (var i = 0; i < fillLen; i++) {
                        ext += '0';
                    }
                }
                var intLen = intStr.length, newIntStr = '';
                if (intLen > sepLen) {
                    for (var i = intLen - sepLen; i > 0 - sepLen; i = i - sepLen) {
                        if (i > 0) {
                            newIntStr = sep + intStr.substr(i, sepLen) + newIntStr;
                        }
                        else {
                            newIntStr = intStr.substr(0, sepLen + i) + newIntStr;
                        }
                    }
                }
                else {
                    newIntStr = intStr;
                }
                result = newIntStr + (ext ? '.' + ext : '');
            }
            else {
                result = inputStr;
            }
            //格式化
            if (format) {
                var index = format.indexOf('xx');
                if (index >= 0) {
                    result = format.replace(/xx/, result);
                }
                else {
                    result = result + format;
                }
            }
        }
        else {
            result = inputStr;
        }
        return result;
    };
    return CurrencyFormatPipe;
}());
CurrencyFormatPipe = __decorate([
    core_1.Pipe({ name: 'currencyFormat' })
], CurrencyFormatPipe);
exports.CurrencyFormatPipe = CurrencyFormatPipe;
//# sourceMappingURL=currencyFormat.pipe.js.map