import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "../../hooks/useTranslations";
import { colors } from "../../theme/colors";
import { usePersonStore } from "../../../store/store";

export const UploadList = ({ navigation }) => {
  const { t } = useTranslation();
  const user = usePersonStore((state) => state.user);

  // Definir listas para diferentes roles
  const artistData = [
    t("upload.contest.artGrant"),
    t("upload.project"),
    t("upload.job"),
    t("upload.course"),

  ];

  const companyData = [
    t("upload.job"),
    t("upload.project"),
  ];

  const artAcademyData = [
    t("upload.course"),
    t("upload.project"),
  ];

  // Asignar la lista correcta basada en el rol del usuario
  let data = [];
  if (user.rol === "artist") {
    data = artistData;
  } else if (user.rol === "company") {
    data = companyData;
  } else if (user.rol === "art_academy") {
    data = artAcademyData;
  }

  const handleNavigation = (item) => {
    if (item === t("upload.project"))
      navigation.navigate("ProjectUploadScreen");
    else if (item === t("upload.contest.artGrant"))
      navigation.navigate("ContestArtGrantViewForms");
    else if (item === t("upload.course"))
      navigation.navigate("CourseForm");
    else {
      navigation.navigate("JobFormView");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, padding: 10, marginTop: 10 }}>
        <FlashList
          horizontal={false}
          data={data}
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={300}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <Pressable onPress={() => handleNavigation(item)}>
              <View style={styles.container}>
                <Text style={styles.text}>{item}</Text>
                <Ionicons
                  size={25}
                  name="chevron-forward-outline"
                  color={colors.secondary}
                ></Ionicons>
              </View>
            </Pressable>
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
