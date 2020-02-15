import React, { Component } from "react"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { View, Image } from "react-native";

const info = [
    {
        title: "Beeldende kunst",
        lat: 50.944789,
        lng: 3.122440
    },
    {
        title: "Wees gegroet",
        lat: 50.950228,
        lng: 3.142707
    },
    {
        title: "Jules Plastique",
        lat: 50.944631,
        lng: 3.1218782
    }
]

export class MapComponent extends Component<any> {
    render() {
        return (
            <MapView
            style={{ flex: 1, height: "100%", width: "100%" }}
            provider={PROVIDER_GOOGLE} // when you didnt add this line, you get apple maps
            initialRegion={this.props.initialRegion}
            onRegionChange={(region) => console.log(`Region: ${region}`)}
            onUserLocationChange={(location) => this.props.onUserLocationChange(location)}
            showsUserLocation={true}
        >
            {info.map((obj, key) => <Marker key={key} title={obj.title} coordinate={{ latitude: obj.lat, longitude: obj.lng }}>
                <View>
                    <Image source={require('./../maps/images/gymlogo.png')} style={{height: 22, width: 24}} resizeMode="contain"/>
                </View>
            </Marker>)}
    
        </MapView>
        )
    }
}
