import React, { Component } from "react";
import { View, TextInput, Picker } from "react-native";


export interface IRegistrationInput {
    index: number;
    value: string | number
    onChange: any
}

export class RegistrationInput extends Component<IRegistrationInput> {
    render() {
        if (![6, 7].some(x => x === this.props.index)) {
            return (
                <View>
                    <TextInput onChangeText={this.props.onChange} value={String(this.props.value)} />
                </View >
            )
        }
        else {
            if (this.props.index == 6) {
                var pickerItems = [];
                for (var i = 1; i < 41; i++) {
                    pickerItems.push(<Picker.Item key={i} label={i.toString()} value={i} />)
                }
                return (
                    <View>
                        <Picker
                            selectedValue={this.props.value}
                            style={{ height: 50, width: 150 }}
                            onValueChange={this.props.onChange}>
                            {pickerItems}
                        </Picker>
                    </View>
                )
            } else if (this.props.index == 7) {
                return (
                    <View>
                        <Picker
                            selectedValue={this.props.value}
                            style={{ height: 50, width: 150 }}
                            onValueChange={this.props.onChange}>
                            <Picker.Item label="Select a team" value={3} />
                            <Picker.Item label="Instinct" value={0} />
                            <Picker.Item label="Mystic" value={1} />
                            <Picker.Item label="Valor" value={2} />
                        </Picker>
                    </View>
                )
            }
        }
    }
}