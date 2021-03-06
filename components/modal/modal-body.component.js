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
var ModalBodyComponent = (function () {
    function ModalBodyComponent() {
        this.delayShow = false;
        this.isReady = false;
    }
    return ModalBodyComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ModalBodyComponent.prototype, "styleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ModalBodyComponent.prototype, "delayShow", void 0);
__decorate([
    core_1.ViewChild('modalBody'),
    __metadata("design:type", core_1.ElementRef)
], ModalBodyComponent.prototype, "modalBody", void 0);
ModalBodyComponent = __decorate([
    core_1.Component({
        selector: 'modal-body',
        template: "\n    <div class=\"modal-body{{styleClass?' '+styleClass:''}}\" #modalBody>\n        <ng-content *ngIf=\"isReady||!delayShow\"></ng-content>\n    </div>\n  "
    }),
    __metadata("design:paramtypes", [])
], ModalBodyComponent);
exports.ModalBodyComponent = ModalBodyComponent;
//# sourceMappingURL=modal-body.component.js.map