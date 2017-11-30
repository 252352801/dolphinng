import { OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ThirthNavItemComponent } from '../thirth-nav-item/thirth-nav-item.component';
export declare class SubNavItemComponent implements OnInit, AfterViewInit {
    private elemRef;
    private router;
    private actRoute;
    text: string;
    link: string;
    hasChild: boolean;
    routeLink: string;
    thirthNavItems: ThirthNavItemComponent[];
    constructor(elemRef: ElementRef, router: Router, actRoute: ActivatedRoute);
    ngOnInit(): void;
    isActive(): boolean;
    private openWrap(elem);
    private closeWrap(elem);
    ngAfterViewInit(): void;
    isAsideFolded(): boolean;
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
