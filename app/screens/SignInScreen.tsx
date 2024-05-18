import React, { Fragment, useEffect, useState } from "react";
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
  Dimensions,
  TextInput,
} from "react-native";
import { colors } from "../theme/colors";
import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { LoginControler } from "./login/LoginControler";
import { Ionicons } from "@expo/vector-icons";
const win = Dimensions.get("window");

export default function SignInScreen({}) {
  const welcomeLogo = require("../../assets/logoPollo_complete.png");

  const [disabled, setIsDisabled] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const { isValidEmail, isValidPassword } = LoginControler();
  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(true);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const handleSignUp = () => {
    if (isValidPassword(password) && isValidEmail(email)) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCreds) => {
          const user = userCreds.user;
          console.log("Registered with:", user.email);
        })
        .catch((error) => {
          alert("Email already registered");
        });
    } else {
      setShowEmailError(!isValidEmail(email));
      setShowPasswordError(!isValidPassword(password)); // Aquí establecemos el estado de error de la contraseña
    }
  };

  const handleLogin = () => {
    if (isValidPassword(password) && isValidEmail(email)) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCreds) => {
          const user = userCreds.user;
          console.log("Logged in with:", user.email);
        })
        .catch((error) => alert(error.message));
    } else {
      setShowEmailError(!isValidEmail(email));
      setShowPasswordError(!isValidPassword(password)); // Aquí establecemos el estado de error de la contraseña
    }
  };

  useEffect(() => {
    if (email.trim() !== "" && password.trim() !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

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
            // backgroundColor: colors.background,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 32,
                marginTop: 80,
                textAlign: "center",
                fontFamily: "Montserrat_600SemiBold",
                fontWeight: "bold",
                color: colors.main,
                letterSpacing: 1,
              }}
            >
              Welcome back to
            </Text>
            <Image style={styles.logo} source={welcomeLogo} />
          </View>
        </SafeAreaView>
        <View style={[styles.loginCard, styles.shadowProp]}>
          <Text
            style={{
              color: colors.text,
              fontSize: 24,
              fontWeight: "bold",
              marginVertical: 20,
              letterSpacing: 1,
            }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </Text>

          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={(email) => {
              setEmail(email);
              setShowEmailError(false);
            }}
            placeholder="Email"
            keyboardType="default"
          />
          {showEmailError && (
            <Text style={styles.errors}>Invalid email format</Text>
          )}
          <View style={[styles.textInput, { justifyContent: "space-between" }]}>
            <TextInput
              value={password}
              secureTextEntry={viewPassword}
              onChangeText={(pwd) => {
                setPassword(pwd);
                setShowPasswordError(false);
              }}
              placeholder="Password"
              keyboardType="default"
            />
            {viewPassword ? (
              <Ionicons
                onPress={() => setViewPassword(!viewPassword)}
                name="eye-outline"
                size={25}
                color={colors.dateText}
              />
            ) : (
              <Ionicons
                onPress={() => setViewPassword(!viewPassword)}
                name="eye-off-outline"
                size={25}
                color={colors.dateText}
              />
            )}
          </View>
          {showPasswordError && (
            <Text style={styles.errors}>
              Invalid password. Must be at least 8 characters long and contain
              numbers
            </Text>
          )}
              <Pressable
                disabled={disabled}
                style={[
                  styles.basebutton,
                  disabled ? styles.buttonDisabled : styles.buttonEnabled,
                ]}
                onPress={isLogin ? handleLogin : handleSignUp}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "600",
                    alignContent: "center",
                    textAlign: "center",
                  }}
                >
                  {isLogin ? "Log in" : "Sign up"}
                </Text>
              </Pressable>
          <View
            style={{
              alignItems: "center",
              alignContent: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <Text style={{ textAlign: "left" }}>
              {isLogin ? "Don’t you have an account?" : "Already a member?"}
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
              <Pressable onPress={() => setIsLogin(!isLogin)}>
                <Text
                  style={{
                    color: colors.main,
                    textAlign: "right",
                    fontSize: 15,
                  }}
                >
                  {isLogin ? "Sign Up" : "Log in"}
                </Text>
              </Pressable>
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
  textInput: {
    backgroundColor: "white",
    borderColor: "#5E5F61",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 2,
    marginTop: 10,
    marginBottom: 10,
  },
  basebutton: {
    marginTop: 15,
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
    width: win.width * 0.9,
    height: "auto",
  },
  buttonEnabled: {
    backgroundColor: colors.main,
  },
  errors: {
    fontSize: 12,
    color: "red",
  },
  buttonDisabled: {
    backgroundColor: colors.secondarytext,
  },
  loginCard: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 30,
    left: 0,
    right: 0,
    bottom: -20,
    width: "100%",
    minHeight: 480,
  },
  shadowProp: {
    shadowColor: "#000000",
    elevation: 20,
  },
});
