import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ToastAndroid,
} from "react-native";
import { useTranslation } from "../../../hooks/useTranslations";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import { colors } from "../../../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { JobControler } from "./JobControler";
import { Dropdown } from "react-native-element-dropdown";
import { ContracTypeOptions, WorkModelOptions, WorkingHoursOptions } from "../../../../Constants";
import { grantContesttSyles } from "../../styles/styles";

export const JobFormView = ({ navigation }) => {

  const renderItem = (item) => {
    return (
      <View style={grantContesttSyles.item}>
        <Text style={grantContesttSyles.textItem}>{item.label}</Text>
      </View>
    );
  };
  const { t } = useTranslation();
  
  const [isChecked, setChecked] = useState(false);
  const { handleChangeTex, saveJob, state } = JobControler();
  const handlePressSaveGrant = async () => {
    const success = await saveJob();
    if (success) {
      ToastAndroid.show(" successfully!", ToastAndroid.SHORT);
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
      <View style={{ flexDirection: "column", padding: 15 }}>
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
        <Text style={styles.mainTitle}>{t("basic.information")}</Text>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("position.name")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "name")}
            value={state.name}
            placeholder={t("basic.information")}
            keyboardType="default"
          />
        </View>

        <View style={styles.divided}>
          <Text style={styles.title}>{t("location")}</Text>
          <View style={{flexDirection:"row", justifyContent:"space-between"}}> 
          <TextInput
            style={[styles.text_intup, {width:"49%"}]}
            onChangeText={(value) => handleChangeTex(value, "city")}
            value={state.organization}
            placeholder={t("city")}
            keyboardType="default"
            />
          <TextInput
            style={[styles.text_intup,, {width:"49%"} ]}
            onChangeText={(value) => handleChangeTex(value, "country")}
            value={state.organization}
            placeholder={t("country")}
            keyboardType="default"
            />
            </View>
        </View>


        <View style={styles.divided}>

          <Text style={styles.mainTitle}>{t("position.detail")}</Text>
          <Text style={styles.title}>{t("work.model")}</Text>
          <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={WorkModelOptions}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={t("select.option")}
          searchPlaceholder="Search..."
          value={state.participants}
          onChange={(item) => {
            // setParticipants(item.value)
          }}
          renderItem={renderItem}
        />
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("contract.type")}</Text>
          <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={ContracTypeOptions}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={t("select.option")}
          searchPlaceholder="Search..."
          value={state.participants}
          onChange={(item) => {
            // setParticipants(item.value)
          }}
          renderItem={renderItem}
        />
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("working.hours")}</Text>
          <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={WorkingHoursOptions}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={t("select.option")}
          searchPlaceholder="Search..."
          value={state.participants}
          onChange={(item) => {
            // setParticipants(item.value)
          }}
          renderItem={renderItem}
        />
        </View>
        <View style={styles.divided}>

          <Text style={styles.mainTitle}>{t("position.detail")}</Text>
          <Text style={styles.title}>{t("work.model")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "name")}
            value={state.name}
            placeholder={t("basic.information")}
            keyboardType="default"
          />
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("skills.requirements")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "name")}
            value={state.name}
            placeholder={t("basic.information")}
            keyboardType="default"
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
  mainTitle: {
    fontSize: 19,
    letterSpacing: 1,
    marginBottom:10,
    fontWeight: "700",
    color: colors.main,
  },
  divided: {
    paddingBottom: 8,
  },
  dropdown: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#C9C6C6",
    height: 40,
    padding: 7,
    marginTop: 5,
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
  selectedTextStyle: {
    fontSize: 15,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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
  placeholderStyle: {
    fontSize: 14,
    color:colors.dateText
  },
});
