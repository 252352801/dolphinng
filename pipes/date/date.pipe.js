"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DatePipe = (function () {
    function DatePipe() {
    }
    DatePipe.prototype.createDate = function (dateStr) {
        var date = new Date(dateStr);
        if (date + '' === 'Invalid Date') {
            date = new Date(dateStr.replace(/-/g, '/').replace(/\.\d+$/, ''));
            if (date + '' === 'Invalid Date') {
                return null;
            }
        }
        return date;
    };
    DatePipe.prototype.transform = function (value, fmt) {
        if (value) {
            var date = void 0;
            if (value instanceof Date) {
                date = value;
            }
            else if (typeof value === 'string') {
                date = this.createDate(value);
            }
            if (!date) {
                return value;
            }
            var o = {
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
                "h+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds(),
                "q+": Math.floor((date.getMonth() + 3) / 3),
                "S": date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            return fmt;
        }
        else if (value) {
            return value;
        }
    };
    return DatePipe;
}());
DatePipe = __decorate([
    core_1.Pipe({ name: 'date' })
], DatePipe);
exports.DatePipe = DatePipe;
//# sourceMappingURL=date.pipe.js.map