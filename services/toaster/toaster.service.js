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
    Toaster.prototype.info = function (title, message) {
        this.pop({
            type: 'info',
            title: title,
            message: message
        });
    };
    Toaster.prototype.success = function (title, message) {
        this.pop({
            type: 'success',
            title: title,
            message: message
        });
    };
    Toaster.prototype.wait = function (title, message) {
        this.pop({
            type: 'wait',
            title: title,
            message: message
        });
    };
    Toaster.prototype.warning = function (title, message) {
        this.pop({
            type: 'warning',
            title: title,
            message: message
        });
    };
    Toaster.prototype.error = function (title, message) {
        this.pop({
            type: 'error',
            title: title,
            message: message
        });
    };
    return Toaster;
}());
exports.Toaster = Toaster;
//# sourceMappingURL=toaster.service.js.map