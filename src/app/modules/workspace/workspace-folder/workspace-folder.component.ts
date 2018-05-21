import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {WorkspaceFolder} from "@model/workspace-folder";
import {WorkspaceService} from "@services/workspace.service";
import * as JQuery from 'jquery';

@Component({
    selector: 'app-workspace-folder',
    templateUrl: './workspace-folder.component.html',
    styleUrls: ['./workspace-folder.component.less']
})
export class WorkspaceFolderComponent implements OnInit, AfterViewInit {

    @ViewChild('createElement') createElementInput: ElementRef;
    @ViewChild('workspaceFolderRef') workspaceElement: ElementRef;
    @Input() folder: WorkspaceFolder;
    @Output() onCreate = new EventEmitter<boolean>();
    isChildrenHidden: boolean;
    elementFolderName: string;

    constructor(private workspaceService: WorkspaceService) {
        this.isChildrenHidden = true;
        this.elementFolderName = "";
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        if (typeof this.createElementInput !== "undefined") {
            this.createElementInput.nativeElement.focus();
        }

        if (this.folder.isNew) {
            this.onCreate.emit(true);
        }
    }

    showChildElement() {
        this.showChildrenElement($(this.workspaceElement.nativeElement).find("> li"));
    }

    createFolderElement() {
        if (this.elementFolderName.trim() === "") {
            this.workspaceService.deleteWorkspaceFolder(this.folder);
            return;
        }

        this.workspaceService.createFolderOnDisk(this.elementFolderName, this.folder);
    }

    selectFolder() {
        if (this.folder.selected) {
            this.workspaceService.setSelectedPath(null);
            this.hideChildrenElement($(this.workspaceElement.nativeElement).find("> li"));
            return;
        }

        this.workspaceService.setSelectedPath(this.folder);
        this.showChildrenElement($(this.workspaceElement.nativeElement).find("> li"));
    }

    toggleChildren(event) {
        event.stopPropagation();
        event.preventDefault();

        if (this.isChildrenHidden) {
            this.showChildrenElement($(event.target));
        } else {
            this.hideChildrenElement($(event.target));
        }
    }

    private showChildrenElement($element) {
        this.isChildrenHidden = false;
        let $this: JQuery = $element.closest("li").find("span");
        $this.removeClass("glyphicon-folder-close").addClass("glyphicon-folder-open");
        $this.closest("ul").find("> .child-element").each(function () {
            if (!$(this).is(":visible")) {
                $(this).removeClass("hide");
                $(this).show(50);
            }
        });
    }

    private hideChildrenElement($element) {
        this.isChildrenHidden = true;
        let $this: JQuery = $element.closest("li").find("span");
        $this.removeClass("glyphicon-folder-open").addClass("glyphicon-folder-close");
        $this.closest("ul").find("> .child-element").each(function () {
            if ($(this).is(":visible")) {
                $(this).hide(50);
            }
        });
    }
}
