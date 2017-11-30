"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PopService = (function () {
    function PopService() {
        this.animated = true;
        this.eventList = [];
    }
    /**
     * 初始化
     */
    PopService.prototype.init = function () {
        this.removePop();
        this.clearEvents();
        this.type = 'info';
        this.title = '提示';
        this.text = '';
        this.confirmButtonText = '确定';
        this.cancelButtonText = '取消';
        this.showConfirmButton = true;
        this.showCancelButton = false;
        this.confirmButtonType = 'info';
        this.textAlign = 'center';
        this.cancelButtonType = 'default';
        this.closeOnConfirm = true;
        this.closeOnCancel = true;
        this.showLoaderOnConfirm = false;
        this.showLoaderOnCancel = false;
        this.confirmLoaderText = this.confirmButtonText;
        this.cancelLoaderText = this.cancelButtonText;
        this.confirmed = false;
        this.canceled = false;
        this.confirmHandlers = [];
        this.cancelHandlers = [];
        this.closeHandlers = [];
        this.confirmButton = null;
        this.cancelButton = null;
        this.closeButton = null;
        this.popWrap = null;
    };
    /**
     * 显示
     */
    PopService.prototype.show = function () {
        var _this = this;
        //蒙层
        this.popWrap = document.createElement('DIV');
        this.popWrap.className = 'pop-wrap' + ' ' + this.type;
        document.body.appendChild(this.popWrap);
        //内容块
        var pop = document.createElement('DIV');
        pop.className = 'pop-main';
        //pop头部
        var popHeader = document.createElement('DIV');
        popHeader.className = 'pop-header';
        popHeader.innerHTML = '<div class="alert-title">' + this.title + '</div>';
        this.closeButton = document.createElement('span');
        this.closeButton.className = 'pop-btn-close';
        this.closeButton.innerHTML = '×';
        this.addEvent(this.closeButton, 'click', function () {
            _this.close();
            for (var _i = 0, _a = _this.closeHandlers; _i < _a.length; _i++) {
                var handler = _a[_i];
                handler.apply(_this);
            }
        });
        popHeader.appendChild(this.closeButton);
        pop.appendChild(popHeader);
        //pop body
        var popBody = document.createElement('DIV');
        popBody.className = 'pop-body';
        if (this.textAlign === 'center') {
            popBody.className = 'pop-body pop-body-txt-center';
        }
        var popText = document.createElement('DIV');
        popText.className = 'pop-text';
        var iconHTML = (this.iconClass !== undefined && this.iconClass !== '') ? '<i class="' + this.iconClass + '"></i>' : '';
        popText.innerHTML = iconHTML + this.text;
        popBody.appendChild(popText);
        pop.appendChild(popBody);
        // pop footer
        var popFooter = document.createElement('DIV');
        popFooter.className = 'pop-footer';
        // let dottingHTML='<i class="dotting"></i>';//loader
        var dottingHTML = '...'; //loader
        if (this.showConfirmButton) {
            var btnConfirm_1 = document.createElement('BUTTON');
            var btnConfirmClassList_1 = ['btn', 'btn-' + this.confirmButtonType];
            btnConfirm_1.className = btnConfirmClassList_1.join(' ');
            btnConfirm_1.innerHTML = this.confirmButtonText;
            popFooter.appendChild(btnConfirm_1);
            this.confirmButton = btnConfirm_1;
            this.addEvent(btnConfirm_1, 'click', function () {
                if (_this.confirmed || _this.canceled) {
                    _this.close();
                    return;
                }
                if (_this.closeOnConfirm) {
                    _this.close();
                }
                else if (_this.showLoaderOnConfirm) {
                    btnConfirmClassList_1.push('disabled');
                    btnConfirm_1.className = btnConfirmClassList_1.join(' ');
                    btnConfirm_1.innerHTML = _this.confirmLoaderText + dottingHTML;
                }
                for (var _i = 0, _a = _this.confirmHandlers; _i < _a.length; _i++) {
                    var handler = _a[_i];
                    handler.apply(_this);
                }
                _this.confirmed = true;
            });
        }
        if (this.showCancelButton) {
            var btnCancel_1 = document.createElement('BUTTON');
            var btnCancelClassList_1 = ['btn', 'btn-' + this.cancelButtonType];
            btnCancel_1.className = btnCancelClassList_1.join(' ');
            btnCancel_1.innerHTML = this.cancelButtonText;
            popFooter.appendChild(btnCancel_1);
            this.addEvent(btnCancel_1, 'click', function () {
                if (_this.canceled || _this.confirmed) {
                    _this.close();
                    return;
                }
                if (_this.closeOnCancel) {
                    _this.close();
                }
                else if (_this.showLoaderOnCancel) {
                    btnCancelClassList_1.push('disabled');
                    btnCancel_1.className = btnCancelClassList_1.join(' ');
                    btnCancel_1.innerHTML = _this.cancelLoaderText + dottingHTML;
                }
                for (var _i = 0, _a = _this.cancelHandlers; _i < _a.length; _i++) {
                    var handler = _a[_i];
                    handler.apply(_this);
                }
                _this.canceled = true;
            });
            this.cancelButton = btnCancel_1;
        }
        pop.appendChild(popFooter);
        this.popWrap.appendChild(pop);
        if (this.animated) {
            setTimeout(function () {
                _this.popWrap.className = _this.popWrap.className + ' animated';
            }, 10);
        }
        else {
            this.popWrap.className = this.popWrap.className + ' animated';
        }
    };
    /**
     * 关闭
     */
    PopService.prototype.close = function () {
        this.removePop();
    };
    /**
     * 移除
     */
    PopService.prototype.removePop = function () {
        if (this.popWrap !== null && this.popWrap !== undefined) {
            try {
                document.body.removeChild(this.popWrap);
            }
            catch (err) {
                //ignore
            }
        }
    };
    /**
     * 设置参数
     * @param opt
       */
    PopService.prototype.setOptions = function (opt) {
        for (var prop in opt) {
            this[prop] = opt[prop];
        }
    };
    PopService.prototype.getArgs = function (arg) {
        var strs = [], opts = { text: '' };
        if (arguments.length) {
            for (var i = 0, len = arguments.length; i < len; i++) {
                var arg_1 = arguments[i][0];
                if (typeof arg_1 === 'string') {
                    strs.push(arg_1);
                }
                else if (arg_1 && typeof arg_1 === 'object') {
                    for (var o in arg_1) {
                        opts[o + ''] = arg_1[o + ''];
                    }
                }
            }
        }
        if (strs.length > 0) {
            opts.text = strs[0];
        }
        if (strs.length > 1) {
            opts.title = strs[1];
        }
        return opts;
    };
    /**
     * 打开确认框
     * @param text
     * @param title
     * @param opt
     * @returns {PopService}
     */
    PopService.prototype.confirm = function (text, title, opt) {
        this.init();
        this.type = 'confirm';
        this.showConfirmButton = true;
        this.showCancelButton = true;
        var options = this.getArgs(arguments);
        this.setOptions(options);
        this.show();
        return this;
    };
    /**
     * 打开消息框
     * @param text
     * @param title
     * @param opt
     * @returns {PopService}
     */
    PopService.prototype.info = function (text, title, opt) {
        this.init();
        this.type = 'info';
        this.showConfirmButton = true;
        this.showCancelButton = false;
        var options = this.getArgs(arguments);
        this.setOptions(options);
        this.show();
        return this;
    };
    /**
     * 打开错误消息框
     * @param text
     * @param title
     * @param opt
     * @returns {PopService}
     */
    PopService.prototype.error = function (text, title, opt) {
        this.init();
        this.type = 'error';
        this.showConfirmButton = true;
        this.showCancelButton = false;
        this.confirmButtonType = 'danger';
        this.title = '错误';
        var options = this.getArgs(arguments);
        this.setOptions(options);
        this.show();
        return this;
    };
    /**
     * 添加确认处理
     * @param handler 处理函数
       */
    PopService.prototype.onConfirm = function (handler) {
        this.confirmHandlers.push(handler);
        return this;
    };
    /**
     * 添加取消处理
     * @param handler 处理函数
       */
    PopService.prototype.onCancel = function (handler) {
        this.cancelHandlers.push(handler);
        return this;
    };
    /**
     * 添加关闭处理
     * @param handler 处理函数
       */
    PopService.prototype.onClose = function (handler) {
        this.closeHandlers.push(handler);
        return this;
    };
    /**
     * 清楚所有元素上绑定的事件
     */
    PopService.prototype.clearEvents = function () {
        try {
            for (var i = 0, len = this.eventList.length; i < len; i++) {
                this.eventList[i].target.removeEventListener(this.eventList[i].event, this.eventList[i].handler);
            }
            this.eventList = [];
        }
        catch (err) {
            console.log(err);
        }
    };
    /**
     * 给元素添加事件
     * @param target 元素
     * @param event 事件名
     * @param handler 处理函数
     */
    PopService.prototype.addEvent = function (target, event, handler) {
        target.addEventListener(event, handler);
        this.eventList.push({ target: target, handler: handler, event: event });
    };
    return PopService;
}());
exports.PopService = PopService;
//# sourceMappingURL=pop.service.js.map