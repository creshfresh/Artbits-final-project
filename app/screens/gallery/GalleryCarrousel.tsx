import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { database } from "../../../firebaseConfig";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export const GalleryCarousel = ({ viewMode , navigation}: { viewMode: string, navigation}) => {
  const [data, setData] = useState([]);

  /*Se debe mostrar el orderby publish date y luego por el filtro cuando se presione */
  let filter = viewMode.toLowerCase();

  useEffect(() => {
    const collectionRef = collection(database, "Projects");
    const q = query(
      collectionRef,
      where("medium_type", "==", filter),
      orderBy("publish_date", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("querySnapshot unsusbscribe");
      setData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          user_id:doc.data().user_id,
          url: doc.data().url,
          title: doc.data().title,
          description: doc.data().description,
          publish_date: doc.data().publish_date,
          medium_type: doc.data().medium_type,
        }))
      );
    });
    return unsubscribe;
  }, [filter]);

  

  

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <FlashList
          data={data}
          numColumns={2}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={Dimensions.get("window").width / 2 - 20}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ flex: 1, margin: 2 }}>
            <Pressable onPress={()=>navigation.navigate("PorfolioDetail",{ item:item} )}>
                <Image
                  source={{ uri: item.url[0] }}
                  style={{
                    width: "100%",
                    minHeight: 200,
                    borderRadius: 10,
                    borderColor: "#d35647",
                    resizeMode: "cover",
                  }}
                />
              </Pressable>
            </View>
          )}
        />
      </ScrollView>
    </>
  );
};
