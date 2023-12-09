import React from "react";
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
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import booksData from "../Data/BookData.json";

const Home = ({ navigation }) => {
  const booksList = booksData.booksList;

  const renderBookCard = (book) => {
    const { bookId, bookAuthor, bookTitle, bookRating, bookImagePath } = book;

    return (
      <TouchableOpacity
        style={styles.box}
        key={bookId}
        onPress={() =>
          navigation.navigate("Book Details", {
            bookId: bookId,
          })
        }
      >
        <View style={styles.inner}>
          <Image
            style={styles.bookImage}
            source={require("../assets/BookAsset/book1.png")}
          />
        </View>
        <Text style={styles.textJudul} numberOfLines={1}>
          {bookTitle}{" "}
        </Text>
        <Text style={styles.textPenulis}>{bookAuthor}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/PublicAsset/defaultBackground.png")}
        style={styles.backgroundImage}
      >
        <ScrollView>
          {/* Header */}
          <View style={styles.headerContainer}>
            <View style={styles.leftColumn}>
              <Text style={styles.textHello}>Hello</Text>
              <Text style={styles.textName}>Tommy</Text>
            </View>
            <View style={styles.rightColumn}>
              <Image
                style={styles.profileImage}
                source={require("../assets/homeAsset/photoProfile.png")}
              />
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContent}>
            <View style={styles.searchBar}>
              <TouchableOpacity>
                <Image
                  style={styles.searchIcon}
                  source={require("../assets/homeAsset/searchIcon.png")}
                />
              </TouchableOpacity>
              <TextInput style={styles.input} placeholder="Search Books" />
            </View>
            <TouchableOpacity style={styles.sortMenu}>
              <Image
                style={styles.sortIcon}
                source={require("../assets/homeAsset/filterIcon.png")}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.boxContent}>
            {booksList.map((book) => renderBookCard(book))}
          </View>
        </ScrollView>
      <View style={styles.emptyArea}></View>

      </ImageBackground>
    </SafeAreaView>
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

  //header
  headerContainer: {
    marginTop: responsiveHeight(3.5),
    flexDirection: "row", // Horizontally align elements
    height: responsiveHeight(15),
    // backgroundColor: '#00FF00',
  },
  leftColumn: {
    marginVertical: responsiveHeight(5),
    marginHorizontal: responsiveWidth(7),
    flex: 1, // Occupy 1/2 of the row space
    justifyContent: "center", // Vertically center elements
    alignItems: "flex-start", // Align items to the start (left)
  },
  rightColumn: {
    flex: 1, // Occupy 1/2 of the row space
    justifyContent: "center", // Vertically center elements
    alignItems: "flex-end", // Align items to the end (right)
    marginVertical: responsiveHeight(5),
    marginHorizontal: responsiveWidth(7),
  },
  textHello: {
    fontSize: responsiveFontSize(3),
    color: "#7C7C7C",
  },
  textName: {
    fontSize: responsiveFontSize(3.5),
    fontWeight: "bold",
    color: "#000000",
  },
  profileImage: {
    height: responsiveWidth(20),
    width: responsiveWidth(20),
    borderRadius: 50, // To make the image round
  },

  //SearchBar
  searchContent: {
    marginTop: responsiveHeight(2),
    // backgroundColor: '#000000',
    height: responsiveHeight(8),
    flexDirection: "row",
    justifyContent: "center",
  },
  searchBar: {
    flex: 0.75, // Reduce the flex value to make it smaller
    height: responsiveHeight(6),
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
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
        elevation: 5,
      },
    }),
  },
  input: {
    flex: 1,
    marginLeft: responsiveWidth(3),
    fontSize: 20,
  },
  sortMenu: {
    flex: 0.13, // Reduce the flex value to adjust the size
    height: responsiveHeight(6),
    backgroundColor: "#128CFC",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  searchIcon: {
    width: responsiveWidth(5),
    height: responsiveWidth(5),
    marginLeft: responsiveWidth(3),
  },
  sortIcon: {
    width: responsiveWidth(5),
    height: responsiveWidth(5),
  },

  //Book Content
  boxContent: {
    // backgroundColor: '#ff0000',
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: "row",
    padding: 5,
    flexWrap: "wrap",
  },
  box: {
    width: "50%",
    height: responsiveHeight(32),
    padding: 20,
    // backgroundColor: '#ffff00',
  },
  inner: {
    flex: 1,
    borderWidth: responsiveWidth(0.05),
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: responsiveHeight(18),
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
    width: responsiveWidth(25.5),
    borderRadius: responsiveHeight(0.5),
  },
});

export default Home;
