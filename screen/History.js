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

const History = ({ route }) => {
  const { user_id } = route.params;
  const historyBooks = booksData.borrowingHistoryBook;
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = () => {
    const token = "4|0xn174fhroNjEf4auUVWsHCzAfHxsY41enpYGRYG";
    fetch("https://uvers.ciptainovasidigitalia.com/api/user/get_history", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const getUserHistory = data.data.history_lists.filter(
          (history) => history.user_id == user_id
        );

        getUserHistory.map((history) => {
          fetchBookDetails(history.book_id).then((data) => {
            const mergedBook = { ...history, ...data };
            setHistory((prevWishList) => [...prevWishList, mergedBook]);
          });
        });
      });
  };

  const fetchBookDetails = (book_id) => {
    const params = { book_id: book_id };
    const apiUrl =
      "https://uvers.ciptainovasidigitalia.com/api/book/get_book_detail?" +
      new URLSearchParams(params);
    return new Promise((resolve, reject) => {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          resolve(data.data.book_lists);
        })
        .catch((error) => {
          console.error("Error fetching book details:", error);
          reject(error);
        });
    });
  };

  const renderBookCard = (book) => {
    return (
      <View style={styles.bookCard} key={book.bookId}>
        <View style={styles.bookImagePosition}>
          <Image
            source={require("../assets/BookAsset/book1.png")}
            style={styles.bookImage}
          />
        </View>
        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle}>{book.name}</Text>
          <Text style={styles.bookAuthor} numberOfLines={2}>
            {book.author}
          </Text>
          <Text style={styles.borrowingDate}>
            Dipinjam: {book.borrowed_date}
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
    );
  };

  return (
    <ImageBackground
      source={require("../assets/PublicAsset/defaultBackground.png")}
      style={styles.backgroundImage}
    >
      <ScrollView>
        <View style={styles.bookContent}>
          {history.length > 0 ? (
            history.map((book) => renderBookCard(book))
          ) : (
            <Text>You don't have borrowing history</Text>
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
    alignItems: "center",
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
    color: "#878D92",
    fontWeight: "bold",
  },
  borrowingDate: {
    marginTop: responsiveHeight(1),
    fontSize: responsiveFontSize(1.6),
    color: "#878D92",
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
  emptyArea: {
    height: responsiveHeight(5),
  },
});

export default History;
