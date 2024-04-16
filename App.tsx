import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import SignInScreen from "./app/screens/SignInScreen";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  initializeAuth,
  signInWithCredential,
} from "firebase/auth";

import * as Google from "expo-auth-session/providers/google";
import { auth } from "./firebaseConfig";
import { makeRedirectUri } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [userInfo, setUserInfo] = useState();
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

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
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
