import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ProfileScreen } from "../components/profile/profile.screen";
import MapsScreen from "../components/maps/maps.screen.presentational.component";
import React from "react";
const DashboardTabNavigator = createBottomTabNavigator()
export const DashboardTabs = () => {
    return (
        <NavigationContainer>
            <DashboardTabNavigator.Navigator
                initialRouteName="Feed"
                tabBarOptions={{
                    style: {
                        backgroundColor: "#232424",
                        borderTopColor: "#474848"
                    }
                }}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'Profile') {
                            iconName = focused ? 'account-circle' : 'account-circle-outline'
                        } else if (route.name === 'Maps') {
                            iconName = 'map-marker';
                        }
                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    }
                })}
            >
                <DashboardTabNavigator.Screen
                    name="Profile"
                    component={ProfileScreen}
                />
                <DashboardTabNavigator.Screen
                    name="Maps"
                    component={MapsScreen}
                />
            </DashboardTabNavigator.Navigator>
        </NavigationContainer>
    )
}