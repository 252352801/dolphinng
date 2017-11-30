"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var checkbox_component_1 = require("../../components/checkbox/checkbox.component");
var radio_component_1 = require("../../components/radio/radio.component");
var toggle_component_1 = require("../../components/toggle/toggle.component");
var HTML5Validate_directive_1 = require("../../directives/HTML5Validate/HTML5Validate.directive");
var FormsModule = (function () {
    function FormsModule() {
    }
    return FormsModule;
}());
FormsModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule
        ],
        declarations: [
            checkbox_component_1.CheckboxComponent,
            radio_component_1.RadioComponent,
            toggle_component_1.ToggleComponent,
            HTML5Validate_directive_1.HTML5ValidateDirective
        ],
        providers: [],
        exports: [
            checkbox_component_1.CheckboxComponent,
            radio_component_1.RadioComponent,
            toggle_component_1.ToggleComponent,
            HTML5Validate_directive_1.HTML5ValidateDirective
        ]
    })
], FormsModule);
exports.FormsModule = FormsModule;
//# sourceMappingURL=forms.module.js.map