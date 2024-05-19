import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { User, signOut } from "firebase/auth";
import { AboutScreen } from "./AboutScreen";
import { colors } from "../../theme/colors";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../../firebaseConfig";
import { usePersonStore } from "../../../store/store";
import { useTranslation } from "../../hooks/useTranslations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProfolioCarrousel } from "./component/PortfolioCarrousel";
import { SavedScreen } from "./SavedScreen";
import { CombinedUser } from "../../../types";

const windowWidth = Dimensions.get("window").width;

export const EditProfile = ({ route, navigation }) => {
  const [viewMode, setViewMode] = useState<ViewMode>("Portfolio");
  //Recoger el usuario actualmente logueado
  const [navigateUser, setNavigateUser] = useState<CombinedUser>();
  const user = usePersonStore((state) => state.user);
  const { t, changeLanguage, getCurrentLocale } = useTranslation();
  const handleTranslation = () => {
    changeLanguage(getCurrentLocale() === "en" ? "es" : "en");
  };

  useEffect(() => {
    const { item } = route.params || {};
    console.log("vista perfil", item);
    if (item !== undefined) {
      setNavigateUser(item);
    }
  }, [route.params, user]);

  console.log("vista de perfil", user.city);

  type ViewMode = "Portfolio" | "About" | "Saved";

  // const { t } = useTranslation();
  const { signOutZustand } = usePersonStore();
  const handleSignout = () => {
    signOutZustand();
  };

  return (
    <>
      <View
        style={{
          height: 150,
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
          backgroundColor: colors.main,
        }}
      ></View>

      <Image source={{ uri: user.avatar }} style={[styles.image]} />

      <View style={styles.card}>
        <Text style={styles.textTittle}>{user.displayName}</Text>

        {/* <Text style={styles.text}>{user.email}</Text> */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            margin: 5,
            justifyContent: "center",
          }}
        >
          <Ionicons size={20} name="location-sharp" color={colors.main} />

          <Text style={styles.textLocation}>
            {user.city} + ", " +{user.country}
          </Text>
        </View>
        <Text style={styles.textUrl}>
          {navigateUser ? navigateUser[0].web_url : user.web_url}
        </Text>
      </View>
      <View
        style={{ height: 2, backgroundColor: "#EBE9E9", marginVertical: 2 }}
      ></View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 10,
          marginBottom: 5,
          justifyContent: "center",
        }}
      ></View>
    </>
  );
};
const styles = StyleSheet.create({
  switchButton: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: "center",
    padding: 10,
    maxWidth: 100,
    borderRadius: 30,
    borderColor: "transparent",
    justifyContent: "center",
    height: 40,
  },
  text: {
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center",
  },
  textLocation: {
    fontSize: 15,
    fontWeight: "300",
    textAlign: "center",
  },
  textTittle: {
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 1.5,
    color: colors.text,
    textAlign: "center",
  },
  textUrl: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textDim,
    textAlign: "center",
  },
  card: {
    marginTop: 20,
    justifyContent: "center",
    padding: 15,
    letterSpacing: 2,
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
    top: 85,
  },
  active: {
    backgroundColor: "#D9D9D9",
  },
  inactive: {
    backgroundColor: "transparent",
  },
  switchTextActive: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "600",
  },
  switchTextinactive: {
    fontSize: 14,
    color: "#323232",
    fontWeight: "600",
  },
  ellipsis_vertical: {
    position: "absolute",
    marginStart: windowWidth * 0.9,
  },
});
