import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SignInScreen from "./app/screens/SignInScreen";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { useIdTokenAuthRequest } from "expo-auth-session/providers/google";

import { auth } from "./firebaseConfig";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [userInfo, setUserInfo] = useState();
  const [request, response, promptAsync] = useIdTokenAuthRequest({
    iosClientId: "",
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
function UseState(): [any, any] {
  throw new Error("Function not implemented.");
}
