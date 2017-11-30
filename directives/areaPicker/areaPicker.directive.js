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
require("./areaPicker.directive.less");
var AreaPicker = (function () {
    function AreaPicker() {
        this.values = []; //结果
        this.index = 0; //激活的item
        this.isShowLoader = true; //是否显示loader
    }
    /**
     * 创建最外层元素
     */
    AreaPicker.prototype.createWrap = function () {
        var _this = this;
        var wrap = document.createElement('DIV');
        wrap.className = 'areaPicker';
        //定位
        this.setPosition(wrap);
        this.wrap = wrap;
        document.body.appendChild(this.wrap);
        setTimeout(function () {
            _this.wrap.style.transition = 'opacity .3s ease-out';
            _this.wrap.style.opacity = '1';
        });
    };
    /**
     * 创建顶部
     */
    AreaPicker.prototype.createHeader = function () {
        var header = document.createElement('DIV');
        header.className = 'areaPicker-header';
        for (var i = 0, len = this.items.length; i < len; i++) {
            var item = document.createElement('DIV');
            item.className = 'areaPicker-header-item';
            item.innerHTML = this.items[i].label;
            item.setAttribute('data-index', i + '');
            item.setAttribute('data-type', 'header');
            this.items[i].elem = item;
            header.appendChild(item);
        }
        this.header = header;
        this.wrap.appendChild(this.header);
    };
    /**
     * 创建body（选择区）
     */
    AreaPicker.prototype.createBody = function () {
        var body = document.createElement('DIV');
        body.className = 'areaPicker-body';
        this.body = body;
        this.wrap.appendChild(this.body);
    };
    /**
     * 设置数据
     * @param data 新的数据
     * @param index 当前激活的item
     */
    AreaPicker.prototype.setData = function (data, index) {
        var i = (index !== undefined ? index : this.index);
        this.items[i].data = data;
        this.setBodyContent();
    };
    /**
     * 清空指定items下标的数据
     * @param index
     */
    AreaPicker.prototype.clearData = function (index) {
        var i = (index !== undefined ? index : this.index);
        this.items[i].data = [];
    };
    /**
     * 清空body内容
     */
    AreaPicker.prototype.clearBody = function () {
        this.body.innerHTML = this.isShowLoader ? '<span class="areaPicker-loader">正在加载...</span>' : '';
    };
    /**
     * 激活item
     * @param index
     */
    AreaPicker.prototype.activate = function (index) {
        for (var i = 0, len = this.items.length; i < len; i++) {
            this.removeClass(this.items[i].elem, 'active');
            if (i >= index) {
                this.items[i].elem.innerHTML = this.items[i].label;
            }
        }
        this.addClass(this.items[index].elem, 'active');
        this.index = index;
    };
    /**
     * 设置body里的内容（供选择的元素）
     * @param index
     */
    AreaPicker.prototype.setBodyContent = function (index) {
        this.body.innerHTML = '';
        var act_index = index || this.index;
        for (var i = 0, len = this.items[act_index].data.length; i < len; i++) {
            var o = this.items[act_index].data[i];
            var btn = document.createElement('SPAN');
            btn.className = 'areaPicker-item';
            btn.setAttribute('data-index', i + '');
            btn.setAttribute('data-type', 'item');
            btn.innerHTML = this.getObjByKey(o, this.items[act_index].key);
            this.body.appendChild(btn);
        }
    };
    /**
     * 定位
     * @param refElem
     */
    AreaPicker.prototype.setPosition = function (refElem) {
        var el = this.wrap;
        if (el) {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            var offsetHeight = document.documentElement.offsetHeight || document.body.offsetHeight;
            var pos = refElem.getBoundingClientRect();
            el.style.position = 'absolute';
            el.style.minWidth = (pos.right - pos.left) + 'px';
            if (document.body.clientHeight - pos.bottom < this.wrap.offsetHeight) {
                if (this.wrap.className.split(/\s+/).indexOf('areaPicker-top') < 0) {
                    this.addClass(this.wrap, 'areaPicker-top');
                }
                el.style.left = (pos.left + scrollLeft) + 'px';
                //el.style.top = (pos.top-this.wrap.offsetHeight+scrollTop)+ 'px';
                el.style.bottom = (offsetHeight - pos.top - scrollTop) + 'px';
            }
            else {
                if (this.wrap.className.split(/\s+/).indexOf('areaPicker-top') >= 0) {
                    this.removeClass(this.wrap, 'areaPicker-top');
                }
                el.style.left = (pos.left + scrollLeft) + 'px';
                el.style.top = (pos.bottom + scrollTop) + 'px';
            }
        }
    };
    /**
     * 关闭弹出框
     */
    AreaPicker.prototype.close = function () {
        if (this.wrap) {
            document.body.removeChild(this.wrap);
            this.wrap = null;
        }
    };
    /**
     * 通过key字符串获取指定对象的数据
     * @param data
     * @param keyStr  key/key.key.....
     * @returns {any}
     */
    AreaPicker.prototype.getObjByKey = function (data, keyStr) {
        if (data && typeof data === 'object') {
            var keys = keyStr.split('.');
            var obj = data;
            while (keys.length) {
                obj = obj[keys.shift()];
            }
            return obj;
        }
        else {
            return data;
        }
    };
    /**
     * 获取values中key指定的值拼接的字符串
     * @returns {string}
     */
    AreaPicker.prototype.getValuesStr = function () {
        var str = '';
        for (var i = 0, len = this.values.length; i < len; i++) {
            str += this.getObjByKey(this.values[i], this.items[i].key);
        }
        return str;
    };
    /**
     * 为元素添加一个类
     * @param elem
     * @param className
     */
    AreaPicker.prototype.addClass = function (elem, className) {
        var classList = elem.className.split(/\s+/);
        if (classList.indexOf(className) < 0) {
            classList.push(className);
            elem.className = classList.join(' ');
        }
    };
    /**
     * 删除某个类
     * @param elem
     * @param className
     */
    AreaPicker.prototype.removeClass = function (elem, className) {
        var classList = elem.className.split(/\s+/);
        var clsIndex = classList.indexOf(className);
        if (clsIndex >= 0) {
            classList.splice(clsIndex, 1);
            elem.className = classList.join(' ');
        }
    };
    return AreaPicker;
}());
exports.AreaPicker = AreaPicker;
/*@Directive({
  selector: '[areaPicker]'
})*/
var AreaPickerDirective = (function () {
    function AreaPickerDirective(elemRef) {
        this.elemRef = elemRef;
        this.ngModelChange = new core_1.EventEmitter();
        this.handlers = []; //事件处理函数，存储临时绑定时间
        this.triggerListener = {
            event: 'focus'
        };
    }
    /**
     * 添加事件
     * @param elem
     * @param event
     * @param fn
     */
    AreaPickerDirective.prototype.addEvent = function (elem, event, fn) {
        elem['addEventListener'](event, fn);
        this.handlers.push({
            elem: elem,
            event: event,
            fn: fn
        });
    };
    /**
     * 移除事件
     * @param elem
     * @param event
     * @param fn
     */
    AreaPickerDirective.prototype.removeEvent = function (elem, event, fn) {
        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            if (elem === handler.elem && event === handler.event && fn === handler.fn) {
                elem['removeEventListener'](event, fn);
            }
        }
    };
    /**
     * 清空事件
     */
    AreaPickerDirective.prototype.clearEvents = function () {
        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            handler.elem.removeEventListener(handler.event, handler.fn);
        }
    };
    AreaPickerDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.triggerListener.fn = function (ev) {
            _this.addEvent(_this.elemRef.nativeElement, 'click', function (ev) {
                ev.stopPropagation();
            });
            var picker = _this.areaPicker;
            if (picker.wrap) {
                return;
            }
            picker.createWrap();
            picker.setPosition(_this.elemRef.nativeElement);
            picker.createHeader();
            picker.createBody();
            picker.clearBody();
            picker.activate(0);
            picker.init();
            _this.addEvent(picker.wrap, 'click', function (ev) {
                ev.stopPropagation();
                var target = ev.target || ev.srcElement;
                var type = target['getAttribute']('data-type');
                if (type === 'item') {
                    var dataIndex = target['getAttribute']('data-index');
                    var selectedData = picker.items[picker.index].data[dataIndex];
                    picker.items[picker.index].elem.innerHTML = picker.getObjByKey(selectedData, picker.items[picker.index].key); //设置top内容
                    var nextIndex = picker.index + 1; //下一个激活的下标
                    picker.values.splice(picker.index + 1, picker.values.length - (picker.index + 1)); //值切割
                    picker.values[picker.index] = selectedData;
                    var selectedCallback = picker.items[picker.index].selected;
                    if (nextIndex < picker.items.length) {
                        picker.clearBody(); //清空body里的元素
                        picker.activate(nextIndex); //激活下一个
                    }
                    else {
                        if (typeof picker.done === 'function') {
                            _this.ngModelChange.emit(picker.getValuesStr());
                            picker.close(); //关闭弹出框
                            _this.clearEvents(); //清空（临时）事件
                            picker.done(picker.values);
                        }
                    }
                    selectedCallback(selectedData); //触发选择完毕回调
                }
                else if (type === 'header') {
                    var index = parseInt(target['getAttribute']('data-index'));
                    if (index !== picker.index) {
                        if (index < picker.index) {
                            picker.activate(index);
                            picker.setData(picker.items[index].data);
                        }
                        else {
                            if (picker.values[index] == picker.items[index].data) {
                                picker.activate(index);
                                picker.setData(picker.items[index].data);
                            }
                        }
                    }
                }
            });
            //点击空白关闭
            _this.addEvent(document, 'click', function () {
                _this.areaPicker.close();
                _this.clearEvents();
            });
            //窗口大小改变
            _this.addEvent(window, 'resize', function (ev) {
                if (_this.resizeTimer) {
                    clearTimeout(_this.resizeTimer);
                }
                _this.resizeTimer = setTimeout(function () {
                    _this.areaPicker.setPosition(_this.elemRef.nativeElement);
                }, 10);
            });
        };
        this.elemRef.nativeElement.addEventListener(this.triggerListener.event, this.triggerListener.fn);
    };
    AreaPickerDirective.prototype.ngOnDestroy = function () {
        this.elemRef.nativeElement.removeEventListener(this.triggerListener.event, this.triggerListener.fn);
    };
    return AreaPickerDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AreaPickerDirective.prototype, "areaPicker", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], AreaPickerDirective.prototype, "ngModelChange", void 0);
AreaPickerDirective = __decorate([
    core_1.Component({
        selector: '[areaPicker]',
        template: '',
        styleUrls: ['./areaPicker.directive.less']
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], AreaPickerDirective);
exports.AreaPickerDirective = AreaPickerDirective;
//# sourceMappingURL=areaPicker.directive.js.map