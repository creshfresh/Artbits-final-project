import { useEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { Card } from "../../components/Card";
import { ScrollView } from "react-native";
import { ContesteViewControler } from "./ContestScreenControler";
import { FlashList } from "@shopify/flash-list";

// Aqui coger todos los concursos de toda la aplicación

export const ContestScreen = ({ navigation }) => {
  const data = ContesteViewControler();

  useEffect(() => {
    navigation.setOptions({ tabBarVisible: false });

    return () => {
      navigation.setOptions({ tabBarVisible: true });
    };
  }, []);

  // Esta función recibe todos los datos de los concursos
  //TODO: implementar filtros

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* <ScrollView>
        {data.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </ScrollView> */}
      <FlashList
        data={data}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={Dimensions.get("window").width}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flex: 1, margin: 2 }}>
            <Pressable
              onPress={() =>
                navigation.navigate("ContestDetailScreen", { item: item })
              }
            >
              <Card key={item.id} data={item} />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
