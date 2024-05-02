import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { FlashList } from "@shopify/flash-list";
import { colors } from "../../theme/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card } from "../../components/Card";

export const FlatListContestInternships = () => {
  const data: string[] = ["Concursos ", "Becas"];

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
              <TouchableOpacity onPress={() => console.log("Holi")}>
                <Ionicons
                  size={25}
                  name="chevron-forward-outline"
                  color={colors.secondary}
                ></Ionicons>
              </TouchableOpacity>
            </View>
          )}
        />
        <Card />
      </View>
    </ScrollView>
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
