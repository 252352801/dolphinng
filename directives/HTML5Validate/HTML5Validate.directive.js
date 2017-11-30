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
var HTML5ValidateDirective = (function () {
    function HTML5ValidateDirective(elemRef) {
        this.elemRef = elemRef;
        this.visible = false;
    }
    HTML5ValidateDirective.prototype.ngOnInit = function () {
        if (this.elemRef.nativeElement.nodeName === 'FORM') {
            this.elemRef.nativeElement.removeAttribute('novalidate');
        }
        else {
            this.initValidateRules();
        }
    };
    HTML5ValidateDirective.prototype.createCustomValidity = function () {
        var msg = '';
        if (this.HTML5Validate instanceof Array) {
            if (typeof this.HTML5Validate[1] === 'string') {
                if (!!this.HTML5Validate[0]) {
                    msg = this.HTML5Validate[1];
                }
            }
            else {
                for (var _i = 0, _a = this.HTML5Validate; _i < _a.length; _i++) {
                    var o = _a[_i];
                    if (typeof o[1] === 'string') {
                        if (!!o[0]) {
                            msg = o[1];
                            break;
                        }
                    }
                }
            }
        }
        return msg;
    };
    HTML5ValidateDirective.prototype.initValidateRules = function () {
        var _this = this;
        this.elemRef.nativeElement.addEventListener('invalid', function () {
            _this.elemRef.nativeElement.setCustomValidity(_this.createCustomValidity());
        });
        this.elemRef.nativeElement.addEventListener('change', function () {
            _this.elemRef.nativeElement.setCustomValidity(_this.createCustomValidity());
        });
        this.elemRef.nativeElement.addEventListener('keydown', function () {
            _this.elemRef.nativeElement.setCustomValidity('');
        });
    };
    return HTML5ValidateDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HTML5ValidateDirective.prototype, "HTML5Validate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], HTML5ValidateDirective.prototype, "visible", void 0);
HTML5ValidateDirective = __decorate([
    core_1.Directive({
        selector: '[HTML5Validate]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], HTML5ValidateDirective);
exports.HTML5ValidateDirective = HTML5ValidateDirective;
//# sourceMappingURL=HTML5Validate.directive.js.map