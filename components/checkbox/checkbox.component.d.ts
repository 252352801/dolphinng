import { OnInit, ElementRef, EventEmitter } from '@angular/core';
export declare class CheckboxComponent implements OnInit {
    private elemRef;
    name: string;
    display: string;
    disabled: string;
    size: string;
    innerStyle: string;
    customBackground: string;
    styleClass: string;
    value: boolean;
    valueChange: EventEmitter<any>;
    constructor(elemRef: ElementRef);
    ngOnInit(): void;
    changeAction(ev: any): void;
}
