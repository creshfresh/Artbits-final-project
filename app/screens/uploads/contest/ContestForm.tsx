import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useTranslation } from "../../../hooks/useTranslations";
import { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import { colors } from "../../../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { ConestControler } from "./ContestControler";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";
import { participantsOptions } from "../../../../Constants";
import { FontAwesome } from "@expo/vector-icons";
import { futureDate } from "../../../../helpers";

export const ContestForm = ({ navigation }) => {
  const { t } = useTranslation();
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  const [participants, setParticipants] = useState("Spain");
  const [ageError, setAgeError] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [startDate, seStartDate] = useState(new Date());
  const [endDateError, setEndDateError] = useState(false);
  const [startDateError, setStartDateError] = useState(false);
  const [showStartDatePicker, setShowDatePicker] = useState(false);
  const [showFinishDatePicker, setShowFinishDatePicker] = useState(false);
  const [formattedStarDate, setFormattedStarDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [endDate, setEndDate] = useState(futureDate);
  const {
    handleChangeTex,
    saveContest,
    state,
    setShowErrors,
    showErrors,
    pickedPdf,
    pickDocument,
  } = ConestControler(startDate, endDate, participants);

  useEffect(() => {
    if (
      state.minAge &&
      state.maxAge &&
      parseInt(state.minAge) >= parseInt(state.maxAge)
    ) {
      setAgeError(true);
      return;
    } else {
      setAgeError(false);
    }
  }, [state.minAge, state.maxAge]);

  const handleSave = async () => {
    const success = await saveContest(pickedPdf);
    console.log(success);
    console.log(state);
    if (success) {
      await navigation.navigate("SuccesUpload");
    }
  };

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate: Date = selectedDate || startDate;
    setShowDatePicker(false);
    const formattedStartDate = currentDate.toLocaleDateString("en-GB");
    setFormattedStarDate(formattedStartDate);
    if (currentDate > endDate) {
      console.log(endDate);
      setStartDateError(true);
      return;
    }
    setStartDateError(false);
    seStartDate(currentDate);
    handleChangeTex(formattedStartDate, "startDate");
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
    setEndDate(currentDate);
    handleChangeTex(formattedDate, "finishDate");
  };

  const toggleShowPicker = () => {
    setShowDatePicker(!showStartDatePicker);
  };
  const toggleShowFinishDatePicker = () => {
    setShowFinishDatePicker(!showFinishDatePicker);
  };
  useEffect(() => {
    onChangeStartDate(null, startDate);
    onChangeEndDate(null, endDate);
  }, [endDate, startDate]);
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
            placeholder={t("name.placeholder.contest")}
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
            <Pressable
              onPress={() => setIsChecked(!isChecked)}
              style={{
                justifyContent: "flex-start",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setIsChecked}
                color={isChecked ? colors.secondary : undefined}
              />
              <Text style={styles.cash_title}>{t("cash.price")}</Text>
            </Pressable>
          </View>
          <TextInput
            style={[
              styles.text_intup,
              styles.cash_texinput,
              !isChecked && { backgroundColor: "#d9d9d9", color: "#b8b8b8" },
            ]}
            onChangeText={(value) => handleChangeTex(value, "totalCash")}
            value={state.totalCash.toString()}
            placeholder={t("cash.price.placeholder")}
            placeholderTextColor={!isChecked ? "#b8b8b8" : colors.text}
            onFocus={() => setShowErrors(false)}
            keyboardType="numeric"
            editable={isChecked}
          />
        </View>
        {showErrors && !state.totalCash && !isChecked ? (
          <Text style={[styles.errors, { marginBottom: 10 }]}>
            {t("error")}
          </Text>
        ) : null}

        <View style={styles.divided}>
          <Text style={styles.title}>{t("start.date")}</Text>

          <Pressable onPress={toggleShowPicker}>
            <TextInput
              style={styles.text_intup}
              value={formattedStarDate}
              placeholder={t("start.date.placeholder")}
              editable={false}
            />
          </Pressable>

          {showStartDatePicker ? (
            <DateTimePicker
              mode="date"
              display="calendar"
              value={startDate}
              onChange={onChangeStartDate}
            />
          ) : null}
          {startDateError ? (
            <Text style={styles.errors}>{t("error.date")}</Text>
          ) : null}
          {showErrors && !state.startDate ? (
            <Text style={styles.errors}>{t("error")}</Text>
          ) : null}
        </View>

        <View style={styles.divided}>
          <Text style={styles.title}>{t("dead.line")}</Text>
          <Pressable onPress={toggleShowFinishDatePicker}>
            <TextInput
              style={styles.text_intup}
              value={formattedDate}
              placeholder={t("dead.line.placeholder")}
              editable={false}
            />
          </Pressable>
          {showFinishDatePicker ? (
            <DateTimePicker
              mode="date"
              display="calendar"
              value={new Date()}
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
          {ageError ? (
            <Text style={styles.errors}>{t("error.age")}</Text>
          ) : null}
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
          {ageError ? (
            <Text style={styles.errors}>{t("error.age")}</Text>
          ) : null}
          {showErrors && !state.maxAge ? (
            <Text style={styles.errors}>{t("error")}</Text>
          ) : null}
        </View>
      </View>
      <View style={styles.divided}>
        <Text style={styles.title}>{t("participants")}</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={participantsOptions}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={t("select.option")}
          searchPlaceholder="Search..."
          value={state.participants}
          onChange={(item) => {
            setParticipants(item.value)
          }}
          renderItem={renderItem}
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
          placeholder={t("work.specifications.placeholder")}
          keyboardType="default"
        />
        {showErrors ? <Text style={styles.errors}>{t("error")}</Text> : null}
      </View>
      <View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("terms")}</Text>
          <TextInput
            multiline={true}
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
          <Text style={styles.title}>{t("object.and.purpose")}</Text>
          <TextInput
            multiline={true}
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "objetive")}
            value={state.objetive}
            placeholder={t("object.and.purpose.placeholder")}
            keyboardType="default"
          />
          {showErrors && !state.objetive ? (
            <Text style={styles.errors}>{t("error")}</Text>
          ) : null}
        </View>
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
          onPress={pickDocument}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
          marginEnd: 5,
          justifyContent: "flex-end",
        }}
      >
        {showErrors && pickedPdf.assets[0].uri === "" ? (
          <Text style={styles.errors}>{t("error.pdf")}</Text>
        ) : (
          pickedPdf &&
          pickedPdf.assets[0].uri.endsWith(".pdf") && (
            <>
              <FontAwesome
                name="file-pdf-o"
                size={20}
                color={colors.main}
              ></FontAwesome>
              <Text
                style={{ color: colors.main, fontWeight: "500", marginLeft: 5 }}
              >
                {t("pdf.selected")}
              </Text>
            </>
          )
        )}
      </View>
      <View
        style={{
          alignItems: "center",
          marginVertical: 10,
        }}
      >
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
  errors: {
    fontSize: 12,
    color: "red",
  },
  placeholderStyle: {
    fontSize: 15,
  },
  dropdown: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#C9C6C6",
    height: 40,
    padding: 5,
    marginTop: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: colors.secondary,
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 15,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
