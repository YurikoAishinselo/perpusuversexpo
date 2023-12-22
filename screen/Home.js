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
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { RadioButton } from "react-native-paper"; // Import RadioButton from react-native-paper

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import booksData from "../Data/BookData.json";

const Home = ({ navigation }) => {
  const [isSortMenuVisible, setIsSortMenuVisible] = useState(false);
  const [sortOption, setSortOption] = useState("Option 1");
  const [searchQuery, setSearchQuery] = useState("");

  const apiUrl =
    "https://uvers.ciptainovasidigitalia.com/api/book/get_book_list";

  const [bookLists, setBookLists] = useState([]);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    {
      try {
        let result = await fetch(apiUrl);
        result = await result.json();
        setBookLists(result.data.book_lists);
      } catch (e) {
        console.error("error", e);
      }
    }
  };

  const handleRadioButtonPress = (value) => {
    setSortOption(value);
  };

  // const booksList = booksData.booksList;

  function renderBookCard(book) {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const lowerCaseTitle = book.name.toLowerCase();
    const lowerCaseAuthor = book.author.toLowerCase();
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
          {book.name}{" "}
        </Text>
        <Text style={styles.textPenulis}>{book.author}</Text>
      </TouchableOpacity>
    );
  }

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
            <TouchableOpacity
              style={styles.rightColumn}
              onPress={() => navigation.navigate("Personal Information")}
            >
              <Image
                style={styles.profileImage}
                source={require("../assets/homeAsset/photoProfile.png")}
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
            <TouchableOpacity
              style={styles.sortMenu}
              onPress={() => setIsSortMenuVisible(true)}
            >
              <Image
                style={styles.sortIcon}
                source={require("../assets/homeAsset/filterIcon.png")}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.boxContent}>
            {bookLists && bookLists.length > 0 ? (
              bookLists.map((book) => renderBookCard(book))
            ) : (
              <Text>Loading</Text>
            )}
          </View>
        </ScrollView>
        <View style={styles.emptyArea}></View>
      </ImageBackground>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isSortMenuVisible}
        onRequestClose={() => setIsSortMenuVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsSortMenuVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.sortMenuContainer}>
          <Text style={styles.popUpMenuTitle}>Sort Options:</Text>
          <RadioButton.Group
            onValueChange={handleRadioButtonPress}
            value={sortOption}
          >
            <View style={styles.radioButtonContainer}>
              <Text style={styles.radioButtonText}>Option 1</Text>
              <RadioButton value="Option 1" />
            </View>
            <View style={styles.radioButtonContainer}>
              <Text style={styles.radioButtonText}>Option 2</Text>
              <RadioButton value="Option 2" />
            </View>
          </RadioButton.Group>
        </View>
      </Modal>
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
    marginTop: responsiveHeight(2),
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
    alignSelf: "stretch",
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
    borderRadius: responsiveHeight(1.5),
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

  // Pop up menu
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
