import { signOut } from "firebase/auth";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { auth } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../theme/colors";

export const SettingsScreenKK = () => {
  return (
    <View>
      <Text style={{ fontSize: 30, textAlign: "center", marginTop: "50%" }}>
        Settings
      </Text>
      <Pressable
        style={styles.button}
        onPress={async () => {
          await signOut(auth);
          await AsyncStorage.removeItem("@user");
        }}
      >
        <Text style={styles.text}>Log out</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
