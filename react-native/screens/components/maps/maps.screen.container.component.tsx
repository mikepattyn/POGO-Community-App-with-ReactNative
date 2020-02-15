import React, { Component } from "react";
import { MapComponent } from "./maps.component";

export class MapsScreenContainer<P, S> extends Component<any, any> {
    map: any
    private ifUpdatedByDev = false
    // _mapView: MapView
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
    initMap() {
        this.map = <MapComponent mapElement={<div style={{ flex: 1, height: "100%", width: "100%" }} />} containerElement={<div style={{ flex: 1, height: "100%", width: "100%" }} />}></MapComponent>
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
}