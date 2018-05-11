import {NgModule} from '@angular/core';
import {RawHtmlPipe} from "./pipes/raw-html.pipe";

@NgModule({
    declarations: [RawHtmlPipe],
    exports: [RawHtmlPipe]
})
export class SharedModule {
}
