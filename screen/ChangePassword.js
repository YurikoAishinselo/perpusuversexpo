import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Alert,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import apiUrl from "../Data/ApiUrl";

const ChangePassword = ({ navigation, route }) => {
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const { user_token } = route.params;

  const submitNewPassword = async () => {
    const parameter = {
      current_password: currentPassword,
      new_password: newPassword,
      confirm_password: newPassword,
    };

    try {
      const Url = apiUrl + "user/change_password";
      let response = await fetch(Url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user_token}`,
        },
        body: JSON.stringify(parameter),
      });
      const status = response.status;
      console.log(status);
      response = await response.json();

      if (currentPassword === "") {
        Alert.alert("Current password can not be empty!");
        return;
      }

      if (newPassword === "") {
        Alert.alert("New Password can not be empty!");
        return;
      }

      if (status === 200) {
        navigation.navigate("BottomNavbar");
        Alert.alert(response.data.message);
      } else if (status === 401) {
        Alert.alert("Current password is incorrect!");
      } else {
        console.log(response);
        if (
          response.error.detail.new_password[0] ===
          "The new password must be at least 8 characters."
        ) {
          Alert.alert("The new password must be at least 8 characters.");
        } else if (
          response.error.detail.new_password[0] ===
          "The new password and current password must be different."
        ) {
          Alert.alert(
            "The new password and current password must be different."
          );
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleCurrentPasswordVisibility = () => {
    setIsCurrentPasswordVisible(!isCurrentPasswordVisible);
  };

  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardOpen(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSubmit = () => {
    // Reset previous error messages
    setCurrentPasswordError("");
    setNewPasswordError("");

    // Validate current password
    if (!currentPassword) {
      setCurrentPasswordError("Please enter your current password");
    }

    // Validate new password
    if (!newPassword) {
      setNewPasswordError("Please enter your new password");
    }

    // If no errors, proceed with the submit logic
    if (!currentPasswordError && !newPasswordError) {
      console.log("Submit button pressed");
      // Add your submit logic here
    } else {
      // Show error messages
      Alert.alert("Error", `${currentPasswordError}\n${newPasswordError}`, [
        { text: "OK" },
      ]);
    }
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
              secureTextEntry={!isCurrentPasswordVisible}
              maxLength={20}
              value={currentPassword}
              onChangeText={(text) => setCurrentPassword(text)}
            />
            <TouchableOpacity onPress={toggleCurrentPasswordVisibility}>
              <View style={styles.iconPadding}>
                <Image
                  source={
                    isCurrentPasswordVisible
                      ? require("../assets/PublicAsset/hidePasswordIcon.png")
                      : require("../assets/PublicAsset/showPasswordIcon.png")
                  }
                  style={
                    isCurrentPasswordVisible ? styles.hideIcon : styles.showIcon
                  }
                />
              </View>
            </TouchableOpacity>
          </View>
          {currentPasswordError ? (
            <Text style={styles.errorText}>{currentPasswordError}</Text>
          ) : null}

          <View style={styles.inputBox}>
            <Image
              source={require("../assets/PublicAsset/passwordIcon.png")}
              style={styles.passwordIcon}
            />
            <TextInput
              style={styles.inputText}
              placeholder="New Password"
              placeholderTextColor="#BCBEC2"
              secureTextEntry={!isNewPasswordVisible}
              maxLength={20}
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
            />
            <TouchableOpacity onPress={toggleNewPasswordVisibility}>
              <View style={styles.iconPadding}>
                <Image
                  source={
                    isNewPasswordVisible
                      ? require("../assets/PublicAsset/hidePasswordIcon.png")
                      : require("../assets/PublicAsset/showPasswordIcon.png")
                  }
                  style={
                    isNewPasswordVisible ? styles.hideIcon : styles.showIcon
                  }
                />
              </View>
            </TouchableOpacity>
          </View>
          {newPasswordError ? (
            <Text style={styles.errorText}>{newPasswordError}</Text>
          ) : null}

          {!isKeyboardOpen && (
            <TouchableOpacity
              style={styles.changeButton}
              onPress={submitNewPassword}
            >
              <Text style={styles.bottomButtonText}>Submit</Text>
            </TouchableOpacity>
          )}
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
    marginTop: responsiveHeight(3),
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
    borderRadius: responsiveHeight(1.6),
    marginBottom: responsiveHeight(1),
    paddingLeft: responsiveWidth(2),
    paddingRight: responsiveWidth(3),
    backgroundColor: "#FFF",
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

  iconPadding: {
    paddingHorizontal: responsiveWidth(1),
    paddingVertical: responsiveWidth(2.5),
  },

  errorText: {
    color: "red",
    marginBottom: responsiveHeight(2),
    textAlign: "left",
    width: responsiveWidth(85),
    backgroundColor: "#FF00000",
  },
});

export default ChangePassword;
