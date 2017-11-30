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
var PaginatorComponent = (function () {
    function PaginatorComponent(elemRef) {
        this.elemRef = elemRef;
        this.count = 0; //总记录
        this.pageSize = 10; //每页大小
        this.pageSizeChange = new core_1.EventEmitter();
        this.index = 0; //当前页
        this.items = []; //页码元素
        this.indexChange = new core_1.EventEmitter();
        this.maximum = 5; //最多显示的按钮数
        this.changePageSizeAble = false; //是否可改变每页大小
        this.inputAble = false; //是否可输入
        this.ellipsis = true; //是否省略
        this.pageSizeOptions = [10, 30, 50, 100];
        this.size = ''; //控件尺寸
        this.showTotal = false; //显示文字信息
        this.onChangePage = new core_1.EventEmitter();
        this.onChangePageError = new core_1.EventEmitter();
    }
    PaginatorComponent.prototype.ngOnInit = function () {
        this.create();
        this.initPageSizeOptions();
    };
    PaginatorComponent.prototype.ngOnChanges = function (changes) {
        var countChg = changes['count'];
        var pageSizeChg = changes['pageSize'];
        if ((countChg && countChg.currentValue !== countChg.previousValue) || (pageSizeChg && pageSizeChg.currentValue !== pageSizeChg.previousValue)) {
            this.create();
        }
    };
    /**
     * 建立页码元素和页数
     */
    PaginatorComponent.prototype.create = function () {
        this.pageCount = Math.ceil(this.count / this.pageSize);
        var sIndex, eIndex;
        if (this.pageCount <= 0) {
            sIndex = 0;
            eIndex = 1;
        }
        else if (this.index > this.pageCount - 1) {
            this.index = this.pageCount - 1;
            this.indexChange.emit(this.index);
            eIndex = this.index + 1;
            sIndex = eIndex - this.maximum > 0 ? eIndex - this.maximum : 0;
        }
        else {
            sIndex = this.index;
            if (this.pageCount - 1 - this.index < this.maximum) {
                sIndex = this.pageCount - this.maximum;
            }
            if (sIndex < 0) {
                sIndex = 0;
            }
            eIndex = (sIndex + this.maximum <= this.pageCount) ? sIndex + this.maximum : this.pageCount;
        }
        this.createItems(sIndex, eIndex);
    };
    /**
     * 初始化每页大小选项
     */
    PaginatorComponent.prototype.initPageSizeOptions = function () {
        if (this.pageSizeOptions.indexOf(this.pageSize) < 0) {
            for (var i = 0, len = this.pageSizeOptions.length; i < len; i++) {
                if (this.pageSize <= this.pageSizeOptions[i]) {
                    if (i === 0) {
                        this.pageSizeOptions.unshift(this.pageSize);
                    }
                    else {
                        this.pageSizeOptions.splice(i, 0, this.pageSize);
                    }
                    break;
                }
            }
        }
    };
    PaginatorComponent.prototype.createItems = function (start, end) {
        if (start < 0) {
            start = 0;
        }
        this.items = [];
        for (var i = start; i < end; i++) {
            this.items.push(i);
        }
    };
    /**
     * 改变页大小
     * @param index
     */
    PaginatorComponent.prototype.changePageSize = function (ev) {
        var e = ev || window.event;
        var target = e.target || e.srcElement;
        var newSize = parseInt(target.value);
        this.pageSize = newSize;
        this.pageSizeChange.emit(newSize);
        this.create();
        this.onChangePage.emit(this.index);
    };
    /**
     * 改变页
     * @param index
     */
    PaginatorComponent.prototype.changePage = function (index) {
        if (index >= 0 && index < this.pageCount) {
            this.index = index;
            this.indexChange.emit(this.index);
            this.onChangePage.emit(this.index);
            if (this.items.indexOf(this.index) < 0) {
                var sIndex = void 0, eIndex = void 0;
                if (this.index < this.items[0]) {
                    var a = this.index - this.maximum + 1;
                    sIndex = (a > 0 ? a : 0);
                }
                else if (this.index > this.items[this.items.length - 1]) {
                    sIndex = this.index;
                    if (sIndex > this.pageCount - this.maximum) {
                        sIndex = this.pageCount - this.maximum;
                    }
                    if (sIndex < 0) {
                        sIndex = 0;
                    }
                }
                var b = this.pageCount - sIndex;
                eIndex = b > this.maximum ? sIndex + this.maximum : sIndex + b;
                this.createItems(sIndex, eIndex);
            }
        }
        else {
            this.onChangePageError.emit(this.inputIndex);
        }
    };
    /**
     * 上一页
     */
    PaginatorComponent.prototype.prev = function () {
        if (this.index > 0) {
            this.index--;
            this.changePage(this.index);
        }
    };
    /**
     * 下一页
     */
    PaginatorComponent.prototype.next = function () {
        if (this.index < this.pageCount - 1) {
            this.index++;
            this.changePage(this.index);
        }
    };
    /**
     * 第一页
     */
    PaginatorComponent.prototype.first = function () {
        if (this.index !== 0) {
            this.index = 0;
            this.changePage(this.index);
        }
    };
    /**
     * 最后一页
     */
    PaginatorComponent.prototype.last = function () {
        if (this.index !== this.pageCount - 1) {
            this.index = this.pageCount - 1;
            this.changePage(this.index);
        }
    };
    return PaginatorComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PaginatorComponent.prototype, "count", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PaginatorComponent.prototype, "pageSize", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PaginatorComponent.prototype, "pageSizeChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PaginatorComponent.prototype, "index", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PaginatorComponent.prototype, "indexChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PaginatorComponent.prototype, "maximum", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], PaginatorComponent.prototype, "changePageSizeAble", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], PaginatorComponent.prototype, "inputAble", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], PaginatorComponent.prototype, "ellipsis", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], PaginatorComponent.prototype, "pageSizeOptions", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], PaginatorComponent.prototype, "size", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], PaginatorComponent.prototype, "showTotal", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], PaginatorComponent.prototype, "styleClass", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PaginatorComponent.prototype, "onChangePage", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PaginatorComponent.prototype, "onChangePageError", void 0);
PaginatorComponent = __decorate([
    core_1.Component({
        selector: 'paginator',
        templateUrl: './paginator.component.html',
        styleUrls: ['./paginator.component.less']
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], PaginatorComponent);
exports.PaginatorComponent = PaginatorComponent;
//# sourceMappingURL=paginator.component.js.map