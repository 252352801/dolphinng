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
var root_container_component_1 = require("../../components/root-container/root-container.component");
var aside_left_component_1 = require("../../components/aside-left/aside-left.component");
var header_component_1 = require("../../components/header/header.component");
var delete_wrap_component_1 = require("../../components/delete-wrap/delete-wrap.component");
var LayoutModule = (function () {
    function LayoutModule() {
    }
    return LayoutModule;
}());
LayoutModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule
        ],
        declarations: [
            root_container_component_1.RootContainerComponent,
            aside_left_component_1.AsideLeftComponent,
            header_component_1.HeaderComponent,
            header_component_1.HeaderLeftComponent,
            header_component_1.HeaderRightComponent,
            delete_wrap_component_1.DeleteWrapComponent
        ],
        providers: [],
        exports: [
            root_container_component_1.RootContainerComponent,
            aside_left_component_1.AsideLeftComponent,
            header_component_1.HeaderComponent,
            header_component_1.HeaderLeftComponent,
            header_component_1.HeaderRightComponent,
            delete_wrap_component_1.DeleteWrapComponent
        ]
    })
], LayoutModule);
exports.LayoutModule = LayoutModule;
//# sourceMappingURL=layout.module.js.map