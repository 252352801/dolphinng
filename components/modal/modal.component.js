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
var modal_body_component_1 = require("./modal-body.component");
exports.ModalBodyComponent = modal_body_component_1.ModalBodyComponent;
var modal_header_component_1 = require("./modal-header.component");
exports.ModalHeaderComponent = modal_header_component_1.ModalHeaderComponent;
var modal_footer_component_1 = require("./modal-footer.component");
exports.ModalFooterComponent = modal_footer_component_1.ModalFooterComponent;
var ModalComponent = (function () {
    function ModalComponent(elemRef) {
        this.elemRef = elemRef;
        this.visibleChange = new core_1.EventEmitter();
        this.onOpen = new core_1.EventEmitter();
        this.onClose = new core_1.EventEmitter();
        this.overflow = false; //是否溢出屏幕
        this.animated = true;
        this.size = "md";
        this.disabled = false; //是否禁用（有遮罩）
        this.isRender = false; //是否渲染
        this.isShow = false; //是否显示
        this.isReady = false; //是否已就绪
        this.outClickClose = false; //点击外边关闭
        this.showCloseButton = true;
        this.isTransition = false;
    }
    ModalComponent.prototype.ngOnInit = function () {
    };
    ModalComponent.prototype.ngOnDestroy = function () {
        this.testAndResetBody();
    };
    /**
     * 背景点击处理
     */
    ModalComponent.prototype.bgClickAction = function (ev) {
        var wouldClose = this.outClickClose;
        if (wouldClose) {
            var target = ev.target || ev.srcElement;
            if (target === this.modal.nativeElement) {
                this.close();
            }
        }
    };
    ModalComponent.prototype.open = function () {
        this.visible = true;
        this.visibleChange.emit(true);
        this.showModal();
    };
    ModalComponent.prototype.close = function () {
        this.visible = false;
        var promise = this.hideModal();
        this.visibleChange.emit(false);
        return promise;
    };
    ModalComponent.prototype.showModal = function () {
        var _this = this;
        this.isRender = true;
        var orgW = document.body.offsetWidth; //有滚动条时的宽度
        this.addClass(document.body, 'modal-open');
        var curW = document.body.offsetWidth; //无滚动条时的宽度
        if (curW > orgW) {
            document.body.style.paddingRight = (curW - orgW) + 'px'; //给body设置paddingRight避免页面抖动
        }
        this.initBodyStyle();
        setTimeout(function () {
            _this.isTransition = true;
            _this.isShow = true;
            _this.onOpen.emit(_this.visible);
            setTimeout(function () {
                _this.isReady = true;
                _this.modalBody.isReady = true;
            }, 300);
        });
    };
    ModalComponent.prototype.hideModal = function (callback) {
        var _this = this;
        this.testAndResetBody();
        this.isShow = false;
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                _this.isRender = false;
                if (typeof callback === 'function') {
                    callback();
                }
                _this.isTransition = false;
                resolve(_this.visible);
                _this.isReady = false;
                _this.modalBody.isReady = false;
                _this.onClose.emit(_this.visible);
            }, 500);
        });
    };
    ModalComponent.prototype.testAndResetBody = function () {
        var modals = document.querySelectorAll('.modal');
        if (modals && modals.length <= 1) {
            this.removeClass(document.body, 'modal-open');
            document.body.style.paddingRight = null;
        }
    };
    ModalComponent.prototype.ngOnChanges = function (changes) {
        var visibleChg = changes['visible'];
        if (visibleChg) {
            var isVisible = visibleChg.currentValue;
            var prevValue = visibleChg.previousValue;
            if (isVisible !== prevValue) {
                if (isVisible === true) {
                    this.showModal();
                }
                else if (isVisible === false && prevValue !== undefined) {
                    this.hideModal();
                }
            }
        }
    };
    /**
     * 初始化modal-body的高度/限高
     */
    ModalComponent.prototype.initBodyStyle = function () {
        var _this = this;
        var isOverflow = !!this.overflow;
        var isFullHeight = (this.fullHeight !== undefined && this.fullHeight !== false);
        if (isFullHeight || !isOverflow) {
            setTimeout(function () {
                var modalBody = _this.modalBody.modalBody.nativeElement; //模态框中间部分
                var maxHeight = document.documentElement.clientHeight - 183; //上外边距30+下外边距30+头部51+底部70=181 2像素的调整
                if (isFullHeight) {
                    modalBody.style.height = maxHeight + 'px';
                    modalBody.style.overflowY = 'auto';
                }
                else if (!isOverflow) {
                    modalBody.style.maxHeight = maxHeight + 'px';
                    modalBody.style.overflowY = 'auto';
                }
            });
        }
    };
    /**
     * 为元素添加一个类
     * @param elem
     * @param className
     */
    ModalComponent.prototype.addClass = function (elem, className) {
        var classList = elem.className.split(/\s+/);
        if (classList.indexOf(className) < 0) {
            classList.push(className);
            elem.className = classList.join(' ');
        }
    };
    /**
     * 删除某个类
     * @param elem
     * @param className
     */
    ModalComponent.prototype.removeClass = function (elem, className) {
        var classList = elem.className.split(/\s+/);
        var clsIndex = classList.indexOf(className);
        if (clsIndex >= 0) {
            classList.splice(clsIndex, 1);
            elem.className = classList.join(' ');
        }
    };
    return ModalComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ModalComponent.prototype, "visible", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ModalComponent.prototype, "visibleChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ModalComponent.prototype, "onOpen", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ModalComponent.prototype, "onClose", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ModalComponent.prototype, "overflow", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ModalComponent.prototype, "animated", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ModalComponent.prototype, "size", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ModalComponent.prototype, "styleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ModalComponent.prototype, "fullHeight", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ModalComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ModalComponent.prototype, "outClickClose", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ModalComponent.prototype, "showCloseButton", void 0);
__decorate([
    core_1.ViewChild('modal'),
    __metadata("design:type", core_1.ElementRef)
], ModalComponent.prototype, "modal", void 0);
__decorate([
    core_1.ViewChild('modalDialog'),
    __metadata("design:type", core_1.ElementRef)
], ModalComponent.prototype, "modalDialog", void 0);
__decorate([
    core_1.ContentChild(modal_header_component_1.ModalHeaderComponent),
    __metadata("design:type", modal_header_component_1.ModalHeaderComponent)
], ModalComponent.prototype, "modalHeader", void 0);
__decorate([
    core_1.ContentChild(modal_body_component_1.ModalBodyComponent),
    __metadata("design:type", modal_body_component_1.ModalBodyComponent)
], ModalComponent.prototype, "modalBody", void 0);
ModalComponent = __decorate([
    core_1.Component({
        selector: 'modal',
        templateUrl: './modal.component.html',
        styleUrls: ['./modal.component.less']
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], ModalComponent);
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=modal.component.js.map