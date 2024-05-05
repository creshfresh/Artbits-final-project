import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { FlashList } from "@shopify/flash-list";
import { Card } from "../../components/Card";
import { colors } from "../../theme/colors";

export const FlatListContestInternships = ({ navigation }) => {
  const data: string[] = ["Concursos ", "Becas"];
  const handleNavigation = (item) => {
    console.log(item);
    item === "Becas"
      ? navigation.navigate("ArtGrantScreen")
      : navigation.navigate("ContestScreen");
  };
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlashList
        horizontal={false}
        data={data}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={300}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Text style={styles.text}>{item}</Text>
            <Pressable
              onPress={() =>
                handleNavigation(item)
              }>
              <Ionicons
                size={25}
                name="chevron-forward-outline"
                color={colors.secondary}
              ></Ionicons>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "#E9E8E8",
    justifyContent: "space-between",
  },
  text: {
    color: "#323232",
    fontWeight: "600",
    fontSize: 16,
  },
});
