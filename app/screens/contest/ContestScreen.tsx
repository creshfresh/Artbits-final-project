import { FlashList } from "@shopify/flash-list";
import { useEffect } from "react";
import {
  StyleSheet,
  View
} from "react-native";
import { Card } from "../../components/Card";
import {ContesteViewControler} from "./ContestScreenControler"

// Aqui coger todos los concursos de toda la aplicación


export const ContestScreen = ({ navigation }) => {
  
  const data = ContesteViewControler()
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
        data={data}
        estimatedItemSize={200}
        renderItem={({ item }) => <Card data={item} />}
      ></FlashList>
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
