import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import {  signOut } from "firebase/auth";
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
import { User } from "../../../types";

const windowWidth = Dimensions.get("window").width;

export const ProfileScreen = ({ route, navigation }) => {
  const [viewMode, setViewMode] = useState<ViewMode>("Portfolio");
  //Recoger el usuario actualmente logueado
  const [navigateUser, setNavigateUser] = useState<User>();
  const user = usePersonStore((state) => state.user);

  console.log("que es esto aqui", user)
  useEffect(() => {
    const { item } = route.params || {};
    console.log("vista perfil", item);
    if (item !== undefined) {
      setNavigateUser(item);
    }
  }, [route.params, user]);

  type ViewMode = "Portfolio" | "About" | "Saved";

  const { t } = useTranslation();
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
      >

        {!navigateUser ? (
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
        ) : null}
      </View>

      {navigateUser  && 
        <Image source={{ uri: navigateUser[0].avatar }} style={[styles.image]} /> 
      }
      <Image source={{ uri: navigateUser?.avatar }} style={[styles.image]} />
      <View style={styles.card}>
        <Text style={styles.textTittle}>{user.fullname}</Text>
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
            {navigateUser ? 
              navigateUser[0].city
              
              + ", " +
              navigateUser[0].country  
              : ""}
          </Text>
        </View>
        <Text style={styles.textUrl}>
   
          {navigateUser ? navigateUser[0].web_url : "creshsofresh.com"}
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
        <ProfolioCarrousel navigation={navigation} navigateUser={navigateUser}/>
      ) : viewMode === "About" ? (
        <AboutScreen navigateUser={navigateUser}/>
      ) : (
        <SavedScreen navigateUser={navigateUser} />
      )}
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
