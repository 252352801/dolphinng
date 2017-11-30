import { OnInit, OnChanges, SimpleChanges, ElementRef, EventEmitter } from '@angular/core';
export declare class CurrencyFormatDirective implements OnInit, OnChanges {
    private elemRef;
    private separateLength;
    private accuracy;
    private format;
    private separator;
    constructor(elemRef: ElementRef);
    ngModel: any;
    currencyFormat: EventEmitter<any>;
    ngModelChange: EventEmitter<any>;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    transform(value: any): any;
}
