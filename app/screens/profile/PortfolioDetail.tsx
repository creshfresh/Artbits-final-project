import { View, Image, StyleSheet, Dimensions, ScrollView,Text } from "react-native";
import { FlashList } from "@shopify/flash-list";

export const PorfolioDetail = ({route}) => {
  /*Este componente renderiza solo las imágenes ptertenecientes a un id de proyecto, de un id de Usuario */
  const { item } = route.params;

  const win = Dimensions.get("window");

  return (
    
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Text>{item.title}</Text>
      <FlashList
        data={item.url}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={500}
        keyExtractor={(url) => url.toString()}
        renderItem={({ item: url }) => (
          <View style={{ flex: 1, justifyContent: "center", margin: 2 }}>
            <Image
              source={{ uri: url }}
              style={{
                flex: 1,
                width: win.width,
                height: 400,
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
