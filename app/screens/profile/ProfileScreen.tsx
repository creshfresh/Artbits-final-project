import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "firebase/auth";
import { View, Text, StyleSheet, Button, Image } from "react-native";

export const ProfileScreen = (userInfo: User) => {
  return (
    <>
      <View style={styles.card}>
        {userInfo?.photoURL && (
          <Image source={{ uri: userInfo?.photoURL }} style={styles.image} />
        )}
        <Text style={styles.text}>Email: {userInfo.email}</Text>
        <Text style={styles.text}>
          Verified: {userInfo.emailVerified ? "yes" : "no"}
        </Text>
        <Text style={styles.text}>Name: {userInfo.displayName}</Text>
      </View>

      <Button
        title="remove local store"
        onPress={async () => await AsyncStorage.removeItem("@user")}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
