import { View, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { database } from "../../../firebaseConfig";
import { useEffect, useState } from "react";



export const GalleryCarousel = ({ viewMode }: { viewMode: string }) => {

  const [data, setData] = useState([]);


  // const filteredData = data.filter((item) => item.type === viewMode);

  /*Se debe mostrar el orderby publish date y luego por el filtro cuando se presione */
let filter = viewMode.toLowerCase()
console.log(filter)
  useEffect(() => {
    const collectionRef = collection(database, "Projects");
    const q = query(collectionRef, where("medium_type", "==", filter),orderBy("publish_date", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("querySnapshot unsusbscribe");
      setData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          url: doc.data().url,
          title: doc.data().title,
          description: doc.data().description,
        
        }))
      );
    });
    return unsubscribe; 

  }, [filter]);
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
            <Image
              source={{ uri: item.url }}
              style={{
                width: "100%",
                minHeight: 200,
                borderRadius: 10,
                borderColor: "#d35647",
                resizeMode: "cover",
              }}
            />
          </View>
        )}
      />
    </ScrollView>
  );
};
