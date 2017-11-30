import { ElementRef, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SubNavItemComponent } from '../sub-nav-item/sub-nav-item.component';
import { ThirthNavItemComponent } from '../thirth-nav-item/thirth-nav-item.component';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
export declare class NavItemComponent implements OnInit, AfterViewInit, AfterViewChecked {
    private elemRef;
    private router;
    private actRoute;
    private rootElem;
    haveChild: boolean;
    private childrenActive;
    icon: string;
    text: string;
    link: any;
    badgeClass: string;
    badgeValue: any;
    subWrap: ElementRef;
    root: ElementRef;
    subNavItems: SubNavItemComponent[];
    thirthNavItems: ThirthNavItemComponent[];
    constructor(elemRef: ElementRef, router: Router, actRoute: ActivatedRoute);
    /**
     * 获取dom相对浏览器的位置
     * @param obj
     * @returns {{left: number, top: number}}
     */
    getPosition(obj: any): {
        left: number;
        top: number;
    };
    activeNavItem(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    private openSubNav(subNavElem);
    private closeSubNav(subNavElem);
    private getSubNavHeight(subNavElem);
    hasActiveChildren(): boolean;
    isAsideFolded(): boolean;
    isActive(): boolean;
    checkChild(): void;
    /**
     * 元素是否包含某个类
     * @param elem
     * @param className
     * @returns {boolean}
     */
    private hasClass(elem, className);
    /**
     * 为元素添加一个类
     * @param elem
     * @param className
     */
    private addClass(elem, className);
    /**
     * 删除某个类
     * @param elem
     * @param className
     */
    private removeClass(elem, className);
}
