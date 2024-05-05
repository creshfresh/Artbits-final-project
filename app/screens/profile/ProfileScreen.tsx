import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, signOut } from "firebase/auth";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { usePersonStore } from "../../../store/store";
import { auth } from "../../../firebaseConfig";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ProfolioCarrousel } from "./PortfolioCarrousel";
import { AboutScreen } from "./AboutScreen";

export const ProfileScreen = ({ navigation }) => {
  const { signOutZustand } = usePersonStore();
  const user = usePersonStore((state) => state.user);
  type ViewMode = "Portfolio" | "About";

  const [viewMode, setViewMode] = useState<ViewMode>("Portfolio");

  const handleSignout = () => {
    signOutZustand();
    navigation.navigate("SearchArtGrantScreen");
  };

  return (
    <>
      <View
        style={{
          height: 120,
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
          backgroundColor: colors.main,
        }}
      >
        {/* <LinearGradient
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

      {user?.photoURL && (
        <Image source={{ uri: user?.photoURL }} style={[styles.image]} />
      )}
      <View style={styles.card}>
        <Text style={styles.textTittle}>{user.displayName}</Text>
        <Text style={styles.text}>{user.email}</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            margin:5,
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
          marginTop:10,
          marginBottom:5,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
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
            Portfolio
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
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
            About
          </Text>
        </TouchableOpacity>
      </View>

      {viewMode === "Portfolio"  ? <ProfolioCarrousel/> :<AboutScreen/>}


      <Pressable
        onPress={async () => {
          await signOut(auth);
          await AsyncStorage.removeItem("@user");
          handleSignout();
        }}
      >
        <Text>Log out</Text>
      </Pressable>
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
    borderWidth: 3,
    borderRadius: 50,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    top: 55,
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
});
