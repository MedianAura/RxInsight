import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ModalFactoryService} from "@services/modal-factory.service";
import {FsService} from "@services/fs.service";
import {ListCriteriaService} from "@services/list-criteria.service";
import {WorkspaceService} from "@services/workspace.service";
import {Observable} from "rxjs";

const {version: appVersion} = require('../../../package.json');

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.less']
})
export class NavigationComponent implements OnInit {
    private version: string;
    private saveFilePath: string;
    private isElectron: boolean;
    private workspaceName: Observable<string>;
    private workspaceLeaf: Observable<string>;

    constructor(
        private listCriteria: ListCriteriaService,
        private modalFactory: ModalFactoryService,
        private viewContainerRef: ViewContainerRef,
        private fsService: FsService,
        private workspaceService: WorkspaceService
    ) {
        this.version = appVersion;
        this.modalFactory.setRootViewContainerRef(viewContainerRef);
        this.isElectron = this.fsService.isElectronApp;
        this.workspaceName = this.workspaceService.getStoreName();
        this.workspaceLeaf = this.workspaceService.getStoreLeaf();
    }

    ngOnInit() {
        $(".navbar-collapse .dropdown").on("click", "a", (e) => e.preventDefault());
    }

    newFile() {
        this.fsService.newFile();
    }

    openFile() {
        this.fsService.openFile();
    }

    saveFile(): boolean {
        return this.fsService.saveFile();
    }

    saveFileAs(): boolean {
        return this.fsService.saveFileAs();
    }

    openImportDialog() {
        this.modalFactory.addDynamicComponent();
    }
}
