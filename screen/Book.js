import React from "react";
import { Dimensions, Text, View } from "react-native";
import Pdf from "react-native-pdf";
import * as FileSystem from "expo-file-system";
import { usePreventScreenCapture } from "expo-screen-capture";
function Book({ route }) {
  usePreventScreenCapture();
  const { filePath } = route.params;
  const fileDirectory = FileSystem.documentDirectory;
  const onlineSource = {
    uri: `${fileDirectory}${filePath}.pdf`,
    cache: true,
  };
  console.log(onlineSource.uri);

  return (
    <View style={{ flex: 1 }}>
      <Pdf
        source={onlineSource}
        trustAllCerts={false}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={{
          flex: 1,
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
      />
    </View>
  );
}

export default Book;
