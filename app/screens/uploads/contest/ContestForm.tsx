import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useTranslation } from "../../../hooks/useTranslations";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import { colors } from "../../../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { ConestControler } from "./ContestControler";
import DateTimePicker from "@react-native-community/datetimepicker";

export const ContestForm = ({ navigation }) => {

  const { t } = useTranslation();
  const [isChecked, setIsChecked] = useState(false);
  const [startDate, seStartDate] = useState(new Date());
  const [endDate, seEndDate] = useState(new Date());
  const [endDateError, setEndDateError] = useState(false); 
  const [showStartDatePicker, setShowDatePicker] = useState(false);
  const [showFinishDatePicker, setShowFinishDatePicker] = useState(false);
  const [formattedStarDate, setFormattedStarDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("");

  const { handleChangeTex, saveContest, state, setShowErrors, showErrors } =
    ConestControler(startDate, endDate);

    const handleSave = async () => {
      const success = await saveContest(); 
      console.log(success)
      console.log(state)
      if (success) {
        await navigation.navigate("SuccesUpload");
      }
    };
  const onChangeStartDate = (event, selectedDate) => {
    const currentDate: Date = selectedDate || startDate;
    setShowDatePicker(false);
    seStartDate(currentDate);
    const formattedStarDate = currentDate.toLocaleDateString("en-GB");
    setFormattedStarDate(formattedStarDate);
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
        {showErrors && !state.totalCash && !isChecked? (
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
        {showErrors && !state.participants ? <Text style={styles.errors}>{t("error")}</Text> : null}
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
          {showErrors && !state.terms? <Text style={styles.errors}>{t("error")}</Text> : null}
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("object.and.pourpose")}</Text>
          <TextInput
            multiline={true}
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "objetive")}
            value={state.objetive}
            placeholder={t("object.and.pourpose.placeholder")}
            keyboardType="default"
          />
          {showErrors && !state.objetive ?<Text style={styles.errors}>{t("error")}</Text> : null}
        </View>
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
            justifyContent: "flex-end",
          }}
        > */}
        <View style={styles.divided}>
          <Text style={styles.title}>{t("url.bases")}</Text>
          <TextInput
            multiline={true}
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "urlbases")}
            value={state.urlbases}
            placeholder={t("url.bases.placeholder")}
            keyboardType="default"
          />
          {showErrors && !state.terms ? (
            <Text style={styles.errors}>{t("error")}</Text>
          ) : null}
          {/* </View> */}
          {/* <Ionicons
            name="add-circle"
            size={30}
            color={colors.secondary}
            onPress={pickSomething}
          /> */}
        </View>
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
});
