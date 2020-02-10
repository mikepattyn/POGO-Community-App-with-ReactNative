import { View, StyleSheet } from "react-native";
import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import scriptLoader from 'react-async-script-loader'

class MapsScreen extends Component<any> {
    private map: any
    private ifUpdatedByDev = false
    _mapView: MapView
    componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
        if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
            if (isScriptLoadSucceed) {
                this.initMap()
                this.ifUpdatedByDev = true;
                this.forceUpdate();
            }
            else this.props.onError()
        }
    }
    componentDidMount() {
        const { isScriptLoaded, isScriptLoadSucceed } = this.props
        if (isScriptLoaded && isScriptLoadSucceed) {
            this.initMap()
            this.ifUpdatedByDev = true;
            this.forceUpdate();
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.map}
            </View>
        );
    }
    initMap() {
        this.map = (
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                initialRegion={{
                    latitude: 50.950228,
                    longitude: 3.142707
                }}
                ref={(mapview) => { this._mapView = mapview; }}
            >
                <MapView.Marker coordinate={{
                    latitude: 50.950228,
                    longitude: 3.142707,
                    title: "Wees gegroet"
                }} />
            </MapView>
        )
    }
    componentDidUpdate() {
        if (this.ifUpdatedByDev) {
            this.ifUpdatedByDev = false;
            // this._mapView.animateToRegion({
            //     latitude: 50.950228,
            //     longtitude: 3.142707
            // }, 1000)
        }

    }
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: "100%",
        width: "100%",
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default scriptLoader(
    [
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyBGfwXcsfS0CqyTn6fsVCZQTK-wmwWRV0Q',
    ]
)(MapsScreen)