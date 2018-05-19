import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FsService {

    private readonly jetpack = null;

    constructor() {
        if (this.isElectronApp) {
            if (window && window.require) {
                this.jetpack = window.require('fs-jetpack');
            }
        }
    }

    public get isElectronApp(): boolean {
        return !!window.navigator.userAgent.match(/Electron/);
    }

    readFile(filepath: string): string {
        return this.jetpack.read(filepath);
    }

    saveFile(filepath: string, content: string): string {
        return this.jetpack.write(filepath, content);
    }
}
