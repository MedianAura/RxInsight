import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgxElectronModule} from "ngx-electron";
import {AppComponent} from './app.component';
import {CriteriaModule} from './modules/criteria/criteria.module'
import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsFormPluginModule} from '@ngxs/form-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {states} from './app.state';
import {ImportCriteriaComponent} from "./modules/criteria/import-criteria/import-criteria.component";

import {environment} from '../environments/environment';
import {DragulaModule} from "ng2-dragula";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        NgxElectronModule,
        DragulaModule,
        CriteriaModule,
        NgxsModule.forRoot(states),
        NgxsFormPluginModule.forRoot(),
        NgxsLoggerPluginModule.forRoot({logger: console, collapsed: false}),
        NgxsReduxDevtoolsPluginModule.forRoot({
            disabled: environment.production
        })
    ],
    bootstrap: [AppComponent],
    entryComponents: [ImportCriteriaComponent]
})
export class AppModule {
    constructor() {
    }
}
