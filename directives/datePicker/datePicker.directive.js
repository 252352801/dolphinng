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
require("./laydate/laydate.js");
var DatePickerDirective = (function () {
    function DatePickerDirective(elemRef) {
        this.elemRef = elemRef;
        this.ngModelChange = new core_1.EventEmitter();
        this.complete = new core_1.EventEmitter(); //选择完成的回调
    }
    DatePickerDirective.prototype.getOptions = function () {
        var _this = this;
        var opt = {
            elem: this.elemRef.nativeElement,
        };
        this.isPickTime && (opt.type = 'datetime');
        this.isPickTime && (opt.format = 'yyyy-MM-dd HH:mm:ss');
        this.min && (opt.min = this.min);
        this.max && (opt.max = this.max);
        this.event && (opt.trigger = this.event);
        this.zIndex && (opt.zIndex = this.zIndex);
        this.isShowFestival && (opt.calendar = true);
        this.format && (opt.format = this.format);
        if (this.range) {
            opt.range = this.range;
        }
        opt.value = ''; //初始值
        opt.show = false; //是否默认显示
        opt.position = 'absolute'; //定位方式  默认absolute   其他fixed,static
        opt.showBttom = true; //是否显示底部按钮栏
        opt.btns = ['clear', 'now', 'confirm']; //右下角显示的按钮顺序
        opt.lang = 'cn'; //语言  en
        opt.theme = 'default'; //除了内置外可自定义  如'#393点9'  也可以填css类使其加到控件上
        opt.mark = null; //object标注重要日子 如特定日期{'2017-11-11':'光棍节'}  0表示每年/月，如{'0-11-11':'光棍节'}
        opt.ready = function (date) {
        };
        opt.change = function (value, date, endDate) {
            //console.log(value); //得到日期生成的值，如：2017-08-18
            //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            //console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
        };
        opt.done = function (value, date, endDate) {
            //console.log(value); //得到日期生成的值，如：2017-08-18
            //console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            //console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
            _this.ngModelChange.emit(value);
            _this.complete.emit(value);
        };
        return opt;
    };
    DatePickerDirective.prototype.ngOnInit = function () {
        this.ref = laydate['render'](this.getOptions());
    };
    DatePickerDirective.prototype.ngOnChanges = function () {
    };
    return DatePickerDirective;
}());
__decorate([
    core_1.Input('datePicker'),
    __metadata("design:type", String)
], DatePickerDirective.prototype, "value", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DatePickerDirective.prototype, "ngModelChange", void 0);
__decorate([
    core_1.Input('opt-event'),
    __metadata("design:type", String)
], DatePickerDirective.prototype, "event", void 0);
__decorate([
    core_1.Input('opt-format'),
    __metadata("design:type", String)
], DatePickerDirective.prototype, "format", void 0);
__decorate([
    core_1.Input('opt-ispicktime'),
    __metadata("design:type", Boolean)
], DatePickerDirective.prototype, "isPickTime", void 0);
__decorate([
    core_1.Input('opt-festival'),
    __metadata("design:type", Boolean)
], DatePickerDirective.prototype, "isShowFestival", void 0);
__decorate([
    core_1.Input('opt-min'),
    __metadata("design:type", String)
], DatePickerDirective.prototype, "min", void 0);
__decorate([
    core_1.Input('opt-max'),
    __metadata("design:type", String)
], DatePickerDirective.prototype, "max", void 0);
__decorate([
    core_1.Input('opt-start'),
    __metadata("design:type", String)
], DatePickerDirective.prototype, "start", void 0);
__decorate([
    core_1.Input('opt-end'),
    __metadata("design:type", String)
], DatePickerDirective.prototype, "end", void 0);
__decorate([
    core_1.Input('opt-fixed'),
    __metadata("design:type", Boolean)
], DatePickerDirective.prototype, "isFixed", void 0);
__decorate([
    core_1.Input('opt-zindex'),
    __metadata("design:type", Number)
], DatePickerDirective.prototype, "zIndex", void 0);
__decorate([
    core_1.Input('opt-range'),
    __metadata("design:type", Object)
], DatePickerDirective.prototype, "range", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DatePickerDirective.prototype, "complete", void 0);
DatePickerDirective = __decorate([
    core_1.Component({
        selector: '[datePicker]',
        template: ''
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], DatePickerDirective);
exports.DatePickerDirective = DatePickerDirective;
//# sourceMappingURL=datePicker.directive.js.map