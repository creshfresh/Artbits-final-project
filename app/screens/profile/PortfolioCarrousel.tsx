import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import { FlashList } from "@shopify/flash-list";

type ProyectImages = {
  id: number;
  type: string;
  url: string;
};

const data: ProyectImages[] = [
  {
    id: 1,
    type: "Traditional",
    url: "https://cdnb.artstation.com/p/assets/images/images/012/782/743/large/bryan-lee-model2.jpg?1536508745",
  },
  {
    id: 2,
    type: "Digital",
    url: "https://cdnb.artstation.com/p/assets/images/images/012/782/765/large/bryan-lee-figure1.jpg?1536508798",
  },
  {
    id: 3,
    type: "Digital",
    url: "https://www.aspca.org/sites/default/files/catblogbanner.jpg",
  },
  {
    id: 4,
    type: "Digital",
    url: "https://www.aspca.org/sites/default/files/catblogbanner.jpg",
  },
  {
    id: 5,
    type: "Digital",
    url: "https://www.aspca.org/sites/default/files/catblogbanner.jpg",
  },
  {
    id: 6,
    type: "Traditional",
    url: "https://m.media-amazon.com/images/I/81mM+jmQu-L._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: 7,
    type: "Traditional",
    url: "https://m.media-amazon.com/images/I/81mM+jmQu-L._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: 8,
    type: "Traditional",
    url: "https://m.media-amazon.com/images/I/81mM+jmQu-L._AC_UF894,1000_QL80_.jpg",
  },
];
export const ProfolioCarrousel = ({ navigation }) => {
  //   const filteredData = data.filter((item) => item.type === viewMode);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <FlashList
        data={data}
        numColumns={2}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={Dimensions.get("window").width / 2 - 20}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flex: 1, margin: 2 }}>
            <Pressable onPress={()=>navigation.navigate("PorfolioDetail")}>
              <Image
                source={{ uri: item.url }}
                style={{
                  width: "100%",
                  minHeight: 200,
                  borderRadius: 10,
                  borderColor: "#d35647",
                  resizeMode: "cover",
                }}
              />
            </Pressable>
          </View>
        )}
      />
    </ScrollView>
  );
};
