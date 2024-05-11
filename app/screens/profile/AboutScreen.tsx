import { signOut } from "firebase/auth";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { useEffect } from "react";
import { Card } from "../../components/Card";
import { FlashList } from "@shopify/flash-list";
import { colors } from "../../theme/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../../firebaseConfig";
import { usePersonStore } from "../../../store/store";
import { useTranslation } from "../../hooks/useTranslations";

export const AboutScreen = ({}) => {
  const { signOutZustand } = usePersonStore();
  const { t } = useTranslation();
  const handleSignout = () => {
    signOutZustand();
  };

  /* Esta pantalla eseña los datos del usuario logeado*/
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={{ display: "flex", justifyContent: "flex-start" }}>
        <Text style={styles.mainTitle}>{t("summary")}</Text>
        <Text style={styles.text}>
          My name is Cristina Ramos, I have more than 10 years of experience
          working as Principal 3D artist. currently living in Zaragoza (Spain).
        </Text>
        <Text style={styles.mainTitle}>{t("personal.web")}</Text>
        <Text style={styles.text}>alexanderchiveli.artstation.com.</Text>
        <Text style={styles.mainTitle}>{t("follow.social")}</Text>
        <Text style={styles.text}>alexanderchiveli.artstation.com.</Text>
        <Text style={styles.mainTitle}>{t("contact")}</Text>
        <Text style={styles.text}>alexanderchiveli.artstation.com.</Text>
        <Pressable
          onPress={async () => {
            await signOut(auth);
            await AsyncStorage.removeItem("@user");
            handleSignout();
          }}
        >
          <Text>{t("log.out")}</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    color: colors.text,
    paddingBottom: 10,
  },
  mainTitle: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "600",
    paddingVertical: 10,
  },
});
