import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Performance from "./pages/Performance";
import UserInterface from "./pages/UserInterface";
import NativeFeatures from "./pages/NativeFeatures";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';
            if (route.name === "Performance") {
              iconName = 'speedometer'
            } else if (route.name === "User Interface") {
              iconName = 'brush'
            } else if (route.name === "Native Features") {
              iconName = 'view-dashboard'
            } 
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            )
          }
        })}
      >
        <Tab.Screen
          name="Performance"
          component={Performance}
          options={{
            tabBarLabel: "Performance",
            title: "Performance",
            headerShown: false
          }}
        />
        <Tab.Screen
          name="User Interface"
          component={UserInterface}
          options={{
            tabBarLabel: "User Interface",
            title: "User Interface",
            headerShown: false
          }}
        />
        <Tab.Screen
          name="Native Features"
          component={NativeFeatures}
          options={{
            tabBarLabel: "Native Features",
            title: "Native Features",
            headerShown: false
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App;