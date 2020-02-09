import * as React from "react";
import { View, Text, Button } from "react-native";
import validator from "email-validator"
import { RegistrationInput } from "../../elements/registration.input";
import { HeaderSubcomponent } from "../../subcomponents/header/header.subcomponent";
import { RegistrationState } from "./RegistrationState";
import { RegistrationScreenProps } from "./RegistrationScreenProps";

export class RegistrationScreenComponent extends React.Component<any, RegistrationState> {
    private propertyCommands: string[] = ["Enter your email address", "Enter your password", "Re-enter your password", "Enter your Discord id", "Enter your first name", "Enter your nickname", "Enter your level", "Select your team"]
    constructor(props: RegistrationScreenProps) {
        super(props);
        this.state = {
            index: 0,
            currentValue: "",
            currentButtonValue: "Next",
            Error: ""
        }
        this.onChangeText = this.onChangeText.bind(this);
    }
    render() {
        console.log(this.props)
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <HeaderSubcomponent navigation={this.props.navigation} />
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>{this.propertyCommands[this.state.index]}</Text>
                    <RegistrationInput index={this.state.index} onChange={(text: string) => this.onChangeText(text)} value={this.state.currentValue} />
                    <Text>{this.state.Error}</Text>
                    <Button title={this.state.currentButtonValue} onPress={() => this.onSubmit()} disabled={this.state.Error != undefined} />
                </View>
            </View>
        )
    }
    onChangeText(text: string) {
        this.setState((prevState) => ({
            ...prevState,
            currentValue: text
        }))
        // Email
        if (this.state.index == 0) {
            if (text.length > 7 && validator.validate(text)) {
                this.setState((prevState) => ({
                    ...prevState,
                    Email: text,
                    Error: undefined
                }))
            } else if (text.length > 7 && !validator.validate(text)) {
                this.setState((prevState) => ({
                    ...prevState,
                    Error: "Incorrect email."
                }))
            } else if (text.length <= 7) {
                this.setState((prevState) => ({
                    ...prevState,
                    Error: ""
                }))
            }

        }

        // Password
        if (this.state.index == 1) {
            var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$")
            if (text.length >= 8 && regex.test(text)) {
                this.setState((prevState) => ({
                    ...prevState,
                    Password: text,
                    Error: undefined
                }))
            } else if (text.length >= 8 && !regex.test(text)) {
                this.setState((prevState) => ({
                    ...prevState,
                    Error: "Wrong password"
                }))
            } else {
                this.setState((prevState) => ({
                    ...prevState,
                    Error: ""
                }))
            }
        }

        // Re-Enter password
        if (this.state.index == 2) {
            var match = text == this.state.Password
            if (match) {
                this.setState((prevState) => ({
                    ...prevState,
                    Password: text,
                    Error: undefined
                }))
            } else if (text.length >= 8 && !match) {
                this.setState((prevState) => ({
                    ...prevState,
                    Error: "Wrong password"
                }))
            } else {
                this.setState((prevState) => ({
                    ...prevState,
                    Error: ""
                }))
            }
        }

        // Discord id
        if (this.state.index == 3) {
            if (text.length >= 8) {
                this.setState((prevState) => ({
                    ...prevState,
                    DiscordId: text,
                    Error: undefined
                }))
            } else {
                this.setState((prevState) => ({
                    ...prevState,
                    Error: ""
                }))
            }
        }

        // Firstname
        if (this.state.index == 4) {
            if (text.length >= 2) {
                this.setState((prevState) => ({
                    ...prevState,
                    FirstName: text,
                    Error: undefined
                }))
            } else {
                this.setState((prevState) => ({
                    ...prevState,
                    Error: ""
                }))
            }
        }

        // Nickname
        if (this.state.index == 5) {
            if (text.length >= 2) {
                this.setState((prevState) => ({
                    ...prevState,
                    Nickname: text,
                    Error: undefined
                }))
            } else {
                this.setState((prevState) => ({
                    ...prevState,
                    Error: ""
                }))
            }
        }

        // Level
        if (this.state.index == 6) {
            var level = Number(text)
            if (isNaN(level)) {
                this.setState((prevState) => ({
                    ...prevState,
                    Error: "Please enter a number"
                }))
            } else if (!isNaN(level) && level < 1 || level > 40) {
                this.setState((prevState) => ({
                    ...prevState,
                    Error: "Please enter a number between 1 and 40"
                }))
            } else {
                this.setState((prevState) => ({
                    ...prevState,
                    Level: level,
                    Error: undefined
                }))
            }
        }

        // Team
        if (this.state.index == 7) {
            var team = Number(text)
            if (isNaN(team)) {
                this.setState((prevState) => ({
                    ...prevState,
                    Error: "Please select a team"
                }))
            } else if (!isNaN(team) && team < 0 || team > 2) {
                this.setState((prevState) => ({
                    ...prevState,
                    Error: "Please select a team"
                    // this shouldnt happen above
                }))
            } else {
                this.setState((prevState) => ({
                    ...prevState,
                    Team: team,
                    Error: undefined,
                    currentButtonValue: "Finish"
                }))
            }
        }
    }
    async onSubmit() {
        if (this.state.index == 7) {
            // this.settingsManager.registration.settings = { Email: this.state.Email, Password: this.state.Password, FirstName: this.state.FirstName, Nickname: this.state.Nickname, Level: this.state.Level, Team: this.state.Team }
            // console.log(this.settingsManager.registration.settings)
        } else {
            this.setState((prevState) => ({
                ...prevState,
                index: this.state.index + 1,
                currentValue: "",
                Error: ""
            }))
        }
    }

}
