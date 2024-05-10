import { useState } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { colors } from "../../theme/colors";

import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../../hooks/useTranslations";

export const ContestArtGrantViewForms = () => {
  const [lng, setLng] = useState("en");

  const { t, changeLanguage, getCurrentLocale } = useTranslation();
  const handleTranslation = () => {
   changeLanguage(getCurrentLocale() === "en" ? "es" :"en");
  };

  type ViewMode = "Beca" | "Concurso";
  const [viewMode, setViewMode] = useState<ViewMode>("Beca");
  return (
    <View
      style={{
        display: "flex",
        marginTop: 60,
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 10,
      }}
    >
      <Pressable
        style={[
          styles.switchButtonRight,
          viewMode === "Concurso" ? styles.active : styles.inactive,
        ]}
        onPress={() => {
          {
            setViewMode("Concurso");
            console.log(viewMode);
          }
        }}
      >
        <Text
          style={
            (styles.switchButtonRight,
            viewMode === "Beca"
              ? styles.switchTextActive
              : styles.switchTextinactive)
          }
        >
          {t("contest")}
        </Text>
      </Pressable>

      <Pressable
        style={[
          styles.switchButtonLeft,
          viewMode === "Beca" ? styles.active : styles.inactive,
        ]}
        onPress={() => {
          {
            setViewMode("Beca");
            console.log(viewMode);
          }
        }}
      >
        <Text
          style={
            (styles.switchButtonLeft,
            viewMode === "Concurso"
              ? styles.switchTextActive
              : styles.switchTextinactive)
          }
        >
          Beca
        </Text>
      </Pressable>

      <Ionicons
        name="globe-outline"
        size={25}
        color={colors.secondary}
        onPress={handleTranslation}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    margin: 10,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5,
  },
  switchButtonRight: {
    alignItems: "center",
    borderTopStartRadius: 30,
    borderBottomStartRadius: 30,
    justifyContent: "center",
    height: 40,
    borderWidth: 2,
    width: "auto",
    marginEnd: -1,
    borderColor: "#323232",
    paddingHorizontal: 35,
  },
  switchButtonLeft: {
    alignItems: "center",
    borderTopEndRadius: 30,
    borderBottomEndRadius: 30,
    justifyContent: "center",
    height: 40,
    marginStart: -1,
    borderWidth: 2,
    borderColor: "#323232",
    paddingHorizontal: 35,
  },
  active: {
    backgroundColor: colors.contest,
  },
  inactive: {
    backgroundColor: colors.transparent,
  },
  switchTextActive: {
    fontSize: 14,
    fontWeight: "600",
  },
  switchTextinactive: {
    fontSize: 14,
    color: "#323232",
    fontWeight: "400",
  },
});
