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
var GalleryComponent = (function () {
    function GalleryComponent(eleRef) {
        this.eleRef = eleRef;
        this.data = [];
        this.dataProps = [];
        this.change = new core_1.EventEmitter();
        this.title = '';
        this.isFullScreen = false; //是否全屏
        this.images = [];
        this.render = false;
        this.visible = false;
        this.ready = false;
        this.left = 0; //当前left
        this.top = 0; //当前top
        this.tempLeft = 0;
        this.tempTop = 0;
        this.thumbScrollWidth = 0;
        this.transitionTime = 300; //过渡时间ms
        this.activeIndex = 0;
        this.isThumbOverflow = false; //是否缩略图溢出
        this.isEventSource = false; //是否有事件源
        this.isShowTools = false;
        this.isSupportCssObjectFit = false; //是否支持css object-fit属性
        this.tween = {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1)
                    return c / 2 * t * t + b;
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            }
        };
    }
    GalleryComponent.prototype.removeEvents = function () {
        window.removeEventListener('resize', this.resizeHandler); //取消监听
        window.removeEventListener('click', this.windowClickHandler); //取消监听
    };
    GalleryComponent.prototype.ngOnInit = function () {
        var elem = document.createElement('IMG');
        if (elem.style['objectFit'] !== undefined) {
            this.isSupportCssObjectFit = true;
        }
        elem = null;
    };
    GalleryComponent.prototype.ngOnDestroy = function () {
        this.removeEvents();
    };
    /**
     * 检查是否溢出
     */
    GalleryComponent.prototype.checkIsThumbOverflow = function () {
        var _this = this;
        var elem = this.eleRef.nativeElement.querySelector('.gallery-thumb-sliders');
        var check = function () {
            if (_this.images.length > 1) {
                if (elem && elem['offsetWidth'] > 0) {
                    _this.isThumbOverflow = elem && (elem.scrollWidth > elem.clientWidth);
                    if (_this.isThumbOverflow) {
                        var galleryThumbScroll = _this.eleRef.nativeElement.querySelector('.gallery-thumb-scroll');
                        var thumbSliders = galleryThumbScroll.querySelectorAll('.gallery-thumb-slider');
                        if (thumbSliders.length > 0) {
                            _this.thumbScrollWidth = thumbSliders[0]['offsetWidth'] * thumbSliders.length;
                            if (_this.thumbScrollWidth < elem.scrollWidth) {
                                _this.isThumbOverflow = false;
                            }
                        }
                    }
                }
                else {
                    setTimeout(check, 10);
                }
            }
        };
        check();
    };
    /**
     * 初始化图片数据
     * @param data
     * @param props
     */
    GalleryComponent.prototype.initImages = function (data, props) {
        this.images = [];
        if (data.length > 0) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var o = data_1[_i];
                if (props.length > 0) {
                    this.images.push(this.getValueByProps(o, props));
                }
                else {
                    this.images.push(o);
                }
            }
        }
    };
    GalleryComponent.prototype.slideThumbAfterChange = function (direction) {
        var _this = this;
        clearTimeout(this.thumbSlideTimer);
        this.thumbSlideTimer = setTimeout(function () {
            var sliderWrap = _this.eleRef.nativeElement.querySelector('.gallery-thumb-sliders');
            var perW = _this.eleRef.nativeElement.querySelector('.gallery-thumb-slider').offsetWidth;
            var scrollL = sliderWrap.scrollLeft;
            var sliderW = sliderWrap.clientWidth;
            if (direction === 0) {
                var refValue = (_this.activeIndex) * perW;
                if (scrollL > refValue) {
                    _this.slide(sliderWrap, refValue - scrollL);
                }
            }
            else if (direction === 1) {
                var validScrollLeft = perW * (_this.activeIndex + 1) - sliderW;
                if (validScrollLeft > scrollL) {
                    _this.slide(sliderWrap, validScrollLeft - scrollL);
                }
            }
        });
    };
    /**
     * 缩略图滚动
     * @param elem
     * @param direction
     */
    GalleryComponent.prototype.slideThumb = function (elem, direction) {
        var val = 0;
        var thumbItem = elem.querySelector('.gallery-thumb-slider');
        var thumbItemWidth = thumbItem['offsetWidth'];
        if (direction == 0) {
            val = -elem.clientWidth;
        }
        else {
            val = Math.floor(elem.clientWidth / thumbItemWidth) * thumbItemWidth;
        }
        var canScrollVal = elem.scrollWidth - elem.scrollLeft;
        if (val > canScrollVal) {
            val = Math.floor((canScrollVal) / thumbItemWidth) * thumbItemWidth;
        }
        this.slide(elem, val);
    };
    /**
     * 滚动
     * @param elem 滚动的元素
     * @param val  滚动值
     */
    GalleryComponent.prototype.slide = function (elem, val) {
        var scrollLen = val;
        {
            var fps = 60; //帧数
            var run_time = 300; //执行时间
            var t_o = 1000 / fps; //每改变一次的时间间隔
            var t = 0; //开始时间
            var b = elem.scrollLeft; //初始值
            var c = scrollLen; //变化量
            var d = run_time / t_o; //次数
            var animate = this.tween.easeInOut; //选择算法
        }
        var timer = setInterval(function () {
            var newVal = Math.ceil(animate(t, b, c, d));
            elem.scrollLeft = newVal;
            if (t < d) {
                t++;
            }
            else {
                clearInterval(timer);
            }
        }, t_o);
    };
    /**
     * 通过属性名获取值
     * @param obj
     * @param pros
     * @returns {Object}
     */
    GalleryComponent.prototype.getValueByProps = function (obj, pros) {
        var result = obj;
        for (var _i = 0, pros_1 = pros; _i < pros_1.length; _i++) {
            var prop = pros_1[_i];
            if (typeof result === 'object') {
                result = result[prop];
            }
        }
        return result;
    };
    /**
     * 打开
     */
    GalleryComponent.prototype.open = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.render = true;
        this.isShowTools = true;
        this.isFullScreen = false;
        var dataIndex = 0; //索引
        var ev; //事件源
        var paramStrArr = []; //字符串数组参数容器
        var imgSrc = '';
        if (args && args.length > 0) {
            for (var i in args) {
                if (args[i] instanceof MouseEvent) {
                    ev = args[i];
                }
                if (typeof args[i] === 'number') {
                    dataIndex = args[i];
                }
                if (args[i] instanceof Array) {
                    paramStrArr.push(args[i]);
                }
                if (typeof args[i] === 'string') {
                    if (!imgSrc) {
                        imgSrc = args[i];
                    }
                    else {
                        this.title = args[i]; //title
                    }
                }
            }
        }
        var dataObj = this.data;
        var dataProps = this.dataProps;
        if (imgSrc !== '') {
            dataObj = [imgSrc];
            dataProps = [];
            dataIndex = 0;
        }
        else {
            if (paramStrArr.length > 0) {
                dataObj = paramStrArr[0];
            }
            if (paramStrArr.length > 1) {
                dataProps = paramStrArr[1];
            }
        }
        this.initImages(dataObj, dataProps);
        var maxIndex = dataObj.length - 1;
        this.activate(dataIndex > maxIndex ? maxIndex : dataIndex);
        if (ev) {
            this.isEventSource = true;
            var pos = this.getMousePosition(ev);
            this.tempLeft = pos.left + 'px';
            this.tempTop = pos.top + 'px';
            this.left = this.tempLeft;
            this.top = this.tempTop;
        }
        else {
            this.isEventSource = false;
            this.tempLeft = '0';
            this.tempTop = '0';
        }
        setTimeout(function () {
            _this.visible = true;
            if (_this.size == 'lg') {
                _this.left = '10%';
                _this.top = '10%';
            }
            else if (_this.size == 'md') {
                _this.left = '20%';
                _this.top = '20%';
            }
            else if (_this.size == 'sm') {
                _this.left = '30%';
                _this.top = '30%';
            }
            else if (_this.size == 'xs') {
                _this.left = '37.5%';
                _this.top = '37.5%';
            }
            else {
                _this.left = '0';
                _this.top = '0';
            }
        });
        setTimeout(function () {
            _this.ready = true; //就绪
            _this.checkIsThumbOverflow(); //检查是否溢出
        }, this.transitionTime);
        {
            this.resizeHandler = function () {
                clearTimeout(_this.resizeCheckTimer);
                _this.resizeCheckTimer = setTimeout(function () {
                    _this.checkIsThumbOverflow();
                }, 300);
            };
            window.addEventListener('resize', this.resizeHandler);
        }
        {
            this.windowClickHandler = function () {
                if (_this.size) {
                    _this.close();
                }
            };
            setTimeout(function () {
                window.addEventListener('click', _this.windowClickHandler);
            });
        }
    };
    /**
     * 关闭
     */
    GalleryComponent.prototype.close = function () {
        var _this = this;
        this.visible = false;
        if (this.isEventSource) {
            this.left = this.tempLeft;
            this.top = this.tempTop;
        }
        this.ready = false;
        setTimeout(function () {
            _this.render = false;
        }, this.transitionTime);
        this.removeEvents();
    };
    /**
     * 全屏切换
     */
    GalleryComponent.prototype.toggleFullScreen = function () {
        this.isFullScreen = !this.isFullScreen;
    };
    /**
     * 点击空白处
     */
    GalleryComponent.prototype.whiteSpaceClickAction = function () {
        if (!this.size) {
            this.close();
        }
    };
    GalleryComponent.prototype.wrapClickAction = function (ev) {
        if (this.size) {
            ev.stopPropagation();
        }
    };
    /**
     * 上一张
     */
    GalleryComponent.prototype.prev = function () {
        if (this.activeIndex > 0) {
            this.activate(this.activeIndex - 1);
        }
    };
    /**
     * 下一张
     */
    GalleryComponent.prototype.next = function () {
        if (this.activeIndex < this.images.length - 1) {
            this.activate(this.activeIndex + 1);
        }
    };
    /**
     * 激活指定图片到当前窗口
     * @param index
     */
    GalleryComponent.prototype.activate = function (index) {
        this.activeIndex = index;
        this.change.emit(this.activeIndex);
    };
    /**
     * 获取鼠标位置
     * @param e
     * @returns {{left: number, top: number}}
     */
    GalleryComponent.prototype.getMousePosition = function (e) {
        var m_x = e.pageX || (e.clientX +
            (document.documentElement.scrollLeft
                || document.body.scrollLeft));
        var m_y = e.pageY || (e.clientY +
            (document.documentElement.scrollTop
                || document.body.scrollTop));
        return { left: m_x, top: m_y };
    };
    /**
     * 显示/隐藏工具
     * @param ev
     */
    GalleryComponent.prototype.toggleShowTools = function (ev) {
        ev.stopPropagation();
        this.isShowTools = !this.isShowTools;
    };
    return GalleryComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], GalleryComponent.prototype, "data", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], GalleryComponent.prototype, "dataProps", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], GalleryComponent.prototype, "size", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], GalleryComponent.prototype, "change", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], GalleryComponent.prototype, "title", void 0);
GalleryComponent = __decorate([
    core_1.Component({
        selector: 'gallery',
        templateUrl: './gallery.component.html',
        styleUrls: ['./gallery.component.less']
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], GalleryComponent);
exports.GalleryComponent = GalleryComponent;
//# sourceMappingURL=gallery.component.js.map