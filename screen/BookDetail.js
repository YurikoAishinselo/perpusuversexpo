import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import * as FileSystem from "expo-file-system";

// Import the JSON data
import booksData from "../Data/BookData.json";

const BookDetail = ({ route, navigation }) => {
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);
  const [isBorrowed, setIsBorrowed] = useState(false);
  const [currentStock, setCurrentStock] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const books = booksData.booksList;
  let buttonLeftBackgroundColor, buttonRightBackgroundColor;

  const { bookIds, user_id } = route.params;

  const [bookDetail, setBookDetail] = useState(null);
  const params = {
    book_id: bookIds,
  };

  const apiUrl =
    "https://uvers.ciptainovasidigitalia.com/api/book/get_book_detail?" +
    new URLSearchParams(params);

  useEffect(() => {
    checkIsBorrowed();
  }, []);

  const fetchInfo = async () => {
    {
      try {
        let result = await fetch(apiUrl);
        result = await result.json();
        setBookDetail(result.data.book_lists);
        setCurrentStock(result.data.book_lists.stock);
      } catch (e) {
        console.error("error", e);
      }
    }
  };

  // Assuming you want to display the first book in your JSON data
  const firstBook = books[0];
  const {
    bookAuthor,
    bookTitle,
    borrowedBooks,
    bookStock,
    bookCategory,
    bookRating,
    bookSynopsisContent,
  } = firstBook;

  const bookImagePath = require("../assets/BookAsset/book1.png");

  const checkIsBorrowed = () => {
    const token = "4|0xn174fhroNjEf4auUVWsHCzAfHxsY41enpYGRYG";
    const apiUrlBorrowed =
      "https://uvers.ciptainovasidigitalia.com/api/user/get_book_list";

    fetch(apiUrlBorrowed, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          switch (response.status) {
            case 400:
              throw new Error("Bad Request");
            case 500:
              throw new Error("Bad Server 500");
          }
        }
        return response.json();
      })
      .then((json) => {
        const getUserBorrowedBookDetail = json.data.book_lists.filter(
          (book) => book.pivot.user_id == user_id
        );
        const borrowedBookDetail = getUserBorrowedBookDetail.filter(
          (book) => book.pivot.book_id == bookIds
        );
        if (borrowedBookDetail.length > 0) {
          setIsBorrowed(true);
        } else {
          setIsBorrowed(false);
        }

        fetchInfo();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleBorrowNow = () => {
    if (!isBorrowed) {
      const token = "4|0xn174fhroNjEf4auUVWsHCzAfHxsY41enpYGRYG";
      const apiUrl =
        "https://uvers.ciptainovasidigitalia.com/api/user/borrow_book";
      const params = {
        book_id: bookIds,
      };

      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      })
        .then((response) => {
          if (!response.ok) {
            switch (response.status) {
              case 400:
                Alert.alert("Error", "You have already borrowed this book!");
                throw new Error("Bad Request");
              case 500:
                throw new Error("Bad Server 200");
            }
          }
          return response.json();
        })
        .then((json) => {
          setDownloadUrl(json.data.file_url);
          setIsBorrowed(true);
          setCurrentStock(currentStock - 1);
          setIsDownloading(true);
          downloadFile(downloadUrl);
        })
        .catch((e) => Alert.alert(e));
    } else {
      handleReadNow();
    }
  };

  const handleNotifyMe = () => {
    const token = "4|0xn174fhroNjEf4auUVWsHCzAfHxsY41enpYGRYG";
    const addWishListParams = {
      book_id: bookIds,
    };
    fetch("https://uvers.ciptainovasidigitalia.com/api/user/add_wish_list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(addWishListParams),
    })
      .then((response) => {
        if (!response.ok) {
          switch (response.code) {
            case "400":
              throw new Error("Bad Request 400");
            case "500":
              throw new Error("Invalid token 500");
          }
          Alert.alert(
            "Notification",
            "You have added this book to your wish list!"
          );
        }
      })
      .catch((e) => console.error(e));
  };

  const handleReturn = () => {
    if (isBorrowed) {
      const token = "4|0xn174fhroNjEf4auUVWsHCzAfHxsY41enpYGRYG";
      const apiUrl =
        "https://uvers.ciptainovasidigitalia.com/api/user/return_book";
      const params = {
        book_id: bookIds,
      };

      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      })
        .then((response) => {
          if (!response.ok) {
            switch (response.status) {
              case 400:
                Alert.alert("Error", "You have already returned this book!");
                throw new Error("Bad Request");
              case 200:
                throw new Error("Bad Server 200");
            }
          }
          return response.json();
        })
        .then((json) => {
          setIsBorrowed(false);
          setCurrentStock(currentStock + 1);
          Alert.alert("Success", "You have successfully returned the book");
        })
        .catch((e) => console.error(e));
    } else {
      Alert.alert("Alert", "You haven't borrowed the book yet");
    }
  };

  const handleReadNow = () => {
    if (!isBorrowed) {
      handleBorrowNow();
    } else {
      navigation.navigate("Book", { filePath: bookIds });
    }
  };

  const splitTitleIntoLines = (title, maxCharactersPerLine) => {
    if (title.length <= maxCharactersPerLine) {
      return title;
    }

    const words = title.split(" ");
    let currentLine = "";
    const resultLines = [];

    words.forEach((word) => {
      if (currentLine.length + word.length <= maxCharactersPerLine) {
        currentLine += `${word} `;
      } else {
        resultLines.push(currentLine.trim());
        currentLine = `${word} `;
      }
    });

    resultLines.push(currentLine.trim());

    return resultLines.join("\n");
  };

  const downloadFile = async (downloadUrl) => {
    const fileName = bookIds + ".pdf";
    const fileDownloadPath = FileSystem.documentDirectory + fileName;
    FileSystem.downloadAsync(downloadUrl, fileDownloadPath)
      .then(({ uri }) => {
        setIsDownloading(false);
        Alert.alert(
          "Download successful",
          `Book downloaded successfully in ${uri}`
        );
      })
      .catch((e) => Alert.alert("Error", e));
  };
  return (
    <>
      {bookDetail ? (
        <ImageBackground
          source={require("../assets/PublicAsset/defaultBackground.png")}
          style={styles.backgroundImage}
        >
          <ScrollView>
            <View style={styles.bookCenterContent}>
              <View style={styles.box}>
                <Image source={bookImagePath} style={styles.bookImage} />
              </View>
              <View style={styles.bookInfo}>
                <Text
                  style={
                    splitTitleIntoLines(bookDetail.name, 25).split("\n")
                      .length > 3
                      ? styles.bookTitleSmall
                      : splitTitleIntoLines(bookDetail.name, 25).split("\n")
                          .length > 5
                      ? styles.bookTitleVerySmall
                      : styles.bookTitle
                  }
                  numberOfLines={7}
                  ellipsizeMode="tail"
                >
                  {splitTitleIntoLines(bookTitle, 25)}
                </Text>
                <Text style={styles.bookAuthor}>{bookDetail.author}</Text>
                <View style={styles.bookRating}>
                  <Text style={styles.ratingText}>Rating : {bookRating}</Text>
                </View>
                <Text
                  style={[
                    styles.bookStock,
                    { color: bookDetail.stock > 0 ? "#128CFC" : "#FC1212" },
                  ]}
                >
                  Stok : {currentStock}/{bookStock}
                </Text>
              </View>

              <View style={styles.bookSynopsis}>
                <Text style={styles.bookSynopsisTitle}>Synopsis</Text>
                <View style={styles.bookSynopsisContentContainer}>
                  <Text
                    style={styles.bookSynopsisContent}
                    numberOfLines={showFullSynopsis ? undefined : 4}
                  >
                    {bookDetail.synopsis}
                  </Text>
                  {!showFullSynopsis && (
                    <TouchableOpacity onPress={() => setShowFullSynopsis(true)}>
                      <Text style={styles.readMoreLink}>Read More</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={[
                  styles.borrowButton,
                  {
                    backgroundColor: isBorrowed
                      ? "#4CAF50"
                      : isDownloading
                      ? "#FC7412"
                      : currentStock === 0
                      ? "#878D92"
                      : "#128CFC",
                  },
                ]}
                onPress={() => {
                  if (isBorrowed > 0) {
                    handleReadNow();
                  } else if (currentStock > 0) {
                    // Additional functionality for the "Read Now" button
                    handleBorrowNow();
                  }
                }}
                disabled={bookDetail.stock === 0 && !isBorrowed}
              >
                <Text style={styles.buttonText}>
                  {isBorrowed
                    ? "Read Now"
                    : isDownloading
                    ? "Downloading..."
                    : bookDetail.stock === 0
                    ? "Out of Stock"
                    : "Borrow Now"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.notifyButton,
                  {
                    backgroundColor:
                      bookDetail.stock === 0 && !isBorrowed
                        ? "#128CFC"
                        : isBorrowed
                        ? "#AF1917"
                        : "#878D92",
                  },
                ]}
                onPress={() => {
                  if (isBorrowed) {
                    // Additional functionality for the "Return" button
                    handleReturn();
                  } else {
                    handleNotifyMe();
                  }
                }}
                disabled={!isBorrowed && currentStock > 0}
              >
                <Text style={styles.buttonText}>
                  {isBorrowed ? "Return" : "Notify me"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      ) : (
        <Text>Loading</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  boxContent: {
    marginTop: responsiveHeight(5),
  },
  bookCenterContent: {
    alignItems: "center",
  },
  box: {
    marginTop: responsiveHeight(1),
    width: responsiveWidth(43),
    height: responsiveHeight(26),
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: responsiveWidth(2),
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#000000",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  bookSynopsisContentContainer: {
    marginTop: responsiveHeight(1),
  },
  readMoreLink: {
    color: "#128CFC",
    marginTop: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
  },
  bookImage: {
    height: responsiveHeight(20),
    width: responsiveWidth(30),
    borderRadius: responsiveHeight(1),
  },
  bookInfo: {
    justifyContent: "center",
    marginTop: responsiveHeight(2),
  },
  bookTitle: {
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
    flexWrap: "wrap",
  },
  bookTitleSmall: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
    flexWrap: "wrap",
  },
  bookTitleVerySmall: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
    flexWrap: "wrap",
  },
  bookAuthor: {
    marginTop: responsiveHeight(0.5),
    fontSize: responsiveFontSize(2.5),
    textAlign: "center",
    fontWeight: "bold",
    color: "#878D92",
  },
  bookRating: {
    marginTop: responsiveHeight(0.6),
    alignItems: "center",
  },
  ratingText: {
    fontSize: responsiveFontSize(2),
  },
  bookStock: {
    color: "#128CFC",
    marginTop: responsiveHeight(0.5),
    fontSize: responsiveFontSize(2),
    textAlign: "center",
  },
  bookSynopsis: {
    textAlign: "left",
    padding: responsiveWidth(7),
  },
  bookSynopsisTitle: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: "bold",
  },
  bookSynopsisContent: {
    marginTop: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
    color: "#878D92",
    textAlign: "justify",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: responsiveHeight(3),
  },
  borrowButton: {
    marginLeft: responsiveWidth(2),
    backgroundColor: "#128CFC",
    justifyContent: "center",
    width: responsiveWidth(37),
    height: responsiveHeight(5.8),
    borderRadius: responsiveWidth(2),
  },
  notifyButton: {
    marginRight: responsiveWidth(2),
    backgroundColor: "#878D92",
    width: responsiveWidth(37),
    height: responsiveHeight(5.8),
    borderRadius: responsiveWidth(2),
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: responsiveFontSize(2.3),
    textAlign: "center",
    lineHeight: responsiveHeight(5),
  },
  readMoreLink: {
    color: "#128CFC",
    marginTop: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
  },
  emptyArea: {
    height: responsiveHeight(8),
  },
});

export default BookDetail;
