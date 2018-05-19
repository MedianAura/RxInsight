import {Component, OnInit, ViewContainerRef} from '@angular/core';
// import data = require('../../packages.json');
import {ListCriteriaService} from "@services/list-criteria.service";
import {Criteria} from "@model/criteria";
import {ModalFactoryService} from "@services/modal-factory.service";
import {ElectronService} from "ngx-electron";
import {safeDump, safeLoad} from 'js-yaml';
import {each} from 'lodash';
import {FsService} from "@services/fs.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    version: string;
    saveFilePath: string;

    constructor(
        private listCriteria: ListCriteriaService,
        private modalFactory: ModalFactoryService,
        private viewContainerRef: ViewContainerRef,
        private electronService: ElectronService,
        private fsService: FsService
    ) {
        this.version = "FUCK YOU !!!";
        this.modalFactory.setRootViewContainerRef(viewContainerRef);
    }

    ngOnInit() {
        $(".navbar-collapse .dropdown").on("click", "a", (e) => e.preventDefault());
    }

    newFile() {
        this.saveFilePath = undefined;
        this.listCriteria.emptyCriteria();
    }

    openFile() {
        let remote = this.electronService.remote;
        let dialog = remote.dialog;
        let sFile = dialog.showOpenDialog(remote.getCurrentWindow(), {
            "properties": ['openFile', 'promptToCreate'], "filters": [
                {name: 'Fichier YAML', extensions: ['yaml']},
            ]
        });

        if (sFile.length > 0) {
            this.saveFilePath = sFile[0];
            this.__parseLoadedData(this.fsService.readFile(this.saveFilePath));
        }
    }

    saveFile(): boolean {
        if (typeof this.saveFilePath === "undefined") {
            return this.saveFileAs();
        }
        return this.saveCurrentFile();
    }

    saveFileAs(): boolean {
        let remote = this.electronService.remote;
        let dialog = remote.dialog;
        this.saveFilePath = dialog.showSaveDialog(remote.getCurrentWindow(), {
            "filters": [
                {name: 'Fichier YAML', extensions: ['yaml']},
            ]
        });

        return this.saveCurrentFile();
    }

    openImportDialog() {
        this.modalFactory.addDynamicComponent();
    }

    private saveCurrentFile(): boolean {
        this.listCriteria.getAllCriteria().subscribe((listCreteria: Criteria[]) => {
            this.fsService.saveFile(this.saveFilePath, safeDump(listCreteria));
        }).unsubscribe();
        return true;
    }

    private __parseLoadedData(sData) {
        let aListCriteria = [];
        let oData = safeLoad(sData);
        each(oData, function (item) {
            let oCriteria = new Criteria();
            oCriteria.given = item.given;
            oCriteria.when = item.when;
            oCriteria.then = item.then;
            aListCriteria.push(oCriteria);
        });

        this.listCriteria.emptyCriteria();
        this.listCriteria.importCriteria(aListCriteria);
    }
}
