import {
  Montserrat_600SemiBold,
  useFonts,
} from "@expo-google-fonts/montserrat";
import { Ionicons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { auth, database } from "../../../firebaseConfig";
import { usePersonStore } from "../../../store/store";
import { AppUser } from "../../../types";
import { colors } from "../../theme/colors";
import { LoginControler } from "./LoginControler";
const win = Dimensions.get("window");

export default function RoleSignUp({}) {
  const welcomeLogo = require("../../../assets/logoPollo_complete.png");
  const background = require("../../../assets/background-blur-2.png");
  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
  });

  const [disabled, setIsDisabled] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const { isValidEmail, isValidPassword } = LoginControler();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(true);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const setUser = usePersonStore((state) => state.setUser);

  const handleSignUp = (rol: string) => {
    if (isValidPassword(password) && isValidEmail(email)) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCreds) => {
          const user = userCreds.user;
          const appUser: AppUser | any = {
            displayName: "Giotto Gúrpide",
            email: user.email,
            country: "España",
            city: "Zaramordor",
            about_description: "Tell something about you",
            avatar: user.photoURL,
            web_url: "google.com",
            rol: rol,
            user_id: user.uid,
          };
          setUser(appUser);
          try {
            const docRef = await addDoc(collection(database, "Users"), appUser);
          } catch (error) {}
        })
        .catch((error) => {
          alert("Email already registered");
        });
    } else {
      setShowEmailError(!isValidEmail(email));
      setShowPasswordError(!isValidPassword(password));
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
          }}
        >
          <Image
            source={background}
            resizeMode="contain"
            style={{ position: "absolute", top: 0, height: win.height }}
          ></Image>
          <View>
            <Text
              style={{
                fontSize: 32,
                marginTop: 50,
                textAlign: "center",
                fontFamily: "Montserrat_600SemiBold",
                fontWeight: "bold",
                color: colors.main,
                letterSpacing: 2,
              }}
            >
              Create an account
            </Text>
            <Image style={styles.logo} source={welcomeLogo} />
          </View>
        </SafeAreaView>
        <View style={[styles.loginCard, styles.shadowProp]}>
          <Text
            style={{
              color: colors.text,
              fontSize: 24,
              textAlign: "center",
              fontWeight: "bold",
              marginVertical: 20,
              letterSpacing: 1,
            }}
          >
            What type of user are you?
          </Text>

          <Pressable
            style={[styles.basebutton, styles.buttonEnabled]}
            onPress={() => handleSignUp("artist")}
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
              I am an artist
            </Text>
          </Pressable>
          <Pressable
            style={[styles.basebutton, styles.buttonEnabled]}
            onPress={() => handleSignUp("company")}
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
              I am a company
            </Text>
          </Pressable>
          <Pressable
            style={[styles.basebutton, styles.buttonEnabled]}
            onPress={() => handleSignUp("art_studio")}
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
              I am an art studio
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
          ></View>
          <View>
            <Text
              style={{
                textAlign: "center",
                marginTop: 30,
                color: "grey",
                fontSize: 11,
              }}
            >
              {"Developed with "}
              <Ionicons
                name="heart"
                style={{
                  alignItems: "center",
                  color: colors.dateText,
                }}
              />
              {" by @creshSofresh"}
            </Text>
          </View>
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
    height: "65%",
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
    backgroundColor: "#e3e3e3",
    borderColor: "transparent",
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 30,
    left: 0,
    right: 0,
    bottom: -20,
    width: "100%",
    minHeight: 430,
  },
  shadowProp: {
    shadowColor: "#000000",
    elevation: 20,
  },
});
function setData(arg0: any) {
  throw new Error("Function not implemented.");
}
