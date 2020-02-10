import { SettingsInterface } from "./settings/SettingsInterface";
import { IRegistrationSettings } from "./settings/IRegistrationSettings";
export class Registration extends SettingsInterface {
    private _settings: IRegistrationSettings;
    set settings(settings: IRegistrationSettings) {
        this._settings = settings;
    }
    get settings() {
        return this._settings;
    }
    async save() {
        this.storeData("RegistrationSettings", JSON.stringify(this._settings));
    }
}