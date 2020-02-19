import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { MapsScreenContainer } from "./maps.screen.container.component";
import { LatLng } from "react-native-maps";
import { InputDialog } from "../../elements/input.dialog";

export interface MapScreenState {
    isDialogVisible: boolean;
    currentDialogValue: string;
    userLocation: LatLng
}

class MapsScreen extends MapsScreenContainer<any, MapScreenState> {
    constructor(props) {
        super(props)
        this.state = {
            isDialogVisible: false,
            currentDialogValue: ""
        }
        this.onChangeDialogInput = this.onChangeDialogInput.bind(this)
        this.onPressOutsideDialog = this.onPressOutsideDialog.bind(this)
        this.onSubmitDialog = this.onSubmitDialog.bind(this)
    }

    render() {
        console.log("Maps presentation state: ",this.state)
        return (
            <View style={styles.container}>
                <View style={{ height: 300, width: 40, position: "absolute", right: 10, top: 10, zIndex: 1 }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => this.showDialog(true)}>
                        <Image
                            source={require('./../maps/images/gymplus.png')}
                            style={{ width: 40, height: 40 }}
                        />
                    </TouchableOpacity>
                </View>
                <InputDialog isVisible={this.state.isDialogVisible} onPressOutside={this.onPressOutsideDialog} onChangeDialogInput={this.onChangeDialogInput} onSubmitDialog={this.onSubmitDialog} />
                {this.map}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: "100%",
        width: "100%",
        justifyContent: 'flex-end',
        alignItems: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default MapsScreen