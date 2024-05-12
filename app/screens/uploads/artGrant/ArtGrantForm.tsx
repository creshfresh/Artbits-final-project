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
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

export const ArtGrantForm = ({ navigation }) => {
  const { t } = useTranslation();
  const [startDate, seStartDate] = useState(new Date());
  const [endDate, seEndDate] = useState(new Date());
  const [endDateError, setEndDateError] = useState(false);
  const [endStartDateError, setStartDateError] = useState(false);
  const [showStartDatePicker, setShowDatePicker] = useState(false);
  const [showFinishDatePicker, setShowFinishDatePicker] = useState(false);
  const [formattedStarDate, setFormattedStarDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("");

  const { handleChangeTex, saveGrant, state, setShowErrors, showErrors } =
    ArtGrantControler(startDate, endDate);
  const handleSave = async () => {
    const success = await saveGrant();
    console.log(success);
    console.log(state);
    if (success) {
      await navigation.navigate("SuccesUpload");
    }
  };
  const onChangeStartDate = (event, selectedDate) => {
    const currentDate: Date = selectedDate || startDate;
    setShowDatePicker(false);
    const formattedStarDate = currentDate.toLocaleDateString("en-GB");
    setFormattedStarDate(formattedStarDate);

    seStartDate(currentDate);
    handleChangeTex(formattedStarDate, "startDate");
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate: Date = selectedDate || endDate;
    setShowFinishDatePicker(false);
    const formattedDate = currentDate.toLocaleDateString("en-GB");
    setFormattedDate(formattedDate);

    if (currentDate < startDate) {
      setEndDateError(true);
      return;
    }
    setEndDateError(false);
    seEndDate(currentDate);
    handleChangeTex(formattedDate, "finishDate");
  };

  const toggleShowPicker = () => {
    setShowDatePicker(!showStartDatePicker);
  };
  const toggleShowFinishDatePicker = () => {
    setShowFinishDatePicker(!showFinishDatePicker);
  };
  const handlePressSaveGrant = async () => {
    const success = await saveGrant();
    if (success) {
      await navigation.navigate("SuccesUpload");
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
            onFocus={() => setShowErrors(false)}
          />
          {showErrors && !state.name ? (
            <Text style={styles.errors}>{t("error")}</Text>
          ) : null}
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("organization.centre")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "organization")}
            value={state.organization}
            placeholder={t("organization.placeholder")}
            onFocus={() => setShowErrors(false)}
            keyboardType="default"
          />
          {showErrors && !state.organization ? (
            <Text style={styles.errors}>{t("error")}</Text>
          ) : null}
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("total.granted")}</Text>

          <TextInput
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "totalGranted")}
            value={state.totalGranted}
            placeholder={t("total.granted.placeholder")}
            keyboardType="numeric"
          />
          {showErrors && !state.totalGranted ? (
            <Text style={[styles.errors, { marginBottom: 10 }]}>
              {t("error")}
            </Text>
          ) : null}
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("start.date")}</Text>
          <Pressable onPress={toggleShowPicker}>
            <TextInput
              style={styles.text_intup}
              value={formattedStarDate}
              placeholder={t("start.date.placeholder")}
              editable={false}
            />

            {showStartDatePicker ? (
              <DateTimePicker
                mode="date"
                display="calendar"
                value={startDate}
                onChange={onChangeStartDate}
              />
            ) : null}
            {showErrors && !state.startDate ? (
              <Text style={styles.errors}>{t("error")}</Text>
            ) : null}
          </Pressable>
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("dead.line")}</Text>
          <Pressable onPress={toggleShowFinishDatePicker}>
            <TextInput
              style={styles.text_intup}
              value={formattedDate}
              editable={false}

              placeholder={t("dead.line.placeholder")}
              keyboardType="default"
              
            />
          </Pressable>
          {showFinishDatePicker ? (
            <DateTimePicker
              mode="date"
              display="calendar"
              value={endDate}
              onChange={onChangeEndDate}
            />
          ) : null}
          {endDateError ? (
            <Text style={styles.errors}>{t("error.date")}</Text>
          ) : null}
          {showErrors && !state.finishDate ? (
            <Text style={styles.errors}>{t("error")}</Text>
          ) : null}
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("min.age")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "minAge")}
            value={state.minAge}
            placeholder={t("min.age.placeholder")}
            keyboardType="numeric"
          />
          {showErrors && !state.minAge ? (
            <Text style={styles.errors}>{t("error")}</Text>
          ) : null}
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("max.age")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "maxAge")}
            value={state.maxAge}
            placeholder={t("max.age.placeholder")}
            keyboardType="numeric"
          />
          {showErrors && !state.maxAge ? (
            <Text style={styles.errors}>{t("error")}</Text>
          ) : null}
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
          {showErrors && !state.participants ? (
            <Text style={styles.errors}>{t("error")}</Text>
          ) : null}
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
          {showErrors && !state.specifications ?  <Text style={styles.errors}>{t("error")}</Text> : null}
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("terms")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "terms")}
            value={state.terms}
            placeholder={t("bases.placeholder")}
            keyboardType="default"
          />
          {showErrors && !state.terms ? (
            <Text style={styles.errors}>{t("error")}</Text>
          ) : null}
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
        <Pressable style={styles.publish_button} onPress={handleSave}>
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
  errors: {
    fontSize: 12,
    color: "red",
  },
});
