import {
  useFonts,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import {
  Button,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewBase,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import React from "react";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
import { colors } from "../theme/colors";

export const LoginView = () => {
  let [fontsLoaded, fontError] = useFonts({
    Montserrat_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <LinearGradient
      style={styles.linearGradient}
      colors={[colors.background, colors.background]}
    >
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome back to</Text>
        {/* <Image style={styles.logo} source={welcomeLogo} /> */}
      </View>
      <View style={[styles.loginCard, styles.shadowProp]}>
        {/* <Text style={styles.login_text}>Login</Text>
        <Pressable onPress={googleLogin}>
          <View style={styles.loginButton}>
            <View style={{ marginLeft: 5 }}>
              <Text
                style={{ color: "#222222", fontWeight: "400", fontSize: 18 }}
              >
                Login with Google
              </Text>
            </View>
          </View>
        </Pressable> */}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: "space-between",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 30,
    fontFamily: "Montserrat_600SemiBold",
    color: colors.main,
    marginTop: 25,
    marginBottom: 40,
  },
  logo: {
    height: "45%",
    width: 600,
    resizeMode: "contain",
  },
  loginCard: {
    backgroundColor: "white",
    borderRadius: 30,
    left: 0,
    right: 0,
    bottom: -20,

    width: "100%",
    minHeight: 400,
  },
  shadowProp: {
    shadowRadius: 2000,
    shadowColor: "#000000",
    elevation: 20,
  },

  login_text: {
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    textAlign: "center",
    margin: 20,
    fontSize: 20,
    fontFamily: "Montserrat_600SemiBold",
  },
  loginButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    width: screenWidth - 50,
    height: 48,
    borderRadius: 10,
  },
});
