import React, { useState } from "react";
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
const PersonalInformation = ({ navigation }) => {
  const profileName = "Tommy Theonanda";
  const profileEmail = "theonanda.tom@gmail.com";
  const profileNIM = "2021133001";
  const profilFakultas = "Komputer";
  const profilJurusan = "Teknik Perangkat Lunak";
  const profilAngkatan = "2021";

  return (
    <ImageBackground
      source={require("../assets/PublicAsset/defaultBackground.png")}
      style={styles.backgroundImage}
    >
      <ScrollView>
        <View style={styles.userProfil}>
          {/* <Image source={require("./assets/senkuProfile.jpeg")}  */}
          <Image
            source={require("../assets/ProfileAsset/profilImage.jpg")}
            style={styles.imageSize}
          ></Image>
          <Text style={styles.nameText}>{profileName}</Text>
          <Text style={styles.emailText}>{profileEmail}</Text>
        </View>
        <View style={styles.profilePersonalInformation}>
          <Text style={styles.profileTitleText}>NIM</Text>
          <Text style={styles.profileDataText}>{profileNIM}</Text>
        </View>

        <View style={styles.profilePersonalInformation}>
          <Text style={styles.profileTitleText}>Nama Lengkap</Text>
          <Text style={styles.profileDataText}>{profileName}</Text>
        </View>

        <View style={styles.profilePersonalInformation}>
          <Text style={styles.profileTitleText}>Fakultas</Text>
          <Text style={styles.profileDataText}>{profilFakultas}</Text>
        </View>

        <View style={styles.profilePersonalInformation}>
          <Text style={styles.profileTitleText}>Jurusan</Text>
          <Text style={styles.profileDataText}>{profilJurusan}</Text>
        </View>

        <View style={styles.profilePersonalInformation}>
          <Text style={styles.profileTitleText}>Angkatan</Text>
          <Text style={styles.profileDataText}>{profilAngkatan}</Text>
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

  userProfil: {
    marginTop: responsiveHeight(4),
    alignItems: "center",
  },

  imageSize: {
    borderRadius: responsiveHeight(30),
    height: responsiveHeight(18),
    width: responsiveHeight(18),
  },

  nameText: {
    fontSize: responsiveFontSize(3.5),
    fontWeight: "bold",
    marginTop: responsiveHeight(3),
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
