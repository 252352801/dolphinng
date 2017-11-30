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
var ModalHeaderComponent = (function () {
    function ModalHeaderComponent() {
        this.showCloseButton = true;
    }
    return ModalHeaderComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ModalHeaderComponent.prototype, "showCloseButton", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ModalHeaderComponent.prototype, "styleClass", void 0);
ModalHeaderComponent = __decorate([
    core_1.Component({
        selector: 'modal-header',
        template: "\n    <div class=\"modal-header{{styleClass?' '+styleClass:''}}\" [ngClass]=\"{'modal-header-reduce':showCloseButton}\">\n        <ng-content></ng-content>\n    </div>\n  ",
        styleUrls: ['./modal.component.less']
    })
], ModalHeaderComponent);
exports.ModalHeaderComponent = ModalHeaderComponent;
//# sourceMappingURL=modal-header.component.js.map