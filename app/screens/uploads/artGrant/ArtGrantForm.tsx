import { FontAwesome, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { participantsOptions } from "../../../../Constants";
import { futureDate } from "../../../../helpers";
import { useTranslation } from "../../../hooks/useTranslations";
import { colors } from "../../../theme/colors";
import { grantContesttSyles } from "../../styles/styles";
import { ArtGrantControler } from "./ArtGrantControler";

export const ArtGrantForm = ({ navigation }) => {
  const renderItem = (item) => {
    return (
      <View style={grantContesttSyles.item}>
        <Text style={grantContesttSyles.textItem}>{item.label}</Text>
      </View>
    );
  };
  const { t } = useTranslation();
  const [participants, setParticipants] = useState("Spain");
  const [ageError, setAgeError] = useState(false);
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
    saveGrant,
    state,
    setShowErrors,
    showErrors,
    pickedPdf,
    image,
    pickImage,
    // pickDocument,
    regex,
  } = ArtGrantControler(startDate, endDate, participants);

  // const handleSave = async () => {
  //   const success = await saveGrant(pickedPdf);

  //   if (success) {
  //     await navigation.navigate("SuccesUploadNodetail");
  //   }
  // };
  const handleSave = async () => {
    if (!regex.test(state.weburl)) {
      setShowErrors(true);
      return;
    }
    try {
      const success = await saveGrant(pickedPdf);
      if (success) {
        await navigation.navigate("SuccesUploadNodetail");
      } else {
        console.log(success);
      }
    } catch (error) {
      Alert.alert(error.message);
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

  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
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
    }, 500);

    return () => {
      clearTimeout(debounceRef.current);
    };
  }, [state.minAge, state.maxAge]);

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
        <View style={grantContesttSyles.divided}>
          <Text style={grantContesttSyles.title}>{t("name")}</Text>
          <TextInput
            style={grantContesttSyles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "name")}
            value={state.name}
            placeholder={t("name.placeholder.grant")}
            keyboardType="default"
            
          />
          {showErrors && !state.name ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}
        </View>
        <View style={grantContesttSyles.divided}>
          <Text style={grantContesttSyles.title}>{t("destinty.centre")}</Text>
          <TextInput
            style={grantContesttSyles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "destinyCentre")}
            value={state.destinyCentre}
            placeholder={t("destinty.centre.placeholder")}
            keyboardType="default"
          />
          {showErrors && !state.destinyCentre ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}
        </View>
        <View style={grantContesttSyles.divided}>
          <Text style={grantContesttSyles.title}>
            {t("organization.centre")}
          </Text>
          <TextInput
            style={grantContesttSyles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "organization")}
            value={state.organization}
            placeholder={t("organization.placeholder")}
            keyboardType="default"
          />
          {showErrors && !state.organization ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}
        </View>
        <View style={grantContesttSyles.divided}>
          <Text style={grantContesttSyles.title}>{t("total.granted")}</Text>

          <TextInput
            style={grantContesttSyles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "totalGranted")}
            value={state.totalGranted}
            placeholder={t("total.granted.placeholder")}
            keyboardType="numeric"
          />
          {showErrors && !state.totalGranted ? (
            <Text style={[grantContesttSyles.errors, { marginBottom: 10 }]}>
              {t("error")}
            </Text>
          ) : null}
        </View>
        <View style={grantContesttSyles.divided}>
          <Text style={grantContesttSyles.title}>{t("start.date")}</Text>

          <Pressable onPress={toggleShowPicker}>
            <TextInput
              style={grantContesttSyles.text_intup}
              value={formattedStarDate}
              placeholder={t("start.date.placeholder")}
              editable={false}
            />
          </Pressable>

          {showStartDatePicker ? (
            <DateTimePicker
              mode="date"
              display="calendar"
              value={new Date()}
              onChange={onChangeStartDate}
            />
          ) : null}
          {startDateError ? (
            <Text style={grantContesttSyles.errors}>{t("error.date")}</Text>
          ) : null}
          {showErrors && !state.startDate && !startDate ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}
        </View>
        <View style={grantContesttSyles.divided}>
          <Text style={grantContesttSyles.title}>{t("dead.line")}</Text>
          <Pressable onPress={toggleShowFinishDatePicker}>
            <TextInput
              style={grantContesttSyles.text_intup}
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
            <Text style={grantContesttSyles.errors}>{t("error.date")}</Text>
          ) : null}
          {showErrors && !state.finishDate && !endDate ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}
        </View>
        <View style={grantContesttSyles.divided}>
          <Text style={grantContesttSyles.title}>{t("min.age")}</Text>
          <TextInput
            style={grantContesttSyles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "minAge")}
            value={state.minAge}
            placeholder={t("min.age.placeholder")}
            keyboardType="numeric"
          />
          {ageError ? (
            <Text style={grantContesttSyles.errors}>{t("error.age")}</Text>
          ) : null}
          {showErrors && !state.minAge ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}
        </View>
        <View style={grantContesttSyles.divided}>
          <Text style={grantContesttSyles.title}>{t("max.age")}</Text>
          <TextInput
            style={grantContesttSyles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "maxAge")}
            value={state.maxAge}
            placeholder={t("max.age.placeholder")}
            keyboardType="numeric"
          />
          {ageError ? (
            <Text style={grantContesttSyles.errors}>{t("error.age")}</Text>
          ) : null}
          {showErrors && !state.maxAge ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}
        </View>
        <View style={grantContesttSyles.divided}>
          <Text style={grantContesttSyles.title}>{t("participants")}</Text>
          <Dropdown
            style={grantContesttSyles.dropdown}
            placeholderStyle={grantContesttSyles.placeholderStyle}
            selectedTextStyle={grantContesttSyles.selectedTextStyle}
            inputSearchStyle={grantContesttSyles.inputSearchStyle}
            data={participantsOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={t("select.option")}
            searchPlaceholder="Search..."
            value={state.participants}
            onChange={(item) => {
              setParticipants(item.value);
            }}
            renderItem={renderItem}
          />
          {showErrors && !state.participants ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}
        </View>
        <View style={grantContesttSyles.divided}>
          <Text style={grantContesttSyles.title}>
            {t("work.specifications")}
          </Text>
          <TextInput
            style={[
              grantContesttSyles.text_intup,
              { minHeight: 80, textAlignVertical: "top", paddingTop: 5 },
            ]}
            onChangeText={(value) => handleChangeTex(value, "specifications")}
            value={state.specifications}
            placeholder={t("description.placeholder")}
            keyboardType="default"
          />
          {showErrors && !state.specifications ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}
        </View>
        <View style={[grantContesttSyles.divided, { marginTop: 30 }]}>
          <Text style={grantContesttSyles.title}>{t("terms")}</Text>
          <TextInput
            style={[
              grantContesttSyles.text_intup,
              { minHeight: 80, textAlignVertical: "top", paddingTop: 5 },
            ]}
            onChangeText={(value) => handleChangeTex(value, "terms")}
            value={state.terms}
            placeholder={t("bases.placeholder")}
            keyboardType="default"
          />
          {showErrors && !state.terms ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}
        </View>
        <View style={[grantContesttSyles.divided, { marginTop: 30 }]}>
          <Text style={grantContesttSyles.title}>{t("web.url")}</Text>
          <TextInput
            style={grantContesttSyles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "weburl")}
            value={state.weburl}
            placeholder={t("web.url.placeholder")}
            keyboardType="default"
          />
          {showErrors && !state.weburl ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}
          {showErrors && !regex.test(state.weburl) && (
            <Text style={grantContesttSyles.errors}>{t("error.hmtl")}</Text>
          )}
        </View>
        {/* 
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
        </View> */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
            justifyContent: "flex-end",
          }}
        >
          <Text style={{ color: colors.palette.neutral700, paddingEnd: 8 }}>
            {t("select.promotional.image")}
          </Text>
          <Ionicons
            name="add-circle"
            size={30}
            color={colors.secondary}
            onPress={pickImage}
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
          {showErrors && image === "" ? (
            <Text style={grantContesttSyles.errors}>{t("error.image")}</Text>
          ) : null}
          {image != "" && (
            <>
              <Ionicons
                name="image-outline"
                size={20}
                color={colors.main}
              ></Ionicons>
              <Text
                style={{ color: colors.main, fontWeight: "500", marginLeft: 5 }}
              >
                {t("image.selected")}
              </Text>
            </>
          )}
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
          {pickedPdf && (
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
          )}
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Pressable
          style={grantContesttSyles.publish_button}
          onPress={handleSave}
        >
          <Text style={grantContesttSyles.publis_button_text}>
            {t("publish")}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
