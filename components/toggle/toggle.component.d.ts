import { OnInit, ElementRef, EventEmitter } from '@angular/core';
export declare class ToggleComponent implements OnInit {
    private elemRef;
    name: string;
    display: string;
    disabled: string;
    size: string;
    value: any;
    valueChange: EventEmitter<any>;
    type: string;
    styleClass: string;
    auto: boolean;
    action: EventEmitter<any>;
    constructor(elemRef: ElementRef);
    ngOnInit(): void;
    toggleCheck(ev: any): void;
    toggle(ev: any): void;
}
