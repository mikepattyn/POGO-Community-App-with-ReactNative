import { injectable } from 'inversify';
import { Registration } from './Registration';

@injectable()
export class Settings {
    private _registration: Registration
    set registration(registration: Registration) { this._registration = registration };
    get registration() { return this._registration }
    constructor() {

    }
}


