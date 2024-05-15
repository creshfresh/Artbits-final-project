import {
  View,
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

import { useEffect, useState } from "react";
import { colors } from "../../theme/colors";


export const PorfolioDetail = ({ route }) => {
  const { item } = route.params;
  const welcomeLogo = require("../../../assets/stars.png");
  const [imageSizes, setImageSizes] = useState([]);
  useEffect(() => {
    const calculateImageSizes = async () => {
      const sizes = await Promise.all(item.url.map((uri) => getImageSize(uri)));
      setImageSizes(sizes);
    };

    calculateImageSizes();
  }, [item.url]);

  const getImageSize = (uri) => {
    return new Promise((resolve, reject) => {
      Image.getSize(
        uri,
        (width, height) => {
          const aspectRatio = width / height;
          const imageWidth = Dimensions.get("window").width;
          const imageHeight = imageWidth / aspectRatio;
          resolve({ width: imageWidth, height: imageHeight });
        },
        reject
      );
    });
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <View
          style={{ flexDirection: "row", marginLeft: 10, marginVertical: 7 }}
        >
          <Image
            source={welcomeLogo}
            style={{
              width: 30,
              height: 30,
              backgroundColor: "#FFA5A5",
              resizeMode: "center",
              borderRadius: 30,
            }}
          />
          <Text style={styles.subtitle}>{item.user_id}</Text>
        </View>

        <View></View>
        {item.url.map((url, index) => (
          <View
            key={index}
            style={{ flex: 1, justifyContent: "center", margin: 2 }}
          >
            <Image
              source={{ uri: url }}
              style={{
                width: imageSizes[index]?.width * 0.99 || 0,
                height: imageSizes[index]?.height || 0,
                borderRadius: 10,
                borderColor: "#d35647",
                resizeMode: "cover",
              }}
            />
          </View>
        ))}
      </View>
      <View style={{ marginHorizontal: 12, marginVertical: 20, minHeight:60 }}>
        <Text style={styles.body}>{item.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: 15,
    marginBottom: 3,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: 1.25,
    color: colors.text,
  },
  subtitle: {
    marginHorizontal: 8,
    marginVertical: 5,
    fontSize: 14,
    letterSpacing: 1.25,
    color: colors.text,
  },
  body: {
    fontSize: 14,
    letterSpacing: 1.25,
    color: colors.text,
  },
});
