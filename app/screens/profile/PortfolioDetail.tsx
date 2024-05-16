import {
  View,
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";

import { useEffect, useState } from "react";
import { colors } from "../../theme/colors";
import { database } from "../../../firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const PorfolioDetail = ({ route, navigation }) => {
  const { item } = route.params;
  const defaultAvatar = require("../../../assets/stars.png");
  const [imageSizes, setImageSizes] = useState({});
  const [name, setName] = useState([]);

  useEffect(() => {
    const calculateImageSizes = async () => {
      const sizes = await Promise.all(item.url.map((uri) => getImageSize(uri)));
      setImageSizes(sizes);
    };
    calculateImageSizes();
  }, [item.url]);

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
          fullname: doc.data().full_name,
          contact_email: doc.data().contact_email,
          country: doc.data().country,
          city: doc.data().city,
          about_decription: doc.data().about_decription,
          avatar: doc.data().avatar,
          web_url:doc.data().web_url,
          user_id:doc.data().user_id
        }))
      );
    });

    return () => unsubscribe();
  }, [item, setName]);

  console.log(item)
  console.log(name)

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Pressable
          onPress={() => navigation.navigate("ProfileScreen", { item: name })}
        >
        <View
          style={{ flexDirection: "row", marginLeft: 10, marginVertical: 7 }}
        >
            <Image
              source={defaultAvatar}
              style={{
                width: 30,
                height: 30,
                backgroundColor: "#FFA5A5",
                resizeMode: "center",
                borderRadius: 30,
              }}
            />
            <Text style={styles.subtitle}>{name[0]?.fullname}</Text>
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
      <View style={{ marginHorizontal: 12, marginVertical: 20, minHeight: 60 }}>
        <Text style={styles.body}>{item.description}</Text>
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
});
