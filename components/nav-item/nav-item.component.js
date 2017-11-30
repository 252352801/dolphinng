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
var router_1 = require("@angular/router");
var core_2 = require("@angular/core");
var sub_nav_item_component_1 = require("../sub-nav-item/sub-nav-item.component");
var thirth_nav_item_component_1 = require("../thirth-nav-item/thirth-nav-item.component");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/map");
require("rxjs/add/operator/mergeMap");
//declare var $:any;  //定义jquery
var NavItemComponent = (function () {
    function NavItemComponent(elemRef, router, actRoute) {
        this.elemRef = elemRef;
        this.router = router;
        this.actRoute = actRoute;
        this.haveChild = false;
        this.childrenActive = false;
    }
    /**
     * 获取dom相对浏览器的位置
     * @param obj
     * @returns {{left: number, top: number}}
     */
    NavItemComponent.prototype.getPosition = function (obj) {
        var topValue = 0, leftValue = 0;
        while (obj) {
            leftValue += obj.offsetLeft;
            topValue += obj.offsetTop;
            obj = obj.offsetParent;
        }
        return { left: leftValue, top: topValue };
    };
    NavItemComponent.prototype.activeNavItem = function () {
        this.addClass(this.rootElem, 'active');
    };
    NavItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.rootElem = this.root.nativeElement;
        this.router.events
            .subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                var url = event.url.split(';')[0];
                //子导航收起
                var subNavWrap = _this.subWrap.nativeElement;
                var wouldActive = _this.isActive();
                if (wouldActive) {
                    _this.openSubNav(subNavWrap);
                    (!_this.link) && _this.addClass(_this.rootElem, 'active');
                }
                else {
                    _this.closeSubNav(subNavWrap);
                    (!_this.link) && _this.removeClass(_this.rootElem, 'active');
                }
            }
        });
        this.rootElem.addEventListener('click', function (ev) {
            var isAsideFolded = _this.isAsideFolded();
            var linkElem = _this.rootElem.querySelector('a');
            if (linkElem.getAttribute('href') !== null) {
                return;
            }
            var subWrap = _this.subWrap.nativeElement;
            var wouldActive = (subWrap.clientHeight > 0 ? false : true);
            if (!isAsideFolded) {
                if (wouldActive) {
                    _this.addClass(_this.rootElem, 'active');
                    _this.openSubNav(subWrap);
                }
                else {
                    _this.removeClass(_this.rootElem, 'active');
                    _this.closeSubNav(subWrap);
                }
            }
        });
        this.rootElem.addEventListener('mouseenter', function (ev) {
            var target = _this.rootElem;
            if (!_this.isAsideFolded()) {
                return;
            }
            if (!_this.hasClass(target, 'nav-item-hover')) {
                _this.addClass(target, 'nav-item-hover');
            }
            else {
                return;
            }
            var pos = _this.getPosition(target), wrapPos;
            var navWrap = document.querySelector('.navi-wrap');
            if (navWrap) {
                wrapPos = _this.getPosition(navWrap);
            }
            var subNavWrap = target.querySelector('.nav.nav-sub');
            var w = target.offsetWidth;
            var h = target.offsetHeight;
            var win_h = document.body.clientHeight;
            if (subNavWrap) {
                var subWrapHeight = subNavWrap.offsetHeight;
                var top_1 = pos.top;
                subNavWrap.style.left = pos.left + w + 'px';
                if (win_h - pos.top < subWrapHeight) {
                    if (win_h - pos.top + h < subWrapHeight) {
                        top_1 = wrapPos.top || 0; //50是头部高度
                    }
                    else {
                        top_1 = pos.top - subWrapHeight + h;
                    }
                }
                subNavWrap.style.top = top_1 + 'px';
                subNavWrap.style.maxHeight = win_h - wrapPos.top + 'px';
            }
            target = null;
        });
        this.rootElem.addEventListener('mouseleave', function (ev) {
            if (!_this.isAsideFolded()) {
                return;
            }
            var classList = _this.rootElem.className.split(/\s+/);
            if (classList.indexOf('nav-item-hover') >= 0) {
                _this.removeClass(_this.rootElem, 'nav-item-hover');
            }
            var subNavWrap = _this.rootElem.querySelector('.nav.nav-sub');
            if (subNavWrap) {
                subNavWrap.style.maxHeight = 'inherit';
            }
        });
    };
    NavItemComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        //  this.checkChild();
        setTimeout(function () {
            _this.checkChild();
            if (_this.hasActiveChildren()) {
                _this.childrenActive = true;
                _this.addClass(_this.rootElem, 'active');
                _this.openSubNav(_this.rootElem.querySelector('.nav-sub'));
            }
        });
    };
    NavItemComponent.prototype.ngAfterViewChecked = function () {
    };
    NavItemComponent.prototype.openSubNav = function (subNavElem) {
        var _this = this;
        if (subNavElem) {
            if (this.isAsideFolded()) {
                subNavElem.style.height = 'auto';
            }
            else if (subNavElem.clientHeight <= 0) {
                setTimeout(function () {
                    var height = _this.getSubNavHeight(subNavElem);
                    subNavElem.style.height = height + 'px';
                    setTimeout(function () {
                        if (_this.hasClass(_this.rootElem, 'active')) {
                            subNavElem.style.height = 'auto';
                        }
                        else {
                            subNavElem.style.height = '0';
                        }
                    }, 300);
                });
            }
        }
    };
    NavItemComponent.prototype.closeSubNav = function (subNavElem) {
        if (subNavElem.clientHeight > 0) {
            var height = this.getSubNavHeight(subNavElem);
            subNavElem.style.height = height + 'px';
            setTimeout(function () {
                subNavElem.style.height = '0';
            });
        }
    };
    NavItemComponent.prototype.getSubNavHeight = function (subNavElem) {
        var height = 0;
        if (subNavElem) {
            var children = subNavElem.querySelectorAll('sub-nav-item>li');
            if (children) {
                for (var i = 0, len = children.length; i < len; i++) {
                    height += children[i].clientHeight;
                }
            }
        }
        return height;
    };
    NavItemComponent.prototype.hasActiveChildren = function () {
        var activeChildren = this.rootElem.querySelector('sub-nav-item li.active');
        return activeChildren !== null;
    };
    NavItemComponent.prototype.isAsideFolded = function () {
        var foldedElem = document.querySelector('.app.app-aside-folded');
        var isAsideFolded = foldedElem ? true : false;
        if (!isAsideFolded) {
            return false;
        }
        var classList = foldedElem.className.split(/\s+/);
        if (classList.indexOf('off-screen') >= 0) {
            var clientWidth = document.body.clientWidth;
            if (clientWidth < 768) {
                return false;
            }
        }
        return true;
    };
    NavItemComponent.prototype.isActive = function () {
        var active = false;
        if (this.link) {
            active = this.router.isActive(this.link, false);
        }
        else {
            this.subNavItems.forEach(function (obj, index) {
                if (obj.isActive()) {
                    active = true;
                }
            });
        }
        return active;
    };
    NavItemComponent.prototype.checkChild = function () {
        var child = this.elemRef.nativeElement.querySelector('sub-nav-item');
        if (child) {
            this.haveChild = true;
        }
    };
    /**
     * 元素是否包含某个类
     * @param elem
     * @param className
     * @returns {boolean}
     */
    NavItemComponent.prototype.hasClass = function (elem, className) {
        var classList = elem.className.split(/\s+/);
        return classList.indexOf(className) >= 0;
    };
    /**
     * 为元素添加一个类
     * @param elem
     * @param className
     */
    NavItemComponent.prototype.addClass = function (elem, className) {
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
    NavItemComponent.prototype.removeClass = function (elem, className) {
        var classList = elem.className.split(/\s+/);
        var clsIndex = classList.indexOf(className);
        if (clsIndex >= 0) {
            classList.splice(clsIndex, 1);
            elem.className = classList.join(' ');
        }
    };
    return NavItemComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NavItemComponent.prototype, "icon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NavItemComponent.prototype, "text", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NavItemComponent.prototype, "link", void 0);
__decorate([
    core_1.Input('badge-class'),
    __metadata("design:type", String)
], NavItemComponent.prototype, "badgeClass", void 0);
__decorate([
    core_1.Input('badge-value'),
    __metadata("design:type", Object)
], NavItemComponent.prototype, "badgeValue", void 0);
__decorate([
    core_2.ViewChild('subWrap'),
    __metadata("design:type", core_1.ElementRef)
], NavItemComponent.prototype, "subWrap", void 0);
__decorate([
    core_2.ViewChild('root'),
    __metadata("design:type", core_1.ElementRef)
], NavItemComponent.prototype, "root", void 0);
__decorate([
    core_2.ContentChildren(sub_nav_item_component_1.SubNavItemComponent),
    __metadata("design:type", Array)
], NavItemComponent.prototype, "subNavItems", void 0);
__decorate([
    core_2.ContentChildren(thirth_nav_item_component_1.ThirthNavItemComponent),
    __metadata("design:type", Array)
], NavItemComponent.prototype, "thirthNavItems", void 0);
NavItemComponent = __decorate([
    core_1.Component({
        selector: 'nav-item',
        templateUrl: './nav-item.component.html',
        styleUrls: ['./nav-item.component.less']
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        router_1.Router,
        router_1.ActivatedRoute])
], NavItemComponent);
exports.NavItemComponent = NavItemComponent;
//# sourceMappingURL=nav-item.component.js.map