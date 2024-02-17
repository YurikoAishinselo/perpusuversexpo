import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import * as ImagePicker from "expo-image-picker";
import apiUrl from "../Data/ApiUrl";

const PersonalInformation = ({ navigation, route }) => {
  let profilFakultas = "";
  const [imageSource, setImageSource] = useState(
    "../assets/ProfileAsset/profilImage.jpg"
  );

  const [profile, SetProfile] = useState("");
  const [isLoading, SetIsLoading] = useState(true);
  const { user_token } = route.params;
  useEffect(() => {
    fetchMyProfile();
  }, []);

  const fetchMyProfile = () => {
    fetch(apiUrl + "user/get_user_info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        SetProfile(data.data);
        console.log("Username", data.data.username[5]);
        switch (data.data.username[5]) {
          case "1":
            profilFakultas = "Seni";
            break;
          case 2:
            profilFakultas = "Bisnis";
            break;
          case "3":
            profilFakultas = "Komputer";
            break;
          case 4:
            profilFakultas = "Teknik";
            break;
          case 5:
            profilFakultas = "Pendidikan";
            break;
          default:
            profilFakultas = "Other";
        }

        SetIsLoading(false);
      })
      .catch((e) => console.error(e));
  };

  const uploadPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }).catch((e) => console.error(e));

    if (!result.canceled) {
      setImageSource(result.assets[0].uri);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/PublicAsset/defaultBackground.png")}
      style={styles.backgroundImage}
    >
      {!isLoading ? (
        <ScrollView>
          <View style={styles.userProfile}>
            <View style={styles.profileImageContainer}>
              <Image
                source={require("../assets/defaultPhotoProfile.png")}
                style={styles.imageSize}
              />
              {/* <TouchableOpacity
                style={styles.editIconContainer}
                onPress={uploadPhoto}
              >
                <Image
                  source={require("../assets/PublicAsset/editIcon.png")}
                  style={styles.editIcon}
                />
              </TouchableOpacity> */}
            </View>
            <Text style={styles.nameText}>{profile.name}</Text>
            <Text style={styles.emailText}>{profile.email}</Text>
          </View>

          <View style={styles.profilePersonalInformation}>
            <Text style={styles.profileTitleText}>NIM</Text>
            <Text style={styles.profileDataText}>{profile.username}</Text>
          </View>

          <View style={styles.profilePersonalInformation}>
            <Text style={styles.profileTitleText}>Nama Lengkap</Text>
            <Text style={styles.profileDataText}>{profile.name}</Text>
          </View>

          {/* <View style={styles.profilePersonalInformation}>
            <Text style={styles.profileTitleText}>Fakultas</Text>
            <Text style={styles.profileDataText}>{profilFakultas}</Text>
          </View> */}

          <View style={styles.profilePersonalInformation}>
            <Text style={styles.profileTitleText}>Jurusan</Text>
            <Text style={styles.profileDataText}>{profile.major}</Text>
          </View>

          <View style={styles.profilePersonalInformation}>
            <Text style={styles.profileTitleText}>Angkatan</Text>
            <Text style={styles.profileDataText}>{profile.generation}</Text>
          </View>
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
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

  userProfile: {
    // marginTop: responsiveHeight(4),
    alignItems: "center",
  },

  profileImageContainer: {
    position: "relative",
    marginBottom: responsiveHeight(1),
  },

  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: responsiveWidth(2),
    backgroundColor: "#fff",
    padding: responsiveWidth(1.8),
    borderRadius: responsiveHeight(0.8),
    borderWidth: responsiveHeight(0.1),
    borderColor: "#000000",
  },

  editIcon: {
    width: responsiveWidth(5.3),
    height: responsiveWidth(5.3),
  },

  imageSize: {
    borderRadius: responsiveHeight(30),
    height: responsiveHeight(25),
    width: responsiveHeight(25),
  },

  nameText: {
    fontSize: responsiveFontSize(3.5),
    fontWeight: "bold",
    // marginTop: responsiveHeight(3),
  },

  emailText: {
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(0.5),
    marginBottom: responsiveHeight(3.5),
  },

  profilePersonalInformation: {
    marginTop: responsiveHeight(2.5),
    marginRight: responsiveWidth(8),
    marginLeft: responsiveWidth(8),
    alignItems: "flex-start",
  },

  profileTitleText: {
    fontSize: responsiveFontSize(2),
    justifyContent: "center",
    alignItems: "center",
    color: "#000000",
    fontWeight: "500",
  },

  profileDataText: {
    marginTop: responsiveHeight(0.8),
    fontSize: responsiveFontSize(2.8),
    justifyContent: "center",
    alignItems: "center",
    color: "#000000",
    fontWeight: "600",
  },
});

export default PersonalInformation;
