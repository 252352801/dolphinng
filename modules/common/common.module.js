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
//components
var q_btn_group_component_1 = require("../../components/q-btn-group/q-btn-group.component");
//directives
var btnBack_directive_1 = require("../../directives/btnBack/btnBack.directive");
var textMaxLength_directive_1 = require("../../directives/textMaxLength/textMaxLength.directive");
var toggleClass_directive_1 = require("../../directives/toggleClass/toggleClass.directive");
var CommonModule = (function () {
    function CommonModule() {
    }
    return CommonModule;
}());
CommonModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule
        ],
        declarations: [
            q_btn_group_component_1.QBtnGroupComponent,
            btnBack_directive_1.BtnBackDirective,
            textMaxLength_directive_1.TextMaxLengthDirective,
            toggleClass_directive_1.ToggleClassDirective
        ],
        providers: [],
        exports: [
            q_btn_group_component_1.QBtnGroupComponent,
            btnBack_directive_1.BtnBackDirective,
            textMaxLength_directive_1.TextMaxLengthDirective,
            toggleClass_directive_1.ToggleClassDirective
        ]
    })
], CommonModule);
exports.CommonModule = CommonModule;
//# sourceMappingURL=common.module.js.map