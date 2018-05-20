import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {WorkspaceFile} from "@model/workspace-file";
import {WorkspaceService} from "@services/workspace.service";

@Component({
    selector: '[app-workspace-file]',
    templateUrl: './workspace-file.component.html',
    styleUrls: ['./workspace-file.component.less']
})
export class WorkspaceFileComponent implements OnInit, AfterViewInit {

    @ViewChild('createElement') createElementInput: ElementRef;
    @Input() file: WorkspaceFile;
    elementFileName: string;

    constructor(private workspaceService: WorkspaceService) {
        this.elementFileName = "";
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        if (typeof this.createElementInput !== "undefined") {
            this.createElementInput.nativeElement.focus();
        }
    }

    createFileElement() {
        if (this.elementFileName.trim() === "") {
            this.workspaceService.deleteWorkspaceFile(this.file);
            return;
        }

        this.workspaceService.createFileOnDisk(this.elementFileName + ".yaml", this.file);
    }
}
