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
  View,
} from "react-native";
import { colors } from "../../theme/colors";
import { useTranslation } from "../../hooks/useTranslations";
import { auth } from "../../../firebaseConfig";

const win = Dimensions.get("window");





export default function LoginScreen({}) {
  useEffect(() => {}, []);
  const [disabled, setIsDisabled] = useState(true);
  const { t } = useTranslation();
  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
//   const handleSignUp = () => {
//     auth
//         .createUserWithEmailAndPassword(email, password)
//         .then(userCreds => {
//             const user = userCreds.user;
//             console.log('Registered with: ', user?.email);
//         })
//         .catch(error => alert(error.message))

// }
  if (!fontsLoaded) {
    return null;
  } else
    return (
      <>
        <View style={styles.loginCard}>
          <Text
            style={{
              color: colors.text,
              fontSize: 24,
              fontWeight: "bold",
              marginVertical: 20,
              letterSpacing: 1,
            }}
          >
            Login
          </Text>

          <Pressable
            style={styles.textInput}
            disabled={true}
            onPress={() => {}}
          >
            <TextInput placeholder="Email" keyboardType="default" />
          </Pressable>
          <Pressable
            style={styles.textInput}
            disabled={true}
            onPress={() => {}}
          >
            <TextInput
              placeholder="Password"
              keyboardType="default"
            />
          </Pressable>
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
              onPress={() => {}}
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
                Log in
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
    gap: 15,
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
