import "react-native-gesture-handler";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { auth, database } from "./firebaseConfig";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import React, { useEffect, useState } from "react";
import SignInScreen from "./app/screens/login/SignInScreen";
import { CustomNavigator } from "./app/navigation/CustomNavigator";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePersonStore } from "./store/store";
import { makeRedirectUri } from "expo-auth-session";
import "./i18next"; // Ni se te ocurra borrar esto
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { AppUser } from "./types";
WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [loading, setLoading] = useState(false);
  const user = usePersonStore((state) => state.user);
  const setUser = usePersonStore((state) => state.setUser);

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
      } else {
      }
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
