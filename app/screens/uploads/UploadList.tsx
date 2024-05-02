import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
} from "react-native";
import { FlashList } from "@shopify/flash-list";

//En esta vista se tendrá que evaluar
// El tipo de usuario, y dependiendo el tipo se mostrará una lista u otra
export const UploadList = () => {
  const data: string[] = ["Subir concurso / Beca", "Subir proyecto"];

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
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 20,
                marginVertical: 5,
                borderRadius: 5,
                backgroundColor: "#E9E8E8",
              }}
            >
              <Text style={{ color: "#323232", fontWeight: "700" }}>
                {item}
              </Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};
