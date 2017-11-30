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
var thirth_nav_item_component_1 = require("../thirth-nav-item/thirth-nav-item.component");
var SubNavItemComponent = (function () {
    function SubNavItemComponent(elemRef, router, actRoute) {
        this.elemRef = elemRef;
        this.router = router;
        this.actRoute = actRoute;
        this.hasChild = false;
    }
    SubNavItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events
            .subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                var url = event.url.split(';')[0];
                //子导航收起
                // if(this.hasChild) {
                var li = _this.elemRef.nativeElement.querySelector('.sub-nav-item');
                var wouldActive = false;
                var thirthNavWrap = li ? li.querySelector('.thirth-nav-wrap') : null;
                var matchStr = 'link="' + url;
                // wouldActive=(li&&li.innerHTML.match(matchStr));
                wouldActive = _this.isActive();
                if (wouldActive) {
                    _this.addClass(li, 'active');
                    thirthNavWrap && _this.openWrap(thirthNavWrap);
                }
                else {
                    if (_this.isAsideFolded()) {
                        thirthNavWrap && _this.closeWrap(thirthNavWrap);
                        _this.removeClass(li, 'active');
                    }
                }
                //}
            }
        });
        this.elemRef.nativeElement.addEventListener('click', function (ev) {
            ev.stopPropagation();
            if (_this.hasChild) {
                var li = _this.elemRef.nativeElement.querySelector('.sub-nav-item');
                var linkElem = li.querySelector('a');
                if (linkElem.getAttribute('href') !== null) {
                    return;
                }
                var wouldActive = false;
                var thirthNavWrap = li ? li.querySelector('.thirth-nav-wrap') : null;
                wouldActive = (li && !_this.hasClass(li, 'active'));
                if (wouldActive) {
                    thirthNavWrap && _this.openWrap(thirthNavWrap);
                    _this.addClass(li, 'active');
                }
                else {
                    thirthNavWrap && _this.closeWrap(thirthNavWrap);
                    _this.removeClass(li, 'active');
                }
            }
        });
    };
    SubNavItemComponent.prototype.isActive = function () {
        var active = false;
        if (this.link) {
            active = this.router.isActive(this.link, false);
        }
        else {
            this.thirthNavItems.forEach(function (obj, index) {
                if (obj.isActive()) {
                    active = true;
                }
            });
        }
        return active;
    };
    SubNavItemComponent.prototype.openWrap = function (elem) {
        var org_h = elem.clientHeight, h = 0;
        var items = elem.querySelectorAll('.thirth-nav-item');
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            h += item.clientHeight;
        }
        if (elem.clientHeight < h) {
            elem.style.height = org_h + '';
            setTimeout(function () {
                elem.style.height = h + 'px';
                setTimeout(function () {
                    elem.style.height = null;
                }, 300);
            });
        }
    };
    SubNavItemComponent.prototype.closeWrap = function (elem) {
        elem.style.height = elem.clientHeight + 'px';
        setTimeout(function () {
            elem.style.height = '0';
            setTimeout(function () {
                elem.style.height = null;
            }, 300);
        });
    };
    SubNavItemComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.elemRef.nativeElement.querySelector('.thirth-nav-item')) {
                _this.hasChild = true;
                if (_this.elemRef.nativeElement.querySelector('.thirth-nav-item.active')) {
                    _this.addClass(_this.elemRef.nativeElement.querySelector('.sub-nav-item'), 'active');
                }
            }
        });
    };
    SubNavItemComponent.prototype.isAsideFolded = function () {
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
    /**
     * 元素是否包含某个类
     * @param elem
     * @param className
     * @returns {boolean}
     */
    SubNavItemComponent.prototype.hasClass = function (elem, className) {
        var classList = elem.className.split(/\s+/);
        return classList.indexOf(className) >= 0;
    };
    /**
     * 为元素添加一个类
     * @param elem
     * @param className
     */
    SubNavItemComponent.prototype.addClass = function (elem, className) {
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
    SubNavItemComponent.prototype.removeClass = function (elem, className) {
        var classList = elem.className.split(/\s+/);
        var clsIndex = classList.indexOf(className);
        if (clsIndex >= 0) {
            classList.splice(clsIndex, 1);
            elem.className = classList.join(' ');
        }
    };
    return SubNavItemComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SubNavItemComponent.prototype, "text", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SubNavItemComponent.prototype, "link", void 0);
__decorate([
    core_2.ContentChildren(thirth_nav_item_component_1.ThirthNavItemComponent),
    __metadata("design:type", Array)
], SubNavItemComponent.prototype, "thirthNavItems", void 0);
SubNavItemComponent = __decorate([
    core_1.Component({
        selector: 'sub-nav-item',
        templateUrl: './sub-nav-item.component.html',
        styleUrls: ['./sub-nav-item.component.less']
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        router_1.Router,
        router_1.ActivatedRoute])
], SubNavItemComponent);
exports.SubNavItemComponent = SubNavItemComponent;
//# sourceMappingURL=sub-nav-item.component.js.map