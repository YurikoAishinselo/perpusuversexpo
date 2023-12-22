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
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import booksData from "../Data/BookData.json";

const Wishlist = ({ navigation }) => {
  const booksList = booksData.WishlistBook;

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
    <ImageBackground
      source={require("../assets/PublicAsset/defaultBackground.png")}
      style={styles.backgroundImage}
    >
      <ScrollView>
        <View style={styles.boxContent}>
          {booksList.map((book) => renderBookCard(book))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  emptyArea: {
    backgroundColor: "#ff0000",
    height: responsiveHeight(5),
  },

  //Book Content
  boxContent: {
    flex: 1,
    alignSelf: "stretch",
    flexDirection: "row",
    padding: 5,
    flexWrap: "wrap",
  },
  box: {
    width: "50%",
    height: responsiveHeight(33),
    padding: 20,
    // backgroundColor: '#ffff00',
  },
  inner: {
    flex: 1,
    borderWidth: responsiveWidth(0.05),
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: responsiveHeight(1),
    width: responsiveWidth(38),
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
    height: responsiveHeight(17),
    width: responsiveWidth(28),
    borderRadius: responsiveHeight(0.5),
  },
});

export default Wishlist;
