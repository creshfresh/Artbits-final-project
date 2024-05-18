import "react-native-gesture-handler";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
// import i18next, {languageResources} from './i18next';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import React, { useEffect, useState } from "react";
import SignInScreen from "./app/screens/SignInScreen";
import { CustomNavigator } from "./app/navigation/CustomNavigator";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePersonStore } from "./store/store";
import { makeRedirectUri } from "expo-auth-session";
import Constants from "expo-constants";
import "./i18next";
import LoginScreen from "./app/screens/login/LoginScreen";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [loading, setLoading] = useState(false);
  const user = usePersonStore((state) => state.user);
  const setUser = usePersonStore((state) => state.setUser);
  // Configuración de los parámetros de redireccionamiento según el entorno
  // const EXPO_REDIRECT_PARAMS = {
  //   useProxy: true, // Utilizar proxy en entorno Expo para evitar problemas con URI
  //   projectNameForProxy: "@creshsofresh/Artbits-final-project",
  // };

  // const NATIVE_REDIRECT_PARAMS = {
  //   native: "Artbits-final-project://", // Especifica el esquema URL personalizado para apps nativas
  // };

  // // Elegir entre configuraciones Expo o nativa según el entorno de la aplicación
  // const REDIRECT_PARAMS =
  //   Constants.appOwnership === "expo"
  //     ? EXPO_REDIRECT_PARAMS
  //     : NATIVE_REDIRECT_PARAMS;
  // const preferLocalhost = Constants.appOwnership === "expo"; // && Constants.executionEnvironment === Constants.ExecutionEnvironment.Bare;
  // const scheme = "miappesquema";

  const [request, response, promptAsync] = Google.useAuthRequest({
    redirectUri: makeRedirectUri({
      native: "Artbits-final-project://redirect",
      scheme: "https",
      queryParams: {
        url: "https://auth.expo.io/@creshsofresh/Artbits-final-project",
      },
      preferLocalhost: false,
      path: "expo-development-client/",
    }),
    clientId:
      "1006799876952-tfrrji7mdatmj72e1o635kp20apf3don.apps.googleusercontent.com",
    webClientId:
      "1006799876952-tfrrji7mdatmj72e1o635kp20apf3don.apps.googleusercontent.com",
    androidClientId:
      "1006799876952-5jft6q2blgrgh64ptcd5a638mar38ihn.apps.googleusercontent.com",
  });

  const getLocalUser = async () => {
    try {
      setLoading(true);
      const userJson = await AsyncStorage.getItem("@user");
      setLoading(false);
      const userData = userJson ? JSON.parse(userJson) : null;
      setUser(userData);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getLocalUser();
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        setUser(user);
      } else {}
    });

    return () => unsub();
  }),
    [];

  if (loading) return;
  <View style={{ alignItems: "center", justifyContent: "center" }}>
    <ActivityIndicator size={"small"} />
  </View>;

  return user ? (
    <CustomNavigator />
  ) : (
    <View style={styles.container}>
      <SignInScreen />
      <StatusBar barStyle="default" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
