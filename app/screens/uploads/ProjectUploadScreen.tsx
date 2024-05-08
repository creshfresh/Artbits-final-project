import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  ImageSourcePropType,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import { colors } from "../../theme/colors";
import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapshot, doc } from "firebase/firestore";
import { useState } from "react";
import { database, storage } from "../../../firebaseConfig";

export const ProjectUploadScreen = ({ navigation }) => {
  const win = Dimensions.get("window");

  const handleNavigation = () => {
    navigation.navigate("PublishProjectScreen");
  };
  const [image, setImage] = useState("");
  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     // allowsEditing: true,
  //     // allowsMultipleSelection:true,
  //     selectionLimit: 5,
  //     quality: 0.2,
  //     aspect: [3, 4],
  //   });

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //   }
  // };

  async function uploadImage(uri: string, fileType: string) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "Project");
  }

  async function saveRecord(fileType, url, createdAt) {
    try {
      const docRef = await addDoc(collection(database, "Projects"), {
        fileType,
        url,
        createdAt,
      });
      console.log("document saved correctly", docRef.id);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View
        style={{
          display: "flex",
          marginTop: 20,
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      ></View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons size={40} name="cloud-upload-outline" color={colors.text} />

        <Text style={{ fontSize: 20, fontWeight: "700", padding: 10 }}>
          Subir archivos multimedia
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "200" }}>
          Tamaño máximo: 20MB
        </Text>
        <View style={{ marginTop: 50 }}>
          {/* <Button title="Selecciona una imagen" onPress={pickImage} /> */}
        </View>
        <View style={{ marginTop: 50, display: "flex" }}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>

        {image && (
          <View
            style={{
            flex: 1,
              position: "absolute",
              height: 120,
              bottom: -20,
              borderTopEndRadius: 20,
              borderTopStartRadius: 20,
              alignItems:"center",
              width: win.width,
              backgroundColor: "white",
            }}
          >
            <TouchableOpacity
              style={{
                marginTop:30,
                justifyContent: "center",
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 30,
                width: 150,
                backgroundColor: colors.secondary,
                borderColor: "transparent",
                height: "auto",
              }}
              onPress={handleNavigation}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "600",
                  alignContent: "center",
                  textAlign: "center",
                }}
              >
                Continuar
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
    width: 200,
    height: 200,
  },
});
