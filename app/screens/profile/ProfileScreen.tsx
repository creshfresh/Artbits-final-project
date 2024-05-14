import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { AboutScreen } from "./AboutScreen";
import { colors } from "../../theme/colors";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../../firebaseConfig";
import { usePersonStore } from "../../../store/store";
import { useTranslation } from "../../hooks/useTranslations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProfolioCarrousel } from "./component/PortfolioCarrousel";

const windowWidth = Dimensions.get("window").width;

export const ProfileScreen = ({ navigation }) => {
  const user = usePersonStore((state) => state.user);
  type ViewMode = "Portfolio" | "About" | "Saved";
  const { t } = useTranslation();
  const { signOutZustand } = usePersonStore();
  const handleSignout = () => {
    signOutZustand();
  };
  const [viewMode, setViewMode] = useState<ViewMode>("Portfolio");

  return (
    <>
      <View
        style={{
          height: 150,
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
          backgroundColor: colors.main,
        }}
      >
        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            marginStart: windowWidth * 0.78,
            alignItems: "center",
            display: "flex",
            gap: 15,
          }}
        >
          <Ionicons
            name="log-out-outline"
            size={28}
            onPress={async () => {
              await signOut(auth);
              await AsyncStorage.removeItem("@user");
              handleSignout();
            }}
            color={colors.palette.white}
            style={{ marginTop: 20 }}
          ></Ionicons>
          <Feather
            name="edit-2"
            onPress={() => {}}
            size={22}
            color={colors.palette.white}
            style={{ marginTop: 20 }}
          ></Feather>
        </View>
        {/* <LinearGradients
          colors={["#AA99DB", "#3A7ED7"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 120,
            borderBottomEndRadius: 20,
            borderBottomStartRadius: 20,
          }}
        /> */}
      </View>

      {/* {user?.photoURL && (
        <Image source={{ uri: user?.photoURL }} style={[styles.image]} />
      )} */}
      <Image source={{ uri: user?.photoURL }} style={[styles.image]} />

      <View style={styles.card}>
        {/* <Text style={styles.textTittle}>{user.displayName}</Text> */}
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
          <Text style={styles.textLocation}>Zaragoza, Spain</Text>
        </View>
        <Text style={styles.textUrl}> creshSoFresh.com</Text>
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
      >
        <Pressable
          style={[
            styles.switchButton,
            viewMode === "Portfolio" ? styles.active : styles.inactive,
          ]}
          onPress={() => {
            setViewMode("Portfolio");
          }}
        >
          <Text
            style={
              viewMode === "Portfolio"
                ? styles.switchTextActive
                : styles.switchTextinactive
            }
          >
            {t("portfolio")}
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.switchButton,
            viewMode === "Saved" ? styles.active : styles.inactive,
          ]}
          onPress={() => {
            setViewMode("Saved");
          }}
        >
          <Text
            style={
              viewMode === "Saved"
                ? styles.switchTextActive
                : styles.switchTextinactive
            }
          >
            {t("saved")}
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.switchButton,
            viewMode === "About" ? styles.active : styles.inactive,
          ]}
          onPress={() => {
            setViewMode("About");
          }}
        >
          <Text
            style={
              viewMode === "About"
                ? styles.switchTextActive
                : styles.switchTextinactive
            }
          >
            {t("about")}
          </Text>
        </Pressable>
      </View>

      {viewMode === "Portfolio" ? (
        <ProfolioCarrousel navigation={navigation} />
      ) : viewMode === "About" ? (
        <AboutScreen />
      ) : (
        <AboutScreen />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
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
