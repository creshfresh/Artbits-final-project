import { useState } from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from "react-native";
import { GalleryCarrousel } from "./Gallery";
import { FlashList } from "@shopify/flash-list";
import { Dimensions } from "react-native";
export const HomeGalleryScreen = () => {
  const welcomeLogo = require("../../../assets/logoPollo_complete.png");
  type ProyectImages = {
    id: number;
    url: string;
  };

  const data: ProyectImages[] = [
    {
      id: 1,
      url: "https://m.media-amazon.com/images/I/81mM+jmQu-L._AC_UF894,1000_QL80_.jpg",
    },
    {
      id: 2,
      url: "https://m.media-amazon.com/images/I/81mM+jmQu-L._AC_UF894,1000_QL80_.jpg",
    },
    {
      id: 3,
      url: "https://m.media-amazon.com/images/I/81mM+jmQu-L._AC_UF894,1000_QL80_.jpg",
    },
    {
      id: 4,
      url: "https://m.media-amazon.com/images/I/81mM+jmQu-L._AC_UF894,1000_QL80_.jpg",
    },
    {
      id: 5,
      url: "https://m.media-amazon.com/images/I/81mM+jmQu-L._AC_UF894,1000_QL80_.jpg",
    },
  ];
  type ViewMode = "Traditional" | "Digital";
  const [viewMode, setViewMode] = useState<ViewMode>("Traditional");
  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[
            styles.switchButton,
            viewMode === "Traditional" ? styles.active : {},
          ]}
          onPress={() => setViewMode("Traditional")}
        >
          <Text style={styles.switchText}>Tradicional</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.switchButton,
            viewMode === "Digital" ? styles.active : {},
          ]}
          onPress={() => setViewMode("Digital")}
        >
          <Text style={styles.switchText}>Digital</Text>
        </TouchableOpacity>
      </View>
      {/* <ScrollView contentContainerStyle={{ flexGrow: 2 }}>
        <FlashList
          data={data}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={300}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{ height: 200, width: Dimensions.get("screen").width }}
            >
              <Image
                source={{ uri: item.url }}
                style={{
                  width: 260,
                  height: 300,
                  backgroundColor: "#d35647",
                  borderWidth: 2,
                  borderRadius: 5,
                  borderColor: "#d35647",
                  resizeMode: "contain",
                }}
              />
            </View>
          )}
        /> 

        <Text>{viewMode} Content</Text>
      </ScrollView>*/}
      <GalleryCarrousel />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  switchButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  active: {
    borderBottomColor: "orange",
  },
  switchText: {
    fontSize: 18,
    fontWeight: "600",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "grey",
  },
});
