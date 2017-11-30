import { PipeTransform } from '@angular/core';
export declare class DatePipe implements PipeTransform {
    private createDate(dateStr);
    transform(value: any, fmt: string): any;
}
