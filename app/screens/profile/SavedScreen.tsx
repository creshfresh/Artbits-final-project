import { colors } from "../../theme/colors";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTranslation } from "../../hooks/useTranslations";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { database } from "../../../firebaseConfig";

export const SavedScreen = ({ navigateUser }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [images, setImages] = useState([])

  const handleNavigateToHome = () => {
    navigation.reset({
      index: 0,
      // @ts-ignore: this works fine even if it shows an error
      routes: [{ name: "Home" }],
    });
  };

  useEffect(() => {
    const userId = navigateUser !== null && navigateUser !== undefined ? navigateUser[0].user_id : "BniaeIeL3RfCKMPba2JhVY8E8g62";
    const collectionRef = collection(database, "SavedArtworks");
    const q = query(collectionRef, where("user_id" ,"==" ,userId)); // El ide 3828 es harcodeado
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setImages(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          url: doc.data().url,
          title: doc.data().title,
          publish_date:doc.data().publish_date,
          medium_type:doc.data().medium_type,
          user_id:doc.data().user_id,
          description: doc.data().description,
        
        }))
      );
      console.log("userodid:",userId)
    });

    return unsubscribe; 

  }, [navigateUser]);
  
  return (
    <View style={{ flex: 1, padding: 50 }}>
      {navigateUser === null || navigateUser === undefined ? (
        <>
          <View style={styles.justifyTitle}>
            <Text style={styles.mainTitle}>{t("save.first.work")}</Text>
            <Text style={styles.text}>{t("save.first.work.body")}</Text>
            <View
              style={{
                marginTop: 10,
              }}
            >
              <Pressable
                style={styles.findButton}
                onPress={handleNavigateToHome}
              >
                <Text style={styles.buttontext}>{t("find.work")}</Text>
              </Pressable>
            </View>
          </View>
        </>
      ) : (
        
        <>
          <View style={styles.justifyTitle}>
            <Text style={styles.mainTitle}>{t("not.saved.artwork")}</Text>
          </View>
        </>
      )}
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
  justifyTitle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: colors.secondarytext,
    paddingBottom: 10,
    textAlign:"center"
  },
  mainTitle: {
    fontSize: 22,
    lineHeight: 21,
    fontWeight: "600",
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
