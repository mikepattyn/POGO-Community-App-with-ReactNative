import React from "react";
import { View, Button } from "react-native";
import { HeaderSubcomponent } from "../subcomponents/header/header.subcomponent";

export class ProfileScreenComponent extends React.Component<any> {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <HeaderSubcomponent navigation={this.props.navigation} />
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Button title="Start registration" onPress={() => console.log(this.props.navigation)} />
                </View>
            </View>

        )
    }
}