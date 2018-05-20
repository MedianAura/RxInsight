import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgxElectronModule} from "ngx-electron";
import {DragulaModule} from "ng2-dragula";
import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {CriteriaModule} from './modules/criteria/criteria.module'
import {WorkspaceModule} from "./modules/workspace/workspace.module";
import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsFormPluginModule} from '@ngxs/form-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {states} from './app.state';
import {ImportCriteriaComponent} from "./modules/criteria/import-criteria/import-criteria.component";

import {routes} from './app.routes'
import {environment} from '../environments/environment';


@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        NgxElectronModule,
        DragulaModule,
        CriteriaModule,
        WorkspaceModule,
        RouterModule.forRoot(routes),
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
