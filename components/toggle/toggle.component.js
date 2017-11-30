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
var ToggleComponent = (function () {
    function ToggleComponent(elemRef) {
        this.elemRef = elemRef;
        this.valueChange = new core_1.EventEmitter();
        this.auto = true;
        this.action = new core_1.EventEmitter();
    }
    ToggleComponent.prototype.ngOnInit = function () {
    };
    ToggleComponent.prototype.toggleCheck = function (ev) {
        if (!this.disabled) {
            if (!this.auto) {
                this.action.emit(this.value);
            }
            else {
                var target = ev.target || ev.srcElement;
                if (target.nodeName !== 'INPUT') {
                    this.value = !this.value;
                    this.valueChange.emit(this.value);
                }
            }
        }
    };
    ToggleComponent.prototype.toggle = function (ev) {
        ev.stopPropagation();
        if (!this.disabled) {
            var target = ev.target || ev.srcElement;
            this.value = !this.value;
            this.valueChange.emit(this.value);
        }
    };
    return ToggleComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ToggleComponent.prototype, "name", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ToggleComponent.prototype, "display", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ToggleComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ToggleComponent.prototype, "size", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ToggleComponent.prototype, "value", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ToggleComponent.prototype, "valueChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ToggleComponent.prototype, "type", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ToggleComponent.prototype, "styleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ToggleComponent.prototype, "auto", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ToggleComponent.prototype, "action", void 0);
ToggleComponent = __decorate([
    core_1.Component({
        selector: 'toggle',
        templateUrl: './toggle.component.html',
        styleUrls: ['./toggle.component.less']
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], ToggleComponent);
exports.ToggleComponent = ToggleComponent;
//# sourceMappingURL=toggle.component.js.map