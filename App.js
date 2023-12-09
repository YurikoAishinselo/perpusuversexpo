import { ImageBackground, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screen/Home";
import BottomNavbar from "./screen/BottomNavbar";
import Login from "./screen/Login";
import BookDetail from "./screen/BookDetail";
import PersonalInformation from "./screen/PersonalInformation";
import ChangePassword from "./screen/ChangePassword";
import History from "./screen/History";
import Wishlist from "./screen/Wishlist";
import Splash from "./screen/Splash";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="BottomNavbar"
          component={BottomNavbar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Book Details" component={BookDetail} />
        <Stack.Screen
          name="Personal Information"
          component={PersonalInformation}
          options={{ headerTitleStyle: { fontSize: responsiveFontSize(3) } }}
        />
        <Stack.Screen
          name="Change Password"
          component={ChangePassword}
          options={{ headerTitleStyle: { fontSize: responsiveFontSize(3) } }}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{ headerTitleStyle: { fontSize: responsiveFontSize(3) } }}
        />
        <Stack.Screen
          name="Wishlist"
          component={Wishlist}
          options={{ headerTitleStyle: { fontSize: responsiveFontSize(3) } }}
        />
      </Stack.Navigator>
    </NavigationContainer>

    // <SafeAreaView>
    //   <Book />
    // </SafeAreaView>
  );
};

export default App;
