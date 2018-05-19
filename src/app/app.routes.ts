import {Routes} from '@angular/router';
import {ListCriteriaComponent} from "./modules/criteria/list-criteria/list-criteria.component";

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: '/home'},
    {path: 'home', component: ListCriteriaComponent}
];