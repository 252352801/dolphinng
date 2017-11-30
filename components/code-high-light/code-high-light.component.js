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
require("./prism/prism.js");
var CodeHighLightComponent = (function () {
    function CodeHighLightComponent(elemRef) {
        this.elemRef = elemRef;
    }
    CodeHighLightComponent.prototype.ngOnInit = function () {
        //异步请求代码
        if (this.codeSrc) {
            var codeElem_1 = this.codeElemRef.nativeElement;
            codeElem_1.className = 'language-' + this.language;
            codeElem_1.textContent = 'Loading…';
            var xhr_1 = new XMLHttpRequest();
            xhr_1.open('GET', this.codeSrc, true);
            xhr_1.onreadystatechange = function () {
                if (xhr_1.readyState == 4) {
                    if (xhr_1.status < 400 && xhr_1.responseText) {
                        codeElem_1.textContent = xhr_1.responseText;
                        var fn = Prism.highlightElement;
                        fn(codeElem_1);
                    }
                    else if (xhr_1.status >= 400) {
                        codeElem_1.textContent = '✖ Error ' + xhr_1.status + ' while fetching file: ' + xhr_1.statusText;
                    }
                    else {
                        codeElem_1.textContent = '✖ Error: File does not exist or is empty';
                    }
                }
            };
            xhr_1.send(null);
        }
    };
    CodeHighLightComponent.prototype.ngAfterContentInit = function () {
    };
    return CodeHighLightComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CodeHighLightComponent.prototype, "language", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CodeHighLightComponent.prototype, "codeSrc", void 0);
__decorate([
    core_1.ViewChild('codeElemRef'),
    __metadata("design:type", core_1.ElementRef)
], CodeHighLightComponent.prototype, "codeElemRef", void 0);
CodeHighLightComponent = __decorate([
    core_1.Component({
        selector: 'code-high-light',
        templateUrl: './code-high-light.component.html',
        styleUrls: ['./code-high-light.component.less']
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], CodeHighLightComponent);
exports.CodeHighLightComponent = CodeHighLightComponent;
//# sourceMappingURL=code-high-light.component.js.map