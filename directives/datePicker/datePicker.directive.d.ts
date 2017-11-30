import { OnInit, ElementRef, EventEmitter, OnChanges } from '@angular/core';
import './laydate/laydate.js';
export declare class DatePickerDirective implements OnInit, OnChanges {
    private elemRef;
    value: string;
    ngModelChange: EventEmitter<any>;
    event: string;
    format: string;
    isPickTime: boolean;
    isShowFestival: boolean;
    min: string;
    max: string;
    start: string;
    end: string;
    isFixed: boolean;
    zIndex: number;
    range: boolean | string;
    complete: EventEmitter<any>;
    private ref;
    constructor(elemRef: ElementRef);
    private getOptions();
    ngOnInit(): void;
    ngOnChanges(): void;
}
