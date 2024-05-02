import { View, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
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
    url: "https://m.media-amazon.com/images/I/81mM+jmQu-L._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: 2,
    type: "Digital",
    url: "https://www.aspca.org/sites/default/files/catblogbanner.jpg",
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
export const GalleryCarrousel = ({ viewMode }) => {
  const getItemCount = (datas) => 1000; // Simular muchas imágenes
  const getItem = (datas, index) => datas[index % data.length];
  const filteredData = data.filter((item) => item.type === viewMode);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <FlashList
        data={filteredData}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={300}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: 8, marginVertical: 2 }}>
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
          </View>
        )}
      />
    </ScrollView>
  );
};
