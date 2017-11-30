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
var ToggleClassDirective = (function () {
    function ToggleClassDirective(elemRef) {
        this.elemRef = elemRef;
        this.keep = false;
        this.triggerEvent = 'click';
        this.tempWindowEvent = {
            event: this.triggerEvent,
            handler: null
        };
    }
    ToggleClassDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.orgClassName = this.elemRef.nativeElement.className;
        this.toggleClassList = this.getToggleClassList(this.toggleClass);
        if (this.target) {
            this.targetElem = document.getElementById(this.target);
            this.targetElem && (this.orgTargetClassName = this.targetElem.className);
            var targetToggleClass = this.targetClass || this.toggleClass;
            this.targetToggleClassList = this.getToggleClassList(targetToggleClass);
        }
        this.elemRef.nativeElement.addEventListener(this.triggerEvent, function (ev) {
            ev.stopPropagation();
            setTimeout(function () {
                if (_this.keep) {
                    var classList = _this.uniqueArray((_this.orgClassName + ' ' + _this.toggleClass).split(/\s+/));
                    _this.elemRef.nativeElement.className = classList.join(' ');
                    if (_this.target) {
                        var targetClassList = _this.uniqueArray((_this.orgTargetClassName + ' ' + _this.targetClass).split(/\s+/));
                        _this.targetElem.className = targetClassList.join(' ');
                    }
                }
                else {
                    _this.changeElemClass(_this.elemRef.nativeElement, _this.toggleClassList);
                    if (_this.target) {
                        _this.targetElem && _this.changeElemClass(_this.targetElem, _this.targetToggleClassList);
                    }
                }
                if (!(_this.revokable === undefined || _this.revokable === 'false')) {
                    var finalClassList = _this.getClassList(_this.elemRef.nativeElement);
                    var commonClassList = _this.getCommonClass(finalClassList, _this.toggleClassList);
                    if (commonClassList.length) {
                        _this.addOutClickResetListener();
                    }
                }
            });
        });
    };
    /**
     * 切换元素类名
     * @param elem
     * @param toggleClass
       */
    ToggleClassDirective.prototype.changeElemClass = function (elem, toggleClass) {
        var curClassList = this.getClassList(elem); //当前class列表
        var curOnlyClass = this.getOnlyClass(curClassList, toggleClass); //仅当前元素有的class列表
        var toggleOnlyClass = this.getOnlyClass(toggleClass, curClassList); //仅输入参数有的class列表
        var newClassList = curOnlyClass.concat(toggleOnlyClass);
        elem.className = newClassList.join(' ');
    };
    ToggleClassDirective.prototype.ngOnDestroy = function () {
        this.removeOutClickResetListener();
        this.targetElem = null;
    };
    /**
     * 添加点击外边重置class的事件
     */
    ToggleClassDirective.prototype.addOutClickResetListener = function () {
        var _this = this;
        var handler = function (ev) {
            _this.elemRef.nativeElement.className = _this.orgClassName;
            if (_this.target) {
                _this.targetElem.className = _this.orgTargetClassName;
            }
            _this.removeOutClickResetListener();
        };
        window.addEventListener(this.triggerEvent, handler);
        this.tempWindowEvent.event = this.triggerEvent;
        this.tempWindowEvent.handler = handler;
    };
    /**
     * 移除window上的浏览器事件
     */
    ToggleClassDirective.prototype.removeOutClickResetListener = function () {
        if (this.tempWindowEvent !== undefined) {
            window.removeEventListener(this.tempWindowEvent.event, this.tempWindowEvent.handler);
        }
    };
    /**
     * 获取元素类名列表
     * @param elem
     * @returns {string[]}
       */
    ToggleClassDirective.prototype.getClassList = function (elem) {
        return this.uniqueArray(elem.className.split(/\s+/));
    };
    /**
     * 获取需要切换的类名列表
     * @returns {any}
       */
    ToggleClassDirective.prototype.getToggleClassList = function (inputClass) {
        var nullRegExp = /^\s+$/;
        if (!nullRegExp.test(inputClass)) {
            return this.uniqueArray(inputClass.split(/\s+/));
        }
        return [];
    };
    /**
     * 找出仅在数组A中存在，B中不存在的类
     * @param arrA
     * @param arrB
     * @returns {Array}
       */
    ToggleClassDirective.prototype.getOnlyClass = function (arrA, arrB) {
        var result = [];
        for (var _i = 0, arrA_1 = arrA; _i < arrA_1.length; _i++) {
            var item = arrA_1[_i];
            if (arrB.indexOf(item) < 0) {
                result.push(item);
            }
        }
        return result;
    };
    /**
     * 获取两个数组共有的类名
     * @param arrA
     * @param arrB
     * @returns {Array}
       */
    ToggleClassDirective.prototype.getCommonClass = function (arrA, arrB) {
        var result = [];
        for (var _i = 0, arrB_1 = arrB; _i < arrB_1.length; _i++) {
            var item = arrB_1[_i];
            if (arrA.indexOf(item) >= 0) {
                result.push(item);
            }
        }
        return result;
    };
    /**
     * 去重
     * @param array
     * @returns {Array}
       */
    ToggleClassDirective.prototype.uniqueArray = function (array) {
        var newArr = [];
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var item = array_1[_i];
            if (newArr.indexOf(item) < 0) {
                newArr.push(item);
            }
        }
        return newArr;
    };
    return ToggleClassDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ToggleClassDirective.prototype, "toggleClass", void 0);
__decorate([
    core_1.Input('opt-revokable'),
    __metadata("design:type", String)
], ToggleClassDirective.prototype, "revokable", void 0);
__decorate([
    core_1.Input('opt-target'),
    __metadata("design:type", String)
], ToggleClassDirective.prototype, "target", void 0);
__decorate([
    core_1.Input('opt-targetClass'),
    __metadata("design:type", String)
], ToggleClassDirective.prototype, "targetClass", void 0);
__decorate([
    core_1.Input('opt-keep'),
    __metadata("design:type", Boolean)
], ToggleClassDirective.prototype, "keep", void 0);
ToggleClassDirective = __decorate([
    core_1.Directive({
        selector: '[toggleClass]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], ToggleClassDirective);
exports.ToggleClassDirective = ToggleClassDirective;
//# sourceMappingURL=toggleClass.directive.js.map