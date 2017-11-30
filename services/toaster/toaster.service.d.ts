export interface ToasterOptions {
    type?: string;
    title?: string;
    message: string;
    delay?: number;
    animated?: boolean;
}
export declare class Toaster {
    private container;
    private toasters;
    constructor();
    /**
     * 弹出
     * @param options
       */
    pop(options: ToasterOptions): void;
    private delayCloseTimer(toast, delay);
    info(title: string, message: string): void;
    success(title: string, message: string): void;
    wait(title: string, message: string): void;
    warning(title: string, message: string): void;
    error(title: string, message: string): void;
}
