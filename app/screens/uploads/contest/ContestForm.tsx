import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useTranslation } from "../../../hooks/useTranslations";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import { colors } from "../../../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";

export const ContestForm = () => {
  const { t } = useTranslation();
  const [isChecked, setChecked] = useState(false);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "transparent" }}
    >
      <View style={{ flexDirection: "column" }}>
      <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              color: colors.secondary,
              paddingBottom:20
            }}
          >
            {t("all.mandatory.field")}</Text>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("name")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={() => {}}
            placeholder={t("name.placeholder.contest")}
            keyboardType="default"
          />
        </View>

        <View style={styles.divided}>
          <Text style={styles.title}>{t("organization.centre")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={() => {}}
            placeholder={t("organization.placeholder")}
            keyboardType="default"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <View
            style={{
              justifyContent: "flex-start",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? colors.secondary : undefined}
            />
            <Text style={styles.cash_title}>{t("cash.price")}</Text>
          </View>
          <TextInput
            style={[styles.text_intup, styles.cash_texinput]}
            onChangeText={() => {}}
            placeholder={t("cash.price.placeholder")}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.divided}>
          <Text style={styles.title}>{t("start.date")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={() => {}}
            placeholder={t("start.date.placeholder")}
            keyboardType="default"
          />
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("dead.line")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={() => {}}
            placeholder={t("dead.line.placeholder")}
            keyboardType="default"
          />
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("min.age")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={() => {}}
            placeholder={t("min.age.placeholder")}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("max.age")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={() => {}}
            placeholder={t("max.age.placeholder")}
            keyboardType="numeric"          />
        </View>
      </View>
      <View style={styles.divided}>
        <Text style={styles.title}>{t("participants")}</Text>
        <TextInput
          style={styles.text_intup}
          onChangeText={() => {}}
          placeholder={t("participants.placeholder")}
          keyboardType="default"
        />
      </View>
      <View style={styles.divided}>
        <Text style={styles.title}>{t("work.specifications")}</Text>
        <TextInput
          style={styles.text_intup}
          onChangeText={() => {}}
          placeholder={t("work.specifications.placeholder")}
          keyboardType="numeric"        />
      </View>
      <View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("bases")}</Text>
          <TextInput
            multiline= {true}
            style={styles.text_intup}
            onChangeText={() => {}}
            placeholder={t("bases.placeholder")}
            keyboardType="default"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
            justifyContent: "flex-end",
          }}
        >
          <Text style={{ color: colors.palette.neutral700, paddingEnd: 8 }}>
            {t("add.offical.bases")}
          </Text>

          <Ionicons
            name="add-circle"
            size={30}
            color={colors.secondary}
            onPress={() => {
              console.log("añadir bases");
            }}
          />
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        {/* Si los campos obligatorios no están cumplidos, que el botón esté desactivado */}
        <Pressable style={styles.publish_button}>
          <Text style={styles.publis_button_text}>{t("publish")}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    letterSpacing: 1,
    fontWeight: "700",
    color: colors.text,
  },
  divided: {
    paddingBottom: 10,
  },
  text_intup: {
    marginVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#C9C6C6",
    height: 40,
  },
  container: {
    flex: 1,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
  },
  cash_texinput: {
    width: "50%",
  },
  cash_title: { fontSize: 14, letterSpacing: 1 },
  publish_button: {
    display: "flex",
    height: 45,
    borderRadius: 30,
    width: "90%",
    paddingHorizontal: 40,
    justifyContent: "center",
    backgroundColor: colors.main,
  },
  publis_button_text: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1.25,
  },

});
