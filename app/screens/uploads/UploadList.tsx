import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { colors } from "../../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../../hooks/useTranslations";

/*En esta vista se tendrá que evalua
 El tipo de usuario, y dependiendo el tipo se mostrará una lista u otra
 Listas de subir proyecto, beca o concurso
Para los usuarios de academia subir cursos
 y las empresas subir ofertas de trabajo*/
export const UploadList = ({ navigation }) => {
  const { t } = useTranslation();

  const data: string[] = [t("upload.contest.artGrant"), t("upload.project")];

  const handleNavigation = (item) => {
    item === t("upload.project")
      ? navigation.navigate("ProjectUploadScreen")
      : navigation.navigate("ContestArtGrantViewForms");
  };

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
              <Pressable onPress={() => handleNavigation(item)}>
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
