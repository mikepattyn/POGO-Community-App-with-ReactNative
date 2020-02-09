import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React, { Component } from "react";
import { View, Text, Button, TabBarIOS } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

class WelcomeScreen extends Component<any> {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button title='Login' onPress={() => this.props.navigation.navigate('Dashboard')} />
        <Button title='Sign Up' onPress={() => alert("sign up button pressed")} />
      </View>
    );
  }
}

class FeedScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Feed</Text>
      </View>
    );
  }
}

class ProfileScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Profile</Text>
      </View>
    );
  }
}
class SettingsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Settings</Text>
      </View>
    );
  }
}

const DashboardTabNavigator = createBottomTabNavigator()
function DashboardTabs(): any {
  return (
    <NavigationContainer>
      <DashboardTabNavigator.Navigator
        initialRouteName="Feed"
      >
        <DashboardTabNavigator.Screen
          name="Feed"
          component={FeedScreen}
        />
        <DashboardTabNavigator.Screen
          name="Profile"
          component={ProfileScreen}
        />
        <DashboardTabNavigator.Screen
          name="Settings"
          component={SettingsScreen}
        />
      </DashboardTabNavigator.Navigator>
    </NavigationContainer>
  )
}

const DashboardStackNavigator = createStackNavigator({
  DashboardTabNavigator: DashboardTabs
})

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  }
})

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: WelcomeScreen },
  Dashboard: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);


export default class App extends Component<any> {
  render() {
    return <AppContainer />
  }
}
