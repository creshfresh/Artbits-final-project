import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeRedirectUri } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import { CustomNavigator } from "./app/navigation/CustomNavigator";
import SignInScreen from "./app/screens/login/SignInScreen";
import { colors } from "./app/theme/colors";
import { auth, database } from "./firebaseConfig";
import "./i18next"; // Ni se te ocurra borrar esto
import { usePersonStore } from "./store/store";
import { AppUser } from "./types";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [loading, setLoading] = useState(true);
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
      const userJson = await AsyncStorage.getItem("@user");
      const userData = userJson ? JSON.parse(userJson) : null;
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.log("Error", error);
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
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userQuery = query(
          collection(database, "Users"),
          where("user_id", "==", firebaseUser.uid)
        );

        const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const userData = doc.data();
              const appUser: AppUser | any = {
                displayName: userData.displayName,
                email: userData.email,
                country: userData.country,
                city: userData.city,
                about_description: userData.about_description,
                avatar: userData.avatar,
                web_url: userData.web_url,
                rol: userData.rol,
                user_id: userData.user_id,
              };
              setUser(appUser);
              AsyncStorage.setItem("@user", JSON.stringify(appUser));
            });
          } else {
            console.log("No user data found");
          }
          setLoading(false);
        });

        return () => unsubscribe();
      } else {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          backgroundColor: colors.main,
        }}
      >
        <ActivityIndicator size={100} color={"white"} />
      </View>
    );
  }

  return user ? (
    <>
      <CustomNavigator />
    </>
  ) : (
    <View style={styles.container}>
      <SignInScreen />
      {/* <StatusBar barStyle="default" /> */}
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
