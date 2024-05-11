import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ToastAndroid,
} from "react-native";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../theme/colors";
import { ArtGrantControler } from "./ArtGrantControler";
import { useTranslation } from "../../../hooks/useTranslations";

export const ArtGrantForm = () => {
  const { t } = useTranslation();
  const { handleChangeTex, saveGrant, state } = ArtGrantControler();
  const handlePressSaveGrant = async () => {
    const success = await saveGrant();
    if (success) {
      ToastAndroid.show("Grant saved successfully!", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(
        "Error occurred while saving grant!",
        ToastAndroid.SHORT
      );
    }
  };
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
            paddingBottom: 20,
          }}
        >
          {t("all.mandatory.field")}
        </Text>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("name")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "name")}
            value={state.name}
            placeholder={t("name.placeholder.grant")}
            keyboardType="default"
          />
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("organization.centre")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "organization")}
            value={state.organization}
            placeholder={t("organization.placeholder")}
            keyboardType="default"
          />
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("total.granted")}</Text>

          <TextInput
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "totalGranted")}
            value={state.totalGranted}
            placeholder={t("total.granted.placeholder")}
            keyboardType="default"
          />
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("start.date")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "startDate")}
            value={state.startDate}
            placeholder={t("start.date.placeholder")}
            keyboardType="default"
          />
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("dead.line")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "finishDate")}
            value={state.finishDate}
            placeholder={t("dead.line.placeholder")}
            keyboardType="default"
          />
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("min.age")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "minAge")}
            value={state.minAge}
            placeholder={t("min.age.placeholder")}
            keyboardType="default"
          />
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("max.age")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "maxAge")}
            value={state.maxAge}
            placeholder={t("max.age.placeholder")}
            keyboardType="default"
          />
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("participants")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "participants")}
            value={state.participants}
            placeholder={t("participants.placeholder")}
            keyboardType="default"
          />
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("work.specifications")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "specifications")}
            value={state.specifications}
            placeholder={t("description.placeholder")}
            keyboardType="default"
          />
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("bases")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "bases")}
            value={state.bases}
            placeholder={t("bases.placeholder")}
            keyboardType="default"
          />
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("cartel")}</Text>
          <TextInput
            style={styles.text_intup}
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
        <Pressable style={styles.publish_button} onPress={handlePressSaveGrant}>
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
  text_intup: {
    marginVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#C9C6C6",
    height: 40,
  },
  divided: {
    paddingBottom: 10,
  },
  container: {
    flex: 1,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },

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
