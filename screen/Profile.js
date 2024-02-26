import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
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

const Profile = ({ navigation, route }) => {
  const [profile, SetProfile] = useState("");
  const { user_id, user_data_name, user_data_email, user_token } = route.params;

  return (
    <ImageBackground
      source={require("../assets/PublicAsset/defaultBackground.png")}
      style={styles.backgroundImage}
    >
      <ScrollView>
        <View style={styles.userProfil}>
          <Image
            source={require("../assets/defaultPhotoProfile.png")}
            style={styles.imageSize}
          ></Image>
          <Text style={styles.nameText}>{user_data_name}</Text>
          <Text style={styles.emailText}>{user_data_email}</Text>
        </View>

        <TouchableOpacity
          style={styles.profileMenuContainer}
          onPress={() =>
            navigation.navigate("Personal Information", {
              user_token: user_token,
            })
          }
        >
          <View style={styles.profileMenu}>
            <Image
              style={styles.iconMenu}
              source={require("../assets/ProfileAsset/personalInformationIcon.png")}
            ></Image>
            <Text style={styles.menuText}>Personal Information</Text>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.profileMenuContainer}
          onPress={() =>
            navigation.navigate("Wishlist", {
              user_id: user_id,
              user_token: user_token,
            })
          }
        >
          <View style={styles.profileMenu}>
            <Image
              style={styles.iconMenu}
              source={require("../assets/ProfileAsset/wishlistIcon.png")}
            ></Image>
            <Text style={styles.menuText}>Wishlist</Text>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.profileMenuContainer}
          onPress={() =>
            navigation.navigate("History", {
              user_id: user_id,
              user_token: user_token,
            })
          }
        >
          <View style={styles.profileMenu}>
            <Image
              style={styles.iconMenu}
              source={require("../assets/ProfileAsset/borrowingHistoryIcon.png")}
            ></Image>
            <Text style={styles.menuText}>Borrowing History</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileMenuContainer}
          onPress={() =>
            navigation.navigate("Change Password", { user_token: user_token })
          }
        >
          <View style={styles.profileMenu}>
            <Image
              style={styles.iconMenu}
              source={require("../assets/ProfileAsset/changePasswordIcon.png")}
            ></Image>
            <Text style={styles.menuText}>Change Password</Text>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.profileMenuContainer}
          onPress={() => navigation.navigate("Splash")}
        >
          <View style={styles.profileMenu}>
            <Image
              style={styles.iconMenu}
              source={require("../assets/ProfileAsset/aboutIcon.png")}
            ></Image>
            <Text style={styles.menuText}>About</Text>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.profileMenuContainer}
          onPress={() => navigation.navigate("Login")}
        >
          <View style={styles.profileMenu}>
            <Image
              style={styles.iconMenu}
              source={require("../assets/ProfileAsset/logoutIcon.png")}
            ></Image>
            <Text style={styles.menuText}>Log out</Text>
          </View>
        </TouchableOpacity>
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

  userProfil: {
    // marginTop: responsiveHeight(1),
    alignItems: "center",
  },

  imageSize: {
    borderRadius: responsiveHeight(30),
    height: responsiveHeight(20),
    width: responsiveHeight(20),
  },

  nameText: {
    fontSize: responsiveFontSize(3.5),
    fontWeight: "bold",
    marginTop: responsiveHeight(1),
  },

  emailText: {
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(0.5),
    marginBottom: responsiveHeight(1.5),
  },

  profileMenuContainer: {
    marginTop: responsiveHeight(4.5),
    marginRight: responsiveWidth(8),
    marginLeft: responsiveWidth(8),
    alignItems: "flex-start",
  },

  profileMenu: {
    alignItems: "center",
    flexDirection: "row",
    // marginTop: responsiveHeight(1),
  },

  iconMenu: {
    marginRight: responsiveWidth(5),
    height: responsiveHeight(5),
    width: responsiveHeight(5),
  },

  menuText: {
    fontSize: responsiveFontSize(2.8),
    justifyContent: "center",
    alignItems: "center",
    color: "#000000",
    fontWeight: "600",
  },
});
export default Profile;
