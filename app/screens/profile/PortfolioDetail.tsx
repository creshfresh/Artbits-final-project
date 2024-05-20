import {
  View,
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  Alert,
  ToastAndroid,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { colors } from "../../theme/colors";
import { database } from "../../../firebaseConfig";
import {
  addDoc,
  and,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useTranslation } from "react-i18next";
import { usePersonStore } from "../../../store/store";

export const PorfolioDetail = ({ route, navigation }) => {
  const { item } = route.params;
  const defaultAvatar = require("../../../assets/stars.png");
  const [imageSizes, setImageSizes] = useState({});
  const [name, setName] = useState([]);
  const user = usePersonStore((state) => state.user);

  const { t } = useTranslation();

  useEffect(() => {
    const calculateImageSizes = async () => {
      const sizes = await Promise.all(item.url.map((uri) => getImageSize(uri)));
      setImageSizes(sizes);
    };
    calculateImageSizes();
  }, [item.url]);

  const [saved, setSaved] = useState(false);

  const getImageSize = (uri) => {
    return new Promise((resolve, reject) => {
      Image.getSize(
        uri,
        (width, height) => {
          const aspectRatio = width / height;
          const imageWidth = Dimensions.get("window").width;
          const imageHeight = imageWidth / aspectRatio;
          resolve({ width: imageWidth, height: imageHeight });
        },
        reject
      );
    });
  };

  useEffect(() => {
    if (!item || !item.user_id) return;

    const collectionRef = collection(database, "Users");
    const q = query(collectionRef, where("user_id", "==", item.user_id));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setName(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          displayName: doc.data().displayName,
          contact_email: doc.data().contact_email,
          country: doc.data().country,
          city: doc.data().city,
          about_description: doc.data().about_description,
          avatar: doc.data().avatar,
          web_url: doc.data().web_url,
          user_id: doc.data().user_id,
        }))
      );
    });

    return () => unsubscribe();
  }, [item, setName]);

  const handleSave = async () => {
    !saved ? saveProject(item) : onDeleteSavedProject();
  };

  const saveProject = (project) => {
    const savedProjectsRef = collection(database, "SavedArtworks");
    addDoc(savedProjectsRef, project)
      .then(() => {
        ToastAndroid.showWithGravity(
          "Project saved!",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      })
      .catch((error) => {
        Alert.alert("Error", "no se ha podido guardar el proyecto");
      });
  };

  const isSaved = () => {
    const savedProjectsRef = collection(database, "SavedArtworks");
    const q = query(
      savedProjectsRef,
      where("user_id", "==", item.user_id),
      where("id", "==", item.id)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        setSaved(true);
      } else {
        setSaved(false);
      }
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    isSaved();
  }, [item]);

  const onDelete = async () => {
    try {
      const deleteRef = doc(database, "Projects", item.id);
      await deleteDoc(deleteRef).then(() => {
        ToastAndroid.showWithGravity(
          t("proyect.removed"),
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        ),
          navigation.reset({
            index: 0,
            // @ts-ignore: this works fine even if it shows an error
            routes: [{ name: "Home" }],
          });
      });
    } catch (error) {
      Alert.alert("Error:", error.message);
    }
  };
  const onDeleteSavedProject = async () => {
    try {
      const savedProjectsRef = collection(database, "SavedArtworks");
      const q = query(
        savedProjectsRef,
        where("user_id", "==", item.user_id),
        where("id", "==", item.id)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const deleteRef = doc(
          database,
          "SavedArtworks",
          querySnapshot.docs[0].id
        );
        await deleteDoc(deleteRef).then(() => {
          ToastAndroid.showWithGravity(
            t("proyect.removed.saved"),
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          setSaved(false);
        });
      }
    } catch (error) {
      Alert.alert("Error:", error.message);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Text style={styles.title}>{item.title}</Text>
        {item.user_id === user.user_id && (
          <Ionicons
            onPress={onDelete}
            name="trash-outline"
            size={25}
            color={colors.secondary}
            style={{ position: "absolute", right: 15, top: 5 }}
          />
        )}
        <Pressable
          onPress={() => navigation.navigate("ProfileScreen", { item: name })}
        >
          <View
            style={{ flexDirection: "row", marginLeft: 10, marginVertical: 7 }}
          >
            <Image
              source={
                item.user_id == user.user_id ? { uri: user.avatar } : defaultAvatar
              }
              style={{
                width: 30,
                height: 30,
                backgroundColor: "#FFA5A5",
                resizeMode: "center",
                borderRadius: 30,
              }}
            />
            <Text style={styles.subtitle}>{name[0]?.displayName}</Text>
          </View>
        </Pressable>

        {item.url.map((url, index) => (
          <View
            key={index}
            style={{ flex: 1, justifyContent: "center", margin: 2 }}
          >
            <Image
              source={{ uri: url }}
              style={{
                width: imageSizes[index]?.width * 0.99 || 0,
                height: imageSizes[index]?.height || 0,
                borderRadius: 10,
                borderColor: "#d35647",
                resizeMode: "cover",
              }}
            />
          </View>
        ))}
      </View>
      <View style={{ marginHorizontal: 12, marginTop: 20, marginBottom: 60 }}>
        <View
          style={{
            height: 2,
            backgroundColor: "#F3F3F3",
            width: "120%",
            position: "absolute",
            left: "-10%",
          }}
        ></View>

        <View style={{}}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginBottom: 5,
            }}
          >
            {item.user_id != user.user_id && (
              <Ionicons
                name={saved ? "bookmark" : "bookmark-outline"}
                size={30}
                style={saved ? styles.saved : styles.notsaved}
                onPress={() => {
                  setSaved(!saved), handleSave();
                }}
              ></Ionicons>
            )}
          </View>
          <Text style={styles.body}>{item.description}</Text>
          <Text style={styles.body}>
            {t("aaaa")} {item.publish_date}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: 15,
    marginBottom: 3,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: 1.25,
    color: colors.text,
  },
  subtitle: {
    marginHorizontal: 8,
    marginVertical: 5,
    fontSize: 14,
    letterSpacing: 1.25,
    color: colors.text,
  },
  body: {
    fontSize: 14,
    letterSpacing: 1.25,
    color: colors.text,
  },
  saved: {
    color: colors.main,
  },
  notsaved: {
    color: colors.text,
  },
});
