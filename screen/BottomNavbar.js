import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Profile from "./Profile";
import MyBooks from "./MyBooks";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { Ionicons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

function BottomNavbar() {
  return (
    <Tab.Navigator
      initialRouteName={Home}
      screenOptions={(route) => ({
        headerTitleStyle: {
          fontSize: responsiveFontSize(3),
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === "Home") {
            iconName = focused ? "md-menu" : "home-outline";
          } else if (rn === "My Books") {
            iconName = focused ? "list" : "list-outline";
          } else if (rn === "Profile") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="My Books" component={MyBooks} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default BottomNavbar;
