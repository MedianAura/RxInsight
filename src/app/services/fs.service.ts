import {Injectable} from '@angular/core';
import {safeDump, safeLoad} from "js-yaml";
import {Criteria} from "@model/criteria";
import {ElectronService} from "ngx-electron";
import {ListCriteriaService} from "@services/list-criteria.service";
import {each} from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class FsService {

    private readonly jetpack = null;
    saveFilePath: string;

    constructor(private electronService: ElectronService, private listCriteria: ListCriteriaService) {
        if (this.electronService.isElectronApp) {
            if (window && window.require) {
                this.jetpack = window.require('fs-jetpack');
            }
        }
    }

    get isElectronApp(): boolean {
        return this.electronService.isElectronApp;
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
            this.loadFile(this.saveFilePath);
        }
    }

    loadFile(path: string) {
        this.parseLoadedData(this.__readFile(path));
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

    parseLoadedData(sData) {
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

    private saveCurrentFile(): boolean {
        this.listCriteria.getAllCriteria().subscribe((listCreteria: Criteria[]) => {
            this.__saveFile(this.saveFilePath, safeDump(listCreteria));
        }).unsubscribe();
        return true;
    }

    private __readFile(filepath: string): string {
        return this.jetpack.read(filepath);
    }

    private __saveFile(filepath: string, content: string): string {
        return this.jetpack.write(filepath, content);
    }
}
