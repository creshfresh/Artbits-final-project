import React, { useEffect, useState } from "react";
import {
  useFonts,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Snackbar from "react-native-snackbar";

import { colors } from "../../theme/colors";
import { auth } from "../../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const win = Dimensions.get("window");

export default function LoginScreen({}) {
  const [disabled, setIsDisabled] = useState(true);
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre login y signup
  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(true);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCreds) => {
        const user = userCreds.user;
        console.log("Registered with:", user.email);
      })
      .catch((error) => {
        alert("Email already registered")
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCreds) => {
        const user = userCreds.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
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
        <View style={styles.loginCard}>
          <Pressable
            onPress={() => setIsLogin(!isLogin)}
            style={{ marginTop: 20 }}
          >
            <Text
              style={{ color: colors.main, textAlign: "right", fontSize: 20 }}
            >
              {isLogin ? "Sign Up" : "Log in"}
            </Text>
          </Pressable>
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
            }}
            placeholder="Email"
            keyboardType="default"
          />
          <View style={[styles.textInput, { justifyContent: "space-between" }]}>
            <TextInput
              value={password}
              secureTextEntry={viewPassword}
              onChangeText={(pwd) => {
                setPassword(pwd);
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

          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: 20,
            }}
          >
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
          </View>
        </View>
      </>
    );
}

const styles = StyleSheet.create({
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
    marginTop: 30,
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
  buttonDisabled: {
    backgroundColor: colors.secondarytext,
  },
  loginCard: {
    padding: 20,
    backgroundColor: "white",
  },
});
