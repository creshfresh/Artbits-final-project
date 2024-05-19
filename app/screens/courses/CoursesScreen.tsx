import { FlashList } from "@shopify/flash-list";
import React, { useEffect } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { CourseCard } from "../../components/CourseCard";
import { CourseScreenControler } from "./CourseScreenControler";

export const CoursesScreen = ({ navigation }) => {
  const data = CourseScreenControler();

  useEffect(() => {
    navigation.setOptions({ tabBarVisible: false });

    return () => {
      navigation.setOptions({ tabBarVisible: true });
    };
  }, []);
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlashList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={Dimensions.get("window").width}
        data={data}
        renderItem={({ item }) => (
          <View style={{ flex: 1, margin: 2 }}>
            <Pressable
              onPress={() =>
                navigation.navigate("CoursesDetailScreen", { item: item })
              }
            >
              <CourseCard key={item.id} data={item} />
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
