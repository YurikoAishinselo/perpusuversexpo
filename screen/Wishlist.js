import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const Wishlist = ({ navigation, route }) => {
  const token = "4|0xn174fhroNjEf4auUVWsHCzAfHxsY41enpYGRYG";
  const { user_id } = route.params;
  const [myWishList, setMyWishList] = useState([]);
  const [bookDetails, setBookDetails] = useState(null);

  const fetchWishList = () => {
    fetch("https://uvers.ciptainovasidigitalia.com/api/user/get_wish_list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          switch (response.status) {
            case "400":
              throw new Error("Bad request");
            case "401":
              throw new Error("Not Authorized");
            case "500":
              throw new Error("Missing token");
          }
        }
        return response.json();
      })
      .then((json) => {
        const getUserWishList = json.data.wish_lists.filter(
          (book) => book.user_id == user_id
        );

        getUserWishList.map((book) => {
          fetchBookDetails(book.book_id).then((data) => {
            const mergedBook = { ...book, ...data };
            setMyWishList((prevWishList) => [...prevWishList, mergedBook]);
          });
        });
        console.log("myWishList", myWishList);
      })
      .catch((e) => console.error(e));
  };

  const fetchBookDetails = async (book_id) => {
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

  useEffect(() => {
    fetchWishList();
  }, []);

  const handleBookPress = (book_id) => {
    if (bookDetails !== null) {
      navigation.navigate("Book Details", { bookId: book_id });
    }
  };

  return (
    <ImageBackground
      source={require("../assets/PublicAsset/defaultBackground.png")}
      style={styles.backgroundImage}
    >
      <ScrollView>
        <View style={styles.boxContent}>
          {myWishList.length > 0 ? (
            myWishList.map((book) => {
              return (
                <TouchableOpacity
                  key={book.book_id}
                  style={styles.box}
                  onPress={() => {
                    handleBookPress(book.book_id);
                  }}
                >
                  <View style={styles.inner}>
                    <Image
                      style={styles.bookImage}
                      source={require("../assets/BookAsset/book1.png")}
                    />
                  </View>
                  <Text style={styles.textJudul} numberOfLines={1}>
                    {book === null ? "Loading..." : book.name}{" "}
                  </Text>
                  <Text style={styles.textPenulis}>
                    {book === null ? "Loading..." : book.author}
                  </Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text>No Wishlist</Text>
          )}
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
    borderRadius: responsiveHeight(0.8),
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
