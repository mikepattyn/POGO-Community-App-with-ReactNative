import * as React from "react";
import { View, Text, Button } from "react-native";
import { HeaderSubcomponent } from "../subcomponents/header/header.subcomponent";

export class HomeScreenComponent extends React.Component<any> {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <HeaderSubcomponent navigation={this.props.navigation} />
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>{this.props.route.name}</Text>
                </View>
            </View>
        )
    }
}