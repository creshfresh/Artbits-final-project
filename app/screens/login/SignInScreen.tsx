import {
  Montserrat_600SemiBold,
  useFonts,
} from "@expo-google-fonts/montserrat";
import { Ionicons } from "@expo/vector-icons";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { auth, database } from "../../../firebaseConfig";
import { usePersonStore } from "../../../store/store";
import { AppUser } from "../../../types";
import { colors } from "../../theme/colors";
import { LoginControler } from "./LoginControler";
const win = Dimensions.get("window");

export default function SignInScreen({}) {
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

  const handleLogin = () => {
    if (isValidPassword(password) && isValidEmail(email)) {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCreds) => {
          const user = userCreds.user;

          // Consulta Firestore para obtener los datos del usuario
          const userQuery = query(
            collection(database, "Users"),
            where("user_id", "==", user.uid)
          );

          const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
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
            });
          });

          // Desuscribirse de la consulta cuando ya no sea necesario
          return unsubscribe;
        })
        .catch((error) => {
          alert("Error Log in: invalid credentials");
          console.error("Error signing in: ", error);
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
              Welcome back to
            </Text>
            <Image
              style={[styles.logo, { height: isLogin ? "65%" : "60%" }]}
              source={welcomeLogo}
            />
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
          {isLogin && (
            <Pressable
              disabled={disabled}
              style={[
                styles.basebutton,
                disabled ? styles.buttonDisabled : styles.buttonEnabled,
              ]}
              onPress={handleLogin}
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
                Login
              </Text>
            </Pressable>
          )}

          {!isLogin && (
            <>
              <Pressable
                disabled={disabled}
                style={[
                  styles.basebutton,
                  disabled ? styles.buttonDisabled : styles.buttonEnabled,
                ]}
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
                  Sign up as an artist
                </Text>
              </Pressable>
              <Pressable
                disabled={disabled}
                style={[
                  styles.basebutton,
                  disabled ? styles.buttonDisabled : styles.buttonEnabled,
                ]}
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
                  Sign up as a company
                </Text>
              </Pressable>
              <Pressable
                disabled={disabled}
                style={[
                  styles.basebutton,
                  disabled ? styles.buttonDisabled : styles.buttonEnabled,
                ]}
                onPress={() => handleSignUp("art_academy")}
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
                  Sign up as an Art Academy
                </Text>
              </Pressable>
            </>
          )}
          <View
            style={{
              alignItems: "center",
              alignContent: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: 20,
              marginBottom: isLogin ? 0 : 60,
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
              <Ionicons
                name="arrow-forward"
                size={25}
                color={colors.secondary}
                style={{ textAlign: "right" }}
              />
              <Pressable onPress={() => setIsLogin(!isLogin)}>
                <Text
                  style={{
                    color: colors.text,
                    textAlign: "right",
                    fontSize: 15,
                  }}
                >
                  {isLogin ? "Sign Up" : "Log in"}
                </Text>
              </Pressable>
            </View>
          </View>
          <View>
            {isLogin && (
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
            )}
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
