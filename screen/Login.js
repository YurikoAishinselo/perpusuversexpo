import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Alert,
  Keyboard,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const windowWidth = Dimensions.get("window").width;

function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

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

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleButtonPress = () => {
    if (username === "2021133005" && password === "2021") {
      navigation.navigate("Home");
    } else if (username === "" || password == "") {
      Alert.alert("Fill in your username or password first");
    } else {
      Alert.alert("Wrong Username or Password");
    }
  };

  const handleButtonPressIn = () => {
    setIsButtonPressed(true);
  };

  const handleButtonPressOut = () => {
    setIsButtonPressed(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/PublicAsset/defaultBackground.png")}
        style={styles.backgroundImage}
      />
      <Image
        source={require("../assets/loginAsset/loginBackground.png")}
        style={styles.loginBackgroundImage}
        resizeMode="stretch"
      />
      <View>
        <Text style={styles.welcomeBack}>Welcome Back</Text>
      </View>
      <View style={styles.inputContainter}>
        <View style={styles.inputBackground}>
          <Image
            style={styles.usernameIcon}
            source={require("../assets/loginAsset/usernameIcon.png")}
          />
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => setUsername(text)}
            value={username}
            placeholder="Username"
          />
        </View>
      </View>
      <View style={styles.inputBackground}>
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.passwordIcon}
        >
          <Image
            source={
              isPasswordVisible
                ? require("../assets/PublicAsset/hidePasswordIcon.png")
                : require("../assets/PublicAsset/showPasswordIcon.png")
            }
            style={isPasswordVisible ? styles.hideIcon : styles.showIcon}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.inputText}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
        />
      </View>
      {!isKeyboardOpen && (
        <TouchableOpacity
          style={[
            styles.loginButton,
            isButtonPressed && styles.loginButtonPressed,
          ]}
          onPress={handleButtonPress}
          onPressIn={handleButtonPressIn}
          onPressOut={handleButtonPressOut}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  welcomeBack: {
    fontSize: 35,
    color: "black",
    fontWeight: "bold",
    marginBottom: responsiveHeight(2),
  },
  backgroundImage: {
    position: "absolute",
    width: responsiveWidth(100),
    height: responsiveHeight(100),
  },
  loginBackgroundImage: {
    width: responsiveWidth(100),
    height: responsiveHeight(36),
    zIndex: 2,
    position: "absolute",
    borderBottomLeftRadius: responsiveHeight(4.5),
    borderBottomRightRadius: responsiveHeight(4.5),
  },
  inputContainter: {
    marginTop: responsiveHeight(30),
  },
  inputBackground: {
    textAlign: "center",
    flexDirection: "row",
    width: responsiveWidth(85),
    backgroundColor: "#fff",
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(1),
    paddingVertical: responsiveHeight(0.5),
    paddingHorizontal: responsiveHeight(1),
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
  },
  inputText: {
    color: "#000000",
    width: responsiveWidth(80),
    fontSize: responsiveFontSize(2.6),
    marginLeft: responsiveWidth(2),
  },
  usernameIcon: {
    height: responsiveHeight(2.6),
    width: responsiveHeight(2.6),
    marginTop: responsiveHeight(1.1),
    marginBottom: responsiveHeight(1),
    justifyContent: "center",
    marginLeft: responsiveWidth(1),
    alignItems: "center",
  },
  passwordIcon: {
    marginTop: responsiveHeight(1.1),
    marginBottom: responsiveHeight(1),
    justifyContent: "center",
    marginLeft: responsiveWidth(1),
    alignItems: "center",
  },

  showIcon: {
    width: responsiveHeight(2.4),
    height: responsiveHeight(1.8),
  },

  hideIcon: {
    width: responsiveHeight(2.4),
    height: responsiveHeight(1.8),
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: responsiveFontSize(3),
    textAlign: "center",
  },
  loginButton: {
    position: "absolute",
    bottom: responsiveHeight(8),
    borderRadius: 15,
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(35),
    backgroundColor: "#128CFC",
  },
});

export default Login;
