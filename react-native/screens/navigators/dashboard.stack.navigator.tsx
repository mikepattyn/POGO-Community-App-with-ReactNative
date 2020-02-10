import { createStackNavigator } from "react-navigation-stack";
import { DashboardTabs } from "./dashboard.tabs";

export const DashboardStackNavigator = createStackNavigator({
    DashboardTabNavigator: {
        screen: DashboardTabs,
        navigationOptions: {
            title: "POGO Community Raid Bot",
            headerStyle: {
                backgroundColor: "#232424"
            },
            headerTitleStyle: {
                color: "#e1e1e1"
            }
        }
    }
})