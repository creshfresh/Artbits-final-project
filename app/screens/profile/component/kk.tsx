import { FlashList } from "@shopify/flash-list";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { database } from "../../../../firebaseConfig";
import { usePersonStore } from "../../../../store/store";
import { useTranslation } from "../../../hooks/useTranslations";
import { colors } from "../../../theme/colors";

type ProfolioCarrouselProps = {
  navigation: any;
  navigateUser: any;
};

export const ProfolioCarrousel = ({
  navigation,
  navigateUser,
}: ProfolioCarrouselProps) => {
  const user = usePersonStore((state) => state.user);
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const userId =
      navigateUser !== null && navigateUser !== undefined
        ? navigateUser[0].user_id
        : user.user_id;

    const collectionRef = collection(database, "Projects");
    const q = query(collectionRef, where("user_id", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          url: doc.data().url,
          title: doc.data().title,
          publish_date: doc.data().publish_date,
          medium_type: doc.data().medium_type,
          user_id: doc.data().user_id,
          description: doc.data().description,
        }))
      );
    });

    return unsubscribe;
  }, [navigateUser]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "transparent" }}
    >
      {navigateUser === null || navigateUser === undefined ? (
        data.length > 0 ? (
          <FlashList
            data={data}
            numColumns={1}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            estimatedItemSize={Dimensions.get("window").width / 2 - 20}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={{ flex: 1, margin: 2 }}>
                <Pressable
                  onPress={() =>
                    navigation.navigate("PorfolioDetail", { item: item })
                  }
                >
                  <View
                    style={{
                      backgroundColor: colors.palette.white,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      borderBottomEndRadius: 3,
                      borderBottomStartRadius: 3,
                    }}
                  >
                    <Image
                      source={{ uri: item.url[0] }}
                      style={{
                        width: "100%",
                        minHeight: 250,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderColor: "#d35647",
                        resizeMode: "cover",
                      }}
                    />
                    <Text
                      style={{
                        marginVertical: 10,
                        marginHorizontal: 10,
                        fontWeight: 600,
                        letterSpacing: 0.7,
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                </Pressable>
              </View>
            )}
          />
        ) : (
          <View style={{ flex: 1, padding: 50 }}>
            <View style={styles.justifyTitle}>
              <Text style={styles.mainTitle}>{t("create.first.work")}</Text>
              <Text style={styles.text}>{t("create.first.work.body")}</Text>
              <View style={{ marginTop: 10 }}>
                <View style={{ marginTop: 10 }}>
                  <Pressable
                    style={styles.findButton}
                    onPress={() => {
                      navigation.navigate("ProjectUploadScreen");
                    }}
                  >
                    <Text style={styles.buttontext}>{t("upload.work")}</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        )
      ) : navigateUser.user_id === user.user_id ? (
        <FlashList
          data={data}
          numColumns={1}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={Dimensions.get("window").width / 2 - 20}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ flex: 1, margin: 2 }}>
              <Pressable
                onPress={() =>
                  navigation.navigate("PorfolioDetail", { item: item })
                }
              >
                <View
                  style={{
                    backgroundColor: colors.palette.white,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderBottomEndRadius: 3,
                    borderBottomStartRadius: 3,
                  }}
                >
                  <Image
                    source={{ uri: item.url[0] }}
                    style={{
                      width: "100%",
                      minHeight: 250,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      borderColor: "#d35647",
                      resizeMode: "cover",
                    }}
                  />
                  <Text
                    style={{
                      marginVertical: 10,
                      marginHorizontal: 10,
                      fontWeight: 600,
                      letterSpacing: 0.7,
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              </Pressable>
            </View>
          )}
        />
      ) : (
        <View style={[styles.justifyTitle, { paddingVertical: 60 }]}>
          <Text style={styles.mainTitle}>{t("prueba")}</Text>
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  justifyTitle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: colors.secondarytext,
    paddingBottom: 10,
    textAlign: "center",
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "600",
    letterSpacing: 1.25,
    paddingVertical: 10,
  },
  findButton: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: colors.secondary,
    justifyContent: "center",
  },
  buttontext: {
    fontSize: 14,
    color: "white",
    fontWeight: "700",
    letterSpacing: 1,
  },
});
