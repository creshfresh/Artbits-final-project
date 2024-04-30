import { View, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
import { FlashList } from "@shopify/flash-list";

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
export const GalleryCarrousel = () => {
  const getItemCount = (datas) => 1000; // Simular muchas imágenes
  const getItem = (datas, index) => datas[index % data.length];

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <FlashList
        data={data}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={300}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: 8, marginVertical: 2 }}>
            <Image
              source={{ uri: item.url }}
              style={{
                width: 200,
                height: 200,
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
