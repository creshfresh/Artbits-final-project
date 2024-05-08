import {
  View,
  Image,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  Button,
  ImageSourcePropType,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { colors } from "../../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapshot, doc } from "firebase/firestore";
import { useState } from "react";
import { database, storage } from "../../../firebaseConfig";
const win = Dimensions.get("window");

export const PublishProjectScreen = ({ navigation, image }) => {
  const [title, onChangeTitle] = useState("");
  const [text, onChangeText] = useState("");

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View
        style={{
          marginTop: 30,
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        <Image source={{ uri: image }} style={styles.image} />
        <Text
          style={{
            fontSize: 12,
            fontWeight: "700",
            color: colors.secondary,
            padding: 10,
          }}
        >
          Todo marcado con un (*) es un campo obligatorio
        </Text>
      </View>

      <View
        style={{
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            marginVertical: 25,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "700", paddingStart: 10 }}>
            *Titulo
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeTitle}
            placeholder="Cuál es el título de tu obra"
            keyboardType="default"
          />
        </View>
        <Text style={{ fontSize: 20, fontWeight: "700", paddingStart: 10 }}>
          Descripción
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholder="Añade una descripción al proyecto"
          keyboardType="numeric"
        />
      </View>
      {title !== "" ?
      <View
        style={{
          flex: 1,
          position: "absolute",
          height: 120,
          bottom: -20,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          alignItems: "center",
          width: win.width,
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity
          style={{
            marginTop: 30,
            justifyContent: "center",
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 30,
            width: win.width * 0.9,
            backgroundColor: colors.main,
            borderColor: "transparent",
            height: "auto",
          }}
          onPress={() => console.log()}
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
            Publicar proyecto
          </Text>
        </TouchableOpacity>
      </View> : null
  }
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
  image: {
    margin: 10,
    width: 150,
    height: 150,
  },
  input: {
    height: 40,
    width: win.width * 0.9,
    marginStart: 10,
    borderColor: "#DEDEDE",
    borderBottomWidth: 1,
  },
});
