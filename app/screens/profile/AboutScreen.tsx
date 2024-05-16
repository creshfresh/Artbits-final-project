import { colors } from "../../theme/colors";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "../../hooks/useTranslations";

export const AboutScreen = ({ navigateUser }) => {
  const { t } = useTranslation();

  /* Esta pantalla eseña los datos del usuario logeado*/
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={{ display: "flex", justifyContent: "flex-start" }}>
        <Text style={styles.mainTitle}>{t("summary")}</Text>
        {navigateUser === null || navigateUser === undefined ? (
          <>
            <Text style={styles.text}>AAAAAAAAAAAAAAAAAAAA</Text>
            <Text style={styles.mainTitle}>{t("personal.web")}</Text>
            <Text style={styles.text}>alexanderchiveli.artstation.com.</Text>
            <Text style={styles.mainTitle}>{t("follow.social")}</Text>
            <Text style={styles.text}>alexanderchiveli.artstation.com.</Text>
            <Text style={styles.mainTitle}>{t("contact")}</Text>
            <Text style={styles.text}>alexanderchiveli.artstation.com.</Text>
          </>
        ) : (
          <>
            <Text style={styles.text}>{navigateUser[0].about_decription}</Text>
            <Text style={styles.mainTitle}>{t("personal.web")}</Text>
            <Text style={styles.text}>{navigateUser[0].web_url}.</Text>
            <Text style={styles.mainTitle}>{t("follow.social")}</Text>
            <Text style={styles.text}>{navigateUser[0].contact_email}</Text>
            <Text style={styles.mainTitle}>{t("contact")}</Text>
            <Text style={styles.text}>{navigateUser[0].contact_email}</Text>
          </>
        )}
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
