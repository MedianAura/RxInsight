import {Injectable} from '@angular/core';
import {ElectronService} from "ngx-electron";
import {BehaviorSubject, Observable} from "rxjs";
import {safeDump} from "js-yaml";
import {remove} from "lodash";
import {WorkspaceFolder} from "@model/workspace-folder";
import {WorkspaceFile} from "@model/workspace-file";
import ElectronStore = require('electron-store');
import {FsService} from "@services/fs.service";
import {Criteria} from "@model/criteria";

@Injectable({
    providedIn: 'root'
})
export class WorkspaceService {

    private selectedPath: WorkspaceFolder;
    private readonly jetpack = null;
    private readonly path = null;
    private readonly store: ElectronStore;
    private readonly _storeName: BehaviorSubject<string>;
    private readonly _storeLeaf: BehaviorSubject<string>;
    private readonly _storeFolder: BehaviorSubject<WorkspaceFolder>;

    constructor(private electronService: ElectronService, private fsService: FsService) {
        this._storeName = new BehaviorSubject<string>(null);
        this._storeLeaf = new BehaviorSubject<string>(null);
        this._storeFolder = new BehaviorSubject<WorkspaceFolder>(new WorkspaceFolder("root", "."));
        this.selectedPath = this._storeFolder.getValue();

        if (this.electronService.isElectronApp) {
            if (window && window.require) {
                this.jetpack = window.require('fs-jetpack');
                this.path = window.require('path');

                const Store = window.require('electron-store');
                this.store = new Store({
                    "cwd": "insight"
                });
            }

            this._storeName.next(this.store.get("workspace"));
            this.setStoreLeaf();
            this.manageWorkspace();
        }
    }

    get storeName(): string {
        return this._storeName.getValue();
    }

    getStoreName(): Observable<string> {
        return this._storeName;
    }

    get storeLeaf(): string {
        return this._storeLeaf.getValue();
    }

    getStoreLeaf(): Observable<string> {
        return this._storeLeaf;
    }

    setStoreLeaf() {
        let leaf: string = this.store.get("leaf", null);
        this._storeLeaf.next(leaf);
        if (null === leaf) {
            this.fsService.newFile();
        } else {
            this.fsService.loadFile(this.path.resolve(this.storeName, this.storeLeaf));
        }
    }

    getStoreFolder(): Observable<WorkspaceFolder> {
        return this._storeFolder;
    }

    newWorkspace() {
        let remote: Electron.Remote = this.electronService.remote;
        let dialog: Electron.Dialog = remote.dialog;

        let sFile = dialog.showOpenDialog(remote.getCurrentWindow(), {
            "defaultPath": remote.app.getPath("documents"),
            "properties": ['openDirectory', 'promptToCreate']
        });

        if (typeof sFile !== "undefined" && sFile.length > 0) {
            this.store.set("workspace", sFile[0]);
            this.store.set("leaf", null);

            this._storeName.next(this.store.get("workspace"));
            this._storeLeaf.next(this.store.get("leaf", null));
            this.manageWorkspace();
        }
    }

    openWorkspace() {
        let remote: Electron.Remote = this.electronService.remote;
        let dialog: Electron.Dialog = remote.dialog;

        let sFile = dialog.showOpenDialog(remote.getCurrentWindow(), {
            "defaultPath": remote.app.getPath("documents"),
            "properties": ['openDirectory']
        });

        if (typeof sFile !== "undefined" && sFile.length > 0) {
            this.store.set("workspace", sFile[0]);
            this.store.set("leaf", null);

            this._storeName.next(this.store.get("workspace"));
            this._storeLeaf.next(this.store.get("leaf", null));
            this.manageWorkspace();
        }
    }

    updateLeafContent(value: Observable<Criteria[]>) {
        if (null === this.storeLeaf) return;
        console.log(value);
    }

    setSelectedPath(selectedPath: WorkspaceFolder) {
        this.selectedPath.selected = false;
        if (null === selectedPath) {
            this.selectedPath = this._storeFolder.getValue();
        } else {
            selectedPath.selected = true;
            this.selectedPath = selectedPath;
        }
    }

    setSelectedFile(selectedPath: WorkspaceFile) {
        if (null === selectedPath) {
            this._storeLeaf.next(null);
            this.store.set("leaf", null);
        } else {
            this._storeLeaf.next(selectedPath.relativePath);
            this.store.set("leaf", selectedPath.relativePath);
        }

        this.setStoreLeaf();
    }

    createWorkspaceFile() {
        let oFile = new WorkspaceFile();
        oFile.relativePath = this.selectedPath.relativePath;
        this.selectedPath.addFile(oFile);
    }

    createFileOnDisk(name: string, file: WorkspaceFile) {
        file.name = name;
        file.relativePath += "/" + name;
        file.isDefined();

        const jetpackInsight = this.jetpack.cwd(this.storeName);
        jetpackInsight.write(file.relativePath, safeDump(null));
    }

    deleteWorkspaceFile(file: WorkspaceFile) {
        remove(this.selectedPath.files, function (n) {
            return n === file;
        });
    }

    createWorkspaceFolder() {
        let oFolder = new WorkspaceFolder();
        oFolder.relativePath = this.selectedPath.relativePath;
        oFolder.level = this.selectedPath.level + 1;
        this.selectedPath.addFolder(oFolder);
    }

    createFolderOnDisk(name: string, folder: WorkspaceFolder) {
        folder.name = name;
        folder.relativePath += "/" + name;
        folder.isDefined();

        const jetpackInsight = this.jetpack.cwd(this.storeName);
        jetpackInsight.dir(folder.relativePath);
    }

    deleteWorkspaceFolder(folder: WorkspaceFolder) {
        remove(this.selectedPath.folders, function (n) {
            return n === folder;
        });
    }

    private manageWorkspace() {
        // Créer le dossier pour le workspace s'il n'existe pas.
        if (!this.jetpack.exists(this.storeName)) {
            this.jetpack.dir(this.storeName);
        }

        const jetpackInsight = this.jetpack.cwd(this.storeName);

        // Transformer le dossier en workspace
        if (!jetpackInsight.exists(".insight")) {
            let remote: Electron.Remote = this.electronService.remote;
            let dialog: Electron.Dialog = remote.dialog;

            let resultId = dialog.showMessageBox({
                "type": "info",
                "title": "Initialisation de l'espace de travail",
                "message": "Le dossier choisit n'est pas un espace de travail pour Insight désirer vous le convertir ?",
                "buttons": ["Oui", "Non"],
                "cancelId": 1
            });

            if (resultId === 1) {
                return false;
            }

            jetpackInsight.write(".insight", JSON.stringify(null));
        }

        this.scanWorkspace();
    }

    private scanWorkspace() {
        const jetpackInsight = this.jetpack.cwd(this.storeName);
        let aWorkspaceTree = jetpackInsight.inspectTree("", {
            relativePath: true
        });

        let oFolder: WorkspaceFolder = this._storeFolder.getValue();
        oFolder.name = aWorkspaceTree.name;
        oFolder.level = 0;
        this.buildWorkspace(aWorkspaceTree.children, oFolder, 0);
        this._storeFolder.next(oFolder);
    }

    private buildWorkspace(element: ElementInterface[], parent: WorkspaceFolder, level: number) {
        const self = this;
        element.forEach(function (e: ElementInterface) {
            if (e.type === "file" && e.name !== ".insight") {
                parent.addFile(new WorkspaceFile(e.name, e.relativePath));
                return;
            }

            if (e.type === "dir") {
                let oFolder = new WorkspaceFolder(e.name, e.relativePath);
                oFolder.level = ++level;
                self.buildWorkspace(e.children, oFolder, level);
                parent.addFolder(oFolder);
                return;
            }
        });
    }
}

interface ElementInterface {
    name: string;
    relativePath: string;
    size: number;
    type: string;
    children?: ElementInterface[];
}