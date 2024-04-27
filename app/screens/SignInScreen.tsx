import React, { Fragment } from "react";
import {
  useFonts,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import { AntDesign } from "@expo/vector-icons";
import {
  Button,
  SafeAreaView,
  Text,
  Pressable,
  StyleSheet,
  Image,
  View,
} from "react-native";
import { colors } from "../theme/colors";

export default function SignInScreen({ promptAsync }) {
  const welcomeLogo = require("../../assets/logoPollo_complete.png");
  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  } else
    return (
      <>
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.background,
          }}
        >
          <Text
            style={{
              fontSize: 32,
              marginTop: 50,
              fontFamily: "Montserrat_600SemiBold",
              fontWeight: "bold",
              color: colors.main,
            }}
          >
            Welcome back to
          </Text>
          <Image style={styles.logo} source={welcomeLogo} />
        </SafeAreaView>
        <View style={[styles.loginCard, styles.shadowProp]}>
          <Text
            style={{
              color: "#323232",
              fontSize: 17,
              textAlign: "center",
              fontWeight: "bold",
              marginVertical: 20,
            }}
          >
            Login
          </Text>
          <Pressable style={styles.google_button} onPress={() => promptAsync()}>
            <AntDesign name="google" size={30} />
            <Text style={{ color: "#323232", fontSize: 17 }}>
              Log in with Google{" "}
            </Text>
          </Pressable>

          <Pressable
            style={styles.google_button}
            disabled={true}
            onPress={() => promptAsync()}
          >
            <AntDesign name="mail" size={30} />
            <Text style={{ color: "#323232", fontSize: 17 }}>
              Log in with Email{" "}
            </Text>
          </Pressable>
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <Text style={{ textAlign: "left" }}>
              Don’t you have an account?
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <AntDesign
                name="arrowright"
                size={25}
                color={colors.secondary}
                style={{ textAlign: "right" }}
              />
              <Text
                style={{ textAlign: "right", fontWeight: "bold", fontSize: 17 }}
              >
                Sing up
              </Text>
            </View>
          </View>
          <Text
            style={{
              textAlign: "center",
              marginTop: 50,
              color: "grey",
              fontSize: 12,
            }}
          >
            By clicking sign up you state that you have read and understood the
            terms and conditions.
          </Text>
        </View>
      </>
    );
}
const styles = StyleSheet.create({
  linearGradient: {
    justifyContent: "space-between",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: "45%",
    width: 500,
    marginTop: 30,
    resizeMode: "contain",
  },
  google_button: {
    backgroundColor: "white",
    borderColor: "#5E5F61",
    padding: 10,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    borderWidth: 2,
    marginTop: 10,
    marginBottom: 10,
  },

  loginCard: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 30,
    left: 0,
    right: 0,
    bottom: -20,
    width: "100%",
    minHeight: 420,
  },
  shadowProp: {
    shadowColor: "#000000",
    elevation: 20,
  },
});
