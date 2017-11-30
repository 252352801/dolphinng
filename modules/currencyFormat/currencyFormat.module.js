"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//directives
var currencyFormat_deirective_1 = require("../../directives/currencyFormat/currencyFormat.deirective");
var currencyFormat_pipe_1 = require("../../pipes/currencyFormat/currencyFormat.pipe");
var CurrencyFormatModule = (function () {
    function CurrencyFormatModule() {
    }
    return CurrencyFormatModule;
}());
CurrencyFormatModule = __decorate([
    core_1.NgModule({
        imports: [],
        declarations: [
            currencyFormat_deirective_1.CurrencyFormatDirective,
            currencyFormat_pipe_1.CurrencyFormatPipe
        ],
        providers: [],
        exports: [
            currencyFormat_deirective_1.CurrencyFormatDirective,
            currencyFormat_pipe_1.CurrencyFormatPipe
        ]
    })
], CurrencyFormatModule);
exports.CurrencyFormatModule = CurrencyFormatModule;
//# sourceMappingURL=currencyFormat.module.js.map