import React, { useState } from "react";
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
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  useResponsiveWidth,
} from "react-native-responsive-dimensions";

// Import the JSON data
import booksData from "../Data/BookData.json";

const BookDetail = ({ route }) => {
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);
  const books = booksData.booksList;

  // Assuming you want to display the first book in your JSON data
  const { bookId } = route.params
  const firstBook = books[bookId-1];
  const {
    bookAuthor,
    bookTitle,
    borrowedBooks,
    bookStock,
    bookCategory,
    bookRating,
    bookSynopsisContent,
  } = firstBook;

  // Function to split the text into lines
  const splitTextIntoLines = (text) => {
    const words = text.split(" ");
    let lines = [];
    let currentLine = "";

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = testLine.length * responsiveFontSize(3);

      if (testWidth > responsiveWidth(120)) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    return lines;
  };

  const renderedLines = splitTextIntoLines(bookTitle);
  const bookImagePath = "../assets/BookAsset/book1.png";
  const defaultBoxContentHeight = responsiveHeight(43); // Default height

  const [synopsisHeight, setSynopsisHeight] = useState(0);

  // Callback function for the onLayout event to measure the synopsis height
  const onSynopsisLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    console.log("Synopsis Height:", height); // Add this line to log the height
    setSynopsisHeight(height);
  
    // If the height exceeds a certain limit, enable "Read More"
    if (height > responsiveHeight(100)) {
      setShowFullSynopsis(false); // Initially show a truncated version
    } else {
      setShowFullSynopsis(true); // Show the full synopsis
    }
  };

  return (
    <ImageBackground
      source={require("../assets/PublicAsset/defaultBackground.png")}
      style={styles.backgroundImage}
    >
      <ScrollView>
        <View
          style={[
            styles.boxContent,
            { height: defaultBoxContentHeight + synopsisHeight },
          ]}
        >
          <View style={styles.bookCenterContent}>
            <View style={styles.box}>
              <Image source={require(bookImagePath)} style={styles.bookImage} />
            </View>
            <View style={styles.bookInfo}>
              {renderedLines.map((line, index) => (
                <Text key={index} style={styles.bookTitle}>
                  {line}
                </Text>
              ))}
              <Text style={styles.bookAuthor}>{bookAuthor}</Text>
              <View style={styles.bookRating}>
                <Text style={styles.ratingText}>Rating : {bookRating}</Text>
              </View>
              <Text style={styles.bookStock}>
                Stok : {bookStock - borrowedBooks}/{bookStock}
              </Text>
            </View>

            <View style={styles.bookSynopsis} onLayout={onSynopsisLayout}>
              <Text style={styles.bookSynopsisTitle}>Synopsis</Text>
              <View style={styles.bookSynopsisContentContainer}>
                <Text
                  style={styles.bookSynopsisContent}
                  numberOfLines={ 4}
                >
                  {bookSynopsisContent}
                </Text>
                {!showFullSynopsis && (
                  <TouchableOpacity onPress={() => setShowFullSynopsis(true)}>
                    <Text style={styles.readMoreLink}>Read More</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.borrowButton}>
            <Text style={styles.buttonText}>Borrow Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.notifyButton}>
            <Text style={styles.buttonText}>Notify Me</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.emptyArea}></View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  //Background
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  //Book Content
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

    // Shadow properties
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
    marginTop: responsiveHeight(2), // Adjust the marginTop as needed
  },

  bookTitle: {
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
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

  //Button
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: responsiveHeight(2),
  },

  // Borrow Button
  borrowButton: {
    marginLeft: responsiveWidth(2),
    backgroundColor: "#128CFC",
    justifyContent: "center",
    width: responsiveWidth(37),
    height: responsiveHeight(5.8),
    borderRadius: responsiveWidth(2),
  },

  // Notify Button
  notifyButton: {
    marginRight: responsiveWidth(2),
    backgroundColor: "#878D92",
    width: responsiveWidth(37),
    height: responsiveHeight(5.8),
    borderRadius: responsiveWidth(2),
    justifyContent: "center",
  },

  // Button Text
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: responsiveFontSize(2.3),
    textAlign: "center",
    lineHeight: responsiveHeight(5), // Adjust the line height to center vertically
  },

  // Read More Link
  readMoreLink: {
    color: "#128CFC",
    marginTop: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
  },

  //empty Area
  emptyArea: {
    height: responsiveHeight(8),
    // backgroundColor: "#0CB3FA",
  },
});

export default BookDetail;
