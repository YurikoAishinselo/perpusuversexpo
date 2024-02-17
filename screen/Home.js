import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import booksData from "../Data/BookData.json";
import BottomNavbar from "./BottomNavbar";
import apiUrl from "../Data/ApiUrl";

const Home = ({ navigation, route }) => {
  const [isSortMenuVisible, setIsSortMenuVisible] = useState(false);
  const [sortOption, setSortOption] = useState("Option 1");
  const [searchQuery, setSearchQuery] = useState("");
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const { user_id, user_data_name, user_token } = route.params;

  const namaArray = user_data_name.split(" ");
  const namaPertama = namaArray[0];
  const jumlahHuruf = namaPertama.replace(/\s/g, "").length;

  const [isLoading, setIsLoading] = useState(true);
  const [bookLists, setBookLists] = useState([]);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    try {
      let result = await fetch(apiUrl + "book/get_book_list");
      result = await result.json();
      setBookLists(result.data.book_lists);
    } catch (e) {
      console.error("error", e);
    } finally {
      setIsLoading(false);
    }
  };

  const renderBookCard = (book) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const lowerCaseTitle = book.name.toLowerCase();
    const lowerCaseAuthor = book.writer.toLowerCase();
    const isMatch =
      lowerCaseTitle.includes(lowerCaseQuery) ||
      lowerCaseAuthor.includes(lowerCaseQuery);

    if (searchQuery && !isMatch) {
      return null;
    }

    return (
      <TouchableOpacity
        style={styles.box}
        key={book.id}
        onPress={() =>
          navigation.navigate("Book Details", {
            bookIds: book.id,
            user_id: user_id,
            user_token: user_token,
          })
        }
      >
        <View style={styles.inner}>
          <Image
            style={styles.bookImage}
            source={{
              uri: `http://cidia.my.id/storage/${book.cover_path}`,
            }}
          />
        </View>
        <Text style={styles.textJudul} numberOfLines={1}>
          {book.name}{" "}
        </Text>
        <Text style={styles.textPenulis}>{book.writer}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require("../assets/PublicAsset/defaultBackground.png")}
          style={styles.backgroundImage}
        >
          <ScrollView>
            <View style={styles.headerContainer}>
              <View style={styles.leftColumn}>
                <Text style={styles.textHello}>Hello</Text>
                <Text
                  style={{
                    fontSize:
                      jumlahHuruf > 10
                        ? responsiveFontSize(2.5)
                        : responsiveFontSize(3),
                    fontWeight: "bold",
                    color: "#000000",
                  }}
                >
                  {namaPertama}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.rightColumn}
                onPress={() =>
                  navigation.navigate("Personal Information", {
                    user_token: user_token,
                  })
                }
              >
                <Image
                  style={styles.profileImage}
                  source={require("../assets/defaultPhotoProfile.png")}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.searchContent}>
              <View style={styles.searchBar}>
                <TouchableOpacity>
                  <Image
                    style={styles.searchIcon}
                    source={require("../assets/homeAsset/searchIcon.png")}
                  />
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  placeholder="Search Books"
                  value={searchQuery}
                  onChangeText={(text) => setSearchQuery(text)}
                />
              </View>
            </View>

            <View style={styles.boxContent}>
              {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : bookLists && bookLists.length > 0 ? (
                bookLists.map((book) => renderBookCard(book))
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: responsiveFontSize(3),
                  }}
                >
                  Book is empty!
                </Text>
              )}
            </View>
          </ScrollView>
          <View style={styles.emptyArea}></View>
        </ImageBackground>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  headerContainer: {
    marginTop: responsiveHeight(2),
    flexDirection: "row",
    height: responsiveHeight(15),
  },
  leftColumn: {
    marginVertical: responsiveHeight(5),
    marginHorizontal: responsiveWidth(6),
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  rightColumn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    marginVertical: responsiveHeight(5),
    marginHorizontal: responsiveWidth(7),
  },
  textHello: {
    fontSize: responsiveFontSize(3),
    color: "#7C7C7C",
  },
  profileImage: {
    height: responsiveWidth(20),
    width: responsiveWidth(20),
    borderRadius: 50,
  },
  searchContent: {
    marginTop: responsiveHeight(2),
    height: responsiveHeight(8),
    flexDirection: "row",
    justifyContent: "center",
  },
  searchBar: {
    flex: 0.9,
    height: responsiveHeight(6),
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: responsiveHeight(0.1),
    flexDirection: "row",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#FFFFFF",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  input: {
    flex: 1,
    marginLeft: responsiveWidth(3),
    fontSize: 20,
  },
  boxContent: {
    flex: 1,
    alignSelf: "stretch",
    flexDirection: "row",
    padding: 5,
    flexWrap: "wrap",
  },
  box: {
    width: "50%",
    height: responsiveHeight(32),
    padding: 20,
  },
  inner: {
    flex: 1,
    borderWidth: responsiveWidth(0.05),
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: responsiveHeight(0.8),
    width: responsiveHeight(17),
  },
  textPenulis: {
    fontSize: responsiveFontSize(2),
    fontWeight: "normal",
    color: "#878D92",
  },
  textJudul: {
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(1),
    fontWeight: "bold",
    color: "#000000",
  },
  bookImage: {
    height: responsiveHeight(15.5),
    width: responsiveHeight(11.9),
    borderRadius: responsiveHeight(0.5),
  },
  sortMenuContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: responsiveWidth(60),
    height: responsiveHeight(15),
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    transform: [
      { translateX: -responsiveWidth(30) },
      { translateY: -responsiveHeight(12.5) },
    ],
  },
  searchIcon: {
    width: responsiveWidth(5),
    height: responsiveWidth(5),
    marginLeft: responsiveWidth(3),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popUpMenuTitle: {
    fontWeight: "600",
    fontSize: responsiveFontSize(2),
    marginBottom: responsiveHeight(1),
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButtonText: {
    marginRight: responsiveWidth(32),
  },
});

export default Home;
