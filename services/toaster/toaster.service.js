"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Toaster = (function () {
    function Toaster() {
        this.toasters = [];
    }
    /**
     * 弹出
     * @param options
       */
    Toaster.prototype.pop = function (options) {
        var _this = this;
        var delay = options.delay || 5000; //延迟关闭的时间
        var animated = options.animated !== undefined ? options.animated : true; //是否加入动画
        if (this.container === null || this.container === undefined) {
            var container = document.getElementById('toast-container');
            if (container === null) {
                container = document.createElement('div');
                container.id = 'toast-container';
                container.className = 'toast-top-center';
                document.body.appendChild(container);
            }
            this.container = container;
        }
        var toast = document.createElement('DIV');
        var toastClass = ['toast', 'ng-leave', 'ng-leave-active'];
        var type = 'info';
        if (options.type) {
            var types = ['success', 'error', 'info', 'wait', 'warning'];
            if (types.indexOf(options.type) >= 0) {
                type = options.type;
            }
        }
        toastClass.push('toast-' + type);
        if (animated) {
            toastClass.push('ng-animate');
        }
        toast.className = toastClass.join(' ');
        var closeBtn = document.createElement('BUTTON');
        closeBtn.className = 'toast-close-button';
        closeBtn.innerHTML = '×';
        var message = document.createElement('div');
        message.innerHTML = "<div>" + options.message + "</div>";
        toast.appendChild(closeBtn);
        if (options.title) {
            var title = document.createElement('DIV');
            title.className = 'toast-title';
            title.innerHTML = options.title;
            toast.appendChild(title);
        }
        toast.appendChild(message);
        this.container.insertBefore(toast, this.container.firstChild);
        setTimeout(function () {
            var classList = toast.className.split(/\s+/);
            var clsIndex = classList.indexOf('ng-leave-active');
            if (clsIndex >= 0) {
                classList.splice(clsIndex, 1);
                toast.className = classList.join(' ');
            }
        });
        var timer = this.delayCloseTimer(toast, delay);
        closeBtn.addEventListener('click', function () {
            _this.container.removeChild(toast);
            toast = null;
        });
        toast.addEventListener('mouseover', function () {
            clearTimeout(timer);
            timer = null;
        });
        toast.addEventListener('mouseleave', function () {
            timer = _this.delayCloseTimer(toast, delay);
        });
    };
    Toaster.prototype.delayCloseTimer = function (toast, delay) {
        var _this = this;
        return setTimeout(function () {
            var classList = toast.className.split(/\s+/);
            var clsIndex = classList.indexOf('ng-leave-active');
            if (clsIndex < 0) {
                classList.push('ng-leave-active');
                toast.className = classList.join(' ');
            }
            setTimeout(function () {
                _this.container.removeChild(toast);
                toast = null;
            }, 1500);
        }, delay);
    };
    /**
     * 建立参数
     * @param arguments
     * @param type
     * @returns {ToasterOptions}
     */
    Toaster.prototype.createOptions = function (type, args) {
        var opt = {
            type: 'info',
            message: ''
        };
        if (['info', 'success', 'wait', 'warning', 'error'].indexOf(type) >= 0) {
            opt.type = type;
        }
        if (args) {
            if (args.length > 1) {
                opt.title = args[0];
                opt.message = args[1];
            }
            else if (args.length == 1) {
                opt.message = args[0];
            }
        }
        return opt;
    };
    Toaster.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.pop(this.createOptions('info', args));
    };
    Toaster.prototype.success = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.pop(this.createOptions('success', args));
    };
    Toaster.prototype.wait = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.pop(this.createOptions('wait', args));
    };
    Toaster.prototype.warning = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.pop(this.createOptions('warning', args));
    };
    Toaster.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.pop(this.createOptions('error', args));
    };
    return Toaster;
}());
exports.Toaster = Toaster;
//# sourceMappingURL=toaster.service.js.map