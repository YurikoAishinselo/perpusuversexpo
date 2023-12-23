import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import booksData from "../Data/BookData.json";

const MyBook = () => {
  const bearerToken = "4|0xn174fhroNjEf4auUVWsHCzAfHxsY41enpYGRYG";
  const [bookData, setBookData] = useState([]);
  const pageName = "My Books";
  const books = booksData.booksList;

  useEffect(() => {
    fetchMyBook();
  }, []);

  const fetchMyBook = () => {
    fetch("https://uvers.ciptainovasidigitalia.com/api/user/get_book_list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBookData(data.data.book_lists);
      })
      .catch((e) => console.error(e));
  };

  const renderBookCard = (book) => {
    return (
      <View style={styles.bookCard} key={book.id}>
        <View style={styles.bookImagePosition}>
          <Image
            source={require("../assets/BookAsset/book2.png")}
            style={styles.bookImage}
          />
        </View>
        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle}>{book.name}</Text>
          <Text style={styles.bookAuthor}>{book.author}</Text>
          <Text style={styles.bookAuthor}>{book.category}</Text>
          <View style={styles.bookRating}>
            <Image
              source={require("../assets/myBookAsset/ratingStarImage.png")}
              style={styles.ratingStar}
            />
            <View>
              <Text style={styles.ratingText}>5</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require("../assets/PublicAsset/defaultBackground.png")}
      style={styles.backgroundImage}
    >
      <ScrollView>
        <View style={styles.bookContent}>
          {bookData.length > 0 ? (
            bookData.map((book) => renderBookCard(book))
          ) : (
            <Text>You don't have borrowed book!</Text>
          )}
        </View>
        <View style={styles.emptyArea}></View>
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

  // Book Content
  bookContent: {
    marginTop: responsiveHeight(2),
    flex: 1,
    alignSelf: "stretch",
    // backgroundColor: "#ff0000",
    alignItems: "center",
  },

  emptyArea: {
    height: responsiveHeight(3),
  },
  bookCard: {
    flexDirection: "row",
    marginTop: responsiveHeight(3),
    width: responsiveWidth(85),
    height: responsiveHeight(20),
    margin: responsiveWidth(1),
    backgroundColor: "#FFFFFF",
    borderColor: "#000000",
    borderWidth: responsiveWidth(0.05),
    borderRadius: responsiveWidth(2),
    alignItems: "center",
    justifyContent: "center",
  },
  bookImagePosition: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: responsiveWidth(2.5),
    padding: responsiveWidth(2),
  },
  bookImage: {
    borderRadius: responsiveHeight(1),
    height: responsiveHeight(16),
    width: responsiveWidth(23),
  },
  bookInfo: {
    flex: 1,
    marginLeft: responsiveWidth(1.3),
    marginRight: responsiveWidth(2),
  },
  bookTitle: {
    fontSize: responsiveFontSize(2.2),
    marginBottom: responsiveHeight(1),
    fontWeight: "bold",
    color: "#000000",
  },
  bookAuthor: {
    marginTop: responsiveHeight(1),
    fontSize: responsiveFontSize(1.8),
    color: "#000000",
  },
  bookRating: {
    marginTop: responsiveHeight(1),
    flexDirection: "row",
    alignItems: "center",
  },
  ratingStar: {
    width: responsiveHeight(2),
    height: responsiveHeight(2),
    justifyContent: "center",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: responsiveWidth(0.8),
    fontSize: responsiveFontSize(2.1),
  },
});

export default MyBook;
