import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SignInScreen from "./app/screens/SignInScreen";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  initializeAuth,
  signInWithCredential,
} from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import { auth } from "./firebaseConfig";
import { Navigation } from "./app/navigation/TabNavigator";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [userInfo, setUserInfo] = useState(null);

  const [loading, setLoading] = useState(false);
  // const discovery = {
  //   authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  //   tokenEndpoint: "https://oauth2.googleapis.com/token",
  //   revocationEndpoint: "https://oauth2.googleapis.com/revoke",
  // };
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId:
      "1006799876952-fd27ptn97km3flsb8iimb42v7acquea2.apps.googleusercontent.com",
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
      setUserInfo(userData);
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
        console.log(JSON.stringify(user, null, 2));
        setUserInfo(user);
      } else console.log("user not authenticated");
    });
    return () => unsub();
  }),
    [];

  if (loading) return;
  <View style={{ alignItems: "center", justifyContent: "center" }}>
    <ActivityIndicator size={"small"} />
  </View>;

  return userInfo ? (
    <Navigation />
  ) : (
    <View style={styles.container}>
      <SignInScreen promptAsync={promptAsync} />
      <StatusBar style="auto" />
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
