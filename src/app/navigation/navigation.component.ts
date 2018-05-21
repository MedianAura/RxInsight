import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ModalFactoryService} from "@services/modal-factory.service";
import {FsService} from "@services/fs.service";
import {ListCriteriaService} from "@services/list-criteria.service";

const {version: appVersion} = require('../../../package.json');

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.less']
})
export class NavigationComponent implements OnInit {
    constructor(
        private listCriteria: ListCriteriaService,
        private modalFactory: ModalFactoryService,
        private viewContainerRef: ViewContainerRef,
        private fsService: FsService,
    ) {
        this.modalFactory.setRootViewContainerRef(viewContainerRef);
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

    get version(): string {
        return appVersion;
    }

    get isElectron(): boolean {
        return this.fsService.isElectronApp;
    }
}
