import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from '@angular/common';
import {WorkspaceRoutingModule} from './workspace-routing.module';
import {WorkspaceListComponent} from './workspace-list/workspace-list.component';
import {WorkspaceMenuComponent} from './workspace-menu/workspace-menu.component';
import {WorkspaceFolderComponent} from './workspace-folder/workspace-folder.component';
import {WorkspaceFileComponent} from './workspace-file/workspace-file.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        WorkspaceRoutingModule
    ],
    declarations: [WorkspaceListComponent, WorkspaceMenuComponent, WorkspaceFolderComponent, WorkspaceFileComponent],
    exports: [WorkspaceMenuComponent]
})
export class WorkspaceModule {
}
