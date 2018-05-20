import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WorkspaceListComponent} from "./workspace-list/workspace-list.component";

const routes: Routes = [
    {path: 'workspace', component: WorkspaceListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
