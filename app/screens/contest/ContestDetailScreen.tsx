import { Dimensions, Image, Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import { usePersonStore } from "../../../store/store";
import { useTranslation } from "../../hooks/useTranslations";
import { colors } from "../../theme/colors";
import { ContestDetailScreenControler } from "./ContestDetailScreenControler";
import { useRoute } from "@react-navigation/native";
const screenWidth = Dimensions.get("window").width;

export const ContestDetailScreen = ({  }) => {

  const route:any = useRoute()
//   const { name } = route.params;
  const user = usePersonStore((state) => state.user);
//   const data = ContestDetailScreenControler(name);
  const { t } = useTranslation();


  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "transparent" }}
    >
      <View style={styles.container}>
        <View
          style={{ flexDirection: "column", top: 60, marginHorizontal: 20 }}
        >
          <Image source={{ uri: route.params.item.image[0] }} style={[styles.image]} />
          <View
            style={{
              marginTop: 100,
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View style={{ padding: 10, flexDirection: "row" }}>
              <Text style={styles.title}>{route.params.item.name}</Text>
              </View>
              <View
                style={{
                  height: 2,
                  backgroundColor: "#EBE9E9",
                  marginVertical: 5,
                }}
              ></View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <View style={{ flex: 1, margin: 5 }}>
                  <Text style={styles.subtitle}>{t("start.date")}</Text>
                  {/* Aqui tengo que coger la fecha formateada */}
                  <Text style={styles.body}>{route.params.item.startDate.toString()}</Text>
                </View>
                <View style={{ flex: 1, margin: 5 }}>
                  {/* Aqui tengo que coger la fecha formateada */}
                  <Text style={styles.subtitle}>{t("dead.line")}</Text>
                  <Text style={styles.body}>{route.params.item.name}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <View style={{ flex: 1, margin: 5 }}>
                  <Text style={styles.subtitle}>{t("participants")}</Text>
                  <Text style={styles.body}>{route.params.item.participants}</Text>
                </View>
                <View style={{ flex: 1, margin: 5 }}>
                  <Text style={styles.subtitle}>
                    {t("organization.centre")}
                  </Text>
                  <Text style={styles.body}>{route.params.item.organization}</Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{ height: 2, backgroundColor: "#EBE9E9", marginVertical: 5 }}
          ></View>

          <View style={{ gap: 10, paddingBottom: 20, paddingTop: 10 }}>
            <Text style={styles.titleBody}>{t("object.and.purpose")}</Text>
            <Text style={styles.bodybody}>{route.params.item.objetive}</Text>
          </View>
          <View style={{ gap: 10, paddingBottom: 20 }}>
            <Text style={styles.titleBody}>{t("terms")}</Text>
            <Text style={styles.bodybody}>{route.params.item.terms}</Text>
          </View>
          <View style={{ gap: 10, paddingBottom: 20 }}>
            <Text style={styles.titleBody}>{t("min.age")}</Text>
            <Text style={styles.bodybody}>{route.params.item.minAge}</Text>
          </View>
          <View style={{ gap: 10, paddingBottom: 20 }}>
            <Text style={styles.titleBody}>{t("max.age")}</Text>
            <Text style={styles.bodybody}>{route.params.item.maxAge}</Text>
          </View>
          <View style={{ gap: 10, paddingBottom: 20 }}>
            <Text style={styles.titleBody}>{t("work.specifications")}</Text>
            <Text style={styles.bodybody}>{route.params.item.specifications}</Text>
          </View>
          <View style={{ gap: 10, paddingBottom: 20 }}>
            <Text style={styles.titleBody}>{t("web.url")}</Text>
            <Text
              style={styles.link}
              onPress={() => {
                Linking.openURL("http://" + route.params.item.weburl);
              }}
            >
              {route.params.item.weburl}
            </Text>
            </View>
          <View style={{ gap: 10, paddingBottom: 100 }}>
            <Text style={styles.titleBody}>{t("download.bases")}</Text>
            <Text style={styles.bodybody}>{route.params.item.urlbases.assets[0].uri}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:  colors.background,
  },
  division: {
    marginVertical: 5,
    flexDirection: "row",
    width: screenWidth,
    alignItems: "center",
  },
  link: {
    fontSize: 14,
    letterSpacing: 1.5,
    color: colors.secondary,
  },


  title: {
    fontSize: 24,
    fontWeight: "600",
    letterSpacing: 1.5,
    color: colors.text,
  },
  titleBody: {
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 1.5,
    color: colors.text,
  },
  subtitle: {
    fontSize: 12,
    letterSpacing: 1.5,
    color: colors.dateText,
  },
  body: {
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 1.5,
    // textAlign:"center",
    color: colors.text,
  },
  bodybody: {
    fontSize: 14,
    letterSpacing: 1.5,
    // textAlign:"center",
    color: colors.text,
  },

  image: {
    width: 100,
    height: 100,
    borderColor: "white",
    backgroundColor: "#DEDEDE",
    borderWidth: 3,
    borderRadius: 50,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
  },
  card: {
    marginTop: 20,
    justifyContent: "center",
    padding: 15,
    letterSpacing: 2,
  },
});
