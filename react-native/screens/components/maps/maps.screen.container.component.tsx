import React, { Component } from "react";
import { MapComponent } from "./maps.component";
import { isNullOrUndefined } from "util";
import { View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"

export class MapsScreenContainer<P, S> extends Component<any, any> {
    /**
     *
     */
    constructor(props) {
        super(props);
        this.onUserLocationChange = this.onUserLocationChange.bind(this)
    }
    map: any
    // _mapView: MapView
    componentWillReceiveProps() {
        this.initMap()
        this.getCurrentPosition()
        this.forceUpdate();
    }
    componentDidMount() {
        this.initMap()
        this.getCurrentPosition()
        this.forceUpdate();
    }
    initMap() {
        var location = {
            latitude: 50.950228,
            longitude: 3.142707,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04
        }
        if (!isNullOrUndefined(this.state.userLocation)) {
            console.log("found location")
            location = this.state.userLocation
        }
        // this.map = <MapComponent location={location} mapElement={<div style={{ flex: 1, height: "100%", width: "100%" }} />} containerElement={<div style={{ flex: 1, height: "100%", width: "100%" }} />}></MapComponent>
        this.map = (
            <MapComponent initialRegion={location} onUserLocationChange={this.onUserLocationChange} />
        )
    }

    showGymDialog() {
        this.setState((prevState) => ({
            ...prevState,
            isDialogVisible: true
        }))
    }
    onChangeDialogInput(text: string) {
        this.setState((prevState) => ({
            ...prevState,
            currentDialogValue: text
        }))
    }
    onSubmitDialog() {
        this.setState((prevState) => ({
            ...prevState,
            gymName: this.state.currentDialogValue,
            currentDialogValue: ""
        }))
    }
    showDialog(show: boolean) {
        this.setState((prevState) => ({
            ...prevState,
            isDialogVisible: show
        }))
    }
    onUserLocationChange(location) {
        var coordinate = location.nativeEvent.coordinate
        this.setState((prevState) => ({
            ...prevState,
            userLocation: { latitude: coordinate.latitude, longitude: coordinate.longitude, latitudeDelta: 0.04, longitudeDelta: 0.04 },
        }))
    }
    getCurrentPosition() {
        if (this.weCanGetGeolocation()) {
            return navigator.geolocation.getCurrentPosition(
                (position: Position) => {
                    const { latitude, longitude } = position.coords;

                    this.setState((prevState) => ({
                        ...prevState,
                        userLocation: { latitude: latitude, longitude: longitude },
                        locationLoading: false
                    }))
                },
                (error: PositionError) => {
                    this.setState((prevState) => ({
                        ...prevState,
                        locationLoading: false
                    }))
                    console.log(error)
                    console.log("this should not happen ... ")
                }
            )
        }
    }

    weCanGetGeolocation() {
        return !isNullOrUndefined(navigator.geolocation)
    }
}