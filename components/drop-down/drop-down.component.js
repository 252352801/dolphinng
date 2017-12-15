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
/**
 * 展开/收起
 * @author Jianhang Yu
 */
var core_1 = require("@angular/core");
var DropDownComponent = (function () {
    function DropDownComponent() {
        this.isTransition = false;
        //设置动画时间
        this.animateTime = 0.3;
    }
    Object.defineProperty(DropDownComponent.prototype, "show", {
        set: function (value) {
            var _this = this;
            //传入的值为true，内容显示
            //先获取实际内容的高度
            var height;
            if (value) {
                this.wrap.nativeElement.style.overflow = 'hidden';
                this.cssOpen = true;
                this.visible = value;
                setTimeout(function () {
                    height = _this.content.nativeElement.offsetHeight;
                    _this.wrap.nativeElement.style.height = 0;
                    _this.isTransition = true;
                    setTimeout(function () {
                        _this.cssOpen = false;
                        setTimeout(function () {
                            _this.wrap.nativeElement.style.height = height + "px";
                            setTimeout(function () {
                                _this.wrap.nativeElement.style.overflow = null;
                            }, _this.animateTime * 1000);
                        });
                    });
                });
            }
            else {
                this.wrap.nativeElement.style.height = 0;
                this.wrap.nativeElement.style.overflow = 'hidden';
                setTimeout(function () {
                    _this.wrap.nativeElement.style.overflow = null;
                    _this.wrap.nativeElement.style.height = null;
                    _this.isTransition = false;
                    _this.visible = value;
                }, this.animateTime * 1000);
            }
        },
        enumerable: true,
        configurable: true
    });
    DropDownComponent.prototype.ngOnInit = function () {
    };
    DropDownComponent.prototype.open = function () {
        if (!this.visible) {
            this.show = true;
        }
    };
    DropDownComponent.prototype.close = function () {
        if (this.visible) {
            this.show = false;
        }
    };
    DropDownComponent.prototype.toggle = function () {
        this.show = !this.visible;
    };
    return DropDownComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DropDownComponent.prototype, "animateTime", void 0);
__decorate([
    core_1.ViewChild('wrap'),
    __metadata("design:type", core_1.ElementRef)
], DropDownComponent.prototype, "wrap", void 0);
__decorate([
    core_1.ViewChild('content'),
    __metadata("design:type", core_1.ElementRef)
], DropDownComponent.prototype, "content", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], DropDownComponent.prototype, "show", null);
DropDownComponent = __decorate([
    core_1.Component({
        selector: 'drop-down',
        templateUrl: 'drop-down.component.html',
        styleUrls: ['./drop-down.component.less']
    }),
    __metadata("design:paramtypes", [])
], DropDownComponent);
exports.DropDownComponent = DropDownComponent;
//获取的高度
//# sourceMappingURL=drop-down.component.js.map