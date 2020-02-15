import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import scriptLoader from 'react-async-script-loader'
import DialogInput from 'react-native-dialog-input';
import { MapsScreenContainer } from "./maps.screen.container.component";
export interface MapScreenState {
    isDialogVisible: boolean
}
class MapsScreen extends MapsScreenContainer<any, MapScreenState> {
    constructor(props) {
        super(props)
        this.state = {
            isDialogVisible: true
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ height: 300, width: 40, position: "absolute", right: 10, top: 80, zIndex: 1 }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={this.showGymDialog}>
                        <Image
                            source={require('./../maps/images/gymplus.png')}
                            style={{ width: 40, height: 40 }}
                        />
                    </TouchableOpacity>
                </View>
                <DialogInput isDialogVisible={this.state.isDialogVisible}
                    title={"DialogInput 1"}
                    message={"Message for DialogInput #1"}
                    hintInput={"HINT INPUT"}
                    submitInput={(inputText) => { this.sendInput(inputText) }}
                    closeDialog={(e) => { e.preventDefault(); console.log("pressed cancel") }}>
                </DialogInput>
                {this.map}
            </View>
        );
    }
    sendInput(input: any) {
        console.log(input)
    }

    showDialog(show: boolean) {
        this.setState((prevState) => ({
            ...prevState,
            isDialogVisible: show
        }))
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