import React from "react"
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

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

export const MapComponent = withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={12}
        defaultCenter={{
            lat: 50.950228,
            lng: 3.142707
        }}
    >
        {info.map((obj, key) => <Marker key={key} title={obj.title} position={{ lat: obj.lat, lng: obj.lng }} icon={{ url: require('./../maps/images/gymlogo.png'), scaledSize: new google.maps.Size(22, 24) }} />)}
    </GoogleMap>
)
