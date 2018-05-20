export class WorkspaceFile {
    private _name: string;
    private _relativePath: string;
    private _isNew: boolean;

    constructor(name?: string, relativePath?: string) {
        this._isNew = true;

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

    get relativePath(): string {
        return this._relativePath;
    }

    set relativePath(value: string) {
        this._relativePath = value;
    }

    get isNew(): boolean {
        return this._isNew;
    }

    isDefined() {
        this._isNew = false;
    }
}
