import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {CriteriaComponent} from './criteria/criteria.component';
import {ListCriteriaComponent} from './list-criteria/list-criteria.component';
import {FormsModule} from "@angular/forms";
import { ImportCriteriaComponent } from './import-criteria/import-criteria.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [CriteriaComponent, ListCriteriaComponent, ImportCriteriaComponent],
    exports: [ListCriteriaComponent]
})
export class CriteriaModule {
}
