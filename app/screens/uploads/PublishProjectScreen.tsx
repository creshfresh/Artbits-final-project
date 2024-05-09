import {
  View,
  Image,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { colors } from "../../theme/colors";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapshot, doc } from "firebase/firestore";
import { useState } from "react";
import { ProjectUploadControler } from "./controler/ProjectUploadControler";
import { database, storage } from "../../../firebaseConfig";

const win = Dimensions.get("window");

export const PublishProjectScreen = ({ route, navigation }) => {
  const { image } = route.params;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function saveRecord(user_id, title, url, publish_date,description,fileType) {
    try {
      const docRef = await addDoc(collection(database, "Projects"), {
        user_id,
        title,
        url,
        publish_date,
        description,
        fileType,
      });
      console.log("document saved correctly", docRef.id);
    } catch (e) {
      console.log(e);
    }
  }
  async function uploadImage(uri: string, fileType) {
    try {
        const response = await fetch(uri);
        const blob = await response.blob();

        const storageRef = ref(storage, "Images/" + new Date().getTime());
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on('state_changed', 
            (snapshot) => {
                console.log("Uploading:", snapshot.totalBytes, "bytes transferred out of", snapshot.totalBytes);
            }, 
            (error) => {
                console.error("Upload failed:", error);
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log("File available at", downloadURL);
                    await saveRecord("3828", title, downloadURL, new Date().toISOString(), description, fileType).then
                    navigation.navigate("SuccesUpload")
                }).catch((error) => {
                    console.error("Error getting download URL:", error);
                });
            }
        );
    } catch (error) {
        console.error("Error uploading image and saving record:", error);
    }
}
  
  return (
    <>
    <View style={{ flex: 1, padding: 10 }}>
      <View
        style={{
          marginTop: 80,
          justifyContent: "center",
          flexDirection: "row",
        }}
        >
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Image
          source={{
            uri: "https://archive.org/download/no-photo-available/no-photo-available.png",
          }}
          style={styles.image}
          />
        )}
      </View>

      <View
        style={{
          alignItems: "flex-start",
          justifyContent: "center",
        }}
        >
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
            onChangeText={setTitle}
            placeholder="Cuál es el título de tu obra"
            keyboardType="default"
            />
        </View>
        <Text style={{ fontSize: 20, fontWeight: "700", paddingStart: 10 }}>
          Descripción
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setDescription}
          placeholder="Añade una descripción al proyecto"
          keyboardType="default"
          />
      </View>
      {title !== "" ? (
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
            onPress={()=> uploadImage(image, "image")}
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
        </View>
      ) : null}
    </View>
</>
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
