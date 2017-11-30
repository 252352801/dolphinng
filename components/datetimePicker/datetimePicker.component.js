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
var DatetimePickerComponent = (function () {
    function DatetimePickerComponent(elemRef) {
        this.elemRef = elemRef;
        this.valueChange = new core_1.EventEmitter(); //输出
        this.format = 'yyyy-MM-dd'; //格式化  yyyy-MM-dd hh:mm:ss
        this.start = '1970/01/01'; //最小可选日期（时间）
        this.end = '2070/12/31'; //最大可选日期（时间）
        this.trigger = 'focus'; //触发事件
        this.zIndex = 999; //层级
        this.isCalendar = false; //是否显示节日
        this.complete = new core_1.EventEmitter(); //选择完成
        this.visible = false; //是否显示
        this.ready = false; //是否已就绪
        this.year = null; //年
        this.month = null; //月
        this.day = null; //日
        this.hours = null; //时
        this.minutes = null; //分
        this.seconds = null; //秒
        //根据format设置以下值
        this.isPickSeconds = false; //是否选择秒
        this.isPickMinutes = false; //是否选择分
        this.isPickHours = false; //是否选择时
        this.isPickingTime = false; //是否在选择时间
        this.minError = false; //超出最小日期
        this.maxError = false; //超出最大日期
        this.left = 0;
        this.handlers = [];
        this.hoursOptions = [];
        this.minutesOrSecondsOptions = [];
        for (var i = 0; i < 24; i++) {
            this.hoursOptions.push(i);
        }
        for (var j = 0; j < 60; j++) {
            this.minutesOrSecondsOptions.push(j);
        }
    }
    DatetimePickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        {
            this.elemRef.nativeElement.style.display = 'inline-block';
            this.elemRef.nativeElement.style.position = 'relative';
            this.elemRef.nativeElement.style.verticalAlign = 'middle';
        }
        var inputElem = this.elemRef.nativeElement.querySelector('input');
        this.inputElem = inputElem;
        if (this.inputElem) {
            this.addEvent(this.inputElem, 'blur', function (ev) {
                if (_this.value) {
                    if (!_this.isFormat(_this.value, _this.format)) {
                        _this.valueChange.emit('');
                    }
                    else {
                        if (_this.min) {
                            var minDate = _this.getMinDate();
                            if (minDate && _this.isDateTimeGreaterThan(minDate, _this.date)) {
                                _this.valueChange.emit('');
                            }
                        }
                        if (_this.max) {
                            var maxDate = _this.getMaxDate();
                            if (maxDate && _this.isDateTimeGreaterThan(_this.date, maxDate)) {
                                _this.valueChange.emit('');
                            }
                        }
                    }
                }
            });
            this.addEvent(this.inputElem, 'input', function (ev) {
                if (_this.value && _this.isFormat(_this.value, _this.format)) {
                    _this.setOrgDate();
                }
            });
            this.addEvent(this.inputElem, this.trigger, function (ev) {
                _this.init();
                _this.visible = true;
                setTimeout(function () {
                    _this.setPosition();
                });
            });
            this.addEvent(document, 'click', function (ev) {
                if (_this.inputElem !== ev.target) {
                    if (_this.visible) {
                        _this.close();
                    }
                }
            });
        }
    };
    DatetimePickerComponent.prototype.ngOnDestroy = function () {
        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
            var handle = _a[_i];
            handle.elem.removeEventListener(handle.event, handle.fn);
        }
    };
    /**
     * 初始化
     */
    DatetimePickerComponent.prototype.init = function () {
        this.isPickingTime = false;
        this.minError = false;
        this.maxError = false;
        this.top = null;
        this.ready = false;
        this.testFormat();
        this.createYearOptions();
        this.createMonthOptions();
        this.setOrgDate();
        this.createDayOptions();
    };
    /**
     * 检测format以确定是否选择时、分、秒
     */
    DatetimePickerComponent.prototype.testFormat = function () {
        if (typeof this.format === 'string') {
            this.isPickHours = /[h|H]/.test(this.format);
            this.isPickMinutes = /[m]/.test(this.format);
            this.isPickSeconds = /[s|S]/.test(this.format);
        }
    };
    /**
     * 创建“年”选项
     */
    DatetimePickerComponent.prototype.createYearOptions = function () {
        this.yearOptions = [];
        var startDate = this.createDateWidthFormat(this.start, this.format);
        var endDate = this.createDateWidthFormat(this.end, this.format);
        var startYear = startDate.getFullYear();
        var endYear = endDate.getFullYear();
        if (startYear && endYear) {
            for (var i = startYear; i < endYear; i++) {
                this.yearOptions.push(i);
            }
        }
    };
    /**
     * 创建“月”选项
     */
    DatetimePickerComponent.prototype.createMonthOptions = function () {
        this.monthOptions = [];
        for (var i = 0; i < 12; i++) {
            this.monthOptions.push(i);
        }
    };
    /**
     * 创建“天”选项
     */
    DatetimePickerComponent.prototype.createDayOptions = function () {
        if (this.year === null || this.month === null) {
            return;
        }
        //确定第一天的星期
        //确定最后一天的星期
        //首尾填充
        var dayIndex = 0;
        var startDay = this.createDate();
        startDay.setFullYear(this.year);
        startDay.setMonth(this.month);
        startDay.setDate(1);
        var weekDay = startDay.getDay();
        if (weekDay < 7) {
            startDay.setDate(startDay.getDate() - weekDay);
        }
        var y = startDay.getFullYear();
        var m = startDay.getMonth();
        var d = startDay.getDate();
        this.dayOptions = [];
        var minDate = this.getMinDate(), maxDate = this.getMaxDate();
        for (var i = 0; i < 5; i++) {
            var group = [];
            for (var j = 0; j < 7; j++) {
                var newDate = this.createDate();
                newDate.setFullYear(y);
                newDate.setMonth(m);
                newDate.setDate(d + dayIndex);
                newDate.setHours(0);
                newDate.setMinutes(0);
                newDate.setSeconds(0);
                var isCurrent = (newDate.getMonth() == this.month);
                var disabled = false;
                if (minDate && this.isDateTimeGreaterThan(minDate, newDate)) {
                    disabled = true;
                }
                if (maxDate && this.isDateTimeGreaterThan(newDate, maxDate)) {
                    disabled = true;
                }
                group.push({
                    date: newDate,
                    isCurrent: isCurrent,
                    disabled: disabled,
                    text: newDate.getDate()
                });
                dayIndex++;
            }
            this.dayOptions.push(group);
        }
    };
    DatetimePickerComponent.prototype.addEvent = function (elem, event, fn) {
        elem['addEventListener'](event, fn);
        this.handlers.push({
            elem: elem,
            event: event,
            fn: fn
        });
    };
    /**
     * 通过format查找字符串str里相应的字符
     * @param str
     * @param format
     * @param condiction
     * @param len
     * @returns {string}
     */
    DatetimePickerComponent.prototype.searchStrByFormat = function (str, format, condiction, len) {
        var result = '';
        var index, resultLen;
        if (len instanceof Array) {
            len.sort(function (a, b) {
                return b - a;
            });
            for (var _i = 0, len_1 = len; _i < len_1.length; _i++) {
                var l = len_1[_i];
                var regExpStr = condiction + (l > 1 ? '{' + l + '}' : '');
                var resExp = new RegExp(regExpStr);
                index = format.search(resExp);
                if (index >= 0) {
                    resultLen = l;
                    break;
                }
            }
        }
        else if (typeof len === 'number') {
            var regExpStr = condiction + (len > 1 ? '{' + len + '}' : '');
            var resExp = new RegExp(regExpStr);
            index = format.search(resExp);
            resultLen = len;
        }
        if (index >= 0) {
            result = str.substring(index, index + resultLen);
            return result;
        }
    };
    DatetimePickerComponent.prototype.createDateWidthFormat = function (dateStr, format) {
        var date = this.createDate(dateStr);
        if (!date) {
            date = this.createDate();
            var year = void 0, month = void 0, day = void 0, hours = void 0, minutes = void 0, seconds = void 0;
            //年
            year = parseInt(this.searchStrByFormat(dateStr, format, '[yY]', 4)) || date.getFullYear();
            date.setFullYear(year);
            //月
            month = parseInt(this.searchStrByFormat(dateStr, format, '[M]', [1, 2])) || 1;
            date.setMonth(parseInt(month) - 1);
            //日
            day = parseInt(this.searchStrByFormat(dateStr, format, '[dD]', [1, 2])) || 1;
            date.setDate(parseInt(day));
            //时
            hours = parseInt(this.searchStrByFormat(dateStr, format, '[hH]', [1, 2])) || 0;
            date.setHours(parseInt(hours));
            //分
            minutes = parseInt(this.searchStrByFormat(dateStr, format, '[m]', [1, 2])) || 0;
            date.setMinutes(parseInt(minutes));
            //秒
            seconds = parseInt(this.searchStrByFormat(dateStr, format, '[sS]', [1, 2])) || 0;
            date.setSeconds(parseInt(seconds));
        }
        return date;
    };
    /**
     * 日期是否大于
     * @param date1
     * @param date2
     * @returns {boolean}
     */
    DatetimePickerComponent.prototype.isDateTimeGreaterThan = function (date1, date2) {
        return date1.getTime() - date2.getTime() >= 1000; //误差1000毫秒以内
    };
    /**
     * 建立新的时间对象
     * @param dateStr
     * @returns {Date}
     */
    DatetimePickerComponent.prototype.createDate = function (dateStr) {
        var date;
        if (dateStr) {
            date = new Date(dateStr.replace(/-/g, '/'));
        }
        else {
            date = new Date();
            date.setTime(Math.floor(date.getTime() / 1000) * 1000);
        }
        if (date.toDateString() != 'Invalid Date') {
            return date;
        }
    };
    /**
     * 设置初始日期
     */
    DatetimePickerComponent.prototype.setOrgDate = function () {
        var dateStr = '';
        if (this.value) {
            dateStr = this.value;
        }
        else if (this.inputElem) {
            dateStr = this.inputElem.value;
        }
        var date;
        if (dateStr) {
            date = this.createDateWidthFormat(dateStr, this.format);
        }
        else {
            date = this.createDate();
        }
        this.date = date;
        this.setValues();
    };
    /**
     * 设置日期的年份
     * @param year
     */
    DatetimePickerComponent.prototype.setDateFullYear = function (year) {
        this.date.setFullYear(year || this.year);
    };
    /**
     * 设置日期的月份
     * @param month
     */
    DatetimePickerComponent.prototype.setDateMonth = function (month) {
        this.date.setMonth(month || this.month);
    };
    /**
     * 设置年月日时分秒的值
     * @param date
     */
    DatetimePickerComponent.prototype.setValues = function (date) {
        var dateTime = date || this.date;
        this.year = dateTime.getFullYear();
        this.month = dateTime.getMonth();
        this.day = dateTime.getDate();
        this.hours = dateTime.getHours();
        this.minutes = dateTime.getMinutes();
        this.seconds = dateTime.getSeconds();
    };
    DatetimePickerComponent.prototype.stopPropagation = function (ev) {
        ev.stopPropagation();
    };
    /**
     * 根据input相对屏幕位置设置弹出框位置
     */
    DatetimePickerComponent.prototype.setPosition = function () {
        if (this.popover && this.inputElem) {
            var popoverH = this.popover.nativeElement.offsetHeight;
            var popoverW = this.popover.nativeElement.offsetWidth;
            var inputH = this.inputElem.offsetHeight;
            var inputW = this.inputElem.offsetWidth;
            var rect = this.inputElem.getBoundingClientRect();
            var viewH = document.body.clientHeight;
            var viewW = document.body.clientWidth;
            if (viewH - rect.bottom < popoverH) {
                this.top = -popoverH;
            }
            else {
                this.top = inputH;
            }
            if (viewW - rect.left < popoverW) {
                this.left = inputW - popoverW;
            }
            else {
                this.left = 0;
            }
        }
        this.ready = true;
    };
    /**
     * 创建“天”选项
     */
    DatetimePickerComponent.prototype.createDays = function () {
    };
    /**
     * 选择天
     */
    DatetimePickerComponent.prototype.pickDay = function (day) {
        if (!day.disabled) {
            this.date = day.date;
            this.setValues();
            if (this.isPickHours || this.isPickMinutes || this.isPickSeconds) {
                this.isPickingTime = true;
            }
            else {
                this.output();
            }
        }
    };
    /**
     * 上月
     */
    DatetimePickerComponent.prototype.prevMonth = function () {
        var newMonth = this.month - 1;
        this.date.setMonth(newMonth);
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.day = this.date.getDate();
    };
    /**
     * 下一月
     */
    DatetimePickerComponent.prototype.nextMonth = function () {
        var newMonth = this.month + 1;
        this.date.setMonth(newMonth);
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.day = this.date.getDate();
    };
    /**
     * 获取最小日期
     * @returns {Date}
     */
    DatetimePickerComponent.prototype.getMinDate = function () {
        if (this.min) {
            var date = this.createDateWidthFormat(this.min, this.format);
            if (date.toDateString() !== 'Invalid Date') {
                return date;
            }
        }
        return null;
    };
    /**
     * 获取最大日期
     * @returns {Date}
     */
    DatetimePickerComponent.prototype.getMaxDate = function () {
        if (this.max) {
            var date = this.createDateWidthFormat(this.max, this.format);
            ;
            if (date.toDateString() !== 'Invalid Date') {
                return date;
            }
        }
        return null;
    };
    /**
     * 输入时最大值检测
     * @param ev
     * @param max
     */
    DatetimePickerComponent.prototype.maxInputTest = function (ev, max) {
    };
    /**
     * 输入是否符合要求
     * @param str
     * @param format
     * @returns {boolean}
     */
    DatetimePickerComponent.prototype.isFormat = function (str, format) {
        var str1 = str.replace(/\d{2}|\d/g, '**');
        var str2 = format.replace(/[yYMdDhHmsS]{2}|[yYMdDhHmsS]/g, '**');
        return str1 === str2;
    };
    /**
     * 清空
     */
    DatetimePickerComponent.prototype.clear = function () {
        if (this.inputElem) {
            this.inputElem.value = '';
            this.valueChange.emit('');
        }
        this.close();
    };
    /**
     * 现在
     */
    DatetimePickerComponent.prototype.now = function () {
        var date = this.createDate();
        if (!this.isPickSeconds) {
            date.setSeconds(0);
        }
        if (!this.isPickMinutes) {
            date.setMinutes(0);
        }
        if (!this.isPickHours) {
            date.setHours(0);
        }
        this.date = date;
        this.setValues(date);
        this.createDayOptions();
        this.output();
    };
    /**
     * 清除错误
     */
    DatetimePickerComponent.prototype.clearErrors = function () {
        this.minError = false;
        this.maxError = false;
    };
    /**
     * 输出
     */
    DatetimePickerComponent.prototype.output = function () {
        var minDate = this.getMinDate(), maxDate = this.getMaxDate();
        if (minDate && this.isDateTimeGreaterThan(minDate, this.date)) {
            this.minError = true;
            return false;
        }
        else if (maxDate && this.isDateTimeGreaterThan(this.date, maxDate)) {
            this.maxError = true;
            return false;
        }
        var result = this.format;
        var month = this.month + 1;
        //年
        result = result.replace(/[yY]{4}/, this.year + '');
        //月
        if (/[M]{2}/.test(this.format)) {
            result = result.replace(/[M]{2}/, month < 10 ? '0' + month : month + '');
        }
        else if (/M/.test(this.format)) {
            result = result.replace(/M/, month + '');
        }
        //日
        if (/[dD]{2}/.test(this.format)) {
            result = result.replace(/[dD]{2}/, this.day < 10 ? '0' + this.day : this.day + '');
        }
        else if (/[dD]/.test(this.format)) {
            result = result.replace(/[dD]/, this.day + '');
        }
        //时
        if (/[hH]{2}/.test(this.format)) {
            result = result.replace(/[hH]{2}/, this.hours < 10 ? '0' + this.hours : this.hours + '');
        }
        else if (/[hH]/.test(this.format)) {
            result = result.replace(/[hH]/, this.hours + '');
        }
        //分
        if (/[m]{2}/.test(this.format)) {
            result = result.replace(/[m]{2}/, this.minutes < 10 ? '0' + this.minutes : this.minutes + '');
        }
        else if (/[m]/.test(this.format)) {
            result = result.replace(/[m]/, this.minutes + '');
        }
        //分
        if (/[sS]{2}/.test(this.format)) {
            result = result.replace(/[sS]{2}/, this.seconds < 10 ? '0' + this.seconds : this.seconds + '');
        }
        else if (/[sS]/.test(this.format)) {
            result = result.replace(/[sS]/, this.seconds + '');
        }
        this.valueChange.emit(result);
        this.close();
        this.complete.emit(result);
    };
    /**
     * 关闭
     */
    DatetimePickerComponent.prototype.close = function () {
        this.visible = false;
        this.ready = false;
    };
    return DatetimePickerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatetimePickerComponent.prototype, "value", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DatetimePickerComponent.prototype, "valueChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatetimePickerComponent.prototype, "format", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatetimePickerComponent.prototype, "max", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatetimePickerComponent.prototype, "min", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatetimePickerComponent.prototype, "start", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatetimePickerComponent.prototype, "end", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatetimePickerComponent.prototype, "trigger", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DatetimePickerComponent.prototype, "zIndex", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DatetimePickerComponent.prototype, "isCalendar", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DatetimePickerComponent.prototype, "complete", void 0);
__decorate([
    core_1.ViewChild('popover'),
    __metadata("design:type", core_1.ElementRef)
], DatetimePickerComponent.prototype, "popover", void 0);
DatetimePickerComponent = __decorate([
    core_1.Component({
        selector: 'datetime-picker',
        templateUrl: './datetimePicker.component.html',
        styleUrls: ['./datetimePicker.component.less']
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], DatetimePickerComponent);
exports.DatetimePickerComponent = DatetimePickerComponent;
//# sourceMappingURL=datetimePicker.component.js.map