import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[app-dialog]'
})
export class DialogDirective {

    constructor(public viewContainerRef: ViewContainerRef) {
    }

}
