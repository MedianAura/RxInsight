import {Component, OnInit} from '@angular/core';
import {WorkspaceService} from "@services/workspace.service";
import {Observable} from "rxjs/internal/Observable";
import {WorkspaceFolder} from "@model/workspace-folder";

@Component({
    selector: 'app-workspace-list',
    templateUrl: './workspace-list.component.html',
    styleUrls: ['./workspace-list.component.less']
})
export class WorkspaceListComponent implements OnInit {

    constructor(private workspaceService: WorkspaceService) {
    }

    ngOnInit() {
    }

    getWorkspaceFolder(): Observable<WorkspaceFolder> {
        return this.workspaceService.getStoreFolder();
    }

    createDirectory() {
        this.workspaceService.createWorkspaceFolder();
    }

    createFile() {
        this.workspaceService.createWorkspaceFile();
    }
}
