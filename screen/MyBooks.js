import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import apiUrl from "../Data/ApiUrl";
import imageApiUrl from "../Data/imageApiUrl";
import booksData from "../Data/BookData.json";
import { useFocusEffect } from "@react-navigation/native";

const MyBook = ({ navigation, route }) => {
  const [bookData, setBookData] = useState([]);
  const { user_id, user_token } = route.params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      fetchMyBook();
    });

    return () => {
      focusListener();
    };
  }, [navigation]);

  const fetchMyBook = () => {
    fetch(apiUrl + "user/get_book_list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const getUserBooks = data.data.book_lists.filter(
          (book) => book.pivot.user_id == user_id
        );
        setBookData(getUserBooks);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  const renderBookCard = (book) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Book Details", {
            bookIds: book.id,
            user_id: user_id,
            user_token: user_token,
          });
        }}
      >
        <View style={styles.bookCard} key={book.id}>
          <View style={styles.bookImagePosition}>
            <Image
              source={{
                uri: `${imageApiUrl}storage/${book.cover_path}`,
              }}
              style={styles.bookImage}
            />
          </View>
          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>{book.name}</Text>
            <Text style={styles.bookAuthor}>{book.writer}</Text>
            <Text style={styles.bookAuthor}>
              Dipinjam : {book.pivot.borrow_date}
            </Text>
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
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require("../assets/PublicAsset/defaultBackground.png")}
      style={styles.backgroundImage}
    >
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : bookData.length > 0 ? (
        <ScrollView>
          <View style={styles.bookContent}>
            {bookData.map((book) => renderBookCard(book))}
          </View>
          <View style={styles.emptyArea}></View>
        </ScrollView>
      ) : (
        <Text style={styles.emptyBooksText}>You don't have borrowed book!</Text>
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
  emptyBooksText: {
    alignItems: "center",
    textAlign: "center",
  },
});

export default MyBook;
