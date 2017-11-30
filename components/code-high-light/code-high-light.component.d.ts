import { OnInit, ElementRef, AfterContentInit } from '@angular/core';
import './prism/prism.js';
export declare class CodeHighLightComponent implements OnInit, AfterContentInit {
    private elemRef;
    language: string;
    codeSrc: string;
    codeElemRef: ElementRef;
    constructor(elemRef: ElementRef);
    ngOnInit(): void;
    ngAfterContentInit(): void;
}
