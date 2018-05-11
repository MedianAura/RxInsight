import {Component, ViewContainerRef} from '@angular/core';
import data from '../../package.json';
import {ListCriteriaService} from "@services/list-criteria.service";
import {Criteria} from "@model/criteria";
import {ModalFactoryService} from "@services/modal-factory.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    version: string;
    saveFilePath: string;

    constructor(private listCriteria: ListCriteriaService, private modalFactory: ModalFactoryService, private viewContainerRef: ViewContainerRef) {
        this.version = data.version;

        this.modalFactory.setRootViewContainerRef(viewContainerRef);
    }

    newFile() {
        this.saveFilePath = undefined;
        this.listCriteria.emptyCriteria();
    }

    openFile() {
        // TODO : Select a File to open and Set the saveFilePath
        let aListCriteria: Criteria[] = [];

        this.listCriteria.emptyCriteria();
        this.listCriteria.importCriteria(aListCriteria);
        this.saveFilePath = "";
    }

    saveFile(): boolean {
        if (typeof this.saveFilePath === "undefined") {
            return this.saveFileAs();
        }
        return this.saveCurrentFile();
    }

    saveFileAs(): boolean {
        // TODO : Select the File to Save Into

        return this.saveCurrentFile();
    }

    openImportDialog() {
        // TODO : Open a Component Dialog
        this.modalFactory.addDynamicComponent();
    }

    private saveCurrentFile(): boolean {
        // TODO : Create Save Logic
        return true;
    }
}
