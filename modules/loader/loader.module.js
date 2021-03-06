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
var spinner_component_1 = require("../../components/spinner/spinner.component");
var LoaderModule = (function () {
    function LoaderModule() {
    }
    return LoaderModule;
}());
LoaderModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule
        ],
        declarations: [
            spinner_component_1.SpinnerComponent
        ],
        providers: [],
        exports: [
            spinner_component_1.SpinnerComponent
        ]
    })
], LoaderModule);
exports.LoaderModule = LoaderModule;
//# sourceMappingURL=loader.module.js.map