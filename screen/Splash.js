// SplashScreen.js
import React, { useEffect } from "react";
import { View, ImageBackground, Image, StyleSheet} from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const Splash = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace("Login");
    }, 1000); // Adjust the delay time as needed

    // Clear the timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  return (
    <ImageBackground
      source={require("../assets/PublicAsset/splashBackground.png")}
      style={styles.splashBackground}
    >
      <View style={styles.uversLogoContainer}>
          <Image source={require("../assets/PublicAsset/uversLogo.png")} style={styles.uversLogo}/>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  splashBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  uversLogoContainer: {
    alignItems: "center",
    justifyContent: 'center',
    height: responsiveHeight(90),
    marginBottom: responsiveHeight(15),
  },
  uversLogo: {
    height: responsiveHeight(10),
    width: responsiveHeight(22),
  }

});

export default Splash;
