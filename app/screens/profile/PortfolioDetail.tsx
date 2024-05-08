import { View, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
import { DummyData } from "../../../Constants";
import { FlashList } from "@shopify/flash-list";

export const PorfolioDetail = ({route}) => {
  /*Este componente renderiza solo las imágenes ptertenecientes a un id de proyecto, de un id de Usuario */
  const { id } = route.params;

  const win = Dimensions.get("window");

  const filteredData = DummyData.filter((item) => item.id === id);
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <FlashList
        data={filteredData}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={500}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flex: 1, justifyContent: "center", margin: 2 }}>
            <Image
              source={{ uri: item.url[0] }}
              style={{
                flex: 1,
                width: win.width,
                height: win.height,
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
