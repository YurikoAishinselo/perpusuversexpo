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
  ActivityIndicator,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import * as Network from "expo-network";
import apiUrl from "../Data/ApiUrl";

const windowWidth = Dimensions.get("window").width;

function Login({ navigation }) {
  const [usernameText, setUsernameText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);

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

    const checkInternetConnection = async () => {
      const netInfoState = await Network.getNetworkStateAsync();
      setIsConnected(netInfoState.isConnected);
    };
    checkInternetConnection();

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const getUserInfo = () => {
    setLoading(true);
    const parameter = {
      username: usernameText,
      password: passwordText,
    };

    if (isConnected) {
      fetch(apiUrl + "user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parameter),
      })
        .then((response) => {
          console.log("response status", response.status);
          if (response.status === 200) {
            response.json().then((data) => {
              console.log("token", data.data.token);
              const token = data.data.access_token;
              fetch(apiUrl + "user/get_user_info", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              })
                .then((res) => {
                  console.log("response get user info", res.status);
                  return res.json();
                })
                .then((datas) => {
                  navigation.navigate("BottomNavbar", {
                    user_id: 1,
                    user_data_name: datas.data.name,
                    user_data_email: datas.data.email,
                    user_token: token,
                  });
                })
                .catch((e) => console.log(e));
            });
          } else if (usernameText === "" || passwordText === "") {
            Alert.alert("Fill in your username or password first");
          } else if (response.status === 401) {
            Alert.alert("Server error!");
          } else if (response.status === 402) {
            Alert.alert("Wrong Username or Password");
            setPasswordText("");
          }
        })
        .catch((e) => Alert.alert("Server error!"))
        .finally(() => {
          setPasswordText("");
          setUsernameText("");
          setLoading(false);
        });
    } else {
      setLoading(false);
      Alert.alert("No internet connection!");
    }
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
            onChangeText={(text) => setUsernameText(text)}
            value={usernameText}
            placeholder="Username"
            maxLength={30}
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
          onChangeText={(text) => setPasswordText(text)}
          value={passwordText}
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
          maxLength={20}
        />
      </View>
      {!isKeyboardOpen && (
        <TouchableOpacity
          style={loading ? styles.loginButtonOnLoading : styles.loginButton}
          onPress={!loading ? getUserInfo : null}
          activeOpacity={loading ? 1 : 0}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
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
    marginLeft: responsiveWidth(3),
  },
  usernameIcon: {
    height: responsiveHeight(2.7),
    width: responsiveHeight(2.6),
    marginTop: responsiveHeight(1.1),
    marginBottom: responsiveHeight(1),
    justifyContent: "center",
    marginLeft: responsiveWidth(1.4),
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
    width: responsiveHeight(2.6),
    height: responsiveHeight(1.78),
  },

  hideIcon: {
    width: responsiveHeight(2.6),
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
  loginButtonOnLoading: {
    position: "absolute",
    bottom: responsiveHeight(8),
    borderRadius: 15,
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(35),
    backgroundColor: "#808080",
  },
  loginButtonPressed: {
    backgroundColor: "#0d6aad",
  },
});

export default Login;
