import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, signOut } from "firebase/auth";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { usePersonStore } from "../../../store/store";
import { auth } from "../../../firebaseConfig";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../theme/colors";

export const ProfileScreen = (userInfo: User, navigation) => {
  const { signOutZustand } = usePersonStore();
  const user = usePersonStore((state) => state.user);
  const handleSignout = () => {
    signOutZustand();
    navigation.navigate("Sign in");
  };

  return (
    <>
      <View
        style={{
          height: 120,
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
        }}
      >
        <LinearGradient
          colors={["#AA99DB", "#3A7ED7"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 120,
            borderBottomEndRadius: 20,
            borderBottomStartRadius: 20,
          }}
        />
      </View>

      {user?.photoURL && (
        <Image source={{ uri: user?.photoURL }} style={[styles.image]} />
      )}
      <View style={styles.card}>
        <Text style={styles.text}>Email: {user.email}</Text>
        <Text style={styles.text}>
          Phone number: {user.phoneNumber ? "yes" : "no"}
        </Text>
        <Text style={styles.text}>Name: {user.displayName}</Text>
      </View>

      <Button
        title="Log out"
        onPress={async () => {
          await signOut(auth);
          await AsyncStorage.removeItem("@user");
          handleSignout();
        }}
      />
    </>
  );
};
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  text: {
    fontSize: 20,
  },
  card: {
    margin: 5,
    marginTop: 50,
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
  },
  image: {
    width: 85,
    height: 85,
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 50,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    top: 60,
  },
});
