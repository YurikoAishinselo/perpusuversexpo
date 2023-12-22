import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Profile from "./Profile";
import MyBooks from "./MyBooks";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const Tab = createBottomTabNavigator();

const BottomNavbar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: route.name === "Home" ? false : true,
        headerTitleStyle: {
          fontSize: responsiveFontSize(3),
        },
        tabBarStyle: {
          height: 70,
        },
        tabBarBackground: () => (
          <Image
            source={require("../assets/PublicAsset/BottomNavbarImage.png")}
            style={styles.tabBarImage}
          />
        ),
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;
          if (route.name === "Home") {
            iconSource = focused
              ? require("../assets/PublicAsset/homeIconActive.png")
              : require("../assets/PublicAsset/homeIcon.png");
          } else if (route.name === "My Books") {
            iconSource = focused
              ? require("../assets/PublicAsset/myBookIconActive.png")
              : require("../assets/PublicAsset/myBookIcon.png");
          } else if (route.name === "Profile") {
            iconSource = focused
              ? require("../assets/PublicAsset/profileIconActive.png")
              : require("../assets/PublicAsset/profileIcon.png");
          }

          return (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={iconSource}
                marginTop={responsiveHeight(5.2)}
                style={{ width: size, height: size }}
              />
              <Text
                style={{
                  color: focused ? "#ffffff" : "#7ABCFF",
                  fontSize: responsiveFontSize(1.8),
                }}
              >
                {route.name}
              </Text>
            </View>
          );
        },
        tabBarLabel: "",
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="My Books" component={MyBooks} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  tabBarImage: {
    ...StyleSheet.absoluteFillObject,
    width: responsiveWidth(100), // Set the width as a percentage or fixed value
    height: responsiveWidth(20), // Set the height as a percentage or fixed value
  },
});
export default BottomNavbar;
