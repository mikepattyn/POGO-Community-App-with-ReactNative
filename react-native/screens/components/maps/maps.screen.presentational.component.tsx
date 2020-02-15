import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";
import scriptLoader from 'react-async-script-loader'
import { Dialog, DialogContent } from 'react-native-popup-dialog';
import { MapsScreenContainer } from "./maps.screen.container.component";
import { Input, Button } from "react-native-elements"

export interface MapScreenState {
    isDialogVisible: boolean
}
class MapsScreen extends MapsScreenContainer<any, MapScreenState> {
    constructor(props) {
        super(props)
        this.state = {
            isDialogVisible: false,
            currentDialogValue: ""
        }
        this.showGymDialog = this.showGymDialog.bind(this)
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
                <Dialog
                    visible={this.state.isDialogVisible}
                    onTouchOutside={() => {
                        this.setState((prevState) => ({
                            ...prevState,
                            isDialogVisible: false
                        }))
                    }}
                >
                    <DialogContent>
                        <Text style={{ textAlign: "center", fontWeight: "bold", marginTop: 20 }}>Enter gymname</Text>
                        <View style={{ width: "100%", marginVertical: 20 }}>
                            <Input inputStyle={{ color: "#e1e1e1", textAlign: "center", textAlignVertical: "center" }} value={this.state.currentDialogValue} placeholder="Gymname" onChangeText={(text) => this.onChangeDialogInput(text)} />
                        </View >
                        <Button title="Next" onPress={() => console.log("submitttttted - the state is: " + this.state.currentDialogValue)} />
                    </DialogContent>
                </Dialog>
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