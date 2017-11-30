"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CurrencyFormatDirective = (function () {
    function CurrencyFormatDirective(elemRef) {
        this.elemRef = elemRef;
        this.separateLength = 3; //分隔长度
        this.accuracy = 2; //保留精度
        this.format = ''; //格式
        this.separator = ','; //分隔符
        this.currencyFormat = new core_1.EventEmitter();
        this.ngModelChange = new core_1.EventEmitter();
    }
    CurrencyFormatDirective.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.elemRef.nativeElement.value = _this.transform(_this.elemRef.nativeElement.value);
        });
        var inputFn = function (ev) {
            _this.ngModelChange.emit(_this.elemRef.nativeElement.value.replace(new RegExp(_this.separator, 'g'), ''));
            setTimeout(function () {
                _this.elemRef.nativeElement.value = _this.transform(_this.elemRef.nativeElement.value);
            }, 0);
        };
        var testinput = document.createElement('input');
        if ('oninput' in testinput) {
            this.elemRef.nativeElement.addEventListener("input", inputFn, false);
        }
        else {
            this.elemRef.nativeElement.onpropertychange = inputFn;
        }
    };
    CurrencyFormatDirective.prototype.ngOnChanges = function (changes) {
    };
    CurrencyFormatDirective.prototype.transform = function (value) {
        if (value === undefined || value === null) {
            return value;
        }
        else if (!value) {
            return '';
        }
        var sep = this.separator;
        var inputStr = (value + '').replace(new RegExp(sep, 'g'), ''), numRegExp = /^[0-9]+(\.[0-9]+)?$/, str = inputStr.replace(/\s/g, ''), sepLen = this.separateLength;
        var result = '';
        if (numRegExp.test(str)) {
            if (sepLen) {
                var splits = str.split('.');
                var intStr = splits[0];
                var ext = splits.length > 1 ? splits[1] : '';
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
        }
        else {
            result = inputStr;
        }
        return result;
    };
    return CurrencyFormatDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CurrencyFormatDirective.prototype, "ngModel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.EventEmitter)
], CurrencyFormatDirective.prototype, "currencyFormat", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], CurrencyFormatDirective.prototype, "ngModelChange", void 0);
CurrencyFormatDirective = __decorate([
    core_1.Directive({
        selector: '[currencyFormat]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], CurrencyFormatDirective);
exports.CurrencyFormatDirective = CurrencyFormatDirective;
//# sourceMappingURL=currencyFormat.deirective.js.map