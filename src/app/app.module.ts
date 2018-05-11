import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AppComponent} from './app.component';
import {CriteriaModule} from './modules/criteria/criteria.module'
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { states } from './app.state';

import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CriteriaModule,
        NgxsModule.forRoot(states),
        NgxsFormPluginModule.forRoot(),
        NgxsLoggerPluginModule.forRoot({ logger: console, collapsed: false }),
        NgxsReduxDevtoolsPluginModule.forRoot({
            disabled: environment.production
        })
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
