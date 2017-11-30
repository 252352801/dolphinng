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
var CheckboxComponent = (function () {
    function CheckboxComponent(elemRef) {
        this.elemRef = elemRef;
        this.value = false;
        this.valueChange = new core_1.EventEmitter();
    }
    CheckboxComponent.prototype.ngOnInit = function () {
    };
    CheckboxComponent.prototype.changeAction = function (ev) {
        this.valueChange.emit(this.value);
    };
    return CheckboxComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CheckboxComponent.prototype, "name", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CheckboxComponent.prototype, "display", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CheckboxComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CheckboxComponent.prototype, "size", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CheckboxComponent.prototype, "innerStyle", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CheckboxComponent.prototype, "customBackground", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CheckboxComponent.prototype, "styleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], CheckboxComponent.prototype, "value", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], CheckboxComponent.prototype, "valueChange", void 0);
CheckboxComponent = __decorate([
    core_1.Component({
        selector: 'checkbox',
        templateUrl: './checkbox.component.html',
        styleUrls: ['./checkbox.component.less']
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], CheckboxComponent);
exports.CheckboxComponent = CheckboxComponent;
//# sourceMappingURL=checkbox.component.js.map