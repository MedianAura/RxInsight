import {Component, OnInit} from '@angular/core';
import {WorkspaceService} from "@services/workspace.service";

@Component({
    selector: '[app-workspace-menu]',
    templateUrl: './workspace-menu.component.html',
    styleUrls: ['./workspace-menu.component.less']
})
export class WorkspaceMenuComponent implements OnInit {

    constructor(private workspaceService: WorkspaceService) {
    }

    ngOnInit() {
    }

    newWorkspace() {
        this.workspaceService.newWorkspace();
    }

    openWorkspace() {
        this.workspaceService.openWorkspace();
    }
}
