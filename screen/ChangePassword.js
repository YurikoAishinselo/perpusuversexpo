import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const ChangePassword = () => {
  const profileName = "Tommy Theonanda";
  const profileEmail = "theonanda.tom@gmail.com";

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <ImageBackground
      source={require("../assets/PublicAsset/defaultBackground.png")}
      style={styles.backgroundImage}
    >
      <ScrollView>
        <View style={styles.changePasswordInputContainer}>
          <Image
            source={require("../assets/ProfileAsset/profilImage.jpg")}
            style={styles.imageSize}
          />
          <Text style={styles.titleText}>Change Password</Text>

          <View style={styles.inputBox}>
            <Image
              source={require("../assets/PublicAsset/passwordIcon.png")}
              style={styles.passwordIcon}
            />
            <TextInput
              style={styles.inputText}
              placeholder="Current Password"
              placeholderTextColor="#BCBEC2"
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Image
                source={
                  isPasswordVisible
                  ? require("../assets/PublicAsset/hidePasswordIcon.png")
                  : require("../assets/PublicAsset/showPasswordIcon.png")
                }
                style={isPasswordVisible ? styles.hideIcon : styles.showIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputBox}>
            <Image
              source={require("../assets/PublicAsset/passwordIcon.png")}
              style={styles.passwordIcon}
            />
            <TextInput
              style={styles.inputText}
              placeholder="New Password"
              placeholderTextColor="#BCBEC2"
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Image
                source={
                  isPasswordVisible
                    ? require("../assets/PublicAsset/hidePasswordIcon.png")
                    : require("../assets/PublicAsset/showPasswordIcon.png")
                }
                style={isPasswordVisible ? styles.hideIcon : styles.showIcon}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.changeButton}>
            <Text style={styles.bottomButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  // Background
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  changePasswordInputContainer: {
    marginTop: responsiveHeight(5),
    alignItems: "center",
    height: responsiveHeight(80),
  },

  imageSize: {
    borderRadius: responsiveHeight(30),
    height: responsiveHeight(23),
    width: responsiveHeight(23),
  },

  titleText: {
    marginTop: responsiveHeight(3),
    fontSize: responsiveFontSize(4.5),
    fontWeight: "600",
    marginBottom: responsiveHeight(5),
  },

  inputBox: {
    marginTop: responsiveHeight(1),
    flexDirection: "row",
    alignItems: "center",
    width: responsiveWidth(85),
    height: responsiveHeight(6),
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: responsiveHeight(2.1),
    marginBottom: responsiveHeight(2),
    paddingLeft: responsiveWidth(2),
    paddingRight: responsiveWidth(3),
  },

  showIcon: {
    width: responsiveHeight(2.4),
    height: responsiveHeight(1.8),
  },

  hideIcon: {
    width: responsiveHeight(2.5),
    height: responsiveHeight(2),
  },

  passwordIcon: {
    width: responsiveHeight(2),
    height: responsiveHeight(2.5),
    marginRight: responsiveWidth(3),
    marginLeft: responsiveWidth(2),
  },

  inputText: {
    justifyContent: "center",
    flex: 1,
    fontSize: responsiveFontSize(2.4),
    color: "black",
  },

  changeButton: {
    position: "absolute",
    bottom: responsiveHeight(8),
    borderRadius: 15,
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(35),
    backgroundColor: "#128CFC",
    bottom: 0,
  },

  bottomButtonText: {
    color: "white",
    fontSize: responsiveFontSize(2.5),
  },
});

export default ChangePassword;
