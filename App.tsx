import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Component } from "react";
import React from "react"
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
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if(route.name == "Feed") {
            iconName = focused ? 'home' : 'home-outline'
          } else if(route.name === 'Profile') {
            iconName = focused ? 'account-circle' : 'account-circle-outline'
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        }
      })}
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


const App = (props) => (<AppContainer />)

export {App}