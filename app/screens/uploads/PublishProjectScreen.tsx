import {
  View,
  Image,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { colors } from "../../theme/colors";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import React, { useState } from "react";
import { database, storage } from "../../../firebaseConfig";
import { Dropdown } from "react-native-element-dropdown";
import { useTranslation } from "../../hooks/useTranslations";
import { options } from "../../../Constants";
import { usePersonStore } from "../../../store/store";
import { ProjectData } from "../../../types";

const win = Dimensions.get("window");

export const PublishProjectScreen = ({ route, navigation }) => {
  const { image } = route.params;
  const [value, setValue] = useState("Traditional");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const user = usePersonStore((state) => state.user);
  const [data, setData] = useState(null);

  const { t } = useTranslation();
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  async function saveRecord(
    user_id,
    title,
    url,
    publish_date,
    description,
    fileType,
    medium_type
  ) {
    try {
      const docRef = await addDoc(collection(database, "Projects"), {
        user_id,
        title,
        url,
        publish_date,
        description,
        fileType,
        medium_type,
      });
    } catch (e) {
      Alert.alert("error", e.message);
    }
  }
  async function uploadImages(uris: string[], fileType) {
    try {
      const downloadURLs: string[] = [];

      await Promise.all(
        uris.map(async (uri) => {
          const response = await fetch(uri);
          const blob = await response.blob();
          const storageRef = ref(storage, "Images/" + new Date().getTime());
          const uploadTask = uploadBytesResumable(storageRef, blob);

          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
              console.error("Upload failed:", error);
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(
                  uploadTask.snapshot.ref
                );
                downloadURLs.push(downloadURL);

                if (downloadURLs.length === uris.length) {
                  await saveRecord(
                    user.user_id,
                    title,
                    downloadURLs,
                    new Date().toISOString(),
                    description,
                    fileType,
                    value
                  );

                  const collectionRef = collection(database, "Projects");
                  const q = query(
                    //Se busca por todos en ordendes descendente, y se queda con el primer resultado porque queremos el último proyecto publicado
                    collectionRef,
                    where("user_id", "==", user.user_id),
                    orderBy("publish_date", "desc"),
                    limit(1) 
                  
                  );
                  onSnapshot(q, (querySnapshot) => {
                    const projectData = {};
                    querySnapshot.docs.forEach((doc) => {
                      projectData[doc.id] = {
                        url: doc.data().url,
                        title: doc.data().title,
                        publish_date: doc.data().publish_date,
                        medium_type: doc.data().medium_type,
                        user_id: doc.data().user_id,
                        description: doc.data().description,
                      };
                    });
                  
                    setData(projectData);
                    if (Object.keys(projectData).length > 0) {
                      console.log("projectData", projectData);
                  
                      const firstDocKey = Object.keys(projectData)[0];
                      navigation.navigate("SuccesUpload", { item: projectData[firstDocKey] });
                    }
                  });
                }
                
              } catch (error) {
                console.error("Error getting download URL:", error);
              }
            }
          );
        })
      );
    } catch (error) {
      console.error("Error uploading images and saving records:", error);
    }
  }

  return (
    <>
      <ScrollView>
        <View style={{ flex: 1, padding: 10 }}>
          <View
            style={{
              marginTop: 10,
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            {image ? (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {image.map((uri, index) => (
                  <Image
                    key={index}
                    source={{ uri: uri }}
                    style={styles.image}
                  />
                ))}
              </ScrollView>
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
              {t("mandatory.field")}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 15,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "700", paddingStart: 10 }}>
              *{t("title")}
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={setTitle}
              placeholder={t("title.placeholder")}
              keyboardType="default"
            />
          </View>
          <View
            style={{
              marginTop: 15,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "700", paddingStart: 10 }}>
              {t("description")}
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={setDescription}
              placeholder={t("description.placeholder")}
              keyboardType="default"
            />
          </View>
          <View
            style={{
              marginVertical: 15,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "700", paddingStart: 10 }}>
              *{t("medium.type")}
            </Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={options}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={t("select.option")}
              searchPlaceholder="Search..."
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
              renderItem={renderItem}
            />
          </View>
          {title !== "" && value !== "" ? (
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
              onPress={() => uploadImages(image, "image")}
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
                {t("publish.project")}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
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
    borderColor: colors.palette.neutral500,
    borderBottomWidth: 1,
  },
  dropdown: {
    borderColor: "#DEDEDE",
    borderBottomWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginTop: -5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: colors.secondary,
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 15,
  },
  selectedTextStyle: {
    fontSize: 15,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
