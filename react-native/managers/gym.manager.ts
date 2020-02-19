import { IGymManager, GymView } from "./gym.manager.interface"
import { LatLng } from "react-native-maps";
import ApiClient from "../clients/apiClient";
import { isNull } from "util";

export default class GymManager implements IGymManager {
    static myInstance = null;
    static get instance() {
        if(isNull(GymManager.myInstance)) {
            this.myInstance = new GymManager()
        }
        return this.myInstance
    }
    async addGym(name: string, position: LatLng): Promise<void> {
        var locationResponse = await ApiClient.instance.post("/locations", { Latitude: position.latitude, Longtitude: position.longitude })
        console.log(locationResponse)
        if (locationResponse.status === 201) {
            console.log(`Sending gym: ${name} with location: ${position}`)
            var gymResponse = await ApiClient.instance.post("/gyms", { Name: name, LocationId: locationResponse.data.id })
            console.log(gymResponse.data);
        }
    }
    getGyms(): GymView[] {
        throw new Error("Method not implemented.");
    }
}

