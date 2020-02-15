import React, { Component } from "react";
import { MapComponent } from "./maps.component";
import { isNullOrUndefined } from "util";

export class MapsScreenContainer<P, S> extends Component<any, any> {
    map: any
    private ifUpdatedByDev = false
    // _mapView: MapView
    componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
        if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
            if (isScriptLoadSucceed) {
                this.initMap()
                this.ifUpdatedByDev = true;
                this.getCurrentPosition()
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
            this.getCurrentPosition()
            this.forceUpdate();
        }
    }
    initMap() {
        console.log(this.state.userLocation)
        var location = {
            lat: 50.950228,
            lng: 3.142707
        }
        if (!isNullOrUndefined(this.state.userLocation)) {
            console.log("found location")
            location = this.state.userLocation
        }
        this.map = <MapComponent location={location} mapElement={<div style={{ flex: 1, height: "100%", width: "100%" }} />} containerElement={<div style={{ flex: 1, height: "100%", width: "100%" }} />}></MapComponent>
    }
    componentDidUpdate() {
        if (this.ifUpdatedByDev) {
            this.ifUpdatedByDev = false;
        }
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
    getCurrentPosition() {
        if (this.weCanGetGeolocation()) {
            return navigator.geolocation.getCurrentPosition(
                (position: Position) => {
                    const { latitude, longitude } = position.coords;

                    this.setState((prevState) => ({
                        ...prevState,
                        userLocation: { lat: latitude, lng: longitude },
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