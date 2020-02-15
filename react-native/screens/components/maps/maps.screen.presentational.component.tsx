import { View, Image, StyleSheet, TouchableOpacity, Text, Keyboard } from "react-native";
import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import { MapsScreenContainer } from "./maps.screen.container.component";
import { Input, Button } from "react-native-elements"
import ApiClient from "../../../clients/apiClient";

export interface MapScreenState {
    isDialogVisible: boolean
}
class MapsScreen extends MapsScreenContainer<any, MapScreenState> {
    private apiClient: ApiClient
    constructor(props) {
        super(props)
        this.state = {
            isDialogVisible: false,
            currentDialogValue: ""
        }
        this.showGymDialog = this.showGymDialog.bind(this)
        this.apiClient = ApiClient.instance
    }
    render() {
        console.log(this.map)
        return (
            <View style={styles.container}>
                <View style={{ height: 300, width: 40, position: "absolute", right: 10, top: 10, zIndex: 1 }}>
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
                        Keyboard.dismiss()
                    }}
                    dialogTitle={<DialogTitle title="Enter gymname" />}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="SUBMIT"
                                onPress={async () => {
                                    var locationResponse = await this.apiClient.post("/locations", { Latitude: this.state.userLocation.latitude, Longtitude: this.state.userLocation.longitude })
                                    console.log(locationResponse)
                                    if(locationResponse.status === 201) {
                                        var gymResponse = await this.apiClient.post("/gyms", {Name: "", LocationId: locationResponse.data.id})
                                        console.log(gymResponse.data);
                                    }
                                }}
                            />
                            <DialogButton
                                text="CANCEL"
                                onPress={() => {
                                    this.setState((prevState) => ({
                                        ...prevState,
                                        isDialogVisible: false
                                    }))
                                    Keyboard.dismiss()
                                }}
                            />
                        </DialogFooter>
                    }
                    width={0.8}
                >
                    <DialogContent>
                        <View style={{ width: "100%", height: 30, display: "flex", marginTop: 10, alignContent: "center", justifyContent: "center" }}>
                            <Input inputStyle={{ color: "#e1e1e1", textAlign: "left", textAlignVertical: "center" }} value={this.state.currentDialogValue} placeholder="Gymname" onChangeText={(text) => this.onChangeDialogInput(text)} />
                        </View >
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