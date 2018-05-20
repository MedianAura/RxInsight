import {WorkspaceFile} from "@model/workspace-file";

export class WorkspaceFolder {
    private _name: string;
    private _relativePath: string;
    private _files: WorkspaceFile[];
    private _folders: WorkspaceFolder[];
    private _level: number;
    private _selected: boolean;
    private _isNew: boolean;

    constructor(name?: string, relativePath?: string) {
        this._isNew = true;
        this._files = [];
        this._folders = [];
        this._selected = false;

        if (arguments.length >= 2) {
            this._name = name;
            this._relativePath = relativePath;
            this._isNew = false;
        }
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get files(): WorkspaceFile[] {
        return this._files;
    }

    addFile(file: WorkspaceFile) {
        this._files.push(file);
    }

    get folders(): WorkspaceFolder[] {
        return this._folders;
    }

    addFolder(folder: WorkspaceFolder) {
        this._folders.push(folder);
    }

    get level(): number {
        return this._level;
    }

    set level(value: number) {
        this._level = value;
    }


    get relativePath(): string {
        return this._relativePath;
    }

    set relativePath(value: string) {
        this._relativePath = value;
    }

    get selected(): boolean {
        return this._selected;
    }

    set selected(value: boolean) {
        this._selected = value;
    }

    get isNew(): boolean {
        return this._isNew;
    }

    isDefined() {
        this._isNew = false;
    }
}
