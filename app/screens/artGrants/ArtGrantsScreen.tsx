import { signOut } from "firebase/auth";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { ArtGrantCard } from "../../components/ArtGrantCard";
import { FlashList } from "@shopify/flash-list";
import { colors } from "../../theme/colors";
import { database } from "../../../firebaseConfig";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { ArtGrantScreenControler } from "./ArtGrantScreenControler";

// Para el state, tendré que comprar el finish date con el día de hoy
export const ArtGrantScreen = ({ navigation }) => {

  const data = ArtGrantScreenControler();

  useEffect(() => {
    navigation.setOptions({ tabBarVisible: false });

    return () => {
      navigation.setOptions({ tabBarVisible: true });
    };
  }, []);
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
              navigation.navigate("ArtGrantDetailScreen", { item: item })
            }
          >
            <ArtGrantCard key={item.id} data={item} />
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
