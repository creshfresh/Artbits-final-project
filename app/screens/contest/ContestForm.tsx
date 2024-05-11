import { View, Text, TextInput,StyleSheet } from "react-native";
import { useTranslation } from "../../hooks/useTranslations";
import { useState } from "react";
import Checkbox from 'expo-checkbox';
import { colors } from "../../theme/colors";

export const ContestForm = () => {
  const { t } = useTranslation();
  const [isChecked, setChecked] = useState(false);

  return (
    <>
      <View style={{ display: "flex", flex: 1, flexDirection: "column" }}>
        <Text>Nombre</Text>
        <TextInput
          style={{}}
          onChangeText={() => {}}
          placeholder={t("description.placeholder")}
          keyboardType="default"
        />
        <Text>Centro organizativo</Text>
        <TextInput
          style={{}}
          onChangeText={() => {}}
          placeholder={t("description.placeholder")}
          keyboardType="default"
        />
        <Checkbox
               style={styles.checkbox}
               value={isChecked}
               onValueChange={setChecked}
               color={isChecked ? colors.secondary : undefined}
        />
        <TextInput
          style={{}}
          onChangeText={() => {}}
          placeholder={"cash.price"}
          keyboardType="default"
        />
        <Text>Fecha de apertura</Text>
        <TextInput
          style={{}}
          onChangeText={() => {}}
          placeholder={t("description.placeholder")}
          keyboardType="default"
        />
        <Text>Fecha de cierre</Text>
        <TextInput
          style={{}}
          onChangeText={() => {}}
          placeholder={t("description.placeholder")}
          keyboardType="default"
        />
        <Text>Edad mínima</Text>
        <TextInput
          style={{}}
          onChangeText={() => {}}
          placeholder={t("description.placeholder")}
          keyboardType="default"
        />
        <Text>Edad máxima</Text>
        <TextInput
          style={{}}
          onChangeText={() => {}}
          placeholder={t("description.placeholder")}
          keyboardType="default"
        />
        <Text>Participantes</Text>
        <TextInput
          style={{}}
          onChangeText={() => {}}
          placeholder={t("description.placeholder")}
          keyboardType="default"
        />
        <Text>Especificadiones de la obra</Text>
        <TextInput
          style={{}}
          onChangeText={() => {}}
          placeholder={t("description.placeholder")}
          keyboardType="default"
        />
        <Text>Bases</Text>
        <TextInput
          style={{}}
          onChangeText={() => {}}
          placeholder={t("description.placeholder")}
          keyboardType="default"
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});
