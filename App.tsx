import { createSwitchNavigator, createAppContainer, } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, ImageBackground } from "react-native";
import { Button } from "react-native-elements"
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { Component } from "react"
import { SettingsManager } from "./react-native/managers/settings/settings.manager";
import { RegistrationScreenComponent } from "./react-native/screens/components/registration/registration.screen.component";
class WelcomeScreen extends Component<any> {

  registrationManager: SettingsManager = new SettingsManager();

  constructor(props) {
    super(props)
    // this.registrationManager.registration.storeData("Registration", JSON.stringify(this.registrationManager.registration.settings))

  }

  render() {
    console.log(this.props)
    return (
      <ImageBackground source={require('./react-native/resources/images/home_background.png')} imageStyle={{ resizeMode: "contain" }} style={{ width: '100%', height: '100%', backgroundColor: "#232424" }}>
        <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
          <Text>Welcome blablablabla</Text>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
          <Button containerStyle={{ width: "100%", paddingHorizontal: 20 }} buttonStyle={{
            backgroundColor: "#2164E8"
          }} title='Login' onPress={() => this.props.navigation.navigate('Dashboard')} />
          <Text style={{ textDecorationLine: "underline", fontSize: 12, marginTop: 10, marginBottom: 20, color: "#e1e1e1" }} numberOfLines={1} onPress={() => this.props.navigation.navigate('Registration')}>Dont have an account yet? Click here to sign up.</Text>
        </View>
      </ImageBackground>

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
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name == "Feed") {
              iconName = focused ? 'home' : 'home-outline'
            } else if (route.name === 'Profile') {
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
  Dashboard: { screen: AppDrawerNavigator },
  Registration: { screen: RegistrationScreenComponent }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const App = (props) => (<AppContainer />)

export default App 